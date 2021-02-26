document.getElementById("characterSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("characterInput").value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;
  if (value === "")
    return;
  const url = "https://pokeapi.co/api/v2/" + type + "/" + value.toLowerCase() + "/";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      if (type === "ability") {
        results += json.id + " " + json.name + " " + json.effect_entries[0];
      }
      else if (type === "move") {
        results += json.id + " " + json.name + " power: " + json.power;
      }
      else if (type === "pokemon") {
        results += json.id + " " + json.name;
      }
      else if (type === "item") {
        results += json.id + " " + json.name + " description: " + json.effect_entries[0].effect;
      }

      console.log(results);
    })

});
