import { MessageEmbed } from "discord.js"

export const GenericError = (description?: string): MessageEmbed => {
    return new MessageEmbed({
        title: 'Error :(',
        color: 'RED',
        description: description ? `**${description}**` : '**Something went wrong**'
    })
}

export const GenericEmbed = (title: string, description?: string): MessageEmbed => {
    return new MessageEmbed({
        title: title,
        color: 'BLUE',
        description: description ? `**${description}**` : ''
    })
}