import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Icon } from 'semantic-ui-react'
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
            console.log(res.data.data);
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
					<CommentList id={this.state.pet_id} data={this.state.pet_data.comments}/>
				</div>

			</div>
		)
	}

}

class PetInformation extends Component{

	render(){
		return(
			<div>
		        <Card key={this.props.data._id}>
		        	<span>
		        		<img src={this.props.data.img_url}/> 
	    				<h2 >{this.props.data.name}</h2>
	    				<h2 >{this.props.data.type}</h2>
	    				<h2 >{this.props.data.location}</h2>
	    				<h2 >{this.props.data.datefound}</h2>
	    				<h2 >{this.props.data.description}</h2>
    				</span>
    			</Card>
			</div>
		)
	}
}

class CommentList extends Component{

	render(){
		return(
			<div>
			</div>
		)
	}
}

export default DetailView