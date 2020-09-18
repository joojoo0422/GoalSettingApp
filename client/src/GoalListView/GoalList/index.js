import React from "react";
import Listings from './../Listings'; 
import GoalForm from './../GoalForm'; 
import { Collapse } from 'antd';
import { useState } from "react";
import "./styles.css";

import "../../actions/goalActions";
import { getGoals } from '../../actions/goalActions';

const { Panel } = Collapse;


class GoalList extends React.Component {

  state = {
    goalTitle: "",
    goalDescription: "",
    goalDuration: 1,
    goals: []
  };

  // callback = key => {
  //   if (key === "2"){ // list
  //     getGoals(this);
  //   }
  // }

  inputHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value 
    });
  };

  componentDidMount() {
    getGoals(this);
  }
 
  render() {

    const { app } = this.props
    
    return (
      <div className="content_padding">
    
        <h1 className="title">List of Goals</h1>
        <h3 className="subtitle">Select the Goals you want to join!</h3>

        <Collapse>
          <Panel 
          header={<span className="panel_header">Add New Goal Form</span>} 
          key="1"
          >
          <GoalForm 
            goalTitle = {this.state.goalTitle}
            goalDescription = {this.state.goalDescription}
            goalDuration = {this.state.goalDuration}
            handleChange = {this.inputHandler}
            goalList = {this}
            app={app}
          />
          </Panel>

        </Collapse>

        <Listings goals={this.state.goals} />

      </div>

    );  
  }
}

export default GoalList;