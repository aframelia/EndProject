import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Problem } from '../types/medical';
import { Medication } from '../types/medical';
import { Allergy } from '../types/medical';

interface DataContextType {
  problems: Problem[];
  medications: Medication[];
  allergies: Allergy[];
  addProblem: (problem: Omit<Problem, 'id' | 'dateRecorded'>) => void;
  addMedication: (medication: Omit<Medication, 'id' | 'dateStarted'>) => void;
  addAllergy: (allergy: Omit<Allergy, 'id' | 'dateRecorded'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);

  const addProblem = (problem: Omit<Problem, 'id' | 'dateRecorded'>) => {
    setProblems(prev => [...prev, {
      ...problem,
      id: Date.now(),
      dateRecorded: new Date().toISOString().split('T')[0]
    }]);
  };

  const addMedication = (medication: Omit<Medication, 'id' | 'dateStarted'>) => {
    setMedications(prev => [...prev, {
      ...medication,
      id: Date.now(),
      dateStarted: new Date().toISOString().split('T')[0]
    }]);
  };

  const addAllergy = (allergy: Omit<Allergy, 'id' | 'dateRecorded'>) => {
    setAllergies(prev => [...prev, {
      ...allergy,
      id: Date.now(),
      dateRecorded: new Date().toISOString().split('T')[0]
    }]);
  };

  return (
    <DataContext.Provider value={{
      problems,
      medications,
      allergies,
      addProblem,
      addMedication,
      addAllergy
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}