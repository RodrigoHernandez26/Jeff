import { Processor } from "@/presentation/protocols/processor"
import VerifyTextChannelPermissionsMiddleware from "../../../presentation/middlewares/verify-text-channel-permissions-middleware"

export const makeVerifyTextChannelPermissionsMiddleware = (): Processor => {
    return new VerifyTextChannelPermissionsMiddleware()
}