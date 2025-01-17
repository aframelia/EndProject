import React from 'react';
import { DataProvider } from './context/DataProvider';
import ClinicalNotes from './components/ClinicalNotes';
import ProblemList from './components/ProblemList';
import Medications from './components/Medications';
import Allergies from './components/Allergies';
import Chatbot from './components/Chatbot';
import PatientHeader from './components/PatientHeader';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100">
        <PatientHeader patientName="John Doe" dob="1985-06-15" mrn="MRN123456" />
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <ClinicalNotes />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Allergies />
                <Medications />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <ProblemList />
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
