import {Router} from "express";
import {delTestingController} from "./delTestingController";

export const testingRouter = Router()

testingRouter.delete('/', delTestingController)