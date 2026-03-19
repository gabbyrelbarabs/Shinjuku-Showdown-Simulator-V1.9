const BASE_WIDTH = 800;
const BASE_HEIGHT = 600;
const SPEED_FACTOR = 1.3;

const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let scale = Math.min(canvas.width / BASE_WIDTH, canvas.height / BASE_HEIGHT);
let groundLevel = canvas.height - (50 * scale);
let gravity = 0.6 * scale * SPEED_FACTOR;

function restartGame() {
  location.reload();
}
document.getElementById("retryButton").addEventListener("click", restartGame);
document.getElementById("fightAgainButton").addEventListener("click", restartGame);

const overlay = document.getElementById("overlay");
const startButton = document.getElementById("startButton");
const tutorialToggle = document.getElementById("tutorialToggle");
const tutorialGuide = document.getElementById("tutorialGuide");
const exitTutorial = document.getElementById("exitTutorial");
const tabBasics = document.getElementById("tabBasics");
const tabPlayer = document.getElementById("tabPlayer");
const tabBoss = document.getElementById("tabBoss");
const contentBasics = document.getElementById("contentBasics");
const contentPlayer = document.getElementById("contentPlayer");
const contentBoss = document.getElementById("contentBoss");
startButton.addEventListener("click", startGame);

const pauseButton = document.getElementById("pauseButton");
const pauseMenu = document.getElementById("pauseMenu");
const pauseStats = document.getElementById("pauseStats");
const resumeButton = document.getElementById("resumeButton");
const restartButton = document.getElementById("restartButton");
const mainMenuButton = document.getElementById("mainMenuButton");

const touchControls = document.getElementById("touchControls");
const moveUpBtn = document.getElementById("moveUpBtn");
const moveLeftBtn = document.getElementById("moveLeftBtn");
const moveRightBtn = document.getElementById("moveRightBtn");
const moveDownBtn = document.getElementById("moveDownBtn");
const blueBtn = document.getElementById("blueBtn");
const redBtn = document.getElementById("redBtn");
const maxBlueBtn = document.getElementById("maxBlueBtn");
const maxRedBtn = document.getElementById("maxRedBtn");
const hollowPurpleBtn = document.getElementById("hollowPurpleBtn");
const reverseBtn = document.getElementById("reverseBtn");
const domainBtn = document.getElementById("domainBtn");
const transmitBtn = document.getElementById("transmitBtn");
const sixEyesBtn = document.getElementById("sixEyesBtn");

const blackFlashOverlay = document.getElementById("blackFlashOverlay");
const blackFlashImage = document.getElementById("blackFlashImage");

const titleMusicOptions = ["cool.mp3", "fire.mp3"];
const randomIndex = Math.floor(Math.random() * titleMusicOptions.length);
const titleMusic = new Audio(titleMusicOptions[randomIndex]);
titleMusic.loop = true;
titleMusic.volume = 0.5;

const bgMusic = new Audio("Judas.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

const domainExpansionAudio = new Audio("RyoikiTenkai.mp3");
const malevolentShrineAudio = new Audio("MalevolentShrine.mp3");
malevolentShrineAudio.loop = true;
const infiniteVoidAudio = new Audio("InfiniteVoid.mp3");
const heavenAndEarthMusic = new Audio("HeavenAndEarth.mp3");
heavenAndEarthMusic.loop = true;
const blackFlashSound = new Audio("BlackFlash.mp3");

const fugaAudio = new Audio("Fuga.mp3");
fugaAudio.volume = 1;
const adaptAudio = new Audio("adapt.mp3");
adaptAudio.volume = 1;

const boltImage = new Image();
boltImage.src = "Bolt.png";
const fugaImage = new Image();
fugaImage.src = "Fuga.png";

const bgImage = new Image();
bgImage.src = "shinjuku.webp";
const malevolentShrineBG = new Image();
malevolentShrineBG.src = "MalevolentShrine.webp";
const infiniteVoidBG = new Image();
infiniteVoidBG.src = "InfiniteVoid.jpg";

let bossImage = new Image();
bossImage.src = "sukuna.png";

let playerImage = new Image();
playerImage.src = "gojo.png";
const deadPlayerImage = new Image();
deadPlayerImage.src = "DeadGojo.png";

let mahoragaImage = new Image();
mahoragaImage.src = "Mahoraga.png";
let agitoImage = new Image();
agitoImage.src = "Agito.png";

const bulletBlueImage = new Image();
bulletBlueImage.src = "LapseBlue.png";
const bulletRedImage = new Image();
bulletRedImage.src = "ReversalRed.png";
const hollowPurpleImage = new Image();
hollowPurpleImage.src = "HollowPurple.png";
const slashImage = new Image();
slashImage.src = "Slash.png";

let sixEyesActive = false;
let sixEyesTimer = 0;
let sixEyesBlueCount = 0;
let sixEyesRedCount = 0;
let sixEyesBulletDouble = false;
let sixEyesHollowBonus = false;
let sixEyesUsed = false;
const SIX_EYES_BLUE_COST = 1000;
const SIX_EYES_RED_COST = 100;
const SIX_EYES_DURATION = 60;

const BLUE_BULLET_RADIUS = 12 * scale;
const RED_BULLET_RADIUS = 18 * scale;
const HOLLOW_PURPLE_RADIUS = 45 * scale;
const transmissionCap = 150;

const NORMAL_HOLLOW_PURPLE_BLUE = 100;
const NORMAL_HOLLOW_PURPLE_RED = 20;
const NORMAL_MAX_BLUE = 150;
const NORMAL_MAX_RED = 30;
const REVERSE_CT_REQUIREMENT = 300;
const playerBlackFlashChance = 0.01;

let domainExpansionBulletRequirement = 1500;
let bossLaserDamage = 20;

let transmissionCharge = 0;
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

const keys = {};
let blueBulletCounter = 0;
let totalBlueForMaxBlue = 0;
let redHitCounterForMaxRed = 0;
let hollowBlueCounter = 0;
let hollowRedCounter = 0;
let maxBlueUses = 0;
let maxRedUses = 0;

let player = {
    x: 100 * scale,
    y: groundLevel - 150 * scale,
    width: 60 * scale,
    height: 150 * scale,
    vx: 0,
    vy: 0,
    speed: 4 * 1.3 * SPEED_FACTOR,
    jumpStrength: -16 * 1.3 * 1.1 * SPEED_FACTOR,
    isOnGround: true,
    hp: 1000,
    maxHp: 1000,
    stunned: false,
    stunTimer: 0,
    frozenX: null,
    frozenY: null,
    lastDirection: "right",
    dashing: false,
    dashTimer: 0,
    dashDirection: null,
    dashCooldown: 0,
    dashCount: 3,
    dashRegenTimer: 0,
    damageMultiplier: 1,
    damageTimer: 0,
    speedMultiplier: 1,
    jumpMultiplier: 1,
    speedTimer: 0,
    invincible: false,
    invincibleTimer: 0,
    thorn: false,
    thornTimer: 0,
    timerStopped: false,
    timerStoppedTimer: 0,
    contactDamageTimer: 0,
    dragged: false,
	stunned: false
  };
  
let boss = {
    x: 600 * scale,
    y: groundLevel - 200 * scale,
    width: 80 * scale,
    height: 200 * scale,
    vx: 0,
    vy: 0,
    speed: 2.3 * SPEED_FACTOR,
    hp: 50000,
    maxHp: 50000,
    state: "normal",
    stateTimer: 0,
    attackCooldown: 0,
    airTime: 0,
    laserAttackPhase: "",
    laserAttackTotalTime: 0,
    laserSpawnTimer: 0,
    groundLasers: [],
    chargeTimer: 0,
    dashAfterimages: [],
    needsSlamShake: false,
    hasDamagedPlayerDash: false
  };
  
let bullets = [];

let platforms,
  superAttack,
  totalBulletsFired,
  activePowerup;
let battleTime,
  gameOver,
  finalRank,
  finalWords,
  bossActionTimer,
  powerupSpawnTimer;
let currentBGImage = bgImage;
let reverseChargeCounter = 0;
let reverseActive = false;
let reverseTimer = 0;
let reverseIntervalTimer = 0;
let domainExpansionCounter = 0;
let domainExpansionActive = false;
let domainExpansionUsed = false;
let domainExpansionTimer = 0;
let freezeEverything = false;
let bossFreezeActive = false;
let postDomainFreezeTimer = 0;

let bossPhase = 1;
let phaseTwoTriggered = false;
let phaseThreeTriggered = false;

let cutsceneActive = false;
let cutsceneTimer = 0;
let playerDegenTimer = 0;
let regenTimer = 0;
let regenTicks = 0;
let screenShakeTimer = 0;

let secondPhaseBulletFreqThreshold = 210;
let secondPhaseBulletFreqMultiplier = 1.5;
let secondPhaseBulletSpeedMultiplier = 1;
let secondPhaseBulletSizeMultiplier = 1.5;

let blackFlashBaseChance = 0.01;
let blackFlashCurrentChance = blackFlashBaseChance;
let blackFlashActive = false;
let blackFlashTimer = 0;
const blackFlashFadeDuration = 0.5;

let transmissionRequirementFactor = 1;

let hollowNukeActive = false;
let hollowNukeTimer = 0;
let purpleFlashTimer = 0.5;
let cleaveSlashes = [];
let bgMusicPausedTime = 0;

let maxRedFlashTimer = 0;
let maxBlueFlashTimer = 0;
let maxBlueWindowTimer = 0;
let secondPhaseTimer = 0;
let malevolentPhaseStarted = false;
let cutsceneOverlayAlpha = 0.5;
let malevolentBGAlpha = 0;

let gamePaused = false;

let bossMahoraga = null;
let bossAgito = null;

boss = boss || {};
boss.kamutokeActive = false;
boss.kamutokeTimer = 0;
boss.kamutokeSpawnTimer = 0;
boss.kamutokeBolts = [];

boss.fugaUsed = false;
boss.fugaState = "none";
boss.fugaTarget = null;
boss.tintColor = null;
boss.fugaFlashTimer = 0;

function resetGame() {
	titleMusic.pause();
  domainExpansionAudio.pause();
  domainExpansionAudio.currentTime = 0;
  malevolentShrineAudio.pause();
  malevolentShrineAudio.currentTime = 0;
  bgMusic.pause();
  bgMusicPausedTime = 0;
  bgMusic.currentTime = 0;
  bgMusic.play().catch((e) => console.log("Music playback prevented:", e));

  bossPhase = 1;
  phaseTwoTriggered = false;
  phaseThreeTriggered = false;
  bossMahoraga = null;
  bossAgito = null;

  player = {
    x: 100 * scale,
    y: groundLevel - 150 * scale,
    width: 60 * scale,
    height: 150 * scale,
    vx: 0,
    vy: 0,
    speed: 4 * 1.3 * SPEED_FACTOR,
    jumpStrength: -16 * 1.3 * 1.1 * SPEED_FACTOR,
    isOnGround: true,
    hp: 1000,
    maxHp: 1000,
    stunned: false,
    stunTimer: 0,
    frozenX: null,
    frozenY: null,
    lastDirection: "right",
    dashing: false,
    dashTimer: 0,
    dashDirection: null,
    dashCooldown: 0,
    dashCount: 3,
    dashRegenTimer: 0,
    damageMultiplier: 1,
    damageTimer: 0,
    speedMultiplier: 1,
    jumpMultiplier: 1,
    speedTimer: 0,
    invincible: false,
    invincibleTimer: 0,
    thorn: false,
    thornTimer: 0,
    timerStopped: false,
    timerStoppedTimer: 0,
    contactDamageTimer: 0,
    dragged: false,
	stunned: false
  };

  boss = {
    x: 600 * scale,
    y: groundLevel - 200 * scale,
    width: 80 * scale,
    height: 200 * scale,
    vx: 0,
    vy: 0,
    speed: 2.3 * SPEED_FACTOR,
    hp: 50000,
    maxHp: 50000,
    state: "normal",
    stateTimer: 0,
    attackCooldown: 0,
    airTime: 0,
    laserAttackPhase: "",
    laserAttackTotalTime: 0,
    laserSpawnTimer: 0,
    groundLasers: [],
    chargeTimer: 0,
    dashAfterimages: [],
    needsSlamShake: false,
    hasDamagedPlayerDash: false
  };

  boss.kamutokeActive = false;
  boss.kamutokeTimer = 0;
  boss.kamutokeSpawnTimer = 0;
  boss.kamutokeBolts = [];
  boss.fugaUsed = false;
  boss.fugaState = "none";
  boss.fugaTarget = null;
  boss.tintColor = null;
  boss.fugaFlashTimer = 0;

  platforms = [
    { x: 150 * scale, y: 350 * scale, width: 150 * scale, height: 10 * scale },
    { x: 600 * scale, y: 350 * scale, width: 150 * scale, height: 10 * scale },
    { x: 1050 * scale, y: 350 * scale, width: 150 * scale, height: 10 * scale }
  ];

  bullets = [];
  superAttack = null;
  totalBulletsFired = 0;
  activePowerup = null;
  battleTime = 0;
  gameOver = false;
  finalRank = "";
  bossActionTimer = 0;
  screenShakeTimer = 0;
  powerupSpawnTimer = 300;
  cleaveSlashes = [];
  reverseChargeCounter = 0;
  reverseActive = false;
  reverseTimer = 0;
  reverseIntervalTimer = 0;
  domainExpansionCounter = 0;
  domainExpansionActive = false;
  domainExpansionUsed = false;
  domainExpansionTimer = 0;
  freezeEverything = false;
  bossFreezeActive = false;
  postDomainFreezeTimer = 0;
  cutsceneActive = false;
  cutsceneTimer = 0;
  cutsceneOverlayAlpha = 0;
  malevolentBGAlpha = 0;
  currentBGImage = bgImage;
  regenTimer = 0;
  regenTicks = 0;
  playerDegenTimer = 0;
  redHitCounterForMaxRed = 0;
  totalBlueForMaxBlue = 0;
  hollowBlueCounter = 0;
  hollowRedCounter = 0;
  blueBulletCounter = 0;
  maxBlueUses = 0;
  maxRedUses = 0;
  purpleFlashTimer = 0;
  hollowNukeActive = false;
  hollowNukeTimer = 0;
  secondPhaseTimer = 0;
  malevolentPhaseStarted = false;
}

function circleRectCollide(cx, cy, r, rx, ry, rw, rh) {
  let closestX = Math.max(rx, Math.min(cx, rx + rw));
  let closestY = Math.max(ry, Math.min(cy, ry + rh));
  let dx = cx - closestX,
      dy = cy - closestY;
  return dx * dx + dy * dy <= r * r;
}

function rectIntersect(r1, r2) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

function drawLifebar(entity, x, y, w, h) {
  ctx.fillStyle = "gray";
  ctx.fillRect(x, y, w, h);
  let ratio = entity.hp / entity.maxHp;
  ctx.fillStyle = entity === player ? "green" : "red";
  ctx.fillRect(x, y, w * ratio, h);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.strokeRect(x, y, w, h);
}

titleMusic.play().catch((e) => {
  console.log("Title music playback prevented:", e);
});

function initializetitleMusic() {
  if (titleMusic.paused) {
    titleMusic.play().catch((e) =>
      console.log("Background music playback prevented:", e)
    );
  if (titleMusic.src.includes("fire.mp3")) {
      overlay.classList.add("jump-zoom-fast");
    } else {
      overlay.classList.add("jump-zoom-normal");
    }
  }
  document.removeEventListener("click", initializetitleMusic);
}
document.addEventListener("click", initializetitleMusic);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  scale = Math.min(canvas.width / BASE_WIDTH, canvas.height / BASE_HEIGHT);
  groundLevel = canvas.height - 50 * scale;
});

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener("keydown", (e) => {
  if (freezeEverything || gamePaused) return;
  const key = e.key.toLowerCase();
  keys[key] = true;

  if (key === "b" || key === "B") attemptMaxBlue();
  if (key === "r" || key === "R") attemptMaxRed();
  if (key === "c" || key === "C") attemptHollowPurple();
  if (key === "x" || key === "X") attemptReverseCursed();
  if (key === "v" || key === "V") attemptDomainExpansion();
  if (key === "t" || key === "T") attemptTransmission();
  if (key === "y" || key === "Y") attemptSixEyesAwakening();

  const now = Date.now();
  if (key === "a" || key === "arrowleft" || key === "A") {
    if (now - lastTapLeft < dashThreshold) triggerDash("left");
    lastTapLeft = now;
  }
  if (key === "d" || key === "arrowright" || key === "D") {
    if (now - lastTapRight < dashThreshold) triggerDash("right");
    lastTapRight = now;
  }
});

window.addEventListener("keyup", (e) => {
  if (freezeEverything || gamePaused) return;
  const key = e.key.toLowerCase();
  keys[key] = false;

  if ((key === "w" || key === "arrowup" || key === "W" || key === " ") && !player.isOnGround && player.vy < 0) {
    player.vy *= 0.5;
  }
});

window.addEventListener("contextmenu", (e) => e.preventDefault());

let lastTapLeft = 0,
    lastTapRight = 0;
const dashThreshold = 300;
const dashDuration = 0.4;
const dashSpeed = 12 * SPEED_FACTOR;

function triggerDash(direction) {
  if (!player.dashing && player.dashCount > 0 && player.dashCooldown <= 0) {
    player.dashing = true;
    player.dashDirection = direction;
    player.dashTimer = dashDuration;
    player.dashCount--;
    player.dashCooldown = 1;
    player.invincible = true;
  }
}

function bindMovementButton(button, keyName, dashDirection = null, shortHop = false) {
  if (!button) return;

  const press = (e) => {
    e.preventDefault();
    if (freezeEverything || gamePaused || gameOver) return;

    keys[keyName] = true;

    if (dashDirection) {
      const now = Date.now();
      if (dashDirection === "left") {
        if (now - lastTapLeft < dashThreshold) triggerDash("left");
        lastTapLeft = now;
      } else {
        if (now - lastTapRight < dashThreshold) triggerDash("right");
        lastTapRight = now;
      }
    }
  };

  const release = (e) => {
    e.preventDefault();
    keys[keyName] = false;
    if (shortHop && !player.isOnGround && player.vy < 0) {
      player.vy *= 0.5;
    }
  };

  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointerleave", release);
  button.addEventListener("pointercancel", release);
}

function bindTapButton(button, action) {
  if (!button) return;

  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (freezeEverything || gamePaused || gameOver) return;
    action();
  });
}

bindMovementButton(moveUpBtn, "arrowup", null, true);
bindMovementButton(moveLeftBtn, "arrowleft", "left");
bindMovementButton(moveRightBtn, "arrowright", "right");
bindMovementButton(moveDownBtn, "arrowdown");

bindTapButton(blueBtn, () => shootBullet("blue"));
bindTapButton(redBtn, () => {
  if (blueBulletCounter >= 5) {
    shootBullet("red");
    blueBulletCounter = 0;
  }
});
bindTapButton(maxBlueBtn, attemptMaxBlue);
bindTapButton(maxRedBtn, attemptMaxRed);
bindTapButton(hollowPurpleBtn, attemptHollowPurple);
bindTapButton(reverseBtn, attemptReverseCursed);
bindTapButton(domainBtn, attemptDomainExpansion);
bindTapButton(sixEyesBtn, attemptSixEyesAwakening);

function startGame() {
  if (titleMusic) {
    titleMusic.pause();
    titleMusic.currentTime = 0;
  }
  setInterval(() => {
	titleMusic.pause();
  }, 1);
  overlay.classList.remove("jump-zoom-fast");
  overlay.classList.remove("jump-zoom-normal");

  overlay.style.display = "none";
  tutorialToggle.style.display = "none";
  tutorialGuide.style.display = "none";

  pauseButton.style.display = "block";
  if (touchControls) touchControls.style.display = "flex";
  
  bgMusic.play().catch((err) => console.log("Background music playback prevented.", err));
  resetGame();
  
  gameLoop();
}

tutorialToggle.addEventListener("click", () => {
  tutorialGuide.style.display = "block";
});

exitTutorial.addEventListener("click", () => {
  tutorialGuide.style.display = "none";
});

tabBasics.addEventListener("click", () => {
  contentBasics.style.display = "block";
  contentPlayer.style.display = "none";
  contentBoss.style.display = "none";
});

tabPlayer.addEventListener("click", () => {
  contentBasics.style.display = "none";
  contentPlayer.style.display = "block";
  contentBoss.style.display = "none";
});

tabBoss.addEventListener("click", () => {
  contentBasics.style.display = "none";
  contentPlayer.style.display = "none";
  contentBoss.style.display = "block";
});

function spawnPhase2ExtraBosses() {
  boss.hp += 20000;
  
  bossMahoraga = {
    x: boss.x + boss.width + 20 * scale,
    y: groundLevel - (boss.height * 0.7),
    width: boss.width * 0.8,
    height: boss.height * 0.8,
    vx: 0,
    vy: 0,
    speed: boss.speed * 1.1,
    hp: 35000,
    maxHp: 35000,
    state: "normal",
    defenseMultiplier: 1,
	adaptTimer: 0,
    image: mahoragaImage,
    contactDamage: 1,
    stunned: false,
    stunTimer: 0
  };
  
  bossAgito = {
    x: platforms[0].x,
    y: platforms[0].y - 40 * scale,
    width: boss.width * 0.8,
    height: boss.height * 0.8,
    vx: 0,
    vy: 0,
    speed: boss.speed * 2,
    hp: 12500,
    maxHp: 12500,
    state: "normal",
    image: agitoImage,
    contactDamage: 3,
    hopTimer: 0,
    targetPlatform: null,
    stunned: false,
    stunTimer: 0
  };
}

function updateBossMahoraga(dt) {
  if (!bossMahoraga || bossMahoraga.hp <= 0) return;
  
  if (bossMahoraga.stunned) {
    bossMahoraga.stunTimer -= dt;
    if (bossMahoraga.stunTimer <= 0) {
		bossMahoraga.stunned = false;
	}
    return;
  }
  
  bossMahoraga.adaptTimer += dt;
  while (bossMahoraga.adaptTimer >= 20) {
    bossMahoraga.adaptTimer -= 20;
    applyMahoragaAdaptation();
  }
  
  let targetX = (boss.x + player.x) / 2;
  if (Math.abs(bossMahoraga.x - targetX) > 5) {
    bossMahoraga.vx = targetX - bossMahoraga.x > 0 ? bossMahoraga.speed : -bossMahoraga.speed;
  } else {
    bossMahoraga.vx = 0;
  }
  bossMahoraga.x += bossMahoraga.vx;
  
  let targetY = boss.y;
  if (Math.abs(bossMahoraga.y - targetY) > 5) {
    bossMahoraga.vy = targetY - bossMahoraga.y > 0 ? bossMahoraga.speed : -bossMahoraga.speed;
  } else {
    bossMahoraga.vy = 0;
  }
  bossMahoraga.y += bossMahoraga.vy;
}

function applyMahoragaAdaptation() {
  if (!bossMahoraga) return;

  adaptAudio.currentTime = 0;
  adaptAudio.play().catch((e) => console.log("adapt.mp3 playback prevented:", e));

  bossMahoraga.defenseMultiplier += 0.08;
}

function updateBossAgito(dt) {
  if (!bossAgito || bossAgito.hp <= 0) return;
  
  if (bossAgito.stunned) {
    bossAgito.stunTimer -= dt;
    if (bossAgito.stunTimer <= 0) {
		bossAgito.stunned = false;
	}
    return;
  }
  
  let playerOnPlatform = platforms.some(
	(plat) =>
    player.y + player.height >= plat.y - 5 && player.y + player.height <= plat.y + 5
  );
  
  if (playerOnPlatform) {
    if (Math.abs(bossAgito.x - player.x) > 5) {
      bossAgito.vx = player.x - bossAgito.x > 0 ? bossAgito.speed : -bossAgito.speed;
    } else {
      bossAgito.vx = 0;
    }
  } else {
    bossAgito.vx = 0;
  }
  bossAgito.x += bossAgito.vx;
  
  let closestPlat = platforms.reduce((prev, curr) => {
    let prevDist = Math.abs(prev.y - (bossAgito.y + bossAgito.height));
    let currDist = Math.abs(curr.y - (bossAgito.y + bossAgito.height));
    return currDist < prevDist ? curr : prev;
  });
  
  if (Math.abs(bossAgito.y + bossAgito.height - closestPlat.y) > 5) {
    bossAgito.y += closestPlat.y - (bossAgito.y + bossAgito.height);
  } else {
    bossAgito.y = closestPlat.y - bossAgito.height;
  }
  
  if (activePowerup && rectIntersect(bossAgito, activePowerup)) {
    activePowerup = null;
  }
}

function startSecondPhaseCutscene() {
  cutsceneActive = true;
  freezeEverything = true;
  cutsceneTimer = 0;
  domainExpansionAudio.currentTime = 0;
  domainExpansionAudio.volume = 1;
  domainExpansionAudio.play().catch((e) => console.log("Domain expansion audio blocked:", e));
}

function updateCutscene(dt) {
  cutsceneTimer += dt;
  if (cutsceneTimer < 12) {
    let factor = cutsceneTimer / 12;
    bgMusic.volume = Math.max(0, 0.5 * (1 - factor));
	heavenAndEarthMusic.volume = Math.max(0, 0.5 * (1 - factor));
    cutsceneOverlayAlpha = factor;
    domainExpansionAudio.volume = 1;
  } else if (cutsceneTimer >= 12 && cutsceneTimer < 14) {
    let factor = (cutsceneTimer - 11) / 2;
    malevolentBGAlpha = factor;
  } else if (cutsceneTimer >= 14 && cutsceneTimer < 15) {
    let factor = 1 - (cutsceneTimer - 14);
    domainExpansionAudio.volume = 1;
  } else if (cutsceneTimer >= 15) {
    domainExpansionAudio.pause();
    malevolentShrineAudio.currentTime = 121;
    malevolentShrineAudio.play().catch((e) =>
		console.log("Malevolent Shrine playback prevented:", e)
	);
    cutsceneActive = false;
    freezeEverything = false;
    bossPhase = 3;
    currentBGImage = malevolentShrineBG;
    boss.hp = boss.maxHp;
    bossImage = new Image();
    bossImage.src = "HeianSukuna.webp";
    bossLaserDamage = 40;
    secondPhaseBulletSizeMultiplier = 2;
    secondPhaseBulletSpeedMultiplier = 1;
  }
}

function gameLoop() {
  let dt = 1 / 60;

  if (sixEyesActive) {
  sixEyesTimer -= dt;
  if (sixEyesTimer <= 0) {
    sixEyesActive = false;
    playerImage.src = originalPlayerImageSrc;
    sixEyesHollowBonus = false;
    player.damageMultiplier /= 1.25;
    player.speedMultiplier /= 1.5;
    player.invincible = false;
    sixEyesBulletDouble = false;
    if (bgMusic.src.includes("HeavenAndEarth.mp3")) {
      bgMusic.pause();
      bgMusic.src = "Judas.mp3";
      bgMusic.loop = true;
      bgMusic.play().catch((err) => console.log("Judas playback prevented:", err));
    }
  }
}
  
  if (freezeEverything) {
    if (cutsceneActive) updateCutscene(dt);
    draw();
    requestAnimationFrame(gameLoop);
    return;
  }
  
  if (!gamePaused && !gameOver) {
    if (player.dashCooldown > 0) {
      player.dashCooldown -= dt;
      if (player.dashCooldown < 0) player.dashCooldown = 0;
    }
    if (screenShakeTimer > 0) {
      screenShakeTimer -= dt;
      if (screenShakeTimer < 0) screenShakeTimer = 0;
    }
    if (maxRedFlashTimer > 0) {
      maxRedFlashTimer -= dt;
      if (maxRedFlashTimer < 0) maxRedFlashTimer = 0;
    }
    if (maxBlueFlashTimer > 0) {
      maxBlueFlashTimer -= dt;
      if (maxBlueFlashTimer < 0) maxBlueFlashTimer = 0;
    }
    if (maxBlueWindowTimer > 0) {
      maxBlueWindowTimer -= dt;
      if (maxBlueWindowTimer < 0) maxBlueWindowTimer = 0;
    }
    if (purpleFlashTimer > 0) {
      purpleFlashTimer -= dt;
      if (purpleFlashTimer < 0) purpleFlashTimer = 0;
    }
	
    updateDomainExpansion(dt);
    updateSuperAttack();
	
    if (blackFlashTimer > 0) {
      blackFlashTimer -= dt;
      if (blackFlashTimer < 0) blackFlashTimer = 0;
    }
    if (blackFlashTimer === 0) {
      blackFlashOverlay.style.display = "none";
    }
	
    checkHollowNukeFusion();
	
    if (maxBlueWindowTimer > 0 && rectIntersect(player, boss)) {
      blackFlashTimer = blackFlashFadeDuration;
      blackFlashOverlay.style.display = "block";
      blackFlashImage.src = "BlackFlash.jpg";
      blackFlashSound.currentTime = 0;
      blackFlashSound.play();
      maxBlueWindowTimer = 0;
    }
	
    for (let i = bullets.length - 1; i >= 0; i--) {
      let b = bullets[i];
      b.x += b.vx;
      b.y += b.vy;
	  
      if (
		b.x < 0 ||
		b.x > canvas.width ||
		b.y < 0 ||
		b.y > canvas.height
	) {
        bullets.splice(i, 1);
        continue;
      }
	  
      if (
        boss.state !== "dashAttackCharge" &&
        circleRectCollide(b.x, b.y, b.radius, boss.x, boss.y, boss.width, boss.height)
      ) {
        if (b.maxRed) {
          maxRedFlashTimer = 0.1;
          boss.hp -= 2500;
          boss.x = b.vx > 0 ? canvas.width - boss.width : 0;
          boss.needsSlamShake = true;
          bullets.splice(i, 1);
          continue;
        } else if (b.maxBlue) {
          maxBlueFlashTimer = 0.1;
          boss.x =
            player.lastDirection === "right"
              ? player.x + player.width
              : player.x - boss.width;
          boss.needsSlamShake = true;
          boss.hp -= 1000;
          blackFlashTimer = blackFlashFadeDuration;
          blackFlashOverlay.style.display = "block";
          blackFlashImage.src = "BlackFlash.jpg";
          blackFlashSound.currentTime = 0;
          blackFlashSound.play();
          bullets.splice(i, 1);
          continue;
        } else {
          let bulletDamage = b.color === "blue" ? 75 : 200;
          let actualDamage = bulletDamage * player.damageMultiplier;
          if (currentBGImage === infiniteVoidBG) actualDamage *= 1.25;
          actualDamage *= getDistanceDamageMultiplier();
		  
          if (b.color === "blue") {
            let dx = player.x + player.width / 2 - (boss.x + boss.width / 2);
            let dy = player.y + player.height / 2 - (boss.y + boss.height / 2);
            let mag = Math.sqrt(dx * dx + dy * dy);
            if (mag > 0) {
              let pull = 8 * scale;
              boss.x += (dx / mag) * pull;
              boss.y += (dy / mag) * pull;
            }
          } else if (b.color === "red") {
            let dx = boss.x + boss.width / 2 - (player.x + player.width / 2);
            let dy = boss.y + boss.height / 2 - (player.y + player.height / 2);
            let mag = Math.sqrt(dx * dx + dy * dy);
            if (mag > 0) {
              let push = 80 * scale;
              boss.x += (dx / mag) * push;
              boss.y += (dy / mag) * push;
            }
          }
		  
          if (bossPhase === 1) {
            if (!phaseTwoTriggered && boss.hp - actualDamage < 0.05 * boss.maxHp) {
              boss.hp = 0.05 * boss.maxHp;
              phaseTwoTriggered = true;
              bossPhase = 2;
              spawnPhase2ExtraBosses();
            } else {
              boss.hp = Math.max(boss.hp - actualDamage, 0.05 * boss.maxHp);
            }
          } else if (bossPhase === 2) {
            if (!phaseThreeTriggered && boss.hp - actualDamage < 0.1 * boss.maxHp) {
              boss.hp = 0.1 * boss.maxHp;
              phaseThreeTriggered = true;
              startSecondPhaseCutscene();
            } else {
              boss.hp -= actualDamage;
            }
          } else {
            boss.hp -= actualDamage;
          }
		  
          player.hp = Math.min(player.maxHp, player.hp + actualDamage * 0.001);
          bullets.splice(i, 1);
          continue;
        }
      }
	  
      if (
        bossMahoraga &&
        circleRectCollide(
		b.x, 
		b.y, 
		b.radius,
		bossMahoraga.x, 
		bossMahoraga.y, 
		bossMahoraga.width,
		bossMahoraga.height
		)
      ) {
        if (b.maxRed) {
          bossMahoraga.hp -= 2500;
          bossMahoraga.x = b.vx > 0 ? canvas.width - bossMahoraga.width : 0;
          bullets.splice(i, 1);
          continue;
        } else if (b.maxBlue) {
          bossMahoraga.x =
            player.lastDirection === "right"
              ? player.x + player.width
              : player.x - bossMahoraga.width;
          bossMahoraga.hp -= 1000;
          bullets.splice(i, 1);
          continue;
        } else {
          let damage = (b.color === "blue" ? 75 : 200) * player.damageMultiplier;
          damage /= bossMahoraga.defenseMultiplier;
		  
          if (b.color === "blue") {
            let dx =
              player.x +
              player.width / 2 -
              (bossMahoraga.x + bossMahoraga.width / 2);
            let dy =
              player.y +
              player.height / 2 -
              (bossMahoraga.y + bossMahoraga.height / 2);
            let mag = Math.sqrt(dx * dx + dy * dy);
            if (mag > 0) {
              let pull = 8 * scale;
              bossMahoraga.x += (dx / mag) * pull;
              bossMahoraga.y += (dy / mag) * pull;
            }
          } else if (b.color === "red") {
            let dx =
              bossMahoraga.x +
              bossMahoraga.width / 2 -
              (player.x + player.width / 2);
            let dy =
              bossMahoraga.y +
              bossMahoraga.height / 2 -
              (player.y + player.height / 2);
            let mag = Math.sqrt(dx * dx + dy * dy);
            if (mag > 0) {
              let push = 80 * scale;
              bossMahoraga.x += (dx / mag) * push;
              bossMahoraga.y += (dy / mag) * push;
            }
          }

          bossMahoraga.hp -= damage;
          bullets.splice(i, 1);
          continue;
        }
      }
	  
      if (
        bossAgito &&
        circleRectCollide(
		b.x, 
		b.y, 
		b.radius, 
		bossAgito.x, 
		bossAgito.y, 
		bossAgito.width, 
		bossAgito.height
		)
      ) {
        if (b.maxRed) {
          bossAgito.hp -= 2500;
          bossAgito.x = b.vx > 0 ? canvas.width - bossAgito.width : 0;
          bullets.splice(i, 1);
          continue;
        } else if (b.maxBlue) {
          bossAgito.x =
            player.lastDirection === "right"
              ? player.x + player.width
              : player.x - bossAgito.width;
          bossAgito.hp -= 1000;
          bullets.splice(i, 1);
          continue;
        } else {
          let damage = (b.color === "blue" ? 75 : 200) * player.damageMultiplier;
		  
          if (b.color === "blue") {
            let dx = 
			player.x + 
			player.width / 2 - 
			(bossAgito.x + bossAgito.width / 2);
            let dy = 
			player.y + 
			player.height / 2 - 
			(bossAgito.y + bossAgito.height / 2);
            let mag = Math.sqrt(dx * dx + dy * dy);
            if (mag > 0) {
              let pull = 8 * scale;
              bossAgito.x += (dx / mag) * pull;
              bossAgito.y += (dy / mag) * pull;
            }
          } else if (b.color === "red") {
            let dx = 
			bossAgito.x + bossAgito.width / 2 - (player.x + player.width / 2);
            let dy = 
			bossAgito.y + bossAgito.height / 2 - (player.y + player.height / 2);
            let mag = Math.sqrt(dx * dx + dy * dy);
            if (mag > 0) {
              let push = 80 * scale;
              bossAgito.x += (dx / mag) * push;
              bossAgito.y += (dy / mag) * push;
            }
          }
          bossAgito.hp -= damage;
          bullets.splice(i, 1);
          continue;
        }
      }
    }
	
    if (rectIntersect(player, boss) && !player.invincible) {
      player.contactDamageTimer += dt;
      if (player.contactDamageTimer >= 0.2) {
        let dmg = Math.random() < 0.2 ? 25 : 5;
        if (currentBGImage === infiniteVoidBG) dmg *= 0.75;
        player.hp -= dmg;
        if (Math.random() < 0.2) spawnCleaveSlash();
        player.contactDamageTimer = 0;
      }
    } else {
      player.contactDamageTimer = 0;
    }
	
    if (bossMahoraga && rectIntersect(player, bossMahoraga) && !player.invincible) {
      player.hp -= bossMahoraga.contactDamage;
    }
    if (bossAgito && rectIntersect(player, bossAgito) && !player.invincible) {
      player.hp -= bossAgito.contactDamage;
    }
	
    if (boss.hp <= 0) {
      gameOver = true;
      bossImage.src = "SukunaPou.png";
	  
    }
    if (bossMahoraga && bossMahoraga.hp <= 0) {
		bossMahoraga = null;
	}
    if (bossAgito && bossAgito.hp <= 0) {
		bossAgito = null;
	}
	
    if (player.hp <= 0) {
      gameOver = true;
      playerImage = deadPlayerImage;
    }
	
    if (bossPhase === 3) {
      playerDegenTimer += dt;
      if (playerDegenTimer >= 0.5) {
        playerDegenTimer = 0;
        if (!player.invincible) {
          player.hp = Math.max(0, player.hp - 2);
          spawnCleaveSlash();
        }
      }
    }
	
    if (boss.state === "earthquake") {
      boss.vy += gravity;
      boss.y += boss.vy;
      if (boss.y + boss.height >= groundLevel) {
        boss.y = groundLevel - boss.height;
        boss.vy = 0;
        screenShakeTimer = 0.5;
        boss.needsSlamShake = false;
        if (player.isOnGround) {
          let dmg = 100;
          if (currentBGImage === infiniteVoidBG) dmg *= 0.75;
          if (!player.invincible) player.hp -= dmg;
          player.stunned = true;
          player.stunTimer = 3;
        }
        boss.state = "normal";
      }
    }
	
    if (bossPhase === 1 && boss.hp <= 0.05 * boss.maxHp && !cutsceneActive) {
      boss.hp = 0.05 * boss.maxHp;
      if (!phaseTwoTriggered) {
        phaseTwoTriggered = true;
        spawnPhase2ExtraBosses();
	  }
	}
	
    if (reverseActive) {
      reverseTimer -= dt;
      reverseIntervalTimer += dt;
      if (reverseIntervalTimer >= 0.1) {
        reverseIntervalTimer = 0;
        player.hp = Math.min(player.maxHp, player.hp + player.maxHp * 0.005);
      }
      if (reverseTimer <= 0) reverseActive = false;
    }
	
    updatePlayer(dt);
	
    if (!bossFreezeActive) {
      updateBoss(dt);
      updateBossLasers(dt);
      battleTime += dt;
    }
	
    if (bossPhase === 2 || bossPhase === 3) {
      if (bossMahoraga) updateBossMahoraga(dt);
      if (bossAgito) updateBossAgito(dt);
    }
	
    updatePowerups();
    updateTimers(dt);
	
    for (let i = cleaveSlashes.length - 1; i >= 0; i--) {
      cleaveSlashes[i].timer -= dt;
      if (cleaveSlashes[i].timer <= 0) cleaveSlashes.splice(i, 1);
    }
    if (cutsceneActive) updateCutscene(dt);
  }
  draw();
  requestAnimationFrame(gameLoop);
}

function formatBattleTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  let secsStr = secs.toFixed(0);
  if (secs < 10) {
    secsStr = "0" + secsStr;
  }
  return minutes + ":" + secsStr;
}

pauseButton.addEventListener("click", () => {
  gamePaused = true;
  
  let duration = formatBattleTime(battleTime);
  let attacksUsed = totalBulletsFired;
  let hpPercent = ((player.hp / player.maxHp) * 100).toFixed(2);
  
  pauseStats.innerHTML =
	"<p><strong>Pause Menu</strong><p>" +
    "Battle Duration: " + duration + " <br>" +
    "Attacks Used: " + attacksUsed + "<br>" +
    "Player HP: " + hpPercent + "%";
  
  pauseMenu.style.display = "block";
});

resumeButton.addEventListener("click", () => {
  pauseMenu.style.display = "none";
  gamePaused = false;
  
  player.invincible = true;
  player.invincibleTimer = 2;

  boss.invincible = true;
  boss.invincibleTimer = 2;
});

restartButton.addEventListener("click", () => {
  restartGame();
});

mainMenuButton.addEventListener("click", () => {
  location.reload();
});

window.addEventListener("mousedown", (e) => {
  if (freezeEverything || gamePaused) return;
  if (!player.stunned && !gameOver && !cutsceneActive && !domainExpansionActive) {
    if (e.button === 0) {
      shootBullet("blue");
    } else if (e.button === 2) {
      if (blueBulletCounter >= 5) {
        shootBullet("red");
        blueBulletCounter = 0;
      }
    }
  }
});

if (gameOver) {
  pauseButton.style.display = "none";
}

function attemptSixEyesAwakening() {
  if (player.stunned || gameOver || cutsceneActive || domainExpansionActive || sixEyesActive) return;
  if (sixEyesBlueCount < SIX_EYES_BLUE_COST || sixEyesRedCount < SIX_EYES_RED_COST) return;
  
  sixEyesBlueCount -= SIX_EYES_BLUE_COST;
  sixEyesRedCount -= SIX_EYES_RED_COST;
  
  freezeEverything = true;
  
  if (bgMusic.src.includes("Judas.mp3") || bgMusic.src.includes("MalevolentShrine.mp3")) {
    bgMusic.pause();
    malevolentShrineAudio.pause();
  }
  
  let rightAudio = new Audio("right.mp3");
  rightAudio.play().catch((e) => console.log("right.mp3 playback prevented:", e));
  
  rightAudio.addEventListener("ended", function() {
    playerImage.src = "highgojo.png";
    
    sixEyesHollowBonus = true;
    
    player.damageMultiplier *= 1.25;
    
    player.speedMultiplier *= 1.5;
    
    player.invincible = true;
    player.invincibleTimer = SIX_EYES_DURATION;
    
    if (!bgMusic.src.includes("HeavenAndEarth.mp3")) {
      bgMusic.src = "HeavenAndEarth.mp3";
      bgMusic.loop = true;
      bgMusic.play().catch((err) => console.log("HeavenAndEarth playback prevented:", err));
    }
    
    sixEyesBulletDouble = true;
    
    sixEyesActive = true;
    sixEyesTimer = SIX_EYES_DURATION;
	sixEyesUsed = true;
    
    freezeEverything = false;
  });
}

function startDomainExpansion() {
  domainExpansionUsed = true;
  domainExpansionActive = true;
  freezeEverything = true;
  domainExpansionBulletRequirement = 1500;
  bgMusic.pause();
  malevolentShrineAudio.pause();
  infiniteVoidAudio.currentTime = 0;
  infiniteVoidAudio.play().catch((err) => console.log("Infinite Void audio blocked:", err));

  infiniteVoidAudio.addEventListener(
    "ended",
    function () {
      bossFreezeActive = true;
      postDomainFreezeTimer = 20;
      currentBGImage = infiniteVoidBG;
      heavenAndEarthMusic.currentTime = 0;
      heavenAndEarthMusic.play().catch((e) => 
		console.log("HeavenAndEarth playback prevented:", e)
	);
      freezeEverything = false;
      domainExpansionActive = false;
    },
    { once: true }
  );
}

function updateDomainExpansion(dt) {
  if (bossFreezeActive) {
    postDomainFreezeTimer -= dt;
    if (postDomainFreezeTimer <= 0) {
      bossFreezeActive = false;
    }
  }
}

function attemptTransmission() {
  if (player.stunned || gameOver || cutsceneActive || domainExpansionActive) return;
  if (player.dashCount <= 0) return;
  if (transmissionCharge < 150) return;

  transmissionCharge -= 150;
  player.dashCount--;

  player.x = mouseX - player.width / 2;
  player.y = mouseY - player.height / 2;
  
  if (transmissionCharge > transmissionCap) {
	transmissionCharge = transmissionCap;
  }
}

function shootBullet(color) {
  let increment = sixEyesActive ? 2 : 1;
  if (color === "blue") {
    blueBulletCounter += increment;
    totalBlueForMaxBlue += increment;
    hollowBlueCounter += increment;
    sixEyesBlueCount += increment;
    sixEyesBlueCount = Math.min(sixEyesBlueCount, 1000);
	
    let blueCap =
      currentBGImage === infiniteVoidBG
        ? Math.round(NORMAL_MAX_BLUE * 0.75)
        : NORMAL_MAX_BLUE;
    if (totalBlueForMaxBlue > blueCap) totalBlueForMaxBlue = blueCap;

    let hollowBlueCap =
      currentBGImage === infiniteVoidBG
        ? Math.round(NORMAL_HOLLOW_PURPLE_BLUE * 0.75)
        : NORMAL_HOLLOW_PURPLE_BLUE;
    if (hollowBlueCounter > hollowBlueCap) hollowBlueCounter = hollowBlueCap;
	
	if (sixEyesActive) {
	if (transmissionCharge < transmissionCap) {
    transmissionCharge += increment - 1;
    if (transmissionCharge > transmissionCap) {
      transmissionCharge = transmissionCap;
    }
  }
	}
	
  if (sixEyesActive) {
  if (domainExpansionCounter < domainExpansionBulletRequirement) {
    domainExpansionCounter += increment - 1;
    if (domainExpansionCounter > domainExpansionBulletRequirement) {
      domainExpansionCounter = domainExpansionBulletRequirement;
    }
  }
  }
  
  } else {
    redHitCounterForMaxRed += increment;
    hollowRedCounter += increment;
	sixEyesRedCount += increment;
    sixEyesRedCount = Math.min(sixEyesRedCount, 100);
	
    let hollowRedCap =
      currentBGImage === infiniteVoidBG
        ? Math.round(NORMAL_HOLLOW_PURPLE_RED * 0.75)
        : NORMAL_HOLLOW_PURPLE_RED;
    if (hollowRedCounter > hollowRedCap) hollowRedCounter = hollowRedCap;

    let maxRedCap =
      currentBGImage === infiniteVoidBG
        ? Math.round(NORMAL_MAX_RED * 0.75)
        : NORMAL_MAX_RED;
    if (redHitCounterForMaxRed > maxRedCap) redHitCounterForMaxRed = maxRedCap;
  }
  
  let radius, chosenImage;
  let bulletSpeed = 6 * SPEED_FACTOR;
  if (color === "blue") {
    radius = BLUE_BULLET_RADIUS;
    chosenImage = bulletBlueImage;
  } else {
    radius = RED_BULLET_RADIUS;
    chosenImage = bulletRedImage;
  }
  
  let dir = player.lastDirection === "left" ? -1 : 1;
  bullets.push({
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    vx: bulletSpeed * dir,
    vy: 0,
    color: color,
    radius: radius,
    bulletImage: chosenImage
  });
  
  totalBulletsFired++;
  if (reverseChargeCounter < REVERSE_CT_REQUIREMENT) reverseChargeCounter++;
  if (domainExpansionCounter < domainExpansionBulletRequirement)
    domainExpansionCounter++;

  if (transmissionCharge < transmissionCap) {
    transmissionCharge++;
  }
}

function updateSuperAttack() {
  if (!superAttack) return;
  let dir = superAttack.direction === "left" ? -1 : 1;
  superAttack.x += 12 * dir;
  superAttack.lifetime -= 1 / 60;
  
  if (superAttack.lifetime <= 0) {
    superAttack = null;
  } else {
    if (
      circleRectCollide(
        superAttack.x,
        superAttack.y,
        superAttack.radius,
        boss.x,
        boss.y,
        boss.width,
        boss.height
      )
    ) {
      let actualDamage = superAttack.damage * player.damageMultiplier;
      if (currentBGImage === infiniteVoidBG) actualDamage *= 1.25;
      actualDamage *= getDistanceDamageMultiplier();
      boss.hp -= actualDamage;
      player.hp = Math.min(player.maxHp, player.hp + actualDamage * 0.001);
      superAttack = null;
    } else if (superAttack.x < 0 || superAttack.x > canvas.width) {
      superAttack = null;
    }
  }
}

function attemptHollowPurple() {
  let factor = currentBGImage === infiniteVoidBG ? 0.75 : 1;
  let reqBlue =
    currentBGImage === infiniteVoidBG
      ? Math.round(NORMAL_HOLLOW_PURPLE_BLUE * factor)
      : NORMAL_HOLLOW_PURPLE_BLUE;
  let reqRed =
    currentBGImage === infiniteVoidBG
      ? Math.round(NORMAL_HOLLOW_PURPLE_RED * factor)
      : NORMAL_HOLLOW_PURPLE_RED;

  if (player.stunned || gameOver || cutsceneActive || domainExpansionActive) return;
  if (hollowBlueCounter >= reqBlue && hollowRedCounter >= reqRed) {
    fireSuperAttack();
    hollowBlueCounter = 0;
    hollowRedCounter = 0;
  }
}

function attemptReverseCursed() {
  if (
    player.stunned ||
    reverseActive ||
    gameOver ||
    cutsceneActive ||
    domainExpansionActive ||
    reverseChargeCounter < REVERSE_CT_REQUIREMENT
  )
    return;
	
  reverseActive = true;
  reverseTimer = 5;
  reverseIntervalTimer = 0;
  reverseChargeCounter = 0;
}

function attemptDomainExpansion() {
  if (
    domainExpansionCounter >= domainExpansionBulletRequirement &&
    !domainExpansionUsed &&
    !domainExpansionActive &&
    !gameOver
  ) {
    startDomainExpansion();
  }
}

function attemptMaxBlue() {
  let factor = currentBGImage === infiniteVoidBG ? 0.75 : 1;
  let req =
    currentBGImage === infiniteVoidBG ? Math.round(NORMAL_MAX_BLUE * factor) : NORMAL_MAX_BLUE;
  if (totalBlueForMaxBlue >= req && maxBlueUses < 3) {
    let dir = player.lastDirection === "left" ? -1 : 1;
    let projSpeed = 4 * SPEED_FACTOR;
    let bullet = {
      x: player.x + player.width / 2,
      y: player.y + player.height / 2,
      vx: projSpeed * dir,
      vy: 0,
      color: "maxblue",
      radius: 50 * scale,
      maxBlue: true,
      bulletImage: bulletBlueImage
    };
    bullets.push(bullet);
    totalBlueForMaxBlue = 0;
    maxBlueUses++;
    maxBlueWindowTimer = 1;
    maxBlueFlashTimer = 0.1;
  }
}

function attemptMaxRed() {
  let factor = currentBGImage === infiniteVoidBG ? 0.75 : 1;
  let req =
    currentBGImage === infiniteVoidBG ? Math.round(NORMAL_MAX_RED * factor) : NORMAL_MAX_RED;
  if (redHitCounterForMaxRed >= req && maxRedUses < 3) {
    let dir = player.lastDirection === "left" ? -1 : 1;
    let projSpeed = 8 * SPEED_FACTOR;
    let bullet = {
      x: player.x + player.width / 2,
      y: player.y + player.height / 2,
      vx: projSpeed * dir,
      vy: 0,
      color: "maxred",
      radius: 50 * scale,
      maxRed: true,
      bulletImage: bulletRedImage
    };
    bullets.push(bullet);
    redHitCounterForMaxRed = 0;
    maxRedUses++;
    maxRedFlashTimer = 0.1;
  }
}

function checkHollowNukeFusion() {
  for (let i = 0; i < bullets.length; i++) {
    let b1 = bullets[i];
    if (b1.maxRed || b1.maxBlue) {
      for (let j = i + 1; j < bullets.length; j++) {
        let b2 = bullets[j];
        if ((b1.maxRed && b2.maxBlue) || (b1.maxBlue && b2.maxRed)) {
          let dx = b1.x - b2.x, dy = b1.y - b2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b1.radius + b2.radius) {
            bullets.splice(j, 1);
            bullets.splice(i, 1);
            hollowNukeActive = true;
            hollowNukeTimer = 1;
            purpleFlashTimer = 5;
            boss.hp -= 10000;
            boss.stunned = true;
            boss.stunTimer = 5;
            boss.needsSlamShake = true;
            if (bossMahoraga) {
              bossMahoraga.hp -= 10000;
              bossMahoraga.stunned = true;
              bossMahoraga.stunTimer = 5;
            }
            if (bossAgito) {
              bossAgito.hp -= 15000;
              bossAgito.stunned = true;
              bossAgito.stunTimer = 5;
            }
            return;
          }
        }
      }
    }
  }
}

function fireSuperAttack() {
  superAttack = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    radius: HOLLOW_PURPLE_RADIUS,
    direction: player.lastDirection,
    lifetime: 2,
    image: hollowPurpleImage,
    damage: 3000
  };
}

function spawnPowerup() {
  const types = ["red", "blue", "yellow", "redorange", "green", "brown"];
  const type = types[Math.floor(Math.random() * types.length)];
  const plat = platforms[Math.floor(Math.random() * platforms.length)];
  const puWidth = 20 * scale,
        puHeight = 20 * scale;
  const puX = plat.x + Math.random() * (plat.width - puWidth);
  const puY = plat.y - puHeight;
  activePowerup = {
    type,
    x: puX,
    y: puY,
    width: puWidth,
    height: puHeight
  };
}

function applyPowerup(pu) {
  switch (pu.type) {
    case "red":
      player.damageMultiplier = 2;
      player.damageTimer = 10;
      break;
    case "blue":
      player.invincible = true;
      player.invincibleTimer = 5;
      break;
    case "yellow":
      player.speedMultiplier = 2;
      player.speedTimer = 10;
      break;
    case "redorange":
	  const choice = Math.floor(Math.random() * 4);
	  if (choice === 0) {
		hollowBlueCounter =
		currentBGImage === infiniteVoidBG
		  ? Math.round(NORMAL_HOLLOW_PURPLE_BLUE * 0.75)
          : NORMAL_HOLLOW_PURPLE_BLUE;
		hollowRedCounter =
		currentBGImage === infiniteVoidBG
          ? Math.round(NORMAL_HOLLOW_PURPLE_RED * 0.75)
          : NORMAL_HOLLOW_PURPLE_RED;
	  } else if (choice === 1) {
		totalBlueForMaxBlue =
		currentBGImage === infiniteVoidBG
          ? Math.round(NORMAL_MAX_BLUE * 0.75)
          : NORMAL_MAX_BLUE;
	  } else if (choice === 2) {
		redHitCounterForMaxRed =
		currentBGImage === infiniteVoidBG
          ? Math.round(NORMAL_MAX_RED * 0.75)
          : NORMAL_MAX_RED;
	  } else {
		reverseChargeCounter = REVERSE_CT_REQUIREMENT;
	  }
	  break;
    case "green":
      player.hp = Math.min(player.maxHp, player.hp + 0.25 * player.maxHp);
      break;
    case "brown":
      player.thorn = true;
      player.thornTimer = 5;
      player.brownDamageReduction = true;
      player.brownDamageReductionTimer = 5;
      break;
  }
}

function updatePowerups() {
  if (!activePowerup) {
    powerupSpawnTimer--;
    if (powerupSpawnTimer <= 0) {
      spawnPowerup();
      powerupSpawnTimer = 300 + Math.floor(Math.random() * 300);
    }
  } else {
    if (rectIntersect(activePowerup, player)) {
      applyPowerup(activePowerup);
      activePowerup = null;
    }
  }
}

function updateTimers(dt) {
  if (player.brownDamageReductionTimer) {
    player.brownDamageReductionTimer -= 1 / 60;
    if (player.brownDamageReductionTimer <= 0)
      player.brownDamageReduction = false;
  }
  if (player.damageTimer > 0) {
    player.damageTimer -= 1 / 60;
    if (player.damageTimer <= 0) player.damageMultiplier = 1;
  }
  if (player.speedTimer > 0) {
    player.speedTimer -= 1 / 60;
    if (player.speedTimer <= 0) {
      player.speedMultiplier = 1;
      player.jumpMultiplier = 1;
    }
  }
  if (player.invincibleTimer > 0) {
    player.invincibleTimer -= 1 / 60;
    if (player.invincibleTimer <= 0) player.invincible = false;
  }
  if (player.thornTimer > 0) {
    player.thornTimer -= 1 / 60;
    if (player.thornTimer <= 0) player.thorn = false;
  }
  if (player.timerStoppedTimer > 0) {
    player.timerStoppedTimer -= 1 / 60;
    if (player.timerStoppedTimer <= 0) player.timerStopped = false;
  }
  if (boss.invincibleTimer > 0) {
    boss.invincibleTimer -= 1 / 60;
    if (boss.invincibleTimer <= 0) boss.invincible = false;
  }
}

function calculateRank() {
  if (battleTime <= 300) finalRank = "Special Grade!";
  else if (battleTime <= 420) finalRank = "Grade 1";
  else if (battleTime <= 600) finalRank = "Grade 2";
  else if (battleTime <= 660) finalRank = "Grade 3";
  else if (battleTime <= 720) finalRank = "Grade 4";
  else finalRank = "Unregistered";
}

function calculateWords() {
	if (battleTime <= 60) finalWords = "''Tsk, you were a lot more disappointing than I thought, Satoru Gojo...''";
	else if (battleTime <= 180) finalWords = "''Stand Proud, You're Strong. You're pretty damn good, Satoru Gojo.''";
	else finalWords = "''You were magnificent, Satoru Gojo. I shall remember you for as long as I live!''";
}

function spawnCleaveSlash() {
  const colors = ["red", "white", "black", "darkred"];
  const angles = [0, Math.PI / 2, Math.PI / 4, -Math.PI / 4, Math.PI, -Math.PI / 2];
  let cs = {
    timer: 0.1,
    angle: angles[Math.floor(Math.random() * angles.length)],
    color: colors[Math.floor(Math.random() * colors.length)]
  };
  cleaveSlashes.push(cs);
}

function getDistanceDamageMultiplier() {
  const maxMultiplier = 2.5;
  const maxDistance = 500;
  let dx = boss.x + boss.width / 2 - (player.x + player.width / 2);
  let dy = boss.y + boss.height / 2 - (player.y + player.height / 2);
  let distance = Math.sqrt(dx * dx + dy * dy);
  let multiplier =
    1 + (maxMultiplier - 1) * Math.max(0, (maxDistance - distance) / maxDistance);
  return multiplier;
}

function startDashAttack() {
  boss.state = "dashAttackCharge";
  boss.chargeTimer = 3;
  boss.vx = 0;
  boss.vy = 0;
}

function updateBoss(dt) {
  if (
    boss.state === "normal" ||
    boss.state === "regenerating" ||
    boss.state === "laserAttack"
  ) {
    bossActionTimer++;
  }
  
  if (boss.fugaState === "charging") {
    boss.vx = 0;
    boss.vy = 0;
  }
  if (boss.fugaState === "fired") {
    boss.fugaState = "none";
  }
  
  if (boss.kamutokeActive) {
    boss.kamutokeTimer -= dt;
    boss.kamutokeSpawnTimer -= dt;
    
    if (boss.kamutokeTimer <= 0) {
      boss.kamutokeActive = false;
      boss.tintColor = null;
    } else {
      if (boss.kamutokeSpawnTimer <= 0) {
        boss.kamutokeSpawnTimer = 0.8;
        const cornerPositions = [
          { x: 0, y: 0 },
          { x: canvas.width, y: 0 }
        ];
        cornerPositions.forEach((pos) => {
          let dx = (player.x + player.width / 2) - pos.x;
          let dy = (player.y + player.height / 2) - pos.y;
          let angle = Math.atan2(dy, dx);
          let kamutokeDamage = 10;
          let kamutokeSpeed = 5;
          boss.kamutokeBolts.push({
            x: pos.x,
            y: pos.y,
            vx: kamutokeSpeed * Math.cos(angle),
            vy: kamutokeSpeed * Math.sin(angle),
            damage: kamutokeDamage,
            angle: angle,
            width: 40,
            height: 10,
            freezeDuration: 0.2,
            image: boltImage
          });
        });
      }
    }
    for (let i = boss.kamutokeBolts.length - 1; i >= 0; i--) {
      let kb = boss.kamutokeBolts[i];
      kb.x += kb.vx;
      kb.y += kb.vy;
      if (kb.x < 0 || kb.x > canvas.width || kb.y < 0 || kb.y > canvas.height) {
        boss.kamutokeBolts.splice(i, 1);
      }
    }
  }
  
  if (boss.state === "normal") {
    boss.y = groundLevel - boss.height;
    boss.vy = 0;
    boss.vx = player.x < boss.x ? -boss.speed : boss.speed;
    let threshold = 300;
    if (bossPhase === 2) threshold = secondPhaseBulletFreqThreshold;
    
    if (bossActionTimer >= threshold) {
      bossActionTimer = 0;
      let action = Math.random();
      if (action < 0.08) startDashAttack();
      else if (action < 0.18) { boss.state = "earthquake"; boss.vy = -10 * SPEED_FACTOR; }
      else if (action < 0.25) { boss.state = "normalJump"; boss.airTime = 0.5; boss.vy = -12 * SPEED_FACTOR; }
      else if (action < 0.6) {
        boss.state = "regenerating"; boss.stateTimer = 3; regenTimer = regenTicks = 0; boss.vx = boss.vy = 0;
      }
      else if (action < 0.8) {
        boss.state = "laserAttack"; boss.laserAttackPhase = "jump"; boss.airTime = 0.5;
        boss.vy = -12 * SPEED_FACTOR; boss.groundLasers = []; boss.laserSpawnTimer = 0; boss.laserAttackTotalTime = 10;
      }
   }
    if (bossActionTimer >= threshold) {
      bossActionTimer = 0;
      let action = Math.random();

      if (action < 0.10) {
        startDashAttack();
      }
      else if (action < 0.25) {
        boss.state = "earthquake";
        boss.vy = -10 * SPEED_FACTOR;
      }
      else if (action < 0.40) {
        boss.state = "normalJump";
       boss.airTime = 0.5;
       boss.vy = -12 * SPEED_FACTOR;
     }
      else if (action < 0.55) {
        boss.state = "laserAttack";
        boss.laserAttackPhase = "jump";
        boss.airTime = 0.5;
        boss.vy = -12 * SPEED_FACTOR;
        boss.groundLasers = [];
        boss.laserSpawnTimer = 0;
        boss.laserAttackTotalTime = 10;
      }
      else if (action < 0.65) {
        boss.state = "regenerating";
        boss.stateTimer = 5;
        regenTimer = regenTicks = 0;
       boss.vx = boss.vy = 0;
      }
      else {
        startDashAttack();
      }
    }
    
    if (bossPhase === 3) {
      let specialRoll = Math.random();
      if (!boss.fugaUsed && boss.hp < boss.maxHp * 0.2 && specialRoll < 0.1) {
		boss.fugaUsed = true;
		boss.fugaState = "charging";
		boss.fugaChargeTimer = 5;
		boss.fugaAudioPlayed = false;
		boss.tintColor = "rgba(255,165,0,0.5)";
		boss.vx = 0;
		boss.vy = 0;
		boss.fugaTarget = {
		x: player.x + player.width / 2,
		y: player.y + player.height / 2
		};
        fugaAudio.currentTime = 0;
        fugaAudio.play().catch((err) => console.log("Fuga audio blocked:", err));
      } 
	  
      else if (specialRoll < 0.1) {
        boss.kamutokeActive = true;
        boss.kamutokeTimer = 10;
        boss.kamutokeSpawnTimer = 1;
        boss.vy = -12 * SPEED_FACTOR;
        boss.tintColor = "yellow";
        boss.state = "normal";
      }
	  
	  if (boss.fugaState === "charging") {
		boss.fugaChargeTimer -= dt;
		if (boss.fugaChargeTimer <= 2 && !boss.fugaAudioPlayed) {
			fugaAudio.currentTime = 0;
			fugaAudio.play().catch((err) => console.log("Fuga audio blocked:", err));
			boss.fugaAudioPlayed = true;
		}
		if (boss.fugaChargeTimer <= 0) {
			boss.fugaState = "fired";
			boss.tintColor = null;
			let dx = boss.fugaTarget.x - (boss.x + boss.width / 2);
			let dy = boss.fugaTarget.y - (boss.y + boss.height / 2);
			let angle = Math.atan2(dy, dx);
			boss.groundLasers.push({
			x: boss.x + boss.width / 2,
			y: boss.y + boss.height / 2,
			vx: 40 * Math.cos(angle),
			vy: 40 * Math.sin(angle),
			damage: 1001,
			size: 100,
			special: true,
			angle: angle,
			image: fugaImage,
			isFugaProjectile: true
			});
			boss.fugaState = "none";
			}
		}	
    }
  } else if (boss.state === "normalJump") {
    if (boss.airTime > 0) {
      boss.airTime -= 1 / 60;
      boss.vy += gravity;
      boss.y += boss.vy;
    } else {
      boss.y = groundLevel - boss.height;
      boss.vy = 0;
      boss.state = "normal";
    }
  } else if (boss.state === "earthquake") {
    boss.vy += gravity;
    boss.y += boss.vy;
    if (boss.y + boss.height >= groundLevel) {
      boss.y = groundLevel - boss.height;
      boss.vy = 0;
      screenShakeTimer = 0.5;
      boss.needsSlamShake = false;
      if (player.isOnGround) {
        let dmg = 100;
        if (currentBGImage === infiniteVoidBG) dmg *= 0.75;
        if (!player.invincible) player.hp -= dmg;
        player.stunned = true;
        player.stunTimer = 3;
      }
      boss.state = "normal";
    }
  } else if (boss.state === "regenerating") {
  if (bossPhase === 2) {
    boss.state = "normal";
  } else {
    boss.stateTimer -= 1 / 100;
    let regenRate = 0.008;
    regenTimer += 1 / 100;

	if (regenTimer >= 0.2) {
      regenTimer = 0;
      regenTicks++;
      let healAmount = boss.maxHp * regenRate;
      boss.hp = Math.min(boss.hp + healAmount, boss.maxHp);
    }
  }
  if (boss.stateTimer <= 0 || regenTicks >= 5 / 0.2) {
      boss.state = "normal";
  }
	  
	} else if (boss.state === "laserAttack") {
		if (boss.laserAttackPhase === "jump") {
      boss.airTime -= 1 / 60;
      boss.vy += gravity;
      boss.y += boss.vy;
      if (boss.y + boss.height >= groundLevel) {
        boss.y = groundLevel - boss.height;
        boss.vy = 0;
        boss.needsSlamShake = true;
        boss.laserAttackPhase = "spawn";
        boss.laserSpawnTimer = 0;
      }
    } else if (boss.laserAttackPhase === "spawn") {
      boss.laserAttackTotalTime -= 1 / 60;
      boss.laserSpawnTimer -= 1 / 60;
      if (boss.laserSpawnTimer <= 0) {
        let dx = player.x + player.width / 2 - (boss.x + boss.width / 2);
        let dy = player.y + player.height / 2 - (boss.y + boss.height / 2);
        let finalAngle = Math.atan2(dy, dx);
        let laserSpeed = 4;
        let newLaserDamage = bossLaserDamage;
        let newLaserSize = 40;
        let special = Math.random() < 0.1;
        let newLaserImage = slashImage;
        if (special) {
          if (bossPhase === 3) {
            newLaserSize *= 3;
            newLaserDamage = bossLaserDamage;
          }
        } else if (bossPhase === 3) {
          newLaserDamage = bossLaserDamage;
          newLaserSize *= secondPhaseBulletSizeMultiplier;
        }
        let newLaser = {
          x: boss.x + boss.width / 2,
          y: boss.y + boss.height / 2,
          vx: laserSpeed * Math.cos(finalAngle),
          vy: laserSpeed * Math.sin(finalAngle),
          damage: newLaserDamage,
          size: newLaserSize,
          special: special,
          angle: finalAngle,
          image: newLaserImage
        };
        boss.groundLasers.push(newLaser);
        boss.laserSpawnTimer = 0.8;
      }
      if (boss.laserAttackTotalTime <= 0) boss.state = "normal";
    }
  } else if (boss.state === "dashAttackCharge") {
    boss.chargeTimer -= 1 / 60;
    if (boss.chargeTimer <= 0) {
      boss.state = "dashAttackDash";
      let dx = player.x + player.width / 2 - (boss.x + boss.width / 2);
      let dy = player.y + player.height / 2 - (boss.y + boss.height / 2);
      let mag = Math.sqrt(dx * dx + dy * dy);
      boss.vx = mag !== 0 ? (dx / mag) * 8 : 0;
      boss.vy = mag !== 0 ? (dy / mag) * 8 : 0;
      boss.dashAfterimages = [];
      boss.hasDamagedPlayerDash = false;
    }
  } else if (boss.state === "dashAttackDash") {
    boss.x += boss.vx;
    boss.y += boss.vy;
    if (rectIntersect(player, boss)) {
      if (!boss.hasDamagedPlayerDash) {
        player.hp -= 250;
        player.stunned = true;
        player.stunTimer = 999;
        boss.hasDamagedPlayerDash = true;
      }
      player.dragged = true;
      player.x += boss.vx;
      player.y += boss.vy;
    }
    if (boss.x <= 0 || boss.x + boss.width >= canvas.width) {
      boss.needsSlamShake = true;
      boss.x = boss.x <= 0 ? 0 : canvas.width - boss.width;
      boss.state = "dashAttackStunned";
      boss.stateTimer = 5;
      boss.vx = 0;
      boss.vy = 0;
      player.stunned = false;
      player.dragged = false;
    }
    boss.dashAfterimages.push({ x: boss.x, y: boss.y, ttl: 0.1 });
  } else if (boss.state === "dashAttackStunned") {
    boss.stateTimer -= 1 / 60;
    if (boss.stateTimer <= 0) {
      boss.state = "normal";
      player.dragged = false;
    }
  }
  for (let i = boss.dashAfterimages.length - 1; i >= 0; i--) {
    boss.dashAfterimages[i].ttl -= 1 / 60;
    if (boss.dashAfterimages[i].ttl <= 0) {
      boss.dashAfterimages.splice(i, 1);
    }
  }
  if (
    boss.state === "normal" ||
    boss.state === "regenerating" ||
    boss.state === "laserAttack"
  ) {
    boss.x += boss.vx;
  }
  if (boss.x < 0) boss.x = 0;
  if (boss.x + boss.width > canvas.width) boss.x = canvas.width - boss.width;
  if (boss.y >= groundLevel - boss.height && boss.vy === 0 && boss.needsSlamShake) {
    screenShakeTimer = 0.5;
    boss.needsSlamShake = false;
  }
  for (let i = boss.kamutokeBolts.length - 1; i >= 0; i--) {
    let kb = boss.kamutokeBolts[i];
    let hitbox = { x: kb.x - kb.width / 2, y: kb.y - kb.height / 2, width: kb.width, height: kb.height };
    if (rectIntersect(hitbox, player) && !player.invincible) {
      player.stunned = true;
      player.stunTimer = kb.freezeDuration;
      player.hp = Math.max(0, player.hp - kb.damage);
      boss.kamutokeBolts.splice(i, 1);
    }
  }
}


fugaAudio.addEventListener("ended", () => {
  if (boss.fugaState === "charging") {
    boss.fugaState = "fired";
    boss.tintColor = null;
    if (boss.fugaTarget) {
      let dx = boss.fugaTarget.x - (boss.x + boss.width / 2);
      let dy = boss.fugaTarget.y - (boss.y + boss.height / 2);
      let angle = Math.atan2(dy, dx);
      boss.groundLasers.push({
        x: boss.x + boss.width / 2,
        y: boss.y + boss.height / 2,
        vx: 40 * Math.cos(angle),
        vy: 40 * Math.sin(angle),
        damage: 1001,
        size: 100,
        special: true,
        angle: angle,
        image: fugaImage,
        isFugaProjectile: true
      });
    }
  }
});

function updateBossLasers(dt) {
  for (let i = boss.groundLasers.length - 1; i >= 0; i--) {
    let l = boss.groundLasers[i];
    l.x += l.vx;
    l.y += l.vy;
    if (l.x < 0 || l.x > canvas.width || l.y < 0 || l.y > canvas.height) {
      boss.groundLasers.splice(i, 1);
      continue;
    }
    let laserHitbox = {
      x: l.x - l.size,
      y: l.y - l.size,
      width: l.size * 2,
      height: l.size * 2
    };
    if (rectIntersect(laserHitbox, player) && !player.invincible) {
      if (l.isFugaProjectile) {
        player.hp -= l.damage;
        boss.fugaFlashTimer = 0.5;
      } else {
        let dmg = l.damage;
        if (!l.special && player.brownDamageReduction) {
          dmg *= 0.5;
        }
        if (currentBGImage === infiniteVoidBG) {
          dmg *= 0.75;
        }
        player.hp -= dmg;
        if (player.thorn) boss.hp -= l.damage;
      }
      boss.groundLasers.splice(i, 1);
    }
  }
}

function checkHollowNukeFusion() {
  for (let i = 0; i < bullets.length; i++) {
    let b1 = bullets[i];
    if (b1.maxRed || b1.maxBlue) {
      for (let j = i + 1; j < bullets.length; j++) {
        let b2 = bullets[j];
        if ((b1.maxRed && b2.maxBlue) || (b1.maxBlue && b2.maxRed)) {
          let dx = b1.x - b2.x,
            dy = b1.y - b2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b1.radius + b2.radius) {
            bullets.splice(j, 1);
            bullets.splice(i, 1);

            hollowNukeActive = true;
            hollowNukeTimer = 1;
            purpleFlashTimer = 5;

            boss.hp -= 10000;
            boss.stunned = true;
            boss.stunTimer = 5;
            boss.needsSlamShake = true;

            if (bossMahoraga) {
			  bossMahoraga.hp -= 10000;
              bossMahoraga.stunned = true;
              bossMahoraga.stunTimer = 5;
            }
            if (bossAgito) {
			  bossAgito.hp -= 15000;
              bossAgito.stunned = true;
              bossAgito.stunTimer = 5;
            }

            return;
          }
        }
      }
    }
  }
}

function updatePlayer(dt) {
  if (player.dragged) return;
  
  if (!player.timerStopped) {
    if (player.dashCooldown > 0) {
      player.dashCooldown -= 1 / 60;
      if (player.dashCooldown < 0) player.dashCooldown = 0;
    }
    if (player.dashCount < 3) {
      player.dashRegenTimer += 1 / 60;
      if (player.dashRegenTimer >= 5) {
        player.dashCount++;
        player.dashRegenTimer = 0;
      }
    }
    if (player.dashing) {
      player.dashTimer -= 1 / 60;
      player.vx = player.dashDirection === "left" ? -dashSpeed : dashSpeed;
      player.invincible = true;
      if (player.dashTimer <= 0) {
        player.dashing = false;
        player.invincible = false;
      }
    }
    if (player.stunned) {
      player.stunTimer -= 1 / 60;
      if (player.stunTimer <= 0) {
        player.stunned = false;
        player.frozenX = null;
        player.frozenY = null;
      } else {
        if (player.frozenX === null) {
          player.frozenX = player.x;
          player.frozenY = player.y;
        }
        player.x = player.frozenX;
        player.y = player.frozenY;
      }
    } else {
      let effSpeed = player.speed * player.speedMultiplier;
      if ((keys["w"] || keys["arrowup"] || keys["W"] || keys[" "]) && !player.isOnGround) {
        effSpeed *= 1.1;
      }
      let effJump = player.jumpStrength * player.jumpMultiplier;
      if (!player.dashing) {
        if (keys["a"] || keys["arrowleft"] || keys["A"]) {
          player.vx = -effSpeed;
          player.lastDirection = "left";
        } else if (keys["d"] || keys["arrowright"] || keys["D"]) {
          player.vx = effSpeed;
          player.lastDirection = "right";
        } else {
          player.vx = 0;
        }
      }
      if ((keys["w"] || keys["arrowup"] || keys["W"]) && player.isOnGround) {
        player.vy = effJump;
        player.isOnGround = false;
      }
      if (player.isOnGround && (keys["s"] || keys["arrowdown"] || keys["S"])) {
        player.isOnGround = false;
      }
    }
    player.x += player.vx;
    player.y += player.vy;
	
    if (!player.isOnGround) player.vy += gravity;
    if (player.y + player.height >= groundLevel) {
      player.y = groundLevel - player.height;
      player.vy = 0;
      player.isOnGround = true;
    } else {
      for (let plat of platforms) {
        if (
          player.vy > 0 &&
          player.x + player.width > plat.x &&
          player.x < plat.x + plat.width &&
          player.y + player.height >= plat.y &&
          player.y + player.height < plat.y + plat.height &&
          !(keys["s"] || keys["arrowdown"] || keys["S"])
        ) {
          player.y = plat.y - player.height;
          player.vy = 0;
          player.isOnGround = true;
        }
      }
    }
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
    }
  }
}

function draw() {
  let offsetX = 0,
    offsetY = 0;
  if (screenShakeTimer > 0) {
    offsetX = (Math.random() - 0.5) * 10;
    offsetY = (Math.random() - 0.5) * 10;
  }
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (domainExpansionActive) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    if (currentBGImage && currentBGImage.complete) {
      ctx.drawImage(currentBGImage, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, groundLevel, canvas.width, canvas.height - groundLevel);
  platforms.forEach((plat) => {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  });

  if (activePowerup) {
    ctx.fillStyle = activePowerup.type === "redorange" ? "#FF4500" : activePowerup.type;
    ctx.fillRect(activePowerup.x, activePowerup.y, activePowerup.width, activePowerup.height);
  }

  if (maxRedFlashTimer > 0) {
    ctx.save();
    ctx.fillStyle = `rgba(255,0,0,${maxRedFlashTimer / 0.1})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
  if (maxBlueFlashTimer > 0) {
    ctx.save();
    ctx.fillStyle = `rgba(0,0,255,${maxBlueFlashTimer / 0.1})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  if (blackFlashTimer > 0) {
    ctx.save();
    let t = blackFlashTimer,
      d = blackFlashFadeDuration;
    let opacity = Math.pow(t / d, 2);
    ctx.globalAlpha = opacity;
    ctx.drawImage(blackFlashImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  if (purpleFlashTimer > 0) {
    ctx.save();
    ctx.fillStyle = `rgba(128,0,128,${purpleFlashTimer / 5})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  if (cutsceneActive) {
    ctx.save();
    ctx.globalAlpha = cutsceneOverlayAlpha;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    if (cutsceneTimer >= 12) {
      ctx.save();
      ctx.globalAlpha = malevolentBGAlpha;
      if (malevolentShrineBG.complete) {
        ctx.drawImage(malevolentShrineBG, 0, 0, canvas.width, canvas.height);
      }
      ctx.restore();
    }
  }

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "white";
  ctx.fillRect(5, 5, 300 * scale, 220 * scale);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(5, 5, 300 * scale, 220 * scale);
  ctx.fillStyle = "black";
  ctx.font = 16 * scale + "px sans-serif";

  let minutes = Math.floor(battleTime / 60);
  let seconds = Math.floor(battleTime % 60).toString().padStart(2, "0");
  ctx.fillText("Time: " + minutes + ":" + seconds, 10 * scale, 25 * scale);

  if (blueBulletCounter >= 5) {
    ctx.fillText("Reversal Red ready! (Right click)", 10 * scale, 45 * scale);
  } else {
    ctx.fillText("Reversal Red: " + blueBulletCounter + "/5", 10 * scale, 45 * scale);
  }

  if (maxBlueUses < 3) {
    let factor = currentBGImage === infiniteVoidBG ? 0.75 : 1;
    let reqBlueDisplay = currentBGImage === infiniteVoidBG ?
      Math.round(NORMAL_MAX_BLUE * factor) :
      NORMAL_MAX_BLUE;
    if (totalBlueForMaxBlue >= reqBlueDisplay) {
      ctx.fillText("Max Blue ready! Press B to use", 10 * scale, 65 * scale);
    } else {
      ctx.fillText(
        "Max Blue: " + totalBlueForMaxBlue + "/" + reqBlueDisplay,
        10 * scale,
        65 * scale
      );
    }
  }

  if (maxRedUses < 3) {
    let factor = currentBGImage === infiniteVoidBG ? 0.75 : 1;
    let reqRedDisplay = currentBGImage === infiniteVoidBG ?
      Math.round(NORMAL_MAX_RED * factor) :
      NORMAL_MAX_RED;
    if (redHitCounterForMaxRed >= reqRedDisplay) {
      ctx.fillText("Max Red ready! Press R to use", 10 * scale, 85 * scale);
    } else {
      ctx.fillText(
        "Max Red: " + redHitCounterForMaxRed + "/" + reqRedDisplay,
        10 * scale,
        85 * scale
      );
    }
  }

  let neededBlue =
    currentBGImage === infiniteVoidBG ?
    Math.round(NORMAL_HOLLOW_PURPLE_BLUE * 0.75) :
    NORMAL_HOLLOW_PURPLE_BLUE;
  let neededRed =
    currentBGImage === infiniteVoidBG ?
    Math.round(NORMAL_HOLLOW_PURPLE_RED * 0.75) :
    NORMAL_HOLLOW_PURPLE_RED;
  if (hollowBlueCounter >= neededBlue && hollowRedCounter >= neededRed) {
    ctx.fillText("Hollow Purple Ready! Press C to use", 10 * scale, 105 * scale);
  } else {
    ctx.fillText(
      "Hollow Purple: " +
        hollowBlueCounter +
        "/" +
        neededBlue +
        " blues, " +
        hollowRedCounter +
        "/" +
        neededRed +
        " reds",
      10 * scale,
      105 * scale
    );
  }
  
  let transmissionReq = 150 * transmissionRequirementFactor;

  if (transmissionCharge >= 150 && player.dashCount > 0) {
    ctx.fillText("Transmission Ready! Press T to use",
    10 * scale,
    125 * scale
  );
  } else {
    ctx.fillText("Transmission: " + transmissionCharge + "/" + transmissionReq, 10 * scale, 125 * scale);
  }
  
  if (!sixEyesUsed) {
	if (sixEyesBlueCount < SIX_EYES_BLUE_COST || sixEyesRedCount < SIX_EYES_RED_COST) {
		ctx.fillText("Six Eyes Awakening: " + sixEyesBlueCount + "/" + SIX_EYES_BLUE_COST + " " + sixEyesRedCount + "/" + SIX_EYES_RED_COST, 10 * scale, 145 * scale);
	} else {
		ctx.fillText("Awakening Ready! Press Y to use", 10 * scale, 145 * scale);
	}
  }

  if (!domainExpansionUsed) {
    if (domainExpansionCounter < domainExpansionBulletRequirement) {
      ctx.fillText(
        "Domain Expansion: " +
          domainExpansionCounter +
          "/" +
          domainExpansionBulletRequirement,
        10 * scale,
        165 * scale
      );
    } else {
      ctx.fillText("Domain Expansion Ready! Press V to use", 10 * scale, 165 * scale);
    }
  }

  if (reverseChargeCounter < REVERSE_CT_REQUIREMENT) {
    ctx.fillText(
      "Reversed CT: " + reverseChargeCounter + "/" + REVERSE_CT_REQUIREMENT,
      10 * scale,
      185 * scale
    );
  } else {
    ctx.fillText("Reversed CT Ready! Press X to use", 10 * scale, 185 * scale);
  }

  ctx.fillText("Dashes: " + player.dashCount + "/3", 10 * scale, 205 * scale);
  ctx.restore();

  ctx.save();
  if (player.lastDirection === "left") {
    ctx.translate(player.x + player.width, player.y);
    ctx.scale(-1, 1);
    if (player.hp <= 0) {
      if (deadPlayerImage.complete) {
        ctx.drawImage(deadPlayerImage, 0, 0, player.width, player.height);
      } else {
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, player.width, player.height);
      }
    } else {
      if (playerImage.complete) {
        ctx.drawImage(playerImage, 0, 0, player.width, player.height);
      } else {
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, player.width, player.height);
      }
    }
  } else {
    if (player.hp <= 0) {
      if (deadPlayerImage.complete) {
        ctx.drawImage(deadPlayerImage, player.x, player.y, player.width, player.height);
      } else {
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, player.width, player.height);
      }
    } else {
      if (playerImage.complete) {
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
      } else {
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, player.width, player.height);
      }
    }
  }
  ctx.restore();

  ctx.save();
  if (boss.vx > 0) {
    ctx.translate(boss.x + boss.width, boss.y);
    ctx.scale(-1, 1);
    if (bossImage.complete) {
      ctx.drawImage(bossImage, 0, 0, boss.width, boss.height);
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, boss.width, boss.height);
    }
  } else {
    if (bossImage.complete) {
      ctx.drawImage(bossImage, boss.x, boss.y, boss.width, boss.height);
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
    }
  }
  ctx.restore();

  if (bossMahoraga) {
    ctx.save();
    if (bossMahoraga.vx > 0) {
      ctx.translate(bossMahoraga.x + bossMahoraga.width, bossMahoraga.y);
      ctx.scale(-1, 1);
      if (bossMahoraga.image.complete) {
        ctx.drawImage(
          bossMahoraga.image,
          0,
          0,
          bossMahoraga.width,
          bossMahoraga.height
        );
      } else {
        ctx.fillStyle = "orange";
        ctx.fillRect(0, 0, bossMahoraga.width, bossMahoraga.height);
      }
    } else {
      if (bossMahoraga.image.complete) {
        ctx.drawImage(
          bossMahoraga.image,
          bossMahoraga.x,
          bossMahoraga.y,
          bossMahoraga.width,
          bossMahoraga.height
        );
      } else {
        ctx.fillStyle = "orange";
        ctx.fillRect(
          bossMahoraga.x,
          bossMahoraga.y,
          bossMahoraga.width,
          bossMahoraga.height
        );
      }
    }
    ctx.restore();
  }

  if (bossAgito) {
    ctx.save();
    if (bossAgito.vx < 0) {
      ctx.translate(bossAgito.x + bossAgito.width, bossAgito.y);
      ctx.scale(-1, 1);
      if (bossAgito.image.complete) {
        ctx.drawImage(
          bossAgito.image,
          0,
          0,
          bossAgito.width,
          bossAgito.height
        );
      } else {
        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, bossAgito.width, bossAgito.height);
      }
    } else {
      if (bossAgito.image.complete) {
        ctx.drawImage(
          bossAgito.image,
          bossAgito.x,
          bossAgito.y,
          bossAgito.width,
          bossAgito.height
        );
      } else {
        ctx.fillStyle = "pink";
        ctx.fillRect(bossAgito.x, bossAgito.y, bossAgito.width, bossAgito.height);
      }
    }
    ctx.restore();
  }

  drawLifebar(player, player.x, player.y - 15 * scale, player.width, 8 * scale);
  drawLifebar(boss, boss.x, boss.y - 15 * scale, boss.width, 8 * scale);
  
  if (bossMahoraga) {
    drawLifebar(bossMahoraga, bossMahoraga.x, bossMahoraga.y - 15 * scale, bossMahoraga.width, 8 * scale);
  }
  if (bossAgito) {
    drawLifebar(bossAgito, bossAgito.x, bossAgito.y - 15 * scale, bossAgito.width, 8 * scale);
  }

  if (boss.state === "dashAttackCharge") {
    if (Math.floor(boss.chargeTimer * 10) % 2 === 0) {
      ctx.fillStyle = "red";
      ctx.font = 40 * scale + "px sans-serif";
      ctx.fillText("!", boss.x + boss.width / 2 - 10 * scale, boss.y - 20 * scale);
    }
  }

  for (let af of boss.dashAfterimages) {
    let alpha = af.ttl / 0.1;
    ctx.fillStyle = `rgba(255,0,0,${alpha})`;
    ctx.fillRect(af.x, af.y, boss.width, boss.height);
  }

  for (let b of bullets) {
    if (b.bulletImage && b.bulletImage.complete) {
      ctx.drawImage(
        b.bulletImage,
        b.x - b.radius,
        b.y - b.radius,
        b.radius * 2,
        b.radius * 2
      );
    } else {
      ctx.beginPath();
      ctx.fillStyle = b.color;
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (superAttack) {
    if (superAttack.image && superAttack.image.complete) {
      ctx.drawImage(
        superAttack.image,
        superAttack.x - superAttack.radius,
        superAttack.y - superAttack.radius,
        superAttack.radius * 2,
        superAttack.radius * 2
      );
    } else {
      ctx.fillStyle = "purple";
      ctx.beginPath();
      ctx.arc(superAttack.x, superAttack.y, superAttack.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = "grey";
  ctx.lineWidth = 4;
  for (let l of boss.groundLasers) {
    if (l.image === slashImage && l.image.complete) {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.angle);
      ctx.drawImage(l.image, -(l.size * 3) / 2, -(l.size * 2.5) / 2, l.size * 3, l.size * 2.5);
      ctx.restore();
    } else if (l.image && l.image.complete) {
      ctx.drawImage(
        l.image,
        l.x - (l.size * 3) / 2,
        l.y - (l.size * 2.5) / 2,
        l.size * 3,
        l.size * 2.5
      );
    } else {
      if (l.special) {
        ctx.beginPath();
        ctx.moveTo(l.x - l.size, l.y - l.size);
        ctx.lineTo(l.x + l.size, l.y + l.size);
        ctx.moveTo(l.x + l.size, l.y - l.size);
        ctx.lineTo(l.x - l.size, l.y + l.size);
        ctx.stroke();
      } else {
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        ctx.font = (l.size * 3) * scale + "px sans-serif";
        ctx.fillStyle = "grey";
        ctx.fillText("Laser", -l.size, l.size);
        ctx.restore();
      }
    }
  }
  
  for (let cs of cleaveSlashes) {
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.rotate(cs.angle);
    ctx.strokeStyle = cs.color;
    ctx.lineWidth = 8 / 3;
    ctx.beginPath();
    ctx.moveTo(-player.width, 0);
    ctx.lineTo(player.width, 0);
    ctx.stroke();
    ctx.restore();
  }
  
  if (gameOver) {
    const rectWidth = 700 * scale, rectHeight = 200 * scale;
    const rectX = canvas.width / 2 - rectWidth / 2;
    const rectY = canvas.height / 2 - rectHeight / 2;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    ctx.font = 20 * scale + "px sans-serif";
    let textX = rectX + 20 * scale, textY = rectY + 40 * scale;
    const lineHeight = 30 * scale;
    if (player.hp <= 0) {
      ctx.fillStyle = "red";
      ctx.fillText(finalWords, textX, textY);
      textY += lineHeight;
      ctx.font = 18 * scale + "px sans-serif";
      ctx.fillText("Mission Rank: " + "Failure...", textX, textY);
      textY += lineHeight;
      ctx.fillText("Battle Duration: " + Math.floor(battleTime) + " sec", textX, textY);
      textY += lineHeight;
      ctx.fillText("Attacks Fired: " + totalBulletsFired, textX, textY);
    } else {
      ctx.fillStyle = "blue";
      ctx.fillText("  ''You have exorcised the King of Curses!''", textX, textY);
      textY += lineHeight;
      ctx.font = 18 * scale + "px sans-serif";
      ctx.fillText("Mission Rank: " + finalRank, textX, textY);
      textY += lineHeight;
      ctx.fillText("Battle Duration: " + Math.floor(battleTime) + " sec", textX, textY);
      textY += lineHeight;
      ctx.fillText("Attacks Fired: " + totalBulletsFired, textX, textY);
    }
    ctx.restore();
    
    let buttonTop = (rectY + rectHeight + 10) + "px";
    let retryButton = document.getElementById("retryButton");
    let fightAgainButton = document.getElementById("fightAgainButton");
    retryButton.style.position = "absolute";
    fightAgainButton.style.position = "absolute";
    retryButton.style.left = (canvas.width / 2 - 50) + "px";
    fightAgainButton.style.left = (canvas.width / 2 - 50) + "px";
    retryButton.style.top = buttonTop;
    fightAgainButton.style.top = buttonTop;
    retryButton.style.zIndex = "1000";
    fightAgainButton.style.zIndex = "1000";
    
    if (player.hp <= 0) {
	  calculateWords();
      retryButton.style.display = "block";
      fightAgainButton.style.display = "none";
    } else {
      calculateRank();
      fightAgainButton.style.display = "block";
      retryButton.style.display = "none";
    }
  }
  
  boss.kamutokeBolts.forEach((kb) => {
    ctx.save();
    ctx.translate(kb.x, kb.y);
    ctx.rotate(kb.angle);
    ctx.drawImage(kb.image, -kb.width / 2, -kb.height / 2, kb.width, kb.height);
    ctx.restore();
  });
  
  boss.kamutokeBolts.forEach((kb) => {
    ctx.save();
    ctx.translate(kb.x, kb.y);
    ctx.rotate(kb.angle);
    ctx.drawImage(kb.image, -kb.width / 2, -kb.height / 2, kb.width, kb.height);
    ctx.restore();
  });
  
  if (boss.fugaFlashTimer > 0) {
    boss.fugaFlashTimer -= 1 / 60;
    let alpha = boss.fugaFlashTimer / 0.5;
    ctx.save();
    ctx.fillStyle = `rgba(255,69,0,${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
  
  ctx.restore();
}

fugaAudio.addEventListener("ended", () => {
  if (boss.fugaState === "charging") {
    boss.fugaState = "fired";
    boss.tintColor = null;
    if (boss.fugaTarget) {
      let dx = boss.fugaTarget.x - (boss.x + boss.width / 2);
      let dy = boss.fugaTarget.y - (boss.y + boss.height / 2);
      let angle = Math.atan2(dy, dx);
      boss.groundLasers.push({
        x: boss.x + boss.width / 2,
        y: boss.y + boss.height / 2,
        vx: 40 * Math.cos(angle),
        vy: 40 * Math.sin(angle),
        damage: 1001,
        size: 100,
        special: true,
        angle: angle,
        image: fugaImage,
        isFugaProjectile: true
      });
    }
  }
});