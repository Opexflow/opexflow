import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import FB, {FacebookApiException} from 'fb';


export default class Facebook extends Component {

    state = {
        auth: false,
        name: '',
        email: '',
        picture: '',
        token: ''
    };

        responseFacebook = response => {
            if(response && response.status !== 'unknown' && response.picture)
                {
                this.props.onUserLogin({
                    ...response,
                    email: 'demo@gogo.com',
                    password: 'gogo123',
                });

                // Токен пользователя
                let token = (response.accessToken)
                console.log(token)

                // Get запрос данных пользователя с токеном
                FB.api('/me', 'get', { access_token: token, fields: 'id,name,gender,email' }, function(response) {
                    console.log(response);
                    let user = response;
                  });
                
                this.setState({
                    auth: true,
                    name: response.name,
                    email: response.email,
                    picture: response.picture.data.url,
                    token: response.accessToken
                });
            }
        }

    
        render(){
            let facebookData;
  
            if (!this.setState.auth) {
                facebookData = (<FacebookLogin
                    appId="2908344615961117"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} 
                    />);
            }

            
            return (
                <>
                    {facebookData}
                </>
            );
        }
    }