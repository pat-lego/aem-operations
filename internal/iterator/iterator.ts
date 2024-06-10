import { Config } from "../../config"
import { DataFetcher } from "../http/http-client"

export abstract class IteratorA {
    abstract shouldContinue(path: string, data: any): boolean
    abstract shouldOperate(path: string, data: any): boolean
    abstract operate(path:string): void
    abstract getName(): string

    client: DataFetcher
    config: Config

    constructor(client: DataFetcher, config: Config) {
        this.client = client
        this.config = config
    }

    async iterate(paths: string[], path?: string): Promise<string[]> {
        let data: any
        try {
            if (path === undefined) {
                path = this.config.operation.root
            }
            data = await this.client.get(`${path}.1.json`)
        } catch (e) {
            console.error(`Failed to get data for path ${path}`)
            throw e
        }

        for (const key in data) {
            if (data[key] instanceof Object && this.shouldContinue(path, data[key])) {
                paths = await this.iterate(paths,`${path}/${key}`)
            }
        }

        if (this.shouldOperate(path, data)) {
            paths.push(path)
            this.operate(path)
        }

        return paths
    }

}