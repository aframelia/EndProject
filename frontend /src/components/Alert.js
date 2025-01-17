import React from 'react';

export default function PatientAlert({ message, type }) {
  const alertStyles = {
    urgent: 'bg-red-100 text-red-800',
    attention: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case 'urgent':
        return alertStyles.urgent;
      case 'attention':
        return alertStyles.attention;
      case 'info':
        return alertStyles.info;
      default:
        return alertStyles.info;
    }
  };

  return (
    <div className={`p-4 mb-4 border-l-4 rounded-md ${getAlertStyle(type)} border-l-4`}>
      <div className="flex items-center">
        <span className="font-semibold mr-2">Alert:</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
