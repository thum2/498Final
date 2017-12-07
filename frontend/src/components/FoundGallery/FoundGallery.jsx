import React, { Component } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class FoundGallery extends Component {
	constructor(props){
		super(props);
		this.state={
			found_pets : []
		}
		this.httpGetAsync = this.httpGetAsync.bind(this)
	};

	httpGetAsync(url, f)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	            f(xmlHttp.responseText);
	    }
	    xmlHttp.open("GET", url, true);
	    xmlHttp.send(null);
	}

	componentWillMount() {
		let self = this;
		this.httpGetAsync("/api/pets?found=true",function(res){
			self.setState({found_pets: JSON.parse(res).data});
		})
	}
	
    render() {
    	console.log(this.state)
        return(
        	<div>
	        	<span className="GroupTitle">
	                <h1><Icon name="paw" />Pet Finder</h1>
	            </span>
	            <ul>
	            	{this.state.found_pets.map(function(pet,idx){
	            		return(
	            			<Card key={pet._id}>
	            				<ul >{pet.name}</ul>
	            				<ul >{pet.type}</ul>
	            				<ul >{pet.location}</ul>
	            				<ul >{pet.datefound}</ul>
	            				<ul >{pet.description}</ul>
	            			</Card>
	            		)
	            	})}
	            </ul>
	        </div>
        )
    }
}

export default FoundGallery