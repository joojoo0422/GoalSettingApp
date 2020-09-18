import React from 'react';
import { List } from 'antd';

import User from "./../User";

import "./styles.css";

class UserList extends React.Component {
  render() {
    const { users , adminComponent } = this.props;

    return (
      <List
        className='list'
        bordered
        dataSource={users}
        renderItem={item => (
          <User
            user={item}
            adminComponent={adminComponent}
          />
        )}
      />
    );
  }
}

export default UserList;
