import React, { Component } from 'react'
import { Button, Label, Card, Item, Image, List , Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './SearchTag.scss'

class SearchTag extends Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event, idx){
        let type = (idx==0 ? "type" : (idx==1 ? "gender":(idx == 2 ? "breed": "color")));
        this.props.delete(event, type);
    }

    render(){
        let type = this.props.searchType;
        let breed = this.props.searchBreed;
        let color = this.props.searchColor;
        let gender = this.props.searchGender;
        if(type == '' && breed == '' && color == '' && gender == ''){
            return(
                <div className="SearchTagContainer">
                </div>
            );
        }
        else{
            let list = [type,gender,breed,color];
            let tags = list.map((val,idx) =>{
                    return {index: idx, tagName:val};
            });

            let SearchTag = tags.map((tag,idx) =>{
                let val = '';
                if(tag.tagName != ''){
                    let lName = tag.tagName.toLowerCase();
                    let name = lName.charAt(0).toUpperCase() + lName.slice(1);
                    let index = idx;
                    return (
                        <Label key={idx}>
                          {name}
                          <Icon name='delete' value={val} onClick={event => this.handleDelete(event, index)}/>
                        </Label>
                    )
                }
            });
            return(
                <List className="SearchTagContainer">
                    Searching for: {SearchTag}
                </List>
            );
        }
    }
}


SearchTag.propTypes = {
    searchType: PropTypes.string,
    searchBreed: PropTypes.string,
    searchColor: PropTypes.string,
    searchGender: PropTypes.string
}

export default SearchTag
