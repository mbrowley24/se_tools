import React, { useState } from 'react';
import '../../css/../css/tooltip/tooltiperror.css';

const TooltipError = ({ text, children, show }) => {
    const [showTooltip, setShowTooltip] = useState(false);


    return (
    <div className="tooltip-container">
        {children}
        {show && <div className="tooltip">{text}</div>}
    </div>
    );
};

export default TooltipError;
