import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPokemon } from "../api/fetchPokemon";
import PokeballImg from "../assets/pokeball.png";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { PokemonDetails } from "../types/types";
import { waitFor } from "../utils/utils";
import styles from "./pokemon.module.css";

const Pokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPokemon() {
      setIsLoading(true);
      await waitFor(500);
      try {
        const fetchedPokemon = await fetchPokemon(name as string);

        // `imgSrc` ya está manejando el GIF animado si está disponible
        setPokemon(fetchedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setPokemon(null);
      } finally {
        setIsLoading(false);
      }
    }
    getPokemon();
  }, [name]);

  if (isLoading || !pokemon) {
    return <LoadingScreen />;
  }

  return (
    <>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" />
        Go Back
      </button>
      <div className={styles.pokemon}>
        <main className={styles.pokemonInfo}>
          <div className={styles.pokemonTitle}>
            {pokemon.name.toUpperCase()}
          </div>
          <div>
            <strong>N. {pokemon.id}</strong>
          </div>
          <div>
            <img
              className={styles.pokemonInfoImg}
              src={pokemon.imgSrc} // Usa `imgSrc`, que puede ser la URL del GIF animado
              alt={pokemon.name}
            />
          </div>
          <div>HP: {pokemon.hp}</div>
          <div>Attack: {pokemon.attack}</div>
          <div>Defense: {pokemon.defense}</div>
          <div>Special Attack: {pokemon.specialAttack}</div>
          <div>Special Defense: {pokemon.specialDefense}</div>
          <div>Speed: {pokemon.speed}</div>
          <div>Height: {pokemon.height / 10} m</div>
          <div>Weight: {pokemon.weight / 10} kg</div>
          <div>Types: {pokemon.types.join(", ")}</div>
          <div>Abilities: {pokemon.abilities.join(", ")}</div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Pokemon;
