export interface Problem {
  id: number;
  condition: string;
  status: 'Active' | 'Resolved';
  dateRecorded: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  dateStarted: string;
}

export interface Allergy {
  id: number;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  dateRecorded: string;
}

export interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
}