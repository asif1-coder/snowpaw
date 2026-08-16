 /* ================= BASIC NAVIGATION ================= */

const scenes = document.querySelectorAll(".scene");
const music = document.getElementById("music");

function showScene(id) {
    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const next = document.getElementById(id);

    if (next) {
        next.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= FLOATING PAWS ================= */

const floatingPaws = document.getElementById("floatingPaws");

function createPaw() {
    const paw = document.createElement("div");

    paw.className = "paw";
    paw.textContent = Math.random() > 0.5 ? "🐾" : "🐱";

    paw.style.left = Math.random() * 100 + "vw";
    paw.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    floatingPaws.appendChild(paw);

    setTimeout(() => {
        paw.remove();
    }, 13000);
}

setInterval(createPaw, 600);


/* ================= START ================= */

document.getElementById("startButton").addEventListener("click", () => {

    music.volume = 0.35;

    music.play().catch(() => {});

    showScene("catchGame");

    startCatchGame();
});


/* ================= CATCH GAME ================= */

let catches = 0;
let catchStarted = false;

function startCatchGame() {

    if (catchStarted) return;

    catchStarted = true;

    const cat = document.getElementById("runningCat");
    const area = document.getElementById("catchArea");

    function moveCat() {

        const maxX = area.clientWidth - 105;
        const maxY = area.clientHeight - 105;

        cat.style.left =
            Math.max(5, Math.random() * maxX) + "px";

        cat.style.top =
            Math.max(5, Math.random() * maxY) + "px";
    }

    moveCat();

    const movement = setInterval(moveCat, 800);

    cat.addEventListener("click", () => {

        catches++;

        document.getElementById("catchScore").textContent = catches;

        if (catches === 1) {
            document.getElementById("catchMessage").textContent =
                "HEY! You caught me! 😭🐾 But I'm escaping again!";
        }

        if (catches === 2) {
            document.getElementById("catchMessage").textContent =
                "Okay okayyy! You're actually good at this. 😂";
        }

        if (catches >= 3) {

            clearInterval(movement);

            document.getElementById("catchMessage").textContent =
                "You caught me three times! Fineee, I surrender! 🏳️🐱";

            setTimeout(() => {
                showScene("reward1");
            }, 1200);
        } else {
            moveCat();
        }
    });
}


/* ================= NORMAL NAVIGATION BUTTONS ================= */

document.querySelectorAll("[data-next]").forEach(button => {

    button.addEventListener("click", () => {

        const next = button.getAttribute("data-next");

        showScene(next);

        if (next === "starGame") {
            startStarGame();
        }

        if (next === "heartGame") {
            startHeartGame();
        }
    });
});


/* ================= SLEEPY GAME ================= */

document.getElementById("hiddenCat").addEventListener("click", () => {

    document.getElementById("sleepMessage").textContent =
        "YOU FOUND HER! 😴🐾🌙 She was sleeping the whole time!";

    setTimeout(() => {
        showScene("reward2");
    }, 1200);
});


/* ================= STAR GAME ================= */

let starCount = 0;
let starStarted = false;

const starMessages = [

    "That star is for how hard you work. 💙",

    "That one is for every time you kept going. ✨",

    "That one is for your beautiful smile. 🥺",

    "That one is for every little thing that makes you YOU. 💙",

    "That one is for every time you cared about me. 🐾",

    "That one is because you deserve your own little sky. 🌌",

    "And this last one... is simply because I love you. 💙"
];

function startStarGame() {

    if (starStarted) return;

    starStarted = true;

    const area = document.getElementById("starArea");

    for (let i = 0; i < 7; i++) {

        const star = document.createElement("div");

        star.className = "star";
        star.textContent = "⭐";

        star.style.left =
            (5 + Math.random() * 85) + "%";

        star.style.top =
            (5 + Math.random() * 80) + "%";

        area.appendChild(star);

        star.addEventListener("click", () => {

            if (star.classList.contains("clicked")) return;

            star.classList.add("clicked");

            starCount++;

            document.getElementById("starScore").textContent =
                starCount;

            document.getElementById("starMessage").textContent =
                starMessages[starCount - 1];

            star.style.transform = "scale(1.8)";
            star.style.opacity = "0";

            setTimeout(() => {
                star.remove();
            }, 300);

            if (starCount === 7) {

                document.getElementById("starMessage").textContent =
                    "You collected every little star. And somehow, you still shine brighter. 🥺💙";

                setTimeout(() => {
                    showScene("reward3");
                }, 1600);
            }
        });
    }
}


/* ================= GAMER GAME ================= */

document.getElementById("yesButton").addEventListener("click", () => {

    document.getElementById("gamerMessage").textContent =
        "CORRECT! 🫡😂 SnowPaw gives an order, and you already know your job.";

    setTimeout(() => {
        showScene("reward4");
    }, 1300);
});


document.querySelectorAll(".wrong").forEach(button => {

    button.addEventListener("click", () => {

        document.getElementById("gamerMessage").textContent =
            "WRONG! 😭🐾 SnowPaw has ordered you. Try again, soldier.";

        button.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 300
            }
        );
    });
});


/* ================= FINAL BOSS ================= */

let bossHP = 5;
let playerHP = 3;
let bossTurn = false;

const bossMessages = [
    "The shield is weakening! ATTACK NOW! ⚔️",
    "Nice hit! 😭🔥 The boss is angry!",
    "The guard cat is preparing a counterattack! 😼",
    "Quick! ATTACK before it raises its shield again! ⚔️",
    "One more hit! YOU GOT THIS! 🐾🔥"
];

document.getElementById("attackButton").addEventListener("click", () => {

    if (bossHP <= 0) return;

    if (bossTurn) {

        document.getElementById("bossMessage").textContent =
            "WAIT! 😭 The boss shield is UP!";

        return;
    }

    bossHP--;

    document.getElementById("bossHealth").textContent =
        bossHP;

    document.getElementById("healthBar").style.width =
        (bossHP / 5 * 100) + "%";

    document.getElementById("bossCat").style.transform =
        "scale(.85) rotate(-8deg)";

    setTimeout(() => {
        document.getElementById("bossCat").style.transform = "";
    }, 200);

    if (bossHP <= 0) {

        document.getElementById("bossMessage").textContent =
            "THE FINAL BOSS HAS FALLEN! 🏆👑🔥";

        document.getElementById("bossTitle").textContent =
            "YOU WON! 😭🐾";

        document.getElementById("attackButton").disabled = true;
        document.getElementById("healButton").disabled = true;

        setTimeout(() => {
            showScene("reward5");
        }, 1800);

        return;
    }

    document.getElementById("bossMessage").textContent =
        bossMessages[5 - bossHP];

    bossTurn = true;

    setTimeout(() => {

        playerHP--;

        document.getElementById("playerHealth").textContent =
            playerHP;

        bossTurn = false;

        if (playerHP <= 0) {

            playerHP = 3;
            bossHP = 5;

            document.getElementById("playerHealth").textContent =
                playerHP;

            document.getElementById("bossHealth").textContent =
                bossHP;

            document.getElementById("healthBar").style.width =
                "100%";

            document.getElementById("bossMessage").textContent =
                "You got defeated! 😭 But SnowPaw gives you another chance. Try again! 💙";

        } else {

            document.getElementById("bossMessage").textContent =
                "OUCH! 😭 The boss attacked you! You have " +
                playerHP +
                " hearts left. ❤️";
        }

    }, 1000);
});


document.getElementById("healButton").addEventListener("click", () => {

    if (playerHP < 3) {

        playerHP++;

        document.getElementById("playerHealth").textContent =
            playerHP;

        document.getElementById("bossMessage").textContent =
            "💙 You healed yourself! But the boss is getting impatient... 😼";

    } else {

        document.getElementById("bossMessage").textContent =
            "Your health is already full! ❤️";
    }
});


/* ================= HEART GAME ================= */

let heartCount = 0;
let heartStarted = false;

const heartMessages = [

    "For every time you cared about me. ❤️",

    "For every time you made me smile. 💗",

    "For every time you checked on me. 🥺",

    "For every little memory we've made together. 💙",

    "And this one... for everything I feel for you. ❤️"
];

function startHeartGame() {

    if (heartStarted) return;

    heartStarted = true;

    const area = document.getElementById("heartArea");

    for (let i = 0; i < 5; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";
        heart.textContent = "❤️";

        heart.style.left =
            (5 + Math.random() * 85) + "%";

        heart.style.top =
            (5 + Math.random() * 80) + "%";

        area.appendChild(heart);

        heart.addEventListener("click", () => {

            if (heart.classList.contains("clicked")) return;

            heart.classList.add("clicked");

            heartCount++;

            document.getElementById("heartScore").textContent =
                heartCount;

            document.getElementById("heartMessage").textContent =
                heartMessages[heartCount - 1];

            heart.style.transform = "scale(2)";
            heart.style.opacity = "0";

            setTimeout(() => {
                heart.remove();
            }, 300);

            if (heartCount === 5) {

                document.getElementById("heartMessage").textContent =
                    "Five hearts collected... but I could never fit all my love for you into just five. ❤️";

                setTimeout(() => {
                    showScene("reward6");
                }, 1700);
            }
        });
    }
}


/* ================================================= */
/*              CORRECTED CONNECT GAME              */
/* ================================================= */

let playerPosition = 5;
let snowpawPosition = 85;
let connected = false;

const playerCat =
    document.getElementById("playerCat");

const snowpawCat =
    document.getElementById("snowpawCat");

function updateCats() {

    /* BOTH CATS USE LEFT POSITION NOW */

    playerCat.style.left =
        playerPosition + "%";

    playerCat.style.right =
        "auto";

    snowpawCat.style.left =
        snowpawPosition + "%";

    snowpawCat.style.right =
        "auto";


    /* REAL DISTANCE BETWEEN THEM */

    const distance =
        Math.abs(snowpawPosition - playerPosition);


    /* MESSAGE CHANGES AS THEY GET CLOSER */

    if (!connected) {

        if (distance > 50) {

            document.getElementById("worldMessage").textContent =
                "They're still far apart... 🥺 Move both cats closer! 🐾";

        } else if (distance > 30) {

            document.getElementById("worldMessage").textContent =
                "They're getting closer! 👀💙";

        } else if (distance > 15) {

            document.getElementById("worldMessage").textContent =
                "Almost there... 🥺🐾💙";

        } else if (distance > 8) {

            document.getElementById("worldMessage").textContent =
                "SO CLOSE! 😭💙 Move them a little more!";

        } else {

            /* THEY ARE CLOSE ENOUGH */

            connected = true;

            playerCat.style.left = "42%";
            snowpawCat.style.left = "48%";

            document.getElementById("worldMessage").textContent =
                "They found each other. 🥺💙🐾";

            /* LITTLE HEART EFFECT */

            createConnectionHearts();

            setTimeout(() => {

                showScene("reward7");

            }, 1800);
        }
    }
}


/* ================= MOVE YOUR CAT ================= */

document.getElementById("playerLeft").addEventListener("click", () => {

    if (connected) return;

    playerPosition =
        Math.max(3, playerPosition - 5);

    updateCats();
});


document.getElementById("playerRight").addEventListener("click", () => {

    if (connected) return;

    playerPosition =
        Math.min(70, playerPosition + 5);

    updateCats();
});


/* ================= MOVE SNOWPAW ================= */

document.getElementById("snowLeft").addEventListener("click", () => {

    if (connected) return;

    snowpawPosition =
        Math.max(30, snowpawPosition - 5);

    updateCats();
});


document.getElementById("snowRight").addEventListener("click", () => {

    if (connected) return;

    snowpawPosition =
        Math.min(97, snowpawPosition + 5);

    updateCats();
});


/* ================= CONNECTION HEARTS ================= */

function createConnectionHearts() {

    const area =
        document.getElementById("worldArea");

    for (let i = 0; i < 12; i++) {

        const heart =
            document.createElement("div");

        heart.textContent =
            i % 2 === 0 ? "💙" : "💕";

        heart.style.position = "absolute";
        heart.style.left = (40 + Math.random() * 15) + "%";
        heart.style.top = (35 + Math.random() * 30) + "%";
        heart.style.fontSize = "25px";
        heart.style.zIndex = "20";
        heart.style.pointerEvents = "none";

        area.appendChild(heart);

        heart.animate(
            [
                {
                    transform: "translateY(20px) scale(.5)",
                    opacity: 0
                },
                {
                    transform: "translateY(-80px) scale(1.2)",
                    opacity: 1
                },
                {
                    transform: "translateY(-150px) scale(.7)",
                    opacity: 0
                }
            ],
            {
                duration: 1800,
                delay: i * 80,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}


/* ================= INITIAL WORLD POSITION ================= */

updateCats();