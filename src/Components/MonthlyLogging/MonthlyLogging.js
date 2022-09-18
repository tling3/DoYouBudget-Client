import React from 'react'
import PageHeader from '../../Shared/Components/PageHeader';

class MonthlyLogging extends React.Component {


    getHeader = () => {
        return (
            <React.Fragment>
                <PageHeader title='Logging' icon='list alternate outline icon' />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                {this.getHeader()}
            </div>
        );
    }
}

export default MonthlyLogging