// https://pokeapi.co/api/v2/pokemon/bulbasaur

import { PokemonDetails } from "../types/types";
import { formatPokemonName } from "../utils/utils";

export async function fetchPokemon(name: string): Promise<PokemonDetails> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${formatPokemonName(name)}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching ${name}`);
  }

  const result = await response.json();
  const pokemon: PokemonDetails = {
    name: result.name,
    id: result.id,
    imgSrc:
      result.sprites.versions?.["generation-v"]?.["black-white"]?.animated
        ?.front_default || result.sprites.front_default,
    hp: result.stats[0].base_stat,
    attack: result.stats[1].base_stat,
    defense: result.stats[2].base_stat,
    speed: result.stats[5].base_stat,
    specialAttack: result.stats[3].base_stat,
    specialDefense: result.stats[4].base_stat,
    height: result.height,
    weight: result.weight,
    types: result.types.map((type: any) => type.type.name),
    abilities: result.abilities.map((ability: any) => ability.ability.name),
    moves: result.moves.map((move: any) => move.move.name),
    species: result.species.name,
    sprites: {
      front_default: result.sprites.front_default,
      back_default: result.sprites.back_default,
      front_shiny: result.sprites.front_shiny,
      back_shiny: result.sprites.back_shiny,
      animated:
        result.sprites.versions?.["generation-v"]?.["black-white"]?.animated,
    },
  };

  return pokemon;
}
