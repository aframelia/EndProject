import React from "react";

export default function AcceptedList({ acceptedSuggestions }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Accepted Suggestions</h2>
      <div className="space-y-4">
        {acceptedSuggestions.length > 0 ? (
          acceptedSuggestions.map((item) => (
            <div
              key={item.id}
              className="bg-green-100 p-4 shadow rounded-lg"
            >
              <strong>{item.type}:</strong> {item.text}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No accepted suggestions yet.</div>
        )}
      </div>
    </div>
  );
}
