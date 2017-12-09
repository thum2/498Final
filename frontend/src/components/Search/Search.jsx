import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon, Card, List, Dropdown } from 'semantic-ui-react'
import DebounceInput from 'react-debounce-input';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {sortOptions, genderOptions} from '../../assets/options.js'
import SearchTag from './SearchTag/SearchTag.jsx'
import SearchGallery from './SearchGallery/SearchGallery.jsx'

import styles from './Search.scss'

class Search extends Component {
    constructor(){
        super();
        this.state = {
            sortValue: '',
            petValue: '',
            colorValue: '',
            breedValue: '',
            genderValue: '',
            resultCount: 0,
            searchList:[],
            pets:[],
            search:[]
        }

        this.searchL = [];
        this.baseUrl = "/api/pets";
        this.sortChangeHandler = this.sortChangeHandler.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.submitSearchHandler = this.submitSearchHandler.bind(this);
        this.viewPets = this.viewPets.bind(this);
    }
    componentWillMount(){
        let url = this.baseUrl;
        axios.get(url)
            .then((response) =>{
                this.setState({
                    pets: response.data,
                    search: response.data,
                    resultCount: response.data.data.length
                })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    viewPets(type,val){
      console.log(type);
      console.log(val);
      if(type != "sortby"){
        let new_pets = [];
        let all_pets = this.state.search.data;
        checkMatch(all_pets,type,val);
        this.setState({
            pets: {data:new_pets},
            search: {data:new_pets},
            resultCount:new_pets.length
        })
      }

    }

    sortChangeHandler(event, {value}){
        this.setState({
            sortValue: value
        });

    }

    searchChangeHandler(event, type, val){
        if(type == "type"){
            this.setState({
                petValue: event.target.value
            })
        }
        else if(type == "breed"){
            this.setState({
                breedValue: event.target.value
            })
        }
        else if(type == "color"){
            this.setState({
                colorValue: event.target.value
            })
        }
        else if(type == "gender"){
            this.setState({
                genderValue: val
            })
        }
    }

    submitSearchHandler(){
        let type = document.getElementById("petType").value;
        let breed = document.getElementById("petBreed").value
        let color = document.getElementById("petColor").value;
        this.searchL.push(type);
        this.searchL.push(this.state.genderValue);
        this.searchL.push(breed);
        this.searchL.push(color);
        this.setState({
            searchList: this.searchL
        });
        this.viewPets("type",type);
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
                          <Link to={'/notifications'}>
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
                              placeholder="SORT BY"
                              options={sortOptions}
                              selection
                              onChange={this.sortChangeHandler}
                          />
                      </span>
                  </div>
                  <div className="Search_SearchBar">
                      <List horizontal relaxed>
                          <List.Item>
                              <Input
                                    type="text">
                                    <DebounceInput
                                        placeholder='Pet Type'
                                      minLength={2}
                                      debounceTimeout={300}
                                      onChange={event => this.searchChangeHandler(event,"type")}/>
                                </Input>

                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  placeholder="Gender"
                                  options={genderOptions}
                                  selection
                                  onChange={(event, {value}) => this.searchChangeHandler(event,"gender", value)}
                              />
                          </List.Item>
                          <List.Item>
                              <Input
                                    type="text">
                                    <DebounceInput
                                        placeholder='Breed'
                                      minLength={2}
                                      debounceTimeout={300}
                                      onChange={event => this.searchChangeHandler(event,"breed")}/>
                                </Input>
                          </List.Item>
                          <List.Item>
                              <Input
                                    type="text">
                                    <DebounceInput
                                        placeholder='Color'
                                      minLength={3}
                                      debounceTimeout={300}
                                      onChange={event => this.searchChangeHandler(event,"color")}/>
                                </Input>
                          </List.Item>
                      </List>
                  </div>
                  <div className="Search_ResultsBar">
                      {<SearchTag delete={this.searchChangeHandler} searchType={this.state.petValue} searchBreed={this.state.breedValue} searchColor={this.state.colorValue} searchGender={this.state.genderValue}/>}
                  </div>
              </div>
              <div className="Search_Gallery">
                  {<SearchGallery pets={this.state.pets} sortValue={this.state.sortValue}/>}
              </div>
          </div>
        )
    }
}

function showElement(div){
    let elem = document.getElementsByClassName(div);
    for(let i=0; i<elem.length;i++){
        elem[i].style.display = "block";
    }
}

function checkMatch(all_pets,type,val){
    for(let i=0;i<all_pets.length;i++){
        //make sure pet has the type,if the values match add it
        if(all_pets[i][type] && (all_pets[i][type]).toLowerCase() == (val).toLowerCase()){
          new_pets.push(all_pets[i]);
        }
    }
}

function hideElement(div){
    let elem = document.getElementsByClassName(div);
    for(let i=0; i<elem.length;i++){
        elem[i].style.display = "none";
    }
}

export default Search
