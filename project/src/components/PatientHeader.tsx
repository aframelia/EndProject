import React from 'react';
import { User, Calendar, Activity } from 'lucide-react';

interface PatientHeaderProps {
  patientName: string;
  dob: string;
  mrn: string;
}

export default function PatientHeader({ patientName, dob, mrn }: PatientHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <User className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patientName}</h1>
            <div className="flex space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>DOB: {dob}</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                <span>MRN: {mrn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}