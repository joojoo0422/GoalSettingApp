import React from 'react';
import { List , Button } from 'antd';
//import Listings from "../../GoalListView/Listings";

import "./styles.css";

import { deleteGoal } from '../../actions/goalActions';


const removeGoal = (admin, goal) => {
  deleteGoal(goal)

  const temp = admin.state.goals.map((x) => x)
  for (var i = 0; i <admin.state.goals.length; i++) {
    if (goal === admin.state.goals[i]){
      temp.splice(i, 1);
      admin.setState({goals: temp});
    }
  }
}

class FlaggedGoalList extends React.Component {
  render() {
    const { flaggedGoals , adminComponent } = this.props;

    return (
      <List
        className='list'
        bordered
        dataSource={flaggedGoals}
        renderItem={item => (
          <List.Item actions={[<Button onClick={removeGoal.bind(this, adminComponent, item)}>delete goal</Button>]}>
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default FlaggedGoalList;
