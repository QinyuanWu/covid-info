
const requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
    `https://restcountries.eu/rest/v2/all`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => populateSelector("countires", data))
    .catch((error) => console.log("error", error));

function populateSelector(selectElmId, data) {
  const select = document.getElementById(selectElmId);
  select.innerHTML = "";
  let item = null;
  for (let i = 0; i < data.length; i++) {
    item = document.createElement("option");
    item.value = data[i]["name"];
    item.innerText = data[i]["name"];
    select.appendChild(item);
  }
}

