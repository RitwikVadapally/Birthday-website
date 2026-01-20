const titleEl = document.getElementById("title");
const revealBtn = document.getElementById("revealBtn");
const surprise = document.getElementById("surprise");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const musicBtn = document.getElementById("musicBtn");
const audio = document.getElementById("audio");
const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");

const HER_NAME = "Vyshulu";
const YOUR_NAME = "Ritwik";

document.querySelector(".sig").textContent = YOUR_NAME;

// Typewriter effect
const headline = `Happy Birthday, ${HER_NAME} ✨`;
let i = 0;
function type(){
  titleEl.textContent = headline.slice(0, i++);
  if (i <= headline.length) requestAnimationFrame(type);
}
type();

const messages = {
  1: {
    t: "A tiny reason to smile 😊",
    b: `You have this calm, kind energy that makes things feel lighter.
I hope today gives you the same comfort you give others.`
  },
  2: {
    t: "For the heavy days 🌧️",
    b: `If today is ever too much, remember: you don’t have to carry it alone.
You’re stronger than you think, and you’re deeply cared for.`
  },
  3: {
    t: "Confidence boost 🌟",
    b: `You’re genuinely impressive — not loudly, not for show… just real.
Back yourself. You deserve good things.`
  },
  4: {
    t: "When you miss me 🤍",
    b: `Consider this a warm hug you can open anytime.
I’m always cheering for you, even from a distance.`
  },
  5: {
    t: "It’s your day 🎂",
    b: `I’m grateful you exist.
I hope this year feels like a soft upgrade: more peace, more wins, more you.`
  },
  6: {
    t: "Late-night note 🌙",
    b: `Breathe. Slow shoulders. Unclench your jaw.
You’re safe. Tomorrow can wait. For now, rest.`
  }
};

document.querySelectorAll(".tile").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-open");
    modalTitle.textContent = messages[key].t;
    modalText.textContent = messages[key].b;
    modal.classList.remove("hidden");
  });
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Confetti (no library)
function confettiBurst(){
  const n = 60;
  for(let i=0;i<n;i++){
    const p = document.createElement("div");
    p.style.position = "fixed";
    p.style.left = (Math.random()*100) + "vw";
    p.style.top = "-10px";
    p.style.width = "8px";
    p.style.height = "10px";
    p.style.borderRadius = "2px";
    p.style.background = `hsl(${Math.random()*360}, 80%, 70%)`;
    p.style.zIndex = 9;

    const fall = 1200 + Math.random()*900;
    const drift = (Math.random()*2-1) * 180;

    p.animate([
      { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
      { transform: `translate(${drift}px, ${window.innerHeight + 120}px) rotate(${360 + Math.random()*360}deg)`, opacity: 0.9 }
    ], { duration: fall, easing: "cubic-bezier(.2,.8,.2,1)" });

    document.body.appendChild(p);
    setTimeout(()=>p.remove(), fall);
  }
}

let playing = false;

// Start experience (reliable audio start)
startBtn.addEventListener("click", async () => {
  try {
    await audio.play();
    playing = true;
    musicBtn.textContent = "Pause music ❚❚";
  } catch (e) {
    playing = false;
    musicBtn.textContent = "Play music ♪";
    alert("If music didn’t start, add a file named song.mp3 to this folder, then try again.");
  }

  intro.style.display = "none";
  confettiBurst();

  // Auto reveal the surprise cards
  surprise.classList.remove("hidden");
  revealBtn.textContent = "Surprise unlocked ✨";
});

// Optional: reveal button
revealBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  confettiBurst();
  revealBtn.textContent = "Surprise unlocked ✨";
});

// Manual toggle
musicBtn.addEventListener("click", async () => {
  try{
    if(!playing){
      await audio.play();
      playing = true;
      musicBtn.textContent = "Pause music ❚❚";
    }else{
      audio.pause();
      playing = false;
      musicBtn.textContent = "Play music ♪";
    }
  }catch(err){
    alert("Add a file named song.mp3 in the same folder (or your browser blocked playback).");
  }
});
