import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon, Card, List, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { sortOptions, petOptions, genderOptions, dogBreedOptions, colorOptions, eyeColorOptions } from '../../assets/options.js'

import styles from './Search.scss'

class Search extends Component {
    constructor(){
        super();
        this.state = {
            sortValue: '',
            genderValue: '',
            breedValue: '',
            colorValue: '',
            eyeColorValue: '',
            petValue: ''
        }

        this.baseUrl = "http://pokeapi.co/api/v2/";
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.sortChangeHandler = this.sortChangeHandler.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        let url = this.baseUrl + this.state.query + '/' + this.state.value;
        this.setState({
            clicked:"true"
        })
        axios.get(url)
            .then((response) => {
                this.setState({
                    pokemon: response.data
                })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    inputChangeHandler(event){
        let val = event.target.value.toLowerCase();
        this.setState({
            value: val
        });
    }

    typeChangeHandler(event, {value}){
        if({value}.value == "Name"){
            this.setState({
                query: 'pokemon',
                value:'',
                clicked:'',
                pokemon:'',
                placeholder:{value}.value + ' of Pokemon'
            })
            hideElement("Ordering");
        }
        else{
            this.setState({
                query: 'type',
                value:"",
                clicked:'',
                pokemon:'',
                placeholder:{value}.value + ' of Pokemon, i.e. ground, water',
            })
            showElement("Ordering");
        }
    }

    searchChangeHandler(event,{value}){
        console.log(event);
    }

    sortChangeHandler(event,{value}){
        this.setState({
            sortValue: {value}.value
        })
    }

    render(){
        return(
          <div className="Search">
              <div className="Search_Header">
                  <span className="GroupTitle">
                      <h1><Icon name="paw" />Pet Finder</h1>
                  </span>
                  <div className="Search_Navi">
                      <Breadcrumb.Section>
                          <Link to={'/notification'}>
                              Notifications
                          </Link>
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider />
                      <Breadcrumb.Section>
                          <Link to={'/'}>
                              Logout
                          </Link>
                      </Breadcrumb.Section>
                  </div>
              </div>
              <div className="Search_SearchTools">
                  <div className="Search_SortBar">
                      <span>
                          {this.state.resultCount}
                      </span>
                      <span>
                          <Dropdown
                              onChange={this.sortChangeHandler}
                              placeholder="SORT BY"
                              options={sortOptions}
                              selection
                              value={this.state.sortValue}
                          />
                      </span>
                  </div>
                  <div className="Search_SearchBar">
                      <List horizontal relaxed>
                          <List.Item>
                              <Dropdown
                                  onChange={this.searchChangeHandler}
                                  placeholder="Pet"
                                  options={petOptions}
                                  selection
                                  value={this.state.petValue}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  onChange={this.searchChangeHandler}
                                  placeholder="Gender"
                                  options={genderOptions}
                                  selection
                                  value={this.state.genderValue}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  onChange={this.searchChangeHandler}
                                  placeholder="Breed"
                                  options={dogBreedOptions}
                                  selection
                                  value={this.state.breedValue}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  onChange={this.searchChangeHandler}
                                  placeholder="Color"
                                  options={colorOptions}
                                  selection
                                  value={this.state.colorValue}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  onChange={this.searchChangeHandler}
                                  placeholder="Eye Color"
                                  options={eyeColorOptions}
                                  selection
                                  value={this.state.eyeColorValue}
                              />
                          </List.Item>
                      </List>
                  </div>
                  <div className="Search_ResultsBar">
                  </div>
              </div>
              <div className="Search_Gallery">
              </div>
          </div>
        );
    }
}

function showElement(div){
    let elem = document.getElementsByClassName(div);
    for(let i=0; i<elem.length;i++){
        elem[i].style.display = "block";
    }
}

function hideElement(div){
    let elem = document.getElementsByClassName(div);
    for(let i=0; i<elem.length;i++){
        elem[i].style.display = "none";
    }
}

export default Search
