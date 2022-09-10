import React from 'react'
import history from '../../History'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { insertCategory } from '../../Actions'

class AddCategories extends React.Component {
    state = {
        category: '',
        budget: 0,
        postDate: ''
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

    handleSubmit = e => {
        e.preventDefault()
        let category = e.target[0].value
        let budget = e.target[1].value
        let postDate = e.target[2].value
        this.props.insertCategory(budget, category, postDate)
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
                                    <div className='seven wide field'>
                                        <label>Category</label>
                                        <input type='text' placeholder='Category...' value={this.state.category} onChange={this.handleCategoryChange}></input>
                                    </div>
                                    <div className='four wide field'>
                                        <label>Budget</label>
                                        <div className='ui right labeled input'>
                                            <label className='ui label'>$</label>
                                            <input type='text' placeholder='Budget...' value={this.state.budget} onChange={this.handleBudgetChange}></input>
                                            <div className='ui basic label'>.00</div>
                                        </div>
                                    </div>
                                    <div className='four wide field'>
                                        <label>Post Date</label>
                                        <div className='ui icon input'>
                                            <input type='date' placeholder='Post Date...' value={this.state.postDate} onChange={this.handlePostDateChange}></input>
                                            <i className='calendar alternate outline icon'></i>
                                        </div>
                                    </div>
                                </div>
                                <input type='submit' value='Submit' className='medium ui basic button'></input>
                            </form>
                        </div>
                    </div>
                </div>,
                document.querySelector('#modal'))
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, { insertCategory })(AddCategories)