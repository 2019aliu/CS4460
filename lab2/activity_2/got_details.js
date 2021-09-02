// DOM #main div element
var main = document.getElementById('main');

// **** Your JavaScript code goes here ****
characters = [{
    "name": "Bran Stark",
    "status": "Alive",
    "current_location": "Fleeing White Walkers",
    "power_ranking": 7,
    "house": "stark",
    "probability_of_survival": 98
},
{
    "name": "Arya Stark",
    "status": "Alive",
    "current_location": "Back in Westeros",
    "power_ranking": 8,
    "house": "stark",
    "probability_of_survival": 99
},
{
    "name": "Sansa Stark",
    "status": "Alive",
    "current_location": "Winterfell",
    "power_ranking": 10,
    "house": "stark",
    "probability_of_survival": 83
},
{
    "name": "Robb Stark",
    "status": "Dead - Red Wedding S3E9",
    "current_location": "-",
    "power_ranking": -1,
    "house": "stark",
    "probability_of_survival": 0
}]

// Implementation of the function
function halfSurvival(character) {
	return character["probability_of_survival"] / 2;
}

function debugCharacters(c) {
    for (let i = 0; i < c.length; i++) {
        if (c[i]["name"] !== "Arya Stark") {
            c[i]["probability_of_survival"] = halfSurvival(c[i]);
        }
        console.log(`Probability of survival for ${c[i]["name"]}: ${c[i]["probability_of_survival"]}`);
    }
    return c;
}

// run debugCharacters thing
characters = debugCharacters(characters);

// document is the DOM, select the #main div
var main = document.getElementById("main");

// Create a new DOM element
var header = document.createElement("h3");
// Append the newly created <h3> element to #main
main.appendChild(header);
// Set the textContent to:
header.textContent = "My Favorite GoT Characters";

characters.forEach((c, _) => {
    // Create a new <div> element	
    const c_div = document.createElement("div");
    // Append the newly created <div> element to #main
    main.appendChild(c_div);

    // Create a new <h5> element
    const name = document.createElement("h5");
    // Append the newly created <h5> element to your new div
    c_div.appendChild(name);
    // Set the textContent to the first characters name
    name.textContent = c["name"];

    // Create a new <p> element
    const house= document.createElement("p");
    // Append the newly created <p> element to your new div
    c_div.appendChild(house);
    // Set the textContent to the first characters survival prob.
    house.textContent = `House: ${c["house"]}`;

    // Create a new <p> element
    const survival= document.createElement("p");
    // Append the newly created <p> element to your new div
    c_div.appendChild(survival);
    // Set the textContent to the first characters survival prob.
    survival.textContent = `Chance of survival: ${c["probability_of_survival"]}%`;

    // Create a new <p> element
    const status= document.createElement("p");
    // Append the newly created <p> element to your new div
    c_div.appendChild(status);
    // Set the textContent to the first characters survival prob.
    status.textContent = `Status: ${c["status"]}`;
})
