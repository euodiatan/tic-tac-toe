import React, { createContext, useState, useContext, useEffect } from 'react';

export const CustomisationContext = createContext();

export const CustomisationProvider = ({ children }) => {
  // These state variables will store customisation settings like button size, font size, etc.
   // If you want to add more customisable elements, define their state variables below this comment. Update this!
   
  const [buttonSize, setButtonSize] = useState(localStorage.getItem('buttonSize') || '2.5rem');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '3rem');
  const [fontColor, setFontColor] = useState(localStorage.getItem('fontColor') || '#EDF2F7');
  const [buttonColor, setButtonColor] = useState(localStorage.getItem('buttonColor') || '#005C2B');
  const [colorMode, setColorMode] = useState(localStorage.getItem('colorMode') || 'dark');

  //Don't touch this, it is for the accessibility toggle button.
  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    const storedAccessibilityMode = JSON.parse(localStorage.getItem('accessibilityMode'));
    return storedAccessibilityMode !== null ? storedAccessibilityMode : false;
  });

  const toggleAccessibilityMode = () => {
    setAccessibilityMode(prev => !prev);
    setColorMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Use the useEffect hook to update localStorage whenever the customisation settings change.
  
   useEffect(() => {
    localStorage.setItem('accessibilityMode', JSON.stringify(accessibilityMode));
  }, [accessibilityMode]);

  // If you add more customisable elements, remember to save their values to localStorage here. Update this!
   useEffect(() => {
    if(colorMode === 'dark') {
      document.documentElement.setAttribute('data-theme', colorMode);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('colorMode', colorMode);
    localStorage.setItem('buttonSize', buttonSize);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('buttonColor', buttonColor);
    localStorage.setItem('fontColor', fontColor);

  }, [buttonSize, fontSize, buttonColor, fontColor,  colorMode, accessibilityMode]); // Update this to enable saving of settings whenever it changes!
  
  //Update the provider values so it can apply to your entire application
  return (
    <CustomisationContext.Provider value={{ buttonSize, setButtonSize, fontSize, setFontSize, fontColor, setFontColor, buttonColor, setButtonColor, colorMode, accessibilityMode, toggleAccessibilityMode, setColorMode
       }}> 
      {children}
    </CustomisationContext.Provider>
  );
};


export const useCustomisation = () => {
  return useContext(CustomisationContext);
};
