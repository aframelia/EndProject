# app.py
from flask import Flask, request, jsonify
import sqlite3
import random
from flask_cors import CORS
# Replace this line at the top of app.py:
# from werkzeug.urls import url_quote

# # With:
# try:
#     from werkzeug.urls import url_quote
# except ImportError:
#     from werkzeug.utils import quote as url_quote

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize database
def init_db():
    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS terms
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 text TEXT NOT NULL,
                 type TEXT NOT NULL,
                 status TEXT NOT NULL DEFAULT 'pending',
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

init_db()

# Dummy medical terms and their types
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
    
    # Extract random words from the note (dummy NLP)
    words = clinical_note.split()
    extracted_terms = []
    
    for word in random.sample(words, min(3, len(words))):  # Pick 3 random words
        term_type = random.choice(["condition", "medication", "procedure", "symptom"])
        extracted_terms.append({
            "text": word,
            "type": term_type,
            "id": f"term-{random.randint(1000, 9999)}"
        })
    
    # Also include some actual medical terms if they appear in the note
    for term in MEDICAL_TERMS:
        if term['text'].lower() in clinical_note.lower():
            extracted_terms.append({
                "text": term['text'],
                "type": term['type'],
                "id": f"med-{random.randint(1000, 9999)}"
            })
    
    return jsonify(extracted_terms)

@app.route('/accept_term', methods=['POST'])
def accept_term():
    term_data = request.json
    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    
    c.execute("INSERT INTO terms (text, type, status) VALUES (?, ?, 'accepted')",
              (term_data['text'], term_data['type']))
    conn.commit()
    conn.close()
    
    return jsonify({"status": "success"})

@app.route('/get_accepted_terms', methods=['GET'])
def get_accepted_terms():
    conn = sqlite3.connect('clinical_terms.db')
    c = conn.cursor()
    
    c.execute("SELECT text, type FROM terms WHERE status='accepted'")
    terms = [{"text": row[0], "type": row[1]} for row in c.fetchall()]
    
    conn.close()
    return jsonify(terms)

if __name__ == '__main__':
    app.run(debug=True)


    # I deleted the venv but i still can work on the local copy file name: HealthProject01