import {req} from "./test-helpers";
import {SETTINGS} from "../settings";

describe('/blogs', () => {
    //зачистка базы данных для тестов.
    beforeAll(async () => {
        await req.delete('/__test__/blogs')
    })

    it('Should return an empty array.', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [])
        //console.log('Must return the video:', res.body)
    })

    it('Return 404 if there is no blogs', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/1')
            .expect(404)
        //console.log('Return 404 if there is no video', res.body)
    })

    //Проверка createBlogController
    //Проверка на авторизацию 'admin:qwerty'
    it('Создать заголовок ', async () => {
        const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH)
        const codedAuth = buff2.toString('base64')
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic ' + codedAuth)//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5
            .expect(400)
        console.log(res.body)
        expect(res.status).toBe(400)
    })


})