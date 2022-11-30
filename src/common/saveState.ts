import React from 'react';

export class saveStateHandler {
  state: 'show' | 'fade' | 'hide';
  setState: React.Dispatch<React.SetStateAction<'show' | 'fade' | 'hide'>>;
  saveStateTimeout: NodeJS.Timeout | undefined;
  setSaveStateTimeout: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>;

  constructor() {
    [ this.state, this.setState ] = React.useState<'show' | 'fade' | 'hide'>('hide');
    [ this.saveStateTimeout, this.setSaveStateTimeout ] = React.useState<NodeJS.Timeout | undefined>(undefined);
  }

  clearTimeout = (): void => {
    if (this.saveStateTimeout !== undefined) {
      clearTimeout(this.saveStateTimeout);
      this.setSaveStateTimeout(undefined);
      this.setState('hide');
    }
  }

  show = (): void => {
    this.setState('show');

    setTimeout(() => {
      this.setState('fade');

      const newSaveStateTimeout = setTimeout(() => {
        this.setState('hide');
      }, 4000);

      this.setSaveStateTimeout(newSaveStateTimeout);
    }, 1000);
  }
}
