import commonBuilders from "./CommonBuilders";



let DivBuilder = commonBuilders.DivBuilder;
let TextBuilder = commonBuilders.TextBuilder;
let domHandler = (() => {
    let isFahrenheit = true;
    let onSubmitNewLocation;

    let displayWeather = (finalData) =>
    {
        let button = commonBuilders.ButtonBuilder("Switch to °C", "toggleMetric", toggleUnits);
        let inputDetails = DivBuilder("class", "input");
        FillOutInputDetails(inputDetails);
        let Currently = DivBuilder("class", "currentDay");
        FillOutCurrentDay(Currently, finalData);
        let comingDays = DivBuilder("class", "comingDays");
        FillOutComingDays(comingDays, finalData);
        document.getElementById("container").innerHTML = "";
        ChangeBackgroundImage(finalData);
        document.getElementById("container").append( Currently, comingDays, inputDetails, button);
    }

    let ChangeBackgroundImage = async (finalData) => {
        let body = document.getElementsByTagName("body")[0]; // Get the body element
        let img;
    
        // Determine the image based on the weather icon
        if (finalData.icon.includes("cloudy")) {
            img = await loadImage(`cloudy`, `jpg`, `Images`);
        } else if (finalData.icon.includes("clear")) {
            img = await loadImage(`clear`, `jpg`, `Images`);
        } else if (finalData.icon.includes("rain")) {
            img = await loadImage(`rain`, `jpg`, `Images`);
        } else {
            img = await loadImage(`default`, `jpg`, `Images`);
        }
    
        // Set the background image using inline style
        body.style.backgroundImage = `url(${img.src})`;
        //body.style.transition = 'background-image 0.5s ease-in-out'; // Optional: add transition for smooth change
        //background-repeat: no-repeat; /* Prevent the image from repeating */
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
    }
    let FillOutInputDetails = (inputDetails) =>
    {
        let input = document.createElement("input");
        
        let getNewWeather = () => {
            if (onSubmitNewLocation) {
                onSubmitNewLocation(input.value);  // Emit event instead of calling apiCalls directly
            }
        };
        let submit = commonBuilders.ButtonBuilder("get forecast", "newLocation", getNewWeather);
        inputDetails.append(input, submit);
    }

    let FillOutCurrentDay = (Currently, finalData) =>
    {
        
        let address = TextBuilder("h3", `${finalData.address}, ${finalData.resolvedAddress}`, "address");
        let midSection = DivBuilder("class", "midSection");
        let temp = TextBuilder("h1", `Temp: ${Math.round(finalData.temp)}°F`, "realTemp fahrenheit");

        temp.setAttribute("data-temp-fahrenheit", Math.round(finalData.temp));
        
        let currentDetails = DivBuilder("class", "currentDetails");
        let condition = TextBuilder("h5", `Condition: ${finalData.condition}`, "condition");
        let feelsLike = TextBuilder("h5", `feels like: ${Math.round(finalData.feelsLike)}°F`, "feelsLike fahrenheit");
        
        feelsLike.setAttribute("data-temp-fahrenheit", Math.round(finalData.feelsLike));
        currentDetails.append(condition, feelsLike);
        midSection.append(temp, currentDetails);
        let localTime = TextBuilder("h3", `As of Local time: ${finalData.localTime}`, "localTime");
        Currently.append(address, midSection, localTime);
    }

    let FillOutComingDays = async (comingDays, finalData) =>
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
        for (const day of finalData.days)
        {
            //<td><!--${icon.jpg}</td>
            let tr = document.createElement("tr");
            let img = await loadImage(`${day.icon}`);
            let imgTd = document.createElement("td");
            imgTd.setAttribute("class", "imgTd");
            imgTd.classList
            imgTd.appendChild(img);
            let span = document.createElement("span");
            span.innerHTML = ` ${day.conditions}`;
            imgTd.appendChild(span);

            //import the images !!!
        
            // Calculate average temperature
            let avgTemp = (day.hours[0].temp + day.hours[6].temp + day.hours[12].temp + day.hours[18].temp) / 4;
        
            // Map temperature to a color between blue (cool) and red (hot)
            let hue = Math.min(Math.max(0, 240 - (avgTemp - 59) * 6), 240); // Scale between 0 (red) to 240 (blue)
        
        // Apply the dynamic color as a background style
            tr.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
                tr.innerHTML = 
                `<td>${day.datetime}</td>
                <td class="fahrenheit" data-temp-fahrenheit=${Math.round(day.feelslike)}>${Math.round(day.feelslike)}°F</td>
                <td class="fahrenheit" data-temp-fahrenheit=${Math.round(day.hours[0].temp)}>${Math.round(day.hours[0].temp)}°F</td>
                <td class="fahrenheit" data-temp-fahrenheit=${Math.round(day.hours[6].temp)} >${Math.round(day.hours[6].temp)}°F</td>
                <td class="fahrenheit" data-temp-fahrenheit=${Math.round(day.hours[12].temp)} >${Math.round(day.hours[12].temp)}°F</td>
                <td class="fahrenheit" data-temp-fahrenheit=${Math.round(day.hours[18].temp)} >${Math.round(day.hours[18].temp)}°F</td>`;
                tr.insertBefore(imgTd, tr.children[1]);
                table.append(tr);
            };
            comingDays.append(table);
    }

    function loadImage(imageName, type="svg", file="Icons") 
    {
        return import(`./${file}/${imageName}.${type}`)
        .then(imageModule => {
          const img = document.createElement('img');
          img.src = imageModule.default;  // The default export will be the image URL
          return img;
        })
        .catch(err => {
          console.error('Image loading failed', err);
        });
    }

    let convertToCelsius = (fahrenheit) => 
    {
        return Math.round((fahrenheit - 32) * 5 / 9);
    }

    let toggleUnits = () => 
    {
        isFahrenheit = !isFahrenheit;
    
        // Update button text
        document.querySelector(".toggleMetric").textContent = isFahrenheit ? "Switch to °C" : "Switch to °F";
    
        // Update current day temperature
        let tempElement = document.querySelector(".realTemp");
        let feelsLikeElement = document.querySelector(".feelsLike");
    
        // Get the original Fahrenheit value from the data attribute and recalculate Celsius dynamically
        let tempFahrenheit = tempElement.dataset.tempFahrenheit;
        let feelsLikeFahrenheit = feelsLikeElement.dataset.tempFahrenheit;
    
        if (isFahrenheit) {
            tempElement.textContent = `Temp: ${tempFahrenheit}°F`;
            feelsLikeElement.textContent = `Feels like: ${feelsLikeFahrenheit}°F`;
        } else {
            let tempCelsius = convertToCelsius(tempFahrenheit);
            let feelsLikeCelsius = convertToCelsius(feelsLikeFahrenheit);
            tempElement.textContent = `Temp: ${tempCelsius}°C`;
            feelsLikeElement.textContent = `Feels like: ${feelsLikeCelsius}°C`;
        }
    
        // Update coming days temperatures
        let tempElements = document.querySelectorAll("td.fahrenheit");
        tempElements.forEach(tempEl => {
            let tempFahrenheit = tempEl.dataset.tempFahrenheit;
    
            if (isFahrenheit) {
                tempEl.textContent = `${tempFahrenheit}°F`;
            } else {
                let tempCelsius = convertToCelsius(tempFahrenheit);
                tempEl.textContent = `${tempCelsius}°C`;
            }
        });
    }
    let registerNewLocationHandler = (callback) => {
        onSubmitNewLocation = callback;  // Set callback for external handler
    };

    return {displayWeather, registerNewLocationHandler};
})();

export default domHandler;