from flask import Flask, request, jsonify
from gpt_model import GPTNLPModel
import yaml
import os

app = Flask(__name__)
model = GPTNLPModel()

API_KEY = 'XXXX-XXXX-XXXX'
model.initialize({'api_key': API_KEY})

@app.route('/extract', methods=['POST'])
def extract():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
        
    try:
        entities = model.extract_terms(text)
        return jsonify({'entities': entities})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


