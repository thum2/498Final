import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon, Dropdown, Form, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'



import styles from './FoundPage.scss'
import 'react-datepicker/dist/react-datepicker.css';

class FoundPage extends Component {
    constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
    componentDidMount() {
        axios.get('/api/profile').then( (res) => {
            console.log(res);
            this.setState({
                isLoggedIn: true
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            })
        })
    }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(){
    let info = {}
    console.log("The description " + document.getElementById("gender"));
    let entries = ["type", "name", "location", "breed", "gender", "color", "img_url", "size"]
    for(let i=0;i<entries.length;i++){
        let val = document.getElementById(entries[i]).value;
        if(val){
            info[entries[i]] = val;
        }
    }
    info["found"] = true;
    info["original_website"] = "LOCAL";
    info["datefound"] = this.state.startDate.date;

    axios.post('/api/pets', info).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });

  }

    render() {
        const genderOptions = [{key: 'male', text: 'Male', value: 'male'},
                               {key: 'female', text: 'Female', value: 'female'}
        ];

        const sizeOptions   = [{key: 'small', text: 'Small', value: 'small'},
                               {key: 'medium', text: 'Medium', value: 'medium'},
                               {key: 'large', text: 'Large', value: 'large'}
        ];

        return(
            <div className="FoundPage">

                <div className="navbar">
                    <span>

                        <Link to="/notifications">
                            <Button basic color="black" size="large">
                                Notifications
                            </Button>
                        </Link>

                        <Link to="/" onClick={this.logOut}>
                            <Button basic color="black" size="large">
                                Logout
                            </Button>
                        </Link>

                    </span>
                </div>

                <div id="FormContainer">
                    <Form>
                        <Form.Field>
                            <label>Pet Species</label>
                            <Input id="type" placeholder='Dog' fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>Pet Name</label>
                            <Input id="name" placeholder='Rover' fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>Date Found</label>
                            <div className="ui calendar" id="example2">
                                <div className="ui input left icon">
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}/>
                                </div>
                            </div>
                        </Form.Field>

                        <Form.Field>
                            <label>Location Found</label>
                            <Input id="location" placeholder='XYZ Park' />
                        </Form.Field>

                        <Form.Field>
                            <label>Description</label>
                            <TextArea id="description" placeholder='Tell us more about your pet, the more information the more likely it will be found' style={{ minHeight: 100 }} />
                        </Form.Field>

                        <Form.Field>
                            <label>Breed</label>
                            <Input id="breed" placeholder='Golden Retriever' />
                        </Form.Field>

                        <Form.Field>
                            <label>Gender</label>
                            <Dropdown id="gender" placeholder='Select Gender' fluid selection options={genderOptions} />
                        </Form.Field>

                        <Form.Field>
                            <label>Size</label>
                            <Dropdown id="size" placeholder='Select Size' fluid selection options={sizeOptions} />
                        </Form.Field>

                        <Form.Field>
                            <label>Hair Color</label>
                            <Input id="color" placeholder='Golden' />
                        </Form.Field>

                        <Form.Field>
                            <label>Image URL</label>
                            <Input id="img_url" placeholder='http://imgur.com/DogPic' />
                        </Form.Field>

                        <div className="submitButton">
                              <Button  onClick={this.handleSubmit}>
                                    Report Found Pet
                              </Button>
                        </div>
                    </Form>
                </div>

            </div>
        )
    }
}

export default FoundPage
