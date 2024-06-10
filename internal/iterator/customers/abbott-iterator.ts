import { Config } from "../../../config";
import { DataFetcher } from "../../http/http-client";
import { IteratorA } from "../iterator";

export class AbbottIterator extends IteratorA {

    fetcher: DataFetcher
    config: Config

    constructor(fetcher: DataFetcher, config: Config) {
        super(fetcher, config)
    }

    shouldContinue(path: string, data: any): boolean {
        if (path.endsWith("jcr:content") || path.endsWith("rep:policy")) {
            return false
        }
        return true
    }

    shouldOperate(path: string, data: any): boolean {
        if (path.endsWith("jcr:content") && data["sling:resourceType"] === "wcm/launches/components/launch" && data["sourceRootResource"].includes("corelaboratory")) {
            return true;
        }
        return false
    }

    operate(path: string): void {
        path = path.replace("/jcr:content", "")

        console.log(`About to delete path ${path}`)
        this.client.post(path, ":operation=delete")
        console.log(`Deleted path ${path}`)
    }

    getName(): string {
        return 'Abbott'
    }

}