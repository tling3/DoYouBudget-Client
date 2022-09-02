import React from 'react'
import Modal from '../../Shared/Modal'

class AddCategories extends React.Component {


    addCategories() {
        return <div>
            Add a Category
        </div>
    }

    render() {
        const thisRoute = '/categories'
        
        return (
            <Modal historyPush={thisRoute}>
                {this.addCategories()}
            </Modal>
        );
    }
}

export default AddCategories