import React from 'react';

export function useSaveStatus() {
  const [ state, setState ] = React.useState<'show' | 'fade' | 'hide'>('hide');
  const [ saveStateTimeout, setSaveStateTimeout ] = React.useState<NodeJS.Timeout | undefined>(undefined);

  return {
    clearTimeout: () => {
      if (saveStateTimeout !== undefined) {
        clearTimeout(saveStateTimeout);
        setSaveStateTimeout(undefined);
        setState('hide');
      }
    },
    show: () => {
      setState('show');

      setTimeout(() => {
        setState('fade');
  
        const newSaveStateTimeout = setTimeout(() => {
          setState('hide');
        }, 4000);
  
        setSaveStateTimeout(newSaveStateTimeout);
      }, 1000);  
    },
    state: state
  };
}
