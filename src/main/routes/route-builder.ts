import Yallist from "yallist";
import App from "../main";
import { Processor } from "../../presentation/protocols/processor";
import { RouteService } from "./route-service";

export abstract class RouteBuilder { 

    private routeService: RouteService = App.routeService
    private _steps: Yallist<Processor> = new Yallist()
    
    public abstract configure(): void

    public from(route: string[] | string): RouteBuilder {
        return this.routeService.addRoute(route, this)
    }

    public to(routeString: string): RouteBuilder {
        const route: RouteBuilder = this.routeService.getRoute(routeString)
        return this.process(route._steps.toArray())
    }

    public process(processors: Processor | Processor[]): RouteBuilder {
        processors = Array.isArray(processors) ? processors : [processors]
        processors.map(processor => this._steps.push(processor))
        return this
    }

    public get steps(): Yallist<Processor> {
        return this._steps
    }

}