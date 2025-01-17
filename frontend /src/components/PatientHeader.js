import React from 'react';

export default function PatientHeader({ patientName, dob, mrn }) {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">{patientName}</h1>
      <div className="flex justify-between text-sm">
        <div>DOB: {dob}</div>
        <div>MRN: {mrn}</div>
      </div>
    </div>
  );
}
