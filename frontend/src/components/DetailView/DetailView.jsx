import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Comment, Form, Header, Segment,Item, Card, Icon, Grid, Modal, Input,Search, Label } from 'semantic-ui-react'
import styles from './styles.scss' 
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

class DetailView extends Component{

	constructor(props) {
    	super(props);
    	this.state = {
      		pet_id: this.props.match.params.id,
      		pet_data: {},
      		isLoggedIn: false
    	};

    	this.componentWillMount = this.componentWillMount.bind(this);
    	this.logOut = this.logOut.bind(this);
    }

    componentWillMount(){
    	axios.get('/api/pets/'+ this.props.match.params.id).then( (res) => {
            this.setState({
            	pet_id: this.props.match.params.id,
            	pet_data: res.data.data
            })
            axios.get('/api/profile').then( (res) => {
	            this.setState({isLoggedIn: true});
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
						<PetInformation id={this.state.pet_id} data={this.state.pet_data}/>
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
    	this.state ={
    		value: '',
    		users: [],
    		users_view:[],
    		submitMessage: ''
    	};
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.getUsers = this.getUsers.bind(this);
    	this.handleResultSelect = this.handleResultSelect.bind(this);
    	this.handleSearchChange = this.handleSearchChange.bind(this);
    }


    getUsers(){
    	axios.get('/api/users/').then( (res) => {
    		console.log(res.data)
    		let users_data = [];
    		res.data.data.map((user,idx) =>{
    			users_data.push({key:user._id, "title": user.email})
    		});
    		console.log(users_data) 
            this.setState({
            	users: users_data, users_view: users_data
            });
    	});
    }
    handleResultSelect(e, { result }){
    	this.setState({ value: result.title })
    }
    handleSearchChange(e, { value }){
      this.setState({value: value})
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        users_view: _.filter(this.state.users, isMatch)
      })
    }

	handleSubmit(){
	    let info = {}
		let val = document.getElementById("userEmail").value;
		info['recommendId'] = val;
		info['petId'] = this.props.id;
		//console.log(val);
		//console.log(this.props.id);

		axios.post('/api/users/notifications', info).then((res) => {
			this.setState({submitMessage: res.data.message})

		}).catch((err) => {
			console.log(err);
			console.log("not sent");
			this.setState({submitMessage: res.data.message})
		});

		/*
	    if(info["type"] && info["location"] && info["color"]){
	        axios.post('/api/users/notifications', info).then((res)=>{
	            console.log(res);
	            alert("Your Pet has been submitted")
	        }).then(() => {
	            this.props.history.push('/dashboard');
	        }).catch((err)=>{
	            console.log(err);
	            alert("Your Pet failed to be submitted")

        });
        */
    }

	render(){
		let users_view = this.state.users_view;
		let value = this.state.value;
		return(
		<Segment>
			<div className="ui divided items">
				<div className="item">
		    		<div className="image">
		      			<img src={this.props.data.img_url} />
		    		</div>
			    	<div className="content">
				      	<a className="header">{this.props.data.name}</a>
			      		<div className="meta">
			        		<p>{this.props.data.type}</p>
			        		<p>{this.props.data.location}</p>
			        		<p>{moment(this.props.data.datefound).format("MMMM Do YYYY, h:mm:ss a") }</p>
			      		</div>
				      	<div className="description">
				        	<p>{this.props.data.description}</p>
				      	</div>
				      		<a href={this.props.data.original_website}>Here</a>
				      	<div className="extra">

							<button className="ui primary right floated button" role="button">This is my Pet</button>
							<Modal trigger={<Button className="ui primary right floated" onClick={this.getUsers}>Recommend</Button>} closeIcon>
							    <Header icon='archive' content='Enter the username/e-mail of the user you want to notify about this post' />
							    <Modal.Content>
		    	                    <Form>
				                        <Form.Field required>
				                    		<Label pointing="below">{this.state.submitMessage}</Label>

				                            <Search 
				                            	id="userEmail"
				                            	fluid
				                            	value={value}
				                            	onResultSelect={this.handleResultSelect}
				                            	onSearchChange={this.handleSearchChange} 
				                            	results={this.state.users_view}/>

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
