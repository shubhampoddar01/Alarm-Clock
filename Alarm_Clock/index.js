
const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false,
ringtone = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-994.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);   
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);   
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);   
}

//Current time
setInterval(() =>{

    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    // if hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h;

    //if the value is less than 10, adding 0 before that value
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    //When alarm rings
    if (alarmTime == `${h}:${m} ${ampm}` ){
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

//Set Alarm Button
function setAlarm(){
    if(isAlarmSet){ //if isAlarmSet is true
        alarmTime = "";  //clear the value of alarmTime
        ringtone.pause();  //pause the ringtone
        content.classList.remove("disable"); 
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;  //return isAlarmSet value to false
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    //Valid time to set alarm
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM") ){
        return alert("Kindly select a valid time to set the alarm."); 
    }
    isAlarmSet = true;
    alarmTime = time;

    //Disabling the select menu, if the alarm is set
    content.classList.add("disable");
    // console.log(time);
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);