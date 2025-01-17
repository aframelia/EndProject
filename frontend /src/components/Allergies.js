import React, { useState } from 'react';
import { useData } from '../context/DataProvider';

export default function Allergies() {
  const [allergy, setAllergy] = useState('');
  const { allergies, addAllergy } = useData();

  const handleAddAllergy = () => {
    if (allergy.trim()) {
      addAllergy({ condition: allergy, status: 'Active' });
      setAllergy('');
    }
  };

  return (
    <div className="allergies bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Allergies</h2>
      <input
        type="text"
        value={allergy}
        onChange={(e) => setAllergy(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
        placeholder="Add allergy..."
      />
      <button onClick={handleAddAllergy}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Add Allergy
      </button>
      <ul>
        {allergies.map((allergy) => (
          <li key={allergy.id}>
            {allergy.condition} - {allergy.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
