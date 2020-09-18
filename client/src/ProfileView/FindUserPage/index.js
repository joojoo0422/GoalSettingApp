
import React from 'react';
import 'antd/dist/antd.css';
import ProfileView from '../ProfilePage'
import axios from 'axios'
import requests from 'request'
import {useParams} from 'react-router';

let profiles = [];

const profileLoggedInAs = "samart"
const log = console.log


class Profile {
  constructor(username, email, profilePictureUrl, id) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.profilePictureUrl = profilePictureUrl;
    this.goals = [];
    this.friends = [];
    profiles.push(this)
  }

}

class Goal {
  constructor(title, description)
  {
    this.title = title;
    this.description = description;
    this.duration = Math.floor(Math.random() * 101); //new goal
  }
}

const samart = new Profile("samart", "samart@gmail.com", "https://pbs.twimg.com/profile_images/1262370602716889089/4Fk_pbO3_400x400.jpg", 1);
const dieselnoi = new Profile("dieselnoi", "dieselnoi@gmail.com", "https://sports-images.vice.com/images/2016/12/15/dieselnoi-the-knee-of-legend-body-image-1481834836.jpeg", 2);




for(let i = 0; i < 25; i++)
{
  samart.goals.push(new Goal("Daily Workouts!", "Lift those weights then put them down"))
  samart.goals.push(new Goal("Go for a run!", "Move those legs"))
}

for(let i = 0; i < 25; i++)
{
  dieselnoi.goals.push(new Goal("Go for a run!", "Move those legs"))
  dieselnoi.goals.push(new Goal("Daily Workouts!", "Lift those weights then put them down"))
}



const updateFriends = (profileName, friendToAdd) => {
    
    const profilesToAddFriendTo = profiles.find(profile => profile.username === profileName)
    profilesToAddFriendTo.friends.push(friendToAdd)
    console.log("HERE IS THE UPDATED FRIENDS LIST", profiles)
}






const UsersPage = () => {
  const profileToFind = useParams();
  const profileToRender = profiles.find(profile => profile.username === profileToFind.name)


    // axios.get('http://localhost:5000/profile/' + profileName)
    //  .then(res => {
    //      const profileToRender = res.data
    // })
    // .catch(err => {
    //     log(err)
    // })

  if(profileToRender === undefined)
  {
    return (
      <div>
        <h3>
          This user doesn't exist!
        </h3>
      </div>
    );
  }
  else {
    return (
    <div>
      <ProfileView profiles={profiles} profileLoggedInAs={profileLoggedInAs} profile={profileToRender} updateFriends={updateFriends}
      />
    </div>
  );
    }
};




// const UsersPage = () => {
//   const profileToFind = useParams();
//   const profileToRender = profiles.find(profile => profile.username === profileToFind.name)


//     // axios.get('http://localhost:5000/profile/' + profileName)
//     //  .then(res => {
//     //      const profileToRender = res.data
//     // })
//     // .catch(err => {
//     //     log(err)
//     // })

//   if(profileToRender === undefined)
//   {
//     return (
//       <div>
//         <h3>
//           This user doesn't exist!
//         </h3>
//       </div>
//     );
//   }
//   else {
//     return (
//     <div>
//       <ProfileView profiles={profiles} profileLoggedInAs={profileLoggedInAs} profile={profileToRender} updateFriends={updateFriends}
//       />
//     </div>
//   );
//     }
// };

export default UsersPage
