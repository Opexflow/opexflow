import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import FB from 'fb';

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

if (window.location.pathname && window.location.pathname !== '/user/login') {
  var x = new XMLHttpRequest();

  // Костыль для локальной разработки, чтобы порты сервера и клиента разнести.
  var host = `https://${window.location.host}/api/account`;
  if (host.indexOf('3000') !== -1) {
    host = host.replace('3000', '3001').replace('https', 'http');
  }

  x.open("GET", host, true);
  x.onload = function (){
      var res = x.responseText && JSON.parse(x.responseText);
      var user = res && res.user;

      console.log(x.responseText);
      if (user && user.accessToken) {
        FB.setAccessToken(user.accessToken);
        FB.api('/me', { fields: 'id,name,picture' }, function(response) {
          if (user.id !== response.id) {
            window.location.href = '/user/login';
          } else {
            console.log(user.id, response);
            ReactDOM.render(
              <Provider store={configureStore({ authUser: { user: { ...response }, FB }})}>
                <Suspense fallback={<div className="loading" />}>
                  <App />
                </Suspense>
              </Provider>,
              document.getElementById('root')
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
    document.getElementById('root')
  );
}

serviceWorker.unregister();
