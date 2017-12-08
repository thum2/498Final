import React, { Component } from 'react'
import { Button, Label, Card, Item, Image, List, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './SearchGallery.scss'

class SearchGallery extends Component {
    constructor(){
        super();

    }

    render(){
        let noPets = (Object.keys(this.props.pets).length == 0);
        if(noPets){
            return(
                <div className="SearchGalleryContainer">
                </div>
            );
        }
        else{

                let pets = this.props.pets.data.map((pet,idx) =>{
                        return {index: idx, name: pet.name, breed: pet.breed, gender: pet.gender, color: pet.color};
                });

                let SearchGallery = pets.map((pet,idx) =>{
                    let name = pet.name;
                    let breed = pet.breed;
                    let gender = pet.gender;
                    let color = pet.color;
                    return(
                        <Card key={idx} className="SearchGallery">
                            <Card.Content>
                                <Card.Header>
                                    {name}
                                </Card.Header>
                                <img />
                                <h1>{breed}</h1>
                                <h2>{gender}</h2>
                                <h3>{color}</h3>
                            </Card.Content>
                        </Card>
                    );
                });
                return(
                    <Grid columns={3} divided className="ListViewContainer">
                        {SearchGallery}
                    </Grid>
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

// SearchGallery.propTypes = {
//     pokemon: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.object
//     ])
// }

export default SearchGallery
