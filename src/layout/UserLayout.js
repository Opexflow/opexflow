import React, { Component } from 'react';

class UserLayout extends Component {
    componentDidMount() {
        document.body.classList.add('background');
        document.body.classList.add('no-footer');
    }

    componentWillUnmount() {
        document.body.classList.remove('background');
        document.body.classList.remove('no-footer');
    }

    render() {
        return (
            <>
            <div className="fixed-background" />
            <main>
                  <div className="container">{this.props.children}</div>
                </main>
          </>
        );
    }
}

export default UserLayout;
