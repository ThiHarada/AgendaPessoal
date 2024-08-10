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



    let renderedPrevMonth = "";
    for(let i = numDays[prevMonth.getMonth()] - (firstDay.getDay() - 1) % 7; i <= numDays[prevMonth.getMonth()]; i++){
        renderedPrevMonth += '<div class="non-active">' + i + '</div>';
    }

    let currMonth = "";
    for(let i = 1; i <= numDays[date.getMonth()]; i++){
        currMonth += '<div class="active" onclick="renderDay(this)"><span>' + i + '</span></div>';
    }

    const lastDay = new Date(date.getFullYear(), date.getMonth(), numDays[date.getMonth()])

    let renderedNextMonth = "";
    for(let i = 1; i <= 6 - lastDay.getDay() + 7; i++){
        renderedNextMonth += '<div class="non-active">' + i + "</div>"
    }


    calendar.innerHTML = renderedPrevMonth + currMonth + renderedNextMonth;
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
    document.querySelector(".day").classList.add("open");
    document.querySelector(".menu-backdrop").classList.add("open")

    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const day = dayObject.children[0].innerHTML;

    console.log(year + '-' + month + '-' + day)
    document.getElementById("day-name").innerHTML = day + ' de ' + fullMonthNames[month - 1] + ' de ' + year
}
