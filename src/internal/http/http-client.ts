import { ConfigI } from "../../config.js";
import fetch from "node-fetch";
import FormData from 'form-data'

export class DataFetcher {
    config: ConfigI

    constructor(config: ConfigI) {
        this.config = config
    }

    async post(path: string, body: FormData): Promise<string> {
        const res = await fetch(`${this.config.authentication.server.host}${path}`, {
            method: 'POST',
            body: body,
            headers: {
                'Authorization': 'Basic ' + this.getBase64Encoded(`${this.config.authentication.credentials.username}:${this.config.authentication.credentials.password}`)
            }
        })

        if (res.ok) {
            return 'Ok'
        }
        throw new Error(`Request to ${path} with response code ${res.status}`)
    }

    /* eslint @typescript-eslint/no-explicit-any: off */
    async get(path?: string): Promise<any> {
        if (path) {
            path = `${this.config.authentication.server.host}${path}`
        } else {
            path = `${this.config.authentication.server.host}${this.config.operation.root}`
        }

        const res = await fetch(path, {
            headers: {
                'Authorization': 'Basic ' + this.getBase64Encoded(`${this.config.authentication.credentials.username}:${this.config.authentication.credentials.password}`)
            }
        })

        if (res.ok) {
            const data = await res.json()
            return data
        }
        throw new Error(`Request to ${path} with response code ${res.status}`)

    }

    getBase64Encoded(encode: string) {
        return Buffer.from(encode).toString('base64')
    }
}