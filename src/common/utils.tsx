import React from 'react';
import { Document, Section, Element } from '../interfaces';
import { EditIcon, Paragraph } from './styled';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  month.length === 1 && (month = '0' + month);
  let day = (date.getDate() + 1).toString();
  day.length === 1 && (day = '0' + day);

  return `${year}-${month}-${day}`;
}

// TODO trim line endings and stuff
export const tidyString = (input?: string): string => {
  let output = input ?? ''

  while (output.includes('  ')) {
    output = output.replaceAll('  ', ' ');
  }

  return output?.trim();
}

export const convertDocumentToString = (document?: Document): string => {
  var result = '';

  document?.sections?.forEach((section: Section, index: number) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        result += section.element.text;
      } else if (section.elements) {
        section.elements!.forEach((element: Element, index: number) => {
          result += element.text;
          result += '\n';
        });
      }
    }

    if (index < document.sections!.length - 1) {
      result += '\n';
    }
  });

  return result;
}

export const convertDocumentToElements = (document?: Document, editable?: boolean): JSX.Element[] => {
  const test: JSX.Element[] = [];

  document?.sections?.forEach((section: Section, index: number) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        if (editable && index === document!.sections!.length - 1) {
          test.push(<Paragraph key={`s${index}`}>{section.element.text} <EditIcon>✏️</EditIcon></Paragraph>);
        } else {
          test.push(<Paragraph key={`s${index}`}>{section.element.text}</Paragraph>);
        }
      } else if (section.elements) {
        const paragraphBits: (JSX.Element | string)[] = [];

        section.elements.forEach((element: Element, index: number) => {
          if (element.text) {
            paragraphBits.push(element.text!);
          }

          if (index < section.elements!.length - 1) {
            paragraphBits.push(<br key={`s${index}br${index}`} />);
          }
        });

        if (editable && index === document!.sections!.length - 1) {
          test.push(<Paragraph key={`s${index}`}>{paragraphBits} <EditIcon>✏️</EditIcon></Paragraph>);
        } else {
          test.push(<Paragraph key={`s${index}`}>{paragraphBits}</Paragraph>);
        }

      }
    }
  });

  return test;
}

export const convertStringToDocument = (text?: string): Document => {
  const document: Document = {};

  if (text) {
    const sections: Section [] = [];

    const split: string[] = text.split('\n');

    const elements: string[][] = [];
    let element: string[] = [];

    split.forEach((bit: string) => {
      let bitTrimmed = tidyString(bit);

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
