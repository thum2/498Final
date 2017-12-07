import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
    	console.log('/api/pets/'+ this.state.pet_id)
    	axios.get('/api/pets/'+ this.state.pet_id).then( (res) => {
            console.log(res);
            
        })
    }

	render(){
		return(
			<div className="DetailView">

				<div className="PetInformation">
					<PetInformation id={this.state.pet_id}/>
				</div>

				<div className="CommentList">
					<CommentList id={this.state.pet_id}/>
				</div>

			</div>
		)
	}

}

class PetInformation extends Component{

	render(){
		return(
			<div>
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