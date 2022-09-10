import React from 'react'
import Modal from '../../Shared/Modal'
import history from '../../History'
import { connect } from 'react-redux'
import { getCategory, updateCategory, deleteCategory } from '../../Actions'
import Utility from '../../Shared/Utility/Utility'

class EditCategory extends React.Component {
    state = {
        category: '',
        budget: 0,
        postDate: ''
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.getCategory(id)
        this.setState({ category: this.props.category.category })
        this.setState({ budget: this.props.category.budget })
        let date = Utility.FormatDate(this.props.category.postDate.toString())
        this.setState({ postDate: date })
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

    renderContent() {
        return (<div >
            <form className='ui form' >
                <div className='fields'>
                    <div className='seven wide field'>
                        <label>Category</label>
                        <input type='text' placeholder='Category...' value={this.state.category} onChange={this.onCategoryChange}></input>
                    </div>
                    <div className='four wide field'>
                        <label>Budget</label>
                        <div className="ui right labeled input">
                            <label className='ui label'>$</label>
                            <input type='text' placeholder='Budget...' value={this.state.budget} onChange={this.onBudgetChange}></input>
                            <div className="ui basic label">.00</div>
                        </div>
                    </div>
                    <div className='four wide field'>
                        <label>Post Date</label>
                        <div className='ui icon input'>
                            <input type='date' placeholder='Post Date...' value={this.state.postDate} onChange={this.onPostDateChange}></input>
                            <i className="calendar alternate outline icon"></i>
                        </div>
                    </div>
                </div>
            </form>
        </div>);
    }

    handleUpdateClick = () => {
        this.props.updateCategory(
            this.props.match.params.id,
            this.state.budget,
            this.state.category,
            this.state.postDate,
            1)
    }

    handleDeleteClick = () => {
        this.props.deleteCategory(this.props.match.params.id)
    }

    renderActions() {
        return (
            <React.Fragment>
                <button onClick={this.handleDeleteClick} className='medium ui basic red button'>Delete {this.state.category} Category</button>
                <button onClick={this.handleUpdateClick} className='medium ui basic button'>Update</button>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Modal
                title='Edit Category'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => { history.push('/categories') }}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { category: state.categories[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { getCategory, updateCategory, deleteCategory })(EditCategory)