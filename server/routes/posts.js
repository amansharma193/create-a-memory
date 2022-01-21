import express from 'express';
import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router=express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required: 
 *         - title 
 *         - message
 *         - creator
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         creator:
 *           type: string
 *           description: The creator of the post
 *         message:
 *           type: string
 *           description: The message of the post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             description: The tags of the post
 *         createdAt:
 *           type: Date
 *           description: The creation date and time of the post
 *         likeCount:
 *           type: number
 *           description: The count of likes on the post
 *         selectedFile:
 *           type: string
 *           description: The uploaded image on the post
 *       example:
 *         id: 3r872gfufbfzjbn
 *         title: Happy New Year 2022
 *         creator: John Doe
 *         message: New year Best wishes to you
 *         likeCount: 5
 *         selectedFile: "data:images:///jsbvjhzfzjkdsmfjsig248834gfdfbc"
 *         tags: ['New year','Best wishes','Happiness']
 * 
 * */

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Post managing API
*/

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: The list of the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/',getPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       409:
 *         description: Some server error
 */
router.post('/',auth,createPost);


/**
 * @swagger
 * /posts/{id}:
 *  patch:
 *    summary: Update the post by the id
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: No post with this id
 */
router.patch('/:id',auth,updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 * 
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       404:
 *         description: No post with id - ${id}
 */
router.delete('/:id',auth,deletePost);


/**
 * @swagger
 * /posts/{id}/likePost:
 *  patch:
 *    summary: Like the post by the id
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: No post with this id
 */
router.patch('/:id/likePost',auth,likePost);


export default router;







