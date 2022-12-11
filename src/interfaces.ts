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

/* ASINO */
export interface AsinoPuzzle {
  id?: string;
  title?: string;
  userId?: string;
  collections?: AsinoCollection[];
  objects?: AsinoObject[];
  classes?: AsinoClass[];
  numbers?: AsinoNumber[];
  layers?: AsinoLayer[];
  colors?: AsinoColor[];
}

export interface AsinoColor {
  name?: string;
  hueLight?: number;
  hueDark?: number;
  hueLightName?: 'red' | 'orange' | 'yellow' | 'chartreuse' | 'green' | 'mint' | 'cyan' | 'azure' | 'blue' | 'violet' | 'magenta' | 'pink';
  hueDarkName?: 'red' | 'orange' | 'yellow' | 'chartreuse' | 'green' | 'mint' | 'cyan' | 'azure' | 'blue' | 'violet' | 'magenta' | 'pink';
}

export interface AsinoLayer {
  name?: string;
  objectName?: string;
  textFillName?: string;
  rectFillFormula?: AsinoColor;
  layers?: AsinoLayer[];
  x?: AsinoNumber;
  y?: AsinoNumber;
  width?: number;
  widthName?: string;
  height?: number;
  heightName?: string;
}

export interface AsinoCollection {
  name?: string;
}

export interface AsinoObject {
  name?: string;
  collectionName?: string;
}

export interface AsinoClass {
  name?: string;
  collectionName?: string;
  number?: AsinoNumber;
}

export interface AsinoNumber {
  name?: string;
  value?: number;
  operator?: 'SUM_OF' | 'MAXIMUM_OF' | 'MINIMUM_OF' | 'PRODUCT_OF' | 'DIVIDE_BY';
  numbers?: AsinoNumber[];
  numberLeft?: AsinoNumber;
  numberRight?: AsinoNumber;
}

export const asinoText: AsinoPuzzle = {
  id: '0-00-000',
  title: 'Asino Test',
  userId: '0-00',
  collections: [
    {
      name: 'Numbers'
    }
  ],
  objects: [
    {
      name: 'R1C1',
      collectionName: 'Numbers'
    }
  ],
  classes: [
    {
      name: '1',
      collectionName: 'Numbers',
      number: {
        value: 1
      }
    },
    {
      name: '2',
      collectionName: 'Numbers',
      number: {
        name: '2'
      }
    },
    {
      name: '3',
      collectionName: 'Numbers',
      number: {
        value: 3
      }
    },
    {
      name: '4',
      collectionName: 'Numbers',
      number: {
        name: '4'
      }
    },
    {
      name: '5',
      collectionName: 'Numbers',
      number: {
        operator: 'SUM_OF',
        numbers: [
          {
            value: 3
          },
          {
            name: '2'
          }
        ]
      }
    },
    {
      name: '6',
      collectionName: 'Numbers',
      number: {
        operator: 'MAXIMUM_OF',
        numbers: [
          {
            value: 6
          },
          {
            name: '7'
          }
        ]
      }
    },
    {
      name: '7',
      collectionName: 'Numbers',
      number: {
        operator: 'MINIMUM_OF',
        numbers: [
          {
            name: '7'
          },
          {
            name: '9'
          }
        ]
      }
    },
    {
      name: '8',
      collectionName: 'Numbers',
      number: {
        name: '8'
      }
    }
  ],
  numbers: [
    {
      name: '2',
      value: 2
    },
    {
      name: '4',
      value: 4
    },
    {
      name: '7',
      value: 7
    },
    {
      name: '9',
      value: 9
    },
    {
      name: 'Cell Size',
      value: 560
    },
    {
      name: '8',
      operator: 'DIVIDE_BY',
      numberLeft: {
        value: 16
      },
      numberRight: {
        name: '2'
      }  
    }
  ],
  layers: [
    {
      name: 'Interface Group',
      layers: [
        {
          objectName: 'R1C1',
          textFillName: 'Color Of Text',
          rectFillFormula: {
            /* ??? want to get the colour from the interface's object's class and the others in that set */
          },
          x: {
            operator: 'PRODUCT_OF',
            numbers: [
              {
                value: 0
              },
              {
                name: 'Cell Size'
              }
            ]
          },
          y: {
            operator: 'PRODUCT_OF',
            numbers: [
              {
                value: 0
              },
              {
                name: 'Cell Size'
              }
            ]            
          },
          widthName: 'Cell Size',
          heightName: 'Cell Size'
        }
      ]
    }
  ],
  colors: [
    {
      name: 'Color Of Text'
      /* ??? want to get the colour from the interface's object's class and the others in that set */
    }
  ]
}
