import {req} from "./helpers/test-helpers";
import {SETTINGS} from "../settings";
import {
    blogInput,
    nonExistentMongoId,
    postInput,
    postInvalidLengthStingInput,
    postUpdateInput
} from "./helpers/dataTest";
import {client, connectToDB} from "../db/mongo-db";
import {PostViewModel} from "../input-output-types/post-types";
import {BlogViewModel} from "../input-output-types/blogs-types";
import {clearDB, codedAuth} from "./helpers/utilities";

describe('/posts', () => {
    beforeAll(async () => {
        await connectToDB()
    })

    afterAll(async () => {
        await client.close()
    })

    let post1: PostViewModel;
    let post2: PostViewModel;
    let blog1: BlogViewModel;

    describe('Returns all posts', () => {
        it('Should return empty array and status 200', async () => {
            await clearDB()
            const res = await req
                .get(SETTINGS.PATH.POSTS)
                .expect(200)
            expect(res.body.items.length).toBe(0);
            expect(res.body).toEqual({
                pagesCount: 0,
                page: 1,
                pageSize: 10,
                totalCount: 0,
                items: expect.arrayContaining([]),
            });
        })
    })

    describe('Create new posts', () => {
        it('Should create new post and return status 201.', async () => {
            await clearDB()
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = res.body

            const res2 = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postInput, blogId: blog1.id})
                .expect(201)
            post1 = res2.body

            expect(res2.body).toEqual(expect.objectContaining(post1))
        })

        it('Should return status 400 if the input data is invalid', async () => {
            const res = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(postInvalidLengthStingInput)
                .expect(400)

            expect(res.body.errorsMessages.length).toEqual(4)
            expect(res.body.errorsMessages[0].field).toEqual('title')
            expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
            expect(res.body.errorsMessages[2].field).toEqual('content')
            expect(res.body.errorsMessages[3].field).toEqual('blogId')
        })

        it('Should return status 401 not authorized', async () => {
            const res = await req
                .post(SETTINGS.PATH.POSTS)
                .send({...postInput, blogId: blog1.id})
                .expect(401)

            expect(res.body).toEqual({error: 'Authentication required'})

            const res2 = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth + '1234')
                .send({...postInput, blogId: blog1.id})
                .expect(401)

            expect(res2.body).toEqual({error: 'wrong login or password'})

            const getRes = await req
                .get(SETTINGS.PATH.POSTS)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([post1]));
        })
    })

    describe('Return post by id', () => {
        it('Should return status 200, search by idd', async () => {
            await clearDB()
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = res.body

            const res2 = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postInput, blogId: blog1.id})
                .expect(201)
            post1 = res2.body

            expect(res2.body).toEqual(expect.objectContaining(post1))

            const getRes = await req
                .get(SETTINGS.PATH.POSTS + '/' + post1.id)
                .expect(200)

            expect(getRes.body).toEqual(post1);
        })

        it('Should return status 404, search by id', async () => {
            await req
                .get(SETTINGS.PATH.BLOGS + nonExistentMongoId)
                .expect(404)
        })
    })

    describe('Update existing post dy id with inputModel', () => {
        it('Should return status 204, if the update data is valid', async () => {
            await clearDB()
            const createBlog = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = createBlog.body

            const createPost1 = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postInput, blogId: blog1.id})
                .expect(201)
            post1 = createPost1.body

            const createPost2 = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postInput, blogId: blog1.id})
                .expect(201)
            post2 = createPost2.body

            expect(post1).toEqual(expect.objectContaining({...postInput, blogId: blog1.id}))
            expect(post2).toEqual(expect.objectContaining({...postInput, blogId: blog1.id}))

             await req
                .put(SETTINGS.PATH.POSTS + '/' + post1.id)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postUpdateInput, blogId: blog1.id})
                .expect(204)

            const updatePost = await req
                .get(SETTINGS.PATH.POSTS + '/' + post1.id)
                .expect(200)
            post1 = updatePost.body

            expect(post1).toEqual(expect.objectContaining({...postUpdateInput, blogId: blog1.id}))
        })

        it('Should return status 400, if the input data is invalid', async () => {
            const res = await req
                .put(SETTINGS.PATH.POSTS + '/' + post2.id)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(postInvalidLengthStingInput)
                .expect(400)

            expect(res.body.errorsMessages.length).toEqual(4)
            expect(res.body.errorsMessages[0].field).toEqual('title')
            expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
            expect(res.body.errorsMessages[2].field).toEqual('content')
            expect(res.body.errorsMessages[3].field).toEqual('blogId')
        })

        it('Should return status 401, not authorized', async () => {
            const res = await req
                .put(SETTINGS.PATH.POSTS + '/' + post2.id)
                .send({...postUpdateInput, blogId: blog1.id})
                .expect(401)

            expect(res.body).toEqual({error: 'Authentication required'})

            const res2 = await req
                .put(SETTINGS.PATH.POSTS + '/' + post2.id)
                .set('Authorization', 'Basic ' + codedAuth + '1234')
                .send({...postInput, blogId: blog1.id})
                .expect(401)

            expect(res2.body).toEqual({error: 'wrong login or password'})
        })

        it('Should return status 404, Not Found', async () => {
            await req
                .put(SETTINGS.PATH.POSTS + '/' + nonExistentMongoId)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postUpdateInput, blogId: blog1.id})
                .expect(404)

            const getRes = await req
                .get(SETTINGS.PATH.POSTS + '/' + post2.id)
                .expect(200)

            expect(getRes.body).toEqual(expect.objectContaining({...postInput, blogId: blog1.id}))
        })
    })

    describe('Delete post specified by id', () => {
        it('Should return status 204, upon successful delete', async () => {
            await clearDB()
            const createBlog = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = createBlog.body

            const createPost1 = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postInput, blogId: blog1.id})
                .expect(201)
            post1 = createPost1.body

            const createPost2 = await req
                .post(SETTINGS.PATH.POSTS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send({...postInput, blogId: blog1.id})
                .expect(201)
            post2 = createPost2.body

            expect(post1).toEqual(expect.objectContaining({...postInput, blogId: blog1.id}))
            expect(post2).toEqual(expect.objectContaining({...postInput, blogId: blog1.id}))

            await req
                .delete(SETTINGS.PATH.POSTS + '/' + post1.id)
                .set('Authorization', 'Basic ' + codedAuth)
                .expect(204)

            const getRes = await req
                .get(SETTINGS.PATH.POSTS)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([post2]));
        })

        it('Should return status 401, not authorized', async () => {
            const res = await req
                .delete(SETTINGS.PATH.POSTS + '/' + post2.id)
                .expect(401)

            expect(res.body).toEqual({error: 'Authentication required'})

            const res2 = await req
                .delete(SETTINGS.PATH.POSTS + '/' + post2.id)
                .set('Authorization', 'Basic ' + codedAuth + '1234')
                .expect(401)

            expect(res2.body).toEqual({error: 'wrong login or password'})
        })

        it('Should return status 404, not found', async () => {
            await req
                .delete(SETTINGS.PATH.POSTS + '/' + nonExistentMongoId)
                .set('Authorization', 'Basic ' + codedAuth)
                .expect(404)

            const getRes = await req
                .get(SETTINGS.PATH.POSTS)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([post2]));
        })
    })
})