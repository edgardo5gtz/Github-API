
import _ from 'lodash'
import React, { Component } from 'react';
import './Filter.css';
import cancelImage from '../../static/glyphicons-remove-circle.png'


class Filter extends Component {
  constructor(props){
    super(props);

    this.state = {
      labelsArray: [],
      selectedUser: "",
      selectedStatus: "",
      selectedLabel: ""
    }
    
    // Functions
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleStatusSelect = this.handleStatusSelect.bind(this);
    this.handleLabelSelect = this.handleLabelSelect.bind(this);
    this.handleLabelDelete = this.handleLabelDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {

    const labelsList = this.props.labels.map((label)=>{
        return <LabelOption key={label.id} labelName={label.name}/>;
    });

      let userKeys = [];
      const usersList = this.props.issues.map(issue =>{
      if (!(_.includes(userKeys, issue.user.id))){
        userKeys.push(issue.user.id)
          return <UserOption key={issue.user.id} userName={issue.user.login} />
        }
    });

    let labelTags = [];
    let printTags = this.state.labelsArray.map(item => {
      if (!(_.includes(labelTags, item))) {
        labelTags.push(item)
        return <LabelTag key={item} tag={item} handleLabelDelete={this.handleLabelDelete.bind(this)}/>
      }
    });

    return (
        <div className="Filter col-sm-3">
          <form>
            <div className="form-group">
              <label htmlFor="AuthorInput">Author</label>
            < input list="users" value={this.state.selectedUser}
                    onChange= {this.handleUserSelect}
                    className = "form-control" 
                    id="AuthorInput" 
                    placeholder = "Enter author" />
            <datalist id="users">
              {usersList}
            </datalist>
            </div>
            <div className="form-group">
            <label htmlFor="labelSelect">Label</label>
            < input list="labels" value={this.state.selectedLabel}
              onChange={this.handleLabelSelect}
              className="form-control"
              id="labelSelect"
              placeholder="Enter label" />
            <datalist id="labels">
              {labelsList}
            </datalist>
              {printTags}
            </div>
            <div className="form-group">
            < label htmlFor = "statusSelect" > Issue Status </label>
              <select  value={this.state.selectedStatus} 
                       onChange= {this.handleStatusSelect}
                       className="form-control" 
                       id="statusSelect">
                <option value="" >Select your status</option>
                <option value='open'>open</option>
                <option value="closed">closed</option>
              </select>
            </div>
             < button type = "submit" className = "btn btn-primary" onClick={this.handleSubmit}> Search </button>
          </form>
        </div>
    );
  }

  handleLabelSelect(event){
    event.preventDefault();
    var labelsArray = this.state.labelsArray;
    labelsArray.push(event.target.value)
    this.setState({ labelsArray });
  }

  handleLabelDelete(event){
    event.preventDefault();
    var labelsArray = this.state.labelsArray;
    labelsArray.pop(event.target.value)
    this.setState({ labelsArray });
  }

  handleSubmit(event){
    event.preventDefault();
    let userQuery = this.state.selectedUser;
    let labelsQuery = this.state.labelsArray;
    let statusQuery = this.state.selectedStatus;
    let ready = true
    this.props.retrieveFilterInfo(userQuery, labelsQuery, statusQuery, ready);
  }

  handleUserSelect(event){
    event.preventDefault();
    this.setState({
      selectedUser : event.target.value
    });
  }

  handleStatusSelect(event) {
    event.preventDefault();
    this.setState({
      selectedStatus: event.target.value
    });
  }

  
}

const LabelTag = (props) =>{
  // Render tags
  return <div className="labelTag">
              {props.tag}
              <a href="#" onClick={props.handleLabelDelete}>
                <img className="labelImg" alt="cancel" src={cancelImage}/>
                </a>
          </div>
}

const LabelOption = (props) =>{
  // Render labels
  return <option value={props.labelName}>{props.labelName}</option>
}



const UserOption = (props) =>{
  // Render users
  return <option value={props.userName}/>;
}


export default Filter;
