function pullMenu() {
    document.querySelector('.menu-backdrop').classList.toggle('open');
    document.querySelector('.event-menu').classList.toggle('open');
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
    daySelector.value = currDate.getDate();

    document.getElementById("date-hour-start").value = 0;
    document.getElementById("date-minute-start").value = 0;

    document.getElementById("event-name").value = ""
    document.getElementById("event-desc").value = ""

    document.getElementById("meeting-members").innerHTML = "";
}

function addMember() {
    memberList = document.getElementById("meeting-members");
    memberList.innerHTML += '<li><input type="text" placeholder="nome"><button onclick="remove(this)"><p> - </p></button></li>'  
}

function remove(item){
    item.parentElement.remove();
}

function registerEvent(){
    const eventDay = document.getElementById("date-day").value;
    const eventMonth = document.getElementById("date-month").value;
    const eventYear = document.getElementById("date-year").value;

    const startTime = document.getElementById("date-hour-start").value + ':' + document.getElementById("date-minute-start").value;
    const endTime = document.getElementById("date-hour-end").value + ':' + document.getElementById("date-minute-end").value;

    memberList = document.getElementById("meeting-members").children;

    console.log(eventDay);
    console.log(eventYear);
    console.log(eventMonth);
    console.log(startTime);
    console.log(endTime);

    const date = new Date();


    const event = memberList.length === 0 ? new Evento() : new Meeting()
    console.log(event);
}