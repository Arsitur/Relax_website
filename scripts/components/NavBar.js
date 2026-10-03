class NavBar extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPage = this.getAttribute('current-page') || 'home';
        this.contactHome = this.getAttribute('contact-home') || 'false';
        this.mainHome = this.getAttribute('main-home') || 'false';
    }

    connectedCallback()
    {
        this.render();

        // FIREBASE ACCOUNT
        const navAcc = this.shadowRoot.querySelector('.account>.acc-img')
        const navButtons = this.shadowRoot.querySelectorAll('.account>a')
        const outlineBtn = this.shadowRoot.querySelector('.outline-buttn')
        const transparentBtn = this.shadowRoot.querySelector('.transparent-bttn')

        const moreMenuAcc = this.shadowRoot.querySelector(".more-menu>.content>.acc-img");
        const moreMenuAccButtons = this.shadowRoot.querySelector(".more-menu>.content>.account");

        firebase.auth().onAuthStateChanged((user) =>
        {
            if (user)
            {
                transparentBtn.style.display = "none"
                outlineBtn.style.display = "none"

                moreMenuAccButtons.style.display = 'none'
                usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
                {
                    querySnapshot.forEach((doc) =>
                    {
                        navAcc.querySelector('img').src = doc.data().photoURL;
                        navAcc.style.display = 'initial';
                        moreMenuAcc.style.display = 'initial';
                        moreMenuAcc.querySelector('img').src = doc.data().photoURL;
                        console.log('YES')
                    });
                })


            } else
            {
                navButtons.forEach(button =>
                {
                    button.style.display = "initial"
                    button.style.pointerEvents = "initial"
                })
                transparentBtn.style.display = "initial"
                transparentBtn.style.pointerEvents = "initial"
                outlineBtn.style.display = "initial"
                outlineBtn.style.pointerEvents = "initial"

                moreMenuAcc.style.display = 'none';
                moreMenuAccButtons.style.display = 'flex'
                navAcc.style.display = 'none'
            }
        });

        if (firebase.auth().isSignInWithEmailLink(window.location.href))
        {

            var email = window.localStorage.getItem('emailForSignIn');
            if (!email)
            {
                window.location.href = '/';
            } else
            {

                firebase.auth().signInWithEmailLink(email, window.location.href)
                    .then((result) =>
                    {
                        window.localStorage.removeItem('emailForSignIn');
                        var user = result.user;
                        let is_user = false;
                        usersDB.where("email", "==", user.email).get().then((querySnapshot) =>
                        {
                            querySnapshot.forEach((obj) =>
                            {
                                is_user = true;
                            })
                        }).then(() =>
                        {
                            console.log(user)
                            if (!is_user)
                            {

                                let date = new Date();
                                usersDB.add({
                                    name: user.email.split("@")[0],
                                    ID: user.uid,
                                    admin: false,
                                    created: date.getTime(),
                                    photoURL: startImage,
                                    email: user.email
                                }).then(() =>
                                {
                                    cartsDB.add({
                                        ID: user.uid,
                                        products: [],
                                    })
                                });
                            }
                        });
                    })
                    .catch((error) =>
                    {
                        console.log(error)
                    });
            }
        }

        // MOBILE MORE NAV

        const moreMenuButton = this.shadowRoot.querySelector('.more');
        const moreMenu = this.shadowRoot.querySelector('.more-menu');
        const moreMenuAccImage = this.shadowRoot.querySelector('.more-menu>.content>.acc-img');
        const moreMenuAccBttns = this.shadowRoot.querySelector('.more-menu>.content>.account');
        const navBar = this.shadowRoot.querySelector("nav");
        const moreMenuLinks = this.shadowRoot.querySelector('.more-menu>.content>.links-list');

        moreMenu.addEventListener('click', (e) =>
        {
            if (!moreMenuLinks.contains(e.target) || !moreMenuAccImage.contains(e.target) || !moreMenuAccBttns.contains(e.target))
            {
                moreMenu.classList.remove('show');
                navBar.classList.remove('more')
            }


        })

        moreMenuLinks.addEventListener('click', (event) =>
        {
            event.stopPropagation();
            event.stopImmediatePropagation();
        });

        moreMenuButton.addEventListener('click', (e) =>
        {
            e.stopPropagation();
            moreMenu.classList.toggle('show');
            if (moreMenu.classList.contains('show'))
            {
                navBar.classList.add('more')
            }
            else
            {
                navBar.classList.remove('more')
            }

        })
    }

    render()
    {
        let lang = localStorage.getItem('language')
        let navOBJ = {
            'home': {
                "en": "Home",
                "ro": "Acasă",
                "ru": "Дом"
            },
            'menu': {
                "en": "Menu",
                "ro": "Meniu",
                "ru": "Меню"
            },
            'article': {
                "en": "Articles",
                "ro": "Articole",
                "ru": "Cтатьях"
            },
            'contact': {
                "en": "Contacts",
                "ro": "Contacte",
                "ru": "Контакты"
            },
            'auth': {
                "en": "Log In",
                "ro": "Autentificare",
                "ru": "Авторизоваться"
            },
            'register': {
                "en": "Sign Up",
                "ro": "Înregistrare",
                "ru": "Регистрация"
            },

        }

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
        nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 32px 64px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 4;
    transition: transform 0.15s;
    height: 110px;
}
a
{
    text-decoration: none;
}

nav.fixed {
    position: fixed;
    background-color: var(--day-white01);
    transform: translateY(-100%);
}

nav.fixed.normal {
    transform: translateY(0%);
}

nav.fixed.abs {
    position: absolute;
    padding: 32px 64px;
}

nav>.content>.logo>a {
    color: var(--day-dark01);
    font-weight: 700;
}



nav>.content>.links-list>.link:hover>a {
    color: var(--day-dark01);
}

nav>.content>.links-list>.link.current>a {
    color: var(--day-dark01);
    font-weight: 600;
}
nav>.content>.links-list>.link>a {
    color: var(--day-dark03);
}

nav>.account>.transparent-bttn {
    color: var(--day-dark01);
    transition: color 0.1s linear;
}

nav>.account>.transparent-bttn:hover {
    color: var(--day-dark03);
}

nav>.account>.outline-buttn {
    border: none;
    background: var(--day-dark01);
    transition: background 0.1s linear;
    color: var(--day-white01);
    white-space: nowrap;
}

nav>.content {
    display: flex;
    align-items: center;
    gap: 64px;
}

nav>.content>.logo {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 6.36px;
}

nav>.content>.links-list {
    display: flex;
    align-items: center;
    gap: 40px;
}

nav>.content>.links-list>.link>a {
    font-size: 20px;
    font-weight: 500;
    transition: color 0.1s linear;
}

nav>.account {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 46px;
}

nav>.account>.transparent-bttn {
    display: flex;
    padding: 8px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 600;
    background: none;
    transition: color 0.1s linear;
    pointer-events: none;
    display: none;
}

nav>.account>.outline-buttn {
    display: flex;
    padding: 8px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 600;
    background: none;
    transition: all 0.1s linear;
    pointer-events: none;
    display: none;
}

nav>.account>.outline-buttn {
    border: 2px solid var(--day-dark01);
    color: var(--day-dark01);
}

nav>.account>.acc-img {
    width: 46px;
    height: 46px;
    border-radius: 100px;
    background-color: #000;
    display: none;
}

nav>.account>.acc-img>a {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100px;
}

nav>.account>.acc-img.current {
    border: 2px solid var(--day-white01);
    outline: 2px solid var(--day-gold);
}

nav>.account>.acc-img>a>img {
    pointer-events: none;
}

nav>.more {
    display: none;
    background: none;
    width: 24px;
    height: 24px;
    z-index: 6;
}

nav.more {
    z-index: 10;
    background: none !important;
}


nav>.more>svg {
    fill: var(--day-dark01);
}
nav.more>.content>.logo>a
{
    color: white;
}
nav.more>.more>svg {
    stroke: white;
    fill: white;
}

.more-menu {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-100%);
    transition: all 0.15s linear;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out;
}

.more-menu.show {
    transform: translateY(0%);
    opacity: 1;
    pointer-events: initial;
}

.more-menu>.content {
    position: relative;
    width: 100%;
    height: 100%;
}

.more-menu>.content>.links-list {
    position: absolute;
    left: 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    top: calc(50% - 5vh);
    transform: translateY(-50%);
    z-index: 80;
}
.more-menu>.content>.links-list>.link
{
    z-index: 7;
}
.more-menu>.content>.links-list>.link>a {
    color: rgba(255, 255, 255, 0.75);
    font-size: 32px;
    font-weight: 400;
}

.more-menu>.content>.links-list>.link.current>a {
    color: #fff;
}

.more-menu>.content>.account {
    position: absolute;
    left: 48px;
    bottom: 48px;
    width: calc(100% - 96px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}

.more-menu>.content>.account>a {
    background: none;
    color: #fff;
    font-weight: 400;
}

.more-menu>.content>.account>.transparent-bttn {
    font-size: 32px;
    text-align: center;
}

.more-menu>.content>.account>.outline-buttn {
    font-size: 32px;
    display: flex;
    width: 100%;
    padding: 16px 48px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 3px solid #FFF;
    text-align: center;
}

.more-menu>.content>.acc-img {
    position: absolute;
    left: 48px;
    bottom: 48px;
    width: 96px;
    height: 96px;
    border-radius: 100px;
    background-color: white;
    display: none;
}

.more-menu>.content>.acc-img.current {
    border: 2px solid var(--day-white01);
    outline: 2px solid var(--day-gold);
}

.more-menu>.content>.acc-img>img {
    border-radius: 100%;
}


    @media(max-width: 1100px) {
    nav>.content>.links-list {
        display: none;
    }

    nav>.account {
        display: none;
    }

    nav>.more {
        display: initial;
    }

    nav {
        padding: 32px 48px !important;
    }
}
@media(max-width: 400px) {
    nav {
        padding: 32px 24px !important;
    }

    .more-menu>.content>.acc-img {
        left: 24px;
        bottom: 40px;
    }

    .more-menu>.content>.links-list {
        left: 24px;
    }

    .more-menu>.content>.account {
        left: 24px;
        bottom: 32px;
        width: calc(100% - 48px);
        gap: 16px;
    }

    .more-menu>.content>.account>.transparent-bttn {
        font-size: 32px;
    }

    .more-menu>.content>.account>.outline-buttn {
        font-size: 28px;
    }
}
    ${this.contactHome == 'true' ?
                '@media(max-width: 1100px) {nav>.content>.logo>a {color:white;} nav>.more {stroke: white; fill: white;}}'
                : ''
            }

            ${this.mainHome == 'true' ?
                '@media(max-width: 1250px) {nav>.content>.logo>a {color:white;} nav>.more {stroke: white; fill: white;}}'
                : ''
            }
    

}

      </style >

      
    
    <nav class="nav-bar">
        <div class="content">
            <div class="logo">
                <a href="${this.currentPage === 'home' ? './index.html' : '../index.html'}" aria-label="Intră pe pagina principala RELAX">RELAX</a>
            </div>
            <ul class="links-list">
                <li class="link ${this.currentPage === 'home' ? 'current' : ''}"><a href="${this.currentPage === 'home' ? './index.html' : '../index.html'}" aria-label="Intră pe pagina de acasă">${navOBJ['home'][lang]}</a></li>
                <li class="link ${this.currentPage === 'menu' ? 'current' : ''}"><a href="${this.currentPage === 'home' ? './pages/menu.html' : './menu.html'}" aria-label="Intră pe pagina de meniu">${navOBJ['menu'][lang]}</a></li>
                <li class="link ${this.currentPage === 'articles' ? 'current' : ''}"><a href="${this.currentPage === 'home' ? './pages/articole.html' : './articole.html'}" aria-label="Intră pe pagina de articole">${navOBJ['article'][lang]}</a>
                </li>
                <li class="link ${this.currentPage === 'contact' ? 'current' : ''}"><a href="${this.currentPage === 'home' ? './pages/contact.html' : './contact.html'}" aria-label="Intră pe pagina de contacte">${navOBJ['contact'][lang]}</a>
                </li>
            </ul>

        </div>
        <div class="account">
            <a href=".${this.currentPage != 'home' ? '' : '/pages'}/autentificare.html" class="transparent-bttn" aria-label="Autentifica-te" data-translate="authobj"
                    aria-label="Intră pe pagina de Autentificare">
                    ${navOBJ['auth'][lang]}
                </a>
                
            <a href=".${this.currentPage != 'home' ? '' : '/pages'}/inregistrare.html" aria-label="Intră pe pagina de Înregistrare" class="outline-buttn" aria-label="Înregistrează-te">${navOBJ['register'][lang]}</a>
            <div  class="acc-img" aria-label="Account" >
                    <img src="" alt="Imaginea ta de profil">
                </div>
        </div>
        <button class="more">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M1.99805 3.99998C1.99805 3.73477 2.1034 3.48041 2.29094 3.29288C2.47848 3.10534 2.73283 2.99998 2.99805 2.99998H20.998C21.2633 2.99998 21.5176 3.10534 21.7052 3.29288C21.8927 3.48041 21.998 3.73477 21.998 3.99998C21.998 4.2652 21.8927 4.51955 21.7052 4.70709C21.5176 4.89463 21.2633 4.99998 20.998 4.99998H2.99805C2.73283 4.99998 2.47848 4.89463 2.29094 4.70709C2.1034 4.51955 1.99805 4.2652 1.99805 3.99998ZM2.99805 13H20.998C21.2633 13 21.5176 12.8946 21.7052 12.7071C21.8927 12.5196 21.998 12.2652 21.998 12C21.998 11.7348 21.8927 11.4804 21.7052 11.2929C21.5176 11.1053 21.2633 11 20.998 11H2.99805C2.73283 11 2.47848 11.1053 2.29094 11.2929C2.1034 11.4804 1.99805 11.7348 1.99805 12C1.99805 12.2652 2.1034 12.5196 2.29094 12.7071C2.47848 12.8946 2.73283 13 2.99805 13ZM2.99805 21H20.998C21.2633 21 21.5176 20.8946 21.7052 20.7071C21.8927 20.5196 21.998 20.2652 21.998 20C21.998 19.7348 21.8927 19.4804 21.7052 19.2929C21.5176 19.1053 21.2633 19 20.998 19H2.99805C2.73283 19 2.47848 19.1053 2.29094 19.2929C2.1034 19.4804 1.99805 19.7348 1.99805 20C1.99805 20.2652 2.1034 20.5196 2.29094 20.7071C2.47848 20.8946 2.73283 21 2.99805 21Z" />
            </svg>
        </button>
    </nav>
    <div class="more-menu overlay">
        <div class="content">
            <ul class="links-list">
                <li class="link ${this.currentPage === 'home' ? 'current' : ''}"><a href="./index.html" aria-label="Intră pe pagina de acasă">${navOBJ['home'][lang]}</a></li>
                <li class=" link ${this.currentPage === 'menu' ? 'current' : ''}"><a href="./pages/menu.html" aria-label="Intră pe pagina de meniu">${navOBJ['menu'][lang]}</a></li>
                <li class="link ${this.currentPage === 'articles' ? 'current' : ''}"><a href="./pages/articole.html" aria-label="Intră pe pagina de articole">${navOBJ['article'][lang]}</a>
                </li>
                <li class="link ${this.currentPage === 'contact' ? 'current' : ''}"><a href="./pages/contact.html" aria-label="Intră pe pagina de contacte">${navOBJ['contact'][lang]}</a>
                </li>
            </ul>
            <div class="account">
                <a href=".${this.currentPage != 'home' ? '' : '/pages'}/autentificare.html" data-translate="authobj" class="transparent-bttn" aria-label="Autentifica-te"
                        aria-label="Intră pe pagina de Autentificare">
                        ${navOBJ['auth'][lang]}
                    </a>
                <a href=".${this.currentPage != 'home' ? '' : '/pages'}/inregistrare.html" class="outline-buttn" aria-label="Înregistrează-te">${navOBJ['register'][lang]}</a>
            </div>
            <div class="acc-img" >
                <img src="" alt="Imaginea ta de profil">
            </div>
        </div>

    </div>
`;
    }

}

window.customElements.define("nav-bar", NavBar)