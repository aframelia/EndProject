import React from "react";

export default function List({ suggestions, handleAccept, handleReject }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Suggestions</h2>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center justify-between bg-white p-4 shadow rounded-lg hover:bg-gray-50 transition"
          >
            <div>
              <strong>{suggestion.type}:</strong> {suggestion.text}
            </div>
            <div className="space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={() => handleAccept(suggestion.id)}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleReject(suggestion.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
