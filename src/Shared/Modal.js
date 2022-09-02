import React from 'react'
import ReactDOM from 'react-dom'
import history from '../History'

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={() => history.push(props.historyPush)} className='ui dimmer modals visible active'>
            <div onClick={e => e.stopPropagation()} className='ui standard modal visible active'>
                <div className='header'>
                    <div className='scrolling content'>
                        {props.children}
                    </div>
                    {/* <div className='actions'></div> */}
                </div>
            </div>
        </div>,
        document.querySelector('#modal'))
}

export default Modal