from flask import Flask, request, jsonify
from medcat_model import MedCATModel
import yaml
import os

app = Flask(__name__)
model = MedCATModel()

# Load configuration
config = {}
config['model_path'] = 'path_to_my_model.data'
config['model_config'] = 'path_to_model_config'


# Initialize model
model.initialize(config['medcat'])

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


