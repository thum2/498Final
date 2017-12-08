import React, { Component } from 'react'
import { Button, Input, Breadcrumb, Icon, Card, List, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { sortOptions, petOptions, genderOptions, dogBreedOptions, colorOptions, eyeColorOptions } from '../../assets/options.js'
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
            eyeColorValue: '',
            petValue: '',
            resultCount: 0,
            searchList:[],
            pets:[]
        }

        this.searchL = [];
        this.baseUrl = "/api/pets";
        this.searchChangehandler = this.searchChangehandler.bind(this);
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

    componentWillMount(){
        let url = this.baseUrl;
        axios.get(url)
            .then((response) =>{
                this.setState({
                    pets:response.data,
                })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    searchChangehandler(event, val, type){
        if(type=="pet"){
            this.setState({
                petValue: val
            });
        }
        else if(type=="gender"){
            this.setState({
                genderValue: val
            })
        }
        else if(type=="breed"){
            this.setState({
                breedValue: val
            })
        }
        else if(type=="color"){
            this.setState({
                colorValue: val
            })
        }
        else if(type=="eyeColor"){
            this.setState({
                eyeColorValue: val
            })
        }
        else{
            this.setState({
                sortValue: val
            })
        }
        this.searchL.push(val);
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
                              placeholder="SORT BY"
                              options={sortOptions}
                              selection
                              onChange={(event, {value}) => this.searchChangehandler(event, value, "sort")}
                          />
                      </span>
                  </div>
                  <div className="Search_SearchBar">
                      <List horizontal relaxed>
                          <List.Item>
                              <Dropdown
                                  placeholder="Pet"
                                  options={petOptions}
                                  selection
                                  onChange={(event, {value}) => this.searchChangehandler(event, value, "pet")}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  placeholder="Gender"
                                  options={genderOptions}
                                  selection
                                  onChange={(event, {value}) => this.searchChangehandler(event, value, "gender")}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  placeholder="Breed"
                                  options={dogBreedOptions}
                                  selection
                                  onChange={(event, {value}) => this.searchChangehandler(event, value, "breed")}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  placeholder="Color"
                                  options={colorOptions}
                                  selection
                                 onChange={(event, {value}) => this.searchChangehandler(event, value, "color")}
                              />
                          </List.Item>
                          <List.Item>
                              <Dropdown
                                  placeholder="Eye Color"
                                  options={eyeColorOptions}
                                  selection
                                  onChange={(event, {value}) => this.searchChangehandler(event, value, "eyeColor")}
                              />
                          </List.Item>
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
