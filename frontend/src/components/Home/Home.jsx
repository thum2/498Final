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
                <div className="header_home">
                    <div className="navbar">
                        <h1>
                            <span>
                                    <Link to= {this.state.isLoggedIn ? "/" : "/"} style={{ color: 'LightGray' }}>
                                        <Icon name='paw' size='large'/>
                                    Pet Finder
                                    </Link>
                                    <Link to="/register" className="buttons">
                                        <Button size="huge">
                                            Sign Up
                                        </Button>
                                    </Link>

                                    <Link to="/login" className="buttons">
                                        <Button size="huge">
                                            Login
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
                            <Link to='/login'>
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
                                <Link to="/login">
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

    }
}

export default Home
