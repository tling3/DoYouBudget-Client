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
            type: 'Please Select a Type'
        },
        open: false,
        type: ''
    }

    componentDidMount() {
        console.log("did mount selected", this.state.selected)
        console.log("getCategoryType fired")
        this.props.getCategoryType()
        // console.log("did mount this.props.categoryType: ", this.props.categoryType)
        // this.setState({ selected: this.props.categoryType[0] })
    }

    // componentDidUpdate(){
    //     console.log("component Did Update fired")
    //     this.setState({ selectedType: this.props.categoryType[0] })
    // }

    handleCategoryChange = e => {
        this.setState({ category: e.target.value })
    }

    handleBudgetChange = e => {
        this.setState({ budget: e.target.value })
    }

    handlePostDateChange = e => {
        this.setState({ postDate: e.target.value })
    }

    handleTypeChange = e => {
        this.setState({ type: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        let category = e.target[0].value
        let budget = e.target[1].value
        let postDate = e.target[2].value
        this.props.insertCategory(budget, category, postDate)
    }

    handleSelectChange = item => {
        this.setState({ selected: item })
    }

    renderSelectOptions = () => {
        console.log("renderSelectOptions fired")
        return this.props.categoryType.map(item => {
            if (item.type === this.state.selected.type) {
                return null
            }

            // if (this.state.selectedType == '') {
            //     this.setState({ selectedType: item.type })
            // }
            else

                return (
                    <div
                        key={item.typeId}
                        className='item'
                        onClick={() => { this.handleSelectChange(item) }}>
                        {item.type}
                    </div>
                );
        });
    }

    setOpen = open => {
        this.setState({ open: open })
    }

    renderDropDown = () => {
        console.log("renderDropDown fired this.state.selectedType: ", this.state.selectedType)
        // let text = "Please Select a Type";
        // if (this.state.selectedType != null) {
        //     text = this.state.selectedType.type
        // }


        return (
            <div onClick={() => { this.setOpen(!this.state.open) }} className={`ui selection dropdown ${this.state.open ? 'visible active' : ''}`}>
                <i className='dropdown icon'></i>
                <div className='text'>{this.state.selectedType.type}</div>
                {/* <div className='text'>{text}</div> */}
                <div className={`menu ${this.state.open ? 'visible transition' : ''}`}>
                    {this.renderSelectOptions()}
                </div>
            </div>
        );
    }

    render() {
        console.log("render fired")
        console.log("selected type at render: ", this.state.selectedType)
        console.log("this.props.categoryType at render: ", this.props.categoryType)
        /*  */
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
                                        <div className='ui right labeled input'>
                                            <label className='ui label'>$</label>
                                            <input type='text' placeholder='Budget...' value={this.state.budget} onChange={this.handleBudgetChange}></input>
                                            <div className='ui basic label'>.00</div>
                                        </div>
                                    </div>



                                    <div className='four wide field'>
                                        <label>Type</label>
                                        {/* <input type='text' placeholder='Type...' value={this.state.type} onChange={this.handleTypeChange}></input> */}
                                        {/* {this.renderDropDown()} */}
                                        <DropDown
                                            selected={this.state.selected}
                                            onSelectedChange={this.handleSelectChange}
                                            options={this.props.categoryType}
                                        />
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

const mapStateToProps = (state) => {
    console.log("mapStateToProps state.categoryType", state.categoryType)
    return { categoryType: Object.values(state.categoryType) }
}

export default connect(mapStateToProps, { insertCategory, getCategoryType })(AddCategories)