import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../../Shared/Components/PageHeader'
import { getMonthlyLogs, insertMonthlyLog } from '../../Actions'
import Utility from '../../Shared/Utility/Utility'

class MonthlyLogging extends React.Component {
    state = {
        inputActionDate: "",
        inputAmount: 0,
        inputCategory: "",
        inputComment: "",
        inputActionDate: "",
        currentMonth: ""
    }

    componentDidMount() {
        console.log("monthly logging didMount fired")
        let userId = 1;
        // let currentMonth = this.getMonth();
        let currentMonth = 10;
        this.props.getMonthlyLogs(userId, currentMonth);
        let currentDate = this.getTodayDate()
        this.setState({ inputActionDate: currentDate })
        this.setState({ currentMonth })
    }

    // componentDidUpdate() {
    //     console.log("didUpdate fired")
    //     // let userId = 1;
    //     // let currentMonth = 10;
    //     // this.props.getMonthlyLogs(userId, currentMonth);
    //     // let currentDate = this.getTodayDate()
    // }

    getMonth = () => {
        let currentDate = new Date().toLocaleDateString()
        let month = currentDate.substring(0, currentDate.indexOf("/"))
        return month
    }

    getTodayDate = () => {
        let currentDate = new Date().toLocaleDateString()
        currentDate = Utility.CalendarDate(currentDate)
        return currentDate
    }


    getHeader = () => {
        return (
            <React.Fragment>
                <PageHeader title='Logging' icon='list alternate outline icon' />
            </React.Fragment>
        );
    }

    handleActionDateChange = event => {
        // console.log(" action date event.target.value", event.target.value)
        this.setState({ inputActionDate: event.target.value })
    }

    handleAmountChange = event => {
        // console.log(" amount event.target.value", event.target.value)
        this.setState({ inputAmount: event.target.value.toString() })
    }

    handleCategoryChange = event => {
        this.setState({ inputCategory: event.target.value })
    }

    handleCommentChange = event => {
        this.setState({ inputComment: event.target.value })
    }

    scaffoldInputEntries = nextRecordNumber => {
        return (
            /*   plus square outline */
            <React.Fragment>
                <tr>
                    <td>{nextRecordNumber}</td>
                    <td><div className='ui input'><input type="date" value={this.state.inputActionDate} onChange={event => this.handleActionDateChange(event)} required></input></div></td>
                    <td><div className='ui input'><input type="number" value={this.state.inputAmount} onChange={event => this.handleAmountChange(event)} required></input></div></td>
                    <td><div className='ui input'><input type="text" value={this.state.inputCategory} onChange={event => this.handleCategoryChange(event)} required></input></div></td>
                    <td><div className='ui input'><input type="text" value={this.state.inputComment} onChange={event => this.handleCommentChange(event)} required></input></div></td>
                    <td>
                        {/* <i className='plus square icon'></i> */}
                        {/* <div onClick={e => e.stopPropagation()}> */}
                        <form onSubmit={this.handleSubmit}>
                            <input type="submit" value="Add Record" className='ui positive button' />
                        </form>
                        {/* </div> */}
                    </td>
                </tr >
            </React.Fragment >
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
                    <td>
                        <button className='ui basic button'>Edit</button>
                    </td>
                </tr>
            );
        });
    }

    renderMonthlyLogTable = () => {
        if (!this.props.monthlyLogs.length > 0) {
            return (
                <div style={{ margin: "50px" }}>
                    <h1>No logs found for the month of selected month</h1>
                </div>
            )
        } else {
            let nextRecordNumber = this.props.monthlyLogs.length + 1
            return (
                <table className="ui selectable celled table">
                    <thead>
                        <tr>
                            <th>Record</th>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Comment</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.mapMonthlyLogEntries()}
                        {this.scaffoldInputEntries(nextRecordNumber)}
                    </tbody>
                </table>
            )
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("handleSubmit fired")
        // console.log("e", e.target[1].value)
        // console.log("e", e.target[2].value)
        // console.log("e", e.target[3].value)
        // console.log("e", e.target[4].value)

        // let inputActionDate = e.target[1].value
        // let inputAmount = e.target[2].value
        // let inputCategory = e.target[3].value
        // let inputComment = e.target[4].value
        // let month = this.state.currentMonth


        let inputActionDate = this.state.inputActionDate
        let inputAmount = this.state.inputAmount
        let inputCategory = this.state.inputCategory
        let inputComment = this.state.inputComment
        let month = this.state.currentMonth

        // console.log("inputActionDate", inputActionDate)
        // console.log("inputAmount", inputAmount)
        // console.log("inputCategory", inputCategory)
        // console.log("inputComment", inputComment)

        // console.log("state inputActionDate", this.state.inputActionDate)
        // console.log("state inputAmount", this.state.inputAmount)
        // console.log("state inputCategory", this.state.inputCategory)
        // console.log("state inputComment", this.state.inputComment)

        /*
        
        inputActionDate: "",
        inputAmount: 0,
        inputCategory: "",
        inputComment: "",
        inputActionDate: "",
        currentMonth: ""
        
        */



        let isValid = inputActionDate !== '' && inputAmount !== 0 && inputCategory !== '' && inputComment !== ""


        if (isValid) {
            this.props.insertMonthlyLog(inputAmount, inputCategory, inputActionDate, inputComment, month)
            // let userId = 1;
            // let currentMonth = 10;
            // this.props.getMonthlyLogs(userId, currentMonth);
            this.setState({ inputActionDate: this.getTodayDate() })
            this.setState({ inputAmount: 0 })
            this.setState({ inputCategory: "" })
            this.setState({ inputComment: "" })
        } else {
            console.log("invalid model")
        }


    }

    render() {
        console.log("monthly logging render fired")
        return (
            <div>
                <div>
                    {this.getHeader()}
                </div>
                {/* <form onSubmit={this.handleSubmit}> */}
                {this.renderMonthlyLogTable()}
                {/* </form> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { monthlyLogs: Object.values(state.monthlyLogs) }
}

export default connect(mapStateToProps, { getMonthlyLogs, insertMonthlyLog })(MonthlyLogging)