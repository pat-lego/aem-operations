import { ConfigI } from "../../config.js"
import { DataFetcher } from "../http/http-client.js"
import { IteratorA } from "./iterator.js"
import { AbbottIterator } from "./customers/abbott-iterator.js"

export class IteratorManager {
    iterators: IteratorA[] = []
    constructor(config: ConfigI) {
        const fetcher = new DataFetcher(config)
        this.iterators.push(new AbbottIterator(fetcher, config))
    }

    getIterator(name: string): IteratorA {
        for (const i of this.iterators) {
            if (name.toLocaleLowerCase() === i.getName().toLocaleLowerCase()) {
                return i
            }
        }

        throw new Error(`No iterator with name ${name}`)
    }
}