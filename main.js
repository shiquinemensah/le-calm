console.clear();

const isMobile = window.innerWidth <= 430;

const rect = document.querySelector("#demo rect");
const text = document.querySelector("#demo text");
const lines = document.querySelectorAll("#demo polyline, #demo line");

const rectWidth = isMobile ? 130 : 220;
const polylineShift = isMobile ? 6 : 14;

const tl = new TimelineMax({ reversed: true });
tl.to(rect, 0.4, { attr: { width: rectWidth }, ease: Power4.easeInOut });
tl.to(text, 0.4, { fill: "#000", ease: Linear.easeNone }, 0);
tl.to(lines, 0.4, { x: polylineShift, ease: Power4.easeInOut }, 0);
tl.to("#demo line", 0.4, { attr: { x2: 3 }, ease: Power4.easeInOut }, 0);

const demo = document.querySelector("#demo");

// For desktop
demo.addEventListener("mouseenter", () => tl.reversed(false));
demo.addEventListener("mouseleave", () => tl.reversed(true));

// For mobile: toggle on tap
if (isMobile) {
  demo.addEventListener("click", () => {
    tl.reversed(!tl.reversed());
  });

  demo.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent accidental scrolling
    tl.reversed(!tl.reversed());
  });
}


// ScrollTrigger Setup
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const container = document.querySelector(".scroll-container");
  const steps = gsap.utils.toArray(".step");

  const scrollLength = steps.reduce((acc, step, index) => {
    if (index < steps.length - 1) acc += step.offsetWidth;
    return acc;
  }, 0);

  gsap.to(container, {
    x: () => -(steps[steps.length - 1].offsetLeft),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      start: "top top",
      end: `+=${scrollLength}`
    }
  });
});


// Scroll-triggered Image Animation
const imageOffset = isMobile ? 40 : 100;

gsap.fromTo(".image-animation",
  {
    x: imageOffset,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".image-animation",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  }
);
