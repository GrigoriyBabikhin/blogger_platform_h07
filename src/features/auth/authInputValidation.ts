import {loginOrEmailValidations, passwordBodyValidations} from "../users/usersInputValidations";
import {inputCheckErrorsMid} from "../../utilities/inputCheckErrors/inputCheckErrorsMid";

export const authInputValidation = () => [
    passwordBodyValidations, loginOrEmailValidations, inputCheckErrorsMid
]



