import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {

    state = {
        auth: false,
        name: '',
        picture: ''
    };

    responseFacebook = response => {
        if(response && response.status !== 'unknown' && response.picture) {
            this.props.onUserLogin({
                ...response,
                email: 'demo@gogo.com',
                password: 'gogo123',
            });

            this.setState({
                auth: true,
                name: response.name,
                picture: response.picture.data.url
            });
        }
    }

    componentClicked = () => {
        console.log('Facebook btn clicked');
    }

    render(){
        let facebookData;

        if (!this.setState.auth) {
            facebookData = (<FacebookLogin
                appId="2969806906408505"
                autoLoad={true}
                fields="name,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
        }

        return (
            <>
                {facebookData}
            </>
        );
    }
}
