import React, { Component } from 'react'
import { Button, Card, Grid, Image, Reveal, Icon, Feed} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SearchGallery from '../Search/SearchGallery/SearchGallery.jsx'
import NotificationsPost from './NotificationsPost/NotificationsPost.jsx'

import styles from './Notifications.scss'

class Notifications extends Component {
	constructor() {
        super();
        this.state = {
            isLoggedIn: false,
			      pets:[]
        }

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
        });

        axios.get('/api/users/notifications').then( (res) => {
            console.log(res.data.data);
			let promises = []
	  		let list = []
	 		res.data.data.forEach(function(pet_id){
				promises.push(axios.get('/api/pets/' + pet_id))
			})
			axios.all(promises).then(function (response) {
				response.forEach(function (response){
					list.push(response.data.data)
				})
	    	}).then((response) => {
	    		this.setState({
					pets : {data: list}
				})
	    	})
        }).catch( (err) => {
            console.log("There is an errror");
        });
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {

        if (this.state.isLoggedIn) {
            return(
                <div className="Notifications">
					<Grid>
					<Grid.Row className="Notifications_Header">
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
                    <div className="Notifications_List">
						<h1>List of pets recommended by other users</h1>
						{<SearchGallery pets={this.state.pets} col={0}/>}
                    </div>
                    </Grid.Column>
                    </Grid.Row>
                  </Grid>

                </div>
            )
        } else {
            return(
                <div className="Notifications">
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

export default Notifications
