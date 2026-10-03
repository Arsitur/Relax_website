class EndSection extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.render();

        // EVENT LISTENERS

        const themeToggle = this.shadowRoot.querySelector('footer>.left>label>input');

        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        const isLightMode = localStorage.getItem('lightMode') === 'true';


        if (isDarkMode)
        {
            themeToggle.checked = true
            document.body.classList.remove('dark-theme');
            document.documentElement.style.colorScheme = 'light';
        }
        if (isLightMode)
        {
            themeToggle.checked = false
            document.body.classList.add('dark-theme');
            document.documentElement.style.colorScheme = 'dark';
        }
        if (!isLightMode && !isDarkMode)
        {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            {
                document.body.classList.add('dark-theme');
                document.documentElement.style.colorScheme = 'dark';
                themeToggle.checked = true
            } else
            {
                document.body.classList.remove('dark-theme');
                document.documentElement.style.colorScheme = 'light';
                themeToggle.checked = false
            }
        }
        themeToggle.addEventListener('change', () =>
        {
            if (!themeToggle.checked)
            {
                document.body.classList.add('dark-theme');
                document.documentElement.style.colorScheme = 'dark';
                localStorage.setItem('darkMode', false);
                localStorage.setItem('lightMode', true);
            }
            else
            {
                document.body.classList.remove('dark-theme');
                document.documentElement.style.colorScheme = 'light';
                localStorage.setItem('darkMode', true);
                localStorage.setItem('lightMode', false);

            }

        });


        // TEMP DISCLAIMER

        const disclaimerButton = this.shadowRoot.querySelector('footer>.left>button');
        const disclaimer = this.shadowRoot.querySelector('.disclaimer-all');
        const disclaimerOverlay = this.shadowRoot.querySelector('#disclaimer-overlay');
        const disclaimerContent = this.shadowRoot.querySelector('.disclaimer');
        const disclaimerExitBttn = this.shadowRoot.querySelector(".close-disclaimer");

        disclaimerButton.addEventListener('click', () =>
        {
            disclaimer.classList.add('show');
            disclaimerContent.classList.add('show');
            disclaimerOverlay.classList.add('show');
        })

        disclaimerExitBttn.addEventListener('click', () =>
        {
            disclaimer.classList.remove('show');
            disclaimerContent.classList.remove('show');
            disclaimerOverlay.classList.remove('show');
        })
        disclaimerOverlay.addEventListener('click', () =>
        {
            disclaimer.classList.remove('show');
            disclaimerContent.classList.remove('show');
            disclaimerOverlay.classList.remove('show');
        })


        // LANGUAGE TEMPORARY

        const langDiv = this.shadowRoot.querySelector('footer>.right>.lang')
        const langPopup = this.shadowRoot.querySelector('footer>.right>.lang>.popup')
        const languages = this.shadowRoot.querySelectorAll('footer>.right>.lang>.popup>.language')
        const crrLangDiv = this.shadowRoot.querySelector('footer>.right>.lang>.crr-lang')

        langDiv.addEventListener('click', (e) =>
        {
            e.stopPropagation();
            langPopup.classList.toggle('show')
        })

        langPopup.addEventListener('click', (e) =>
        {
            e.stopPropagation();
        })

        languages.forEach(lang =>
        {
            lang.addEventListener('click', (e) =>
            {
                languages.forEach(lang =>
                {
                    lang.classList.remove('selected')
                    langPopup.classList.remove('show')
                }
                )
                e.target.classList.add('selected')
                crrLangDiv.innerHTML = e.target.innerHTML

                if (lang.classList.contains('ro'))
                {
                    localStorage.setItem("language", "ro");
                }
                if (lang.classList.contains('ru'))
                {
                    localStorage.setItem("language", "ru");
                }
                if (lang.classList.contains('en'))
                {
                    localStorage.setItem("language", "en");
                }
                location.reload();
            })

        }
        )

        this.shadowRoot.addEventListener('click', () =>
        {
            if (langPopup.classList.contains('show'))
            {
                langPopup.classList.remove('show');
            }
        })


        const language = localStorage.getItem('language') || 'ro';

        if (language == 'ro')
        {
            languages[0].classList.add('selected')
            crrLangDiv.innerHTML = "Română"
        }
        if (language == 'ru')
        {
            languages[1].classList.add('selected')
            crrLangDiv.innerHTML = "Русский"
        }
        if (language == 'en')
        {
            languages[2].classList.add('selected')
            crrLangDiv.innerHTML = "English"
        }
    }

    render()
    {
        this.shadowRoot.innerHTML = `
      <style>
        *
      {
        margin : 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Poppins, Roboto;
        user-select: none;
        z-index: 3;
        font-weight: 300;
        color: var(--day-dark01);
      }
      button
      {
        border: none;
        background: none;
        cursor: pointer;
    }
      ul
      {
        list-style-type: none;
      }
      
      img {
            pointer-events: none;
            border-radius: inherit;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        footer {
    width: 100%;
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 64px;
    padding-right: 64px;
    display: flex;
    position: relative;
    justify-content: space-between;
    z-index: 5;
    background-color: var(--day-white01);
}

footer.abs {
    position: absolute;
    bottom: 0;
    left: 0;
}

footer>.left {
    display: flex;
    flex-direction: column;
}

footer>.separator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--day-dark06);
}

footer>.circle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--day-white01);
    width: 72px;
    height: 72px;
    border-radius: 1000px;
    border: 1px solid var(--day-dark06);

}

footer>.left>button {
    position: relative;
    background: none;
}

footer>.left>button>span {
    font-size: 24px;
    font-weight: 700;
    color: var(--day-dark01);
    letter-spacing: 6px;
}

footer>.left>button>div {
    position: absolute;
    top: -2px;
    right: -13px;
}

footer>.left>p {
    font-weight: 200;
    font-size: 14px;
    color: var(--day-dark02);
}

footer>.left>label {
    cursor: pointer;
    margin-top: 12px;
    border-radius: 1000px;
    width: 48px;
    height: 24px;
    border: 1px solid var(--day-dark05);
    position: relative;
}

footer>.left>label>input {
    display: none;
}

footer>.left>label>.switch {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid var(--day-dark05);
    transition: all 0.1s ease-in-out;
    z-index: 5;
    background-color: var(--day-white01);
}

footer>.left>label>.icon {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 6px;
    transition: all 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-items: center;
}

footer>.left>label>input:checked+.switch {
    right: calc(100% - 20px);
}

footer>.left>label>input:checked+.switch+.icon {
    left: calc(100% - 20px);
}

footer>.left>label>input:checked+.switch+.icon>#moon-icon {
    display: none;
}

#sun-icon {
    display: none;
}

footer>.left>label>input:checked+.switch+.icon>#sun-icon {
    display: initial;
}

footer>.right {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

footer>.right>.buttons {
    display: flex;
}

footer>.right>.buttons>a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border-radius: 1000px;
    cursor: pointer;
}

footer>.right>.buttons>a:hover {
    border: 1px solid var(--day-dark02);
}

footer>.right>.lang {
    width: 100%;
    text-align: right;
    cursor: pointer;
    font-size: 12px;
    color: var(--day-dark02);
    position: relative;
}

footer>.right>.lang>.crr-lang {
    text-align: inherit;
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
}

footer>.right>.lang>.popup {
    position: absolute;
    padding: 8px 12px;
    display: none;
    top: 50%;
    transform: translateY(-50%);
    left: -20%;
    background-color: var(--day-white01);
    display: none;
    flex-direction: column;
    gap: 8px;
    width: 92px;
    z-index: 4;
    box-shadow: var(--day-m-shadow02);
}

footer>.right>.lang>.popup.show {
    display: flex;
}

footer>.right>.lang>.popup>.language {
    font-size: 12px;
    color: var(--day-dark03);
    text-align: left;
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    justify-content: space-between;
    background: none;
    border: none;
    curson: pointer;
}

footer>.right>.lang>.popup>.language.selected {
    color: var(--day-dark01);
}

footer>.right>.lang>.popup>.language.selected>div {
    display: initial;
}

footer>.right>.lang>.popup>.language>div {
    width: 4px;
    height: 4px;
    border-radius: 1000px;
    background-color: var(--day-gold);
    display: none;
}

footer>.disclaimer-all {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.15s;
    z-index: 10;
}

footer>.disclaimer-all.show {
    opacity: 1;
    pointer-events: initial;
}

#disclaimer-overlay {
    z-index: 6 !important;
    background: rgba(0, 0, 0, 0.75);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out;
}

#disclaimer-overlay.show
{
    opacity: 1;
    pointer-events: initial;
}

footer>.disclaimer-all>.content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

footer>.disclaimer-all>.content>.disclaimer {
    padding: 48px 40px;
    border-radius: 8px;
    background: var(--day-white01);
    transform: scale(0);
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    transition: transform 0.15s;
    z-index: 6;
}

footer>.disclaimer-all>.content>.disclaimer.show {
    transform: scale(1);
}


footer>.disclaimer-all>.content>.disclaimer>p {
    width: 435px;
    color: var(--day-dark01);
    text-align: center;
    font-size: 20px;
    font-weight: 600;

}

footer>.disclaimer-all>.content>.disclaimer>button {
    display: flex;
    padding: 8px 24px;
    justify-content: center;
    align-items: center;
    color: var(--day-white01);
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    background: var(--day-dark01);
}
@media(max-width: 1100px) {
    footer {
    padding-left: 48px;
    padding-right: 48px;
    }
}

@media(max-width: 550px) {
    footer>.disclaimer-all>.content>.disclaimer {
        width: 100%;
    }

    footer>.disclaimer-all>.content>.disclaimer>p {
        width: 100%;
        font-size: 18px;
    }
}

@media(max-width: 400px)
{
    footer {
    padding-left: 24px;
    padding-right: 24px;
    }
}
        

      </style>

    <footer>
        <div class="disclaimer-all">
            <div class="content">
                <div class="overlay" id="disclaimer-overlay"></div>
                <div class="disclaimer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path
                            d="M40.0002 36.6676V53.3343M40.0002 70.001C23.4317 70.001 10.0002 56.5696 10.0002 40.001C10.0002 23.4324 23.4317 10.001 40.0002 10.001C56.5689 10.001 70.0002 23.4324 70.0002 40.001C70.0002 56.5696 56.5689 70.001 40.0002 70.001ZM40.1662 26.6676V27.001L39.8342 27.0016V26.6676H40.1662Z"
                            stroke="var(--day-dark01)" stroke-opacity="0.9" stroke-width="6.66667"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p data-translate="anouncement">Acest website a fost realizat în cadrul competiției ”Tekwill Junior
                        Ambassadors” organizată de
                        proiectul ”Tekwill în
                        Fiecare Școală” și nu reflectă neapărat opinia proiectului.</p>
                    <button class="close-disclaimer" aria-label="Închide">OK</button>
                </div>
            </div>

        </div>
        <div class="separator"></div>
        <div class="circle"></div>
        <div class="left">
            <button>
                <span>RELAX</span>
                <div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_610_121)">
                            <path
                                d="M7.00008 12.8334C10.2217 12.8334 12.8334 10.2217 12.8334 7.00008C12.8334 3.77842 10.2217 1.16675 7.00008 1.16675C3.77842 1.16675 1.16675 3.77842 1.16675 7.00008C1.16675 10.2217 3.77842 12.8334 7.00008 12.8334Z"
                                stroke="var(--day-gold)" stroke-opacity="0.9" stroke-width="1.16667" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M7 7V9.33333" stroke="var(--day-gold)" stroke-opacity="0.9" stroke-width="1.16667"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="7.00008" cy="4.66683" r="0.583333" fill="var(--day-gold)" fill-opacity="0.9" />
                        </g>
                        <defs>
                            <clipPath id="clip0_610_121">
                                <rect width="14" height="14" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>
            </button>
            <p>© Relax 2024</p>
            <label>
                <input type="checkbox" name="" id="">
                <div class="switch"></div>
                <div class="icon">
                    <svg id="moon-icon" width="15" height="15" viewBox="0 0 15 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.39819 7.58017C2.39819 10.4797 4.7487 12.8302 7.64819 12.8302C9.85739 12.8302 11.7479 11.4656 12.5228 9.53346C11.9181 9.77648 11.2565 9.91345 10.5649 9.91345C7.66534 9.91345 5.31486 7.56297 5.31486 4.66346C5.31486 3.9751 5.44981 3.30964 5.69065 2.70728C3.76071 3.4833 2.39819 5.37262 2.39819 7.58017Z"
                            stroke="white" stroke-opacity="0.9" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg id="sun-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 1.75V2.33333M7 11.6667V12.25M2.33333 7H1.75M3.68324 3.68324L3.20833 3.20833M10.3168 3.68324L10.7917 3.20833M3.68324 10.3192L3.20833 10.7917M10.3168 10.3192L10.7917 10.7917M12.25 7H11.6667M9.33333 7C9.33333 8.28864 8.28864 9.33333 7 9.33333C5.71133 9.33333 4.66667 8.28864 4.66667 7C4.66667 5.71133 5.71133 4.66667 7 4.66667C8.28864 4.66667 9.33333 5.71133 9.33333 7Z"
                            stroke="var(--day-gold)" stroke-opacity="0.9" stroke-width="1.16667" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                </div>

            </label>
        </div>
        <div class="right">
            <div class="buttons">
                <a href="tel:061007030">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.41064 8.48453L5.43637 6.05777C5.6417 5.79378 5.74437 5.66178 5.79817 5.51374C5.84578 5.38274 5.86547 5.24324 5.856 5.10419C5.84529 4.94703 5.78318 4.79177 5.65897 4.48125L5.18517 3.29675C5.00136 2.83721 4.90945 2.60744 4.7509 2.45683C4.61119 2.32412 4.43611 2.2346 4.24673 2.19904C4.0318 2.15869 3.79172 2.21871 3.31155 2.33875L2 2.66668C2 9.33333 6.66646 14 13.3333 14L13.6611 12.6883C13.7811 12.2081 13.8411 11.968 13.8008 11.7531C13.7652 11.5637 13.6757 11.3887 13.543 11.2489C13.3924 11.0904 13.1626 10.9985 12.7031 10.8147L11.6461 10.3919C11.2918 10.2501 11.1147 10.1793 10.9381 10.1739C10.7819 10.1691 10.6269 10.2009 10.4853 10.2668C10.3251 10.3413 10.1903 10.4763 9.92047 10.7461L7.86287 12.7713"
                            stroke="var(--day-dark01)" stroke-opacity="0.9" stroke-width="1.33333"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </a>
                <a href="https://www.facebook.com/RelaxCaffeLeova/" target="_blank">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.84615 14.4272C6.84615 14.8095 7.15612 15.1195 7.53846 15.1195C7.9208 15.1195 8.23077 14.8095 8.23077 14.4272H6.84615ZM8.23077 7.04254C8.23077 6.6602 7.9208 6.35023 7.53846 6.35023C7.15612 6.35023 6.84615 6.6602 6.84615 7.04254H8.23077ZM10.3077 2.19638C10.69 2.19638 11 1.88642 11 1.50408C11 1.12173 10.69 0.811768 10.3077 0.811768V2.19638ZM6.84615 7.04254C6.84615 7.42487 7.15612 7.73484 7.53846 7.73484C7.9208 7.73484 8.23077 7.42487 8.23077 7.04254H6.84615ZM7.53846 6.35023C7.15612 6.35023 6.84615 6.6602 6.84615 7.04254C6.84615 7.42487 7.15612 7.73484 7.53846 7.73484V6.35023ZM9.38462 7.73484C9.76695 7.73484 10.0769 7.42487 10.0769 7.04254C10.0769 6.6602 9.76695 6.35023 9.38462 6.35023V7.73484ZM7.53846 7.73484C7.9208 7.73484 8.23077 7.42487 8.23077 7.04254C8.23077 6.6602 7.9208 6.35023 7.53846 6.35023V7.73484ZM5.69231 6.35023C5.30997 6.35023 5 6.6602 5 7.04254C5 7.42487 5.30997 7.73484 5.69231 7.73484V6.35023ZM8.23077 14.4272V7.04254H6.84615V14.4272H8.23077ZM10.3077 0.811768C8.39591 0.811768 6.84615 2.36155 6.84615 4.27331H8.23077C8.23077 3.12625 9.16068 2.19638 10.3077 2.19638V0.811768ZM6.84615 4.27331V7.04254H8.23077V4.27331H6.84615ZM7.53846 7.73484H9.38462V6.35023H7.53846V7.73484ZM7.53846 6.35023H5.69231V7.73484H7.53846V6.35023Z"
                            fill="var(--day-dark01)" />
                    </svg>

                </a>
                <a href="https://www.instagram.com/leovarelax/" target="_blank">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_608_220)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM8 10.6667C9.47273 10.6667 10.6667 9.47273 10.6667 8C10.6667 6.52724 9.47273 5.33333 8 5.33333C6.52724 5.33333 5.33333 6.52724 5.33333 8C5.33333 9.47273 6.52724 10.6667 8 10.6667Z"
                                fill="var(--day-dark01)" fill-opacity="0.9" />
                            <path
                                d="M11.9997 3.33301C11.6315 3.33301 11.333 3.63149 11.333 3.99967C11.333 4.36786 11.6315 4.66634 11.9997 4.66634C12.3679 4.66634 12.6663 4.36786 12.6663 3.99967C12.6663 3.63149 12.3679 3.33301 11.9997 3.33301Z"
                                fill="var(--day-dark01)" fill-opacity="0.9" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1.10248 2.85054C0.666504 3.70619 0.666504 4.8263 0.666504 7.0665V8.93317C0.666504 11.1734 0.666504 12.2935 1.10248 13.1491C1.48597 13.9018 2.09789 14.5137 2.85054 14.8972C3.70619 15.3332 4.8263 15.3332 7.0665 15.3332H8.93317C11.1734 15.3332 12.2935 15.3332 13.1491 14.8972C13.9018 14.5137 14.5137 13.9018 14.8972 13.1491C15.3332 12.2935 15.3332 11.1734 15.3332 8.93317V7.0665C15.3332 4.8263 15.3332 3.70619 14.8972 2.85054C14.5137 2.09789 13.9018 1.48597 13.1491 1.10248C12.2935 0.666504 11.1734 0.666504 8.93317 0.666504H7.0665C4.8263 0.666504 3.70619 0.666504 2.85054 1.10248C2.09789 1.48597 1.48597 2.09789 1.10248 2.85054ZM8.93317 1.99984H7.0665C5.9244 1.99984 5.148 2.00088 4.54789 2.0499C3.96333 2.09766 3.6644 2.18423 3.45586 2.29048C2.9541 2.54615 2.54615 2.9541 2.29048 3.45586C2.18423 3.6644 2.09766 3.96333 2.0499 4.54789C2.00088 5.148 1.99984 5.9244 1.99984 7.0665V8.93317C1.99984 10.0753 2.00088 10.8516 2.0499 11.4518C2.09766 12.0364 2.18423 12.3353 2.29048 12.5438C2.54615 13.0456 2.9541 13.4535 3.45586 13.7092C3.6644 13.8154 3.96333 13.902 4.54789 13.9498C5.148 13.9988 5.9244 13.9998 7.0665 13.9998H8.93317C10.0753 13.9998 10.8516 13.9988 11.4518 13.9498C12.0364 13.902 12.3353 13.8154 12.5438 13.7092C13.0456 13.4535 13.4535 13.0456 13.7092 12.5438C13.8154 12.3353 13.902 12.0364 13.9498 11.4518C13.9988 10.8516 13.9998 10.0753 13.9998 8.93317V7.0665C13.9998 5.9244 13.9988 5.148 13.9498 4.54789C13.902 3.96333 13.8154 3.6644 13.7092 3.45586C13.4535 2.9541 13.0456 2.54615 12.5438 2.29048C12.3353 2.18423 12.0364 2.09766 11.4518 2.0499C10.8516 2.00088 10.0753 1.99984 8.93317 1.99984Z"
                                fill="var(--day-dark01)" fill-opacity="0.9" />
                        </g>
                        <defs>
                            <clipPath id="clip0_608_220">
                                <rect width="16" height="16" fill="var(--day-dark01)" />
                            </clipPath>
                        </defs>
                    </svg>

                </a>
            </div>
            <div class="lang">
                <div class="popup">
                    <button class="language ro">Română<div></div>
                    </button>
                    <button class="language ru">Русский<div></div>
                    </button>
                    <button class="language en">English<div></div>
                    </button>
                </div>
                <span class="crr-lang">Romana</span>

            </div>
        </div>
    </footer>
    `;
    }

}

window.customElements.define("end-section", EndSection)