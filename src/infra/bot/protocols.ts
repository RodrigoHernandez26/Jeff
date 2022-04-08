import { Client, Guild, Interaction, Message, VoiceState } from "discord.js";

export type StartCallbackFunction = (client: Client) => void;
export type MessageCreateFunction = (message: Message) => void;
export type InteractionCreateFunction = (interaction: Interaction) => void;
export type GuildFunction = (guild: Guild) => void;
export type VoiceStateUpdateFunction = (oldState: VoiceState, newState: VoiceState) => void;

export interface BotServer {
    client: Client;
}