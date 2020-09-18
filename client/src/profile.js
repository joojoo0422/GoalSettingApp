
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Breadcrumb, Space, List, Col, Row, Avatar, Button, Card, Pagination } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EditOutlined} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;


const data = [
  {
    title: 'Daily Workouts!',
    description: "Day 5/30",
    progress: "You are 15% done with this goal!"
  },
  {
    title: 'Daily Workouts!',
    description: "Day 5/30",
    progress: "You are 15% done with this goal!"
  }
];

for(let i = 0; i < 50; i++)
{
    let goal =   {
      title: 'Daily Workouts!',
      description: "Day 5/30",
      progress: "You are 15% done with this goal!"
    }
  if(i % 2 == 0)
  {
     goal =   {
      title: 'Go for a run!',
      description: "Day 10/150",
      progress: "You are 7% done with this goal!"
    }
  }

  data.push(goal)
}


// const App = () => (
//   <>
//     <div className="site-card-wrapper">
//     <Row>
//       <Col span={3}>

//       </Col>
//       <Col className="profile-area" span={4}>
//         <Space direction="vertical">
//           <Avatar src="https://pbs.twimg.com/profile_images/1262370602716889089/4Fk_pbO3_400x400.jpg" shape="square" size={128} icon={<UserOutlined />} />
//           <Button>
//             Change User Info
//           </Button>
//         </Space>
//       </Col>
//       <Col className="goal-area" span={14}>
//         <Card title = "Your current goals">
//           <List
//             itemLayout="horizontal"
//             pagination={{
//               defaultPageSize: 7,
//               showSizeChanger: false,
//               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
//             }}
//             dataSource={data}
//             renderItem={item => (
//               <List.Item
//                 actions={[<a key="log">Log Today's Achievements</a>]}
//               >
//                 <List.Item.Meta
//                   title={<a>{item.title}</a>}
//                   description={item.description}
//                 />
//                 {item.progress}

//               </List.Item>

//             )}
//           />
//         </Card>
//       </Col>
//     </Row>
//   </div>
// </>
// );

class Profile extends React.Component{

    render(){
        return(
      <Layout className="layout">
        <div className="site-card-wrapper">
        <Row>
          <Col span={3}>

          </Col>
          <Col className="profile-area" span={4}>
            <Space direction="vertical">
              <Avatar src="https://pbs.twimg.com/profile_images/1262370602716889089/4Fk_pbO3_400x400.jpg" shape="square" size={128} icon={<UserOutlined />} />
              <Button>
                Change User Info
              </Button>
            </Space>
          </Col>
          <Col className="goal-area" span={14}>
            <Card title = "Your current goals">
              <List
                itemLayout="horizontal"
                pagination={{
                  defaultPageSize: 7,
                  showSizeChanger: false,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item
                    actions={[<a key="log">Log Today's Achievements</a>]}
                  >
                    <List.Item.Meta
                      title={<a>{item.title}</a>}
                      description={item.description}
                    />
                    {item.progress}

                  </List.Item>

                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
        </Layout> 
        );

}

}

export default Profile;
