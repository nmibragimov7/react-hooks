import React from 'react';

import styles from './BaseInput.module.scss';

const BaseInput = (props) => {
    const {
        name,
        inputRef = null,
        value,
        type = "text",
        placeholder,
        className,
        autoComplete = "off",
        onChange
    } = props;

    return (
        <>
            <input
                name={name}
                ref={inputRef}
                value={value}
                placeholder={placeholder}
                type={type}
                className={[styles.BaseInput, className].join(" ")}
                autoComplete={autoComplete}
                onChange={onChange}
            />
        </>
    );
};

export default BaseInput;
