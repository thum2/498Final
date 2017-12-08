import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon } from 'semantic-ui-react'
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
    let entries = ["species", "name", "location", "breed", "gender", "color", "img_url"]
    for(let i=0;i<entries.length;i++){
        let val = document.getElementById(entries[i]).value;
        if(val){
            info[entries[i]] = val;
        }
    }
    info["found"] = true;
    info["datefound"] = this.state.startDate;
    axios.post('/api/pets',info)
    .then((res)=>{console.log(res)});

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
                                <th>Pets species</th>
                                <td><input id="species"></input></td>
                            </tr>
                            <tr>
                                <th>Pets name</th>
                                <td><input id="name"></input></td>
                            </tr>
                            <tr>
                                <th>Found Date</th>
                                <td>
                                    <div className="ui calendar" id="example2">
                                        <div className="ui input left icon">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}/>
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
                                <td><input id="breed"></input></td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td><input id="gender"></input></td>
                            </tr>
                            <tr>
                                <th>Eye Color</th>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <th>Hair Color</th>
                                <td><input id="color"></input></td>
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
