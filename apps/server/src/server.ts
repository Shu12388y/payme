import express,{Express} from "express";

export const app:Express = express()

// configure middleware
app.use(express.json());

