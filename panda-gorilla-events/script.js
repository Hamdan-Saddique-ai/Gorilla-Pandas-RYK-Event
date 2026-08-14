// =====================================================
// Panda & Gorilla Events — site script
// =====================================================
const WA_NUMBER = "923327330518"; // WhatsApp number, digits only, country code first

function waLink(message){
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
}

// ---------- LOADER ----------
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { loader.style.display = "none"; }, 1300);
  }, 1400);
});
// Safety fallback in case load event is delayed
setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader && !loader.classList.contains("open")) {
    loader.classList.add("open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { loader.style.display = "none"; }, 1300);
  }
}, 4500);

// ---------- HEADER SCROLL STATE ----------
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

// ---------- MOBILE NAV ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ---------- SCROLL REVEAL ----------
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- STATIC WHATSAPP CTA BUTTONS ----------
const genericMsg = "Hi Panda & Gorilla Events! I'd like to know more about booking a mascot for my event.";
["navWaBtn","navWaBtnMobile","extrasWaBtn","ctaWaBtn","footerWaBtn","footerWaLink","floatWaBtn"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = waLink(genericMsg);
});

// =====================================================
// PRICING DATA
// =====================================================
const pricing = {
  panda: {
    name: "Panda",
    emoji: "🐼",
    packages: [
      { duration: "1 Hour", original: 22000, discounted: 15400, unit: "/hour" },
      { duration: "2 Hours", original: 44000, discounted: 29000, featured: true, ribbon: "Most Popular" },
      { duration: "4 Hours", original: 88000, discounted: 52000 },
      { duration: "Full Event", custom: true }
    ]
  },
  gorilla: {
    name: "Gorilla",
    emoji: "🦍",
    packages: [
      { duration: "1 Hour", original: 22000, discounted: 15400, unit: "/hour" },
      { duration: "2 Hours", original: 44000, discounted: 29000, featured: true, ribbon: "Most Popular" },
      { duration: "4 Hours", original: 88000, discounted: 52000 },
      { duration: "Full Event", custom: true }
    ]
  },
  both: {
    name: "Panda + Gorilla",
    emoji: "🐼🦍",
    packages: [
      { duration: "1 Hour", original: 44000, discounted: 30800, unit: "/hour" },
      { duration: "2 Hours", original: 88000, discounted: 58000, featured: true, ribbon: "Best Value" },
      { duration: "4 Hours", original: 176000, discounted: 104000 },
      { duration: "Full Event", custom: true }
    ]
  }
};

const includedList = [
  "1 professional mascot performer",
  "Selected costume(s)",
  "Guest interaction & photos",
  "Dancing & entertainment",
  "Full participation for booked duration"
];

function checkIcon(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
}

function renderTickets(mascotKey){
  const data = pricing[mascotKey];
  const grid = document.getElementById("ticketGrid");
  grid.innerHTML = "";

  data.packages.forEach(pkg => {
    const ticket = document.createElement("div");
    ticket.className = "ticket" + (pkg.featured ? " featured" : "");

    let priceHtml;
    if (pkg.custom){
      priceHtml = `<div class="custom-price">Custom Quote</div>`;
    } else {
      priceHtml = `
        <div class="price-row">
          <div class="original">PKR ${pkg.original.toLocaleString()}</div>
          <div class="discounted">PKR ${pkg.discounted.toLocaleString()} <small>${pkg.unit ? pkg.unit : ""}</small></div>
        </div>`;
    }

    const includedHtml = includedList.map(item => `<li>${checkIcon()}${item}</li>`).join("");

    const msg = pkg.custom
      ? `Hi! I'm interested in a Full Event package for ${data.name}. Could you share a custom quote?`
      : `Hi! I'd like to book:\n${data.emoji} Mascot: ${data.name}\n📦 Package: ${pkg.duration}\n💰 Price: PKR ${pkg.discounted.toLocaleString()}\n\nPlease share availability details.`;

    ticket.innerHTML = `
      ${pkg.ribbon ? `<span class="ribbon">${pkg.ribbon}</span>` : ""}
      <div class="duration">${pkg.duration}</div>
      ${priceHtml}
      <hr>
      <ul>${includedHtml}</ul>
      <a href="${waLink(msg)}" target="_blank" rel="noopener" class="btn btn-wa btn-sm btn-block">
        <svg class="wa-icon" viewBox="0 0 32 32" fill="currentColor"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.607 1.908 6.47L4 29l7.72-1.868A11.94 11.94 0 0016.001 27C22.627 27 28 21.627 28 15S22.627 3 16.001 3zm0 21.8a9.76 9.76 0 01-4.98-1.365l-.357-.212-4.583 1.108 1.127-4.466-.233-.366A9.76 9.76 0 016.2 15c0-5.404 4.397-9.8 9.801-9.8 5.403 0 9.8 4.396 9.8 9.8 0 5.404-4.397 9.8-9.8 9.8zm5.36-7.34c-.294-.147-1.74-.858-2.01-.956-.27-.098-.466-.147-.663.147-.196.294-.76.956-.932 1.152-.171.196-.343.22-.637.073-.294-.147-1.241-.457-2.364-1.457-.874-.78-1.464-1.744-1.635-2.038-.171-.294-.018-.453.129-.6.132-.132.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.049-.368-.024-.514-.073-.147-.663-1.598-.909-2.188-.24-.575-.483-.497-.663-.506-.171-.008-.368-.01-.564-.01-.196 0-.514.073-.784.368-.27.294-1.03 1.006-1.03 2.457 0 1.45 1.055 2.85 1.202 3.046.147.196 2.076 3.17 5.032 4.445.703.303 1.251.484 1.678.62.705.224 1.347.192 1.854.117.566-.084 1.74-.711 1.985-1.398.245-.687.245-1.276.171-1.398-.073-.122-.269-.196-.564-.343z"/></svg>
        Book This Package
      </a>
    `;
    grid.appendChild(ticket);
  });
}

// ---------- PRICING TABS ----------
const tabButtons = document.querySelectorAll(".tab-btn");
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTickets(btn.dataset.tab);
  });
});
renderTickets("panda"); // initial render

// ---------- MASCOT CARDS -> JUMP TO PRICING TAB ----------
document.querySelectorAll(".mascot-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".mascot-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    const mascotKey = card.dataset.mascot;

    // sync pricing tabs
    tabButtons.forEach(b => b.classList.toggle("active", b.dataset.tab === mascotKey));
    renderTickets(mascotKey);

    // pre-select in booking form too
    selectBookingMascot(mascotKey === "panda" ? "Panda" : mascotKey === "gorilla" ? "Gorilla" : "Both");

    document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
  });
});

// ---------- EVENT TYPE CARDS -> JUMP TO BOOKING STEP 2 ----------
document.querySelectorAll(".event-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("eventTypeSelect").value = card.dataset.event;
    document.getElementById("book").scrollIntoView({ behavior: "smooth" });
    goToStep(2);
  });
});

// =====================================================
// BOOKING FORM LOGIC
// =====================================================
let bookingState = {
  mascot: "",
  eventType: "",
  date: "",
  time: "",
  duration: "",
  location: "",
  name: "",
  phone: "",
  notes: ""
};
let currentStep = 1;
const TOTAL_STEPS = 5;

function updateProgress(){
  document.querySelectorAll(".p-bar").forEach(bar => {
    bar.classList.toggle("done", parseInt(bar.dataset.step) <= currentStep);
  });
}

function goToStep(n){
  currentStep = n;
  document.querySelectorAll(".book-step").forEach(s => {
    s.classList.toggle("active", parseInt(s.dataset.step) === n);
  });
  updateProgress();
  if (n === 5) buildSummary();
}

function nextStep(from){
  if (from === 1 && !bookingState.mascot){
    alert("Please select a mascot to continue.");
    return;
  }
  if (from === 2){
    bookingState.eventType = document.getElementById("eventTypeSelect").value;
  }
  if (from === 3){
    bookingState.date = document.getElementById("eventDate").value;
    bookingState.time = document.getElementById("eventTime").value;
    bookingState.duration = document.getElementById("durationSelect").value;
  }
  if (from === 4){
    bookingState.location = document.getElementById("eventLocation").value;
  }
  goToStep(from + 1);
}

function prevStep(from){
  goToStep(from - 1);
}

// mascot option cards (step 1)
function selectBookingMascot(value){
  bookingState.mascot = value;
  document.querySelectorAll("#bookMascotGrid .opt-card").forEach(c => {
    c.classList.toggle("selected", c.dataset.value === value);
  });
}
document.querySelectorAll("#bookMascotGrid .opt-card").forEach(card => {
  card.addEventListener("click", () => selectBookingMascot(card.dataset.value));
});

function formatDate(dateStr){
  if (!dateStr) return "Not specified";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function formatTime(timeStr){
  if (!timeStr) return "Not specified";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${m} ${ampm}`;
}

function buildSummary(){
  const box = document.getElementById("summaryBox");
  box.innerHTML = `
    <div><span class="k">Mascot</span><span class="v">${bookingState.mascot || "—"}</span></div>
    <div><span class="k">Event Type</span><span class="v">${bookingState.eventType || "—"}</span></div>
    <div><span class="k">Date</span><span class="v">${formatDate(bookingState.date)}</span></div>
    <div><span class="k">Time</span><span class="v">${formatTime(bookingState.time)}</span></div>
    <div><span class="k">Duration</span><span class="v">${bookingState.duration || "—"}</span></div>
    <div><span class="k">Location</span><span class="v">${bookingState.location || "—"}</span></div>
  `;
  updateFinalWaLink();
}

function updateFinalWaLink(){
  bookingState.name = document.getElementById("custName").value;
  bookingState.phone = document.getElementById("custPhone").value;
  bookingState.notes = document.getElementById("custNotes").value;

  const msg =
`Hi Panda & Gorilla Events! I'd like to make a booking:

🎭 Mascot: ${bookingState.mascot || "Not specified"}
📌 Event Type: ${bookingState.eventType || "Not specified"}
📅 Date: ${formatDate(bookingState.date)}
🕐 Time: ${formatTime(bookingState.time)}
⏱️ Duration: ${bookingState.duration || "Not specified"}
📍 Location: ${bookingState.location || "Not specified"}

👤 Name: ${bookingState.name || "Not specified"}
📞 Phone: ${bookingState.phone || "Not specified"}
${bookingState.notes ? "📝 Notes: " + bookingState.notes : ""}

Please confirm availability. Thank you!`;

  document.getElementById("finalWaBtn").href = waLink(msg);
}

["custName","custPhone","custNotes"].forEach(id => {
  document.getElementById(id).addEventListener("input", updateFinalWaLink);
});

updateProgress();

// =====================================================
// FAQ ACCORDION
// =====================================================
document.querySelectorAll(".faq-item").forEach(item => {
  const q = item.querySelector(".faq-q");
  q.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});
