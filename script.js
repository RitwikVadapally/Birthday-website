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

const introSub = document.querySelector(".introSub");
const introLine = "A little birthday moment — made with love, just for you ✨";
let introI = 0;

function typeIntro(){
  if (!introSub) return;
  introSub.textContent = introLine.slice(0, introI++);
  if (introI <= introLine.length) setTimeout(typeIntro, 40);
}
typeIntro();


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
  1: { t: "A tiny reason to smile 😊", b: `You have a smile that changes the mood of a moment quietly, effortlessly.\nIt’s the kind that makes things feel lighter, calmer, better… even on ordinary days.\nI hope you never lose it. And I hope this brings it out right now.` },
  2: { t: "For the heavy days 🌧️", b: `Some days are heavier than others Vyshulu, and that’s okay.\nYou don’t have to take everything on by yourself. People who care about you want to share that weight.\nI’m always around if you need me, in whatever way feels right.` },
  3: { t: "Confidence boost 🌟", b: `If you’re questioning yourself, pause for a second.\nI’ve seen how you handle things, even the hard ones. You have a lot more strength and grace than you realize.\nYou’re doing better than you think. I hope seeing this helps you believe that a little more today.` },
  4: { t: "When you miss me 🤍", b: `Consider this a warm hug you can open anytime, Vyshulu.\nYou don’t need to be okay right now. You don’t need to explain how you’re feeling either.\n Take a moment here - that’s enough. And remember, I’m always cheering for you, even from a tiny distance.` },
  5: { t: "It’s your day 🎂", b: `Today’s a little brighter just because it’s your birthday.\nI hope you feel loved, appreciated, and reminded of how special you are — not just today, but always.\nHappy Birthday Vyshulu 🤍 I am really happy I get to be a part of your special day.` },
  6: { t: "Late-night note 🌙", b: `Some nights are just like this, Vyshulu — quiet, a little restless.\nYou don’t have to worry about everything right now.\nTake a pause, relax, get some rest, and leave things for tomorrow.\nJust know I’m always cheering for you, even when things feel a little heavy.\nI hope this helps you feel a little calmer before you sleep.` }
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

if (
  finalNote &&
  openedCards >= 3 &&
  finalNote.classList.contains("hidden")
) {
  finalNote.classList.remove("hidden");
  typeFinalMessage();

  // Mobile-friendly: bring it into view after the modal closes
  setTimeout(() => {
    finalNote.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 250);
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
  "The way your smile instantly calms me — it’s genuine, innocent, and comes straight from the heart.",
  "How you’re quietly reserved at first, yet unexpectedly playful once someone truly gets to know you.",
  "The way you showed up just for a few minutes that day — with genuine excitement and enthusiasm — and made it feel special.",
  "Your childlike joy — the kind that isn’t loud or performative, just real and full of life.",
  "The way you get shy when I look at you, even as you pretend to push me away.",
  "Your honesty — you don’t pretend or do things for the sake of appearances.",
  "Your thoughtfulness — the way you give from the heart, like gifting me a book and flowers without expecting anything back.",
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

function boop(x, y){
    const b = document.createElement("div");
    b.textContent = "boop!";
    b.style.position = "fixed";
    b.style.left = x + "px";
    b.style.top = y + "px";
    b.style.transform = "translate(-50%, -50%)";
    b.style.fontFamily = '"Caveat", cursive';
    b.style.fontSize = "22px";
    b.style.opacity = "0";
    b.style.pointerEvents = "none";
    b.style.zIndex = "99999";
    document.body.appendChild(b);
  
    b.animate(
      [
        { transform: "translate(-50%, -50%) scale(.9)", opacity: 0 },
        { transform: "translate(-50%, -70%) scale(1)", opacity: 1 },
        { transform: "translate(-50%, -95%) scale(.98)", opacity: 0 }
      ],
      { duration: 900, easing: "ease-out" }
    );
  
    setTimeout(() => b.remove(), 950);
  }
  
  const introCard = document.querySelector(".introCard");
  if (introCard){
    introCard.addEventListener("click", (e) => {
      if (e.target && e.target.id === "startBtn") return;
      boop(e.clientX, e.clientY);
    });
  }
  
  