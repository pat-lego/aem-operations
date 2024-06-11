import { DataFetcher } from "./internal/http/http-client";
import { IteratorManager } from "./internal/iterator/iterator-manager";
import { ConfigReader } from "./yml/config-reader";

const main = async (args: string[]) => {
    console.log(`Config file initizializing`)
    const configFilePath = getConfigFilePath(args)
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

const getConfigFilePath = (args: string[]): string =>  {
    const result = args[2]
    if (result) {
        return result
    }
    throw new Error('Missing config file path in the arguments for the command line')
}

main(process.argv)
