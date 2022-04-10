import { GetBotPingRepository } from "@/data/protocols/bot/get-ping";
import { Client, Intents } from "discord.js";
import { StartCallbackFunction } from "./protocols";
// import { Event } from "../event/event";
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// import * as commands from '../commands'

export default class Bot implements GetBotPingRepository {

    client: Client = new Client({ 
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES],
        presence: {
            status: 'online',
            activities: [
                {
                    name: `good music`,
                    type: 'LISTENING',
                }
            ]
        }
    });
    
    // commands = Object.values(commands)
    // commandName: string[] = this.commands.map(command => command.name)
    // slashCommands = this.commands.map(command => {
    //     return {
    //         name: command.properties.name,
    //         description: command.properties.description,
    //         options: command.properties.options
    //     }
    // })

    constructor(private token: string, cb: StartCallbackFunction){
        if (!token) throw new Error("Invalid token");
        
        this.client.login(token).then((res: string) => {
            if (res === this.token) { 
                // this.addSlashCommands();
                cb(this.client)
            }
            else throw new Error('Login error');         
        })
    }

    public getPing(): number { return this.client.ws.ping }

    // private async addSlashCommands(): Promise<void>{
    //     if (!this.client.user) throw new Error('User error')
            
    //     const rest = new REST({ version: '9' }).setToken(this.token);
    //     await rest.put(
    //         Routes.applicationCommands(this.client.user.id),
    //         { body: this.slashCommands }
    //     ); 
    // }


}
