import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../../Shared/Components/PageHeader'
import { getMonthlyLogs, insertMonthlyLog } from '../../Actions'
import Utility from '../../Shared/Utility/Utility'
import { Link } from 'react-router-dom'

class MonthlyLoggingTable extends React.Component {
    handleSubmit = e => {
        e.preventDefault()

        this.props.onSubmit(
            this.props.dateValue,
            this.props.amountValue,
            this.props.categoryValue,
            this.props.commentValue
        )
    }

    getHeader = () => {
        return (
            <PageHeader title='Logging' icon='list alternate outline icon' />
        );
    }

    mapMonthlyLogEntries = () => {
        let counter = 0
        return this.props.monthlyLogs.map((record) => {
            return (
                <tr key={record.id}>
                    <td>{++counter}</td>
                    <td>{Utility.Date(record.transactionDate)}</td>
                    <td>{record.amount}</td>
                    <td>{record.category}</td>
                    <td>{record.comment}</td>
                    <td className="center aligned">
                        <Link to={`/editMonthlyLog/${record.id}`} className='ui basic button'>Edit</Link>
                    </td>
                </tr>
            );
        });
    }

    scaffoldInputEntries = nextRecordNumber => {
        return (
            /*   plus square outline */
            <tr>
                <td>{nextRecordNumber}</td>
                <td><div className='ui input'><input type="date" value={this.props.dateValue} onChange={event => this.props.handleActionDateChange(event)} required></input></div></td>
                <td><div className='ui input'><input type="number" value={this.props.amountValue} onChange={event => this.props.handleAmountChange(event)} required></input></div></td>
                <td><div className='ui input'><input type="text" value={this.props.categoryValue} onChange={event => this.props.handleCategoryChange(event)} required></input></div></td>
                <td><div className='ui input'><input type="text" value={this.props.commentValue} onChange={event => this.props.handleCommentChange(event)} required></input></div></td>
                <td className="center aligned">
                    <input type="submit" value="Add Record" className='ui positive button' />
                </td>
            </tr >
        );
    }

    renderMonthlyLogTable = () => {
        // if (!this.props.monthlyLogs.length > 0) {
            if (false) {
            return (
                <div style={{ margin: "50px" }}>
                    <h1>No logs found for the month of selected month</h1>
                </div>
            )
        } else {
            let nextRecordNumber = this.props.monthlyLogs.length + 1
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <table className="ui selectable celled table">
                            <thead>
                                <tr>
                                    <th>Record</th>
                                    <th>Transaction Date</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Comment</th>
                                    <th className="center aligned">Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.mapMonthlyLogEntries()}
                                {this.scaffoldInputEntries(nextRecordNumber)}
                            </tbody>
                        </table>
                    </form>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div>{this.getHeader()}</div>
                {this.renderMonthlyLogTable()}
                <p style={{ margin: "50px" }}></p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { monthlyLogs: Object.values(state.monthlyLogs) }
}

export default connect(mapStateToProps, { getMonthlyLogs, insertMonthlyLog })(MonthlyLoggingTable)
