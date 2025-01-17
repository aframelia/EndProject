import React, { useState } from 'react';
import { AlertOctagon, Plus } from 'lucide-react';

interface Allergy {
  id: number;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  dateRecorded: string;
}

export default function Allergies() {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [newAllergy, setNewAllergy] = useState({
    allergen: '',
    reaction: '',
    severity: 'Moderate' as const,
  });

  const addAllergy = () => {
    if (newAllergy.allergen && newAllergy.reaction) {
      setAllergies([
        ...allergies,
        {
          id: Date.now(),
          ...newAllergy,
          dateRecorded: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewAllergy({ allergen: '', reaction: '', severity: 'Moderate' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-3">
        <AlertOctagon className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Allergies</h2>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <input
          type="text"
          value={newAllergy.allergen}
          onChange={(e) => setNewAllergy({ ...newAllergy, allergen: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Allergen"
        />
        <input
          type="text"
          value={newAllergy.reaction}
          onChange={(e) => setNewAllergy({ ...newAllergy, reaction: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Reaction"
        />
        <select
          value={newAllergy.severity}
          onChange={(e) => setNewAllergy({ 
            ...newAllergy, 
            severity: e.target.value as 'Mild' | 'Moderate' | 'Severe'
          })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
      </div>

      <button
        onClick={addAllergy}
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Allergy
      </button>

      <div className="space-y-2">
        {allergies.map((allergy) => (
          <div
            key={allergy.id}
            className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{allergy.allergen}</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                allergy.severity === 'Severe' 
                  ? 'bg-red-100 text-red-800'
                  : allergy.severity === 'Moderate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
              }`}>
                {allergy.severity}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Reaction: {allergy.reaction}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Recorded: {allergy.dateRecorded}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}