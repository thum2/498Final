import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Comment, Form, Header, Segment,Item, Card, Icon } from 'semantic-ui-react'
import styles from './styles.scss' 
import axios from 'axios'

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
          //  console.log(res.data.data);
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
			        		<p>{this.props.data.datefound}</p>
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
      		comments: ["dog"],
    	};

    	this.MakeCommentList = this.MakeCommentList.bind(this);
    	this.CommentOrNah = this.CommentOrNah.bind(this);
    }

	MakeCommentList(props){
		return this.state.comments.map(function(comment,idx){
			return(
				<Comment key={idx}>
					<Comment.Content>
						<Comment.Author as='a'>Current USER</Comment.Author>
						<Comment.Metadata>
								<span>Today</span>
						</Comment.Metadata>
						<Comment.Text>{comment}</Comment.Text>
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
		console.log("This is in the render()" + this.state.comments)
		return(
			<Comment.Group threaded>
				<this.CommentOrNah data={this.state.comments}/>
				<Form reply>
  					<Form.TextArea />
  						<Button content='Post Comment' labelPosition='left' icon='edit' primary />
				</Form>
			</Comment.Group>
		)
		
	}
	
}

export default DetailView