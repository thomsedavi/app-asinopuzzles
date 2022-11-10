import React from 'react';
import { Document, Section } from './interfaces';

export const convertDocumentToString = (document: Document): string => {
  return 'test';
}

export const convertDocumentToElements = (document: Document): JSX.Element[] => {
  var test: JSX.Element[] = [];

  document.sections?.forEach((section: Section) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        test.push(<p>{section.element.text}</p>);
      }
    }
  });

  return test;
}
