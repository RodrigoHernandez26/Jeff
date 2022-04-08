import { Processor } from "@/presentation/protocols/processor";
import { Exchange } from "../protocols/exchange";

export default class BlockDmMessagesMiddleware implements Processor {
    proprieties: Processor.Properties | undefined
    async process(exchange: Exchange): Promise<void>{
        try {
            if (exchange.message.channel!.type === "DM") {
                exchange.message.reply("This command can't be used in DM channels.");
                return;
            }
            exchange.next();
        } catch (error: any) {
            console.log(error)
            switch (error.message) {
                default:
                    exchange.message.channel!.send("An error occurred.");
            }
        }
    }
    
}