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
        results += "<h2>" + capitalizeFirst(json.name) + "</h2>";
        let abilityDescription = null;
        for (let i = 0; i < json.effect_entries.length; i += 1) {
          if (json.effect_entries[i].language.name === "en") { abilityDescription = json.effect_entries[i].effect; }
        }
        if (abilityDescription === null) { abilityDescription = json.effect_entries[0].effect; }
        results += "<div id='abilityDescription'>" + abilityDescription + "</div>";
      }
      else if (type === "move") {
        document.getElementById("sprite").src = "/images/pokedex.png";
        results += "<h2>" + capitalizeFirst(json.name) + "</h2>";
        let moveDescription = null;
        for (let i = 0; i < json.flavor_text_entries.length; i += 1) {
          if (json.flavor_text_entries[i].language.name === "en") { moveDescription = json.flavor_text_entries[i].flavor_text; }
        }
        if (moveDescription === null) { moveDescription = json.flavor_text_entries[0].text; }
        results += "<div id='moveDescription'>" + moveDescription + "</div><div class='moveData'>";
        results += "<div id='mvType'>Move Type: " + capitalizeFirst(json.type.name) + "</div>";
        results += "<div id='dmgType'>Damage Type: " + capitalizeFirst(json.damage_class.name) + "</div>";
        results += "</div><div class='moveData'><div id='mvDamage'>Damage: " + json.power + "</div>";
        results += "<div id='mvAccuracy'>Accuracy: " + json.accuracy + "</div></div><div class='moveData'>";
        results += "<div id='powerPoints'>PP: " + json.pp + "</div>";
        results += "<div id='effectChance'>Effect chance: " + json.effect_chance + "</div></div>";
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
