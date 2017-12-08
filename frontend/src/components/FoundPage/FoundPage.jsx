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
    
    axios.post('/api/pets', info).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });

  }

    render() {
        return(
            <div className="FoundPage">

                <div className="navbar">
                    <span>

                        <Link to="/notifications">
                            <Button basic color="black" size="huge">
                                Notifications
                            </Button>
                        </Link>

                        <Link to="/" onClick={this.logOut}>
                            <Button basic color="black" size="huge">
                                Logout
                            </Button>
                        </Link>

                    </span>
                </div>

                <div className="FoundPage_Body">
                    <table>
                        <tbody>
                            <tr>
                                <Input id="species" label='Pet Species' placeholder='Dog' />
                            </tr>
                            <tr>
                                <Input id="name" label='Pet Name' placeholder='Rover' />
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
                                <Input id="location" label='Location Found' placeholder='XYZ Park' />
                            </tr>
                            <tr>
                                <th cellspan="2">Description</th>
                            </tr>
                            <tr>
                                <Input id="breed" label='Breed' placeholder='Golden Retriever' />
                            </tr>
                            <tr>
                                <Input id="gender" label='Gender' placeholder='Male' />
                            </tr>
                            <tr>
                                <Input id="color" label='Hair Color' placeholder='Golden' />
                            </tr>
                            <tr>
                                <Input id="img_url" label='Image URL' placeholder='http://imgur.com/DogPic' />
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
