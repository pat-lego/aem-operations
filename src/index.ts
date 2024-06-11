import chalk from "chalk";
import { IteratorManager } from "./internal/iterator/iterator-manager.js"
import { ConfigReader } from "./yml/config-reader.js"

const main = async (args: string[]) => {
    console.log(chalk.green(`Config file initizializing`))
    const configFilePath = getConfigFilePath(args)
    const configReader = new ConfigReader(configFilePath)
    const config = configReader.getConfig()
    console.log(chalk.green(`Config file initialized`))

    console.log(chalk.green(`Starting process on server ${config.authentication.server.host}`))
    const iterator = new IteratorManager(config).getIterator(config.operation.itereator)
    await iterator.iterate([])
    console.log(chalk.green(`Completed process on server ${config.authentication.server.host}`))
}

const getConfigFilePath = (args: string[]): string =>  {
    const result = args[2]
    if (result) {
        return result
    }
    throw new Error('Missing config file path in the arguments for the command line')
}

main(process.argv)
