import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface Problem {
  id: number;
  condition: string;
  status: 'Active' | 'Resolved';
  dateRecorded: string;
}

export default function ProblemList() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [newProblem, setNewProblem] = useState('');

  const addProblem = () => {
    if (newProblem.trim()) {
      setProblems([
        ...problems,
        {
          id: Date.now(),
          condition: newProblem,
          status: 'Active',
          dateRecorded: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewProblem('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-3">
        <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Problem List</h2>
      </div>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newProblem}
          onChange={(e) => setNewProblem(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Add new problem..."
        />
        <button
          onClick={addProblem}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{problem.condition}</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                problem.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {problem.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Recorded: {problem.dateRecorded}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}