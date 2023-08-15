import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../../Shared/Components/PageHeader'
import Utility from '../../Shared/Utility/Utility'
import DropDown from '../../Shared/Components/DropDown'
import history from "../../History"

class MonthlyLogTable extends React.Component {
    onSubmit = e => {
        e.preventDefault()

        this.props.onSubmit(
            this.props.dateValue,
            this.props.amountValue,
            this.props.selectedCategory.text,
            this.props.selectedCategory.id,
            this.props.commentValue
        )
    }

    onDeleteClick = recordId => {
        this.props.onDeleteClick(recordId)
    }

    onRowClick = logId => {
        history.push(`/editMonthlyLog/${logId}`)
    }

    // JSX
    getHeader = () => {
        return (
            <PageHeader title='Monthly Logs' icon='list alternate outline icon' />
        );
    }

    mapMonthlyLogEntries = () => {
        let counter = 0
        return this.props.monthlyLogs.map(record => {
            return (
                <tr key={record.id} onClick={() => { this.onRowClick(record.id) }}>
                    <td>{++counter}</td>
                    <td>{Utility.Date(record.transactionDate)}</td>
                    <td>{record.category}</td>
                    <td>$ {record.amount}</td>
                    <td>{record.comment}</td>
                    <td className="center aligned">
                        <div onClick={e => e.stopPropagation()}>
                            <button type="button" onClick={() => this.onDeleteClick(record.id)} className="medium ui basic red button">Delete</button>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    scaffoldInputEntries = nextRecordNumber => {
        return (
            <tr>
                <td>{nextRecordNumber}</td>
                <td>
                    <div className='ui input'><input type="date" value={this.props.dateValue} onChange={event => this.props.onActionDateChange(event)} required></input></div>
                </td>
                <td>
                    <div className='ui input'>
                        <DropDown
                            selected={this.props.selectedCategory}
                            onSelectedChange={this.props.onCategorySelectedChange}
                            options={this.props.dropDownCategories}
                        />
                    </div>
                </td>
                <td>
                    <div className='ui input'>
                        <input type="number" onFocus={() => { this.setState() }} value={this.props.amountValue} onChange={event => this.props.onAmountChange(event)} required></input>
                    </div>
                </td>
                <td>
                    <div className='ui input'><input type="text" value={this.props.commentValue} onChange={event => this.props.onCommentChange(event)}></input></div>
                </td>
                <td className="center aligned">
                    <input type="submit" value="Add Record" className='ui positive button' />
                </td>
            </tr >
        );
    }

    renderMonthlyLogTable = () => {
        let nextRecordNumber = this.props.monthlyLogs.length + 1
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <table className="ui selectable celled table">
                        <thead>
                            <tr>
                                <th>Record</th>
                                <th>Transaction Date</th>
                                <th>Category</th>
                                <th>Amount</th>
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

export default connect(mapStateToProps)(MonthlyLogTable)
