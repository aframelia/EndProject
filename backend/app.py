from flask import Flask, request, jsonify
import sqlite3
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize database with improved schema
def init_db():
    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    
    # Drop existing tables if they exist (clean start)
    c.execute('''DROP TABLE IF EXISTS patient_documents''')
    c.execute('''DROP TABLE IF EXISTS terms''')
    
    # Create fresh tables with correct schema
    c.execute('''CREATE TABLE IF NOT EXISTS patient_documents
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 patient_id TEXT NOT NULL,
                 patient_name TEXT NOT NULL,
                 document_name TEXT NOT NULL,
                 document_content TEXT NOT NULL,
                 document_type TEXT NOT NULL,
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')

    c.execute('''CREATE TABLE IF NOT EXISTS terms
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 text TEXT NOT NULL,
                 type TEXT NOT NULL,
                 status TEXT NOT NULL DEFAULT 'pending',
                 patient_id TEXT NOT NULL,
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    # Create indexes
    c.execute('''CREATE INDEX IF NOT EXISTS idx_terms_patient ON terms(patient_id)''')
    c.execute('''CREATE INDEX IF NOT EXISTS idx_terms_status ON terms(status)''')
    
    conn.commit()
    conn.close()

init_db()

# Dummy medical terms for the extraction demo
MEDICAL_TERMS = [
    {"text": "hypertension", "type": "condition"},
    {"text": "diabetes", "type": "condition"},
    {"text": "aspirin", "type": "medication"},
    {"text": "metformin", "type": "medication"},
    {"text": "MRI", "type": "procedure"},
    {"text": "ECG", "type": "procedure"},
    {"text": "fever", "type": "symptom"},
    {"text": "headache", "type": "symptom"},
]

@app.route('/extract', methods=['POST'])
def extract_terms():
    data = request.json
    clinical_note = data.get('clinical_note', '')
    patient_id = data.get('patient_id', '')
    
    if not patient_id:
        return jsonify({"status": "error", "message": "patient_id is required"}), 400
    
    # Extract random words from the note (dummy NLP)
    words = clinical_note.split()
    extracted_terms = []
    
    for word in random.sample(words, min(3, len(words))):  # Pick 3 random words
        term_type = random.choice(["condition", "medication", "procedure", "symptom"])
        extracted_terms.append({
            "text": word,
            "type": term_type,
            "patient_id": patient_id,
            "id": f"term-{random.randint(1000, 9999)}"
        })
    
    # Include actual medical terms if they appear in the note
    for term in MEDICAL_TERMS:
        if term['text'].lower() in clinical_note.lower():
            extracted_terms.append({
                "text": term['text'],
                "type": term['type'],
                "patient_id": patient_id,
                "id": f"med-{random.randint(1000, 9999)}"
            })
    
    return jsonify(extracted_terms)

@app.route('/accept_term', methods=['POST'])
def accept_term():
    term_data = request.json
    required_fields = ['text', 'type', 'patient_id']
    
    if not all(field in term_data for field in required_fields):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    
    # Check if term already exists for this patient
    c.execute("""SELECT id FROM terms 
                 WHERE text=? AND type=? AND patient_id=?""",
              (term_data['text'], term_data['type'], term_data['patient_id']))
    
    if c.fetchone():
        conn.close()
        return jsonify({"status": "error", "message": "Term already exists for patient"}), 400
    
    # Insert new term
    c.execute("""INSERT INTO terms 
                (text, type, status, patient_id) 
                VALUES (?, ?, 'accepted', ?)""",
              (term_data['text'], term_data['type'], term_data['patient_id']))
    
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route('/patients/<patient_id>/terms', methods=['GET'])
def get_patient_terms(patient_id):
    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    
    c.execute("""SELECT text, type FROM terms 
                 WHERE patient_id=? AND status='accepted'""", (patient_id,))
    
    terms = [{"text": row[0], "type": row[1]} for row in c.fetchall()]
    conn.close()
    return jsonify(terms)

@app.route('/get_accepted_terms', methods=['GET'])
def get_accepted_terms():
    patient_id = request.args.get('patient_id')
    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    
    if patient_id:
        # Get terms for specific patient
        c.execute("""SELECT text, type FROM terms 
                     WHERE status='accepted' AND patient_id=?""", (patient_id,))
    else:
        # Get all accepted terms
        c.execute("SELECT text, type FROM terms WHERE status='accepted'")
    
    terms = [{"text": row[0], "type": row[1]} for row in c.fetchall()]
    conn.close()
    return jsonify(terms)

@app.route('/save_document', methods=['POST'])
def save_document():
    try:
        data = request.json
        required_fields = ['patientId', 'patientName', 'documentName', 'documentContent', 'documentType']
        
        if not all(field in data for field in required_fields):
            return jsonify({"status": "error", "message": "Missing required fields"}), 400

        conn = sqlite3.connect('clinical_terms.db')
        c = conn.cursor()
        
        # Check if patient exists and get their name
        c.execute("""SELECT patient_name FROM patient_documents 
                     WHERE patient_id = ? LIMIT 1""", (data['patientId'],))
        existing_patient = c.fetchone()
        
        # Use existing name if patient exists, otherwise use provided name
        patient_name = existing_patient[0] if existing_patient else data['patientName']
        
        # Insert new document
        c.execute("""INSERT INTO patient_documents 
                    (patient_id, patient_name, document_name, document_content, document_type)
                    VALUES (?, ?, ?, ?, ?)""",
                 (data['patientId'], patient_name, data['documentName'], 
                  data['documentContent'], data['documentType']))
        
        conn.commit()
        conn.close()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/get_patients', methods=['GET'])
def get_patients():
    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    
    # Get unique patients and their documents
    c.execute('''SELECT DISTINCT patient_id, patient_name FROM patient_documents''')
    patients = []
    
    for patient_id, patient_name in c.fetchall():
        c.execute('''SELECT document_name, document_content, document_type, created_at 
                     FROM patient_documents 
                     WHERE patient_id = ? 
                     ORDER BY created_at DESC''', (patient_id,))
        
        documents = []
        for doc_name, doc_content, doc_type, created_at in c.fetchall():
            documents.append({
                "name": doc_name,
                "content": doc_content,
                "type": doc_type,
                "date": created_at.split()[0]  # Just the date part
            })
        
        patients.append({
            "id": patient_id,
            "name": patient_name,
            "documents": documents
        })
    
    conn.close()
    return jsonify(patients)

@app.route('/create_patient', methods=['POST'])
def create_patient():
    try:
        data = request.json
        patient_name = data.get('patientName')
        
        if not patient_name:
            return jsonify({"status": "error", "message": "Patient name is required"}), 400

        conn = sqlite3.connect('clinical_terms.db')
        c = conn.cursor()
        
        # Generate a patient ID
        patient_id = f"P{random.randint(1000, 9999)}"
        
        # Create an initial empty document to establish the patient
        c.execute("""INSERT INTO patient_documents 
                    (patient_id, patient_name, document_name, document_content, document_type)
                    VALUES (?, ?, ?, ?, ?)""",
                 (patient_id, patient_name, "Patient Record", "", "patient_record"))
        
        conn.commit()
        conn.close()
        return jsonify({"status": "success", "patientId": patient_id})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)