import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import {  List,  Card } from 'antd';
import {  Link } from 'react-router-dom';
import {useParams} from 'react-router';
import axios from 'axios';
import './styles.css';

const { Meta } = Card;


const log = console.log

const UserDirectory = () => {
    // const prof = useParams();
  // const profile = profiles.find(profile => profile.username === prof.name)
    //
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        const  fetchProfiles = async () => {
            const result = await axios(
                'http://localhost:5000/profiles'
            )
            setProfiles(result.data)
        }
        fetchProfiles();
    }, [])


  return(
    <div className="ProfileGrid">
      <List
    grid={{ gutter: 16, column: {xs: 1, sm: 2, md: 4, lg: 6} }}
    // dataSource={profiles}
    dataSource={profiles}
    renderItem={item => (
      <List.Item>
        <Link to={"/user/" + item.username}>
        <Card
        style={{width: 300}}
        hoverable
        cover={<img className="profileGridImages" alt="" src={item.profilePictureUrl} height="300"></img>}
        
    >
      <Meta title={item.username.charAt(0).toUpperCase() + item.username.slice(1)} />
    </Card>
    </Link>
      </List.Item>
    )}
  />
    </div>
  );
};

export default UserDirectory
