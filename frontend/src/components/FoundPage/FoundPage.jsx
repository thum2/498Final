import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'

import { sortOptions, petOptions, genderOptions, dogBreedOptions, colorOptions} from '../../assets/options.js'

import styles from './FoundPage.scss'
import 'react-datepicker/dist/react-datepicker.css';

class FoundPage extends Component {
    constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
        petType:'',
        petBreed: '',
        petGender: '',
        petColor: '',
        petName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
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
    let entries = ["type", "name", "location", "breed", "gender", "size", "color", "img_url"]
    for(let i=0;i<entries.length;i++){
        let val = document.getElementById(entries[i]).value;
        if(val){
            info[entries[i]] = val;
        }
    }
    info["found"] = true;
      info["original_website"] = "LOCAL";
    info["description"] = null;
    info["datefound"] = this.state.startDate.date;
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
        else{
            this.setState({
                petName: val
            })
        }
        
    }
    render() {
        return(
            <div className="FoundPage">
                <div className="FoundPage_Header">
                    <span className="GroupTitle">
                        <h1><Icon name="paw" />Pet Finder</h1>
                    </span>
                    <div className="FoundPage_Navi">
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
                <div className="FoundPage_Body">
                    <table>
                        <tbody>
                            <tr>
                                <th>Pet Type</th>
                                <td>
                                    <Dropdown
                                      placeholder="Pet Type"
                                      options={petOptions}
                                      selection
                                      onChange={(event, {value}) => this.inputChangehandler(event, value, "pet")}
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
                                <th>Found Date</th>
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
                                <th>Found location</th>
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
                                      onChange={(event, {value}) => this.inputChangehandler(event, value, "breed")}
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
                                      onChange={(event, {value}) => this.inputChangehandler(event, value, "gender")}
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
                                Report Found Pet
                          </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FoundPage




