export class Data {
    constructor(
        public id: Date,
        public user: {
            name: string,
            password: string
        },
        public album: {
            name: string,
            song: string,
            artist: string,
            time: string
        }
    ){}
}