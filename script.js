const titleEl = document.getElementById("title");
const revealBtn = document.getElementById("revealBtn");
const surprise = document.getElementById("surprise");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const musicBtn = document.getElementById("musicBtn");
const musicLabel = musicBtn ? musicBtn.querySelector(".musicLabel") : null;

const audio = document.getElementById("audio");
const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");

const admireSection = document.getElementById("admire");
const admireText = document.getElementById("admireText");
const admireBtn = document.getElementById("admireBtn");

const finalNote = document.getElementById("finalNote");
const finalTextEl = document.getElementById("finalText");

const HER_NAME = "Vyshulu";
const YOUR_NAME = "Ritwik";

document.querySelector(".sig").textContent = YOUR_NAME;

let openedCards = 0;
let playing = false;
let revealed = false;

// -------------------- Final note typing --------------------
const finalMessage =
`I hope today reminds you how valued you are — not just today, but on all the ordinary days too.
Keep being you, and know that I’m always rooting for you.
Keep smiling, Vyshulu. Happy Birthday! 🎉`;

function typeFinalMessage(){
  if (!finalTextEl) return;

  let i = 0;
  finalTextEl.textContent = "";

  function type(){
    finalTextEl.textContent += finalMessage[i];
    i++;
    if (i < finalMessage.length) setTimeout(type, 35);
  }
  type();
}

// -------------------- Typewriter effect --------------------
const headline = `Happy Birthday, ${HER_NAME} ✨`;
let ti = 0;
function typeTitle() {
  titleEl.textContent = headline.slice(0, ti++);
  if (ti <= headline.length) requestAnimationFrame(typeTitle);
}
typeTitle();

// -------------------- Messages --------------------
const messages = {
  1: { t: "A tiny reason to smile 😊", b: `You have this calm, kind energy that makes things feel lighter.\nI hope today gives you the same comfort you give others.` },
  2: { t: "For the heavy days 🌧️", b: `If today is ever too much, remember: you don’t have to carry it alone.\nYou’re stronger than you think, and you’re deeply cared for.` },
  3: { t: "Confidence boost 🌟", b: `You’re genuinely impressive — not loudly, not for show… just real.\nBack yourself. You deserve good things.` },
  4: { t: "When you miss me 🤍", b: `Consider this a warm hug you can open anytime.\nI’m always cheering for you, even from a distance.` },
  5: { t: "It’s your day 🎂", b: `I’m grateful you exist.\nI hope this year feels like a soft upgrade: more peace, more wins, more you.` },
  6: { t: "Late-night note 🌙", b: `Breathe. Slow shoulders. Unclench your jaw.\nYou’re safe. Tomorrow can wait. For now, rest.` }
};

function setMusicUI(isOn){
  document.body.classList.toggle("musicOn", isOn);
}

// Keep UI in sync even if browser pauses/plays audio
audio.addEventListener("pause", () => {
  setMusicUI(false);
  playing = false;
  if (musicLabel) musicLabel.textContent = "Play music";
});
audio.addEventListener("play", () => {
  setMusicUI(true);
  playing = true;
  if (musicLabel) musicLabel.textContent = "Pause music";
});

// -------------------- Modal logic --------------------
document.querySelectorAll(".tile").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const key = btn.getAttribute("data-open");
    modalTitle.textContent = messages[key].t;
    modalText.textContent = messages[key].b;
    modal.classList.remove("hidden");

    openedCards++;
    if (openedCards === 3 && finalNote) {
      finalNote.classList.remove("hidden");
      typeFinalMessage();
    }
  });
});

closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.add("hidden");
});

// -------------------- Confetti --------------------
function confettiBurst() {
  const n = 60;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("div");
    p.style.position = "fixed";
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = "-10px";
    p.style.width = "8px";
    p.style.height = "10px";
    p.style.borderRadius = "2px";
    p.style.background = `hsl(${Math.random() * 360}, 80%, 70%)`;
    p.style.zIndex = 9;

    const fall = 1200 + Math.random() * 900;
    const drift = (Math.random() * 2 - 1) * 180;

    p.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${drift}px, ${window.innerHeight + 120}px) rotate(${360 + Math.random() * 360}deg)`,
          opacity: 0.9
        }
      ],
      { duration: fall, easing: "cubic-bezier(.2,.8,.2,1)" }
    );

    document.body.appendChild(p);
    setTimeout(() => p.remove(), fall);
  }
}

// -------------------- Reveal logic --------------------
function revealSurprise() {
  if (revealed) return;
  revealed = true;

  surprise.classList.remove("hidden");
  if (admireSection) admireSection.classList.remove("hidden");
  confettiBurst();

  revealBtn.textContent = "Open one when you feel like it 🌸";
  revealBtn.disabled = true;
  revealBtn.style.opacity = "0.65";
}
revealBtn.addEventListener("click", revealSurprise);

// -------------------- Start experience --------------------
startBtn.addEventListener("click", async () => {
  modal.classList.add("hidden");
  surprise.classList.add("hidden");
  if (admireSection) admireSection.classList.add("hidden");

  revealed = false;
  openedCards = 0;
  if (finalNote) finalNote.classList.add("hidden");
  if (finalTextEl) finalTextEl.textContent = "";

  try {
    await audio.play();
    setMusicUI(true);
    playing = true;
    if (musicLabel) musicLabel.textContent = "Pause music";
  } catch (e) {
    setMusicUI(false);
    playing = false;
    if (musicLabel) musicLabel.textContent = "Play music";
    alert("If music didn’t start, add a file named song.mp3 to this folder, then try again.");
  }

  intro.style.display = "none";
  confettiBurst();

  revealBtn.disabled = false;
  revealBtn.style.opacity = "1";
  revealBtn.textContent = "Unlock the surprise ✨";
});

// -------------------- Manual music toggle --------------------
musicBtn.addEventListener("click", async () => {
  try {
    if (!playing) {
      await audio.play();
      // 'play' event will set UI + label
    } else {
      audio.pause();
      // 'pause' event will set UI + label
    }
  } catch (err) {
    alert("Add a file named song.mp3 in the same folder (or your browser blocked playback).");
  }
});

// -------------------- Admire section --------------------
const admireList = [
  "The way you stay calm even when things get heavy.",
  "How you make people feel comfortable without even trying.",
  "Your kindness — it’s quiet, but it’s real.",
  "The way you think deeply and still stay gentle.",
  "How you show up as yourself, unapologetically."
];

let admireIndex = 0;

if (admireSection && admireBtn && admireText) {
  admireBtn.addEventListener("click", () => {
    if (admireIndex < admireList.length) {
      admireText.textContent = admireList[admireIndex];
      admireText.classList.add("show");
      admireIndex++;
    } else {
      admireBtn.textContent = "That’s all… for now 💛";
      admireBtn.disabled = true;
    }
  });
}

// -------------------- Tile glow follow cursor --------------------
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("mousemove", e => {
    const rect = tile.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    tile.style.setProperty("--mx", `${x}%`);
    tile.style.setProperty("--my", `${y}%`);
  });

  tile.addEventListener("mouseleave", () => {
    tile.style.removeProperty("--mx");
    tile.style.removeProperty("--my");
  });
});
