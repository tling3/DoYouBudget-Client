import React from 'react'
import Modal from '../Shared/Modal'

class Paw3 extends React.Component {
    renderPaw3() {
        return (
            <div>Paw 3</div>
        );
    }

    render() {
        return (
            <Modal onDismiss='/categories'>
                {this.renderPaw3()}
            </Modal>
        );
    }
}

export default Paw3