import {req} from "./helpers/test-helpers";
import {SETTINGS} from "../settings";
import {codedAuth, createBlog, createdString, updateBlogs} from "./helpers/data-test";
import {client, connectToDB} from "../db/mongo-db";
import {BlogViewModel} from "../input-output-types/blogs-types";


describe('/blogs', () => {
    //зачистка базы данных для тестов.
    beforeAll(async () => {
        await connectToDB()
        await req.delete(SETTINGS.PATH.TESTING)
    })

    afterAll(async () => {
        await client.close()
    })

    //Проверка get-blogs
    it('Should return empty array and status 200', async () => {
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [])
    })

    //создали переменную для того чтобы другие тесты смогли к ней обращаться.
    let blog1: BlogViewModel
    let blog2: BlogViewModel

    //Проверка post - blogs + валидация + авторизацию.
    //status 201
    it('Should create 2 new blogs and return status 201.', async () => {

        //создаем валидный объект
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(createBlog)
            .expect(201)
        //console.log(res.body)
        //записываем в переменную.
        blog1 = res.body

        //проверим что наши свойства объекта создались правильно.
        expect(res.body).toEqual(
            expect.objectContaining(createBlog)
        )

        //проверим что новый объект создался
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [blog1])

        //Создадим 2 объект
        const res2 = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(createBlog)
            .expect(201)

        //записываем в переменную.
        blog2 = res2.body

        //проверим что наши свойства объекта создались правильно.
        expect(blog2).toEqual(
            expect.objectContaining(createBlog)
        )

        //проверим что новый объект создался
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [blog1, blog2])
    })

    //status 400
    it('Should return status 400 if the data is invalid', async () => {
        //Проверка не валидный name
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "name": createdString(16),
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            }).expect(400, {"errorsMessages": [{"message": "string of 3 to 15 symbol.", "field": "name"}]})

        //Проверка не валидный description
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "name": "string",
                "description": createdString(501),
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            }).expect(400, {"errorsMessages": [{"message": "string of 3 to 500 symbol.", "field": "description"}]})

        //Проверка не валидный websiteUrl
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "http://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce",
            }).expect(400, {"errorsMessages": [{"message": "The URL must be https://", "field": "websiteUrl"}]})

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "name": createdString(16),
                "description": createdString(501),
                "websiteUrl": createdString(101),
            }).expect(400)

        //Проверяем только field с указанием ошибки.
        expect(res.body.errorsMessages.length).toEqual(3)
        expect(res.body.errorsMessages[0].field).toEqual('name')
        expect(res.body.errorsMessages[1].field).toEqual('description')
        expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')

        //Запрос на получение глобальной переменной
        const getRes = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)

        //Т.к я раннее в тесте пытался создать новый блог,
        //проверка записал ли я данные в глобальную переменную.
        expect([blog1, blog2]).toEqual(getRes.body)
    })

    //status 401 Unauthorized
    it('Should return status 401 not authorized when creating a new object', async () => {

        //создаем валидный объект без авторизации
        await req
            .post(SETTINGS.PATH.BLOGS)
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
            .expect(401, {error: 'Authentication required'})

        //создаем валидный объект с неверным логином/паролем
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth + '1234')//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
            .expect(401, {error: 'wrong login or password'})
    })

    //Проверка get id
    //status 200
    it('Should return status 200 search by id', async () => {
        await req
            .get(SETTINGS.PATH.BLOGS + '/' + blog1.id)
            .expect(200, blog1)
    })

    //status 404
    it('Should return status 404 search by id', async () => {
        await req
            .get(SETTINGS.PATH.BLOGS + '66b8973ceb87400953ab00bf')
            .expect(404)
    })

    //Проверка put
    //status 204
    it('Should return status 204 if the update data is valid', async () => {

        //Обновить объект валидными данными
        await req
            .put(SETTINGS.PATH.BLOGS + '/' + blog1.id)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(updateBlogs)
            .expect(204)

        //проверим что наши свойства объекта создались правильно.
        await req
            .get(SETTINGS.PATH.BLOGS + '/' + blog1.id)
            .expect(200, {
                ...blog1,
                "name": "New string",
                "description": "New string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })

        //обновляем createBlog1 c новыми данными.
        blog1 = {...blog1, ...updateBlogs}

        //запросить данные через get id
        const newBlog = await req
            .get(SETTINGS.PATH.BLOGS + '/' + blog1.id)
            .expect(200)
        //сравнить полученные данные с переменной для тестов.
        expect(newBlog.body).toEqual(blog1)

    })

    //Проверка delete
    //status 204
    it('Should return status 204, upon successful delete', async () => {
        //Удалить объект
        await req
            .delete(SETTINGS.PATH.BLOGS + '/' + blog1.id)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .expect(204)

        //пробуем найти наш блог
        await req
            .get(SETTINGS.PATH.BLOGS + '/' + blog1.id)
            .expect(404)

        //проверяем массив должен остаться 1 объект
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [blog2])

    })
})

