import { Processor } from "@/presentation/protocols/processor"
import BlockDmMessagesMiddleware from "@/presentation/middlewares/block-dm-messages-middleware"

export const makeBlockDmMessagesMiddleware = (): Processor => {
    return new BlockDmMessagesMiddleware()
}
