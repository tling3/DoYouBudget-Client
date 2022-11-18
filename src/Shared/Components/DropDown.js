import React, { useState } from 'react'

const DropDown = ({ options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false)

    const renderOptions = options.map(option => {
        if (option.id === selected.id) {
            return null
        }

        return (
            <div
                key={option.id}
                className='item'
                onClick={() => { onSelectedChange(option) }}
            >
                {option.type}
            </div>
        );
    });

    return (
        <div className='ui form'>
            <div className='field'>
                <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className='dropdown icon'></i>
                    <div className='text'>{selected.type}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderOptions}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDown