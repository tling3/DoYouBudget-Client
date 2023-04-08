import React from 'react'
import history from '../../History'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { insertCategory, getCategoryType } from '../../Actions'
import DropDown from '../../Shared/Components/DropDown'

class AddCategories extends React.Component {
    state = {
        category: '',
        budget: 0,
        postDate: '',
        categoryType: [],
        selected: {
            id: 0,
            text: 'Please Select a Type'
        },
        open: false,
        type: '',
    }

    componentDidMount() {
        this.props.getCategoryType()
    }

    mapCategoryTypeToDropDown = categoryTypes => {
        let options = []
        for (let k = 0; k < categoryTypes.length; k++) {
            options.push({
                id: categoryTypes[k].id,
                text: categoryTypes[k].type
            })
        }
        return options
    }

    handleCategoryChange = e => {
        this.setState({ category: e.target.value })
    }

    handleBudgetChange = e => {
        this.setState({ budget: e.target.value })
    }

    handlePostDateChange = e => {
        this.setState({ postDate: e.target.value })
    }

    handleSelectChange = item => {
        this.setState({ selected: item })
    }

    handleSubmitClick = () => {
        let category = this.state.category
        let budget = this.state.budget
        let categoryType = this.state.selected
        let postDate = this.state.postDate
        let isValid = categoryType.id !== 0 && category !== '' && budget !== 0 && postDate !== ''
        if (isValid)
            this.props.insertCategory(budget, category, postDate, categoryType.id)
    }

    render() {
        return (
            ReactDOM.createPortal(
                <div onClick={() => { history.push('/categories') }} className='ui dimmer modals visible active'>
                    <div onClick={e => e.stopPropagation()} className='ui standard modal visible active'>
                        <i onClick={() => { history.push('/categories') }} className='close icon'></i>
                        <div className='header'>Add Category</div>
                        <div className='content'>
                            <form className='ui form' onSubmit={this.handleSubmit}>
                                <div className='fields'>
                                    <div className='four wide field'>
                                        <label>Category</label>
                                        <input type='text' placeholder='Category...' value={this.state.category} onChange={this.handleCategoryChange}></input>
                                    </div>
                                    <div className='four wide field'>
                                        <label>Budget</label>
                                        <div className='ui left labeled input'>
                                            <label className='ui label'>$</label>
                                            <input type='number' placeholder='Budget...' value={this.state.budget} onChange={this.handleBudgetChange}></input>
                                        </div>
                                    </div>
                                    <div className='four wide field'>
                                        <label>Type</label>
                                        <DropDown
                                            selected={this.state.selected}
                                            onSelectedChange={this.handleSelectChange}
                                            options={this.mapCategoryTypeToDropDown(this.props.categoryType)}
                                        />
                                    </div>
                                    <div className='four wide field'>
                                        <label>Post Date</label>
                                        <input type='date' placeholder='Post Date...' value={this.state.postDate} onChange={this.handlePostDateChange}></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='actions'>
                            <button type='button' onClick={this.handleSubmitClick} className='medium ui positive button'>Submit</button>
                        </div>
                    </div>
                </div>,
                document.querySelector('#modal'))
        );
    }
}

const mapStateToProps = (state) => {
    return { categoryType: Object.values(state.categoryType) }
}

export default connect(mapStateToProps, { insertCategory, getCategoryType })(AddCategories)
