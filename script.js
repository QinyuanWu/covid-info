
const requestOptions = {
  method: "GET",
  redirect: "follow",
};

//get country data and populate country selector
fetch(
    `https://restcountries.eu/rest/v2/all`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => populateSelector("countires", data))
    .catch((error) => console.log("error", error));

search(); //display latest US case numbers

function populateSelector(selectElmId, data) {
  const select = document.getElementById(selectElmId);
  select.innerHTML = "";
  let item = null;
  for (let i = 0; i < data.length; i++) {
    item = document.createElement("option");
    item.value = data[i]["alpha2Code"]; //store country code as value
    item.innerText = data[i]["name"]; //store country name for display
    if (item.value === 'US') {
    	item.selected = true; //make united states default
    }
    select.appendChild(item);
  }
}

//wait for user to select a country
document.getElementById("countires").addEventListener("click", search);

function search() {
	const code = document.getElementById("countires").value;

	fetch(
	    `https://www.trackcorona.live/api/countries/${code}`,
	    requestOptions
	  )
	    .then((response) => response.json())
	    .then((data) => showSearchResults(data, code))
	    .catch((error) => console.log("error", error));
}

function showSearchResults(data, code) {
	let confirmed = document.getElementById("confirmed");
	let recovered = document.getElementById("recovered");
	let active = document.getElementById("active");

	if (data["data"][0] != null) {

		const num_confirmed = data["data"][0]["confirmed"];
		confirmed.innerHTML = `<img src="https://www.countryflags.io/${code}/flat/24.png" /> ${num_confirmed.toLocaleString()}`;
		
		const num_recovered = data["data"][0]["recovered"];
		recovered.innerHTML = `<img src="https://www.countryflags.io/${code}/flat/24.png" /> ${num_recovered.toLocaleString()}`;
		
		const num_active = num_confirmed - num_recovered - data["data"][0]["dead"];
		active.innerHTML = `<img src="https://www.countryflags.io/${code}/flat/24.png" /> ${num_active.toLocaleString()}`;

		//console.log(`con=${num_confirmed}, rec=${num_recovered}, act=${num_active}`);
	} else {
		//console.log(`no results found for ${code}`);
		confirmed.innerHTML = `<img src="https://www.countryflags.io/${code}/flat/24.png" /> N/A`;
		recovered.innerHTML = `<img src="https://www.countryflags.io/${code}/flat/24.png" /> N/A`;
		active.innerHTML = `<img src="https://www.countryflags.io/${code}/flat/24.png" /> N/A`;
	}
	

}
