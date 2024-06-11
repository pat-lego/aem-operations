import chalk from 'chalk'
import FormData from 'form-data'
import { Config } from "../../../config.js"
import { DataFetcher } from "../../http/http-client.js"
import { IteratorA } from "../iterator.js"

export class AbbottIterator extends IteratorA {

    fetcher: DataFetcher
    config: Config

    constructor(fetcher: DataFetcher, config: Config) {
        super(fetcher, config)
    }

    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
    shouldContinue(path: string, data: any): boolean {
        console.log(chalk.blue(`Processing path ${path}`))
        if (path.endsWith("jcr:content") || path.endsWith("rep:policy")) {
            return false
        }
        return true
    }
    
    /* eslint @typescript-eslint/no-explicit-any: off */
    shouldOperate(path: string, data: any): boolean {
        if (path.endsWith("jcr:content") && data["sling:resourceType"] === "wcm/launches/components/launch" && data["sourceRootResource"].includes("corelaboratory")) {
            return true;
        }
        return false
    }

    async operate(path: string): Promise<void> {
        path = path.replace("/jcr:content", "")

        console.log(chalk.yellow(`About to delete path ${path}`))
        const formData = new FormData()
        formData.append(":operation", "delete")
        await this.client.post(path, formData)
        console.log(chalk.yellow(`Deleted path ${path}`))
    }

    getName(): string {
        return 'Abbott'
    }

}