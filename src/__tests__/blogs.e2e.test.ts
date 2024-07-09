import {req} from "./test-helpers";
import {SETTINGS} from "../settings";
import {codedAuth, createdString} from "./helpers/data-test";
import {codedAuthBase64} from "../global-middiewares/adminAuthentication";

describe('/blogs', () => {
    //зачистка базы данных для тестов.
    beforeAll(async () => {
        await req.delete('/__test__/blogs')
    })

    //Проверка get-blogs
    it('Should return empty array and status 200', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [])
        //console.log('Must return the video:', res.body)
    })

    //создаем пустые переменные
    let createBlogs1: any = null
    let createBlogs2: any = null


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
        createBlogs1 = res.body

        //проверим что наши свойства объекта создались правильно.
        expect(createBlogs1).toEqual(
            expect.objectContaining({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
        )

        //проверим что новый объект создался
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [createBlogs1])
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

        //Проверка невалидный description
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "name": "string",
                "description": createdString(501),
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            }).expect(400, {"errorsMessages": [{"message": "string of 3 to 500 symbol.", "field": "description"}]})

        //Проверка невалидный websiteUrl
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "http://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce",
            }).expect(400, {"errorsMessages": [{"message": "The URL must be https://", "field": "websiteUrl"}]})

        //проверка на то объект не изменился.
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [createBlogs1])
    })

    //status 401 Unauthorized
    it('Should return status 401 not authorized', async () => {

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
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth + '1234')//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
            })
            .expect(401, {error: 'wrong login or password'})

    })


})