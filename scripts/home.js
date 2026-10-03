document.addEventListener("DOMContentLoaded", (event) =>
{
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    const pizzaAnim = document.querySelector('.pizza')
    const headerSection = document.querySelector('header')

    // const separatorGlow = document.querySelector('.separator-glow')

    const imgReviews = document.querySelector('.img-sections>.reviews')
    const imgSections = document.querySelector('.img-sections')
    const imgSection01 = document.querySelector('#img-section01')
    // const info01 = document.querySelector('#img-section01>.container')
    const imgSection02 = document.querySelector('#img-section02')
    // const info02 = document.querySelector('#img-section02>.container')
    const imgSection03 = document.querySelector('#img-section03');
    const waitSection = document.querySelector('.wait-section');
    // const info03 = document.querySelector('#img-section03>.container')

    const reviewName = document.querySelector('#review-name')
    const reviewContent = document.querySelector('#review-content')
    const reviewAuthor = document.querySelector('#review-author')
    const reviewNumber = document.querySelector('#review-number')
    const prevReviewArrow = document.querySelector('#prev-review-arrow')
    const nextReviewArrow = document.querySelector('#next-review-arrow')

    const reviewsText = {
        pizza: [
            {
                name:"Ana Dobre",
                content: "“Delicioasă! Blatul subțire și crocant, topping-urile proaspete. Recomand cu drag!”"
            },
            {
                name: "Ioan Vasilescu",
                content: "“Ingredientele sunt echilibrate și blatul e crocant. Atmosfera e relaxantă și personalul amabil.”"
            },
            {
                name: "Radu Roman",
                content: "“Pizza Capricioasa a fost o alegere excelentă. Gustul e incredibil, iar porția e mai mult decât generoasă.”"
            }
        ],
        sushi: [
            {
                name: "Mihai Stoica",
                content: "“Am comandat sushi și am fost foarte mulțumit. Ingrediente proaspete, gust autentic și prezentare impecabilă.”"
            },
            {
                name: "Ioana Petrescu",
                content: "“Sushi-ul m-a impresionat. Localul e foarte primitor și curat. Cu siguranță o să revin!”"
            },
            {
                name: "Andrei Constantinescu",
                content: "“Sushi-ul e absolut minunat! Rolele sunt bine echilibrate și foarte gustoase.”"
            }
        ],
        shaorma: [
            {
                name: "Marius Dumitru",
                content: "“Am comandat shaorma la Relax și a fost extraordinară. Carnea suculentă și legumele proaspete!”"
            },
            {
                name: "Cristina Pop",
                content: "“Shaorma m-a impresionat cu adevărat. Gustul e incredibil, iar porția generoasă.”"
            },
            {
                name: "Bogdan Ionescu",
                content: "“Shaorma de la Relax e de neegalat! Carnea e fragedă, sosurile delicioase și legumele proaspete.”"
            }
        ]
    }
    console.log(reviewsText.pizza[0].name[localStorage.getItem('language')])

    // EVENT LISTENERS

    prevReviewArrow.addEventListener('click', () =>
    {
        let currentReview = parseInt(reviewNumber.innerHTML);
        let currentReviewText = reviewName.innerHTML.toLowerCase();
        if (currentReviewText == "pizza capricioasa")
        {
            currentReviewText = "pizza"
        }
        let reviewsArray = reviewsText[currentReviewText];
        let newReview = currentReview - 1;
        if (newReview < 1)
        {
            newReview = reviewsArray.length;
        }
        reviewContent.innerHTML = reviewsArray[newReview - 1].content;
        reviewAuthor.innerHTML = reviewsArray[newReview - 1].name;
        reviewNumber.innerHTML = newReview;
        console.log(newReview)
    })

    nextReviewArrow.addEventListener('click', () =>
    {
        let currentReview = parseInt(reviewNumber.innerHTML);
        let currentReviewText = reviewName.innerHTML.toLowerCase();
        if (currentReviewText == "pizza capricioasa")
        {
            currentReviewText = "pizza"
        }
        let reviewsArray = reviewsText[currentReviewText];
        let newReview = currentReview + 1;
        if (newReview > reviewsArray.length)
        {
            newReview = 1;
        }
        reviewContent.innerHTML = reviewsArray[newReview - 1].content;
        reviewAuthor.innerHTML = reviewsArray[newReview - 1].name;
        reviewNumber.innerHTML = newReview;
        console.log(newReview)
    })

    // STATIC EVENT LISTENERS FOR ARROWS

    const reviewssDivs = document.querySelectorAll('.reviewss');


    for (let i = 0; i < reviewssDivs.length; i++)
    {
        const itemReviewContent = reviewssDivs[i].querySelector('.review');
        const itemAuthor = reviewssDivs[i].querySelector('.name');
        const itemNr = reviewssDivs[i].querySelector('.nr');
        const itemLArrow = reviewssDivs[i].querySelector('.l-arrow');
        const itemRArrow = reviewssDivs[i].querySelector('.r-arrow');

        let keys = Object.keys(reviewsText);
        let name = keys[i];


        itemLArrow.addEventListener('click', () =>
        {
            prevReview(itemReviewContent, itemAuthor, itemNr, name, reviewsText);
        });

        itemRArrow.addEventListener('click', () =>
        {
            nextReview(itemReviewContent, itemAuthor, itemNr, name, reviewsText);
        });
    }

























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
        }
    });
    pizzaTimeline.to(pizzaAnim, { rotation: 0, ease: "power1.inOut", duration: 0 }, 0) // tilt to the left
        .to(pizzaAnim, { rotation: 16, ease: "power1.inOut" }) // tilt to the right
        .to(pizzaAnim, { rotation: -16, ease: "power1.inOut" }) // tilt to the left
    // .to(pizzaAnim, { rotation: 16, ease: "power1.inOut" }) // tilt to the right
    // .to(pizzaAnim, { rotation: -16, ease: "power1.inOut" }) // tilt to the right

    let separatorGlowTL01 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: "top top",
            end: "+=350px",
            scrub: true,
        }
    });

    separatorGlowTL01.to(reviewName, {
        textShadow: "0px 0px 30px white, 0px 0px 10px white",
        repeat: 1,
        yoyo: true,
        // duration: 1
    }, 0)


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
        }
    });

    nextReviewArrowTL.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${sectionHeight01 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    prevReviewArrowTL.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });


    let nextReviewArrowTL2 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${(sectionHeight01 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    nextReviewArrowTL2.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL2 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${(sectionHeight01 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    prevReviewArrowTL2.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    // REVIEW CHANGE

    let textChangeTL1 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${sectionHeight01 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[1].content
                reviewAuthor.innerHTML = reviewsText.pizza[1].name
                reviewNumber.innerHTML = 2;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[0].content
                reviewAuthor.innerHTML = reviewsText.pizza[0].name
                reviewNumber.innerHTML = 1;

            },
        }
    });


    let textChangeTL2 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${(sectionHeight01 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,

            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[2].content
                reviewAuthor.innerHTML = reviewsText.pizza[2].name
                reviewNumber.innerHTML = 3;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[1].content
                reviewAuthor.innerHTML = reviewsText.pizza[1].name
                reviewNumber.innerHTML = 2;
            },

        }
    });


    // SECOND SECTION

    let pizzaLeaveTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "+=350px",
            scrub: true,
        }
    });
    pizzaLeaveTimeline.to(pizzaAnim, { left: "0px", ease: "power1.inOut", opacity: 0, rotation: 15 })

    const sushiAnim = document.querySelector('.sushi')

    let sushiEnterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "+=350px",
            scrub: true,
        }
    });
    sushiEnterTimeline.to(sushiAnim, { left: "64px", ease: "power1.inOut", opacity: 1 })
        .to(sushiAnim, { y: "-20px", repeat: 3, yoyo: true, duration: 0.2 }, 0);


    let textChangeTL3 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "+=350px",
            scrub: true,

            onEnter: () =>
            {
                reviewName.innerHTML = "Sushi"
                reviewContent.innerHTML = reviewsText.sushi[0].content
                reviewAuthor.innerHTML = reviewsText.sushi[0].name
                reviewNumber.innerHTML = 1;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[2].content
                reviewAuthor.innerHTML = reviewsText.pizza[2].name
                reviewNumber.innerHTML = 3;
                reviewName.innerHTML = "Pizza Capricioasa"
            },

        }
    });

    let section02Timeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });
    section02Timeline.to(sushiAnim, { y: "-20px", repeat: 5, yoyo: true, }, 0)


    // Separator GLOW
    let separatorGlowTL02 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "+=350px",
            scrub: true,
        }
    });

    // separatorGlowTL02.to(separatorGlow, { opacity: 1, x: "400%" }, 0)
    separatorGlowTL02.to(reviewName, {
        textShadow: "0px 0px 30px white, 0px 0px 10px white",
        repeat: 1,
        yoyo: true,
        // duration: 1
    }, 0)

    let nextReviewArrowTL3 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${sectionHeight02 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    nextReviewArrowTL3.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL3 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${sectionHeight02 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    prevReviewArrowTL3.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    let nextReviewArrowTL4 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    nextReviewArrowTL4.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL4 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    prevReviewArrowTL4.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    // TEXT CHANGE 02



    let textChangeTL4 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${sectionHeight02 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[1].content
                reviewAuthor.innerHTML = reviewsText.sushi[1].name
                reviewNumber.innerHTML = 2;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[0].content
                reviewAuthor.innerHTML = reviewsText.sushi[0].name
                reviewNumber.innerHTML = 1;

            },
        }
    });


    let textChangeTL5 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,

            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[2].content
                reviewAuthor.innerHTML = reviewsText.sushi[2].name
                reviewNumber.innerHTML = 3;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[1].content
                reviewAuthor.innerHTML = reviewsText.sushi[1].name
                reviewNumber.innerHTML = 2;
            },

        }
    });

    // SHAORMA ANIMATION

    const shaormaAnim = document.querySelector('.shaorma')

    let sushiLeaveTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "+=350px",
            scrub: true,
        }
    });
    sushiLeaveTimeline.to(sushiAnim, { left: 0, y: "0px", duration: 0.2, opacity: 0 })

    let separatorGlowTL03 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "+=350px",
            scrub: true,
        }
    });

    separatorGlowTL03.to(reviewName, {
        textShadow: "0px 0px 30px white, 0px 0px 10px white",
        repeat: 1,
        yoyo: true,
        // duration: 1
    }, 0)


    let shaormaEnterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "+=350px",
            scrub: true,
        }
    });
    shaormaEnterTimeline.to(shaormaAnim, { left: "64px", ease: "power1.inOut", opacity: 1 })
        .to(shaormaAnim, { rotation: 15 }, 0);

    let section03Timeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "bottom center",
            scrub: true,
            onLeave: () =>
            {
                shaormaAnim.style.position = "absolute";
                shaormaAnim.style.top = "100%";
                section03Timeline.pause();
            },
            onEnterBack: () =>
            {
                shaormaAnim.style.position = "fixed";
                shaormaAnim.style.top = "50%";
                section03Timeline.resume();
            }
        }
    });
    section03Timeline.to(shaormaAnim, { rotation: -5, ease: "power1.inOut" }, 0)
    section03Timeline.to(shaormaAnim, { rotation: 5, ease: "power1.inOut" })
    section03Timeline.to(shaormaAnim, { rotation: -5, ease: "power1.inOut" })
    section03Timeline.to(shaormaAnim, { rotation: 5, ease: "power1.inOut" })
    section03Timeline.to(shaormaAnim, { rotation: -5, ease: "power1.inOut" })
    section03Timeline.to(shaormaAnim, { rotation: 5, ease: "power1.inOut" })



    // TEXT CHANGE 03

    let textChangeTL6 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "+=350px",
            scrub: true,

            onEnter: () =>
            {
                reviewName.innerHTML = "Shaorma"
                reviewContent.innerHTML = reviewsText.shaorma[0].content
                reviewAuthor.innerHTML = reviewsText.shaorma[0].name
                reviewNumber.innerHTML = 1;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[2].content
                reviewAuthor.innerHTML = reviewsText.sushi[2].name
                reviewNumber.innerHTML = 3;
                reviewName.innerHTML = "Sushi"
            },

        }
    });

    let textChangeTL7 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${sectionHeight03 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[1].content
                reviewAuthor.innerHTML = reviewsText.shaorma[1].name
                reviewNumber.innerHTML = 2;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[0].content
                reviewAuthor.innerHTML = reviewsText.shaorma[0].name
                reviewNumber.innerHTML = 1;

            },
        }
    });


    let textChangeTL8 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${(sectionHeight03 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,

            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[2].content
                reviewAuthor.innerHTML = reviewsText.shaorma[2].name
                reviewNumber.innerHTML = 3;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[1].content
                reviewAuthor.innerHTML = reviewsText.shaorma[1].name
                reviewNumber.innerHTML = 2;
            },

        }
    });

    // ARROWS

    let nextReviewArrowTL5 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${sectionHeight03 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    nextReviewArrowTL5.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL5 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${sectionHeight03 / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    prevReviewArrowTL5.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    let nextReviewArrowTL6 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    nextReviewArrowTL6.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL6 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            scrub: true,
        }
    });

    prevReviewArrowTL6.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });


    // ARTICLES ANIM

    const articlesText = document.querySelector('#articles-text-flex');
    const articlesSection = document.querySelector('.articles-section');
    const articlesDiv = document.querySelector("#articles-div")
    const article01 = document.querySelector('#article01');
    const article02 = document.querySelector('#article02');
    const article03 = document.querySelector('#article03');
    const article04 = document.querySelector('#article04');


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
        }
    });

    rotateArticle01TL.to("#article01", { top: "100%", left: "50%", transform: "translate(-50%, -100%)", ease: "power1.inOut", opacity: 0.1 }, 0).set("#article01", { className: "article", duration: 0 })
    rotateArticle01TL.to("#article01", { top: "50%", left: "100%", transform: "translate(-100%, -50%)", ease: "power1.inOut" });

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
        }
    });

    rotateArticle02TL.to("#article02", { top: "50%", left: "0%", transform: "translateY(-50%)", ease: "power1.inOut", opacity: 1 }, 0).set("#article02", { className: "article selected", duration: 0 });
    rotateArticle02TL.to("#article02", { top: "100%", left: "50%", transform: "translate(-50%, -100%)", ease: "power1.inOut", opacity: 0.1 }).set("#article02", { className: "article", duration: 0 });

    let rotateArticle03TL = gsap.timeline({
        scrollTrigger: {
            trigger: articlesSection,
            start: "top top",
            end: "bottom center",
            scrub: true,
        }
    });

    rotateArticle03TL.to("#article03", { top: "50%", left: "100%", transform: "translate(-100%, -50%)", ease: "power1.inOut" }, 0);
    rotateArticle03TL.to("#article03", { top: "0%", left: "50%", transform: "translate(-50%, -70%)", ease: "power1.inOut" });

    let rotateArticle04TL = gsap.timeline({
        scrollTrigger: {
            trigger: articlesSection,
            start: "top top",
            end: "bottom center",
            scrub: true,
        }
    });

    rotateArticle04TL.to("#article04", { top: "0%", left: "50%", transform: "translateX(-50%)", ease: "power1.inOut" }, 0);
    rotateArticle04TL.to("#article04", { top: "50%", left: "0%", transform: "translateY(-50%)", ease: "power1.inOut", opacity: 1 }).set("#article04", { className: "article selected", duration: 0 });;

    // MENU SECTION ANIM

    const menuSection = document.querySelector('.menu-section');

    let highlightMenuItemsTL = gsap.timeline({
        scrollTrigger: {
            trigger: menuSection,
            start: "top-=150px top",
            end: "bottom-=20% center",
            scrub: true,
        }
    });

    const row1Items = document.querySelectorAll('.menu-section>.row:nth-child(1)>.item');
    const row2Items = document.querySelectorAll('.menu-section>.row:nth-child(2)>.item');

    // Set initial opacity for all items
    gsap.set([...row1Items, ...row2Items], { opacity: 0.1 });

    // Animate items in the first row
    highlightMenuItemsTL.staggerTo(row1Items, 1, { opacity: 1, ease: "power1.inOut" }, 0.5);
    highlightMenuItemsTL.staggerTo(row1Items, 1, { opacity: 0.3, ease: "power1.inOut" }, 0.5, 0.5);

    // Animate items in the second row
    highlightMenuItemsTL.staggerTo(row2Items, 1, { opacity: 1, ease: "power1.inOut" }, 0.5, 0);
    highlightMenuItemsTL.staggerTo(row2Items, 1, { opacity: 0.3, ease: "power1.inOut" }, 0.5, 1);





















    // WAITING FOR YOU ARROW


    const waitArrow = document.querySelector('#wait-arrow')

    let waitingForYouArrow = gsap.timeline({
        scrollTrigger: {
            trigger: waitSection,
            start: "top top",
            end: "bottom center",
            scrub: true,
        }
    });

    waitingForYouArrow.to(waitArrow, { rotation: -45 }, 0)



});



function prevReview(itemReviewContent, itemAuthor, itemNr, itemName, reviewsText)
{
    let currentReview = parseInt(itemNr.innerHTML);

    let reviewsArray = reviewsText[itemName];
    let newReview = currentReview - 1;
    if (newReview < 1)
    {
        newReview = reviewsArray.length;
    }
    itemReviewContent.innerHTML = reviewsArray[newReview - 1].content;
    itemAuthor.innerHTML = reviewsArray[newReview - 1].name;
    itemNr.innerHTML = newReview;
}
function nextReview(itemReviewContent, itemAuthor, itemNr, itemName, reviewsText)
{
    let currentReview = parseInt(itemNr.innerHTML);

    let reviewsArray = reviewsText[itemName];
    let newReview = currentReview + 1;
    if (newReview > reviewsArray.length)
    {
        newReview = 1;
    }
    itemReviewContent.innerHTML = reviewsArray[newReview - 1].content;
    itemAuthor.innerHTML = reviewsArray[newReview - 1].name;
    itemNr.innerHTML = newReview;
}


// TEMP DARK THEME

