import React from 'react'
import Modal from '../../Shared/Modal'
import history from '../../History'
import { connect } from 'react-redux'
import { getCategory, updateCategory, deleteCategory, getCategoryType } from '../../Actions'
import Utility from '../../Shared/Utility/Utility'
import DropDown from '../../Shared/Components/DropDown'

class EditCategory extends React.Component {
    state = {
        categoryType: [],
        category: '',
        budget: 0,
        postDate: '',
        selected: {
            id: 0,
            text: 'Please Select a Type'
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        await this.props.getCategoryType();
        await this.props.getCategory(id);
        this.mapCategoryToState();
    }

    mapCategoryToState = () => {
        let date = Utility.CalendarDate(this.props.category.postDate.toString())
        let categoryType = {
            id: this.props.category.typeId,
            text: this.props.category.type
        }

        this.setState({
            category: this.props.category.category,
            budget: this.props.category.budget,
            postDate: date,
            selected: categoryType
        })
    }

    mapCategoriesToDropDown = categoryTypes => {
        let options = []
        for (let n = 0; n < categoryTypes.length; n++) {
            options.push({
                id: categoryTypes[n].id,
                text: categoryTypes[n].type
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

    onUpdateClick = async e => {
        e.preventDefault()
        await this.props.updateCategory(
            this.props.match.params.id,
            this.state.budget,
            this.state.category,
            this.state.postDate,
            1,
            this.state.selected.id)
    }

    onDeleteClick = async e => {
        e.preventDefault()
        await this.props.deleteCategory(this.props.match.params.id)
    }

    renderSubHeader = () => {
        return (
            <div>
                <h2 className="ui header">
                    <div className="content">
                        Edit Category
                        <div className="sub header">Logging - will post once per-month.</div>
                        <div className="sub header">Auto-Post - will post same-date every month.</div>
                    </div>
                </h2>
            </div>
        );
    }

    // JSX
    renderContent() {
        return (<div >
            <form className='ui form'>
                <div className='fields'>
                    <div className='four wide field'>
                        <label>Post Date</label>
                        <input type='date' placeholder='Post Date...' value={this.state.postDate} onChange={this.onPostDateChange}></input>
                    </div>
                    <div className='seven wide field'>
                        <label>Category</label>
                        <input type='text' placeholder='Category...' value={this.state.category} onChange={this.onCategoryChange}></input>
                    </div>
                    <div className='four wide field'>
                        <label>Budget</label>
                        <div className="ui left labeled input">
                            <label className='ui label'>$</label>
                            <input type='text' placeholder='Budget...' value={this.state.budget} onChange={this.onBudgetChange}></input>
                        </div>
                    </div>
                    <div className='four wide field'>
                        <label>Type</label>
                        <DropDown
                            selected={this.state.selected}
                            onSelectedChange={this.onSelectChange}
                            options={this.mapCategoriesToDropDown(this.props.categoryType)} />
                    </div>
                </div>
            </form>
        </div>);
    }

    renderActions() {
        return (
            <React.Fragment>
                <button type="button" onClick={this.onUpdateClick} className='medium ui positive button'>Update</button>
                <button type="button" onClick={this.onDeleteClick} className='medium ui basic red button'>Delete</button>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Modal
                title={this.renderSubHeader()}
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => { history.push('/categories') }}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        category: state.categories[ownProps.match.params.id],
        categoryType: Object.values(state.categoryType)
    }
}

export default connect(mapStateToProps, { getCategory, updateCategory, deleteCategory, getCategoryType })(EditCategory)
