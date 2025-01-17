import React, { createContext, useContext, useState } from 'react';

// Context setup for data
const DataContext = createContext();

// Data provider component
export function DataProvider({ children }) {
  const [problems, setProblems] = useState([]);
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);

  const addProblem = (problem) => {
    setProblems((prev) => [...prev, { ...problem, id: Date.now() }]);
  };

  const addMedication = (medication) => {
    setMedications((prev) => [...prev, { ...medication, id: Date.now() }]);
  };

  const addAllergy = (allergy) => {
    setAllergies((prev) => [...prev, { ...allergy, id: Date.now() }]);
  };

  return (
    <DataContext.Provider value={{ problems, medications, allergies, addProblem, addMedication, addAllergy }}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook for accessing context
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
