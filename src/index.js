import "./styles.css";
import apiCalls from "./apiCalls";
import domHandler from './domHandler';

let data = await apiCalls.getWeather("nyc");
domHandler.displayWeather(data);
domHandler.registerNewLocationHandler(async (location) => {
    let finalData = await apiCalls.getWeather(location);
    domHandler.displayWeather(finalData);
});
apiCalls.getBackground("window rain");
