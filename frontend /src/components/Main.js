// import React, { useState } from "react";
// import ClinicalNotes from "./ClinicalNotes";
// import List from "./List";
// import AcceptedList from "./AcceptedList";

// export default function ClinicalDataEntry() {
//   const [clinicalNote, setClinicalNote] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [acceptedSuggestions, setAcceptedSuggestions] = useState([]);

//   const handleSubmit = async () => {
//     console.log("Submitted note:", clinicalNote);

//     const response = await fetch("http://127.0.0.1:5000/extract", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ clinical_note: clinicalNote }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setSuggestions(data);
//     } else {
//       console.error("Failed to get suggestions");
//     }
//   };

//   const handleAccept = (id) => {
//     const accepted = suggestions.find((s) => s.id === id);
//     if (accepted) {
//       setAcceptedSuggestions([...acceptedSuggestions, accepted]);
//       setSuggestions(suggestions.filter((s) => s.id !== id));
//     }
//   };

//   const handleReject = (id) => {
//     console.log("Rejected suggestion:", id);
//     setSuggestions(suggestions.filter((s) => s.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
//         <div className="text-2xl font-bold">Clinical Data Entry</div>
//         <div className="space-x-6">
//           <button className="hover:text-blue-300">Dashboard</button>
//           <button className="hover:text-blue-300">Patients</button>
//           <button className="hover:text-blue-300">Appointments</button>
//           <button className="hover:text-blue-300">Reports</button>
//         </div>
//       </nav>

//       <main className="p-8 flex space-x-8">
//         <div className="w-2/3">
//           <ClinicalNotes
//             clinicalNote={clinicalNote}
//             setClinicalNote={setClinicalNote}
//             handleSubmit={handleSubmit}
//           />
//         </div>
//         <div className="w-1/3">
//            <AcceptedList acceptedSuggestions={acceptedSuggestions} /> 
//         </div>
//       </main>

//         <List
//             suggestions={suggestions}
//             handleAccept={handleAccept}
//             handleReject={handleReject}
//           />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import ClinicalNotes from "./ClinicalNotes";
import List from "./List";
import AcceptedList from "./AcceptedList";

export default function ClinicalDataEntry() {
  const [clinicalNote, setClinicalNote] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [acceptedSuggestions, setAcceptedSuggestions] = useState([]);

  // Load accepted terms on mount
  useEffect(() => {
    fetch("http://localhost:5000/get_accepted_terms")
      .then(res => res.json())
      .then(setAcceptedSuggestions)
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clinical_note: clinicalNote }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.error("Extraction error:", error);
    }
  };

  const handleAccept = async (id) => {
    const suggestion = suggestions.find(s => s.id === id);
    if (suggestion) {
      try {
        await fetch("http://localhost:5000/accept_term", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(suggestion),
        });
        setAcceptedSuggestions(prev => [...prev, suggestion]);
        setSuggestions(prev => prev.filter(s => s.id !== id));
      } catch (error) {
        console.error("Accept error:", error);
      }
    }
  };

  const handleReject = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold">Clinical Data Entry</div>
        <div className="space-x-6">
          <button className="hover:text-blue-300">Dashboard</button>
          <button className="hover:text-blue-300">Patients</button>
          <button className="hover:text-blue-300">Appointments</button>
          <button className="hover:text-blue-300">Reports</button>
        </div>
      </nav>

      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ClinicalNotes
              clinicalNote={clinicalNote}
              setClinicalNote={setClinicalNote}
              handleSubmit={handleSubmit}
            />
            
            {suggestions.length > 0 && (
              <div className="mt-8">
                <List
                  suggestions={suggestions}
                  handleAccept={handleAccept}
                  handleReject={handleReject}
                />
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <AcceptedList acceptedSuggestions={acceptedSuggestions} />
          </div>
        </div>
      </main>
    </div>
  );
}