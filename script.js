async function pokemonList() {
  let pokemonCount = '1050';
  try {
    let pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`);
    let list = document.querySelectorAll('datalist');
    for (let i = 0; i < pokemonCount; i++) {
      //console.log(capitalize(pokemonList.data.results[i].name));
      let option1 = document.createElement('option');
      let option2 = document.createElement('option');
      option1.setAttribute('value', capitalize(pokemonData.data.results[i].name));
      option2.setAttribute('value', capitalize(pokemonData.data.results[i].name));
      list[0].append(option1);
      list[1].append(option2);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  } finally {
    console.log(`List generated`);
  }
}

pokemonList()

// Found function to capitalize first letter. Source: https://dzone.com/articles/capitalize-first-letter-string-javascript
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}