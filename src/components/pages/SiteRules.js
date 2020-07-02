import React, { Component }  from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class SiteRules extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
           
              <div className="container mt-4">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-8 order-md-1 text-center text-md-left">
                        <h2 className="mb-3 bd-text-purple-bright">Правила сайта</h2>
                        <p className="blockquote">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                        <NavLink to={this.props.authLocation} className="btn btn-success btn-lg btn-bd-primary mb-3 mb-md-0 mr-md-3">
                            Назад
                        </NavLink>
                    </div>
                </div>
     
            </div>
   
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    const { authLocation } = authUser;
    return { authLocation };
  };

export default connect(
    mapStateToProps,
  )(SiteRules);

