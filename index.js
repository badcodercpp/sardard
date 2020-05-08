import app from './server/core';
import {
    Init,
    registerRoutes,
    startServer,
} from './server/config/init';
import { appRoutes } from './server/routes';
import { getDb } from './hooks/db';

getDb().then((db) => {
    Init(app).then((appInstance) => {
        console.log('app initialized, registering routes')
        registerRoutes(appInstance, appRoutes, db).then((serverInstance) => {
            console.log("server is ready to listen, starting server")
            startServer(serverInstance).then((port) => {
                console.log(`server started on ${port}`)
            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            console.error(err)
        })
    }).catch(err => {
        console.error(err)
    });
}).catch(err => {
    console.error(err)
});