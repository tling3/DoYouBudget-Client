import React from 'react'
import Modal from '../Shared/Modal'

class Paw1 extends React.Component {
    renderPaw1() {
        return (
            <div>Paw 1</div>
        );
    }

    render() {
        return (
            <Modal onDismiss='/categories'>
                {this.renderPaw1()}
            </Modal>
        );
    }
}

export default Paw1