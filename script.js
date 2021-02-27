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
        document.getElementById("sprite").src = "/images/pokedex.png";
        results += json.id + " " + json.name + " " + json.effect_entries[0];
      }
      else if (type === "move") {
        document.getElementById("sprite").src = "/images/pokedex.png";
        results += json.id + " " + json.name + " power: " + json.power;
      }
      else if (type === "pokemon") {
        document.getElementById("sprite").src = json.sprites.front_default;
        var capitalName = capitalizeFirst(json.name);
        results += "<h2>" + capitalName + "</h2><div class='pkmnTypes'>";
        for (let i = 0; i < json.types.length; i += 1) {
          results += "<h3 id='tipes'>" + capitalizeFirst(json.types[i].type.name) + "</h3>"
        }
        results += "</div><div class='abilities'><h4 id='tipes'>Known abilities:</h4>";
        for (let j = 0; j < json.abilities.length; j += 1) {
          results += "<h4 id='tipes'>" + capitalizeFirst(json.abilities[j].ability.name) + "</h4>";
        }
        results += "</div><div class='moveTable'><div id='tableHead'>Learnable moves:</div><div id='tableBody'>";
        for (let k = 0; k < json.moves.length; k += 1) {
          results += "<div id='tableElement'>" + capitalizeFirst(json.moves[k].move.name) + "</div>";
        }
        results += "</div></div>";
      }
      else if (type === "item") {
        document.getElementById("sprite").src = json.sprites.default;
        let itemName = null;
        for (let i = 0; i < json.names.length; i += 1) {
          if (json.names[i].language.name === "en") { itemName = json.names[i].name;}
        }
        if (itemName === null) { itemName = json.names[0].name; }
        results += "<h2>" + itemName + "</h2><div class='itemDescription'>" + json.effect_entries[0].effect;
        results += "</div><div class='itemAttr'><div id='itemCost'>" + "Cost: " + json.cost + "</div><div id='fling'>";
        results += "Fling power: " + json.fling_power + "</div></div>";
      }

      document.getElementById("underSprite").innerHTML = results;

      console.log(results);
    })

});

function capitalizeFirst(str) {
  var smallName = str;
  var firstLetter = smallName.charAt(0);
  var firstLetterCapital = firstLetter.toUpperCase();
  var excludeFirst = smallName.slice(1);
  var capitalName = firstLetterCapital + excludeFirst;
  return capitalName;
}
