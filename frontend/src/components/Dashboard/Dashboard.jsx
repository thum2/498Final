import React, { Component } from 'react'
import { Button, Card, Icon, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

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

                    <div className="optionHolder">
                        <div className="centerer">
                            <h1>
                                <Icon name='paw' size='big' />
                                PetFinder
                            </h1>

                            <h1>The Web App That Helps Find Lost Pets</h1>

                            <br />
                        </div>
                    </div>

                    <div className="optionHolder">
                        <Grid columns={3}>
                            <Grid.Row>

                              <Grid.Column>
                                <div className="threeDivider">
                                    <Link to="/foundpage">
                                        <div className="threeDividerText">
                                            <h1>I found a pet that's not mine</h1>
                                        </div>
                                    </Link>
                                </div>
                              </Grid.Column>

                              <Grid.Column>
                                    <div className="threeDivider">
                                        <Link to="/lostpage">
                                            <div className="threeDividerText">
                                                <h1>I lost a pet</h1>
                                            </div>
                                        </Link>
                                    </div>
                              </Grid.Column>

                              <Grid.Column>
                                <div className="threeDivider">
                                    <Link to="/search">
                                        <div className="threeDividerText">
                                            <h1>Search lost and found pets</h1>
                                        </div>
                                    </Link>
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
