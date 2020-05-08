import { getAppPath } from '../../../appPath';
const fs = require('fs');

export const home = (req, res, db) => {
    let query = "SELECT * FROM `players`";
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('home.ejs', {
            title: "Add user portal"
            ,users: result
            ,message: ''
        });
    });
}

export const addUserPage = (req, res) => {
    res.render('addUser.ejs', {
        title: "Add User Portal"
        ,message: ''
    });
}

export const addUser = (req, res, db) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    let message = '';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let phone = req.body.phone;
    let username = Date.now();
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = username + '.' + fileExtension;

    let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'Username already exists';
            res.render('addUser.ejs', {
                message,
                title: "Add User Portal"
            });
        } else {
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(`${image_name}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                    let query = "INSERT INTO `players` (first_name, last_name, email, phone, image, user_name) VALUES ('" +
                        first_name + "', '" + last_name + "', '" + email + "', '" + phone + "', '" + image_name + "', '" + username + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('addUser.ejs', {
                    message,
                    title: "Add User Portal"
                });
            }
        }
    });
}

export const editUserPage = (req, res, db) => {
    let playerId = req.params.id;
    let query = "SELECT * FROM `players` WHERE user_name = '" + playerId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('editUser.ejs', {
            title: ""
            ,user: result[0]
            ,message: ''
        });
    });
};


export const editUser = (req, res, db) => {
    let playerId = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let phone = req.body.phone;

    let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `email` = '" + email + "', `phone` = '" + phone + "' WHERE `players`.`user_name` = '" + playerId + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

export const deleteUser = (req, res, db) => {
    let playerId = req.params.id;
    let getImageQuery = 'SELECT image from `players` WHERE user_name = "' + playerId + '"';
    let deleteUserQuery = 'DELETE FROM players WHERE user_name = "' + playerId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    });
};


export const serveImage = (req, res) => {
    const id = req.params.id;
    console.log("id", id)
    res.sendFile(`${getAppPath()}/${id}`)
}
