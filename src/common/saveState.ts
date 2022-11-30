import React from 'react';

export function useState() {
  const [ flashMessage, setFlashMessage ] = React.useState<string | undefined>(undefined);
  const [ flashState, setFlashState ] = React.useState<'show' | 'fade' | 'hide'>('hide');
  const [ flashColor, setFlashColor ] = React.useState<'accent' | 'opposite' | 'failure'>('opposite');
  const [ saveFlashTimeout, setFlashTimeout ] = React.useState<NodeJS.Timeout | undefined>(undefined);

  return {
    clearFlashTimeout: () => {
      if (saveFlashTimeout !== undefined) {
        clearTimeout(saveFlashTimeout);
        setFlashTimeout(undefined);
      }
    },
    showFlash: (message: string, color: 'accent' | 'opposite' | 'failure') => {
      setFlashColor(color);
      setFlashState('show');
      setFlashMessage(message);

      const newFadeStateTimeout = setTimeout(() => {
        setFlashState('fade');
  
        const newHideStateTimeout = setTimeout(() => {
          setFlashState('hide');
        }, 4000);
  
        setFlashTimeout(newHideStateTimeout);
      }, 1000);

      setFlashTimeout(newFadeStateTimeout);
    },
    flash: { state: flashState, color: flashColor, message: flashMessage }
  };
}
