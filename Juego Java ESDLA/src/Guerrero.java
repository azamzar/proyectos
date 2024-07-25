package codigo;

// Métodos "atacar" y "defender":

public interface Guerrero {
    void atacar(Personaje personaje);
    void defender(Personaje personaje);
}

// Estos métodos permiten a un personaje atacar a otro personaje y defenderse de un ataque, respectivamente