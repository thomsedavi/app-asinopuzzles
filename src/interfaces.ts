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
  puzzles?: PuzzleSummary[];
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

export interface PuzzleSummary{
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

/* ASINO */
export interface AsinoPuzzle {
  id?: string;
  title?: string;
  userId?: string;
  userName?: string;
  layer?: string;
  collections?: AsinoCollection[];
  objects?: AsinoObject[];
  classes?: AsinoClass[];
  numbers?: AsinoNumber[];
  colors?: AsinoColor[];
  layers?: AsinoLayer[];
  booleans?: AsinoBoolean[];
  dateCreated?: string;
  dateUpdated?: string;
}

export interface AsinoCollection {
  name?: string;
  description?: string;
}

export interface AsinoClass {
  name?: string;
  description?: string;
  number?: string;
  collection?: string;
  symbol?: string;
}

export interface AsinoObject {
  name?: string;
  description?: string;
  collection?: string;
}

export interface AsinoNumber {
  name?: string;
  description?: string;
  value?: number;
  operation?: 'SUM' | 'MAXIMUM' | 'MINIMUM' | 'PRODUCT' | 'FRACTION' | 'DIFFERENCE' | 'POWER' | 'IF';
  numbers?: string[];
  number1?: string;
  number2?: string;
  boolean?: string;
}

export interface AsinoLayer {
  type?: 'INTERFACE' | 'GROUP';
  name?: string;
  description?: string;
  layers?: string[];
  object?: string;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
  fillColor?: string;
  strokeColor?: string;
}

export interface AsinoColor {
  name?: string;
  description?: string;
  hueLight?: number;
  hueDark?: number;
  lightnessLight?: number;
  lightnessDark?: number;

}

export interface AsinoGroup {
  name?: string;
  description?: string;
}

export interface AsinoBoolean {
  name?: string;
  description?: string;
  value?: boolean;
}

export const asinoPuzzle: AsinoPuzzle = {
  id: '0-00-000',
  userId: '0-00',
  title: 'My Test Puzzle',
  layer: 'Layout',
  collections: [
    {
      name: 'Numbers',
      description: 'Numbers Collection'
    }
  ],
  objects: [
    {
      name: 'R1C1',
      description: 'R1C1',
      collection: 'Numbers'
    },
    {
      name: 'R1C2',
      description: 'R1C2',
      collection: 'Numbers'
    },
    {
      name: 'R1C3',
      description: 'R1C3',
      collection: 'Numbers'
    },
    {
      name: 'R1C4',
      description: 'R1C4',
      collection: 'Numbers'
    },
    {
      name: 'R1C5',
      description: 'R1C5',
      collection: 'Numbers'
    },
    {
      name: 'R1C6',
      description: 'R1C6',
      collection: 'Numbers'
    },
    {
      name: 'R1C7',
      description: 'R1C7',
      collection: 'Numbers'
    },
    {
      name: 'R1C8',
      description: 'R1C8',
      collection: 'Numbers'
    },
    {
      name: 'R1C9',
      description: 'R1C9',
      collection: 'Numbers'
    },
    {
      name: 'R2C1',
      description: 'R2C1',
      collection: 'Numbers'
    },
    {
      name: 'R2C2',
      description: 'R2C2',
      collection: 'Numbers'
    },
    {
      name: 'R2C3',
      description: 'R2C3',
      collection: 'Numbers'
    },
    {
      name: 'R2C4',
      description: 'R2C4',
      collection: 'Numbers'
    },
    {
      name: 'R2C5',
      description: 'R2C5',
      collection: 'Numbers'
    },
    {
      name: 'R2C6',
      description: 'R2C6',
      collection: 'Numbers'
    },
    {
      name: 'R2C7',
      description: 'R2C7',
      collection: 'Numbers'
    },
    {
      name: 'R2C8',
      description: 'R2C8',
      collection: 'Numbers'
    },
    {
      name: 'R2C9',
      description: 'R2C9',
      collection: 'Numbers'
    },
    {
      name: 'R3C1',
      description: 'R3C1',
      collection: 'Numbers'
    },
    {
      name: 'R3C2',
      description: 'R3C2',
      collection: 'Numbers'
    },
    {
      name: 'R3C3',
      description: 'R3C3',
      collection: 'Numbers'
    },
    {
      name: 'R3C4',
      description: 'R3C4',
      collection: 'Numbers'
    },
    {
      name: 'R3C5',
      description: 'R3C5',
      collection: 'Numbers'
    },
    {
      name: 'R3C6',
      description: 'R3C6',
      collection: 'Numbers'
    },
    {
      name: 'R3C7',
      description: 'R3C7',
      collection: 'Numbers'
    },
    {
      name: 'R3C8',
      description: 'R3C8',
      collection: 'Numbers'
    },
    {
      name: 'R3C9',
      description: 'R3C9',
      collection: 'Numbers'
    },
    {
      name: 'R4C1',
      description: 'R4C1',
      collection: 'Numbers'
    },
    {
      name: 'R4C2',
      description: 'R4C2',
      collection: 'Numbers'
    },
    {
      name: 'R4C3',
      description: 'R4C3',
      collection: 'Numbers'
    },
    {
      name: 'R4C4',
      description: 'R4C4',
      collection: 'Numbers'
    },
    {
      name: 'R4C5',
      description: 'R4C5',
      collection: 'Numbers'
    },
    {
      name: 'R4C6',
      description: 'R4C6',
      collection: 'Numbers'
    },
    {
      name: 'R4C7',
      description: 'R4C7',
      collection: 'Numbers'
    },
    {
      name: 'R4C8',
      description: 'R4C8',
      collection: 'Numbers'
    },
    {
      name: 'R4C9',
      description: 'R4C9',
      collection: 'Numbers'
    },
    {
      name: 'R5C1',
      description: 'R5C1',
      collection: 'Numbers'
    },
    {
      name: 'R5C2',
      description: 'R5C2',
      collection: 'Numbers'
    },
    {
      name: 'R5C3',
      description: 'R5C3',
      collection: 'Numbers'
    },
    {
      name: 'R5C4',
      description: 'R5C4',
      collection: 'Numbers'
    },
    {
      name: 'R5C5',
      description: 'R5C5',
      collection: 'Numbers'
    },
    {
      name: 'R5C6',
      description: 'R5C6',
      collection: 'Numbers'
    },
    {
      name: 'R5C7',
      description: 'R5C7',
      collection: 'Numbers'
    },
    {
      name: 'R5C8',
      description: 'R5C8',
      collection: 'Numbers'
    },
    {
      name: 'R5C9',
      description: 'R5C9',
      collection: 'Numbers'
    },
    {
      name: 'R6C1',
      description: 'R6C1',
      collection: 'Numbers'
    },
    {
      name: 'R6C2',
      description: 'R6C2',
      collection: 'Numbers'
    },
    {
      name: 'R6C3',
      description: 'R6C3',
      collection: 'Numbers'
    },
    {
      name: 'R6C4',
      description: 'R6C4',
      collection: 'Numbers'
    },
    {
      name: 'R6C5',
      description: 'R6C5',
      collection: 'Numbers'
    },
    {
      name: 'R6C6',
      description: 'R6C6',
      collection: 'Numbers'
    },
    {
      name: 'R6C7',
      description: 'R6C7',
      collection: 'Numbers'
    },
    {
      name: 'R6C8',
      description: 'R6C8',
      collection: 'Numbers'
    },
    {
      name: 'R6C9',
      description: 'R6C9',
      collection: 'Numbers'
    },
    {
      name: 'R7C1',
      description: 'R7C1',
      collection: 'Numbers'
    },
    {
      name: 'R7C2',
      description: 'R7C2',
      collection: 'Numbers'
    },
    {
      name: 'R7C3',
      description: 'R7C3',
      collection: 'Numbers'
    },
    {
      name: 'R7C4',
      description: 'R7C4',
      collection: 'Numbers'
    },
    {
      name: 'R7C5',
      description: 'R7C5',
      collection: 'Numbers'
    },
    {
      name: 'R7C6',
      description: 'R7C6',
      collection: 'Numbers'
    },
    {
      name: 'R7C7',
      description: 'R7C7',
      collection: 'Numbers'
    },
    {
      name: 'R7C8',
      description: 'R7C8',
      collection: 'Numbers'
    },
    {
      name: 'R7C9',
      description: 'R7C9',
      collection: 'Numbers'
    },
    {
      name: 'R8C1',
      description: 'R8C1',
      collection: 'Numbers'
    },
    {
      name: 'R8C2',
      description: 'R8C2',
      collection: 'Numbers'
    },
    {
      name: 'R8C3',
      description: 'R8C3',
      collection: 'Numbers'
    },
    {
      name: 'R8C4',
      description: 'R8C4',
      collection: 'Numbers'
    },
    {
      name: 'R8C5',
      description: 'R8C5',
      collection: 'Numbers'
    },
    {
      name: 'R8C6',
      description: 'R8C6',
      collection: 'Numbers'
    },
    {
      name: 'R8C7',
      description: 'R8C7',
      collection: 'Numbers'
    },
    {
      name: 'R8C8',
      description: 'R8C8',
      collection: 'Numbers'
    },
    {
      name: 'R8C9',
      description: 'R8C9',
      collection: 'Numbers'
    },
    {
      name: 'R9C1',
      description: 'R9C1',
      collection: 'Numbers'
    },
    {
      name: 'R9C2',
      description: 'R9C2',
      collection: 'Numbers'
    },
    {
      name: 'R9C3',
      description: 'R9C3',
      collection: 'Numbers'
    },
    {
      name: 'R9C4',
      description: 'R9C4',
      collection: 'Numbers'
    },
    {
      name: 'R9C5',
      description: 'R9C5',
      collection: 'Numbers'
    },
    {
      name: 'R9C6',
      description: 'R9C6',
      collection: 'Numbers'
    },
    {
      name: 'R9C7',
      description: 'R9C7',
      collection: 'Numbers'
    },
    {
      name: 'R9C8',
      description: 'R9C8',
      collection: 'Numbers'
    },
    {
      name: 'R9C9',
      description: 'R9C9',
      collection: 'Numbers'
    }
  ],
  classes: [
    {
      name: '1',
      description: '1',
      collection: 'Numbers',
      number: '1',
      symbol: '1'
    },
    {
      name: '2',
      description: '2',
      collection: 'Numbers',
      number: '2',
      symbol: '2'
    },
    {
      name: '3',
      description: '3',
      collection: 'Numbers',
      number: '3',
      symbol: '3'
    },
    {
      name: '4',
      description: '4',
      collection: 'Numbers',
      number: '4',
      symbol: '4'
    },
    {
      name: '5',
      description: '5',
      collection: 'Numbers',
      number: '5',
      symbol: '5'
    },
    {
      name: '6',
      description: '6',
      collection: 'Numbers',
      number: '6',
      symbol: '6'
    },
    {
      name: '7',
      description: '7',
      collection: 'Numbers',
      number: '7',
      symbol: '7'
    },
    {
      name: '8',
      description: '8',
      collection: 'Numbers',
      number: '8',
      symbol: '8'
    },
    {
      name: '9',
      description: '9',
      collection: 'Numbers',
      number: '9',
      symbol: '9'
    }
  ],
  numbers: [
    {
      name: '0',
      description: '0',
      value: 0
    },
    {
      name: '1',
      description: '1',
      value: 1
    },
    {
      name: '2',
      description: '2',
      operation: 'SUM',
      numbers: [
        '1',
        '1'
      ]
    },
    {
      name: '3',
      description: '3',
      operation: 'MINIMUM',
      numbers: [
        '8',
        '3 (Value)'
      ]
    },
    {
      name: '4',
      description: '4',
      operation: 'FRACTION',
      number1: '8',
      number2: '2'
    },
    {
      name: '5',
      description: '5',
      operation: 'IF',
      boolean: 'True',
      number1: '5 (Value)',
      number2: '8'
    },
    {
      name: '6',
      description: '6',
      operation: 'PRODUCT',
      numbers: [
        '1',
        '2',
        '3'
      ]
    },
    {
      name: '7',
      description: '7',
      operation: 'DIFFERENCE',
      number1: '8',
      number2: '2'
    },
    {
      name: '8',
      description: '8',
      operation: 'MAXIMUM',
      numbers: [
        '8 (Value)',
        '1',
        '2'
      ]
    },
    {
      name: '9',
      description: '9',
      operation: 'POWER',
      number1: '3',
      number2: '2'
    },
    {
      name: '3 (Value)',
      description: '3 (Value)',
      value: 3
    },
    {
      name: '5 (Value)',
      description: '5 (Value)',
      value: 5
    },
    {
      name: '8 (Value)',
      description: '8 (Value)',
      value: 8
    },
    {
      name: 'Cell Size',
      description: 'Width and Height of Cells',
      value: 560
    },
    {
      name: 'X1',
      description: 'X1',
      operation: 'PRODUCT',
      numbers: [
        '0',
        'Cell Size'
      ]
    },
    {
      name: 'X2',
      description: 'X2',
      operation: 'PRODUCT',
      numbers: [
        '1',
        'Cell Size'
      ]
    },
    {
      name: 'X3',
      description: 'X3',
      operation: 'PRODUCT',
      numbers: [
        '2',
        'Cell Size'
      ]
    },
    {
      name: 'X4',
      description: 'X4',
      operation: 'PRODUCT',
      numbers: [
        '3',
        'Cell Size'
      ]
    },
    {
      name: 'X5',
      description: 'X5',
      operation: 'PRODUCT',
      numbers: [
        '4',
        'Cell Size'
      ]
    },
    {
      name: 'X6',
      description: 'X6',
      operation: 'PRODUCT',
      numbers: [
        '5',
        'Cell Size'
      ]
    },
    {
      name: 'X7',
      description: 'X7',
      operation: 'PRODUCT',
      numbers: [
        '6',
        'Cell Size'
      ]
    },
    {
      name: 'X8',
      description: 'X8',
      operation: 'PRODUCT',
      numbers: [
        '7',
        'Cell Size'
      ]
    },
    {
      name: 'X9',
      description: 'X9',
      operation: 'PRODUCT',
      numbers: [
        '8',
        'Cell Size'
      ]
    },
    {
      name: 'Y1',
      description: 'Y1',
      operation: 'PRODUCT',
      numbers: [
        '0',
        'Cell Size'
      ]
    },
    {
      name: 'Y2',
      description: 'Y2',
      operation: 'PRODUCT',
      numbers: [
        '1',
        'Cell Size'
      ]
    },
    {
      name: 'Y3',
      description: 'Y3',
      operation: 'PRODUCT',
      numbers: [
        '2',
        'Cell Size'
      ]
    },
    {
      name: 'Y4',
      description: 'Y4',
      operation: 'PRODUCT',
      numbers: [
        '3',
        'Cell Size'
      ]
    },
    {
      name: 'Y5',
      description: 'Y5',
      operation: 'PRODUCT',
      numbers: [
        '4',
        'Cell Size'
      ]
    },
    {
      name: 'Y6',
      description: 'Y6',
      operation: 'PRODUCT',
      numbers: [
        '5',
        'Cell Size'
      ]
    },
    {
      name: 'Y7',
      description: 'Y7',
      operation: 'PRODUCT',
      numbers: [
        '6',
        'Cell Size'
      ]
    },
    {
      name: 'Y8',
      description: 'Y8',
      operation: 'PRODUCT',
      numbers: [
        '7',
        'Cell Size'
      ]
    },
    {
      name: 'Y9',
      description: 'Y9',
      operation: 'PRODUCT',
      numbers: [
        '8',
        'Cell Size'
      ]
    }
  ],
  booleans: [
    {
      name: 'True',
      description: 'True',
      value: true
    }
  ],
  layers: [
    {
      type: 'GROUP',
      name: 'Layout',
      description: 'Layout',
      layers: [
        'Interfaces',
        'Divisions'
      ]
    },
    {
      type: 'GROUP',
      name: 'Interfaces',
      description: 'Interfaces',
      layers: [
        'R1C1',
        'R1C2',
        'R1C3',
        'R1C4',
        'R1C5',
        'R1C6',
        'R1C7',
        'R1C8',
        'R1C9',
        'R2C1',
        'R2C2',
        'R2C3',
        'R2C4',
        'R2C5',
        'R2C6',
        'R2C7',
        'R2C8',
        'R2C9',
        'R3C1',
        'R3C2',
        'R3C3',
        'R3C4',
        'R3C5',
        'R3C6',
        'R3C7',
        'R3C8',
        'R3C9',
        'R4C1',
        'R4C2',
        'R4C3',
        'R4C4',
        'R4C5',
        'R4C6',
        'R4C7',
        'R4C8',
        'R4C9',
        'R5C1',
        'R5C2',
        'R5C3',
        'R5C4',
        'R5C5',
        'R5C6',
        'R5C7',
        'R5C8',
        'R5C9',
        'R6C1',
        'R6C2',
        'R6C3',
        'R6C4',
        'R6C5',
        'R6C6',
        'R6C7',
        'R6C8',
        'R6C9',
        'R7C1',
        'R7C2',
        'R7C3',
        'R7C4',
        'R7C5',
        'R7C6',
        'R7C7',
        'R7C8',
        'R7C9',
        'R8C1',
        'R8C2',
        'R8C3',
        'R8C4',
        'R8C5',
        'R8C6',
        'R8C7',
        'R8C8',
        'R8C9',
        'R9C1',
        'R9C2',
        'R9C3',
        'R9C4',
        'R9C5',
        'R9C6',
        'R9C7',
        'R9C8',
        'R9C9'
      ]
    },
    {
      type: 'INTERFACE',
      name: 'R1C1',
      description: 'R1C1',
      object: 'R1C1',
      x: 'X1',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C2',
      description: 'R1C2',
      object: 'R1C2',
      x: 'X2',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C3',
      description: 'R1C3',
      object: 'R1C3',
      x: 'X3',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C4',
      description: 'R1C4',
      object: 'R1C4',
      x: 'X4',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C5',
      description: 'R1C5',
      object: 'R1C5',
      x: 'X5',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C6',
      description: 'R1C6',
      object: 'R1C6',
      x: 'X6',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C7',
      description: 'R1C7',
      object: 'R1C7',
      x: 'X7',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C8',
      description: 'R1C8',
      object: 'R1C8',
      x: 'X8',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R1C9',
      description: 'R1C9',
      object: 'R1C9',
      x: 'X9',
      y: 'Y1',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C1',
      description: 'R2C1',
      object: 'R2C1',
      x: 'X1',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C2',
      description: 'R2C2',
      object: 'R2C2',
      x: 'X2',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C3',
      description: 'R2C3',
      object: 'R2C3',
      x: 'X3',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C4',
      description: 'R2C4',
      object: 'R2C4',
      x: 'X4',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C5',
      description: 'R2C5',
      object: 'R2C5',
      x: 'X5',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C6',
      description: 'R2C6',
      object: 'R2C6',
      x: 'X6',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C7',
      description: 'R2C7',
      object: 'R2C7',
      x: 'X7',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C8',
      description: 'R2C8',
      object: 'R2C8',
      x: 'X8',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R2C9',
      description: 'R2C9',
      object: 'R2C9',
      x: 'X9',
      y: 'Y2',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C1',
      description: 'R3C1',
      object: 'R3C1',
      x: 'X1',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C2',
      description: 'R3C2',
      object: 'R3C2',
      x: 'X2',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C3',
      description: 'R3C3',
      object: 'R3C3',
      x: 'X3',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C4',
      description: 'R3C4',
      object: 'R3C4',
      x: 'X4',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C5',
      description: 'R3C5',
      object: 'R3C5',
      x: 'X5',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C6',
      description: 'R3C6',
      object: 'R3C6',
      x: 'X6',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C7',
      description: 'R3C7',
      object: 'R3C7',
      x: 'X7',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C8',
      description: 'R3C8',
      object: 'R3C8',
      x: 'X8',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R3C9',
      description: 'R3C9',
      object: 'R3C9',
      x: 'X9',
      y: 'Y3',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C1',
      description: 'R4C1',
      object: 'R4C1',
      x: 'X1',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C2',
      description: 'R4C2',
      object: 'R4C2',
      x: 'X2',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C3',
      description: 'R4C3',
      object: 'R4C3',
      x: 'X3',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C4',
      description: 'R4C4',
      object: 'R4C4',
      x: 'X4',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C5',
      description: 'R4C5',
      object: 'R4C5',
      x: 'X5',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C6',
      description: 'R4C6',
      object: 'R4C6',
      x: 'X6',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C7',
      description: 'R4C7',
      object: 'R4C7',
      x: 'X7',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C8',
      description: 'R4C8',
      object: 'R4C8',
      x: 'X8',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R4C9',
      description: 'R4C9',
      object: 'R4C9',
      x: 'X9',
      y: 'Y4',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C1',
      description: 'R5C1',
      object: 'R5C1',
      x: 'X1',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C2',
      description: 'R5C2',
      object: 'R5C2',
      x: 'X2',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C3',
      description: 'R5C3',
      object: 'R5C3',
      x: 'X3',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C4',
      description: 'R5C4',
      object: 'R5C4',
      x: 'X4',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C5',
      description: 'R5C5',
      object: 'R5C5',
      x: 'X5',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C6',
      description: 'R5C6',
      object: 'R5C6',
      x: 'X6',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C7',
      description: 'R5C7',
      object: 'R5C7',
      x: 'X7',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C8',
      description: 'R5C8',
      object: 'R5C8',
      x: 'X8',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R5C9',
      description: 'R5C9',
      object: 'R5C9',
      x: 'X9',
      y: 'Y5',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C1',
      description: 'R6C1',
      object: 'R6C1',
      x: 'X1',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C2',
      description: 'R6C2',
      object: 'R6C2',
      x: 'X2',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C3',
      description: 'R6C3',
      object: 'R6C3',
      x: 'X3',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C4',
      description: 'R6C4',
      object: 'R6C4',
      x: 'X4',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C5',
      description: 'R6C5',
      object: 'R6C5',
      x: 'X5',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C6',
      description: 'R6C6',
      object: 'R6C6',
      x: 'X6',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C7',
      description: 'R6C7',
      object: 'R6C7',
      x: 'X7',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C8',
      description: 'R6C8',
      object: 'R6C8',
      x: 'X8',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R6C9',
      description: 'R6C9',
      object: 'R6C9',
      x: 'X9',
      y: 'Y6',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C1',
      description: 'R7C1',
      object: 'R7C1',
      x: 'X1',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C2',
      description: 'R7C2',
      object: 'R7C2',
      x: 'X2',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C3',
      description: 'R7C3',
      object: 'R7C3',
      x: 'X3',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C4',
      description: 'R7C4',
      object: 'R7C4',
      x: 'X4',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C5',
      description: 'R7C5',
      object: 'R7C5',
      x: 'X5',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C6',
      description: 'R7C6',
      object: 'R7C6',
      x: 'X6',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C7',
      description: 'R7C7',
      object: 'R7C7',
      x: 'X7',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C8',
      description: 'R7C8',
      object: 'R7C8',
      x: 'X8',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R7C9',
      description: 'R7C9',
      object: 'R7C9',
      x: 'X9',
      y: 'Y7',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C1',
      description: 'R8C1',
      object: 'R8C1',
      x: 'X1',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C2',
      description: 'R8C2',
      object: 'R8C2',
      x: 'X2',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C3',
      description: 'R8C3',
      object: 'R8C3',
      x: 'X3',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C4',
      description: 'R8C4',
      object: 'R8C4',
      x: 'X4',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C5',
      description: 'R8C5',
      object: 'R8C5',
      x: 'X5',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C6',
      description: 'R8C6',
      object: 'R8C6',
      x: 'X6',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C7',
      description: 'R8C7',
      object: 'R8C7',
      x: 'X7',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C8',
      description: 'R8C8',
      object: 'R8C8',
      x: 'X8',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R8C9',
      description: 'R8C9',
      object: 'R8C9',
      x: 'X9',
      y: 'Y8',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C1',
      description: 'R9C1',
      object: 'R9C1',
      x: 'X1',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C2',
      description: 'R9C2',
      object: 'R9C2',
      x: 'X2',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C3',
      description: 'R9C3',
      object: 'R9C3',
      x: 'X3',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C4',
      description: 'R9C4',
      object: 'R9C4',
      x: 'X4',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C5',
      description: 'R9C5',
      object: 'R9C5',
      x: 'X5',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C6',
      description: 'R9C6',
      object: 'R9C6',
      x: 'X6',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C7',
      description: 'R9C7',
      object: 'R9C7',
      x: 'X7',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C8',
      description: 'R9C8',
      object: 'R9C8',
      x: 'X8',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'INTERFACE',
      name: 'R9C9',
      description: 'R9C9',
      object: 'R9C9',
      x: 'X9',
      y: 'Y9',
      width: 'Cell Size',
      height: 'Cell Size'
    },
    {
      type: 'GROUP',
      name: 'Divisions',
      description: 'Divisions',
      layers: [

      ]
    }
  ]
}
