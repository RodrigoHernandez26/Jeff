import { CommandInteraction, Message, MessageEmbed } from "discord.js";

export default class MessageHelper {

    private message: Message | CommandInteraction;

    constructor(message: Message | CommandInteraction) {
        this.message = message;
    }

    async reply(embed: MessageEmbed, ephemeral: boolean = false): Promise<Message | CommandInteraction> {
        await this.message.reply({ embeds: [embed], ephemeral })
        return this.message
    }

    async editReply(embed: MessageEmbed): Promise<Message | CommandInteraction> {
        if (!(this.message instanceof CommandInteraction)) {
            await this.message.edit({embeds:[embed]})
            return this.message
        }

        await this.message.editReply({ embeds: [embed] })
        return this.message
    }
}