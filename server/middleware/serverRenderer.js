const path = require('path')
const fs = require('fs')

const React = require('react')
const {Provider} = require('react-redux')
const {renderToString} = require('react-dom/server')
const {StaticRouter} = require('react-router-dom')
import { IntlProvider } from 'react-intl';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const { configureStore } = require('../../src/redux/store')
const Login = require('../../src/views/user/login').default
import enLang from '../../src/lang/entries/en-US';


module.exports = function serverRenderer(req, res, next) {
  if(req._possible404){
    res.sendFile(path.join(__dirname, '..', '..','build', 'index.html'));
  } else {
    if(req.path == "/user/login") {
      const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

      fs.readFile(filePath, 'utf8', (err, htmlData)=>{
        if (err) {
          console.error('read err', err)
          return res.status(404).end()
        }
        const context = {}
        const store = configureStore();
        const markup = renderToString(
          <Provider store={store}>
            <>
              <IntlProvider
                locale='en-US'
                messages={enLang.messages}
              >
                <StaticRouter location={req.url} context={{}} history={history}>
                  <Login serverRequest={req} />
                </StaticRouter>
              </IntlProvider>
            </>
          </Provider>
        )

        if (context.url) {
          // Somewhere a `<Redirect>` was rendered
          res.redirect(301, context.url)
        } else {
          // we're good, send the response
          const RenderedApp = htmlData.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
          res.send(RenderedApp)
        }
      })
    } else {
      req._possible404 = true;
      //res.sendFile(path.join(__dirname, '..', '..','build', 'index.html'));
      return next();
    }
  }
}