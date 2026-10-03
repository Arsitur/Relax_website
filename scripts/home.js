import menuData from "../data/menu.json";
import { createHomeHighlights } from "./homeHighlights.js";
import { siteUrl } from "./site.js";

document.addEventListener("DOMContentLoaded", (event) => {

  const pizzaAnim = document.querySelector(".pizza");
  const headerSection = document.querySelector("header");

  // const separatorGlow = document.querySelector('.separator-glow')

  const imgReviews = document.querySelector(".img-sections>.reviews");
  const imgSections = document.querySelector(".img-sections");
  const imgSection01 = document.querySelector("#img-section01");
  // const info01 = document.querySelector('#img-section01>.container')
  const imgSection02 = document.querySelector("#img-section02");
  // const info02 = document.querySelector('#img-section02>.container')
  const imgSection03 = document.querySelector("#img-section03");
  const waitSection = document.querySelector(".wait-section");
  // const info03 = document.querySelector('#img-section03>.container')

  const reviewName = document.querySelector("#review-name");
  const prevReviewArrow = document.querySelector("#prev-review-arrow");
  const nextReviewArrow = document.querySelector("#next-review-arrow");

  const highlights = createHomeHighlights(menuData);
  const desktopInfo = document.querySelector("#reviews .info");
  let activeCategory = "pizza";
  let activeSlide = 0;

  function renderSlide(info, category, index) {
    const { label, slides } = highlights[category];
    const slide = slides[index];
    info.querySelector(".item-name").textContent = label;
    info.querySelector(".feature-title").textContent = slide.title;
    info.querySelector(".review").textContent = slide.content;
    info.querySelector(".name").textContent = slide.detail;
    info.querySelector(".more span span").textContent = index + 1;
    const link = info.querySelector(".feature-link");
    link.textContent = `${slide.action} →`;
    link.href = siteUrl(slide.link);
  }

  function setSlide(category, index) {
    activeCategory = category;
    activeSlide = index;
    renderSlide(desktopInfo, category, index);
  }

  prevReviewArrow.addEventListener("click", () => {
    setSlide(activeCategory, (activeSlide + 2) % 3);
  });
  nextReviewArrow.addEventListener("click", () => {
    setSlide(activeCategory, (activeSlide + 1) % 3);
  });
  document.querySelectorAll(".reviewss .info").forEach(info => {
    const category = info.dataset.showcase;
    let index = 0;
    renderSlide(info, category, index);
    info.querySelector(".l-arrow").addEventListener("click", () => {
      index = (index + 2) % 3;
      renderSlide(info, category, index);
    });
    info.querySelector(".r-arrow").addEventListener("click", () => {
      index = (index + 1) % 3;
      renderSlide(info, category, index);
    });
  });
  setSlide("pizza", 0);

  // Navigation still works if the external animation library is unavailable.
  if (!window.gsap || !window.ScrollTrigger || !window.ScrollToPlugin) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // HEADER ANIMATION

  gsap.to(pizzaAnim, {
    left: "64px",
    rotation: 360,
    transform: "translate(0%, -50%)",
    scrollTrigger: {
      trigger: headerSection,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // PAST

  // FIRST SECTION ANIMATIONS

  let pizzaTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  pizzaTimeline
    .to(pizzaAnim, { rotation: 0, ease: "power1.inOut", duration: 0 }, 0) // tilt to the left
    .to(pizzaAnim, { rotation: 16, ease: "power1.inOut" }) // tilt to the right
    .to(pizzaAnim, { rotation: -16, ease: "power1.inOut" }); // tilt to the left
  // .to(pizzaAnim, { rotation: 16, ease: "power1.inOut" }) // tilt to the right
  // .to(pizzaAnim, { rotation: -16, ease: "power1.inOut" }) // tilt to the right

  let separatorGlowTL01 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: "top top",
      end: "+=350px",
      scrub: true,
    },
  });

  separatorGlowTL01.to(
    reviewName,
    {
      textShadow: "0px 0px 30px white, 0px 0px 10px white",
      repeat: 1,
      yoyo: true,
      // duration: 1
    },
    0,
  );

  ScrollTrigger.create({
    trigger: imgSections,
    start: "top top",
    end: "bottom center",
    scrub: true,
    pin: imgReviews,
  });

  // NEXT ARROW TIMELINE

  let sectionHeight01 = imgSection01.offsetHeight;
  let sectionHeight02 = imgSection02.offsetHeight;
  let sectionHeight03 = imgSection03.offsetHeight;

  let nextReviewArrowTL = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: () => `+=${sectionHeight01 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  nextReviewArrowTL
    .to(nextReviewArrow, { x: 4 }, 0)
    .to(nextReviewArrow, { x: 0 });

  let prevReviewArrowTL = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: () => `+=${sectionHeight01 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  prevReviewArrowTL
    .to(prevReviewArrow, { x: -4 }, 0)
    .to(prevReviewArrow, { x: 0 });

  let nextReviewArrowTL2 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: () => `+=${(sectionHeight01 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  nextReviewArrowTL2
    .to(nextReviewArrow, { x: 4 }, 0)
    .to(nextReviewArrow, { x: 0 });

  let prevReviewArrowTL2 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: () => `+=${(sectionHeight01 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  prevReviewArrowTL2
    .to(prevReviewArrow, { x: -4 }, 0)
    .to(prevReviewArrow, { x: 0 });

  // REVIEW CHANGE

  let textChangeTL1 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: () => `+=${sectionHeight01 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
      onEnter: () => {
        setSlide("pizza", 1);
      },
      onLeaveBack: () => {
        setSlide("pizza", 0);
      },
    },
  });

  let textChangeTL2 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection01,
      start: () => `+=${(sectionHeight01 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,

      onEnter: () => {
        setSlide("pizza", 2);
      },
      onLeaveBack: () => {
        setSlide("pizza", 1);
      },
    },
  });

  // SECOND SECTION

  let pizzaLeaveTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: "top top",
      end: "+=350px",
      scrub: true,
    },
  });
  pizzaLeaveTimeline.to(pizzaAnim, {
    left: "0px",
    ease: "power1.inOut",
    opacity: 0,
    rotation: 15,
  });

  const sushiAnim = document.querySelector(".sushi");

  let sushiEnterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: "top top",
      end: "+=350px",
      scrub: true,
    },
  });
  sushiEnterTimeline
    .to(sushiAnim, { left: "64px", ease: "power1.inOut", opacity: 1 })
    .to(sushiAnim, { y: "-20px", repeat: 3, yoyo: true, duration: 0.2 }, 0);

  let textChangeTL3 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: "top top",
      end: "+=350px",
      scrub: true,

      onEnter: () => {
        setSlide("sushi", 0);
      },
      onLeaveBack: () => {
        setSlide("pizza", 2);
      },
    },
  });

  let section02Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  section02Timeline.to(sushiAnim, { y: "-20px", repeat: 5, yoyo: true }, 0);

  // Separator GLOW
  let separatorGlowTL02 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: "top top",
      end: "+=350px",
      scrub: true,
    },
  });

  // separatorGlowTL02.to(separatorGlow, { opacity: 1, x: "400%" }, 0)
  separatorGlowTL02.to(
    reviewName,
    {
      textShadow: "0px 0px 30px white, 0px 0px 10px white",
      repeat: 1,
      yoyo: true,
      // duration: 1
    },
    0,
  );

  let nextReviewArrowTL3 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: () => `+=${sectionHeight02 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  nextReviewArrowTL3
    .to(nextReviewArrow, { x: 4 }, 0)
    .to(nextReviewArrow, { x: 0 });

  let prevReviewArrowTL3 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: () => `+=${sectionHeight02 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  prevReviewArrowTL3
    .to(prevReviewArrow, { x: -4 }, 0)
    .to(prevReviewArrow, { x: 0 });

  let nextReviewArrowTL4 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: () => `+=${(sectionHeight02 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  nextReviewArrowTL4
    .to(nextReviewArrow, { x: 4 }, 0)
    .to(nextReviewArrow, { x: 0 });

  let prevReviewArrowTL4 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: () => `+=${(sectionHeight02 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  prevReviewArrowTL4
    .to(prevReviewArrow, { x: -4 }, 0)
    .to(prevReviewArrow, { x: 0 });

  // TEXT CHANGE 02

  let textChangeTL4 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: () => `+=${sectionHeight02 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
      onEnter: () => {
        setSlide("sushi", 1);
      },
      onLeaveBack: () => {
        setSlide("sushi", 0);
      },
    },
  });

  let textChangeTL5 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection02,
      start: () => `+=${(sectionHeight02 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,

      onEnter: () => {
        setSlide("sushi", 2);
      },
      onLeaveBack: () => {
        setSlide("sushi", 1);
      },
    },
  });

  // SHAORMA ANIMATION

  const shaormaAnim = document.querySelector(".shaorma");

  let sushiLeaveTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: "top top",
      end: "+=350px",
      scrub: true,
    },
  });
  sushiLeaveTimeline.to(sushiAnim, {
    left: 0,
    y: "0px",
    duration: 0.2,
    opacity: 0,
  });

  let separatorGlowTL03 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: "top top",
      end: "+=350px",
      scrub: true,
    },
  });

  separatorGlowTL03.to(
    reviewName,
    {
      textShadow: "0px 0px 30px white, 0px 0px 10px white",
      repeat: 1,
      yoyo: true,
      // duration: 1
    },
    0,
  );

  let shaormaEnterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: "top top",
      end: "+=350px",
      scrub: true,
    },
  });
  shaormaEnterTimeline
    .to(shaormaAnim, { left: "64px", ease: "power1.inOut", opacity: 1 })
    .to(shaormaAnim, { rotation: 15 }, 0);

  let section03Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: "top top",
      end: "bottom center",
      scrub: true,
      onLeave: () => {
        shaormaAnim.style.position = "absolute";
        shaormaAnim.style.top = "100%";
        section03Timeline.pause();
      },
      onEnterBack: () => {
        shaormaAnim.style.position = "fixed";
        shaormaAnim.style.top = "50%";
        section03Timeline.resume();
      },
    },
  });
  section03Timeline.to(shaormaAnim, { rotation: -5, ease: "power1.inOut" }, 0);
  section03Timeline.to(shaormaAnim, { rotation: 5, ease: "power1.inOut" });
  section03Timeline.to(shaormaAnim, { rotation: -5, ease: "power1.inOut" });
  section03Timeline.to(shaormaAnim, { rotation: 5, ease: "power1.inOut" });
  section03Timeline.to(shaormaAnim, { rotation: -5, ease: "power1.inOut" });
  section03Timeline.to(shaormaAnim, { rotation: 5, ease: "power1.inOut" });

  // TEXT CHANGE 03

  let textChangeTL6 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: "top top",
      end: "+=350px",
      scrub: true,

      onEnter: () => {
        setSlide("shaorma", 0);
      },
      onLeaveBack: () => {
        setSlide("sushi", 2);
      },
    },
  });

  let textChangeTL7 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: () => `+=${sectionHeight03 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
      onEnter: () => {
        setSlide("shaorma", 1);
      },
      onLeaveBack: () => {
        setSlide("shaorma", 0);
      },
    },
  });

  let textChangeTL8 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: () => `+=${(sectionHeight03 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,

      onEnter: () => {
        setSlide("shaorma", 2);
      },
      onLeaveBack: () => {
        setSlide("shaorma", 1);
      },
    },
  });

  // ARROWS

  let nextReviewArrowTL5 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: () => `+=${sectionHeight03 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  nextReviewArrowTL5
    .to(nextReviewArrow, { x: 4 }, 0)
    .to(nextReviewArrow, { x: 0 });

  let prevReviewArrowTL5 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: () => `+=${sectionHeight03 / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  prevReviewArrowTL5
    .to(prevReviewArrow, { x: -4 }, 0)
    .to(prevReviewArrow, { x: 0 });

  let nextReviewArrowTL6 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: () => `+=${(sectionHeight02 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  nextReviewArrowTL6
    .to(nextReviewArrow, { x: 4 }, 0)
    .to(nextReviewArrow, { x: 0 });

  let prevReviewArrowTL6 = gsap.timeline({
    scrollTrigger: {
      trigger: imgSection03,
      start: () => `+=${(sectionHeight02 * 2) / 3}px`,
      end: () => `+=100px`,
      scrub: true,
    },
  });

  prevReviewArrowTL6
    .to(prevReviewArrow, { x: -4 }, 0)
    .to(prevReviewArrow, { x: 0 });

  // ARTICLES ANIM

  const articlesText = document.querySelector("#articles-text-flex");
  const articlesSection = document.querySelector(".articles-section");
  const articlesDiv = document.querySelector("#articles-div");
  const article01 = document.querySelector("#article01");
  const article02 = document.querySelector("#article02");
  const article03 = document.querySelector("#article03");
  const article04 = document.querySelector("#article04");

  ScrollTrigger.create({
    trigger: articlesSection,
    start: "top top",
    end: "bottom center",
    scrub: true,
    pin: articlesText,
  });
  ScrollTrigger.create({
    trigger: articlesSection,
    start: "top top",
    end: "bottom center",
    scrub: true,
    pin: articlesDiv,
  });

  let rotateArticle01TL = gsap.timeline({
    scrollTrigger: {
      trigger: articlesSection,
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
  });

  rotateArticle01TL
    .to(
      "#article01",
      {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -100%)",
        ease: "power1.inOut",
        opacity: 0.1,
      },
      0,
    )
    .set("#article01", { className: "article", duration: 0 });
  rotateArticle01TL.to("#article01", {
    top: "50%",
    left: "100%",
    transform: "translate(-100%, -50%)",
    ease: "power1.inOut",
  });

  // let selectedArticleTimeline01 = gsap.timeline({
  //     scrollTrigger: {
  //         trigger: articlesSection,
  //         start: "top top",
  //         end: "bottom center",
  //         scrub: true,
  //     }
  // });

  // selectedArticleTimeline01.to("#article01", { opacity: 0, ease: "power1.inOut" }, 0);

  let rotateArticle02TL = gsap.timeline({
    scrollTrigger: {
      trigger: articlesSection,
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
  });

  rotateArticle02TL
    .to(
      "#article02",
      {
        top: "50%",
        left: "0%",
        transform: "translateY(-50%)",
        ease: "power1.inOut",
        opacity: 1,
      },
      0,
    )
    .set("#article02", { className: "article selected", duration: 0 });
  rotateArticle02TL
    .to("#article02", {
      top: "100%",
      left: "50%",
      transform: "translate(-50%, -100%)",
      ease: "power1.inOut",
      opacity: 0.1,
    })
    .set("#article02", { className: "article", duration: 0 });

  let rotateArticle03TL = gsap.timeline({
    scrollTrigger: {
      trigger: articlesSection,
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
  });

  rotateArticle03TL.to(
    "#article03",
    {
      top: "50%",
      left: "100%",
      transform: "translate(-100%, -50%)",
      ease: "power1.inOut",
    },
    0,
  );
  rotateArticle03TL.to("#article03", {
    top: "0%",
    left: "50%",
    transform: "translate(-50%, -70%)",
    ease: "power1.inOut",
  });

  let rotateArticle04TL = gsap.timeline({
    scrollTrigger: {
      trigger: articlesSection,
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
  });

  rotateArticle04TL.to(
    "#article04",
    {
      top: "0%",
      left: "50%",
      transform: "translateX(-50%)",
      ease: "power1.inOut",
    },
    0,
  );
  rotateArticle04TL
    .to("#article04", {
      top: "50%",
      left: "0%",
      transform: "translateY(-50%)",
      ease: "power1.inOut",
      opacity: 1,
    })
    .set("#article04", { className: "article selected", duration: 0 });

  // MENU SECTION ANIM

  const menuSection = document.querySelector(".menu-section");

  let highlightMenuItemsTL = gsap.timeline({
    scrollTrigger: {
      trigger: menuSection,
      start: "top-=150px top",
      end: "bottom-=20% center",
      scrub: true,
    },
  });

  const row1Items = document.querySelectorAll(
    ".menu-section>.row:nth-child(1)>.item",
  );
  const row2Items = document.querySelectorAll(
    ".menu-section>.row:nth-child(2)>.item",
  );

  // Set initial opacity for all items
  gsap.set([...row1Items, ...row2Items], { opacity: 0.4 });

  // Animate items in the first row
  highlightMenuItemsTL.staggerTo(
    row1Items,
    1,
    { opacity: 1, ease: "power1.inOut" },
    0.5,
  );
  highlightMenuItemsTL.staggerTo(
    row1Items,
    1,
    { opacity: 0.3, ease: "power1.inOut" },
    0.5,
    0.5,
  );

  // Animate items in the second row
  highlightMenuItemsTL.staggerTo(
    row2Items,
    1,
    { opacity: 1, ease: "power1.inOut" },
    0.5,
    0,
  );
  highlightMenuItemsTL.staggerTo(
    row2Items,
    1,
    { opacity: 0.3, ease: "power1.inOut" },
    0.5,
    1,
  );

  // WAITING FOR YOU ARROW

  const waitArrow = document.querySelector("#wait-arrow");

  let waitingForYouArrow = gsap.timeline({
    scrollTrigger: {
      trigger: waitSection,
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
  });

  waitingForYouArrow.to(waitArrow, { rotation: -45, stroke: "#FF9922" }, 0);
});
