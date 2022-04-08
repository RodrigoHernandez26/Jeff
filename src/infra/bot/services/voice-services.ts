import { Client, VoiceState } from "discord.js";
import { BotServer, VoiceStateUpdateFunction } from "../protocols";

export class VoiceServices implements BotServer {

    client: Client;

    constructor(client: Client) {
        this.client = client
    }

    voiceStateUpdate(callback: VoiceStateUpdateFunction) {
        this.client.on('voiceStateUpdate', (oldState: VoiceState, newState: VoiceState) => {
            callback(oldState, newState)
        })
    }

}