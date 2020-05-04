import React from 'react';

const ButtonComponent = (props) => {
    return (
        <div className="button-outer" onClick={props.onClick}>
            <span className = "button-inner">
                {props.title}
            </span>
        </div>


    );
}

export default ButtonComponent;