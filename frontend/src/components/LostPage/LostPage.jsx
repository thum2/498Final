import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon, Dropdown, Radio } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'

import { sortOptions, petOptions, genderOptions, dogBreedOptions, colorOptions} from '../../assets/options.js'

import styles from './LostPage.scss'
import 'react-datepicker/dist/react-datepicker.css';

class LostPage extends Component {
    constructor (props) {
    super(props)
    this.state = {
        startDate: moment(),
        petType:'',
        petBreed: '',
        petGender: '',
        petColor: '',
        petName: '',
        petSize:'',
        petLocation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
    
  handleSubmit(){
    let info = {}
    let entries = ["type", "name", "location", "breed", "gender", "size", "color", "img_url"]
    for(let i=0;i<entries.length;i++){
        let val = document.getElementById(entries[i]).value;
        if(val){
            info[entries[i]] = val;
        }
    }
    info["found"] = false;
    info["original_website"] = "LOCAL";
    info["description"] = null;
    info["datefound"] = this.state.startDate.date; //lost date
    axios.post('/api/pets',info).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });

  }
    
    inputChangeHandler(event, val, type){
        if(type=="pet"){
            this.setState({
                petType: val
            });
        }
        else if(type=="gender"){
            this.setState({
                petGender: val
            })
        }
        else if(type=="breed"){
            this.setState({
                petBreed: val
            })
        }
        else if(type=="color"){
            this.setState({
                petColor: val
            })
        }
        else if(type=="size"){
            this.setState({
                petSize:val
            })
        }
        else if(type=="location"){
            this.setState({
                petLocation: val
            })
        }
        else{
            this.setState({
                petName: val
            })
        }
        
    }
    
    render() {
        return(
            <div className="LostPage">
                <div className="LostPage_Header">
                    <span className="GroupTitle">
                        <h1><Icon name="paw" />Pet Finder</h1>
                    </span>
                    <div className="LostPage_Navi">
                        <Breadcrumb.Section>
                            <Link to={'/notifications'}>
                                Notifications
                            </Link>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider />
                        <Breadcrumb.Section>
                            <Link to={'/'}>
                                Logout
                            </Link>
                        </Breadcrumb.Section>
                    </div>
                </div>
                <div className="LostPage_Body">
                    <table>
                        <tbody>
                            <tr>
                                <th>Pet Type</th>
                                <td>
                                    <Input
                                      fluid
                                        type="text"
                                        placeholder='Pet Type'
                                        value={this.state.petName}
                                        onChange={(event, {value}) => this.inputChangeHandler(event, value, "pet")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Pet's name</th>
                                <td>
                                    <Input
                                        fluid
                                        type="text"
                                        placeholder='Name'
                                        value={this.state.petName}
                                        onChange={(event, {value}) => this.inputChangeHandler(event, value, "name")}>
                                    </Input>
                                </td>
                            </tr>
                            <tr>
                                <th>Lost Date</th>
                                <td>
                                    <div className="ui calendar" id="example2">
                                        <div className="ui input left icon">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <Icon name="calendar" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Lost location</th>
                                <td><input id="location"></input></td>
                            </tr>
                            <tr>
                                <th cellspan="2">Description</th>
                            </tr>
                            <tr>
                                <th>Breed</th>
                                <td>
                                    <Dropdown
                                      placeholder="Breed"
                                      options={dogBreedOptions}
                                      selection
                                      onChange={(event, {value}) => this.inputChangeHandler(event, value, "breed")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>
                                    <Dropdown
                                      placeholder="Gender"
                                      options={genderOptions}
                                      selection
                                      onChange={(event, {value}) => this.inputChangeHandler(event, value, "gender")}
                                  />
                                </td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <td>
                                  <Radio label='Small' value='sm' checked={this.state.petSize === 'sm'} onChange={(event, {value}) => this.inputChangeHandler(event, value, "size")} />
                                  <Radio label='Medium' value='md' checked={this.state.petSize === 'md'} onChange={(event, {value}) => this.inputChangeHandler(event, value, "size")} />
                                  <Radio label='Large' value='lg' checked={this.state.petSize === 'lg'} onChange={(event, {value}) => this.inputChangeHandler(event, value, "size")} />
                                </td>
                            </tr>
                            
                            <tr>
                                <th>Hair Color</th>
                                <td>
                                    <Dropdown
                                          placeholder="Color"
                                          options={colorOptions}
                                          selection
                                         onChange={(event, {value}) => this.inputChangehandler(event, value, "color")}
                                      />
                                </td>
                            </tr>
                            <tr>
                                <th>Images</th>
                                <td><input id="img_url"></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="submitButton">
                          <Button  onClick={this.handleSubmit}>
                                Report Lost Pet
                          </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LostPage
