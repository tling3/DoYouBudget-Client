import React from 'react'
import Modal from '../../Shared/Modal'
import history from '../../History'
import { connect } from 'react-redux'
import {
    getMonthlyLogById,
    updateMonthlyLogById,
    deleteMonthlyLog,
    getCategories
} from '../../Actions/index'
import Utility from '../../Shared/Utility/Utility'
import DropDown from '../../Shared/Components/DropDown'
import { DEFAULT_DROPDOWN_CATEGORY } from './Constants'

class EditMonthlyLog extends React.Component {

    state = {
        transactionDate: '',
        amount: 0,
        selected: {
            id: 0,
            text: DEFAULT_DROPDOWN_CATEGORY
        },
        comment: '',
        dropDownCategories: []
    }

    // componentDidMount() {
    //     console.log("BEGIN componentDidMount")
    //     let id = this.props.match.params.id
    //     this.props.getMonthlyLogById(id)
    //     this.props.getCategories()
    //     console.log("END componentDidMount")
    // }

    async componentWillMount() {
        let id = this.props.match.params.id
        await this.props.getMonthlyLogById(id)
        await this.props.getCategories()
        this.mapMonthlyLogToState()
        this.mapCategoriesToState()
    }

    // componentDidUpdate() {
    //     console.log("componentDidUpdate fired")
    //     let isMonthlyLogStateNotSet = this.state.transactionDate === '' &&
    //         this.state.amount === 0 &&
    //         this.state.selected.id === 0 &&
    //         this.state.selected.text === DEFAULT_DROPDOWN_CATEGORY &&
    //         this.state.comment === ''

    //     if (isMonthlyLogStateNotSet) {
    //         this.mapMonthlyLogToState()
    //     }

    //     let isCategoriesStateNotSet = this.state.dropDownCategories.length <= 0

    //     if (isCategoriesStateNotSet) {
    //         this.mapCategoriesToState()
    //     }
    // }

    mapMonthlyLogToState = () => {
        console.log("mapMonthlyLogToState fired")
        let date = Utility.CalendarDate(this.props.monthlyLog.transactionDate.toString())
        this.setState({ transactionDate: date })
        this.setState({ amount: this.props.monthlyLog.amount })
        this.setState({ category: this.props.monthlyLog.category })

        let category = {
            id: this.props.monthlyLog.id,
            text: this.props.monthlyLog.category
        }
        console.log("mapMonthlyLogToState category", category)
        this.setState({ selected: category })
        console.log("mapMonthlyLogToState category after set state", category)
        this.setState({ comment: this.props.monthlyLog.comment })
    }

    mapCategoriesToState() {
        let dropDownCategories = this.mapCategoriesToDropDown(this.props.categories)
        console.log("mapMonthlyLogToState dropDownCategories", dropDownCategories)
        this.setState({ dropDownCategories: dropDownCategories })
        console.log("mapMonthlyLogToState dropDownCategories after set state", dropDownCategories)
    }

    mapCategoriesToDropDown = categories => {
        console.log("mapCategoriesToDropDown categories", categories)
        let options = []
        for (let k = 0; k < categories.length; k++) {
            console.log("loop k", k)
            options.push({
                id: categories[k].id,
                text: categories[k].category
            })
        }
        return options
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

    handleUpdateClick = e => {
        e.preventDefault();
        // todo: use in future
        // const record = {
        //     id: this.match.params.id,
        //     date: this.state.transactionDate,
        //     amount: this.state.amount,
        //     category: this.state.category,
        //     comment: this.state.comment
        // }

        console.log("this.state.selected", this.state.selected)
        this.props.updateMonthlyLogById(
            this.props.match.params.id,
            this.state.amount,
            this.state.selected.text,
            this.state.transactionDate,
            this.state.comment,
            10
        )
    }

    handleDeleteClick = () => {
        console.log(this.props.match.params.id)
        this.props.deleteMonthlyLog(this.props.match.params.id);
    }

    handleCategorySelectedChange = item => {
        this.setState({ selected: item })
    }

    renderContent = () => {
        console.log("render content fired")
        return <form className='ui form'>
            <div className='fields'>

                <div className='four wide field'>
                    <label>Transaction Date</label>
                    <input type='date' placeholder='Transaction Date...' value={this.state.transactionDate} onChange={this.onDateChange}></input>
                </div>

                <div className='four wide field'>
                    <label>Amount</label>
                    <div className='ui left labeled input'>
                        <label className='ui label'>$</label>
                        <input type='number' placeholder='Amount...' value={this.state.amount} onChange={this.onAmountChange}></input>
                    </div>
                </div>

                {/* <div className='four wide field'>
                    <label>Category</label>
                    <input type='text' placeholder='Category...' value={this.state.category} onChange={this.onCategoryChange}></input>
                </div> */}

                <div className='four wide field'>
                    <label>Category</label>
                    <DropDown
                        selected={this.state.selected}
                        onSelectedChange={this.handleCategorySelectedChange}
                        options={this.state.dropDownCategories} />
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
                <button type="button" onClick={this.handleUpdateClick} className='medium ui positive button'>Update</button>
                <button type="button" onClick={this.handleDeleteClick} className='medium ui basic red button'>Delete</button>
            </React.Fragment>
        )
    }

    render() {
        console.log("render fired")
        console.log("render fired this.props.categories.length", this.props.categories.length)

        // if (this.props.categories.length <= 0 || this.props) {
        //     return null
        // }

        return (
            <Modal
                title='Edit Log Record'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => { history.push('/monthlyLogging') }}
            />
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    console.log("mapStateToProps fired")
    console.log("mapStateToProps Object.values(state.categories)", Object.values(state.categories))
    console.log("mapStateToProps state.monthlyLogs[ownProps.match.params.id]", state.monthlyLogs[ownProps.match.params.id])
    return {
        monthlyLog: state.monthlyLogs[ownProps.match.params.id],
        categories: Object.values(state.categories)
    }
}

export default connect(mapStateToProps, { getMonthlyLogById, updateMonthlyLogById, deleteMonthlyLog, getCategories })(EditMonthlyLog)