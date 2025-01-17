import React, { useState } from 'react';
import { useData } from '../context/DataProvider';

export default function ProblemList() {
  const [problem, setProblem] = useState('');
  const { problems, addProblem } = useData();

  const handleAddProblem = () => {
    if (problem.trim()) {
      addProblem({ condition: problem, status: 'Active' });
      setProblem('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Problem List</h2>
      <input
        type="text"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
        placeholder="Add new problem..."
      />
      <button
        onClick={handleAddProblem}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Problem
      </button>
      <ul className="mt-6">
        {problems.map((problem) => (
          <li key={problem.id} className="p-4 border border-gray-300 rounded-md mb-2">
            <div className="flex justify-between">
              <span className="font-medium">{problem.condition}</span>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  problem.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {problem.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">Recorded: {new Date().toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
