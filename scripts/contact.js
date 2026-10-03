import { deleteTextAnim } from "./utils.js";

// Copy Function
const infoDivs = document.querySelectorAll('.form-section>.content>.form-content>.column1>.info>div');

let copyTimeout;

infoDivs.forEach(div =>
{
    div.addEventListener('click', (e) =>
    {
        e.target.style.pointerEvents = 'none'
        const span = e.target.children[1]
        const text = span.innerText;

        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand('copy');

        document.body.removeChild(tempInput);

        span.textContent = 'Text Copiat!';

        clearTimeout(copyTimeout)
        copyTimeout = setTimeout(() =>
        {
            span.textContent = text;
            e.target.style.pointerEvents = 'initial'
        }, 400)
    })
})

// Send Email

const emailField = document.querySelector('#email');
const nameField = document.querySelector('#name');
const messageField = document.querySelector('#message');

const form = document.querySelector("#form");

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

const submitBtn = document.querySelector("#submit-bttn")
const submitBtnText = document.querySelector("#submit-bttn>.text")
const submitBtnLoading = document.querySelector("#submit-bttn>.loading")

const succesText = document.querySelector('.form-section>.content>.text>.header>.succes')
const errorText = document.querySelector('.form-section>.content>.text>.header>.error')
const checkmark = document.querySelector('#submit-bttn>.checkmark')

function startLoad()
{
    submitBtnLoading.style.opacity = "1";
    submitBtnText.style.display = "none";
    submitBtn.style.pointerEvents = "none";

}
function finishLoad()
{
    succesText.classList.add('show')
    checkmark.classList.add('show')
    submitBtnLoading.style.opacity = "0";
}

function errorLoad()
{
    submitBtnText.style.display = "block";
    checkmark.classList.remove('show')
    succesText.classList.remove('show')
    errorText.classList.add('show')
}


form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const params = {

        from_name: nameField.value,
        email_id: emailField.value,
        message: messageField.value,
    }

    const serviceId = "service_mcv5bfc";
    const templateId = "template_iviag0d";

    // loadingAnim(submitBtn)

    deleteTextAnim(nameInput)
    deleteTextAnim(emailInput)
    deleteTextAnim(messageInput)
    startLoad()

    emailjs.send(serviceId, templateId, params).then(res =>
    {

        // responseAnim(res.status != 200, submitBtn, "Trimite")


        if (res.status == 200)
        {
            finishLoad()
        }

    }).catch(error =>
    {
        console.error('Error:', error);
        errorLoad()
    });

})

const faqIcons = document.querySelectorAll(".faq-section>.content>.faqs>.faq>.icon")

const faqObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {

            faqIcons.forEach((icon) =>
            {

                icon.classList.add('anim')
            })


        }


    });
});

faqObserver.observe(faqIcons[0]);

const underlineAnim = document.querySelector("#underline-anim")

const formObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            underlineAnim.classList.add('anim')
        }
    });
});


formObserver.observe(underlineAnim);

// Dark mode for map

const isDarkMode = localStorage.getItem('darkMode') === 'true';
const isLightMode = localStorage.getItem('lightMode') === 'true';

const googleMap = document.querySelector('.map');

if (!isDarkMode)
{
    googleMap.style.filter = 'invert(100%)';
}

if (!isLightMode && !isDarkMode)
{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
        googleMap.style.filter = 'invert(100%)';
    } else
    {
        googleMap.style.filter = 'invert(0%)';
    }
}

// progress bar

// const heroSection = document.querySelector('main>header');
// const navbar = document.querySelector('.nav-bar');

// if (window.innerWidth < 1100)
// {
//     navbar.classList.add('home')

//     let navbarBool = true;

//     let navbarTransitionTimeout;
//     let navbarFixedTimeout;

//     const observer = new IntersectionObserver((entries) =>
//     {
//         entries.forEach((entry) =>
//         {
//             if (!entry.isIntersecting && !navbar.classList.contains("fixed"))
//             {
//                 navbar.style.transition = 'initial';
//                 navbar.classList.add("fixed");
//                 navbar.classList.remove('home');
//                 navbar.style.backgroundColor = 'var(--day-white01)'
//                 clearTimeout(navbarTransitionTimeout)
//                 navbarTransitionTimeout = setTimeout(() =>
//                 {
//                     navbar.style.transition = 'transform 0.15s'
//                 }, 150)
//                 navbarBool = true;
//             }
//             if (entry.isIntersecting)
//             {
//                 navbarBool = false;
//                 clearTimeout(navbarFixedTimeout)
//                 navbarFixedTimeout = setTimeout(() =>
//                 {
//                     navbar.classList.remove("fixed");
//                     navbar.classList.add('home');
//                     navbar.style.background = 'none';
//                     navbar.style.transition = 'initial'
//                     navbar.style.transform = 'translateY(0%)'

//                 }, 150)

//             }

//         });
//     });

//     observer.observe(heroSection);

//     let previousScrollPosition = window.scrollY;

//     window.addEventListener('scroll', () =>
//     {
//         const currentScrollPosition = window.scrollY;

//         if (currentScrollPosition < previousScrollPosition && navbarBool)
//         {
//             navbar.style.transform = 'translateY(0%)'
//         }
//         else if (navbar.classList.contains('fixed'))
//         {
//             navbar.style.transform = 'translateY(-100%)'
//             navbar.classList.remove('more')
//         }

//         previousScrollPosition = currentScrollPosition;
//     });
// }
// else
// {
//     let previousScrollPosition;
//     let firstScroll = false;

//     window.addEventListener('scroll', () =>
//     {
//         const currentScrollPosition = window.scrollY;

//         const rect = navbar.getBoundingClientRect();

//         if (currentScrollPosition > rect.height)
//         {
//             if (!firstScroll)
//             {
//                 navbar.style.transition = 'initial'
//                 firstScroll = true;
//             }

//             navbar.classList.add('fixed');

//             if (currentScrollPosition < previousScrollPosition)
//             {
//                 navbar.style.transform = 'translateY(0%)'
//                 navbar.style.transition = 'transform 0.15s'
//             }
//             else if (navbar.classList.contains('fixed'))
//             {
//                 navbar.style.transform = 'translateY(-100%)';
//             }
//         }
//         if (currentScrollPosition == 0)
//         {
//             navbar.classList.remove('fixed');
//             firstScroll = false;
//         }

//         previousScrollPosition = currentScrollPosition;
//     });
// }



