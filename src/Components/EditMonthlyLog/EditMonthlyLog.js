import React from 'react'
import Modal from '../../Shared/Modal'
import history from '../../History'
import { connect } from 'react-redux'
import Utility from '../../Shared/Utility/Utility'
import DropDown from '../../Shared/Components/DropDown'
import { DEFAULT_DROPDOWN_CATEGORY } from './Constants'
import {
    getMonthlyLogById,
    updateMonthlyLogById,
    getCategories
} from '../../Actions/index'

class EditMonthlyLog extends React.Component {
    state = {
        transactionDate: '',
        amount: 0,
        comment: '',
        selectedCategory: {
            id: 0,
            text: DEFAULT_DROPDOWN_CATEGORY
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        await this.props.getMonthlyLogById(id)
        await this.props.getCategories()
        let date = this.getFormattedDate()
        let selectedCategory = this.getSelectedCategory()
        this.mapToState(date, selectedCategory)
    }

    getFormattedDate = () => {
        let date = Utility.CalendarDate(this.props.monthlyLog.transactionDate.toString())
        return date
    }

    getSelectedCategory() {
        let category = {
            id: this.props.monthlyLog.categoryId,
            text: this.props.monthlyLog.category
        }
        return category
    }

    mapToState(date, selectedCategory) {
        this.setState({
            transactionDate: date,
            amount: this.props.monthlyLog.amount,
            category: this.props.monthlyLog.category,
            comment: this.props.monthlyLog.comment,
            selectedCategory: selectedCategory
        })
    }

    onDateChange = e => {
        this.setState({ transactionDate: e.target.value })
    }

    onAmountChange = e => {
        this.setState({ amount: e.target.value })
    }

    onCategoryChange = e => {
        this.setState({ category: e.target.value })
    }

    onCommentChange = e => {
        this.setState({ comment: e.target.value })
    }

    onUpdateClick = async e => {
        e.preventDefault()
        const record = {
            id: this.props.match.params.id,
            amount: this.state.amount,
            selectedCategory: this.state.selectedCategory.text,
            selectedCategoryId: this.state.selectedCategory.id,
            transactionDate: this.state.transactionDate,
            comment: this.state.comment,
            month: 10
        }
        await this.props.updateMonthlyLogById(record)
    }

    onCategorySelectedChange = item => {
        this.setState({ selectedCategory: item })
    }

    mapCategoriesToDropDown = categories => {
        let options = []
        for (let k = 0; k < categories.length; k++) {
            options.push({
                id: categories[k].id,
                text: categories[k].category
            })
        }
        return options
    }

    // JSX
    renderContent = () => {
        return <form className='ui form'>
            <div className='fields'>
                <div className='four wide field'>
                    <label>Transaction Date</label>
                    <input type='date' placeholder='Transaction Date...' value={this.state.transactionDate} onChange={this.onDateChange}></input>
                </div>
                <div className='four wide field'>
                    <label>Category</label>
                    <DropDown
                        selected={this.state.selectedCategory}
                        onSelectedChange={this.onCategorySelectedChange}
                        options={this.mapCategoriesToDropDown(this.props.categories)} />
                </div>
                <div className='four wide field'>
                    <label>Amount</label>
                    <div className='ui left labeled input'>
                        <label className='ui label'>$</label>
                        <input type='number' placeholder='Amount...' value={this.state.amount} onChange={this.onAmountChange}></input>
                    </div>
                </div>
                <div className='four wide field'>
                    <label>Comment</label>
                    <input type='text' placeholder='Comment...' value={this.state.comment} onChange={this.onCommentChange}></input>
                </div>
            </div>
        </form>
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button type="button" onClick={this.onUpdateClick} className='medium ui positive button'>Update</button>
            </React.Fragment>
        )
    }

    render() {
        return (
            <Modal
                title='Edit Log Record'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => { history.push('/monthlyLog') }}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        monthlyLog: state.monthlyLogs[ownProps.match.params.id],
        categories: Object.values(state.categories)
    }
}

export default connect(mapStateToProps, { getMonthlyLogById, updateMonthlyLogById, getCategories })(EditMonthlyLog)
