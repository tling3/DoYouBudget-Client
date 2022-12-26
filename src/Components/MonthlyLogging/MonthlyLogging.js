import React from 'react'
import { connect } from 'react-redux'
import { getMonthlyLogs, insertMonthlyLog } from '../../Actions'
import Utility from '../../Shared/Utility/Utility'
import MonthlyLoggingTable from './MonthlyLoggingTable'

class MonthlyLogging extends React.Component {
    state = {
        inputActionDate: "",
        inputAmount: 0,
        inputCategory: "",
        inputComment: "",
        currentMonth: ""
    }

    componentDidMount() {
        let userId = 1;
        // let currentMonth = this.getMonth();
        let currentMonth = 10;
        this.props.getMonthlyLogs(userId, currentMonth);
        let currentDate = this.getTodayDate()
        this.setState({ inputActionDate: currentDate })
        this.setState({ currentMonth })
    }

    // getMonth = () => {
    //     let currentDate = new Date().toLocaleDateString()
    //     let month = currentDate.substring(0, currentDate.indexOf("/"))
    //     return month
    // }

    getTodayDate = () => {
        let currentDate = new Date().toLocaleDateString()
        currentDate = Utility.CalendarDate(currentDate)
        return currentDate
    }

    setActionDateChange = event => {
        this.setState({ inputActionDate: event.target.value })
    }

    setAmountChange = event => {
        this.setState({ inputAmount: event.target.value.toString() })
    }

    setCategoryChange = event => {
        this.setState({ inputCategory: event.target.value })
    }

    setCommentChange = event => {
        this.setState({ inputComment: event.target.value })
    }

    handleLogSubmit = (date, amount, category, comment) => {
        let month = this.state.currentMonth
        let isValid = date !== '' && amount !== 0 && category !== '' && comment !== ""

        if (isValid) {
            this.props.insertMonthlyLog(amount, category, date, comment, month)

            this.setState({ inputActionDate: this.getTodayDate() })
            this.setState({ inputAmount: 0 })
            this.setState({ inputCategory: "" })
            this.setState({ inputComment: "" })

            this.componentDidMount()
        } else {
            // todo: what are you doing here?
        }
    }

    render() {
        return (
            <div>
                <MonthlyLoggingTable
                    dateValue={this.state.inputActionDate}
                    handleActionDateChange={this.setActionDateChange}
                    amountValue={this.state.inputAmount}
                    handleAmountChange={this.setAmountChange}
                    categoryValue={this.state.inputCategory}
                    handleCategoryChange={this.setCategoryChange}
                    commentValue={this.state.inputComment}
                    handleCommentChange={this.setCommentChange}
                    onSubmit={this.handleLogSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { monthlyLogs: Object.values(state.monthlyLogs) }
}

export default connect(mapStateToProps, { getMonthlyLogs, insertMonthlyLog })(MonthlyLogging)