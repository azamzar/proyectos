import { Link } from "react-router-dom";
import styles from "./footer.module.css";

// Assets
import PokemonPic from "../assets/pikachu.png";
import LocationPic from "../assets/pointer.png";
import PokeballPic from "../assets/pokeball.png";
import MapPic from "../assets/Johto-Kanto_Map.png";
import TrainerPic from "../assets/trainercard.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} to="/">
        <img className={styles.footerIcon} src={PokemonPic} alt="Pokémons" />
        Pokémon
      </Link>
      <a
        className={styles.footerLink}
        href={TrainerPic} // Usar href en lugar de to
        target="_blank" // Para abrir la imagen en una nueva pestaña
        rel="noopener noreferrer" // Seguridad adicional al abrir en nueva pestaña
      >
        <img className={styles.footerIcon} src={PokeballPic} alt="Map" />
        Trainer
      </a>
      <a
        className={styles.footerLink}
        href={MapPic} // Usar href en lugar de to
        target="_blank" // Para abrir la imagen en una nueva pestaña
        rel="noopener noreferrer" // Seguridad adicional al abrir en nueva pestaña
      >
        <img className={styles.footerIcon} src={LocationPic} alt="Map" />
        Map
      </a>
    </footer>
  );
};

export default Footer;
