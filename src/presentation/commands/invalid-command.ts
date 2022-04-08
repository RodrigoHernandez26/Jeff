import { CommandInteraction, Message, MessageEmbed } from "discord.js"
import MessageHelper from "../helpers/message-helper"
import { Command, Options } from "../protocols/command"

export class InvalidCommand implements Command {
    readonly proprieties: Command.Properties | undefined

    async execute(message: Message | CommandInteraction, _options: Options): Promise<void> {
        await new MessageHelper(message).reply(new MessageEmbed({ title: '**Invalid Command**', color: 'RED', description: 'The command you have entered is invalid' }))
    }

}