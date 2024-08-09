class Evento {
    constructor(date, startTime, endTime, description){
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }
}

class Meeting extends Evento {
    constructor (date, startTime, endTime, description, members) {
        super (date, startTime, endTime, description);
        this.members = members;
    }
}