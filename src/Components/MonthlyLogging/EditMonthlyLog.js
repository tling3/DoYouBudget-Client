import React from 'react'
import Modal from '../../Shared/Modal'
import history from '../../History'

class EditMonthlyLog extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id
        console.log("id", id)
    }

    renderContent = () => {
        return (
            <div>
                Edit Monthly Log
            </div>
        );
    }

    render() {
        return (
            <Modal
                title='Edit Log Record'
                content={this.renderContent()}
                actions=''
                onDismiss={() => { history.push('/monthlyLogging') }}
            />
        );
    }
}

export default EditMonthlyLog;