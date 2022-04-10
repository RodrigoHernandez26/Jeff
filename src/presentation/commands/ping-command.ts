import { GetBotPingService } from "@/domain/usecases/get-bot-ping-service";
import { Processor } from "@/presentation/protocols/processor";
// import { GenericEmbed, GenericError } from "../helpers/embed-helper";
// import MessageHelper from "../helpers/message-helper";
import { Exchange } from "../protocols/exchange";
import MessageHelper from "@/presentation/helpers/message-helper";
import { GenericEmbed, GenericError } from "@/presentation/helpers/embed-helper";
import { Message } from "discord.js";

export class PingCommand implements Processor {

    readonly proprieties: Processor.Properties = {
        names: ['ping'],
        description: 'Test ping'
    }

    constructor(private getPingService: GetBotPingService) {}

    async process(exchange: Exchange): Promise<void> {
        const message: Message = <Message> exchange.getMessage(Message)
        try {
            await new MessageHelper(message).reply(GenericEmbed(`${this.getPingService.ping()}`))
        } catch(error: any) {
            switch(error.message) {
                default:
                    await new MessageHelper(message).reply(GenericError())
            }
        }
    }

}
