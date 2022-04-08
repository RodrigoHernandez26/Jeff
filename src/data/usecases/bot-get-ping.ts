import { GetBotPingService } from "../../domain/usecases/get-bot-ping-service";
import { GetBotPingRepository } from "../protocols/bot/get-ping";

export default class GetBotPing implements GetBotPingService {

    constructor(
        private readonly getBotPing: GetBotPingRepository
    ) {}

    ping(): number {
        console.log('aaaaa')
        return Math.round(this.getBotPing.getPing()) 
    }
}