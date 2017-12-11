import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Input, Breadcrumb, Icon, Dropdown, Form, TextArea, Grid } from 'semantic-ui-react'
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
      startDate: moment(),
      gender: '',
      size: '',
      notes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropDowns = this.handleDropDowns.bind(this);
    this.logOut = this.logOut.bind(this);
  }
    componentDidMount() {
        axios.get('/api/profile').then( (res) => {
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
    logOut(e) {
        console.log(e)
        let self = this
        axios.get('/api/logout').then( (res) => {
            console.log(self.state);
            console.log("Logged out");
        })
    }

    handleDropDowns(event, val, type){
        if(type=="gender"){
            this.setState({
                gender: val
            })
        }
        else if(type=="size"){
            this.setState({
                size: val
            })
        }
        else{
            this.setState({
                notes: val
            })
        }

    }

    handleSubmit(){
        let info = {}
        let entries = ["type", "name", "location", "breed", "color", "img_url"]
        for(let i=0;i<entries.length;i++){
            let val = document.getElementById(entries[i]).value;
            if(val){
                info[entries[i]] = val;
            }
        }
        info["gender"] = this.state.gender;
        info["size"] = this.state.size;
        info["notes"] = this.state.notes;
        info["found"] = true;
        info["original_website"] = "LOCAL";
        info["datefound"] = this.state.startDate;

        if(info["type"] && info["location"] && info["color"]){
            axios.post('/api/pets', info).then((res)=>{
                console.log(res);
                alert("Your Pet has been submitted")
            }).then(() => {
                this.props.history.push('/dashboard');
            }).catch((err)=>{
                console.log(err);
                alert("Your Pet failed to be submitted")

            });
        }

        else{
            alert("Please fill up mandatory fields");
        }
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

                <Grid>
                <Grid.Row className="Found_Header">
                <Grid.Column>
                        <div className="navbar">
                            <h1>
                                <span>
                                  <Link to= {this.state.isLoggedIn ? "/dashboard" : "/"} style={{ color: 'LightGray' }}>
                                    <Icon name='paw' size='large'/>
                                  Pet Finder
                                  </Link>
                                  <Link to={this.state.isLoggedIn ? "/notifications" : "/register"} className="buttons">
                                      <Button size="medium">
                                        {this.state.isLoggedIn ? "Notifications" : "Sign Up"}
                                      </Button>
                                  </Link>

                                  <Link to= {this.state.isLoggedIn ? "/" : "/login"} onClick={this.state.isLoggedIn ? this.logOut : null} className="buttons">
                                      <Button size="medium">
                                          {this.state.isLoggedIn ? "Logout" : "Login"}
                                      </Button>
                                  </Link>
                                </span>
                            </h1>
                        </div>
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column>
                <div id="FormContainer">
                    <Form>
                        <Form.Field required>
                            <label>Pet Type</label>
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
                                        onChange={this.handleChange}
                                        required />
                                </div>
                            </div>
                        </Form.Field>

                        <Form.Field required>
                            <label>Location Found</label>
                            <Input id="location" placeholder='XYZ Park' />
                        </Form.Field>

                        <Form.Field>
                            <label>Breed</label>
                            <Input id="breed" placeholder='Golden Retriever' />
                        </Form.Field>

                        <Form.Field>
                            <label>Gender</label>
                            <Dropdown value={this.state.gender} onChange={(event,{value}) => {this.handleDropDowns(event,value,"gender")}} placeholder='Select Gender' fluid selection options={genderOptions} />
                        </Form.Field>

                        <Form.Field>
                            <label>Size</label>
                            <Dropdown value={this.state.size} onChange={(event,{value}) => {this.handleDropDowns(event,value,"size")}} placeholder='Select Size' fluid selection options={sizeOptions} />
                        </Form.Field>

                        <Form.Field required>
                            <label>Hair Color</label>
                            <Input id="color" placeholder='Golden' />
                        </Form.Field>

                        <Form.Field>
                            <label>Image URL</label>
                            <Input id="img_url" placeholder='http://imgur.com/DogPic' />
                        </Form.Field>

                        <Form.Field>
                            <label>Additional Notes</label>
                            <TextArea value={this.state.notes} onChange={(event,{value}) => {this.handleDropDowns(event,value,"description")}} placeholder='Tell us more about your pet, the more information the more likely it will be found' style={{ minHeight: 100 }} />
                        </Form.Field>

                        <div className="submitButton">
                              <Button  onClick={this.handleSubmit}>
                                    Report Found Pet
                              </Button>
                        </div>
                    </Form>
                </div>
                </Grid.Column>
                </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default FoundPage
