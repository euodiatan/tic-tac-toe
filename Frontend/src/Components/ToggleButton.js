import React, { useContext } from 'react';
import { CustomisationContext } from './CustomisationContext';

function ToggleButton() {
    const { accessibilityMode, toggleAccessibilityMode } = useContext(CustomisationContext);

    
    return (
        <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="accessibility-toggle">Accessibility Mode:</label>
            <input 
                id="accessibility-toggle" 
                type="checkbox" 
                onChange={toggleAccessibilityMode} 
                checked={accessibilityMode} 
            />
        </div>
    );
}

export default ToggleButton;
