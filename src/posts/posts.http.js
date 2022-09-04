const e = require('express');
const { restart } = require('nodemon');
const postControllers = require('./posts.controllers')

const getAll = (req, res) => {
    const data = postControllers.getAllPosts();
    res.status(200).json({ items: data.length, posts: data })
};

const getById = (req, res) => {
    const id = req.params.id;
    const data = postControllers.getPostById(id);

    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: `El post con id ${id} no existe` });
    }
};

const register = (req, res) => {
    const data = req.body;
    const user_id = req.user.id;
    if (!data) {
        return res.status(400).json({ message: 'Missing Data' });
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image
    ) {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields: {
                title: "string",
                content: "string",
                header_image: "url_to_img"
            },
        });
    } else {
        const response = postControllers.createPost(data, user_id);
        return res
            .status(201)
            .json({
                message: `Post created succesfully with id ${response.id}`,
                post: response,
            })
    }
};

const remove = (req, res) => {
    const user_id = req.user.id;
    const id = req.params.id;
    const post = postControllers.getPostById(id)

    if (post[0].user_id === user_id) {
        const data = postControllers.deletePost(id);
        if (data) {
            return res.status(204).json();
        } else {
            return res.status(400).json({ message: 'Invalid ID' })
        }
    } else {
        return res.status(400).json({message: 'Post ID not corresponds to the Logged User'})
    }
};

const edit = (req, res) => {
    const user_id = req.user.id;
    const id = req.params.id;
    const data = req.body;
    const post = postControllers.getPostById(id)

    if (post[0].user_id === user_id){
        if (!Object.keys(data).length) {
            return res.status(400).json({ message: "Missing Data" });
        } else if (
            !data.title ||
            !data.content ||
            !data.header_image
        ) {
            return res.status(400).json({
                message: "All fields must be completed",
                fields: {
                    title: "string",
                    content: "string",
                    header_image: "url_to_img"
                },
            });
        } else {
            const response = postControllers.editPost(id, data)
            return res.status(200).json({
                message: "Post edited successfully",
                post: response
            })
        }
    }else {
        return res.status(400).json({message: 'Post ID not corresponds to the Logged User'})
    }

}

const editMyPost = (req, res) => {
    const id = req.user.id;
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: 'Missing Data' });
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                title: "string",
                content: "string",
                header_image: "url_to_img"
            },
        });
    } else {
        const response = postControllers.editPost(id, data)
        return res.status(200).json({
            message: 'Post edited succesfully',
            post: response
        })
    }
}

const getMyPost = (req, res) => {
    const id = req.user.id;
    const data = postControllers.getPostByUserId(id)
    res.status(200).json(data)
}

module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit,
    editMyPost,
    getMyPost
}