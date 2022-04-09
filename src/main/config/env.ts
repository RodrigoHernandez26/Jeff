import 'dotenv-flow/config'

export const BOT = {
    TOKEN: process.env.TOKEN || '',
    PREFIX: process.env.PREFIX || '',
    INVITE_URL: process.env.INVITE_URL || '',
}

export const LOG = {
    ENABLE: process.env.LOG === 'true',
    NEW_RELIC_KEY: process.env.NEW_RELIC_KEY || '',
}

export const PLAYER = {
    COOKIE: process.env.COOKIE || '',
    PLAYLIST_LIMIT: parseInt(process.env.PLAYLIST_LIMIT || '0', 10),
}

export const MISC = {
    YTB_BLOCK: process.env.YTB_BLOCK == "true" ? true : false,
    RETRIES: process.env.RETRIES ? (isNaN(parseInt(process.env.RETRIES)) ? 5 : parseInt(process.env.RETRIES)) : 5,
    TIMEOUT_RATE_LIMIT: process.env.TIMEOUT_RATE_LIMIT ? (isNaN(parseInt(process.env.TIMEOUT_RATE_LIMIT)) ? 60 * 60 * 1000 : parseInt(process.env.TIMEOUT_RATE_LIMIT)) : 60 * 60 * 1000, //1h
}

export const HTTP = {
    PORT: process.env.PORT ? isNaN(parseInt(process.env.PORT, 10)) ? 8080 : parseInt(process.env.PORT, 10) : 8080,
}