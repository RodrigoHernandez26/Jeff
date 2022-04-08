import { Processor } from "@/presentation/protocols/processor"
import { Exchange } from "../protocols/exchange"

export default class VerifyTextChannelPermissionsMiddleware implements Processor {
    proprieties: Processor.Properties | undefined
    async process(exchange: Exchange): Promise<void> {
        const channel = exchange.message.channel! as any
        if (channel.permissionsFor(exchange.message.guild!.me).has("SEND_MESSAGES")) { exchange.next() }
    }
}