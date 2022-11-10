export interface Element {
  text?: string;
}

export interface Section {
  type?: string;
  element?: Element;
  elements?: Element[];
}

export interface Document {
  sections?: Section[]
}

export interface User {
  id: string,
  name?: string,
  biography?: Document
}
