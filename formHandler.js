// localStorage.clear()

function pullMenu() {
    document.querySelector('.menu-backdrop').classList.add('open');
    document.querySelector('.event').classList.add('open');
    document.querySelector('.day').classList.remove('open')
    let years = "";
    for(let i = currDate.getFullYear(); i < currDate.getFullYear() + 10; i++){
        years += '<option value="' + i + '">' + i + '</option>'
    }
    document.getElementById("date-year").innerHTML = years;
    monthSelector = document.getElementById("date-month");
    monthSelector.value = currDate.getMonth();
    let days = "";
    for(let i = 1; i <= numDays[currDate.getMonth()]; i++){
        days += '<option value="' + i + '">' + i + '</option>';
    }
    document.getElementById("date-day").innerHTML = days;
    daySelector = document.getElementById("date-day")
    daySelector.value = selectedDate.getDate();

    document.getElementById("date-hour-start").value = 0;
    document.getElementById("date-minute-start").value = 0;
    document.getElementById("date-hour-end").value = 0;
    document.getElementById("date-minute-end").value = 0;

    document.getElementById("event-name").value = ""
    document.getElementById("event-desc").value = ""

    document.getElementById("meeting-members").innerHTML = "";

    document.querySelector(".error").innerHTML = "";
    document.querySelector(".error").classList.remove("showing");
}

function addMember() {
    memberList = document.getElementById("meeting-members");

    const text = document.createElement("p");
    text.innerHTML = "-";
    const button = document.createElement("button");
    button.appendChild(text);
    button.setAttribute("onclick", "remove(this);");

    const input = document.createElement("input");
    input.setAttribute("placeholder", "nome");

    const member = document.createElement("li");
    member.appendChild(input);
    member.appendChild(button);

    memberList.appendChild(member);
}

function remove(item){
    item.parentElement.remove();
}

function dayModifier(){
    const selectedMonth = document.getElementById("date-month").value;
    const selectedDay = document.getElementById("date-day").value;
    let days = "";
    for(let i = 1; i <= numDays[selectedMonth]; i++){
        days += '<option value="' + i + '">' + i + '</option>';
    }
    newDays = document.getElementById("date-day");
    newDays.innerHTML = days;
    newDays.value = selectedDay > numDays[selectedMonth] ? numDays[selectedMonth] : selectedDay;
}

function registerEvent(){
    const eventDay = document.getElementById("date-day").value;
    const eventMonth = document.getElementById("date-month").value;
    const eventYear = document.getElementById("date-year").value;

    const startHour = document.getElementById("date-hour-start").value;
    const startMinute = document.getElementById("date-minute-start").value;
    const endHour = document.getElementById("date-hour-end").value;
    const endMinute = document.getElementById("date-minute-end").value;

    if (endHour*60 + parseInt(endMinute) < startHour*60 + parseInt(startMinute)) {
        console.log(endHour * 60 + parseInt(endMinute));
        console.log(startHour * 60 + parseInt(startMinute));
        const errorMessage = document.querySelector(".error")
        errorMessage.innerHTML = "Um evento não pode terminar antes de começar";
        errorMessage.classList.add("showing")

        return;
    }

    const name = document.getElementById("event-name").value;
    const desc = document.getElementById("event-desc").value;

    const members = document.getElementById("meeting-members").children;

    const memberArray = []
    for (let i = 0; i < members.length; i++){
        memberArray.push(members[i].children[0].value);
    }

    const date = new Date(eventYear, eventMonth, eventDay);

    const event = members.length === 0 ? new Evento(date, startHour, startMinute, endHour, endMinute, name, desc) : new Meeting(date, startHour, startMinute, endHour, endMinute, name, desc, memberArray)
    const data = event.toLocalStorage();

    const prevData = JSON.parse(localStorage.getItem(data[0]))
    if(prevData !== null){
        const newEvent = JSON.parse(data[1])

        prevData.push(newEvent[0]);

        prevData.sort((a,b) => {
            return (a["startHour"] * 60 + parseInt(a["startMinute"])) - (b["startHour"] * 60 + parseInt(b["startMinute"]));
        })

        localStorage.setItem(data[0], JSON.stringify(prevData));
    } else {
        localStorage.setItem(data[0], data[1])
    }

    document.querySelector('.menu-backdrop').classList.remove('open');
    document.querySelector('.event').classList.remove('open');
    renderCalendar(currDate);

    const day = document.createElement("span");
    day.innerHTML = selectedDate.getDate();
    const param = document.createElement("div");
    param.appendChild(day);
    renderDay(param);
}