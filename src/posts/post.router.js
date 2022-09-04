const router = require("express").Router()
const { session } = require("passport")
const passport = require('passport')

const postServices = require('./posts.http')

router.route('/')
    .get(postServices.getAll)
    .post(passport.authenticate('jwt', {session: false}), postServices.register)

router.route('/me')
    .get(passport.authenticate('jwt', {session: false}), postServices.getMyPost)
    .put(passport.authenticate('jwt', {session: false}), postServices.editMyPost)
    .delete(passport.authenticate('jwt', {session: false}), postServices.remove)
    .post(passport.authenticate('jwt', {session: false}), postServices.register)


    router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), postServices.getById)
    .put(passport.authenticate('jwt', {session: false}), postServices.edit)
    .delete(passport.authenticate('jwt', {session: false}), postServices.remove)


    exports.router = router