export class FileDocument {
    public id: number;
    public name: String;
    public type: String;
    public subject: String;
    public link: String;
    public creatorUserId: String;

    constructor(id= 0, name, type, subject, link, creatorUserId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.subject = subject;
        this.link = link;
        this.creatorUserId = creatorUserId;
    }
}
