import { OperationI } from './operation.js'
import { AuthenticationI } from './authentication.js'

export class Config implements ConfigI {
    operation: OperationI
    authentication: AuthenticationI

    constructor(operation: OperationI, authentication: AuthenticationI) {
        this.operation = operation
        this.authentication = authentication
    }

}

export interface ConfigI {
    operation: OperationI
    authentication: AuthenticationI
}