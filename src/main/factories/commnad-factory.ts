import { CommandInteraction, Message } from "discord.js";
import App from "../main";

export class CommandFactory {

    static async factory(message: Message | CommandInteraction, command: string, args: Array<string> | null): Promise<void> {

        const routerService = App.routeService
        try {
            routerService.execute(command, message, { args })
        } catch (error) {
            console.log(error)
            // const commandsSugestions = this.checkMispelled(command);
            // if (!commandsSugestions) makeInvalidCommand().execute(message, { args })
        }

    }

    // static checkMispelled(command: string): string[] | null {
    //     const rating = []
    //     const commandName = App.bot.getCommandsName()

    //     for (let a of commandName) {
    //         let d = Utils.levenshteinDistance(a, command)
    //         let obj: any = {}
    //         obj[a] = d
    //         rating.push(obj)
    //     }

    //     let lowerValue: number = Math.min.apply(Math, rating.map(o => Object.values(o)[0]) as number[])
    //     let lowerCommands: any[] = rating.filter(o => Object.values(o)[0] === lowerValue)

    //     if (lowerCommands.length == commandName.length || lowerValue > 3) // The closer to 0, the more similar
    //         return null
        
    //     let probableCommands: string[] = []
    //     lowerCommands.map(e => {  probableCommands.push(Object.keys(e)[0]) })
        
    //     return probableCommands
    // }

}
