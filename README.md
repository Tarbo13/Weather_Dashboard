# Project Discription

In this project I created a weather dashboard that takes in a city name from a user then displays the current weather info along with a five day forecast of the future.  To create this app I used server side API's provided by OpenWeatherMap.org.  My first challenge here was to get an ajax call and response set up between my app and OpenWeather's API.  I was able to accomplish this by getting an API key from OpenWeather.org that allowed me access to their data.  Once I had access I was able to get a JSON object returned to me with a long list of weather data I could use to create my weather dashboard.  Using the JQuery $.ajax function I was able to use a "GET" method to request the data from the OpenWeather URL and call on the data within the object and array returned in the response. 
 
I then used variables to store the date from the response.  I was able to single out specific items from the JSON object and array by calling them by name.  For example, the name of the city could be retrieved using "response.name" or the wind speed by using "response.wind.speed."  I then appended the values in these variables to the HTML so the results could be displayed on the users screen; this was done using a click handler function that captured the users inputted city and after a submit button was clicked.  The OpenWeatherMap.org documentation also showed how to retrieve weather icons specific to the current day and times weather.  Using the documentation provided by OpenWeatherMap.org I was able to bring these images into my app.
 

## Links

[GitHub Repository](https://github.com/Tarbo13/Weather_Dashboard)

<br>

[Deployed Page](https://tarbo13.github.io/Weather_Dashboard/)

### Screen Shots

![Initial Page](https://user-images.githubusercontent.com/68627417/95945268-eef59d80-0d9e-11eb-9f8b-b3b3fe28d65d.png)

<br>

![Weather Displayed](https://user-images.githubusercontent.com/68627417/95945335-12204d00-0d9f-11eb-915f-42619eb353a1.png)
