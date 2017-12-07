import React, { Component } from 'react'
import { Button, Card, Grid, Image, Reveal, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

class Home extends Component {
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

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {
       
        return(
            <div className="Home">
                <div className="navbar">
                    <span>

                        <Link to="/register">
                            <Button basic color="black" size="huge">
                                Sign Up
                            </Button>
                        </Link>

                        <Link to="/login">
                            <Button basic color="black" size="huge">
                                Login
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
                        <h1>Register and Login to Access Posting Lost and Found Pets</h1>

                        <br />
                    </div>
                </div>

                <div className="optionHolder">
                    <Grid columns={3}>
                        <Grid.Row>

                          <Grid.Column>
                            <div className="threeDivider">
                                <div className="threeDividerText">
                                    <h1>I found a pet that's not mine</h1>
                                </div>
                            </div>
                          </Grid.Column>

                          <Grid.Column>
                                <div className="threeDivider">
                                    <div className="threeDividerText">
                                        <h1>I lost a pet</h1>
                                    </div>
                                </div>
                          </Grid.Column>

                          <Grid.Column>
                            <div className="threeDivider">
                                <Link to="/SearchPet">
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
        
    }
}

export default Home
