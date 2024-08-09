function ativar() {
    document.querySelector('.menu-backdrop').classList.toggle('open');
    document.querySelector('.event-menu').classList.toggle('open');
    let years = "";
    for(let i = currDate.getFullYear(); i < currDate.getFullYear() + 10; i++){
        years += '<option value="' + i + '">' + i + '</option>'
    }
    document.getElementById("date-year").innerHTML = years;
    monthSelector = document.getElementById("date-month");
    monthSelector.children[currDate.getMonth()].setAttribute("selected", true);
    let days = "";
    for(let i = 1; i <= numDays[currDate.getMonth()]; i++){
        days += '<option value="' + i + '">' + i + '</option>';
    }
    document.getElementById("date-day").innerHTML = days;
    daySelector = document.getElementById("date-day")
    daySelector.children[currDate.getDate() - 1].setAttribute("selected", true)

}