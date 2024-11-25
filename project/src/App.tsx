import React from 'react';
import { DataProvider } from './context/DataContext';
import PatientHeader from './components/PatientHeader';
import ClinicalNotes from './components/ClinicalNotes';
import ProblemList from './components/ProblemList';
import Medications from './components/Medications';
import Allergies from './components/Allergies';
import Chatbot from './components/Chatbot';
import PatientHistory from './components/PatientHistory';

const App: React.FC = () => {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100">
        <PatientHeader
          patientName="John Doe"
          dob="1985-06-15"
          mrn="MRN123456"
        />
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content - 7 columns */}
            <div className="lg:col-span-7 space-y-6">
              <ClinicalNotes />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProblemList />
                <Medications />
              </div>
              <Allergies />
            </div>

            {/* Sidebar - 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              <PatientHistory />
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </DataProvider>
  );
};

export default App;