import { GetBotPingService } from "@/domain/usecases/get-bot-ping-service";
import { Processor } from "@/presentation/protocols/processor";
import { GenericEmbed, GenericError } from "../helpers/embed-helper";
import MessageHelper from "../helpers/message-helper";
import { Exchange } from "../protocols/exchange";

export class PingCommand implements Processor {

    readonly proprieties: Processor.Properties = {
        names: ['ping'],
        description: 'Test ping'
    }

    constructor(private getPingService: GetBotPingService) {}

    async process(exchange: Exchange): Promise<void> {
        try {
            await new MessageHelper(exchange.message).reply(GenericEmbed(`${this.getPingService.ping()}`))
        } catch(error: any) {
            console.log(error)
            switch(error.message) {
                default:
                    await new MessageHelper(exchange.message).reply(GenericError())
            }
        }
    }

}