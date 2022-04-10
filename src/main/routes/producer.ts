import { RouteService } from "@/main/routes/route-service";
import { Exchange } from "@/presentation/protocols/exchange";
import { RouteBuilder } from "@/main/routes/route-builder";

export class Producer {

    private context: RouteService = RouteService.getInstance();

    public async produce(route: string, exchange: Exchange): Promise<RouteBuilder> {
        return await this.context.execute(route, exchange);
    }

}
