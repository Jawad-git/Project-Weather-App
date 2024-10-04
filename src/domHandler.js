import commonBuilders from "./CommonBuilders";
let DivBuilder = commonBuilders.DivBuilder;
let TextBuilder = commonBuilders.TextBuilder;
let domHandler = (() => {

    let displayWeather = (finalData) =>
    {
        let inputDetails = DivBuilder("class", "input");
        FillOutInputDetails(inputDetails);
        let Currently = DivBuilder("class", "currentDay");
        FillOutCurrentDay(Currently, finalData);
        let comingDays = DivBuilder("class", "comingDays");
        FillOutComingDays(comingDays, finalData);
        document.getElementById("container").innerHTML = "";
        document.getElementById("container").append(inputDetails, Currently, comingDays);
    }

    let FillOutInputDetails = (inputDetails) =>
    {
        let input = document.createElement("input");
        
        let getNewWeather = () => 
        {
            let newForecast = input.value;
            apiCalls.getWeather(newForecast);
        }
        let submit = commonBuilders.ButtonBuilder("get forecast", "newLocation", getNewWeather);
        inputDetails.append(input, submit);
    }

    let FillOutCurrentDay = (Currently, finalData) =>
    {
        let address = TextBuilder("h3", `${finalData.address}, ${finalData.resolvedAddress}`, "address");
        let midSection = DivBuilder("class", "midSection");
        let temp = TextBuilder("h1", `Temp: ${finalData.temp}`, "realTemp fahrenheit");
        let currentDetails = DivBuilder("class", "currentDetails");
        let condition = TextBuilder("h5", `${finalData.condition}`, "condition");
        let feelsLike = TextBuilder("h5", `feels like: ${finalData.feelsLike}`, "feelsLike fahrenheit");
        currentDetails.append(condition, feelsLike);
        midSection.append(temp, currentDetails);
        let localTime = TextBuilder("h3", `Local time: ${finalData.localTime}`, "localTime");
        Currently.append(address, midSection, localTime);
    }

    let FillOutComingDays = (comingDays, finalData) =>
    {
        let table = document.createElement("table");
        let tr;
        tr = document.createElement("tr");
        tr.innerHTML = 
            `<th>Date</th>
            <th>Condition</th>
            <th>feels Like</th>
            <th>12:00AM</th>
            <th>06:00AM</th>
            <th>12:00PM</th>
            <th>18:00PM</th>`;
        table.append(tr);
        finalData.days.forEach(day => 
        {
            //<td><!--${icon.jpg}</td>
            let tr = document.createElement("tr");
        let img = document.createElement("img");
        img.src = `${day.icon}.svg`;
        
        // Calculate average temperature
        let avgTemp = (day.hours[0].temp + day.hours[6].temp + day.hours[12].temp + day.hours[18].temp) / 4;
        
        // Map temperature to a color between blue (cool) and red (hot)
        let hue = Math.min(Math.max(0, 240 - (avgTemp - 59) * 6), 240); // Scale between 0 (red) to 240 (blue)
        
        // Apply the dynamic color as a background style
        tr.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
            tr.innerHTML = 
            `<td>${day.datetime}</td>
            <td>${img}</td>
            <td>${day.feelslike}</td>
            <td class="fahrenheit">${Math.round(day.hours[0].temp)}</td>
            <td class="fahrenheit">${Math.round(day.hours[6].temp)}</td>
            <td class="fahrenheit">${Math.round(day.hours[12].temp)}</td>
            <td class="fahrenheit">${Math.round(day.hours[18].temp)}</td>`;
            table.append(tr);
        });
        comingDays.append(table);
    }

    return {displayWeather};
})();

export default domHandler;