import { useState } from 'react';

import { Form } from 'antd';

import './index.css';

const FloatLabel = props => {
    const [focus, setFocus] = useState(false);
    const { children, label, value, className } = props;


    const labelClass =
        focus || (value && value.length !== 0) ? `label label-float ${className || ''}` : `label ${className || ''}`;

    return (
        <Form.Item className='float-label' onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
            {children}
            <label className={labelClass}>{label}</label>
        </Form.Item>
    );
};

export default FloatLabel;
