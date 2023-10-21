import { React, useState } from 'react';
import ColorPicker from '../Components/ColorPicker';
import { useCustomisation } from '../Components/CustomisationContext';
import styles from './css/customisationpage.module.css';


export default function CustomisationPage() {
    const { buttonSize, setButtonSize, fontSize, setFontSize, fontColor, setFontColor, buttonColor, setButtonColor, colorMode, setColorMode } = useCustomisation();

    
    const toggleButtonSize = () => {
        const newSize = buttonSize === '2.5rem' ? '3rem' : '2.5rem';
        setButtonSize(newSize);
    };

    const toggleFontSize = () => {
        const newSize = fontSize === '3rem' ? '4rem' : '3rem';
        setFontSize(newSize);
    };

    const handleFontColorChange = (newColor) => {
        setFontColor(newColor);
    };

    const handleButtonColorChange = (newColor) => {
        setButtonColor(newColor);
    };

    const toggleColorMode = () => {
        if (colorMode === 'light') {
          setColorMode('dark');
        } else {
          setColorMode('light');  
          document.documentElement.removeAttribute('data-theme'); // Remove the data-theme attribute
        }
      };
    
      

    return (
        <div className={styles.customisationcontainer}>
            <div className={styles.colorssection}>
                <h2 className={styles.headingLg}>Colors</h2>
                <div className={styles.coloroption}>
                    <h2 className={styles.headingMd}>Dark Mode:</h2>
                    <input type="checkbox" onChange={toggleColorMode} checked={colorMode === 'dark'} />
                </div>
                <div className={styles.coloroption}>
                    <h2 className={styles.headingMd}>Buttons:</h2>
                    <ColorPicker value={buttonColor} onChange={handleButtonColorChange} />
                </div>
                <div className={styles.coloroption}>
                    <h2 className={styles.headingMd}>Fonts:</h2>
                    <ColorPicker value={fontColor} onChange={handleFontColorChange} />
                </div>
            </div>

            <div className={styles.sizessection}>
                <h2 className={styles.headingLg}>Sizes</h2>
                <div className={styles.sizeoption}>
                    <h2 className={styles.headingMd}>Fonts:</h2>
                    <div className={styles.toggleContainer}>
                        <label className={styles.sizeLabel}>L</label>
                        <input type="checkbox" checked={fontSize === '4rem'} onChange={toggleFontSize} />
                        <label className={styles.sizeLabel}>XL</label>
                    </div>
                </div>
                <div className={styles.sizeoption}>
                    <h2 className={styles.headingMd}>Buttons:</h2>
                    <div className={styles.toggleContainer}>
                        <label className={styles.sizeLabel}>L</label>
                        <input type="checkbox" checked={buttonSize === '3rem'} onChange={toggleButtonSize} />
                        <label className={styles.sizeLabel}>XL</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
