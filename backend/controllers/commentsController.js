var CommentsModel = require("../models/commentsModel.js");
const User = require("../models/userModel.js");
var bcrypt = require("bcrypt");
//var config = require("../config/auth.config.js");
/**
 * usersController.js
 *
 * @description :: Server-side logic for managing userss.
 */
module.exports = {
    /**
     * usersController.list()
     */
    list: function (req, res) {
        CommentsModel.find(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting comments.",
                    error: err,
                });
            }
            //console.log(comments)
            return res.json(comments);
        }); 
    },

    /**
     * usersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentsModel.find({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting comments.",
                    error: err,
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: "No such comments",
                });
            }
            
            return res.json(user);
        });
    },

    showCommentsOld: function (req, res) {
        console.log(req.params.id, " id")
        var photo_id = req.params.id;
        CommentsModel.find({ postedTo: photo_id })  
            .exec(function (err, comments) {
                console.log("shoComments function running")

                if (err) {
                    return res.status(500).json({
                        message: "Error when getting comments.",
                        error: err,
                    });
                }
                if (!comments) {
                    return res.status(404).json({
                        message: "No such photo",
                    });
                }
                //return res.render('photo/list', data);
                return res.json(comments);
            });
    },

    showComments: function(req , res) {
        CommentsModel.find({postedTo: req.params.id}).populate("postedBy").exec(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comments.',
                    error: err
                });
            }
            if (!comments) {
                return res.status(404).json({
                    message: 'No such comments'
                });
            }
            return res.status(200).json(comments);
        });
    },

    /**
     * usersController.create()
     */



    create: function (req, res) {
        console.log(req.body.messagee, " To je message")
        console.log(req.session.userId, " To je idUser")
        var comment = new CommentsModel({
            message: req.body.messagee,
            postedBy: req.session.userId,
            postedTo: req.body.postedTo
        });

        comment.save(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: "Error when creating comments",
                    error: err,
                });
            }

            return res.status(201).json(comments);
        });
    },
    

    /**
     * usersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CommentsModel.findOne({ _id: id }, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting comments",
                    error: err,
                });
            }

            if (!users) {
                return res.status(404).json({
                    message: "No such comments",
                });
            }

            users.username = req.body.username
                ? req.body.username
                : users.username;
            users.password = req.body.password
                ? req.body.password
                : users.password;
            users.points = req.body.points ? req.body.points : users.points;

            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        message: "Error when updating comments.",
                        error: err,
                    });
                }
                users.password = "";
                return res.json(users);
            });
        });
    },

    /**
     * usersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentsModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: "Error when deleting the comments.",
                    error: err,
                });
            }

            return res.status(204).json();
        });
    },

    login: function (req, res) {
        console.log(req.body.username);
        try {
            CommentsModel.findOne(
                { username: req.body.username },
                function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: "Error getting comments.",
                            error: err,
                        });
                    }

                    if (!user) {
                        return res.status(404).json({
                            message: "comments not found.",
                        });
                    }

                    var passwordIsValid = bcrypt.compare(
                        req.body.password,
                        user.password
                    );
                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid password!",
                        });
                    }

                    var token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400,
                    });

                    console.log(token);
                    return res.status(200).send({
                        id: user._id,
                        username: user.username,
                        accessToken: token,
                    });
                }
            );
        } catch (error) {
            res.status(400).json({ error });
        }
    },
};
