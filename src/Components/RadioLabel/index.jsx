import { useState } from 'react';
import './index.css';

const RadioLabel = ({ children, label, value, active }) => {
    const [focus, setFocus] = useState(false);

    const labelClass = focus || value === active ? 'radio-label-normal radio-label-active' : 'radio-label-normal';
    return (
        <div className='radio-label' onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
            {children}
            <label className={labelClass}>{label}</label>
        </div>
    );
};

export default RadioLabel;
