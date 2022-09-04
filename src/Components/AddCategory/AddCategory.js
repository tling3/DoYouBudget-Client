import React from 'react'
import Modal from '../../Shared/Modal'

class AddCategories extends React.Component {
    addCategories() {
        return <div>
            Add a Category
        </div>
    }

    render() {
        return (
            <Modal onDismiss='/categories'>
                {this.addCategories()}
            </Modal>
        );
    }
}

export default AddCategories