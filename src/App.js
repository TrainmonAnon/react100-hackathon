import React, { Component } from 'react';
import './App.css';
import User from './users.json';
var users = User['Users'];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:users,
            isLoggedIn: false,
            discordID: '',
        }
    }
    refreshUsers(){
        return;
    }

    update(e){
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    render(){
        return (
            <div className='container'>
                <div className='page-header'>
                    <h1>Discord EVEBot</h1>
                    <h3>Get your EVE data from Discord</h3>
                </div>

                <div className='row'>
                    <iframe 
                        title='DiscordWidget'
                        src='https://discordapp.com/widget?id=568194649957728256&theme=dark' 
                        width='350' height='400' 
                        allowtransparency='true' frameBorder='0'
                    ></iframe>
                </div>
                {!this.state.isLoggedIn ? (
                    <div>
                        <input 
                            type='text'
                            id='discordID'
                            defaultValue='Username#xxxx'
                            onChange={(e) => {this.update(e)}}
                        />
                        <p>Enter your Discord Name (with #)</p>
                        <input 
                            type='image' 
                            src='./images/eve-sso-login-black-small.png'
                            alt='EVE Login Button'
                            onClick={() => {
                                window.open( `https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=http://localhost:8080/callback/&client_id=969f6265f25d48aba93b5d52df2791c4&scope=esi-location.read_location.v1`);
                                this.refreshUsers();
                                this.setState({
                                    isLoggedIn: true,
                                })
                            }}
                        />
                    </div>
                ): (
                    <p>Logged in as {this.state.discordID}</p>
                )}
            </div>
        );
    }
}

export default App;