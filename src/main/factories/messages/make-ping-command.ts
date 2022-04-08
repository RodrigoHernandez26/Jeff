import App from "@/main/main"
import { PingCommand } from "@/presentation/commands"
import GetBotPing from "@/data/usecases/bot-get-ping"

export const makePingCommand = () => {
    const bot = App.bot
    const getBotPing = new GetBotPing(bot)
    
    return new PingCommand(getBotPing)
}