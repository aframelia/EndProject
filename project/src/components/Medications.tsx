import React, { useState } from 'react';
import { Pill, Plus } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  dateStarted: string;
}

export default function Medications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: '',
  });

  const addMedication = () => {
    if (newMed.name && newMed.dosage && newMed.frequency) {
      setMedications([
        ...medications,
        {
          id: Date.now(),
          ...newMed,
          dateStarted: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewMed({ name: '', dosage: '', frequency: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-3">
        <Pill className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Medications</h2>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <input
          type="text"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Medication name"
        />
        <input
          type="text"
          value={newMed.dosage}
          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Dosage"
        />
        <input
          type="text"
          value={newMed.frequency}
          onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Frequency"
        />
      </div>

      <button
        onClick={addMedication}
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Medication
      </button>

      <div className="space-y-2">
        {medications.map((med) => (
          <div
            key={med.id}
            className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <div className="font-medium">{med.name}</div>
            <div className="text-sm text-gray-600">
              {med.dosage} - {med.frequency}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Started: {med.dateStarted}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}