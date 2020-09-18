import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, List, Col, Row, Avatar,  Form, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import {useParams} from 'react-router';
import axios from 'axios';

const { Content } = Layout;

const { Option } = Select;

const log = console.log



function SettingsPage() {
    const profileToFind = useParams();
    const [profile, setProfile] = useState({
        friends: [],
        username: "",
        email: "",
        password: "",
        profilePictureUrl: "",
        goals: [],
        __v: 0
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await axios(
                'http://localhost:5000/profile/' + profileToFind.name
            )
            setProfile(result.data)
        }
        fetchProfile();
    }, [])



    const addFriend = () => {
        // updateFriends(profileLoggedInAs, profile.username)
        

    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const [form] = Form.useForm();  

    const onGenderChange = value => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        return;
    }
  };

  const onFinish = async (values) => {

      if(values.profile_picture)
      {
          const result = await axios.post('http://localhost:5000/profile/updateProfilePicture/samart', {
              newProfilePictureUrl: values.profile_picture
          })
      }

      if(values.email)
      {
          const result = await axios.post('http://localhost:5000/profile/updateEmail/samart', {
              newEmail: values.email
          })
      }

      // if(typeof values.email === "undefined")
      // {
      //     const result = await axios.post('http://localhost:5000/profile/updateProfilePicture/samart', {
      //         newProfilePictureUrl: values.profile_picture
      //     })
      // }


      // log(result.data)
      // log(profile)



  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

    return(
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
              <Form.Item name="profile_picture" label="Profile Picture">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input />
              </Form.Item>
              {/* <Form.Item name="gender" label="Gender"> */}
              {/*   <Select */}
              {/*     placeholder="Select a option and change input text above" */}
              {/*     onChange={onGenderChange} */}
              {/*     allowClear */}
              {/*   > */}
              {/*     <Option value="male">male</Option> */}
              {/*     <Option value="female">female</Option> */}
              {/*     <Option value="other">other</Option> */}
              {/*   </Select> */}
              {/* </Form.Item> */}
              {/* <Form.Item */}
              {/*   noStyle */}
              {/*   shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender} */}
              {/* > */}
              {/*   {({ getFieldValue }) => { */}
              {/*     return getFieldValue('gender') === 'other' ? ( */}
              {/*       <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}> */}
              {/*         <Input /> */}
              {/*       </Form.Item> */}
              {/*     ) : null; */}
              {/*   }} */}
              {/* </Form.Item> */}
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                  Fill form
                </Button>
              </Form.Item>
            </Form>
        </div>
    )
        // return(
        //     <div>
        //         <Layout className="layout">
        //             <Content style={{ padding: '0 50px' }}>
        //                 <div className="site-card-wrapper">
        //                     <Row>
        //                         <Col span={3}>
        //                         </Col>
        //                         <Col className="profile-area" span={4}>
        //                             <Space direction="vertical">
        //                                 <Avatar src={profile.profilePictureUrl} shape="square" size={128} icon={<UserOutlined />} />
        //                                 <Button>
        //                                     Change User Info
        //                                 </Button>
        //                                 <Button onClick={() => {
        //                                     //replace profileToFind.n
        //                                     const newFriends = [profileToFind.name].concat(profile.friends)
        //                                     setProfile({
        //                                         ...profile,
        //                                         friends: newFriends
        //                                     })
        //                                     log(profile)
        //                                 }}>
        //                                     Follow
        //                                 </Button>
        //                                 <Link to={"/user/" + profile.username + "/following"}>
        //                                     <Button>
        //                                         Following
        //                                     </Button>
        //                                 </Link>
        //                                 <Link to={"/users"}>
        //                                     <Button>
        //                                         User Directory
        //                                     </Button>
        //                                 </Link>
        //                             </Space>
        //                         </Col>
        //                         <Col className="goal-area" span={14}>
        //                             <Card title = {profile.username.charAt(0).toUpperCase() + profile.username.slice(1) + "'s current goals"}>
        //                                 <List
        //                                     itemLayout="horizontal"
        //                                     pagination={{
        //                                         defaultPageSize: 5,
        //                                         showSizeChanger: false,
        //                                         showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        //                                     }}
        //                                     dataSource={profile.goals}
        //                                     renderItem={item => (
        //                                         <List.Item
        //                                         >
        //                                             <List.Item.Meta
        //                                                 title={<a href="/#">{item.title}</a>}
        //                                                 description={item.description}
        //                                             />
        //                                             <Progress percent={item.progress} type="circle" width={100} />
        //                                         </List.Item>
        //                                     )}
        //                                 />
        //                             </Card>
        //                         </Col>
        //                     </Row>
        //                 </div>
        //             </Content>
        //         </Layout> 
        //     </div>
        // )
    }


export default SettingsPage;
