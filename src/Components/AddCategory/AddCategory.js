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
        open: false,
        type: '',
        selected: {
            id: 0,
            text: 'Please Select a Type'
        }
    }

    async componentDidMount() {
        await this.props.getCategoryType()
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

    onCategoryChange = e => {
        this.setState({ category: e.target.value })
    }

    onBudgetChange = e => {
        this.setState({ budget: e.target.value })
    }

    onPostDateChange = e => {
        this.setState({ postDate: e.target.value })
    }

    onSelectChange = item => {
        this.setState({ selected: item })
    }

    onSubmitClick = async e => {
        e.preventDefault()
        let category = this.state.category
        let budget = this.state.budget
        let categoryType = this.state.selected
        let postDate = this.state.postDate
        let isValid = categoryType.id !== 0 && category !== '' && budget !== 0 && postDate !== ''
        if (isValid)
            await this.props.insertCategory(budget, category, postDate, categoryType.id)
    }

    // JSX
    render() {
        return (
            ReactDOM.createPortal(
                <div onClick={() => { history.push('/categories') }} className='ui dimmer modals visible active'>
                    <div onClick={e => e.stopPropagation()} className='ui standard modal visible active'>
                        <i onClick={() => { history.push('/categories') }} className='close icon'></i>
                        <h2 className="ui header">
                            <div className="content">
                                Add Category
                                <div className="sub header">Logging - will post once per-month.</div>
                                <div className="sub header">Auto-Post - will post same-date every month.</div>
                            </div>
                        </h2>
                        <div className='content'>
                            <form className='ui form' onSubmit={this.handleSubmit}>
                                <div className='fields'>
                                    <div className='four wide field'>
                                        <label>Post Date</label>
                                        <input type='date' placeholder='Post Date...' value={this.state.postDate} onChange={this.onPostDateChange}></input>
                                    </div>
                                    <div className='four wide field'>
                                        <label>Category</label>
                                        <input type='text' placeholder='Category...' value={this.state.category} onChange={this.onCategoryChange}></input>
                                    </div>
                                    <div className='four wide field'>
                                        <label>Budget</label>
                                        <div className='ui left labeled input'>
                                            <label className='ui label'>$</label>
                                            <input type='number' placeholder='Budget...' value={this.state.budget} onChange={this.onBudgetChange}></input>
                                        </div>
                                    </div>
                                    <div className='four wide field'>
                                        <label>Type</label>
                                        <DropDown
                                            selected={this.state.selected}
                                            onSelectedChange={this.onSelectChange}
                                            options={this.mapCategoryTypeToDropDown(this.props.categoryTypes)}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='actions'>
                            <button type='button' onClick={this.onSubmitClick} className='medium ui positive button'>Submit</button>
                        </div>
                    </div>
                </div>,
                document.querySelector('#modal')
            )
        );
    }
}

const mapStateToProps = (state) => {
    return { categoryTypes: Object.values(state.categoryType) }
}

export default connect(mapStateToProps, { insertCategory, getCategoryType })(AddCategories)
