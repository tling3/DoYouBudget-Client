import React from 'react'
import Modal from '../Shared/Modal'

class Paw2 extends React.Component {
    renderPaw2() {
        return (
            <div>Paw 2</div>
        );
    }

    render() {
        return (
            <Modal onDismiss='/categories'>
                {this.renderPaw2()}
            </Modal>
        );
    }
}

export default Paw2