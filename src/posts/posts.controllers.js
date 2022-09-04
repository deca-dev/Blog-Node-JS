const uuid = require("uuid");
const {hashPassword} = require('../utils/crypt');

const postDB = [{
    "id": "uuid",
	"title": "string",
	"content":"string",
	"header_image": "url_to_img",
	"user_id": "uuid",//Aqui hara referencia al usuario de tu userDB
	"published": true
},
{
    "id": "482c0110-cee4-428c-8aa8-e53f8d3c23a9",
    "title": "Prueba",
    "content": "abc",
    "header_image": "123",
    "user_id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    "published": true
}]

const getAllPosts = () => {
    return postDB;
}

const getPostByUserId = user_id => { 
    const data = postDB.filter((item) => item.user_id === user_id);
    return data //?Si el array >1 retorna data con todos los posts
};

//? Controlador de Post ID del post
const getPostById = id => {
    const data = postDB.filter((item) => item.id ===  id);
    return data
}

const createPost = (data, user_id) => {
    const newPost = {
    id: uuid.v4(),
	title: data.title,
	content: data.content,
	header_image: data.header_image,
	user_id: user_id,
	published: true
    }
    postDB.push(newPost)
    return newPost

};

const editPost = (id, data) => {
    const index = postDB.findIndex((post) => post.id === id);
    if(index !== -1 ){
        postDB[index] = {
            id: id, 
            title: data.title,
	        content: data.content,
	        header_image: data.header_image,
	        user_id: data.user_id,
	        published: true
        };
        return postDB[index];
    } else {
        return createPost(data);
    }
};

const deletePost = (id) => {
    const index = postDB.findIndex(post => post.id === id)
    if(index !== -1){
        postDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

module.exports = {
    getAllPosts,
    getPostByUserId,
    createPost,
    editPost,
    deletePost,
    getPostById
}