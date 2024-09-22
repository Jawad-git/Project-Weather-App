let apiCalls = (() =>
{
    let getWeather = async (location) =>
    {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BJ4EPK8QRNQTGL8UFTTVXSKH6`, {mode : "cors"});
        let dataJson = await response.json();
        console.log(dataJson);
    }

    let getBackground = async (weather) =>
    {
        let response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ETMpOTl9ByyjGBjcAbMrWhBzPrMlHKo4&s=${weather}`, {mode : "cors"});
        let dataJson = await response.json();
        console.log(dataJson);
    }


    return {getWeather, getBackground};
})();

export default apiCalls;