export interface Element {
  text?: string;
}

export interface Section {
  type?: string;
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
  lexicologers?: { id?: string, title?: string }[];
  dateCreated?: string;
  dateUpdated?: string;
}

export interface LexicologerRequiredWord {
  primaryWord?: string;
  secondaryWords?: string[];
}

export interface LexicologerGame {
  id?: string;
  user: User;
  title?: string;
  details?: Document;
  characterLimit?: number,
  requiredWords?: LexicologerRequiredWord[];
  dateCreated?: string;
  dateUpdated?: string;
}
