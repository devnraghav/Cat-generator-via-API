import config from "./config.js";
console.log(config.APIkey);
const timer_text = document.querySelector(".timer-text");
const image_wrapper = document.querySelector(".image-wrapper");
const image = document.querySelector(".image");
const generate = document.querySelector("#submit-btn");
const bio = document.querySelectorAll(".bio");

// learning about APIs and how to work with them in JS.
// fetch function returns a promise. Use await.

const url = `https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${config.APIkey}`;

// Using async to use await for the calls.
// then can be used instead of await.

async function GenerateCat() {
    const response_obj = await fetch(url); 
    const data = await response_obj.json();
    // returns an array of data about our cat obj
    data.forEach(cat_obj => {
        console.clear();
        console.log(cat_obj);   
        if (cat_obj.breeds.length <= 0) {
            console.log("Sorry no breeds found for this cat.");
            return
        }
        image_wrapper.style.display = "flex";
        image.src = cat_obj.url;
        bio[0].innerHTML = cat_obj.breeds[0].name;
        bio[1].innerHTML = cat_obj.breeds[0].origin;
        bio[2].innerHTML = cat_obj.breeds[0].life_span + " Years";
        bio[3].innerHTML = cat_obj.breeds[0].temperament;
        bio[4].innerHTML = cat_obj.breeds[0].description;
    });
};

GenerateCat();

document.addEventListener("submit", (event) => {
    event.preventDefault();
    GenerateCat();
});


// clock to keep track of the minute


setInterval(() => {
    let now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    timer_text.innerHTML = `${hour} : ${minute} : ${second}`;
    if (now.getSeconds() == 0) {
        GenerateCat();
    }
}, 1000);




