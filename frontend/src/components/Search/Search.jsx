import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon, Card, List, Dropdown } from 'semantic-ui-react'
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
            genderValue: '',
            breedValue: '',
            colorValue: '',
            petValue: '',
            resultCount: 0,
            searchList:[],
            pets:[],
            search:[]
        }

        this.searchL = [];
        this.baseUrl = "/api/pets";
        this.sortChangehandler.bind(this);
        this.searchChangeHandler.bind(this);
        this.submitSearchHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.viewPets = this.viewPets.bind(this);
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
        for(let i=0;i<all_pets.length;i++){
            //make sure pet has the type,if the values match add it
            if(all_pets[i][type] && (all_pets[i][type]).toLowerCase() == (val).toLowerCase()){

              new_pets.push(all_pets[i]);
            }
        }
        //console.log(new_pets)
        this.setState({pets: {data:new_pets}})
      }
    }
    
    sortChangehandler(event, val, type){
        this.setState({
                sortValue: val
            })
    }

    searchChangeHandler(event, val, type){
        if(type=="pet"){
            this.viewPets("type",val)
            this.setState({
                petValue: val
            });
        }
        else if(type=="gender"){
            this.setState({
                genderValue: val
            });
            this.viewPets(type,val)
        }
        else if(type=="breed"){
            this.setState({
                breedValue: val
            });
            this.viewPets(type,val)
        }
        else{
            this.setState({
                colorValue: val
            });
            this.viewPets(type,val)
        }
    }
    
    submitSearchHandler(){
        this.searchL.push(this.state.petValue);
        this.searchL.push(this.state.genderValue);
        this.searchL.push(this.state.breedValue);
        this.searchL.push(this.state.colorValue);
        this.setState({
            searchList: this.searchL
        });
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
                              onChange={(event, {value}) => this.sortChangehandler(event, value, "sort")}
                          />
                      </span>
                  </div>
                  <div className="Search_SearchBar">
                      <List horizontal relaxed>
                          <List.Item>
                              <Input
                                    fluid
                                    type="text"
                                    placeholder='Pet Type'
                                    value={this.state.petValue}
                                    onChange={(event, {value}) => this.searchChangeHandler(event, value, "pet")}>
                                </Input>
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  placeholder="Gender"
                                  options={genderOptions}
                                  selection
                                  onChange={(event, {value}) => this.searchChangeHandler(event, value, "gender")}
                              />
                          </List.Item>
                          <List.Item>
                              <Input
                                    fluid
                                    type="text"
                                    placeholder='Breed'
                                    value={this.state.breedValue}
                                    onChange={(event, {value}) => this.searchChangeHandler(event, value, "breed")}>
                                </Input>
                          </List.Item>
                          <List.Item>
                              <Input
                                    fluid
                                    type="text"
                                    placeholder='Color'
                                    value={this.state.colorValue}
                                    onChange={(event, {value}) => this.searchChangeHandler(event, value, "color")}>
                                </Input>
                          </List.Item>
                          <Button  onClick={this.submitSearchHandler(event, value, "search")}>
                                Search
                          </Button>
                      </List>
                  </div>
                  <div className="Search_ResultsBar">
                      {<SearchTag searchList={this.state.searchList}/>}
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

function hideElement(div){
    let elem = document.getElementsByClassName(div);
    for(let i=0; i<elem.length;i++){
        elem[i].style.display = "none";
    }
}

export default Search
