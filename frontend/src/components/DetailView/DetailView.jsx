import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Comment, Form, Header, Segment,Item, Card, Icon, Grid, Modal, Input } from 'semantic-ui-react'
import styles from './styles.scss'
import axios from 'axios'
import moment from 'moment'

class DetailView extends Component{

	constructor(props) {
    	super(props);
    	this.state = {
      		pet_id: this.props.match.params.id,
      		pet_data: {},
      		isLoggedIn: false,
			currentUser: '',
			sameUser: false
    	};

    	this.componentWillMount = this.componentWillMount.bind(this);
    	this.logOut = this.logOut.bind(this);
    }

    componentWillMount(){
            axios.get('/api/profile').then( (res) => {
				console.log(res.data.user.email);
	            this.setState({
					isLoggedIn: true,
					currentUser: res.data.user.email
				});
	        }).then(()=>{
				axios.get('/api/pets/'+ this.props.match.params.id).then( (res) => {
		            this.setState({
		            	pet_id: this.props.match.params.id,
		            	pet_data: res.data.data
		            })
					if(res.data.data.userid == this.state.currentUser){
						this.setState({
							sameUser: true
						})
					}
			})
	        .catch( (err) => {
	            this.setState({isLoggedIn: false});
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

	render(){
		return(
			<div className="DetailView">
				<Grid>
                <Grid.Row className="header_home">
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
					<div className="PetInformation">
						<PetInformation id={this.state.pet_id} data={this.state.pet_data} userMatch={this.state.sameUser}/>
					</div>
				</Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column>
					<div className="CommentList">
						<CommentList id={this.state.pet_id} data={this.state.pet_data}/>
					</div>
				</Grid.Column>
                </Grid.Row>
                </Grid>
			</div>
		)
	}

}



class PetInformation extends Component{
	constructor(props) {
    	super(props);
    	this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleSubmit(){
	    let info = {}
		let val = document.getElementById("userEmail").value;
		info['recommendId'] = val;
		info['petId'] = this.props.id;

		axios.post('/api/users/notifications', info).then((res) => {
			console.log(res);
			alert("It worked");
		}).catch((err) => {
			console.log(err);
		});
    }

	render(){
		let data = this.props.data;
		let img = data.img_url;
		let name = data.name? data.name.charAt(0).toUpperCase() + data.name.slice(1): "No name";
		let type = data.type? data.type.charAt(0).toUpperCase() + data.type.slice(1): "Not specified";
		let location = data.location
		let description = data.description;
		let website = data.original_website;
		let userIdWhoPosted = data.userid;

		if(this.props.userMatch){
			return(
			<Segment>
				<div className="ui divided items">
					<div className="item">
			    		<div className="image">
			      			<img src={img} />
			    		</div>
				    	<div className="content">
					      	<a className="header">{name}</a>
				      		<div className="meta">
				        		<p>Type: {type}</p>
				        		<p>Location: {location}</p>
				        		<p>Date posted: {moment(this.props.data.datefound).format("MMMM Do YYYY, h:mm:ss a") }</p>
				      		</div>
					      	<div className="description">
					        	<p>Description:{description}</p>
					      	</div>
					      		<a href={website}>Link to original website</a>
					      	<div className="extra">

								<button className="ui primary right floated button" role="button">Reconnected with Owner</button>
								<Modal trigger={<Button className="ui primary right floated">Recommend</Button>} closeIcon>
								    <Header icon='archive' content='Enter the e-mail of the user you want to notify about this post' />
								    <Modal.Content>
			    	                    <Form>
					                        <Form.Field required>
					                            <Input id="userEmail" placeholder='username@email.com' fluid />
					                        </Form.Field>
					                    </Form>
								    </Modal.Content>
								    <Modal.Actions>
								    	<Button  onClick={this.handleSubmit}>
	                                   		Submit
	                              		</Button>
								    </Modal.Actions>
							    </Modal>
							</div>
						</div>
					</div>
				</div>
			</Segment>
			)
		}
		else{
			return(
			<Segment>
				<div className="ui divided items">
					<div className="item">
			    		<div className="image">
			      			<img src={img} />
			    		</div>
				    	<div className="content">
					      	<a className="header">{name}</a>
				      		<div className="meta">
				        		<p>Type: {type}</p>
				        		<p>Location: {location}</p>
				        		<p>Date posted: {moment(this.props.data.datefound).format("MMMM Do YYYY, h:mm:ss a") }</p>
				      		</div>
					      	<div className="description">
					        	<p>Description:{description}</p>
					      	</div>
					      		<a href={website}>Link to original website</a>
					      	<div className="extra">

								<Modal trigger={<Button className="ui primary right floated">Recommend</Button>} closeIcon>
								    <Header icon='archive' content='Enter the e-mail of the user you want to notify about this post' />
								    <Modal.Content>
			    	                    <Form>
					                        <Form.Field required>
					                            <Input id="userEmail" placeholder='username@email.com' fluid />
					                        </Form.Field>
					                    </Form>
								    </Modal.Content>
								    <Modal.Actions>
								    	<Button  onClick={this.handleSubmit}>
	                                   		Submit
	                              		</Button>
								    </Modal.Actions>
							    </Modal>
							</div>
						</div>
					</div>
				</div>
			</Segment>
			)
		}

	}
}

class CommentList extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
      		comments: []
    	};

    	this.MakeCommentList = this.MakeCommentList.bind(this);
    	this.CommentOrNah = this.CommentOrNah.bind(this);
    	this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    	this.postComment = this.postComment.bind(this)
    }

    componentWillReceiveProps(nextProps){
    	if(nextProps == null)
    		return;
  		let promises = []
  		let data = []
 		nextProps.data.comments.forEach(function(comment_id){
			promises.push(axios.get('/api/comments/' + comment_id))
		})
		axios.all(promises).then(function (response) {
			response.forEach(function (response){
				data.push(response.data.data)
			})
    	}).then((response) => {
    		this.setState({
				comments : data,
			})
    	})
	}

	postComment(){
		let self = this
		let comment = document.getElementById("comment").value;
		document.getElementById("comment").value = "";
		if(comment == "")
			return
		let date = moment()
		let user
		var newComment
		var comment_id
		var updatePet
		axios.get('/api/profile').then( (res) => {
            res.data.user.email ? user = res.data.user.email : user = "anon" ;
            newComment ={
            	user: user,
            	date: date,
            	comment: comment
            }
			let comments = this.state.comments
			comments.unshift(newComment)
			this.setState({
				comments: comments
			})}).then((res) => {
        		return axios.post('/api/comments', newComment).then(function(res){
        			comment_id = res.data.data._id
        			let comments = self.props.data.comments
        			comments.unshift(comment_id)
        			updatePet = {
        				comments: comments
        			}
        			console.log(updatePet)
        		})}).then((res) =>{
        				return axios.put('/api/pets/' + self.props.id, updatePet).then(function(res){
        				console.log("put " + res.data.data)
        			})})


	}

	MakeCommentList(props){
		return this.state.comments.map(function(comment,idx){
			return(
				<Comment key={idx}>
					<Comment.Content>
						<Comment.Author as='a'>{comment.user}</Comment.Author>
						<Comment.Metadata>
								<span>{moment(comment.date).format("MMMM Do YYYY, h:mm:ss a")}</span>
						</Comment.Metadata>
						<Comment.Text>{comment.comment}</Comment.Text>
					</Comment.Content>
				</Comment>
			)
		}
		)
	}

	CommentOrNah(props){
		if(this.state.comments != null ){
			return(
				<this.MakeCommentList data={props.data}/>
			)
		}

		else {
			return null
		}
	}

	render(){
		return(
			<Comment.Group threaded>
				<Form reply>
  					<Form.TextArea id="comment" placeholder='Enter Comment Here...' />
  					<Button content='Post Comment' labelPosition='left' icon='edit' primary onClick={this.postComment}/>
				</Form>
				<this.CommentOrNah data={this.state.comments}/>
			</Comment.Group>
		)

	}

}

export default DetailView
