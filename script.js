$(document).ready(function(){
    
    let serchData = $("search-term");
    let listOfCities = [];
    let city
    let APIKey = "2a79fc5901f91718d12fb3f9ffdc31cd";

// Function to set cities from listOfCities array into local storage
function saveCities() {
    localStorage.setItem("cities", JSON.stringify(listOfCities));
}

// Function to render buttons based on what is in listOfCities array
function renderButtons() {
$(".buttons-view").empty();
for (var i = 0; i < listOfCities.length; i++) {
    var a = $("<button>");
    a.addClass("btn btn-defult city-btn");
    a.attr("data-name", listOfCities[i]);
    a.text(listOfCities[i]);
    $(".buttons-view").prepend(a);
}
}  
    function displayWeather() {
        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey + "&units=imperial";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#weather").html("");

            var newDiv = $("<div class='cityWeather'>");
            newDiv.html("<h2>Current Weather</h2><br>");
            serchData.prepend(newDiv);
            console.log(serchData);


            var cityName = response.name;
            var pOne = $("<p>").html("<h4>" + cityName + "</h4>");
            newDiv.append(pOne);
            console.log(cityName);

            var currentDate = moment().format("LLLL");
            var pDate = $("<p>").html("<i>" + currentDate + "</i>");
            newDiv.append(pDate);

            var windSpeed = response.wind.speed;
            var pTwo = $("<p>").text("Wind Speed:" + windSpeed.toFixed(0) + "mph");
            newDiv.append(pTwo);

            var humidity = response.main.humidity;
            var pThree = $("<p>").text("Humidity:" + humidity.toFixed(0) + "%");
            newDiv.append(pThree);

            var temperature = response.main.temp;
            var pFour = $("<p>").text("Temprature:" + temperature + "F");
            newDiv.append(pFour);

            var lon = response.coord.lon;
            var lat = response.coord.lat;

            var uvIndexUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            $.ajax({
                url: uvIndexUrl,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                var uvIndex = response.value;
                var pFive = $("<p id=uvIndex>").text("UV Index:" + uvIndex);
                newDiv.append(pFive);

            })
                        
            $("#weather").prepend(newDiv);
           
            if (listOfCities.includes(response.name) === false){
                listOfCities.push(response.name)
            }
            renderButtons();
            saveCities();
            display5day();

        })
    }

    function display5day() {
        var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: forcastURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day1date = new Date(response.list[2].dt_txt);
            var day2date = new Date(response.list[10].dt_txt);
            var day3date = new Date(response.list[18].dt_txt);
            var day4date = new Date(response.list[26].dt_txt);
            var day5date = new Date(response.list[34].dt_txt);

            var day1temp = (response.list[2].main.temp * (9 / 5) - 459.67).toFixed(0);
            var day2temp = (response.list[10].main.temp * (9 / 5) - 459.67).toFixed(0);
            var day3temp = (response.list[18].main.temp * (9 / 5) - 459.67).toFixed(0);
            var day4temp = (response.list[26].main.temp * (9 / 5) - 459.67).toFixed(0);
            var day5temp = (response.list[34].main.temp * (9 / 5) - 459.67).toFixed(0);

            var day1hum = (response.list[2].main.humidity).toFixed(0);
            var day2hum = (response.list[10].main.humidity).toFixed(0);
            var day3hum = (response.list[18].main.humidity).toFixed(0);
            var day4hum = (response.list[26].main.humidity).toFixed(0);
            var day5hum = (response.list[34].main.humidity).toFixed(0);

            var day1icon = "http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png";
            var day2icon = "http://openweathermap.org/img/wn/" + response.list[10].weather[0].icon + ".png";
            var day3icon = "http://openweathermap.org/img/wn/" + response.list[18].weather[0].icon + ".png";
            var day4icon = "http://openweathermap.org/img/wn/" + response.list[26].weather[0].icon + ".png";
            var day5icon = "http://openweathermap.org/img/wn/" + response.list[34].weather[0].icon + ".png";

            $(".day-1-icon").attr("src", day1icon);
            $(".day-2-icon").attr("src", day2icon);
            $(".day-3-icon").attr("src", day3icon);
            $(".day-4-icon").attr("src", day4icon);
            $(".day-5-icon").attr("src", day5icon);
            

            $(".day1").html("<br/>" + "<b>" + moment(day1date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp:" + day1temp + "F </br>" + "Humidity:" + day1hum + "%");
            $(".day2").html("<br/>" + "<b>" + moment(day2date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp:" + day2temp + "F </br>" + "Humidity:" + day2hum + "%");
            $(".day3").html("<br/>" + "<b>" + moment(day3date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp:" + day3temp + "F </br>" + "Humidity:" + day3hum + "%");
            $(".day4").html("<br/>" + "<b>" + moment(day4date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp:" + day4temp + "F </br>" + "Humidity:" + day4hum + "%");
            $(".day5").html("<br/>" + "<b>" + moment(day5date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp:" + day5temp + "F </br>" + "Humidity:" + day5hum + "%");
          

        })
    }

    $("#run-search").on("click", function (){
        city = $("#search-term").val();
        // city.push(listOfCities);
        display5day();
        displayWeather();
        console.log(city);
      
    })

    $(document).on("click", ".city-btn", function(){
        city = $(this).attr("data-name");
        displayWeather();
        display5day();
    })

    $("#clear-search").on("click", function(){
        localStorage.clear("cities");
        listOfCities = [];
        $(".buttons-view").empty();
        location.reload();
    })
  
   
        if (localStorage.getItem("cities") !== null){
            var savedCity = localStorage.getItem("cities");
            var pushCities = JSON.parse(savedCity);
            listOfCities = listOfCities.concat(pushCities)
            console.log(listOfCities);

        }
        renderButtons();

})

    

   

