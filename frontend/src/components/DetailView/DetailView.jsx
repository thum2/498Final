import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Button, Item, Card, Icon } from 'semantic-ui-react'
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

	constructor(props){
		super(props);
		this.state={
			comments : this.props.data.comments
		}

	}


	// componentDidMount(){
	// 	let commentlist = [];
	// 	commentlist = this.props.data.description;

	// 	this.setState({
	// 		comments : commentlist
	// 	})
	// }

	render(){
		console.log("This is in the render()" + this.props.data.comments)
		return(
			<div>
				<ul>
	            </ul>
			</div>
		)
	}
}

export default DetailView
