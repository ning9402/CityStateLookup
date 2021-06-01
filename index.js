"use strict";

let cityStates = [{
    state: "California",
    stateAbbr: "CA",
    cities: ["Los Angeles", "San Francisco", "San Diego"],
}, {
    state: "Colorado",
    stateAbbr: "CO",
    cities: ["Aspen", "Boulder", "Denver", "Pagosa Springs"],
}, {
    state: "Texas",
    stateAbbr: "TX",
    cities: ["Austin", "Dallas", "Houston", "San Antonio"],
}];


window.onload = function() {
    loadStateDropdown();

    //find state dropdown
    const stateDropdown = document.getElementById("stateDropdown");
    stateDropdown.onchange = onStateDropdownChanged;

    //find city dropdown
    const cityDropdown = document.getElementById("cityDropdown");
    cityDropdown.onchange = onCityDropdownChanged;
}

function loadStateDropdown() {
    //find state dropdown
    const stateDropdown = document.getElementById("stateDropdown");

    // add select one option
    let selectOneOption = document.createElement("option");
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = " ";
    stateDropdown.appendChild(selectOneOption);

    //loop thru cityStates to create an option for each state
    for(let i = 0; i < cityStates.length; i++){
        let theOption = document.createElement("option");
        theOption.textContent = cityStates[i].state;
        theOption.value = cityStates[i].stateAbbr;
        stateDropdown.appendChild(theOption);
    }
    addSelectionToCityDropdown("Select State First");
}

function onStateDropdownChanged() {
    //find state and city dropdown
    const stateDropdown = document.getElementById("stateDropdown");
    const cityDropdown = document.getElementById("cityDropdown");

    clearPage();
    //remove previous cities from city dropdown because state changed
    cityDropdown.options.length = 0;

    //find state dropdown select
    let stateCode = stateDropdown.value;

    if (stateCode == " "){
        addSelectionToCityDropdown("Select State First");
        return;
    }

    let matchingState = cityStates.find(arrayElement => arrayElement.stateAbbr == stateCode);

    addSelectionToCityDropdown("Select One...");
    for(let i = 0; i < matchingState.cities.length; i++){
        let theOption = document.createElement("option");
        theOption.textContent = matchingState.cities[i];
        cityDropdown.appendChild(theOption);
    }

}

function onCityDropdownChanged() {
    //find state and city dropdown
    const stateDropdown = document.getElementById("stateDropdown");
    const cityDropdown = document.getElementById("cityDropdown");

    // erase previous state message
    //const messagePara = document.getElementById("messagePara");
    //messagePara.innerHTML = " ";
    clearPage();

    // get the selected state
    let selectedState = stateDropdown.value;

    //if select one is picked, just exit the function
    if(selectedState == ""){
        return;
    }

    //get the selected city
    let selectedCityIndex = cityDropdown.selectedIndex;
    let selectedCity = cityDropdown.options[selectedCityIndex].text;

    let message = "State: " + selectedState + "<br>" + "City: " + selectedCity;
    messagePara.innerHTML = message;
}

function clearPage() {
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = " ";
}

function addSelectionToCityDropdown(optionText) {
    const cityDropdown = document.getElementById("cityDropdown");

    let selectOneOption = document.createElement("option");
    selectOneOption.textContent = optionText;
    selectOneOption.value = " ";
    cityDropdown.appendChild(selectOneOption);
}