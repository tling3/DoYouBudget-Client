import React from 'react'
import Modal from '../Shared/Modal'

class Paw4 extends React.Component {
    renderPaw4() {
        return (
            <div>Paw 4</div>
        );
    }

    render() {
        return (
            <Modal onDismiss='/categories'>
                {this.renderPaw4()}
            </Modal>
        );
    }
}

export default Paw4