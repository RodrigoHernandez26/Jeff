import { BOT } from "./config/env";
import Bot from "@/infra/bot/bot";
import { EventHandler } from "./event";
import { GuildServices, MessageServices, VoiceServices } from "@/infra/bot/services";
import { Client } from "discord.js";
import { RouteService } from "./routes/route-service";
import { default as server } from "./server";

export default class App {

    static bot: Bot = new Bot(BOT.TOKEN, async (client: Client) => {
        console.log(`BOT ONLINE - Total guilds: ${client.guilds.cache.size}`);

        new EventHandler(
            client,
            new MessageServices(client),
            new GuildServices(client),
            new VoiceServices(client)
        );
        RouteService.start()

        server()
    })
}
