# Clinical Data Entry System

![React](https://img.shields.io/badge/React-18.2-blue)
![Flask](https://img.shields.io/badge/Flask-2.3-green)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey)

A web application for clinicians to manage patient records and extract medical terms from clinical notes with NLP.


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

## Key Features

- **Patient Page**: Create patient and adds new note
- **Term Extraction**: Automatically identifies medical terms
- **Accept/Reject Terms**: Accepts and rejest the terms in clinical notes
- **Manual Add Term**: Add terms directly when needed
- **Saves Document**: Saves clinicla note into the patient data

