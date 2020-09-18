import React from 'react';
import './goal-description.css';
import 'antd/dist/antd.css';
import {Progress, Button, Divider, Row, Col, Popover} from 'antd';
import {HeartFilled, ShareAltOutlined, CommentOutlined, StarOutlined, CheckOutlined, SendOutlined, SmileOutlined} from '@ant-design/icons';
import Comment from './comment';
import TextareaAutosize from 'react-textarea-autosize';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Ratings from './rateit';
import { Link } from 'react-router-dom';



class GoalSection extends React.Component{

    constructor(){
        super();
        this.state = {
            ratingStars: false,
            visible: false,
            pic: './images/profilePic.jpg',
            kudos: 0,
            rating: 0,
            days: 0,
            comments: [],
            enrolled: false,
            color: '#F646AC'
        };
        this.logProgress=this.logProgress.bind(this);
    }


    componentWillMount(){
        fetch(`/get-goal-detail/${this.props.title}`)
        .then(result => {
            return result.json()
        })
        .then(json => {
            this.setState({
                kudos: json.kudos,
                days: json.progress,
                rating: json.ratings,
                visible: true,
                ratingStars: true
            })
            
            for(let i=0;i<json.comments.length;i++){
                this.state.comments.push(<Comment key={i} content={json.comments[i]}/>)
            }
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    logProgress(){

        const request = new Request(`/add-progress/${this.props.title}`, {
            method: 'post',
            headers: {
                Accept: "application/json, text/plain, ",
                "Content-type": "application/json"
            }
        })
        fetch(request)
            .then(result => {
                if(result.status===200){
                    return result.json()
                }
            })
            .catch(error => {
                console.log(error)
            })
        let days = this.state.days;
        days++;
        this.setState({days: days});
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = visible => {
        this.setState({ visible });
    }
    
    hide2 = () => {
        this.setState({
            ratingStars: false,
        });
    }

    handleVisibleChange2 = visible => {
        this.setState({ ratingStars: visible });
    }  
    
    commentFocus = () => {
        document.getElementById('enterComment').focus();
    }
    

    send = () => {
            let content = document.getElementById('enterComment').value;
            if(content === ''){
                return;
            }
            let newContent = content;
            let comments = this.state.comments;
            comments.push(<Comment key={comments.length} content={content}/>);
            this.setState({comments: comments});
            document.getElementById('enterComment').value = '';

            const request = new Request(`/add-comment/${this.props.title}`, {
                method: 'post',
                body: JSON.stringify({
                    comment: newContent
                }),
                headers: {
                    Accept: "application/json, text/plain, ",
                    "Content-type": "application/json"
                }
            })

            fetch(request)
                .then(result => {
                    if(result.status===200){
                        return result.json()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
    }

    addLikes = () => {
        let kudos = this.state.kudos;
        kudos++;
        this.setState({kudos: kudos});
        document.getElementsByClassName('likeBtn')[0].style.color = '#E2264D';
        
        const request = new Request(`/add-kudos/${this.props.title}`, {
            method: 'post',
            headers: {
                Accept: "application/json, text/plain, ",
                "Content-type": "application/json"
            }
        })
        fetch(request)
            .then(result => {
                if(result.status===200){
                    return result.json()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    render(){

        
        const check = (index)=>{
                let checks = document.getElementsByClassName('checked');
                for(let i=0;i<checks.length;i++){
                    if(i===index){
                        checks[index].style.visibility = 'visible';
                    }else{
                        checks[i].style.visibility = 'hidden';
                    }
                }
                if(index===5){
                    document.getElementById('init').style.visibility = 'visible';
                }else{
                    document.getElementById('init').style.visibility = 'hidden';
                }
        };

        const addEmojis = (e) => {
            let emoji = e.native;
            document.getElementById('enterComment').value += emoji;
        };


        const colors = [];
        colors.push(<li className='color color1'><div className='color-item item1' onClick={()=> {this.setState({color: '#4232EB'});check(0);}}><CheckOutlined className='checked'/></div></li>);
        colors.push(<li className='color'><div className='color-item item2' onClick={()=> {this.setState({color: '#FF4A4D'});check(1);}}><CheckOutlined className='checked'/></div></li>);
        colors.push(<li className='color'><div className='color-item item3' onClick={()=> {this.setState({color: '#4497FF'});check(2);}}><CheckOutlined className='checked'/></div></li>);
        colors.push(<li className='color'><div className='color-item item4' onClick={()=> {this.setState({color: '#2ACB63'});check(3);}}><CheckOutlined className='checked'/></div></li>);
        colors.push(<li className='color'><div className='color-item item5' onClick={()=> {this.setState({color: '#F646AC'});check(5);}}><CheckOutlined id='init'/></div></li>);
        colors.push(<li className='color'><div className='color-item item6' onClick={()=> {this.setState({color: '#ff9102'});check(4);}}><CheckOutlined className='checked'/></div></li>);
        
        
        return(
            <div className="goal" style={{background:this.state.color}}>
                <div className="progress">
                    <Progress type="circle" percent={Math.round(this.state.days/this.props.targetDays*100)} 
                    format={percent => percent!==100?`${percent} %`: 'Done'} 
                    />
                </div>
                <h1 className='goal-title'></h1>
                
                <ul className='buttonGroup'> 
                    <li><Button className='btn' type="primary" onClick={this.logProgress}>Log Your Progress</Button></li>
                    <li>
                        <Link to="/home">
                            <Button type="primary" className="btn">Back</Button>
                        </Link>
                    </li>
                </ul>
                <div className='description'>
                    <h2>{this.props.title}</h2>
                    {this.props.description}
                </div>
                <div className='colors'>
                    <h2>Select Colors</h2>
                    <ul className='colorsList'>
                        {colors}
                    </ul>
                </div>
                <Divider />

                <Row>
        <Col span={5}><button className='btn2' onClick={this.addLikes}><HeartFilled className='likeBtn'/> {this.state.kudos} Kudos</button></Col>
                    <Divider type="vertical"/>
                    <Col span={6}><button className='btn2' onClick={this.commentFocus}><CommentOutlined /> Comment</button></Col>
                    <Divider type="vertical"/>
                    <Col span={6}><button className='btn2'><ShareAltOutlined /> Share</button></Col>
                    <Divider type="vertical"/>
                    <Col span={5}>
                        <Popover
                            content={<Ratings title={`${this.props.title}`}/>}
                            trigger="click"
                            visible={this.state.ratingStars}
                            onVisibleChange={this.handleVisibleChange2}
                        >
                            <button className='btn2'><StarOutlined /> Rate It</button>
                        </Popover>
                    </Col>
                </Row>
                
                <Divider />
                <Row>
                    <Col span={3}><img className='send-icon' src={require(`${this.state.pic}`)} alt=''/></Col>
                    <Col span={15}><TextareaAutosize id='enterComment' placeholder='Enter your comment...'></TextareaAutosize></Col>
                    <Col span={3}>
                        <Popover
                            content={<Picker onSelect={addEmojis}/>}
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                        <button className='emojis'><SmileOutlined /></button>
                        </Popover>
                    </Col>
                    <Col span={3}><button className="sendBtn" onClick={this.send}><SendOutlined /></button></Col>
                    
                </Row>
                
                {this.state.comments.map((comment) => (
                    comment
                ))}
                

            </div>
        );
    }

}

export default GoalSection;