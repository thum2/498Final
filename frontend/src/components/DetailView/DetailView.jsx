import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Comment, Form, Header, Segment,Item, Card, Icon } from 'semantic-ui-react'
import styles from './styles.scss' 
import axios from 'axios'
import moment from 'moment'

class DetailView extends Component{

	constructor(props) {
    	super(props);
    	this.state = {
      		pet_id: this.props.match.params.id,
      		pet_data: {}
    	};

    	this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
    	axios.get('/api/pets/'+ this.props.match.params.id).then( (res) => {
            this.setState({
            	pet_id: this.props.match.params.id,
            	pet_data: res.data.data
            })
        })
    }

	render(){
		return(
			<div className="DetailView">
				<span className="GroupTitle">
	            <h1><Icon name="paw" />Pet Finder</h1>
	            </span>
				<div className="PetInformation">
					<PetInformation id={this.state.pet_id} data={this.state.pet_data}/>
				</div>

				<div className="CommentList">
					<CommentList id={this.state.pet_id} data={this.state.pet_data}/>
				</div>
			</div>
		)
	}

}



class PetInformation extends Component{

	render(){
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
				        	<button className="ui primary right floated button" role="button">Recommend</button>
							<button className="ui primary right floated button" role="button">This is my Pet</button>
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