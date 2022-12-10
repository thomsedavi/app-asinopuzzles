export interface Element {
  text?: string;
}

export interface Section {
  type?: 'PARAGRAPH';
  element?: Element;
  elements?: Element[];
}

export interface Document {
  sections?: Section[];
}

export interface User {
  id: string;
  name?: string;
  biography?: Document;
  lexicologers?: LexicologerSummary[];
  dateCreated?: string;
  dateUpdated?: string;
}

export interface LexicologerRequiredWord {
  primaryWord?: string;
  secondaryWords?: string[];
}

export interface LexicologerSummary{
  id?: string;
  title?: string;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface LexicologerGame {
  id?: string;
  userId?: string;
  userName?: string;
  title?: string;
  details?: Document;
  characterLimit?: number,
  requiredWords?: LexicologerRequiredWord[];
  dateCreated?: string;
  dateUpdated?: string;
}
