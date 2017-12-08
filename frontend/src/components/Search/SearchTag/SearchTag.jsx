import React, { Component } from 'react'
import { Button, Label, Card, Item, Image, List , Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './SearchTag.scss'

class SearchTag extends Component {
    constructor(){
        super();
    }

    render(){
        let noList = (Object.keys(this.props.searchList).length == 0);
        if(noList){
            return(
                <div className="SearchTagContainer">
                </div>
            );
        }
        else{
            let tags = this.props.searchList.map((searchList,idx) =>{
                    return {index: idx, tagName:searchList};
            });

            let SearchTag = tags.map((tag,idx) =>{
                let name = tag.tagName.charAt(0).toUpperCase() + tag.tagName.slice(1);
                return (
                    <Label key={idx}>
                      {name}
                      <Icon name='delete' />
                    </Label>
                )
            });
            return(
                <List className="SearchTagContainer">
                    {SearchTag}
                </List>
            );
        }
    }
}

function sort(array,order){
    if(order == "alphabetical"){
        return (array.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
      }));
    }
    else{
        return (array.sort(function(a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
      }));
    }

}

// SearchTag.propTypes = {
//     searchList: PropTypes.oneOfType([
//         PropTypes.object
//     ])
// }

export default SearchTag
