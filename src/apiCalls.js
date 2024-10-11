import domHandler from "./domHandler";
let apiCalls = (() =>
{
    // call the weather api to get the weather data, then extract the needed data and pass it into the DOM handler to display them
    let getWeather = async (location) =>
    {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BJ4EPK8QRNQTGL8UFTTVXSKH6`, {mode : "cors"});
        let dataJson = await response.json();
        let finalData = WeatherData(dataJson);
        console.log(dataJson);
        domHandler.displayWeather(finalData);
        
    }
    // call the gif api based on what type of weather it is
    let getBackground = async (weather) =>
    {
        let response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ETMpOTl9ByyjGBjcAbMrWhBzPrMlHKo4&s=${weather}`, {mode : "cors"});
        let dataJson = await response.json();
        console.log(dataJson);
    }

    let WeatherData = (data) =>
    {
        let resolvedAddress = data.resolvedAddress;
        let address = data.address;
        let days = data.days.slice(0, 7);
        let condition = data.currentConditions.conditions;
        let localTime = data.currentConditions.datetime;
        let temp = data.currentConditions.temp;
        let feelsLike = data.currentConditions.feelslike;
        return {resolvedAddress, address, days, condition, localTime, temp, feelsLike};
    }


    return {getWeather, getBackground};
})();

export default apiCalls;