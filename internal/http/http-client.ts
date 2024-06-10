import { ConfigI } from "../../config";
import fetch from "node-fetch";

export class DataFetcher {
    config: ConfigI

    constructor(config: ConfigI) {
        this.config = config
    }

    async post(path: string, body: string): Promise<string> {
        let res = await fetch(path, {
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

    async get(path?: string): Promise<any> {
        let res

        if (path) {
            path = `${this.config.authentication.server.host}${path}`
        } else {
            path = `${this.config.authentication.server.host}${this.config.operation.root}`
        }

        res = await fetch(path, {
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