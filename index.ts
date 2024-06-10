import { DataFetcher } from "./internal/http/http-client";
import { IteratorManager } from "./internal/iterator/iterator-manager";
import { ConfigReader } from "./yml/config-reader";

const main = async () => {
    console.log(`Config file initizializing`)
    const configReader = new ConfigReader("/Users/patriquelegault/Desktop/datafile.yml")
    const config = configReader.getConfig()
    console.log(`Config file initialized`)

    console.log(`Starting process on server ${config.authentication.server.host}`)
    const fetcher = new DataFetcher(config)
    let paths: string[] = []
    const iterator = new IteratorManager(config).getIterator(config.operation.itereator)
    paths = await iterator.iterate(paths)
    console.log(`Completed process on server ${config.authentication.server.host}`)
}

main()
