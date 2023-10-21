import React, { useState, useEffect, useRef } from "react";
import "./css/colourpicker.css";

export default function ColorPicker({ value, onChange }) {
    const [color, setColor] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef(null);

    
    useEffect(() => {
        setColor(value);
    }, [value]);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const colors = [
        "#EDF2F7", "#990000", "#005C2B", "#1B4E7E", "#750044", "#48239F", "#171923"
    ];

    

    return (
        <div ref={pickerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button 
                aria-label={color}
                style={{ background: color }}
                className="color-picker-button"
                onClick={() => setIsOpen(!isOpen)}
            ></button>
            {isOpen && (
                <div className={`color-picker-content ${isOpen ? 'visible' : ''}`}>
                    <div className="color-picker-grid">
                        {colors.map((c) => (
                            <button
                                key={c}
                                aria-label={c}
                                style={{ background: c }}
                                className="color-picker-button"
                                onClick={() => {
                                    onChange(c);
                                    setIsOpen(!isOpen);

                                }}
                            ></button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
