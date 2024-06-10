import fs from 'fs'
import yaml from 'yaml'
import { Operation } from '../operation'
import { Config, ConfigI } from '../config'
import { Authentication } from '../authentication'

export class ConfigReader {
    yaml: any

    constructor(configFile: string) {
        const config = fs.readFileSync(configFile, { encoding: 'utf-8'})
        this.yaml = yaml.parse(config)
    }

    getConfig(): ConfigI {
        const operation = Operation.create(this.yaml.operation.root, this.yaml.operation.iterator)
        const authentication = new Authentication(this.yaml.authentication.server.host, 
                        this.yaml.authentication.credentials.username,
                        this.yaml.authentication.credentials.password)

        return new Config(operation, authentication)
    }
}