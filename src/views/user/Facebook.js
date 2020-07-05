import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import FB, {FacebookApiException} from 'fb';


export default class Facebook extends Component {

    state = {
        auth: false,
        name: '',
        email: '',
        picture: ''
    };

        responseFacebook = response => {
            if(response && response.status !== 'unknown' && response.picture) {
                this.props.onUserLogin({
                    ...response,
                    email: 'demo@gogo.com',
                    password: 'gogo123',
                });

                let facebookName = response.name;
                let facebookEmail = response.email;
                let facebookPicture = response.picture;
                console.log(facebookName, facebookEmail,facebookPicture);

    
                this.setState({
                    auth: true,
                    name: response.name,
                    email: response.email,
                    picture: response.picture.data.url
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
                    callback={this.responseFacebook} />);
            }

            FB.api('oauth/access_token',  { 
                client_id: '2908344615961117', 
                client_secret: '13f9f790ee0de527a44ac561c4786b7c', 
                grant_type:'client_credentials'
            },  function (res)  { 
                if( !res ||  res.error)  { 
                    console.log( !res? 'error occurred': res.error); 
                    return;
                } 
            
                var accessToken =  res.access_token;
                var expires = res.expires ? res.expires : 0;
                console.log(accessToken)

                FB.api('',  function (res)  { 
                    if( !res ||  res.error)  { 
                     console.log( !res? 'error occurred': res.error); 
                     return;
                    } 
                    console.log( res.id); 
                    console.log( res.name);
                  } );

            } );
            
            
            return (
                <>
                    {facebookData}
                </>
            );
        }
    }
