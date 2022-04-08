import { RouteBuilder } from "./route-builder";
import * as routesIndex from './'
import { Exchange } from "@/presentation/protocols/exchange";

export class RouteService {
    private static instance: RouteService
    private routesIndex = Object.values(routesIndex)
    private routes: Map<string, RouteBuilder> = new Map();

    public static getInstance(): RouteService {
        if (!RouteService.instance) {
            RouteService.instance = new RouteService()
        }
        return RouteService.instance
    }

    configure(): void{
        this.routesIndex.map(route => new route().configure())
    }

    public getRoute(route: string): RouteBuilder{
        const routeBuilder = this.routes.get(route)
        if(!routeBuilder) throw new Error(`ROUTE_NOT_FOUND`)
        return routeBuilder
    }
        
    public addRoute(route: string[] | string, routeBuilder: RouteBuilder): RouteBuilder {
        route = Array.isArray(route) ? route : [route]
        route.map(r => this.routes.set(r, routeBuilder))
        return routeBuilder
    }

    execute(route: string, exchange: Exchange): RouteBuilder {
        const routeBuilder: RouteBuilder = this.getRoute(route)
        exchange.steps = routeBuilder.steps
        exchange.start()
        return routeBuilder
    }
}