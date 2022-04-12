import Yallist from "yallist";
import { Processor } from "@/presentation/protocols/processor";
import { RouteService } from "./route-service";

export abstract class RouteBuilder {

    private routeService: RouteService = RouteService.getInstance()
    private _steps: Yallist<Processor | RouteBuilder> = new Yallist()

    public abstract configure(): void

    public start(): void {
        this.configure()
    }

    public from(route: string[] | string): RouteBuilder {
        return this.routeService.addRoute(route, this)
    }

    public to(routeString: string): RouteBuilder {
        const route: RouteBuilder = this.routeService.getRoute(routeString)
        this._steps.push(route)
        return this
    }

    public process(processor: Processor): RouteBuilder {
        this._steps.push(processor)
        return this
    }

    public get steps(): Yallist<Processor | RouteBuilder> {
        return this._steps
    }

}
