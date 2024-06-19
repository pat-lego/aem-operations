import chalk from "chalk"
import { Config } from "../../config.js"
import { DataFetcher } from "../http/http-client.js"

export abstract class IteratorA {
    /* eslint @typescript-eslint/no-explicit-any: off */
    abstract shouldContinue(path: string, data: any): boolean
    abstract shouldOperate(path: string, data: any): boolean
    abstract operate(path:string): Promise<void>
    abstract getName(): string

    client: DataFetcher
    config: Config

    constructor(client: DataFetcher, config: Config) {
        this.client = client
        this.config = config
    }

    async invoke(): Promise<void> {
        const paths: string[] = await this.iterate([])
        for (const p of paths) {
            this.operate(p)
        }
    }

    async iterate(paths: string[], path?: string): Promise<string[]> {
        let data: any
        try {
            if (path === undefined) {
                path = this.config.operation.root
            }
            data = await this.client.get(`${path}.1.json`)
        } catch (e) {
            console.error(chalk.red(`Failed to get data for path ${path}`))
            throw e
        }

        for (const key in data) {
            if (data[key] instanceof Object && this.shouldContinue(path, data)) {
                paths = await this.iterate(paths,`${path}/${key}`)
            }
        }

        if (this.shouldOperate(path, data)) {
            paths.push(path)
            //await this.operate(path)
        }

        return paths
    }

}