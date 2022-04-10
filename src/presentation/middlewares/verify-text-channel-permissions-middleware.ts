import { Processor } from "@/presentation/protocols/processor"
import { Exchange } from "../protocols/exchange"
import { Message } from "discord.js";

export default class VerifyTextChannelPermissionsMiddleware implements Processor {
    proprieties: Processor.Properties | undefined
    async process(exchange: Exchange): Promise<void> {
        const message: Message = <Message> exchange.getMessage(Message)
        const channel = message.channel! as any
        if (!channel.permissionsFor(message.guild!.me).has("SEND_MESSAGES")) exchange.stopRoute()
    }
}
