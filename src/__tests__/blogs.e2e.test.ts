import {req} from "./helpers/test-helpers";
import {SETTINGS} from "../settings";
import {
    blogInput,
    blogUpdateInput,
    blogInvalidLengthStingInput,
    blogInvalidURLInput,
    nonExistentBlogId,
    postByBlogInput, postByBlogInvalidLengthStingInput
} from "./helpers/dataTest";
import {client, connectToDB} from "../db/mongo-db";
import {clearDB, codedAuth} from "./helpers/utilities";
import {BlogViewModel} from "../input-output-types/blogs-types";
import {PostViewModel} from "../input-output-types/post-types";

describe('/blogs', () => {
    beforeAll(async () => {
        await connectToDB()
    })

    afterAll(async () => {
        await client.close()
    })

    let blog1: BlogViewModel
    let blog2: BlogViewModel
    let post1: PostViewModel
    let post2: PostViewModel

    describe('Returns blogs with paging', () => {
        it('Should return empty array and status 200', async () => {
            await clearDB()
            const res = await req
                .get(SETTINGS.PATH.BLOGS)
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

    describe('Crate new blog', () => {
        it('Should create new blogs and return status 201.', async () => {
            await clearDB()
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = res.body

            expect(blog1).toEqual(expect.objectContaining(blogInput))
        })

        it('Should return status 400 if the input data is invalid', async () => {
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInvalidURLInput)
                .expect(400)

            expect(res.body.errorsMessages[0].field).toEqual('websiteUrl')

            const createBlog = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInvalidLengthStingInput).expect(400)

            expect(createBlog.body.errorsMessages.length).toEqual(3)
            expect(createBlog.body.errorsMessages[0].field).toEqual('name')
            expect(createBlog.body.errorsMessages[1].field).toEqual('description')
            expect(createBlog.body.errorsMessages[2].field).toEqual('websiteUrl')

        })

        it('Should return status 401 not authorized', async () => {
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .send(blogInput)
                .expect(401)

            expect(res.body).toEqual({error: 'Authentication required'})

            const res2 = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth + '1234')//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
                .send(blogInput)
                .expect(401)

            expect(res2.body).toEqual({error: 'wrong login or password'})

            const getRes = await req
                .get(SETTINGS.PATH.BLOGS)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([blog1]));
        })

    })

    describe('Returns all posts for the specified blog', () => {
        it('Should return status 200,', async () => {
            await clearDB()
            const createBlog = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = createBlog.body

            const createPost = await req
                .post(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(postByBlogInput)
                .expect(201)
            post1 = createPost.body

            const createPost2 = await req
                .post(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(postByBlogInput)
                .expect(201)
            post2 = createPost2.body

            const res = await req
                .get(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .expect(200)

            expect(res.body.items.length).toBe(2);
            expect(res.body).toEqual({
                pagesCount: 1,
                page: 1,
                pageSize: 10,
                totalCount: 2,
                items: expect.arrayContaining([post1, post2]),
            });
        })


        it('Should return status 404, if the blog is not found', async () => {
            await req
                .get(`${SETTINGS.PATH.BLOGS}/${nonExistentBlogId}/posts`)
                .expect(404)
        })
    })

    describe('Create a new post for a specific blog', () => {
        it('Should return status 201, post has been created.', async () => {
            await clearDB()
            const createBlog = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = createBlog.body

            const createPost = await req
                .post(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(postByBlogInput)
                .expect(201)
            post1 = createPost.body

            expect(createPost.body.id).toEqual(post1.id)
            expect(createPost.body.title).toEqual(postByBlogInput.title)
            expect(createPost.body.shortDescription).toEqual(postByBlogInput.shortDescription)
            expect(createPost.body.content).toEqual(postByBlogInput.content)
            expect(createPost.body.blogId).toEqual(blog1.id)
            expect(createPost.body.blogName).toEqual(blog1.name)
            expect(createPost.body.createdAt).toEqual(post1.createdAt)
        })

        it('Should return status 400, input data is not valid.', async () => {
            const res = await req
                .post(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(postByBlogInvalidLengthStingInput)
                .expect(400)

            expect(res.body.errorsMessages.length).toEqual(3)
            expect(res.body.errorsMessages[0].field).toEqual('title')
            expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
            expect(res.body.errorsMessages[2].field).toEqual('content')
        })

        it('Should return status 401, not authorized', async () => {
            const res = await req
                .post(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .send(postByBlogInput)
                .expect(401)

            expect(res.body).toEqual({error: 'Authentication required'})

            const res1 = await req
                .post(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .set('Authorization', 'Basic ' + +codedAuth + '1234')
                .send(postByBlogInput)
                .expect(401)

            expect(res1.body).toEqual({error: 'wrong login or password'})
        })

        it('Should return status 404, not found', async () => {
             await req
                .post(`${SETTINGS.PATH.BLOGS}/${nonExistentBlogId}/posts`)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(postByBlogInput)
                .expect(404)

            const getRes = await req
                .get(`${SETTINGS.PATH.BLOGS}/${blog1.id}/posts`)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([post1]));
        })
    })

    describe('Returns blog by id', () => {
        it('Should return status 200, search by id', async () => {
            await clearDB()
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = res.body

            const getRes = await req
                .get(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .expect(200)

            expect(getRes.body).toEqual(blog1);
        })

        it('Should return status 404, search by id', async () => {
            await req
                .get(SETTINGS.PATH.BLOGS + nonExistentBlogId)
                .expect(404)
        })
    })

    describe('Update existing blog by ID with InputModel', () => {
        it('Should return status 204, if the update data is valid', async () => {
            await clearDB()
            const createBlog = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = createBlog.body

            await req
                .put(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogUpdateInput)
                .expect(204)

            const updateBlog = await req
                .get(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .expect(200)
            blog1 = updateBlog.body

            expect(blog1).toEqual(expect.objectContaining(blogUpdateInput))
        })

        it('Should return status 400, if the input data is invalid', async () => {
            const res = await req
                .put(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInvalidURLInput).expect(400)

            expect(res.body.errorsMessages[0].field).toEqual('websiteUrl')

            const res2 = await req
                .put(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInvalidLengthStingInput).expect(400)

            expect(res2.body.errorsMessages.length).toEqual(3)
            expect(res2.body.errorsMessages[0].field).toEqual('name')
            expect(res2.body.errorsMessages[1].field).toEqual('description')
            expect(res2.body.errorsMessages[2].field).toEqual('websiteUrl')

            const getRes = await req
                .get(SETTINGS.PATH.BLOGS)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([blog1]));
        })

        it('Should return status 401, not authorized', async () => {
            const res = await req
                .put(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .send(blogInput)
                .expect(401)

            expect(res.body).toEqual({error: 'Authentication required'})

            const res2 = await req
                .put(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .set('Authorization', 'Basic ' + codedAuth + '1234')//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
                .send(blogInput)
                .expect(401)

            expect(res2.body).toEqual({error: 'wrong login or password'})
        })

        it('Should return status 404, Not Found', async () => {
            await req
                .put(SETTINGS.PATH.BLOGS + nonExistentBlogId)
                .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
                .send(blogUpdateInput)
                .expect(404)
        })
    })

    describe('Delete a blog specified by ID', () => {
        it('Should return status 204, upon successful delete', async () => {
            await clearDB()
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog1 = res.body

            const res2 = await req
                .post(SETTINGS.PATH.BLOGS)
                .set('Authorization', 'Basic ' + codedAuth)
                .send(blogInput)
                .expect(201)
            blog2 = res2.body

            await req
                .delete(SETTINGS.PATH.BLOGS + '/' + blog1.id)
                .set('Authorization', 'Basic ' + codedAuth)
                .expect(204)

            const getRes = await req
                .get(SETTINGS.PATH.BLOGS)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([blog2]));
        })

        it('Should return status 401, not authorized.', async () => {
            const res = await req
                .delete(SETTINGS.PATH.BLOGS + '/' + blog2.id)
                .expect(401)

            expect(res.body).toEqual({error: 'Authentication required'})
        })

        it('Should return status 404, not found', async () => {
            await req
                .delete(SETTINGS.PATH.BLOGS + nonExistentBlogId)
                .set('Authorization', 'Basic ' + codedAuth)
                .expect(404)

            const getRes = await req
                .get(SETTINGS.PATH.BLOGS)
                .expect(200)

            expect(getRes.body.items.length).toBe(1);
            expect(getRes.body.items).toEqual(expect.arrayContaining([blog2]));
        })
    })
})

