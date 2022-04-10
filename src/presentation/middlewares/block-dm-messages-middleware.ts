import { Processor } from "@/presentation/protocols/processor";
import { Exchange } from "../protocols/exchange";
import { Message } from "discord.js";

export default class BlockDmMessagesMiddleware implements Processor {
    proprieties: Processor.Properties | undefined
    async process(exchange: Exchange): Promise<void>{
        const message: Message = <Message> exchange.getMessage(Message)
        try {
            if (message.channel!.type === "DM") {
                await message.reply("This command can't be used in DM channels.");
                exchange.stopRoute()
            }
        } catch (error: any) {
            switch (error.message) {
                default:
                    message.channel!.send("An error occurred.");
            }
        }
    }

}
