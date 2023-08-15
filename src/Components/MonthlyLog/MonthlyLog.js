import React from 'react'
import { connect } from 'react-redux'
import { getMonthlyLogs, insertMonthlyLog, getCategories, deleteMonthlyLog } from '../../Actions'
import Utility from '../../Shared/Utility/Utility'
import { DEFAULT_DROPDOWN_CATEGORY } from '../EditMonthlyLog/Constants'
import MonthlyLogTable from './MonthlyLogTable'

class MonthlyLog extends React.Component {
    state = {
        inputActionDate: "",
        inputAmount: 0,
        inputComment: "",
        currentMonth: "",
        dropDownCategories: [],
        selectedCategory: {
            id: 0,
            text: DEFAULT_DROPDOWN_CATEGORY
        }
    }

    async componentDidMount() {
        let userId = 1;
        // let currentMonth = this.getMonth();
        let currentMonth = 10
        await this.props.getCategories()
        await this.props.getMonthlyLogs(userId, currentMonth)
        let currentDate = this.getTodayDate()
        let dropDownCategories = this.mapCategoriesToDropDown(this.props.categories)
        this.mapToState(currentMonth, currentDate, dropDownCategories)
    }

    getTodayDate = () => {
        let currentDate = new Date().toLocaleDateString()
        currentDate = Utility.CalendarDate(currentDate)
        return currentDate
    }

    mapToState = (currentMonth, currentDate, dropDownCategories) => {
        this.setState({
            currentMonth,
            dropDownCategories,
            inputActionDate: currentDate,
            selectedCategory: dropDownCategories[0]
        })
    }

    mapCategoriesToDropDown = categories => {
        let options = []
        for (let j = 0; j < categories.length; j++) {
            options.push({
                id: categories[j].id,
                text: categories[j].category
            })
        }
        return options
    }

    getMonth = () => {
        let currentDate = new Date().toLocaleDateString()
        let month = currentDate.substring(0, currentDate.indexOf("/"))
        return month
    }

    setActionDateChange = event => {
        this.setState({ inputActionDate: event.target.value })
    }

    setAmountChange = event => {
        this.setState({ inputAmount: event.target.value })
    }

    setCommentChange = event => {
        this.setState({ inputComment: event.target.value })
    }

    onCategorySelectedChange = item => {
        this.setState({ selectedCategory: item })
    }

    onDeleteClick = async recordId => {
        await this.props.deleteMonthlyLog(recordId)
        let userId = 1
        let currentMonth = 10
        // await this.props.getMonthlyLogs(userId, currentMonth)
    }

    onLogSubmit = async (date, amount, category, categoryId, comment) => {
        let categoryIdInt = parseInt(categoryId)
        let month = this.state.currentMonth
        let isValid = date !== '' && amount !== 0 && category !== '' && categoryIdInt !== 0

        if (isValid) {
            await this.props.insertMonthlyLog(amount, category, categoryIdInt, date, comment, month)

            this.setState({
                inputActionDate: this.getTodayDate(),
                inputAmount: 0,
                selectedCategory: this.state.dropDownCategories[0],
                inputComment: ""
            })
        }
    }

    pixelValue = () => {
        let pixelValue = this.props.categories.length * 40
        return pixelValue
    }

    // JSX
    render() {
        return (
            <div>
                <MonthlyLogTable
                    dateValue={this.state.inputActionDate}
                    amountValue={this.state.inputAmount}
                    selectedCategory={this.state.selectedCategory}
                    commentValue={this.state.inputComment}
                    onActionDateChange={this.setActionDateChange}
                    onAmountChange={this.setAmountChange}
                    onCategorySelectedChange={this.onCategorySelectedChange}
                    onCommentChange={this.setCommentChange}
                    dropDownCategories={this.state.dropDownCategories}
                    onDeleteClick={this.onDeleteClick}
                    onSubmit={this.onLogSubmit}
                />
                <footer>
                    <div style={{ marginBottom: `${this.pixelValue()}px` }}></div>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        monthlyLogs: Object.values(state.monthlyLogs),
        categories: Object.values(state.categories)
    }
}

export default connect(mapStateToProps, { getMonthlyLogs, insertMonthlyLog, getCategories, deleteMonthlyLog })(MonthlyLog)
