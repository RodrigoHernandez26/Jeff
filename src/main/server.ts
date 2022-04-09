import { HTTP } from "@/main/config/env";
import Express from "../infra/http/express";

export default () => {
    const app = Express.getInstance().app
    
    app.listen(HTTP.PORT, () => {
        console.log(`HTTP Server running on port ${HTTP.PORT}`)
    })
};