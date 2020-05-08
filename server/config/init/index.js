import express from 'express'
import _forEach from 'lodash/forEach';
import { defaultPort } from '../../../util/constant';
import { getAppPath } from '../../../appPath';
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
export const Init = (app, port = defaultPort) => {
    const p = new Promise((resolve, reject) => {
        app.set('port', process.env.port || port);
        app.set('views', getAppPath() + '/views');
        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(fileUpload());
        resolve(app);
    });
    return p;
}

export const registerRoutes = (app, routes = [], db) => {
    const p = new Promise((resolve, reject) => {
        _forEach(routes, ({ method,  url, handler }) => {
            app[method](url, (req, res) => handler(req, res, db));
        })
        resolve(app);
    });
    return p;
}

export const startServer = (app, port = defaultPort) => {
    const p = new Promise((resolve, reject) => {
        app.listen(port, () => {
            resolve(port);
        });
    });
    return p;
}