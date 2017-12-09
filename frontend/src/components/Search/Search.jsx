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
            pets:[],
            search:[]
        }

        this.baseUrl = "/api/pets";
        this.sortChangeHandler = this.sortChangeHandler.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.viewPets = this.viewPets.bind(this);
        this.removeTagHandler = this.removeTagHandler.bind(this);
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

    viewPets(type, val){
      console.log(type);
      console.log(val);
      let pet = this.state.petValue;
      let breed = this.state.breedValue;
      let color = this.state.colorValue;
      let gender = this.state.genderValue;
      let list = [pet, gender, breed, color];

      if(type != "sortby"){
        let all_pets = this.state.pets.data;
        let new_pets = checkMatch(all_pets, list);
        console.log(new_pets);
        this.setState({
            search: {data:new_pets},
            resultCount:new_pets.length
        })
      }

    }

    // viewPets(type){
    //     let type = this.state.petValue;
    //     let breed = this.state.breedValue;
    //     let color = this.state.colorValue;
    //     let gender = this.state.genderValue;
    //     let list = [type, gender, breed, color];
    // }

    sortChangeHandler(event, {value}){
        this.setState({
            sortValue: value
        });

    }

    removeTagHandler(event, type){
        if(type == "type"){
            this.setState({
                petValue: ''
            })
            this.viewPets("type", '');
        }
        else if(type == "breed"){
            this.setState({
                breedValue: ''
            })
            this.viewPets("breed", '');
        }
        else if(type == "color"){
            this.setState({
                colorValue: ''
            })
            this.viewPets("color", '');
        }
        else if(type == "gender"){
            this.setState({
                genderValue: ''
            })
            this.viewPets("gender", '');
        }
    }

    searchChangeHandler(event, type, val){
        if(type == "type"){
            this.setState({
                petValue: event.target.value
            })
            this.viewPets("type",event.target.value);
        }
        else if(type == "breed"){
            this.setState({
                breedValue: event.target.value
            })
            this.viewPets("breed",event.target.value);
        }
        else if(type == "color"){
            this.setState({
                colorValue: event.target.value
            })
            this.viewPets("color",event.target.value);
        }
        else if(type == "gender"){
            this.setState({
                genderValue: val
            })
            this.viewPets("gender",val);
        }
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
                                      minLength={3}
                                      debounceTimeout={400}
                                      value={this.state.petValue}
                                      onChange={event => this.searchChangeHandler(event,"type")}/>
                                </Input>

                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  placeholder="Gender"
                                  options={genderOptions}
                                  selection
                                  value={this.state.genderValue}
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
                                      value={this.state.breedValue}
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
                                      value={this.state.colorValue}
                                      onChange={event => this.searchChangeHandler(event,"color")}/>
                                </Input>
                          </List.Item>
                      </List>
                  </div>
                  <div className="Search_ResultsBar">
                      {<SearchTag delete={this.removeTagHandler} searchType={this.state.petValue} searchBreed={this.state.breedValue} searchColor={this.state.colorValue} searchGender={this.state.genderValue}/>}
                  </div>
              </div>
              <div className="Search_Gallery">
                  {<SearchGallery pets={this.state.search} sortValue={this.state.sortValue}/>}
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

function checkMatch(all_pets, listVal){
    let result = [];
    let checkList = ["type", "gender", "breed", "color"];
    for(let i=0;i<all_pets.length;i++){
        let flag = true;
        for(let j=0; j<checkList.length; j++){
            //make sure pet has the type,if the values match add it
            if(listVal[j] && all_pets[i][checkList[j]]){
                console.log("in");
                if(all_pets[i][checkList[j]].toLowerCase() != (listVal[j]).toLowerCase()){
                    flag = false;
                }
            }
        }
        if(flag){
            console.log(flag);
            result.push(all_pets[i]);
        }
    }
    return result;
}

function hideElement(div){
    let elem = document.getElementsByClassName(div);
    for(let i=0; i<elem.length;i++){
        elem[i].style.display = "none";
    }
}

export default Search
