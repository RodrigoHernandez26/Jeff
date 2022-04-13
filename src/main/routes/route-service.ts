import { RouteBuilder } from "./route-builder";
import { Exchange } from "@/presentation/protocols/exchange";
import { Processor } from "@/presentation/protocols/processor";

export class RouteService {
    private static instance: RouteService
    private _routes: Map<string, RouteBuilder> = new Map();

    private constructor() {}

    public static getInstance(): RouteService {
        if (!RouteService.instance) RouteService.instance = new RouteService()
        return RouteService.instance
    }

    private initializeRoutes(routes: RouteBuilder[]): void {
        routes.forEach(route => route.start())
        console.log(`Routes started: ${Array.from(this._routes.keys())}`)
    }

    public static start(...routes: RouteBuilder[]): void {
        RouteService.getInstance().initializeRoutes(routes)
    }

    public get routes(): Map<string, RouteBuilder> {
        return this._routes
    }

    public getRoute(route: string): RouteBuilder {
        const routeBuilder = this._routes.get(route)
        if (!routeBuilder) throw new Error(`ROUTE_NOT_FOUND`)
        return routeBuilder
    }

    public addRoute(route: string[] | string, routeBuilder: RouteBuilder): RouteBuilder {
        route = Array.isArray(route) ? route : [route]
        route.forEach(r => this._routes.set(r, routeBuilder))
        return routeBuilder
    }

    public async execute(route: string, exchange: Exchange): Promise<RouteBuilder> {
        const routeBuilder: RouteBuilder = this.getRoute(route)
        for (let i = 0; i < routeBuilder.steps.length; i++) {
            if (exchange.isInterrupted) break
            const step: Processor | RouteBuilder = routeBuilder.steps.get(i)!
            if (step instanceof RouteBuilder) {
                step.configure()
                continue
            }
            await step.process(exchange)

        }
        return routeBuilder
    }
}
