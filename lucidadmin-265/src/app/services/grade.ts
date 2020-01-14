export class Grade {
    private _username: String;
    private _subject: String;
    private _ds: number;
    private _tp: number;
    private _exam: number;

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

    get ds(): number {
        return this._ds;
    }

    set ds(value: number) {
        this._ds = value;
    }

    get tp(): number {
        return this._tp;
    }

    set tp(value: number) {
        this._tp = value;
    }

    get exam(): number {
        return this._exam;
    }

    set exam(value: number) {
        this._exam = value;
    }


    constructor(username: String, subject: String, ds: number, tp: number, exam: number) {
        this._username = username;
        this._subject = subject;
        this._ds = ds;
        this._tp = tp;
        this._exam = exam;
    }

    getSubjectGrade(){
        if (this.tp == -1){
            return (this.exam)*0.7+(this._ds)*0.3;
        } else {
            return (this.exam)*0.5+(this.ds)*0.17+(this.tp)*0.33;
        }
    }
}
