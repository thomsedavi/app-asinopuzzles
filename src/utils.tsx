import React from 'react';
import { Document, Section } from './interfaces';

export const convertDocumentToString = (document?: Document): string => {
  var result = '';

  document?.sections?.forEach((section: Section) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        result += section.element.text;
      }
    }
  });

  return result;
}

export const convertDocumentToElements = (document?: Document): JSX.Element[] => {
  var test: JSX.Element[] = [];

  document?.sections?.forEach((section: Section) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        test.push(<p>{section.element.text}</p>);
      }
    }
  });

  return test;
}

export const convertTextToDocument = (text?: string): Document => {
  const document: Document = {};

  if (text) {
    const sections: Section [] = [];

    const split: string[] = text.split('\n');

    const elements: string[][] = [];
    let bits: string[] = [];

    split.forEach((bit: string) => {
      let bitTrimmed = bit.trim();

      while (bitTrimmed.includes('  ')) {
        bitTrimmed = bitTrimmed.replaceAll('  ', ' ');
      }

      if (bitTrimmed === '' && bits.length === 0) {
        // do nothing
      } else if (bitTrimmed === '') {
        elements.push(bits);
        bits = [];
      } else {
        bits.push(bitTrimmed);
      }
    });

    elements.forEach((element: string[]) => {
      var section: Section = {};

      section.type = 'PARAGRAPH';
      section.element = { text: element[0] };
      
      sections.push(section);
    });

    document.sections = sections;
  }

  return document;
}
