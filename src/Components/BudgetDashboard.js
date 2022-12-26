import React from 'react'
import PageHeader from '../Shared/Components/PageHeader'

class BudgetDashboard extends React.Component {

    getHeader = () => {
        return (
            <PageHeader title='Budget Dashboard' icon='chart line icon' />
        );
    }

    renderBudgetDashboardTable = () => {
        return (
            <table className='ui selectable celled table'>
                <thead>
                    <tr>
                        <th>One</th>
                        <th>Two</th>
                        <th>Three</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                {this.renderBudgetDashboardTable()}
            </div>
        );
    }

}

export default BudgetDashboard