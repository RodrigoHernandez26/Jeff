import { Client, Guild } from "discord.js";
import { BotServer, GuildFunction } from "../protocols";

export class GuildServices implements BotServer {

    client: Client;

    constructor(client: Client) {
        this.client = client
    }

    guildCreate(callback: GuildFunction) {
        this.client.on('guildCreate', (guild: Guild) => {
            callback(guild)
        })
    }

    guildDelete(callback: GuildFunction) {
        this.client.on('guildDelete', (guild: Guild) => {
            callback(guild)
        })
    }

}