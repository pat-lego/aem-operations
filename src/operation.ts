export class Operation implements OperationI {
    root: string
    itereator: string

    constructor(root: string, itereator: string) {
        this.root = root
        this.itereator = itereator
    }

    static create(root: string, itereator: string): Operation {
        return new Operation(root, itereator)
    }
}

export interface OperationI {
    root: string
    itereator: string
}
