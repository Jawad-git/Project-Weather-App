let commonBuilders = (function() 
{
    // make a helper DivBuilder function that takes parameters "attribute" and "value" for the newly created div
    let DivBuilder = (attribute, value) => 
    {
        let div = document.createElement("div");
        div.setAttribute(attribute, value);
        return div;
    }

    // make a helper TextBuilder function that takes parameters "type" for text type ("h1"-"h6", "p", "span", etc..) 
    // and "value" for the text content, as well as the optional class Name.
    let TextBuilder = (type, content, className) => 
    {
        let heading = document.createElement(type);
        heading.textContent = content;
        if (className)
        {
            heading.className = className;
        }
        return heading;
    }

    // make a helper ImageBuilder function that takes parameters "src", "alt", amd "imgClass"
    let ImageBuilder = (src, alt, imgClass = "servingImage") =>
    {
        let img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.className = imgClass;
        return img;
    }

    // make a helper ButtonBuilder function that takes parameters "value" for button text
    // and optional "className" for the class, as well as the optional eventListener function for the click event.
    let ButtonBuilder = (value, className, fireEvent) =>
    {
        let button = document.createElement("button");
        button.textContent = value;
        if (className)
        {
            button.className = className;
        }
        if (fireEvent)
        {
            button.addEventListener("click", fireEvent);
        }
        return button;
    }

    // make a helper InputBuilder function that takes parameters "inputType" to specify input type ("text", "number", "checkbox", etc..)
    // and a "className" for the class, as well as the placeholder text you want.
    let InputBuilder = (inputType, className, placeholder) =>
    {
        let input = document.createElement(inputType);
        input.className = className;
        input.setAttribute("placeholder", placeholder);
        return input
    }

    return {DivBuilder, TextBuilder, ImageBuilder, ButtonBuilder, InputBuilder};
})();
export default commonBuilders;