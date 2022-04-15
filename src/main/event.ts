import { GuildServices, MessageServices, VoiceServices } from "@/infra/bot/services";
import { Exchange } from "@/presentation/protocols/exchange";
import { Client, Guild, Interaction, Message, VoiceState } from "discord.js";
import { BOT } from "./config/env";
import { DefaultExchange } from "@/presentation/protocols/default-exchange";
import { Producer } from "@/main/routes/producer";
import { RouteService } from "@/main/routes/route-service";

export class EventHandler {

    client: Client
    private producer: Producer = new Producer()

    constructor(
        client: Client,
        messageServices: MessageServices,
        guildServices: GuildServices,
        voiceServices: VoiceServices
    ) {
        this.client = client

        messageServices.messageCreate(this.onMessage.bind(this))
        messageServices.interactionCreate(this.onInteraction.bind(this))

        guildServices.guildCreate(this.onGuildAdd.bind(this))
        guildServices.guildDelete(this.onGuildRemove.bind(this))
        
        voiceServices.voiceStateUpdate(this.onVoiceStateUpdate.bind(this))
    }

    onMessage(message: Message): void {
        if (message.author.bot && !message.content.startsWith(BOT.PREFIX)) return

        const args: Array<string> = message.content.split(" ")

        const command: string = args[0].split(BOT.PREFIX)[1]
        if (!command) return

        args.shift()

        const exchange: Exchange = new DefaultExchange(RouteService.getInstance())
        exchange.setMessage(message, args)
        exchange.setProperty("args", args)

        try {
            this.producer.produce(command.toLowerCase(), exchange)
        } catch (error: any) {
            switch(error.message) {
                case 'ROUTE_NOT_FOUND':
                    console.log('check misspeleted command'); break;
                default:
                    console.log('default error message'); break;
            }
        }
    }

    onInteraction(interaction: Interaction): void {
        if (interaction.isCommand()) {

            // const exchange: Exchange = new Exchange(interaction, {})
            // try {
            //     App.routeService.execute(interaction.commandName, exchange)
            // } catch (error: any) {
            //     switch(error.message) {
            //         case 'ROUTE_NOT_FOUND':
            //             console.log('check misspeleted command'); break;
            //         default:
            //             console.log('default error message'); break;
            //     }
            // }
        }

    }

    onGuildAdd(_: Guild): void {}
    onGuildRemove(_: Guild): void {}
    onVoiceStateUpdate(_: VoiceState, __: VoiceState): void {}

    // onGuildAdd(guild: Guild){
    //     const numberGuilds: number = this.client.guilds.cache.size
    //     App.logger.send(LogTypeEnum.JOIN_NEW_GUILD, `Joined a new guild: ${guild.name} - Total servers: ${numberGuilds}`)
    //     try {
    //         for (const channel of guild.channels.cache.values()) {
    //             if (channel.isText())
    //                 if (channel.permissionsFor(guild.me!).has('SEND_MESSAGES')) {
    //                     channel.send({ embeds: [new SucessEmbed(`Hello, I'm ${App.bot.client.user?.username}! You can use ${BOT.PREFIX}help to see my commands 😉`).build()] })
    //                     break
    //                 }
    //         }
    //     } catch (e) {
    //         App.logger.send(LogTypeEnum.ERROR, `${e}`)
    //     }
    // }
    // onGuildRemove(guild: Guild){ App.logger.send(LogTypeEnum.REMOVE_GUILD, `Removed from guild: ${guild.name} - Total servers: ${this.client.guilds.cache.size}`) }

    // onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
    //     if (newState.guild.me && oldState.id == newState.guild.me.id && !newState.channelId && App.musicController.getOptionalQueue(oldState.guild.id)) {
    //         App.musicController.getOptionalQueue(oldState.guild.id)!.message.channel!.send({embeds:[new ErrorEmbed(`I have been kicked from the voice channel 🙁`).build()]})
    //         App.musicController.leaveAssert(oldState.guild.id)
    //     }
    //     if (!oldState.channel || !oldState.guild.me || !newState.guild.me) return

    //     if (newState.channelId === newState.guild.me.voice.channelId)
    //         return App.InactivityHandler.deleteAloneTimeout(newState.guild.id)
        
    //     if (oldState.channelId !== oldState.guild.me.voice.channelId) return
        
    //     if (!(oldState.channel.members.size - 1)) App.InactivityHandler.createAloneTimeout(oldState.guild.id, oldState)
    // }
}
