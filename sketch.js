let espacioJuego;
let espacio;
let estadoJuego = "inicio"; 
// variable para store SJSJSJ se ponia elegant, la clase serpiente
let serpiente
let mover
let comida
let puntos
//variables para almacenan las imagenes
let imagenGameOver; // Variable para almacenar la imagen de Game Over
let imagenInicio; 
let imagenWinner; 
let looser;

//precarga las imagenes gif
function preload() {
  imagenGameOver = loadImage('game-over.gif'); 
  imagenInicio = loadImage('imagenInicio.gif'); 
  imagenWinner = loadImage('imagenWinner.gif'); 
}
  
  
function setup() {
  createCanvas(600, 600);
  //los bordes
  rectMode(CENTER);
  imageMode(CENTER);
  // la velocidad de la vibora
  frameRate(10);
espacioJuego = 30;
  espacio = width / espacioJuego;
  puntos = 0;
   looser = 0
  // las class
    serpiente = new Serpiente();
  comida = new Comida ();
   
}

function draw() {
  background(0);
  
    if (estadoJuego === "inicio") {
    image(imagenInicio, 300, 300);
    push();
    fill(255);
    textSize(20);
    text("Presiona 'k' para empezar", 250, 400);
    pop();
      looser =0
  } else if (estadoJuego === "jugando") {
    looser =0
     push();
    noFill();
    stroke(random(25), random(55), random(255));
    strokeWeight(espacio);
    rect(width/ 2,height/ 2 ,width, height);
    pop();
    if (!serpiente.dead) {
      serpiente.show();
      serpiente.mover();
      serpiente.lados();
      comida.show();
      serpiente.comer(comida);
    } else {
      image(imagenGameOver, 300, 300);
      push();
      fill(random(128, 255), 0, random(128, 255));
      textSize(60);
      text("click x", 300, 350);
       looser += 1;
      pop();
      
       push();
    noFill();
    stroke(random(255), random(255), random(255));
    strokeWeight(espacio);
    rect(width/ 2,height/ 2 ,width, height);
    pop();
    }
  } else if (estadoJuego === "winner") {
    image(imagenWinner, 250, 250);
    push();
    fill(255);
    textSize(20);
    text("Presiona 'k' para reiniciar", 250, 400);
    looser =0
    pop();
  

  // Dibujamos los bordes
    push();
    noFill();
    stroke(random(255), random(255), random(255));
    strokeWeight(espacio);
    rect(width/ 2,height/ 2 ,width, height);
    pop();

  }
}

// class para crear la serpiente
// pero que es un class y objeto
//CLASS; Una clase es como un molde o una plantilla que define las características y comportamientos de un objeto. Es una definición abstracta que describe las propiedades y métodos que tendrán los objetos que se creen a partir de ella. la recta del pastel

// Objeto:Un objeto es una instancia de una clase, es decir, es un elemento concreto que tiene las propiedades y métodos definidos en la clase. Es como un pastel que se ha hecho siguiendo la receta.

class Serpiente {
  constructor() {
    this.pos = createVector(300, 300);// donde queda el comienzo la serpiente
    /// este va aumentar al llamar comido
    this.length = 1
    // un array para guardar las posiciones y ponemos la primera posicion
    this.posHistorial=[this.pos.copy()] 
    this.dead = false
  }
  //esto sirve para que el cuadrado se mueva
  mover() {
  //function keyPressed()
  if (keyCode === LEFT_ARROW) {
    // Código para mover a la izquierda.
    this.pos.x -= espacio;
  }
  if (keyCode === RIGHT_ARROW) {
    this.pos.x += espacio;
  }
  if (keyCode === UP_ARROW) {
    // Código para mover hacia arriba.
    this.pos.y -= espacio;
  }
  if (keyCode === DOWN_ARROW) {
    // Código para mover hacia abajo.
    this.pos.y += espacio;
  }
    /// si la serpiente toca la comida la es llamado 
       this.cola();
    
} // cada vez que comida es tocada llamamos nueva posicion que es comido
    comer(comida) {
    if (this.pos.x === comida.x && this.pos.y === comida.y) {
      comida.comido();
        this.length += 1;

    }
  }

  
  show() {
    noStroke();
    fill(225);
    rect(this.pos.x, this.pos.y, espacio, espacio);
    // aca agremos para que se vaya mostrando la cola en un bucle 
    for (let i = 0; i < this.posHistorial.length; i++) {
      rect(this.posHistorial[i].x, this.posHistorial[i].y, espacio, espacio);
    }
  }
  //Pra que no se pase del canvas y si se paso se cuemple el dead y debe morir la serpiente
lados() {
  if (this.pos.x === 0 || this.pos.x === width || this.pos.y === 0 || this.pos.y === height) {
    this.dead = true;
    looser +=1;
  }
}
  cola() {
    if (this.posHistorial.length >= this.length) {
      this.posHistorial.shift();
    }
    this.posHistorial.push(this.pos.copy());
  }
}
// creamos el class para la comida
class Comida {
  constructor() {
    this.nuevaPosicion();
  }

  nuevaPosicion() {
    this.x = floor(random(1, espacioJuego - 1)) * espacio;
    this.y = floor(random(1, espacioJuego - 1)) * espacio;
  }

  show() {
    push();
    noStroke();
    fill(random(255), random(255), random(255));
    rect(this.x, this.y, espacio, espacio);
    pop();
    fill(255); // Establecemos el color del texto
  textSize(20); // Tamaño del texto
  text("Puntos: " + puntos, 10, 30); // Mostramos la cantidad de puntos en la esquina superior izquierda
  }

  comido() {
  puntos += 1; 
  this.nuevaPosicion(); 
  if(puntos >= 30) estadoJuego = "winner"
}
 
}
function keyPressed() {
  if (key === 'k' && estadoJuego === "inicio") {
    estadoJuego = "jugando";
    serpiente = new Serpiente();
    comida = new Comida();
    puntos = 0;
  } else if (key === 'k' && estadoJuego === "winner") {
    estadoJuego = "inicio";
    serpiente = new Serpiente();
    comida = new Comida();
    puntos = 0;
  } else if (key === 'x'&& looser=== 1) {
    looser -= 1; // Decrementar la variable looser cuando el jugador presiona la tecla 'x'
    estadoJuego = "inicio"; // Resetear el juego
  }
}