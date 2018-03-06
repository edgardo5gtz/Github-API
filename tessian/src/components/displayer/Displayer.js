/* This component recieves a Filter information and displays
  the information accordingly.
   @properties: issue = list of issues retrieved from filter
                user = user retrieve from filter
                label = list of labels retrieve from filter
                satus = status of the issue retrieve from filter
                ready = flag to avoid rendering before query
   @Returns: A list of issues rendered accordingly
*/
import React, { Component } from 'react';
import './Displayer.css';
import '../pagination/Pagination'
import IssueInformation from '../issueInformation/IssueInformation'
import _ from 'lodash'
import Pagination from '../pagination/Pagination';

class Displayer extends Component {
  
  constructor(props){
    super(props)
    // Atributes
    this.filterIssues = [];
    this.listIssues=[];
    this.state={listIssues: []};

    //Functions
    this.parseName = this.parseName.bind(this);
    this.parseLabels = this.parseLabels.bind(this);
    this.parseStatus = this.parseStatus.bind(this);
    this.nameFilter = this.nameFilter.bind(this);
    this.labelsFilter = this.labelsFilter.bind(this);
    this.statusFilter = this.statusFilter.bind(this);
    this.renderIssues = this.renderIssues.bind(this);
    this.fillIssuesList = this.fillIssuesList.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleFirstRendering =this.handleFirstRendering.bind(this);
  }

  
  render() {
    this.renderIssues();
    return (
      <div className="col-sm-8 Displayer">
          <h2>Issues</h2>
        <div className="row justify-content-center">
          {_.isEmpty(this.state.listIssues)?  this.handleFirstRendering() : this.state.listIssues}
        </div>
        <div className="row justify-content-center">
          <Pagination elements={_.isString(this.listIssues) ? [] : this.listIssues}
                      handlePagination={this.handlePagination}/>
        </div>
      </div>
    );
  }

  handleFirstRendering(){
    // If there was no response then renders a message
      return _.isString(this.listIssues) ? this.listIssues : _.slice(this.listIssues, 0, 3);
  }

  handlePagination(event){
    // Decides the pages used per query
    event.preventDefault();
    if (_.isEqual(event.target.text, 'Previous')){

    }
    let start = (_.toInteger(event.target.text) * 5) -5;
    let end = (_.toInteger(event.target.text) * 5) - 1;
    this.listIssues = _.slice(this.listIssues, start, end);
    this.setState({listIssues: this.listIssues});
  }

  renderIssues() {
    /* Renders a list of issues depending
       depending on information passed from
       the form. Waits for the form to be 
       submitted
    */
    this.listIssues = "There are no issues";
    
    if (this.props.ready) {
      let response = "";
      this.filterIssues = [];
      this.parseName(response);
      this.parseLabels(response);
      this.parseStatus(response);
      this.fillIssuesList();
    }
  }

  nameFilter(issue){
    /* Returns the isssue if it
       contains the name the user
       submitted.
    */
    if(_.isEqual(issue.user.login, this.props.user)){
      return issue;
    }
    return false;
  }

  labelsFilter(issue){
     /* Returns the isssue if it
       contains the name the labels
       submitted.
    */
    let labelArray = issue.labels.map(item => {
      return item.name;
    });
    if (_.difference(this.props.labels, labelArray).length === 0) {
      return issue;
    }
    return false;
  }

  statusFilter(issue) {
     /* Returns the isssue if it
       contains the name the state
       submitted.
    */
    if (_.isEqual(this.props.status, issue.state)) {
          return issue
    }
    
    return false;
  }

  fillIssuesList(){
    /*Creates a list of issues based on the 
    information filtered*/
    this.listIssues=[];
    if (_.isEmpty(this.filterIssues)) {
      this.listIssues = "There where not issues found"
    } else {
      this.listIssues = this.filterIssues.map(issue => {
        return <IssueInformation key={issue.id}
          title={issue.title}
          user={issue.user.login}
          state={issue.state}
          url={issue.html_url}
          labels={issue.labels.map(label => {
            let name = label.name;
            let color = label.color;
            let id = label.id;
            return { id, name, color };
          })} />
      });
    }
  }

  parseName(response){
    // Pushes the filtered issues name to the array
    if (this.props.user) {
      for (let issue of this.props.issues) {
        response = this.nameFilter(issue)
        if (response !== false) {
          this.filterIssues.push(response);
        }
      }
    }
  }

  parseLabels(response){
    // Pushes the filtered issues name to the array
    if (!_.isEmpty(this.props.labels)) {
      if (_.isEmpty(this.filterIssues)) {
        for (let issue of this.props.issues) {
          response = this.labelsFilter(issue)
          if (response !== false) {
            this.filterIssues.push(response);
          }
        }
      } else {
        let tempArray = []
        for (let issue of this.filterIssues) {
          response = this.labelsFilter(issue)
          if (response !== false) {
            tempArray.push(response);
          }
        }
        this.filterIssues = _.clone(tempArray);
      }
    }
  }

  parseStatus(response){
    // Pushes the filtered issues name to the array
    if (this.props.status) {
      if (_.isEmpty(this.filterIssues)) {
        for (let issue of this.props.issues) {
          response = this.statusFilter(issue)
          if (response !== false) {
            this.filterIssues.push(response);
          }
        }
      } else {
        let tempArray = []
        for (let issue of this.filterIssues) {
          response = this.statusFilter(issue)
          if (response !== false) {
            tempArray.push(response);
          }
        }
        this.filterIssues = _.clone(tempArray);
      }
    }
  }
}

export default Displayer;
