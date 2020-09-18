import React from 'react';
import { List, Button, notification } from 'antd';
import {BrowserRouter as Router, Route, Link, BrowserRouter, Redirect} from 'react-router-dom';
import './../../App.css';
import "./styles.css";
import Goal from '../../goal-description-component/goal-section';

import { flagGoal } from '../../actions/goalActions';



class Listings extends React.Component{

	report = (goal) => {
		notification.open({
			message: 'Successfully Reported Goal',
		});
		console.log(goal)
		flagGoal(goal)
	};

	render() {

		const { goals } = this.props;

		return (

		    <List
			    itemLayout="vertical"
			 	className="listItem"
			    dataSource={goals}
			    renderItem={item => (
			      <List.Item
			        className="listItem"
			        key={item.title}
			      >
			        <List.Item.Meta
			          title={<span className="title">{item.title}</span>}
			          description={<span className="subtitle">Description: {item.description}</span>}
			        />
			        <div><span className="duration">Duration: {item.duration} Days</span></div>
			        <div className="button">

			        <Link to={`/GoalDetail/${item.title}`}>
			        	<Button>More Info</Button>
			        </Link>
							<Button onClick={(e) => this.report(item, e)}>Report</Button>
			        </div>
			      </List.Item>
			    )}
			  />

		 );
	}
}

export default Listings;
