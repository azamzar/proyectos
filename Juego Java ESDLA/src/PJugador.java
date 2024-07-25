package codigo;

// Esta clase hereda de Personaje e implementa la interfaz Guerrero:

public class PJugador extends Personaje implements Guerrero {
 // Atributos específicos adicionales
 private int edad;
 private int ataque;
 private int defensa;

 // Métodos:
 // Constructor
 public PJugador(String nombre, int salud, int nivel, int edad, int ataque, int defensa) {
     super(nombre, salud, nivel);
     this.edad = edad;
     this.ataque = ataque;
     this.defensa = defensa;
 }

 // Sobrecarga de constructor para incluir edad por defecto
 public PJugador(String nombre, int salud, int nivel, int ataque, int defensa) {
     this(nombre, salud, nivel, 0, ataque, defensa); // Edad por defecto como 0
 }

 // Getters y Setters de los atributos específicos de PJugador
 public int getEdad() {
     return edad;
 }

 public void setEdad(int edad) {
     this.edad = edad;
 }

 public int getAtaque() {
     return ataque;
 }

 public void setAtaque(int ataque) {
     this.ataque = ataque;
 }

 public int getDefensa() {
     return defensa;
 }

 public void setDefensa(int defensa) {
     this.defensa = defensa;
 }

 // Implementación de métodos de la interfaz Guerrero
 @Override
 public void atacar(Personaje personaje) {
     int damage = this.getNivel() * this.ataque;
     if (damage >= personaje.getSalud()) {
         personaje.setSalud(0);
     } else {
         personaje.setSalud(personaje.getSalud() - damage);
     }
 }

 @Override
 public void defender(Personaje personaje) {
     int damage = personaje.getNivel() - this.defensa;
     if (damage > 0) {
         if (damage >= this.getSalud()) {
             this.setSalud(0);
         } else {
             this.setSalud(this.getSalud() - damage);
         }
     }
 }
}