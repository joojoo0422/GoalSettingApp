import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout, Space, List, Col, Row, Avatar, Button, Card, Progress } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import {useParams} from 'react-router';
import axios from 'axios';
import './index.css'

const { Content } = Layout;

const log = console.log



function ProfilePage(props) {
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
    const [myProfile, setMyProfile] = useState({})



    const [followButtonText, setFollowButtonText] = useState("Follow")
    const [loggedInAs, setLoggedInAs] = useState(props.profileLoggedInAs.username)

    useEffect(() => {
        const fetchProfile = async () => {
            axios.get(
                'http://localhost:5000/profile/' + profileToFind.name
            ).then((result) =>  {
                setProfile(result.data)
            })
            .catch((error) => {
                log(error)
            } )
        }
        fetchProfile();
    }, [])

    useEffect(() => {
        const fetchMyProfile = async () => {
            axios.get(
                'http://localhost:5000/profile/' + loggedInAs
            ).then((result) =>  {
                setMyProfile(result.data)
                const isFollowing = result.data.friends.includes(profileToFind.name)
                if(isFollowing)
                {
                    setFollowButtonText("Unfollow")
                }
            })
            .catch((error) => {
                log(error)
            } )
        }
        fetchMyProfile();
    }, [])
    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         const result = await axios(
    //             'http://localhost:5000/profile/' + profileToFind.name
    //         )
    //         setProfile(result.data)
    //     }
    //     fetchProfile();
    // }, [])

    // useEffect(() => {
    //     const fetchCurrentUser = async () => {
    //         axios.get(
    //             'http://localhost:5000/check-session'
    //         ).then((result) => {
    //             setLoggedInAs(result.data.currentUser)
    //         })
    //             .catch((error) => {
    //                 log(error)
    //             })
    //     }
    //     fetchCurrentUser();
    // }, [])


    const followButtonHandler = () =>
    {
        //replace profileToFind.n
        const newFriends = [profileToFind.name].concat(profile.friends)
        setProfile({
            ...profile,
            friends: newFriends
        })



        if(followButtonText === "Follow")
        {
            setFollowButtonText("Unfollow")
            axios.post('http://localhost:5000/profile/addFriend/' + loggedInAs + "/" + profileToFind.name)
                .then((result) => {
                    log(result)
                })
        }
        else
        {
            setFollowButtonText("Follow")
            axios.delete('http://localhost:5000/profile/removeFriend/' + loggedInAs + "/" + profileToFind.name)
                .then((result) => {
                    log(result)
                })

        }
    }

    let settingsButton

    // if the currently logged in user is visiting their own page then show the button to edit their profile info
        if(loggedInAs === profileToFind.name){
            settingsButton = <Button>Change User Info</Button>
        }


        return(
            <div>
                <Layout className="layout">
                    <Content style={{ padding: '0 50px' }}>
                        <div className="site-card-wrapper">
                            <Row>
                                <Col span={3}>
                                </Col>
                                <Col className="profile-area" span={4}>
                                    <Space direction="vertical">
                                        <Avatar src={profile.profilePictureUrl} shape="square" size={128} icon={<UserOutlined />} />
                                        <Link to={"/user/" + profile.username + "/settings"}>
                                            {/* <Button> */}
                                            {/*     Change User Info */}
                                            {/* </Button> */}
                                            {settingsButton}
                                        </Link>
                                        <Button onClick={followButtonHandler}>
                                            {followButtonText}
                                        </Button>
                                        <Link to={"/user/" + profile.username + "/following"}>
                                            <Button>
                                                Following
                                            </Button>
                                        </Link>
                                        <Link to={"/profiles"}>
                                            <Button>
                                                User Directory
                                            </Button>
                                        </Link>
                                    </Space>
                                </Col>
                                <Col className="goal-area" span={14}>
                                    <Card title = {profile.username.charAt(0).toUpperCase() + profile.username.slice(1) + "'s current goals"}>
                                        <List
                                            itemLayout="horizontal"
                                            pagination={{
                                                defaultPageSize: 5,
                                                showSizeChanger: false,
                                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                                            }}
                                            dataSource={profile.goals}
                                            renderItem={item => (
                                                <List.Item
                                                >
                                                    <List.Item.Meta
                                                        title={<a href="/#">{item.title}</a>}
                                                        description={item.description}
                                                    />
                                                    <Progress percent={Math.ceil(100 / item.duration)} type="circle" width={100} className="white-text"/>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout> 
            </div>
        )
    }


export default ProfilePage;
