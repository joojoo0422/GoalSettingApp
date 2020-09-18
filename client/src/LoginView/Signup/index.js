/* Sign-Up view page */
import React from 'react';
import { Form , Input , Button , Typography , Alert } from 'antd';
import { Redirect } from 'react-router-dom';

import "./../styles.css";
import "../../actions/usersActions";
import { signUp } from '../../actions/usersActions';

const { Title } = Typography;

const validateMessages = {
  required: 'Please enter your ${name}',
  types: {
    email: 'Please enter a valid E-mail',
  },
  string: {
    min: 'Minimum ${min} Characters Required',
  }
};

class Signup extends React.Component {
  state = {
    duplicateUsername: false,
    validUsername: false,
    username: "",
    email: "",
    password: ""
  }

  /*onFinish = values => {
    this.setState({duplicateUsername: false});
    for (var i = 0; i < users.length; i++) {
      const user = users[i];
      if (values.username === user.username) {
        this.setState({duplicateUsername: true});
      }
    }
    if (!this.state.duplicateUsername) {
      this.setState({validUsername: true});
      users.push({
        username: values.username,
        email: values["e-mail"],
        password: values.password,
        class:"user"
        })
      console.log(users)
    }
  };*/

  renderRedirect = () => {
    if (this.state.validUsername) {
      return <Redirect to='/home' />
    }
  }

  render() {

    return (
      <div className="signup">
        <Title className="login_title">New Here?</Title>
        <Title level={4}>Having a hard time keeping up with your tasks?</Title>
        <Title level={4}>Join and get encouragement from 100,000 other users to achieve your goals!</Title>
        <Form
        className="signup_form"
        validateMessages={validateMessages}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, min: 3}]}
          >
            <Input id="usernameSignUp" placeholder="Username" name="username"/>
          </Form.Item>
          <Form.Item
            name="e-mail"
            rules={[{ required: true, type: 'email'}]}
          >
            <Input id="emailSignUp" placeholder="E-Mail" name="email"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, min: 4}]}
          >
            <Input id="passwordSignUp" type="password" placeholder="Password" name="password"/>
          </Form.Item>
          {this.state.duplicateUsername &&
            <Form.Item>
              <Alert
                message="Username is already taken!"
                type="error"
                showIcon
                className="login_alert"
              />
            </Form.Item>
          }
          <Form.Item>
            {this.renderRedirect()}
            <Button type="primary" htmlType="submit" className="login_button" onClick={()=>{signUp(this.props.app);this.setState({validUsername: true})}}>
              Sign Up
            </Button>
            <p>Been here before? <a href="login">Log in</a></p>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Signup
