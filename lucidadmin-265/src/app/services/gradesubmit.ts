export class GradeSubmit {
    private _username: String;
    private _subject: String;
    private _type: String;
    private _value: number;

    get username(): String {
        return this._username;
    }

    set username(value: String) {
        this._username = value;
    }

    get subject(): String {
        return this._subject;
    }

    set subject(value: String) {
        this._subject = value;
    }

    get type(): String {
        return this._type;
    }

    set type(value: String) {
        this._type = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    constructor(username: String, subject: String, type: String, value: number) {
        this._username = username;
        this._subject = subject;
        this._type = type;
        this._value = value;
    }
}