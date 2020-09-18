import React from "react";
import { Layout, Menu } from 'antd';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import './../App.css';
import GoalList from './../GoalListView/GoalList';
import Admin from './../AdminView/Admin';
import "./styles.css";

import Goal from './../goal-description-component/goal-section'

import ProfileComponent from "../ProfileView/ProfilePage"
import FollowingPage from "../ProfileView/FollowingPage"
import UserDirectory from "../ProfileView/UserDirectory"
import SettingsPage from "../ProfileView/SettingsPage"

const { Header, Content } = Layout;
const log = console.log

var userClass = '';

function updateClass(c) {
  userClass = c;
  console.log(userClass);
  this.setState({tempUserClass: c});
};

class Home extends React.Component {
  state = {
    tempUserClass: '',
    currUserClass: userClass,
  }

  componentWillMount() {
      updateClass = updateClass.bind(this);
 }

  render() {

    const { app } = this.props

    return (
      <Layout className="layout">
        <Header>
          <h1 className="website_title">My Goal Setting App</h1>
        </Header>

        <Header>
          <Menu theme="dark" mode="horizontal" >
            <Menu.Item key="1" className="menu_item">
              Goals
              <Link to='/home'/>
            </Menu.Item>
            <Menu.Item key="2" className="menu_item">
              Profile
              <Link to={'/user/' +  app.state.currentUser.username}/>
            </Menu.Item>
            {app.state.currentUser.username == "admin" &&
              <Menu.Item key="3" className="menu_item">
                Admin
                <Link to='/admin'/>
              </Menu.Item>
            }
          </Menu>
        </Header>


        <Content>
        <div className="home">
          <Switch>
            <Route exact path='/home' render={() =>
                            (<GoalList app={app}/>)}/>
            <Route exact path ='/GoalDetail' render={() =>
                            (<Goal title='title' targetDays={10} description="sample description"/>)}/>
            <Route exact path='/admin' render={() =>
                            (<Admin />)}/>
              {/* <Route exact path="/user/:name" component={ProfileComponent}> */}
              {/* </Route> */}
              {/* <Route exact path="/user/:name/following" component={FollowingPage}> */}
              {/* </Route> */}
              {/* <Route exact path="/users" component={UserDirectory}> */}
              {/* </Route> */}
              {/* <Route exact path="/user/:name/settings" component={SettingsPage}> */}
              {/* </Route> */}
          </Switch>
        </div>
        <h1>Welcome to our Goal Setting App</h1>
        </Content>


      </Layout>

    );
  }
}

export default Home;
export { updateClass };
