import React, { Component } from 'react'
import { Button, Label, Card, Item, Image, List, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './SearchGallery.scss'

class SearchGallery extends Component {
    constructor(props){
        super(props);
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
                             foundOrLost: pet.found, location: pet.location, website: pet.original_website, id:pet._id};
                });

                let SearchGallery = pets.map((pet,idx) =>{
                    let name = pet.name? pet.name.charAt(0).toUpperCase() + pet.name.slice(1):"No name";
                    let breed_alt = pet.description? (pet.description.split("\n")[2] ? pet.description.split("\n")[2] : "Not specified") : "Not specified";
                    let breed = pet.breed? pet.breed.charAt(0).toUpperCase() + pet.breed.slice(1): breed_alt;
                    let gender_alt = pet.description? (pet.description.split("\n")[0] ? pet.description.split("\n")[0] : "Not specified") : "Not specified";
                    let gender = pet.gender? pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1): gender_alt;
                    let color_alt = pet.description? (pet.description.split("\n")[1] ? pet.description.split("\n")[1] : "Not specified") : "Not specified";
                    let color = pet.color? pet.color.charAt(0).toUpperCase() + pet.color.slice(1): color_alt;
                    let image = pet.image;
                    let type = pet.type.charAt(0).toUpperCase() + pet.type.slice(1);
                    let datefound = pet.datefound.slice(0,10);
                    //let datefound = pet.datefound;
                    let date_display = pet.foundOrLost ? "Date Found:" : "Date Lost:";

                    return(

                            <Card key={idx} as={Link} to={"/detailview/" + pet.id.toString()}>
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
                                  <h5>{date_display}</h5>{datefound}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                <div>
                                  <Button
                                      disabled
                                      fluid
                                      basic
                                      active={pet.foundOrLost}
                                      name='Found'
                                      color={pet.foundOrLost ? 'green' : null}
                                      content="Found"/>
                                  <Button
                                      disabled
                                      fluid
                                      basic
                                      active={!pet.foundOrLost}
                                      name='notfound'
                                      color={!pet.foundOrLost ? 'red' : null}
                                      content="Lost"/>
                                </div>
                              </Card.Content>
                            </Card>
                    );
                });
                return(
                    <Card.Group itemsPerRow={this.props.col}>
                        {SearchGallery}
                    </Card.Group>
                );
            }
    }
}


SearchGallery.propTypes = {
    pets: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    col: PropTypes.number
}

export default SearchGallery
