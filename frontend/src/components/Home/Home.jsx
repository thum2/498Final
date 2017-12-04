import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <Card>
                    <h1>Welcome to MP2</h1>

                    <span>
                        <Link to="/login">
                            <Button>
                                Login
                            </Button>
                        </Link>

                        <Link to="/register">
                            <Button>
                                Register
                            </Button>
                        </Link>
                        <Link to="/lostpage">
                            <Button>
                                Report Lost Pet
                            </Button>
                        </Link>
                        <Link to="/foundpage">
                            <Button>
                                Report Found Pet
                            </Button>
                        </Link>
                        <Link to="/search">
                            <Button>
                                Look at Found Pet
                            </Button>
                        </Link>
                    </span>
                    <br />
                </Card>
            </div>
        )
    }
}

export default Home
