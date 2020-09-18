import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, message} from "antd";
import "./styles.css";

import "../../actions/goalActions";
import { updateGoals, addGoalJSON } from '../../actions/goalActions';

const txt = "Create new goal here and share them with other people!";

class GoalForm extends React.Component {

  render() {
    const {
      goalTitle,
      goalDescription,
      goalDuration,
      handleChange,
      goalList,
      app
    } = this.props;

    const { TextArea } = Input;

    function goalAdded(e)
      {
          message.success("Your goal has been added! Check your goal on the bottom of the list.")
          // let texts = document.getElementsByClassName("text");
          // for(let i=0;i<texts.length;i++){
          //     texts[i].value = '';
          // }
      }

    return (
      <div className="form">

        <h2 className="header">{txt}</h2>

        <Form
          name="GoalForm"
          onFinish={goalAdded}
        >

          <Form.Item
            label="Goal Title"
            name="g_title"
            rules={[{
              required: true,
              message: "Please input the title of your goal!"
            }]}
          >
            <Input 
            className='text'
              name="goalTitle"
              id="goalTitle"
              placeholder="Input the title of your goal"
              value = {goalTitle}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="g_description"
            rules={[{
              required: true,
              message: "Please input the description of your goal!"
            }]}
          > 
            <TextArea 
            className='text'
              rows={4} 
              name="goalDescription"
              id="goalDescription"
              placeholder="Input description of your goal"
              value = {goalDescription}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Duration (Number of Days)"
            name="g_duration"
            rules={[{
              required: true,
              message: "Please input the duration of your goal only in NUMBERS!",
            
            }]}
          >
            <Input
            className='text'
              name="goalDuration"
              id="goalDuration"
              placeholder='Input the duration of your goal only in numbers (ex/ 3 -> 3 Days)'
              value = {goalDuration}
              onChange={handleChange} 
            /> 
          </Form.Item>


          <Form.Item className="submit">
            <Button 
              type="submit"
              htmlType="submit"
              onClick={()=>{updateGoals(goalList, this, app)}}
            >
              Submit
            </Button>
          </Form.Item>

        </Form>
      </div>
    );
  }
}

export default GoalForm;
