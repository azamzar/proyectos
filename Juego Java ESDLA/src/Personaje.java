package codigo;

public class Personaje {
 // Atributos privados
 private String nombre;
 private int salud;
 private int nivel;
 private int edad;

 // Métodos:
 // Constructor
 public Personaje(String nombre, int salud, int nivel) {
     this.nombre = nombre;
     this.salud = salud;
     this.nivel = nivel;
 } // Inicializamos los atributos

 // Sobrecarga de constructor para incluir edad
 public Personaje(String nombre, int salud, int nivel, int edad) {
     this(nombre, salud, nivel);
     this.setEdad(edad);
 }

 // Getters y Setters de los atributos
 public String getNombre() {
     return nombre;
 }

 public void setNombre(String nombre) {
     this.nombre = nombre;
 }

 public int getSalud() {
     return salud;
 }

 public void setSalud(int salud) {
     this.salud = salud;
 }

 public int getNivel() {
     return nivel;
 }

 public void setNivel(int nivel) {
     this.nivel = nivel;
 }

public int getEdad() {
	return edad;
}

public void setEdad(int edad) {
	this.edad = edad;
}
}