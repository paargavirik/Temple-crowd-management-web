function login() {

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(user=="admin" && pass=="1234")
{
    window.location.href="dashboard.html";
}
else
{
    alert("Invalid Login");
}

}
function bookSlot()
{
    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let people = parseInt(document.getElementById("people").value);

    let crowd;

    if(people <= 50)
    {
        crowd = "Low";
    }
    else if(people <= 100)
    {
        crowd = "Medium";
    }
    else
    {
        crowd = "High";
    }

    let token = Math.floor(Math.random() * 9000) + 1000;

    let booking = {
        name: name,
        mobile: mobile,
        date: date,
        time: time,
        visitors: people,
        crowd: crowd,
        token: token
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));
    
    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
      text:
      "Token:" + token +
      "\nName:" + name +
      "\nDate:" + date +
      "\nTime:" + time,
      width: 200,
      height: 200
    });

    document.getElementById("result").innerHTML =
    "Booking Successful <br>" +
    "Token Number : " + token +
    "<br>Name : " + name +
    "<br>Mobile : " + mobile +
    "<br>Date : " + date +
    "<br>Time Slot : " + time +
    "<br>Visitors : " + people +
    "<br>Crowd Status : " + crowd;
}
function updateSlots()
{
    document.getElementById("slot1").innerHTML = "Available";
    document.getElementById("slot2").innerHTML = "Available";
    document.getElementById("slot3").innerHTML = "Available";
    document.getElementById("slot4").innerHTML = "Available";
}
let visitors = 350;
let bookings = 25;

if(document.getElementById("visitorCount"))
{
    document.getElementById("visitorCount").innerText = visitors;
    document.getElementById("bookingCount").innerText = bookings;

    if(visitors < 300){
        document.getElementById("crowdLevel").innerText = "Low";
    }
    else if(visitors < 500){
        document.getElementById("crowdLevel").innerText = "Medium";
    }
    else{
        document.getElementById("crowdLevel").innerText = "High";
    }
}
setInterval(() => {

    visitors += Math.floor(Math.random() * 5);

    document.getElementById("visitorCount").innerText = visitors;

    if(visitors < 300){
        document.getElementById("crowdLevel").innerText = "Low";
    }
    else if(visitors < 500){
        document.getElementById("crowdLevel").innerText = "Medium";
    }
    else{
        document.getElementById("crowdLevel").innerText = "High";
    }

}, 3000);
if(document.getElementById("crowdChart"))
{
    const ctx = document.getElementById("crowdChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Low", "Medium", "High"],
            datasets: [{
                data: [45, 30, 25]
            }]
        }
    });
}
if(document.getElementById("historyTable"))
{
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    let table = document.getElementById("historyTable");

    bookings.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.token}</td>
            <td>${item.name}</td>
            <td>${item.mobile}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>${item.visitors}</td>
            <td>${item.crowd}</td>
            <td>
            <button onclick="deleteBooking(${item.token})">
            Delete
            </button>
          </td>
        </tr>
        `;
    });
}
function searchBooking()
{
    let mobile =
    document.getElementById("searchMobile").value;

    let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

    let found =
    bookings.find(item => item.mobile == mobile);

    if(found)
    {
        document.getElementById("searchResult").innerHTML =
        "Token : " + found.token +
        "<br>Name : " + found.name +
        "<br>Date : " + found.date +
        "<br>Time : " + found.time +
        "<br>Visitors : " + found.visitors +
        "<br>Crowd : " + found.crowd;
    }
    else
    {
        document.getElementById("searchResult").innerHTML =
        "No Booking Found";
    }
}
function downloadCSV()
{
    let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

    let csv =
    "Token,Name,Mobile,Date,Time,Visitors,Crowd\n";

    bookings.forEach(item => {

        csv +=
        item.token + "," +
        item.name + "," +
        item.mobile + "," +
        item.date + "," +
        item.time + "," +
        item.visitors + "," +
        item.crowd + "\n";

    });

    let blob =
    new Blob([csv], {type:'text/csv'});

    let a =
    document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "TempleBookings.csv";

    a.click();
}
function deleteBooking(token)
{
    let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

    bookings =
    bookings.filter(item => item.token != token);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    location.reload();
}