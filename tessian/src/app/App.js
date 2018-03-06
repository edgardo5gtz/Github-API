import React, { Component } from 'react';
import Header from '../components/header/Header';
import Filter from '../components/filter/Filter';
import Displayer from '../components/displayer/Displayer';
import './App.css'
import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Axios information
      labelsInfo: [],
      issuesInfo: [],

      //Displayer info
      userQuery: "",
      labelsQuery: [],
      statusQuery: "",
      ready: false
    };

    this.retrieveFilterInfo = this.retrieveFilterInfo.bind(this);
    this.retrieveIssuesInfo = this.retrieveIssuesInfo.bind(this);
    this.retrieveLabelsInfo = this.retrieveLabelsInfo.bind(this);

    this.retrieveIssuesInfo();
    this.retrieveLabelsInfo();
  }


  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <div className="row">
          <Filter issues={this.state.issuesInfo} 
                  labels={this.state.labelsInfo}
                  retrieveFilterInfo = {this.retrieveFilterInfo}/>
          <Displayer issues={this.state.issuesInfo}
                     user={this.state.userQuery}
                     labels={this.state.labelsQuery}
                     status={this.state.statusQuery}
                     ready={this.state.ready}/>
          </div>
        </div>
      </div>
    );
  }

  retrieveFilterInfo(userQuery, labelsQuery, statusQuery, ready){
    this.setState({
      userQuery,
      labelsQuery,
      statusQuery,
      ready
    });
  }

  retrieveLabelsInfo(){
    axios.get('https://api.github.com/repos/atom/atom/issues',
      {
        headers: { 'Accept': 'application/vnd.github.VERSION.raw+json' },
        params: { 'state': 'all', 'per_page': '100' }
      })
      .then((response) => {
        this.setState({ issuesInfo: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  retrieveIssuesInfo(){
    axios.get('https://api.github.com/repos/atom/atom/labels',
      {
        headers: { 'Accept': 'application/vnd.github.symmetra-preview+json' },
        params: { 'state': 'all', 'per_page': '100' }
      })
      .then((response) => {
        this.setState({ labelsInfo: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}



export default App;
