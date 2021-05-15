import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
// import './helpers/Firebase';
import AppLocale from './lang';
import ruLang from './lang/entries/ru-RU';
import enLang from './lang/entries/en-US';

// import ColorSwitcher from './components/common/ColorSwitcher';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { getDirection } from './helpers/Utils';

const ViewMain = React.lazy(() => import(/* webpackChunkName: "views" */ './views'));
const ViewApp = React.lazy(() => import(/* webpackChunkName: "views-app" */ './views/app'));
const ViewUser = React.lazy(() => import(/* webpackChunkName: "views-user" */ './views/user'));
const ViewError = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/error'));
const BotsSber = React.lazy(() => import(/* webpackChunkName: "bots-sber" */ './views/app/bots/sber'));

const AuthRoute = ({ component: Component, authUser, ...rest }) => (
    <Route
    {...rest}
    render={props => (authUser ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: '/user/login',
                    state: { from: props.location },
                }}
          />
        ))}
  />
);

class App extends Component {
    constructor(props) {
        super(props);
        const direction = getDirection();
        if (direction.isRtl) {
            document.body.classList.add('rtl');
            document.body.classList.remove('ltr');
        } else {
            document.body.classList.add('ltr');
            document.body.classList.remove('rtl');
        }
    }

    render() {
        const { locale, loginUser } = this.props;
        const currentAppLocale = AppLocale[locale];

        const lang = navigator.browserLanguage || navigator.language || navigator.userLanguage;
        if (/^ru/.test(lang)) {
            currentAppLocale.locale = 'ru-RU';
            currentAppLocale.messages = ruLang.messages;
        } else {
            currentAppLocale.locale = 'en-US';
            currentAppLocale.messages = enLang.messages;
        }

        return (
            <div className="h-100">
            <IntlProvider
                  locale={currentAppLocale.locale}
                  messages={currentAppLocale.messages}
                >
                    <>
                <NotificationContainer />
                { /* isMultiColorActive && <ColorSwitcher /> */ }
                <Suspense fallback={<div className="loading" />}>
                          <Router>
                              <Switch>
                                  <Route
                                      path="/app"
                                      //authUser={loginUser}
                                      //component={ViewApp}
                                      render={props => <ViewApp {...props} />}
                                    />
                                  <Route
                                      path="/user"
                                      render={props => <ViewUser {...props} />}
                                    />
                                  <Route
                                      path="/app/bots/sber"
                                      render={props => <BotsSber {...props} />}
                                    />
                                  <Route
                                      path="/error"
                                      exact
                                      render={props => <ViewError {...props} />}
                                    />
                                  <Route
                                      path="/"
                                      exact
                                      render={props => <ViewMain {...props} />}
                                    />
                                  <Redirect to="/error" />
                                </Switch>
                            </Router>
                        </Suspense>
              </>
                </IntlProvider>
          </div>
        );
    }
}

const mapStateToProps = ({ authUser, settings }) => {
    const { user: loginUser } = authUser;
    const { locale } = settings;
    return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps,
)(App);
