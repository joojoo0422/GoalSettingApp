import React from 'react';
import './App.css';
import './goal-description.css';
import 'antd/dist/antd.css';


class InfoSection extends React.Component{

    constructor(){
        super();
        this.state = {
            target: '',
            daysRemain: 0,
            status: false
        };
    }

    render(){

        
        return(
            <div>
                <div>
                    <h3>Target: {this.state.target} </h3> 
                </div>
                <div>
                    <h3>Days Remaining: {this.state.daysRemain} </h3>
                </div>
                <div>
                    <h3>Status for today: {this.state.status} </h3>
                    
                </div>
            </div>
        );
    }
}

export default InfoSection;