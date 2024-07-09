import {agent} from 'supertest';
import {app} from "../app";

export const req = agent(app)