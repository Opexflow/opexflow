import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';


import createStore from '../src/store';
import ExchangeRate from '../src/components/pages/ExchangeRate'



export default (req, res) => {
    const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
        data = data.replace('<html>', `<html ${html}>`);
        data = data.replace(/<title>.*?<\/title>/g, title);
        data = data.replace('</head>', `${meta}</head>`);
        data = data.replace(
            '<div id="root"></div>',
            `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>${scripts.join('')}`
        );

        return data;
    };

    fs.readFile(
        path.resolve(__dirname, '../build/index.html'),
        'utf8',
        (err, htmlData) => {
            if (err) {
                console.error('Read error', err);

                return res.status(404).end();
            }

            const { store } = createStore(req.url);


            const context = {};
            const modules = [];

            frontloadServerRender(() =>
                renderToString(
                    <Loadable.Capture report={m => modules.push(m)}>
                        <Provider store={store}>
                            <StaticRouter location={req.url} context={context}>
                                <Frontload isServer={true}>
                                    <ExchangeRate />
                                </Frontload>
                            </StaticRouter>
                        </Provider>
                    </Loadable.Capture>
                )
            ).then(routeMarkup => {
                if (context.url) {
                    res.writeHead(302, {
                        Location: context.url
                    });

                    res.end();
                } else {

                    const extractAssets = (assets, chunks) =>
                        Object.keys(assets)
                            .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
                            .map(k => assets[k]);

                    const extraChunks = extractAssets(manifest, modules).map(
                        c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
                    );


                    const helmet = Helmet.renderStatic();

                    console.log('THE TITLE', helmet.title.toString());

                    const html = injectHTML(htmlData, {
                        html: helmet.htmlAttributes.toString(),
                        title: helmet.title.toString(),
                        meta: helmet.meta.toString(),
                        body: routeMarkup,
                        scripts: extraChunks,
                        state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
                    });

                    res.send(html);
                }
            });
        }
    );
};