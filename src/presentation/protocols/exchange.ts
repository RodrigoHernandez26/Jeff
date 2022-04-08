import { CommandInteraction, Message } from "discord.js";
import Yallist from "yallist";
import { Options, Processor } from "./processor";

export class Exchange {
    message: Message | CommandInteraction
    options: Options
    steps: Yallist<Processor> | undefined

    constructor(message: Message | CommandInteraction, options: Options) {
        this.message = message
        this.options = options
    }

    public start() {
        if (!this.steps || !this.steps.head) throw new Error('No steps to process')
        this.steps.head.value.process(this)
    }

    public get next(): Function {
        if (!this.steps) throw new Error('No steps to process')
        if (!this.steps.head || !this.steps.head.next) return () => {}

        const process = this.steps.head.next.value.process.bind(this, this)
        this.steps.shift()
        return process
    }
}