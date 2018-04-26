export class Message {
    constructor(
        public message: String,
        public userId: String,
        public interactorId: String,
        public time: Date
    ) { }
}
