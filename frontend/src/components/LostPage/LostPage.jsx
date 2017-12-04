import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import styles from './LostPage.scss'
import 'react-datepicker/dist/react-datepicker.css';

class LostPage extends Component {
    constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
                            <Link to={'/notification'}>
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
                                <th>Pet's species</th>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <th>Pet's name</th>
                                <td><input></input></td>
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
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <th cellspan="2">Description</th>
                            </tr>
                            <tr>
                                <th>Breed</th>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <th>Eye Color</th>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <th>Hair Color</th>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <th>Images</th>
                                <td><input></input></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="submitButton">
                          <Link to={'/'}>
                                Report Lost Pet
                          </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LostPage
