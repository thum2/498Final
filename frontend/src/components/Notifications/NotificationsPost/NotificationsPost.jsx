import React, { Component } from 'react'
import { Button, Label, Card, Item, Image, List , Icon, Feed, Comment} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './NotificationsPost.scss'

class NotificationsPost extends Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        // this.detailView = this.props.feed.detailLink;
        this.detailView = "/dashboard";
    }

    handleDelete(event, idx){
        let type = (idx==0 ? "type" : (idx==1 ? "gender":(idx == 2 ? "breed": (idx == 3 ? "color" : "lostFound"))));
        this.props.delete(event, type);
    }

    render(){
        if(Object.keys(this.props.feed).length == 0){
            return(
                <List className="NotificationsPostContainer">
                    <Feed>
                        <Feed.Event>
                          <Feed.Content>
                            <Feed.Summary>
                              <Feed.User>Elliot Fu</Feed.User> added you as a friend
                              <Feed.Date>1 Hour Ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Meta>
                              <Feed.Like>
                                <Icon name='like' />
                                4 Likes
                              </Feed.Like>
                              <Link to={this.detailView}>
                                  Go To Post
                              </Link>
                            </Feed.Meta>
                          </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </List>
            );
        }
        else{

            return(
                <List className="NotificationsPostContainer">
                    <Feed>
                        <Feed.Event>
                          <Feed.Content>
                            <Feed.Summary>
                              <Feed.User>Elliot Fu</Feed.User> added you as a friend
                              <Feed.Date>1 Hour Ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Meta>
                              <Feed.Like>
                                <Icon name='like' />
                                4 Likes
                              </Feed.Like>
                              <Link to={this.detailView}>
                                  Go To Post
                              </Link>
                            </Feed.Meta>
                          </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </List>
            );
        }
    }
}


NotificationsPost.propTypes = {
    feed: PropTypes.array
}

export default NotificationsPost
