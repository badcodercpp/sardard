import {
    home,
    addUserPage,
    addUser,
    editUserPage,
    editUser,
    deleteUser,
    serveImage
} from './handlers';
export const appRoutes = [
    {
        method: 'get',
        url: '/',
        handler: home,
    },
    {
        method: 'get',
        url: '/add',
        handler: addUserPage,
    },
    {
        method: 'get',
        url: '/edit/:id',
        handler: editUserPage,
    },
    {
        method: 'get',
        url: '/delete/:id',
        handler: deleteUser,
    },
    {
        method: 'get',
        url: '/assets/img/:id',
        handler: serveImage,
    },
    {
        method: 'post',
        url: '/add',
        handler: addUser,
    },
    {
        method: 'post',
        url: '/edit/:id',
        handler: editUser,
    },
];

/**
 * app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
app.get('/assets/img/:id', (req, res) => serveImage(req, res, __dirname));
 */

export default appRoutes;