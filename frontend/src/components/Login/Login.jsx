import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Input, Card, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Login.scss'


class Login extends Component {

    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;
        const user = {}
        user["email"] = email;
        user["password"] = password;

        axios.post('/api/login', user).then( (res) => {
            console.log(res);
            this.setState({
                message: 'Successfully logged in!'
            });
            //alert("You have logged in");
            this.props.history.push('/dashboard');
        }).catch( (res) => {
            console.log(res);
            this.setState({
                message: 'Unable to log in'
            });
        });

        // create an AJAX request (This should probably done with Axios instead)
        /*
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!'
                })
                alert("You have logged in");
                this.props.history.push('/dashboard');
            } else {
                this.setState({
                    message: 'Unable to log in'
                })
            }
        });
        xhr.send(formData);
        */
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    render() {
        return(
            <form className="Login" action="/" onSubmit={this.onSubmit}>
                <Card className="Login__content">
                    <div>
                        <h1 className="iconHeader">
                            <Icon name='paw' size='big' />
                            PetFinder
                        </h1>
                        <Input icon="users" iconPosition="left" placeholder="Email Address" onChange={this.onChangeEmail} />
                        <br/><br/>
                        <Input icon="lock" iconPosition="left" placeholder="Password" onChange={this.onChangePassword} />
                        <br/><br/>

                        <p>{this.state.message}</p>
                        <Input value="Login" type="submit" fluid />
                        <h4>No account yet? Click <Link to="/register">here</Link> to Register!</h4>
                    </div>
                </Card>
            </form>
    )
}
}

export default Login
