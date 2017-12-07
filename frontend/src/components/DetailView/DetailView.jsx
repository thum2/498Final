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
    }

    componentWillMount(){
    	axios.get('/api/pets/'+ {this.props.match.params.id}).then( (res) => {
            console.log(res);
            
        }
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
		return()
	}
}

class CommentList extends Component{

	render(){
		return()
	}
}

export default DetailView