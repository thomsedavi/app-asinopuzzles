import React from 'react';

export function useSaveStatus() {
  const [ state, setState ] = React.useState<'showFailure' | 'fadeFailure' | 'showSuccess' | 'fadeSuccess' | 'hide'>('hide');
  const [ saveStateTimeout, setSaveStateTimeout ] = React.useState<NodeJS.Timeout | undefined>(undefined);

  return {
    clearTimeout: () => {
      if (saveStateTimeout !== undefined) {
        clearTimeout(saveStateTimeout);
        setSaveStateTimeout(undefined);
      }
    },
    showSuccess: () => {
      setState('showSuccess');

      const newFadeStateTimeout = setTimeout(() => {
        setState('fadeSuccess');
  
        const newHideStateTimeout = setTimeout(() => {
          setState('hide');
        }, 4000);
  
        setSaveStateTimeout(newHideStateTimeout);
      }, 1000);

      setSaveStateTimeout(newFadeStateTimeout);
    },
    showFailure: () => {
      setState('showFailure');

      const newFadeStateTimeout = setTimeout(() => {
        setState('fadeFailure');
  
        const newHideStateTimeout = setTimeout(() => {
          setState('hide');
        }, 4000);
  
        setSaveStateTimeout(newHideStateTimeout);
      }, 1000);

      setSaveStateTimeout(newFadeStateTimeout);
    },
    state: state
  };
}
