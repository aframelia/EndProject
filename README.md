# Clinical Data Entry System

![React](https://img.shields.io/badge/React-18.2-blue)
![Flask](https://img.shields.io/badge/Flask-2.3-green)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey)

A web application for clinicians to manage patient records and extract medical terms from clinical notes with NLP.

## Introduction 
This project was developed as part of my final-year studies at Birkbeck University. It focuses on improving clinical data entry workflows by integrating Natural Language Processing (NLP) into electronic health records (EHR). The system features a React-based user interface for clinicians, a Flask backend hosting NLP models, and a pipeline for extracting key medical information such as problems and medications from clinical notes.

### Demo

[▶️ Watch Demo Video](./demo.mp4)


### Backend Setup (Flask)

```bash
# 1. Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows

# 2. Run the server (http://localhost:5000)
python app.py
```

### Frontend Setup (React)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Run development server (http://localhost:3000)
npm start
```

### NLP Setup (Docker)

```bash
# From the nlp_gpt_app directory:
docker build -t <nlp_service_name> .

# Run the container on port 5002
docker run -d -p 5002:5002 --name nlp_service_name nlp_service_name
```

## Key Features

- **Patient Page**: Create patient and adds new note
- **Term Extraction**: Automatically identifies medical terms
- **Accept/Reject Terms**: Accepts and rejest the terms in clinical notes
- **Manual Add Term**: Add terms directly when needed
- **Saves Document**: Saves clinicla note into the patient data

