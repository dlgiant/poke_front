const Pikachu = {
  name: 'pikachu',
  sprites: {
    back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
    front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  stats: [
    {base_stat: 35, effort: 0, stat: {name: "hp"}},
    {base_stat: 55, effort: 0, stat: {name: "attack"}},
    {base_stat: 40, effort: 0, stat: {name: "defense"}}
  ]
}

const Bulbasaur = {
  name: 'Bulbasaur',
  sprites: {
    back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  stats: [
    {base_stat: 45, effort: 0, stat: {name: "hp"}},
    {base_stat: 49, effort: 0, stat: {name: "attack"}},
    {base_stat: 49, effort: 0, stat: {name: "defense"}}
  ]
}

let INITIAL_POKEMONS = {
  0: Pikachu,
  1: Bulbasaur
}

module.exports = INITIAL_POKEMONS;

