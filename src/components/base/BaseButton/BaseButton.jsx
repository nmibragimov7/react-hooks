import React from 'react';

import styles from './BaseButton.module.scss';

const BaseButton = (props) => {
    const { disabled = false, className, children, onClick } = props;

    return (
        <button
            disabled={disabled}
            className={[styles.BaseButton, className].join(" ")}
            onClick={onClick}
        >
            { children }
        </button>
    );
};

export default BaseButton;
