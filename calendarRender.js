const currDate = new Date();
const selectedDate = new Date();
const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const fullMonthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

function renderCalendar(date) {
    const calendar = document.querySelector(".calendar");
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const prevMonth = new Date(date.getFullYear(), date.getMonth());
    travelMonths(prevMonth, -1)


    calendar.innerHTML = "";

    for(let i = numDays[prevMonth.getMonth()] - (firstDay.getDay() - 1) % 7; i <= numDays[prevMonth.getMonth()]; i++){
        const prevMonthDay = document.createElement("div");
        prevMonthDay.classList.add("non-active");
        prevMonthDay.innerHTML = i;
        calendar.appendChild(prevMonthDay);
    }

    for(let i = 1; i <= numDays[date.getMonth()]; i++){
        const dayBox = document.createElement("div");
        dayBox.classList.add("active")
        dayBox.setAttribute("onclick", "renderDay(this)");
        const day = document.createElement("span");
        day.innerHTML = i;
        dayBox.appendChild(day);

        const events = JSON.parse(localStorage.getItem(date.getFullYear() + '-' + date.getMonth() + '-' + i));
        let eventAmmount = 0;
        let meetingAmmount = 0;

        if(events !== null){
            for(let i = 0; i < events.length; i++){
                if(events[i]["type"] === 0){
                    eventAmmount++;
                }else{
                    meetingAmmount++;
                }
            }
        }

        const meetingsIndicator = document.createElement("div");
        meetingsIndicator.classList.add("meetings");
        meetingsIndicator.innerHTML = meetingAmmount;

        const eventsIndicator = document.createElement("div");
        eventsIndicator.classList.add("events");
        eventsIndicator.innerHTML = eventAmmount;

        if(eventAmmount !== 0){
            dayBox.appendChild(eventsIndicator);
        }

        if(meetingAmmount !== 0){
            dayBox.appendChild(meetingsIndicator);
        }

        calendar.appendChild(dayBox);
    }

    const lastDay = new Date(date.getFullYear(), date.getMonth(), numDays[date.getMonth()])

    for(let i = 1; i <= 6 - lastDay.getDay() + 7; i++){
        const nextMonthDay = document.createElement("div");
        nextMonthDay.classList.add("non-active");
        nextMonthDay.innerHTML = i;

        calendar.appendChild(nextMonthDay);
    }


    // calendar.innerHTML = renderedPrevMonth + currMonth + renderedNextMonth;
    document.getElementById("title").innerHTML = '<span id="month">' + fullMonthNames[date.getMonth()] + '</span>, <span id="year">' + date.getFullYear() + '</span>'
}

function travelMonths(date,travelAmmount){
    date.setMonth(date.getMonth() + travelAmmount);
    if(date.getMonth() + travelAmmount > 12) {
        date.setFullYear(date.getFullYear() + 1);
    }

    if(date.getMonth + travelAmmount < 0){
        date.setFullYear(date.getFullYear() - 1);
    }
}

function changeMonth(changeAmmount){
    travelMonths(selectedDate, changeAmmount);
    renderCalendar(selectedDate);
}

function renderDay(dayObject){
    document.querySelector(".day").classList.remove("open");

    setTimeout(() => {
        document.querySelector(".day").classList.add("open");
        document.querySelector(".menu-backdrop").classList.add("open");
        document.querySelector(".event").classList.remove("open");
        const eventList = document.querySelector(".events-wrapper"); 
        eventList.innerHTML = ""
    
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        const day = dayObject.children[0].innerHTML;
    
        selectedDate.setDate(day);
    
        const searchKey = year + '-' + month + '-' + day;
        document.getElementById("day-name").innerHTML = day + ' de ' + fullMonthNames[month] + ' de ' + year;
    
        const data = JSON.parse(localStorage.getItem(searchKey));
        if (data === null){
            eventList.innerHTML = '<h2 class="message">Sem nada nesse dia, que bom!</h2>'
            return;
        }
    
        for(let i = 0; i < data.length; i++){
            console.log(data[i]);
            const eventBox = document.createElement("div");
            const head = document.createElement("div");
            head.classList.add("head");
    
            const time = document.createElement("h2");
            time.innerHTML = ('0' + data[i]["startHour"]).slice(-2) + ':' + ('0' + data[i]["startMinute"]).slice(-2) + ' - ' + ('0' + data[i]["endHour"]).slice(-2) + ":" + ('0' + data[i]["endMinute"]).slice(-2);
            console.log(time.innerHTML);
            head.appendChild(time)
            const name = document.createElement("h3");
            name.innerHTML = data[i]["name"];
            head.appendChild(name)
    
            const body = document.createElement("div");
            body.classList.add("body")
            const description = document.createElement("p")
            description.innerHTML = data[i]["description"];
            body.appendChild(description)
    
            if(data[i]["type"] === 0){
                eventBox.classList.add("event")
            } else {
                eventBox.classList.add("meeting")
    
                const participants = document.createElement("ol")
                for(let j = 0; j < data[i]["members"].length; j++){
                    const member = document.createElement("li");
                    member.innerHTML = data[i]["members"][j];
                    participants.appendChild(member);
                }
    
                body.appendChild(participants);
            }
    
    
            eventBox.appendChild(head)
            eventBox.appendChild(body)
    
            eventList.appendChild(eventBox);
        }
    },75)
}
