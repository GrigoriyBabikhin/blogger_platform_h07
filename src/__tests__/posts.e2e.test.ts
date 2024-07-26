import {req} from "./helpers/test-helpers";
import {SETTINGS} from "../settings";
import {codedAuth, createdString, createPosts1, createPosts2, updatePost} from "./helpers/data-test";

describe('/posts', () => {
    //зачистка базы данных для тестов.
    beforeAll(async () => {
        await req.delete('/__test__/posts')
    })

    //Проверка get-posts
    //status 200
    it('Should return empty array and status 200', async () => {
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [])
    })

    //создали переменную для того чтобы другие тесты смогли к ней обращаться.
    let createPosts1temp: any = null;
    let createPosts2temp: any = null;

    //Проверка post-posts
    //status 201
    it('Should create статус 201, when creating a post', async () => {
        //создаем валидный объект 1
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(createPosts1)
            .expect(201)

        //записываем в переменную.
        createPosts1temp = res.body

        //проверим что наши свойства объекта создались правильно.
        expect(createPosts1).toEqual(
            expect.objectContaining({
                "title": "string",
                "shortDescription": "string",
                "content": "string",
                "blogId": "1"
            })
        )

        //создаем валидный объект 2
        const res2 = await req
            .post(SETTINGS.PATH.POSTS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(createPosts2)
            .expect(201)

        //записываем в переменную.
        createPosts2temp = res2.body

        //проверим что наши свойства объекта создались правильно.
        expect(createPosts2).toEqual(
            expect.objectContaining({
                "title": "string",
                "shortDescription": "string",
                "content": "string",
                "blogId": "1"
            })
        )

        //проверим что новый объект создался
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [createPosts1temp, createPosts2temp])
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
                "blogId": 1212
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

        expect([createPosts1temp, createPosts2temp]).toEqual(getRes.body)
    })

    //status 401 Unauthorized
    it('Should return status 401 not authorized when creating a new post', async () => {

        //создаем валидный объект без авторизации
        await req
            .post(SETTINGS.PATH.POSTS)
            .send(createPosts1)
            .expect(401, {error: 'Authentication required'})

        //создаем валидный объект с неверным логином/паролем
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth + '1234')//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(createPosts1)
            .expect(401, {error: 'wrong login or password'})

    })

    //Проверка get id
    //status 200
    it('Should return status 200 search posts by id', async () => {
        await req
            .get(SETTINGS.PATH.POSTS + '/' + createPosts1temp.id)
            .expect(200, createPosts1temp)
    })

    //status 404 not found
    it('Should return status 404 search posts by id', async () => {
        await req
            .get(SETTINGS.PATH.BLOGS + '/1212')
            .expect(404)
    })

    //Проверка put
    //status 204
    it('Should return status 204 if the update post is valid', async () => {
        //Обновить объект валидными данными
        await req
            .put(SETTINGS.PATH.POSTS + '/' + createPosts1temp.id)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(updatePost)
            .expect(204)

        //проверим что наши свойства объекта создались правильно.
        await req
            .get(SETTINGS.PATH.POSTS + '/' + createPosts1temp.id)
            .expect(200, {
                ...createPosts1temp,
                "title": "updatePost",
                "shortDescription": "updatePost",
                "content": "updatePost",
                "blogId": "1"

            })

        //обновляем createPosts1temp c новыми данными.
        createPosts1temp = {...createPosts1temp, ...updatePost}

        //запросить данные через get id
        const newBlog = await req
            .get(SETTINGS.PATH.POSTS + '/' + createPosts1temp.id)
            .expect(200)
        //сравнить полученные данные с переменной для тестов.
        expect(newBlog.body).toEqual(createPosts1temp)

    })

    //status 400
    it('Should return status 400 if the update post is not valid.', async () => {
        //обновим невалидными данными.
        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + createPosts2temp.id)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "title": createdString(31),
                "shortDescription": createdString(101),
                "content": createdString(1001),
                "blogId": "1212"
            }).expect(400)

        //Проверяем только field с указанием ошибки.
        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[2].field).toEqual('content')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')

        //запросить данные через get id
        const newBlog = await req
            .get(SETTINGS.PATH.POSTS + '/' + createPosts2temp.id)
            .expect(200)
        //сравнить полученные данные с переменной для тестов.
        expect(newBlog.body).toEqual(createPosts2temp)
    })

    //status 401 Unauthorized
    it('Should return 401 "Not Authorized", when updating the post', async () => {
        //обновляем валидный объект без авторизации
        await req
            .put(SETTINGS.PATH.POSTS + '/' + createPosts2temp.id)
            .send(updatePost)
            .expect(401, {error: 'Authentication required'})

        //создаем валидный объект с неверным логином/паролем
        await req
            .put(SETTINGS.PATH.BLOGS + '/' + createPosts1temp.id)
            .set('Authorization', 'Basic ' + codedAuth + '1234')//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(updatePost)
            .expect(401, {error: 'wrong login or password'})

        //проверка на то что данные не изменились
        const newBlog = await req
            .get(SETTINGS.PATH.POSTS + '/' + createPosts2temp.id)
            .expect(200)
        //сравнить полученные данные с переменной для тестов.
        expect(newBlog.body).toEqual(createPosts2temp)
    })

    //status 404 Not Found
    it('Must return, 404 Not Found, if the post not exist', async () => {
        await req
            .put(SETTINGS.PATH.POSTS + '/1212')
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(updatePost)
            .expect(404)
    })

    //Проверка delete
    //status 204
    it('Should return status 204, upon successful deletion of a post', async () => {
        //Удалить объект
        await req
            .delete(SETTINGS.PATH.POSTS + '/' + createPosts1temp.id)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .expect(204)

        //пробуем найти наш блог
        await req
            .get(SETTINGS.PATH.POSTS + '/' + createPosts1temp.id)
            .expect(404)

        //проверяем массив должен остаться 1 объект
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [createPosts2temp])

    })

    //status 401 Unauthorized
    it('Should return status 401 Unauthorized, when deleting post', async () => {
        //Удалить объект
        await req
            .delete(SETTINGS.PATH.POSTS + '/' + createPosts2temp.id)
            .expect(401)
        //проверяем массив должен остаться 1 объект.
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [createPosts2temp])

    })

    //status 404 Not Found
    it('Should return status 404 Not Found, when deleting posts', async () => {
        //Удалить не существующий объект
        await req
            .delete(SETTINGS.PATH.POSTS + '/1212')
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .expect(404)
        //проверяем массив должен остаться 1 объект
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [createPosts2temp])

    })
})