import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FB from 'fb';
import GitHub from 'github-api';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './redux/store';

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App'));

if (window.location.pathname && window.location.pathname !== '/user/login') {
    const x = new XMLHttpRequest();

    // Костыль для локальной разработки, чтобы порты сервера и клиента разнести.
    // TODO: сделать в едином месте
    let host = `https://${window.location.host}/api/account`;
    if (host.indexOf('3000') !== -1) {
        // TODO: сделать в едином месте
        host = host.replace('3000', '3001').replace('https', 'http');
    }

    x.open('GET', host, true);
    x.onload = function() {
        const res = x.responseText && JSON.parse(x.responseText);
        const { user, finance, imageStream } = res;

        console.log(x.responseText);
        console.log(user, res);
        if (user && user.accessToken) {

          if(user.provider === 'facebook') {
            FB.setAccessToken(user.accessToken);
            FB.api('/me', { fields: 'id,name,picture' }, response => {
                if (user.id !== response.id) {
                    window.location.href = '/user/login';
                } else {
                    // console.log(user.id, response);
                    ReactDOM.render(
                      <Provider store={configureStore({ authUser: { user: { ...response}, finance, FB, imageStream } })}>
                          <Suspense fallback={<div className="loading" />}>
                              <App />
                            </Suspense>
                        </Provider>,
                        document.getElementById('root'),
                    );
                }
            });

          } else if(user.provider === 'github') {
            
            const gh = new GitHub({
              token: user.accessToken
            });
            var me = gh.getUser();
            
            me.getProfile((err, response) => {

              if (user.id != response.id) {
                window.location.href = '/user/login';
              } else {
                // console.log(user.id, response);
                ReactDOM.render(
                  <Provider store={configureStore({ authUser: { user: { ...response, picture: { data: {url: response.avatar_url } } }, finance, imageStream } })}>
                      <Suspense fallback={<div className="loading" />}>
                          <App />
                        </Suspense>
                    </Provider>,
                    document.getElementById('root'),
                );
              }
            });
          } else {
            window.location.href = '/user/login';
          }
        } else {
            //window.location.href = '/user/login';
            ReactDOM.render(
              <Provider store={configureStore()}>
                  <Suspense fallback={<div className="loading" />}>
                      <App />
                </Suspense>
            </Provider>,
              document.getElementById('root'),
          );
        }
    };
    x.withCredentials = true;
    x.send();
} else {
    ReactDOM.render(
        <Provider store={configureStore()}>
            <Suspense fallback={<div className="loading" />}>
                <App />
          </Suspense>
      </Provider>,
        document.getElementById('root'),
    );
}

serviceWorker.unregister();
