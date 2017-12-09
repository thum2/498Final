import React, { Component } from 'react'
import { Button, Label, Card, Item, Image, List, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './SearchGallery.scss'

class SearchGallery extends Component {
    constructor(){
        super();
        this.state = {
            active:"notfound"
        }
        this.handleActive = this.handleActive.bind(this);
    }

    handleActive(event, {name}){
        this.setState({
            active: name
        })
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
                        return {index: idx, name: pet.name, type:pet.type,
                             breed: pet.breed, gender: pet.gender, color: pet.color,
                             image:pet.img_url, datefound:pet.datefound, description: pet.description,
                             foundOrLost: pet.found, location: pet.location, website: pet.original_website};
                });

                let SearchGallery = pets.map((pet,idx) =>{
                    // let name = pet.name? pet.name:"No name";
                    // let description = pet.description;
                    // let breed_alt = description!=null ? (description.split("\n")[2] ? description.split("\n")[2] : "Not specified") : "Not specified";
                    // let breed = pet.breed!=null? pet.breed: breed_alt;
                    // let gender_alt = description!=null ? (description.split("\n")[0] ? description.split("\n")[0] : "Not specified") : "Not specified";
                    // let gender = pet.gender!=null? pet.gender: gender_alt;
                    // let color_alt = description!=null ? (description.split("\n")[1] ? description.split("\n")[1] : "Not specified") : "Not specified";
                    // let color = pet.color!=null? pet.color: color_alt;
                    // let image = pet.image;
                    // let type = pet.type;
                    // let datefound = pet.datefound.slice(0,10);

                    let name = pet.name? pet.name:"No name";
                    let description = pet.description;
                    let breed_alt = description ? (description.split("\n")[2] ? description.split("\n")[2] : "Not specified") : "Not specified";
                    let breed = pet.breed ? pet.breed: breed_alt;
                    let gender_alt = description ? (description.split("\n")[0] ? description.split("\n")[0] : "Not specified") : "Not specified";
                    let gender = pet.gender ? pet.gender: gender_alt;
                    let color_alt = description ? (description.split("\n")[1] ? description.split("\n")[1] : "Not specified") : "Not specified";
                    let color = pet.color? pet.color: color_alt;
                    let image = pet.image;
                    let type = pet.type;
                    let datefound = pet.datefound.slice(0,10);


                   // let name = pet.name? pet.name:"No name";
                   // let breed_alt = "Not specified";
                   // let breed = pet.breed? pet.breed: breed_alt;
                   // let gender_alt = "Not specified";
                   // let gender = pet.gender? pet.gender: gender_alt;
                   // let color_alt = "Not specified";
                   // let color = pet.color? pet.color: color_alt;
                   // let image = pet.image;
                   // let type = pet.type;
                   // let datefound = pet.datefound;

                    return(
                            <Card key={idx}>
                              <Card.Content>
                                <Card.Header>
                                    <Image floated='right' size='small' src={image} />
                                    {name}
                                </Card.Header>
                                <Card.Meta>
                                  {type}
                                </Card.Meta>
                                <Card.Description>
                                  <h5>Breed:</h5>{breed}
                                  <h5>Gender:</h5>{gender}
                                  <h5>Color:</h5>{color}
                                  <h5>Date Found:</h5>{datefound}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                <div className='ui two buttons'>
                                  <Button
                                      active={this.state.active === 'reconnected'}
                                      name='reconnected'
                                      onClick={this.handleActive}
                                      color={this.state.active === 'reconnected'? 'green' : null}
                                      content="Reconnected"/>
                                  <Button
                                      active={this.state.active === 'notfound'}
                                      name='notfound'
                                      onClick={this.handleActive}
                                      color={this.state.active === 'notfound'? 'red' : null}
                                      content="Not Found"/>
                                </div>
                              </Card.Content>
                            </Card>
                    );
                });
                return(
                    <Card.Group itemsPerRow={10}>
                        {SearchGallery}
                    </Card.Group>
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
