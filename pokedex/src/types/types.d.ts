export type Sprites = {
  front_default: string;
  other?: {
    "official-artwork": {
      front_default: string;
    };
  };
  versions?: {
    "generation-v": {
      "black-white": {
        animated: {
          front_default: string;
        };
      };
    };
  };
};

export type PokemonDetails = {
  name: string;
  id: number;
  imgSrc: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  specialAttack: number;
  specialDefense: number;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  moves: string[];
  species: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    animated?: {
      front_default?: string;
    };
  };
};

export type Pokemon = {
  name: string;
  id: string; // Usualmente el id es un número, pero aquí se define como string por consistencia con tu ejemplo
  imgSrc: string;
};
