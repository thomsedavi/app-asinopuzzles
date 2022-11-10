import React from 'react';
import { Document, Section, Element } from './interfaces';

export const convertDocumentToString = (document?: Document): string => {
  var result = '';

  document?.sections?.forEach((section: Section) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        result += section.element.text;
      } else if (section.elements) {

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
      } else if (section.elements) {
        const paragraphBits: (JSX.Element | string)[] = [];

        section.elements.forEach((element: Element, index: number) => {
          if (element.text) {
            paragraphBits.push(element.text!);
          }

          if (index < section.elements!.length - 1) {
            paragraphBits.push(<br />);
          }
        });

        test.push(<p>{paragraphBits}</p>);
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
    let element: string[] = [];

    split.forEach((bit: string) => {
      let bitTrimmed = bit.trim();

      while (bitTrimmed.includes('  ')) {
        bitTrimmed = bitTrimmed.replaceAll('  ', ' ');
      }

      if (bitTrimmed === '' && element.length === 0) {
        // do nothing
      } else if (bitTrimmed === '') {
        elements.push(element);
        element = [];
      } else {
        element.push(bitTrimmed);
      }
    });

    if (element.length) {
      elements.push(element);
    }

    elements.forEach((element: string[]) => {
      var section: Section = {};

      section.type = 'PARAGRAPH';

      if (element.length === 1) {
        section.element = { text: element[0] };
      }
      else {
        const bits: Element[] = [];

        element.forEach((bit: string) => {
          bits.push({
            text: bit
          });
        });

        section.elements = bits;
      }
      
      sections.push(section);
    });

    document.sections = sections;
  }

  return document;
}
