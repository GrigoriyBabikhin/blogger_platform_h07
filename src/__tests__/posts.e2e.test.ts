import {req} from "./helpers/test-helpers";
import {SETTINGS} from "../settings";
import {codedAuth, createBlog, createdString, createPost, updatePost} from "./helpers/data-test";
import {client} from "../db/mongo-db";
import {PostViewModel} from "../input-output-types/post-types";
import {BlogViewModel} from "../input-output-types/blogs-types";


describe('/posts', () => {
    //зачистка базы данных для тестов.
    beforeAll(async () => {
        await req.delete(SETTINGS.PATH.TESTING)
    })

    afterAll(async () => {
        await client.close()
    })

    //создали переменную для того чтобы другие тесты смогли к ней обращаться.
    let post1: PostViewModel;
    let post2: PostViewModel;
    let blog1: BlogViewModel;

    beforeAll(async () => {
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(createBlog)
            .expect(201)
        //console.log(res.body)
        //записываем в переменную.
        blog1 = res.body
    })

    //Проверка get-posts
    //status 200
    it('Should return empty array and status 200', async () => {
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [])
    })

    //Проверка posts запроса.
    //status 201
    it('Should create статус 201, when creating a post', async () => {
        const newPost = {...createPost, blogId: blog1.id}
        //создаем валидный объект 1
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(newPost)
            .expect(201)

        //записываем в переменную.
        post1 = res.body

        //проверим что наши свойства объекта создались правильно.
        expect(post1).toEqual(
            expect.objectContaining(newPost)
        )

        //создаем валидный объект 2
        const res2 = await req
            .post(SETTINGS.PATH.POSTS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(newPost)
            .expect(201)

        //записываем в переменную.
        post2 = res2.body

        //проверим что наши свойства объекта создались правильно.
        expect(post2).toEqual(
            expect.objectContaining(newPost)
        )

        //проверим что новый объект создался
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [post1, post2])
    })

    //status 400
    it('Should return status 400 if the data posts is invalid', async () => {
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "title": createdString(31),
                "shortDescription": createdString(101),
                "content": createdString(1001),
                "blogId": '66b8973ceb87400953ab00bf'
            }).expect(400)

        //Проверяем только field с указанием ошибки.
        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[2].field).toEqual('content')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')

        //проверка массива
        const getRes = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect([post1, post2]).toEqual(getRes.body)
    })

    //Проверка get id
    //status 200
    it('Should return status 200 search posts by id', async () => {
        await req
            .get(SETTINGS.PATH.POSTS + '/' + post1.id)
            .expect(200, post1)
    })

    //status 404 not found
    it('Should return status 404 search posts by id', async () => {
        await req
            .get(SETTINGS.PATH.BLOGS + '/66b8973ceb87400953ab00bf')
            .expect(404)
    })

    //Проверка put
    //status 204
    it('Should return status 204 if the update post is valid', async () => {
        const newUpdatePost = {...updatePost, blogId: blog1.id}
        //Обновить объект валидными данными
        await req
            .put(SETTINGS.PATH.POSTS + '/' + post1.id)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(newUpdatePost)
            .expect(204)

        //проверим что наши свойства объекта создались правильно.
        await req
            .get(SETTINGS.PATH.POSTS + '/' + post1.id)
            .expect(200, {
                ...post1,
                "title": "updatePost",
                "shortDescription": "updatePost",
                "content": "updatePost",
                "blogId": blog1.id
            })

        //обновляем Post c новыми данными.
        post1 = {...post1, ...newUpdatePost}

        //запросить данные через get id
        const newBlog = await req
            .get(SETTINGS.PATH.POSTS + '/' + post1.id)
            .expect(200)
        //сравнить полученные данные с переменной для тестов.
        expect(newBlog.body).toEqual(post1)

    })

    //Проверка delete
    //status 204
    it('Should return status 204, upon successful deletion of a post', async () => {
        //Удалить объект
        await req
            .delete(SETTINGS.PATH.POSTS + '/' + post1.id)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .expect(204)

        //пробуем найти наш блог
        await req
            .get(SETTINGS.PATH.POSTS + '/' + post1.id)
            .expect(404)

        //проверяем массив должен остаться 1 объект
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [post2])

    })
})