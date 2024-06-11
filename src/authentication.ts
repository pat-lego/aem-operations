export class Authentication implements AuthenticationI {
    server: ServerI
    credentials: CredentialsI

    constructor(host: string, username: string, password: string) {
        this.server = Server.create(host)
        this.credentials = Credentials.create(username, password)
    }

}

export interface AuthenticationI {
    server: ServerI
    credentials: CredentialsI
}

export class Server implements ServerI {
    host: string

    constructor(host: string) {
        this.host = host
    }

    static create(host: string): Server {
        return new Server(host)
    }
}

interface ServerI {
    host: string
}

export class Credentials implements CredentialsI {
    username: string
    password: string

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }

    static create(username: string, password: string): Credentials {
        return new Credentials(username, password)
    }

}

interface CredentialsI {
    username: string
    password: string
}