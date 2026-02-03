export type ApplicationStatus = 'draft' | 'submitted' | 'accepted' | 'rejected';

export interface Question {
  id: string;
  questionText: string;
  response: string;
  tags: string[];
}

export interface ApplicationLog {
  id: string;
  name: string;
  purpose: string;
  dateSubmitted: Date;
  status: ApplicationStatus;
  notes?: string;
  questions: Question[];
}
