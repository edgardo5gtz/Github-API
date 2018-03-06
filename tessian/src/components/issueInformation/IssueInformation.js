/* A stateless components the renders the Issue information
   @params: title = issue title
            user = user name
            state = issue status
            labels = an array of issue labels
            url = a url to the github issue
   @Returns: Null
*/
import React from 'react';
import './IssueInformation.css';

const IssueInformation = (props) => {
  return (
    <div className="IssueInfo col-sm-12">
      <h5><span className={props.state}>{props.state}</span>{props.title}</h5>
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="issue-user">By: {props.user}</div>
          <div className="issue-labels">
            {props.labels.map(label => {
              return <span key={label.id} className="stateSpan" style={{ backgroundColor: '#' + label.color }}>{label.name}</span>
            })
            }
          </div>
          <a className="issue-url" href={props.url}>{props.url}</a>
        </div>
      </div>
    </div>
  );
}

export default IssueInformation;