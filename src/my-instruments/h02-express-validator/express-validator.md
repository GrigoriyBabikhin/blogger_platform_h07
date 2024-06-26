# Установка пакета express-validator.  
В терминале - устанавливаем локально.
```bash
yarn add express-validator
```

# Пример как пользоваться `options?:`  .
```ts
array(options?: { onlyFirstError?: boolean }): T[] 
```
# array({onlyFirstError: true})}) вернет только первую ошибку.
```ts
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputCheckErrorsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //array({onlyFirstError: true})}) вернет только первую ошибку.
        res.status(400).json({errors: errors.array({onlyFirstError: true})});
        return
    } else {
        next()
    }
}
```

# Пример как пользоваться  `.withMessage` выводить сообщение по конкретной ошибке.

```ts
export const websiteUrlValidation = body('websiteUrl')
    .isString().withMessage('There should be a string')
    .trim().isURL().withMessage('The URL must be https://')
    .isLength({min: 10, max: 100}).withMessage('string of 10 to 100 symbol.')
```
