import {loginOrEmailValidations, passwordBodyValidations} from "../users/usersInputValidations";
import {inputCheckErrorsMid} from "../../utilities/Middleware/inputCheckErrors/inputCheckErrorsMid";

export const authInputValidation = () => [
    passwordBodyValidations, loginOrEmailValidations, inputCheckErrorsMid
]



