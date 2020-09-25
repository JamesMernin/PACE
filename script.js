// Found function to capitalize first letter of Pokemon name. Source: https://dzone.com/articles/capitalize-first-letter-string-javascript
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Source for autocomplete function: https://www.w3schools.com/howto/howto_js_autocomplete.asp
async function autocomplete(inp) {
  const pokemonCount = 1050;
  let arr = [];
  try {
    let pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`);
    for (let i = 0; i < pokemonCount; i++) {
      arr[i] = capitalize(pokemonData.data.results[i].name);
    }
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      let a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      /*create a div element that will contain the items (values):*/
      a = document.createElement("div");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("div");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (div element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  } catch (error) {
    console.log(`Autocomplete Error: ${error}`);
  } finally {
    console.log(`List generated`);
  }
}

function getName(input, inputName, select) {
  select.innerHTML = '';
  getPokemonData(input, inputName, select, input.value);
}

async function getPokemonData(input, inputName, select, pokemon) {
  try {
    pokemon = pokemon.toLowerCase();
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let source;

    // Get image, or display "No image" if image does not exist
    if (inputName === 'defender') {
      document.querySelector('#defendErrorText').textContent = '';
      document.querySelector('#defender').classList.add('selected');
      source = response.data.sprites.front_default;
    } else {
      document.querySelector('#attackErrorText').textContent = '';
      document.querySelector('#attacker').classList.add('selected');
      source = response.data.sprites.front_default;
    }
    if (source != null) {
      let image = document.createElement('img');
      image.src = source;
      select.append(image);
    } else {
      let image = document.createElement('p');
      image.classList.add('noimage');
      image.textContent = '[No image]';
      select.append(image);
    }

    // Display the name
    let name = document.createElement('p');
    name.classList.add('pokemonText');
    let pokemonName = capitalize(pokemon);
    if (inputName === 'defender') {
      name.innerHTML = "Defender: ";
    } else {
      name.innerHTML = "Attacker: ";
    }
    name.textContent += pokemonName;
    select.append(name);

    // Get the first type
    let type1 = document.createElement('div');
    type1.classList.add('type');
    let pokemonType1 = response.data.types[0].type.name;
    type1.id = pokemonType1;
    type1.append(pokemonType1);
    select.append(type1);

    // Get the second type if it exists or make it blank
    let type2 = document.createElement('div');
    type2.classList.add('type');
    if (response.data.types.length > 1) {
      pokemonType2 = response.data.types[1].type.name;
      type2.id = pokemonType2;
      type2.append(pokemonType2);
      select.append(type2);
    } else {
      pokemonType2 = '';
      type2.id = 'blank';
      type2.append(pokemonType2);
      select.append(type2);
    }

    // Hide the selector to avoid issues
    if (inputName === "defender") {
      document.querySelector('#defenderSelect').classList.add('hidden');
    } else {
      document.querySelector('#attackerSelect').classList.add('hidden');
    }

    // Function to get attack menu
    if (inputName === 'attacker') {
      getAttack(pokemonType1, pokemonType2);
    }
  } catch (error) {
    // console.log(`Get Pokemon Error: ${error}`);
    if (inputName === 'defender') {
      errorText = document.querySelector('#defendErrorText');
      errorText.textContent = 'Please pick a valid defending Pokemon from the drop-down';
    } if (inputName === 'attacker') {
      errorText = document.querySelector('#attackErrorText');
      errorText.textContent = 'Please pick a valid attacking Pokemon from the drop-down';
    }
  } finally {
    console.log('Pokemon generated');
  }
}

async function getAttack(type1, type2) {
  try {
    const numTypes = 18;
    let pokemonTypes = await axios.get('https://pokeapi.co/api/v2/type/');
    let types = [];
    let attackHeader = document.querySelectorAll('.attackHeader');
    for (let i = 0; i < attackHeader.length; i++) {
      attackHeader[i].classList.remove('hidden');
    }
    for (i = 0; i < numTypes; i++) {
      let attackForm = document.querySelector('#attackTypes');
      attackForm.classList.remove('hidden');
      let select = document.querySelector('#attackSelect');
      types[i] = pokemonTypes.data.results[i].name;
      let option = document.createElement('option');
      option.value = types[i];
      option.textContent = capitalize(types[i]);
      if (type1 === types[i]) {
        option.classList.add('stab');
      }
      if (type2 === types[i]) {
        option.classList.add('stab');
      }
      select.appendChild(option);
    }
  } catch (error) {
    console.log(`Get Attack Error: ${error}`);
  } finally {
    console.log('Attack menu created');
  }
}

function getSelection() {
  let attackSelect = document.querySelector('#attackSelect');
  let attackTypes = document.querySelector('#attackTypes');
  if (attackSelect.options.selectedIndex === 0) {
    attackTypes.classList.remove('selected');
    document.querySelector('#effective').classList.add('hidden');
    document.querySelector('#stab').classList.add('hidden');
  } else {
    attackTypes.classList.add('selected');
    if (document.querySelector('#defender').classList.contains('selected') && document.querySelector('#attacker').classList.contains('selected') && document.querySelector('#attackTypes').classList.contains('selected')) {
      getEffectiveness(attackSelect.options[attackSelect.selectedIndex], document.querySelectorAll('#defender .type')[0].textContent, document.querySelectorAll('#defender .type')[1].textContent);
    }
  }
}

async function getEffectiveness(attackType, defendType1, defendType2) {
  try {
    let multiplier = 1;
    let attack = await axios.get(`https://pokeapi.co/api/v2/type/${attackType.value}/`);
    let superEffectiveArr = attack.data.damage_relations.double_damage_to;
    let notVeryEffectiveArr = attack.data.damage_relations.half_damage_to;
    let noEffectArr = attack.data.damage_relations.no_damage_to;
    for (let i = 0; i < superEffectiveArr.length; i++) {
      if (defendType1 === superEffectiveArr[i].name || defendType2 === superEffectiveArr[i].name) {
        multiplier *= 2;
      }
    }
    for (i = 0; i < notVeryEffectiveArr.length; i++) {
      if (defendType1 === notVeryEffectiveArr[i].name || defendType2 === notVeryEffectiveArr[i].name) {
        multiplier *= 0.5;
      }
    }
    for (i = 0; i < noEffectArr.length; i++) {
      if (defendType1 === noEffectArr[i].name || defendType2 === noEffectArr[i].name) {
        multiplier *= 0;
      }
    }
    effectiveCalc(attackType, multiplier);
  } catch (error) {
    console.log(`Get Effectiveness Error: ${error}`);
  } finally {
    console.log('Effectiveness calculated');
  }
}

function effectiveCalc(attackType, multiplier) {
  let effective = document.querySelector('#effective');
  let stabMultiplier = 1;
  effective.classList.remove('hidden');
  if (multiplier === 0) {
    effective.innerHTML = "This move type has no effect.";
  } else if (multiplier < 1) {
    effective.innerHTML = "This move type is not very effective...";
  } else if (multiplier === 1) {
    effective.innerHTML = "This move type is regularly effective.";
  } else {
    effective.innerHTML = "This move type is super effective!";
  }
  effective.innerHTML += ` (${multiplier}x damage)`;
  if (attackType.classList.contains('stab')) {
    stabMultiplier = 1.5;
  } else {
    stabMultiplier = 1;
  }
  let stabText = document.querySelector('#stab');
  if (stabMultiplier === 1.5 && multiplier != 0) {
    stabText.classList.remove('hidden');
    stabText.textContent = `With STAB, this move type does ${multiplier * stabMultiplier}x damage!`;
  } else {
    stabText.classList.add('hidden');
  }
}

autocomplete(document.querySelector("#defenderInput"));
autocomplete(document.querySelector("#attackerInput"));

let attackSelect = document.querySelector('#attackSelect');
attackSelect.addEventListener('change', getSelection);

let clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
  location.reload();
})