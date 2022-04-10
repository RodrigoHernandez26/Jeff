import { RouteService } from "@/main/routes/route-service";

export interface Exchange {

    readonly context: RouteService
    readonly properties: Map<string, Object>

    setMessage(...obj: Object[]): void
    getMessage(type?: any): Object | undefined
    setProperty(key: string, value: Object): void
    getProperty(key: string): Object | undefined
    stopRoute(): void
    get isInterrupted(): boolean
}
