import express, { Application } from "express";
import helmet from "helmet";

export default class Express {
    private static _instance: Express;
    private express: Application = express();

    private constructor() { 
        this.express = express();
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(helmet());
    }

    static getInstance() {
        if (this._instance) 
            return this._instance;

        this._instance = new Express();
        return this._instance;
    }

    get app(): Application {
        return this.express;
    }
}
