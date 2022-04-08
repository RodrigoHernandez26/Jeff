import { Client, Interaction, Message } from "discord.js";
import { BotServer, InteractionCreateFunction, MessageCreateFunction } from "../protocols";

export class MessageServices implements BotServer {

    client: Client;

    constructor(client: Client) {
        this.client = client
    }

    messageCreate(callback: MessageCreateFunction) {
        this.client.on('messageCreate', (message: Message) => {
            callback(message)
        })
    }

    interactionCreate(callback: InteractionCreateFunction) {
        this.client.on('interactionCreate', (interaction: Interaction) => {
            callback(interaction)
        })
    }

}