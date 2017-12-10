import React, { Component } from 'react'
import { Button, Card, Icon, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Dashboard.scss'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }

        this.logOut = this.logOut.bind(this);

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

    logOut(e) {
        console.log(e)
        let self = this
        axios.get('/api/logout').then( (res) => {
            console.log(self.state);
            console.log("Logged out");
        })
    }

    render() {

        if (this.state.isLoggedIn) {
            return(
                <div className="Dashboard">

                    <div className="header_home">
                        <div className="navbar">
                            <h1>
                                <span>
                                      <Link to= {this.state.isLoggedIn ? "/dashboard" : "/dashboard"} style={{ color: 'LightGray' }}>
                                        <Icon name='paw' size='large'/>
                                        Pet Finder
                                      </Link>
                                    <Link to="/notifications" className="buttons">
                                        <Button  size="huge">
                                            Notifications
                                        </Button>
                                    </Link>
                                    <Link to="/" onClick={this.logOut} className="buttons">
                                        <Button  size="huge" >
                                            Logout
                                        </Button>
                                    </Link>
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="optionHolder">
                    <div className="centerer">


                        <h1>The Web App That Helps Find Lost Pets</h1>
                        <h1>Register and Login to Access Posting Lost and Found Pets</h1>

                        <br />
                    </div>
                </div>


                <div className="optionHolder">

                    <Grid columns={3}>
                        <Grid.Row>

                          <Grid.Column>
                            <Link to='/foundpage'>
                            <div className="threeDivider">
                                <div className="threeDividerText">
                                    <h1>I found a pet thats not mine</h1>

                                </div>

                            </div>
                            </Link>
                            <div>
                                <Image src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX4279501.jpg" size="medium"/>
                            </div>
                          </Grid.Column>

                          <Grid.Column>
                                <Link to="/lostpage">
                                <div className="threeDivider">
                                        <div className="threeDividerText">
                                            <h1>I lost a pet</h1>
                                        </div>

                                </div>
                                </Link>
                          </Grid.Column>

                          <Grid.Column>
                            <Link to="/search">
                            <div className="threeDivider">
                                    <div className="threeDividerText">
                                        <h1>Search lost and found pets</h1>
                                    </div>
                            </div>
                            </Link>
                            <div>
                                <Image src="https://ak3.picdn.net/shutterstock/videos/16019503/thumb/1.jpg"size="medium"/>
                            </div>
                          </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </div>

            </div>
            )
        } else {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>You must log in before you can see this page.</h1>
                        <Link to="/">
                            Back
                        </Link>
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
