const config = {
  type: Phaser.CANVAS,
  width: 1850,
  height: 852,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1200 }, // gravité réaliste
      debug: false,
    },
  },
  scene: { preload, create, update },
};

const game = new Phaser.Game(config);

let player;
let cursors;
let obstacles;
let ground;
let jumpSpeed = 700; 
let canJump = true;

function preload() {}

function create() {
  
  ground = this.add.rectangle(925, 800, 1850, 10, 0xffffff);
  this.physics.add.existing(ground, true);

  player = this.add.rectangle(200, 600, 50, 50, 0xffffff);
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  
  obstacles = this.physics.add.staticGroup();
  const obstacleData = [
    { x: 500, y: 650, width: 300, height: 50 },
    { x: 900, y: 550, width: 200, height: 50 },
    { x: 1300, y: 450, width: 400, height: 50 },
    { x: 1600, y: 600, width: 200, height: 50 },
  ];

  obstacleData.forEach((data) => {
    const rect = this.add.rectangle(
      data.x,
      data.y,
      data.width,
      data.height,
      0x00ff00
    );
    obstacles.add(rect);
    this.physics.add.existing(rect, true);
  });


  this.physics.add.collider(player, obstacles, () => {
    canJump = true;
  });
  this.physics.add.collider(player, ground, () => {
    canJump = true;
  });

  // --- Clavier ---
  cursors = this.input.keyboard.createCursorKeys();
  this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}

function update() {
  const speed = 200;

  
  player.body.setVelocityX(0);
  if (cursors.left.isDown || this.keyQ.isDown) player.body.setVelocityX(-speed);
  else if (cursors.right.isDown || this.keyD.isDown)
    player.body.setVelocityX(speed);

  // Saut avec limite de hauteur (optionnel)
  if ((cursors.up.isDown || this.keyZ.isDown) && canJump && player.y > 200) {
    player.body.setVelocityY(-jumpSpeed);
    canJump = false;
  }
}

const start = document.getElementById("start");
const container = document.getElementById("game-container");

start.addEventListener("click", () => {
  const canvas = document.querySelector("canvas");
  canvas.style.display = "block";
  container.style.display = "none";
})