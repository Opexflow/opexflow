import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FB from 'fb';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './redux/store';

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App'));

if (window.location.pathname && window.location.pathname !== '/user/login') {
    const x = new XMLHttpRequest();

    // Костыль для локальной разработки, чтобы порты сервера и клиента разнести.
    let host = `https://${window.location.host}/api/account`;
    if (host.indexOf('3000') !== -1) {
        host = host.replace('3000', '3001').replace('https', 'http');
    }

    x.open('GET', host, true);
    x.onload = function() {
        const res = x.responseText && JSON.parse(x.responseText);
        const user = res && res.user;

        console.log(x.responseText);
        if (user && user.accessToken) {
            FB.setAccessToken(user.accessToken);
            FB.api('/me', { fields: 'id,name,picture' }, response => {
                if (user.id !== response.id) {
                    window.location.href = '/user/login';
                } else {
                    console.log(user.id, response);
                    ReactDOM.render(
                      <Provider store={configureStore({ authUser: { user: { ...response }, FB } })}>
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
