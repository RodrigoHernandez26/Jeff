import { Exchange } from "./exchange";

export type Options = {
    args?: Array<string>
    [key: string]: any 
}

export interface Processor { 
    readonly proprieties: Processor.Properties | undefined;
    process(exchange: Exchange): Promise<void>
}

export namespace Processor {
    export type Properties = {
        names: Array<string>
        description: string
    }

}
