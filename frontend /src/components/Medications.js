import React, { useState } from 'react';
import { useData } from '../context/DataProvider';

export default function Medications() {
  const [medication, setMedication] = useState('');
  const { medications, addMedication } = useData();

  const handleAddMedication = () => {
    if (medication.trim()) {
      addMedication({ name: medication, status: 'Active' });
      setMedication('');
    }
  };

  return (
    <div className="medications bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Medication</h2>
      <input
        type="text"
        value={medication}
        onChange={(e) => setMedication(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
        placeholder="Add medication..."
      />
      <button 
      onClick={handleAddMedication}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Add Medication
      </button>
      <ul>
        {medications.map((medication) => (
          <li key={medication.id}>
            {medication.name} - {medication.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
