import React, { Component } from 'react'
import { Button, Label, Card, Item, Image, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './SearchTag.scss'

class SearchTag extends Component {
    constructor(){
        super();
        this.baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    }

    render(){
        let noPokemon = (Object.keys(this.props.pokemon).length == 0);
        let query = this.props.query;
        if(noPokemon){
            if(this.props.clicked=="true"){
                return (
                    <div className="SearchTagContainer">
                        <Card className = "SearchTag">
                            <h3>Searching for Pokemon...</h3>
                        </Card>
                    </div>
                )
            }
            else{
                return(
                    <div className="SearchTagContainer">
                    </div>
                )
            }
        }
        else{
            if(query=="pokemon"){
                let abilitiesView = this.props.pokemon.abilities.map((ability,idx) =>{
                    return (
                        <Label key={idx}>
                            {ability.ability.name}
                        </Label>
                    )
                });

                let name = this.props.pokemon.name.charAt(0).toUpperCase() + this.props.pokemon.name.slice(1);
                return(
                    <div className="SearchTagContainer">
                        <Card className="SearchTag">
                            <Card.Content>
                                <Card.Header>
                                    {name}
                                </Card.Header>
                                <Card.Meta>
                                    Pokedex #{this.props.pokemon.id}
                                </Card.Meta>
                                <img src={this.props.pokemon.sprites.front_default} />
                                <h1>Abilities</h1>
                                {abilitiesView}
                            </Card.Content>
                        </Card>
                    </div>
                );
            }
            else{

                let pokemons = this.props.pokemon.pokemon.map((pokemon,idx) =>{
                        return {index: idx, id:pokemon.pokemon.url.split("/")[6], name: pokemon.pokemon.name};
                });

                pokemons = sort(pokemons,this.props.order);
                let SearchTag = pokemons.map((pokemon,idx) =>{
                    let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    return (
                        <List.Item key={idx}>
                            <Link to={"detail/" + pokemon.id}>
                                <Image avatar alt={"X"} src={this.baseUrl+pokemon.id+".png"} />
                                <List.Header className="Listheader">
                                    {name}
                                </List.Header>
                            </Link>
                        </List.Item>
                    )
                });
                return(
                    <List animated className="ListViewContainer">
                        {SearchTag}
                    </List>
                );
            }

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

SearchTag.propTypes = {
    pokemon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

export default SearchTag
