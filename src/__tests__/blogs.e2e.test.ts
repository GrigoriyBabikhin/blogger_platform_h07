import {req} from "./test-helpers";
import {SETTINGS} from "../settings";
import {codedAuth, createdString, updateBlogs} from "./helpers/data-test";


describe('/blogs', () => {
    //зачистка базы данных для тестов.
    beforeAll(async () => {
        await req.delete('/__test__/blogs')
    })

    //Проверка get-blogs
    it('Should return empty array and status 200', async () => {
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [])
    })

    //создали переменную для того чтобы другие тесты смогли к ней обращаться.
    let createBlog1: any = null;
    let createBlog2: any = null;

    //Проверка post - blogs
    //status 201
    it('Should create a new blog and return status 201', async () => {

        //создаем валидный объект
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
            .expect(201)

        //записываем в переменную.
        createBlog1 = res.body

        //проверим что наши свойства объекта создались правильно.
        expect(createBlog1).toEqual(
            expect.objectContaining({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
        )

        //проверим что новый объект создался
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [createBlog1])

        //Создадим 2 объект
        const res2 = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
            .expect(201)

        //записываем в переменную.
        createBlog2 = res2.body

        //проверим что наши свойства объекта создались правильно.
        expect(createBlog2).toEqual(
            expect.objectContaining({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
        )

        //проверим что новый объект создался
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [createBlog1, createBlog2])
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

        //Т.к я раннее в тесте обновил createBlog1,
        //проверка записал ли я данные в глобальную переменную.
        expect([createBlog1, createBlog2]).toEqual(getRes.body)
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
            .get(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
            .expect(200, createBlog1)
    })

    //status 404
    it('Should return status 404 search by id', async () => {
        await req
            .get(SETTINGS.PATH.BLOGS + '/1212')
            .expect(404)
    })

    //Проверка put
    //status 204
    it('Should return status 204 if the update data is valid', async () => {

        //Обновить объект валидными данными
        await req
            .put(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(updateBlogs)
            .expect(204)

        //проверим что наши свойства объекта создались правильно.
        await req
            .get(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
            .expect(200, {
                ...createBlog1,
                "name": "New string",
                "description": "New string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })

        //обновляем createBlog1 c новыми данными.
        createBlog1 = {...createBlog1, ...updateBlogs}

        //запросить данные через get id
        const newBlog = await req
            .get(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
            .expect(200)
        //сравнить полученные данные с переменной для тестов.
        expect(newBlog.body).toEqual(createBlog1)

    })

    //status 400
    it('Should return status 400 if the update data is not valid.', async () => {
        //обновим блог невалидными данными.
        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
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
            .get(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
            .expect(200, createBlog1)

        //Т.к я раннее в тесте обновил createBlog1,
        // проверка записал ли я данные в глобальную переменную.
        expect(createBlog1).toEqual(getRes.body)
    })

    //status 401 Unauthorized
    it('Should return 401 "Not Authorized" status when updating', async () => {

        //обновляем валидный объект без авторизации
        await req
            .put(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
            .expect(401, {error: 'Authentication required'})

        //создаем валидный объект с неверным логином/паролем
        await req
            .put(SETTINGS.PATH.BLOGS + '/' + createBlog1.id)
            .set('Authorization', 'Basic ' + codedAuth + '1234')//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
            .expect(401, {error: 'wrong login or password'})
    })

    //status 404 Not Found
    it('Must return, 404 Not Found', async () => {

        await req
            .put(SETTINGS.PATH.BLOGS + '/1212')
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send(updateBlogs)
            .expect(404)
    })
})

