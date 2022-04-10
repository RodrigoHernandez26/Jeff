import { makePingCommand } from "../factories/messages/make-ping-command";
import { makeBlockDmMessagesMiddleware } from "../factories/middleware/make-block-dm-messages-middleware";
import { makeVerifyTextChannelPermissionsMiddleware } from "../factories/middleware/make-verify-text-channel-permissions-middleware";
import { Processor } from "../../presentation/protocols/processor";
import { RouteBuilder } from "./route-builder";

export class PingRouteBuilder extends RouteBuilder {

    private processor: Processor = makePingCommand();
    
    public configure(): void {
        this.from(this.processor.proprieties?.names!)
            .process(makeVerifyTextChannelPermissionsMiddleware())
            .process(makeBlockDmMessagesMiddleware())
            .process(this.processor)
    }

}
