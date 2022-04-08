import { BOT } from "./config/env";
import Bot from "@/infra/bot/bot";
import { EventHandler } from "./event";
import { GuildServices, MessageServices, VoiceServices } from "@/infra/bot/services";
import { Client } from "discord.js";
import { RouteService } from "./routes/route-service";

export default class App {
    static routeService: RouteService = RouteService.getInstance()
    static bot: Bot = new Bot(BOT.TOKEN, async (client: Client) => {
        new EventHandler(
            client,
            new MessageServices(client),
            new GuildServices(client),
            new VoiceServices(client)
        );
        App.routeService.configure()
    })
}
