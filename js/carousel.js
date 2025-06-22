const posts = [
  {
    title: "Welcome to Beru Early Years ",
    excerpt:
      "An early years school that values creativity and expression as important precursors to learning.",
    imageSrc: "images/activities/beru_school-185.webp",
    author: "Environmental Committee",
    date: "June 12, 2023",
    readTime: "5 min",
    url: "landing_page.html#book"
  },
  {
    title: "A Reggio Inspired Early Years School in Jayanagar",
    excerpt:
      "Teachers observe, document, and support rather than instruct. Our Project-Based Learning approach promotes problem-solving, teamwork, and critical thinking.",
    imageSrc: "images/activities/beru_school-141.webp",
    author: "Tech Research Team",
    date: "June 10, 2023",
    readTime: "7 min",
    url: "landing_page.html#book"
  },
  {
    title: "Child-Centered Approach",
    excerpt:
      "Children are viewed as capable, curious, and full of potential.",
    imageSrc: "images/activities/beru_school-114.webp",
    author: "Alumni Association",
    date: "June 08, 2023",
    readTime: "9 min",
    url: "landing_page.html#book"
  },
  {
    title: " Environment as the Third Teacher",
    excerpt:
      "Classrooms are thoughtfully designed to inspire exploration. Natural light, open spaces, real materials, and student work on display foster aesthetic learning and independence.",
    imageSrc: "images/activities/beru_school-47.webp",
    author: "Wellness Center",
    date: "July 12, 2023",
    readTime: "5 min",
    url: "landing_page.html#book"
  }
];

let currentIndex = 0;
let direction = 1;
const carousel = document.getElementById("carousel");

function createSlide(post, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (index === currentIndex) slide.classList.add("active");
  slide.style.backgroundImage = `url(${post.imageSrc})`;

  slide.innerHTML = `
      <div class="overlay"></div>
      <div class="slide-content">
        <h1><a href="${post.url}" style="color:white;text-decoration:none" target="_blank">${post.title}</a></h1>
        <p>${post.excerpt}</p>
         
      </div>
    `;

    /* <div class="author">${post.author} • ${post.date} • ${post.readTime}</div> */ 

  return slide;
}

function renderSlides() {
  carousel.innerHTML = "";
  posts.forEach((post, i) => {
    const slide = createSlide(post, i);
    carousel.appendChild(slide);
  });

  const controls = document.createElement("div");
  controls.className = "controls";

  const dots = document.createElement("div");
  dots.className = "dots";
  posts.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `dot ${i === currentIndex ? "active" : ""}`;
    dot.addEventListener("click", () => {
      direction = i > currentIndex ? 1 : -1;
      currentIndex = i;
      updateSlides();
    });
    dots.appendChild(dot);
  });

  const arrows = document.createElement("div");
  arrows.className = "arrows";
  const prevBtn = document.createElement("button");
  prevBtn.className = "arrow-btn";
  prevBtn.textContent = "<";
  prevBtn.onclick = () => {
    direction = -1;
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateSlides();
  };

  const nextBtn = document.createElement("button");
  nextBtn.className = "arrow-btn";
  nextBtn.textContent = ">";
  nextBtn.onclick = () => {
    direction = 1;
    currentIndex = (currentIndex + 1) % posts.length;
    updateSlides();
  };

  arrows.appendChild(prevBtn);
  arrows.appendChild(nextBtn);
  controls.appendChild(dots);
  controls.appendChild(arrows);
  carousel.appendChild(controls);
}

function updateSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "exit-left", "exit-right");
    if (i === currentIndex) {
      slide.classList.add("active");
    } else if (direction === 1) {
      slide.classList.add("exit-left");
    } else {
      slide.classList.add("exit-right");
    }
  });

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

setInterval(() => {
  direction = 1;
  currentIndex = (currentIndex + 1) % posts.length;
  updateSlides();
}, 9000);

renderSlides();
