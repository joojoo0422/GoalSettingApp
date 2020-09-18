/* Admin view page */
import React from 'react';
import { Collapse , Divider } from 'antd';

// Import components
import UserList from "./../UserList";
import FlaggedGoalList from "./../FlaggedGoalList";
import FlaggedCommentList from "./../FlaggedCommentList";
import "./styles.css";

// Import actions/methods\
import { getUsers } from '../../actions/usersActions'
import { getGoals } from '../../actions/goalActions';
const { Panel } = Collapse;


class Admin extends React.Component {
  state = {
    goals: [],
    usersList: []
  }

  componentDidMount() {
    getUsers(this);
    getGoals(this);
  }

  render() {
    return (
      <div className="admin">
        {/* Need to add in toolbar later */}

        <Divider className='divider' orientation="left">
          Reported Goals and Comments
        </Divider>
        <Collapse className='collapse'>
          <Panel header="Flagged Goals" key="1">

            {/* Flagged Goal List */}
            <FlaggedGoalList
              flaggedGoals={this.state.goals.filter((goal) => goal.flagged)}
              adminComponent={this}
            />

          </Panel>
          <Panel header="Flagged Comments" key="2">

            {/* Flagged Comments List */}
            <FlaggedCommentList
              flaggedComments={(this.state.goals.map((goal) => goal.comments)).flat()}
              adminComponent={this}
            />

          </Panel>
        </Collapse>

        {/* The User List */}
        <Divider className='divider' orientation="left">Users</Divider>
        <UserList
          //users={this.state.userTemp}
          users={this.state.usersList}
          adminComponent={this}
        />

      </div>
    );
  }

}

export default Admin
