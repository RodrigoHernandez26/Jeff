import { RouteBuilder } from "./route-builder";
import * as routesIndex from './'
import { Exchange } from "@/presentation/protocols/exchange";

export class RouteService {
    private static instance: RouteService
    private routesIndex = Object.values(routesIndex)
    private _routes: Map<string, RouteBuilder> = new Map();

    private constructor() {}

    public static getInstance(): RouteService {
        if (!RouteService.instance) {
            RouteService.instance = new RouteService()
            RouteService.instance.init()
        }
        return RouteService.instance
    }

    private init(): void{
        this.routesIndex.map(route => new route().configure())
    }

    public static start(): void {
        RouteService.instance.init()
    }

    public get routes(): Map<string, RouteBuilder> {
        return this._routes
    }

    public getRoute(route: string): RouteBuilder{
        const routeBuilder = this._routes.get(route)
        if(!routeBuilder) throw new Error(`ROUTE_NOT_FOUND`)
        return routeBuilder
    }
        
    public addRoute(route: string[] | string, routeBuilder: RouteBuilder): RouteBuilder {
        route = Array.isArray(route) ? route : [route]
        route.map(r => this._routes.set(r, routeBuilder))
        return routeBuilder
    }

    public async execute(route: string, exchange: Exchange): Promise<RouteBuilder> {
        const routeBuilder: RouteBuilder = this.getRoute(route)
        for (let i = 0; i < routeBuilder.steps.length; i++) {
            if (exchange.isInterrupted) break
            await routeBuilder.steps.get(i)!.process(exchange)
        }
        return routeBuilder
    }
}
