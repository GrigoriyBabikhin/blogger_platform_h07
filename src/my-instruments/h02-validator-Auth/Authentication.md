# Headers &rarr; req &rarr; Authorization &rarr; Basic64 
![img_2.png](../image/img_2.png)

# В тестах нужно создать заголовок с помощью .set()
`.set('Authorization', 'Basic ' + codedAuth)`
//req.headers['authorization'] = Basic YWRtaW46cXdlcnR5

```ts
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
```