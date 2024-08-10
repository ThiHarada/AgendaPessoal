const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

class Evento {
    constructor(date, startHour, startMinute, endHour, endMinute, name, description){
        this.date = date;
        this.startMinute = startMinute;
        this.startHour = startHour
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.name = name;
        this.description = description;
    }

    //horario do evento em minutos, usado para as notificacoes
    getTotalMinutes() {
        return this.startHour * 60 + this.startMinute;
    }

    getStartTime() {
        return this.startHour + ':' + this.startMinute;
    }

    getEndTime() {
        return this.endHour + ':' + this.endMinute;
    }

    getDate() {
        return this.date;
    }

    getName() {
        return this.name;
    } 

    getDesc() {
        return this.description;
    }

    getDay() {
        return this.date.getDate();
    }

    getMonth() {
        return monthNames[this.date.getMonth()];
    }

    getMonthNumber() {
        return this.date.getMonth() + 1;
    }

    getYear() {
        return this.date.getYear();
    }

    getTotalDays() {
        return this.getYear() * 365 + this.getMonth * 30 + this.getDay();
    }

    toLocalStorage(){
        return [
            this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate(),
            JSON.stringify([{"type" : 0, "startHour" : this.startHour, "endHour" : this.endHour, "startMinute" : this.startMinute, "endMinute" : this.endMinute, "name" : this.name, "description" : this.description}])
        ]
    }
}

class Meeting extends Evento {
    constructor (date, startHour, startMinute, endHour, endMinute, name, description, members) {
        super (date, startHour, startMinute, endHour, endMinute, name, description);
        this.members = members;
    }

    getMembers() {
        return this.members;
    }

    toLocalStorage(){
        return [
            this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate(),
            JSON.stringify([{"type" : 1, "startHour" : this.startHour, "endHour" : this.endHour, "startMinute" : this.startMinute, "endMinute" : this.endMinute, "name" : this.name, "description" : this.description, "members" : this.members}])
        ]
    }
}