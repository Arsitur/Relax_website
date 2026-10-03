import { displayImage, niceDateFormatting } from "./utils.js"

const articlePopupOverlay = document.querySelector('#article-overlay');
const articlePopup = document.querySelector('.article-popup');
const articleFileInputLabel = document.querySelector('.img-add-label');
const articleFileInput = document.querySelector("#article-img-add");
const previewImg = document.querySelector('.preview-img');
const articlesSection = document.querySelector('.articles')
const articleName = document.querySelector('#article-name')
const articleAddBttn = document.querySelector("#article-form-add");
const articleDeleteBttn = document.querySelector("#article-form-delete");

const addArticleBttn = document.querySelector('.add-article');

let adminOperation = '';
let currentID;

function openArticlePopup()
{
    articlePopupOverlay.classList.add('show');
    articlePopup.classList.add('show');
}

function closeArticlePopup()
{
    articlePopupOverlay.classList.remove('show');
    articlePopup.classList.remove('show');

    setTimeout(() =>
    {
        articleDeleteBttn.classList.add('active')
        articleFileInput.value = ''
        previewImg.src = ''
        previewImg.classList.remove('show');
        articleFileInputLabel.classList.add('show');
        articleFileInputLabel.children[0].innerHTML = 'Adaugă imaginea'
        articleName.value = ''
        articleAddBttn.innerHTML = 'Adaugă';
    }, 100)
}

addArticleBttn.addEventListener('click', () =>
{
    articleDeleteBttn.classList.remove('active');
    openArticlePopup();
    adminOperation = 'add';
})

articlePopupOverlay.addEventListener('click', () =>
{
    closeArticlePopup();
})

articleFileInput.addEventListener('change', (e) =>
{
    let selectedFile = e.target.files[0];

    if (selectedFile)
    {
        displayImage(selectedFile, previewImg);
        previewImg.classList.add('show');
        articleFileInputLabel.classList.remove('show');
        articleFileInputLabel.children[0].innerHTML = 'Schimbă imaginea'
    }
});

// Web Component

let isAdmin = false;

class ArticleItem extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
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
      }
      img 
      {
            pointer-events: none;
            border-radius: inherit;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        a
        {
            text-decoration: none;
            color: inherit;
        }
        :host>a {
            width: 100%;
            display: flex;
            flex-direction: column;
            cursor: pointer;
        }

        :host>a>.img {
            height: 215px;
            width: 100%;
            border-radius: 8px;
            position: relative;
        }

        :host>a>.img:hover>button {
            opacity: 1;
            pointer-events: initial;
            transform: scale(1);
        }

        :host>a>.img>button {
            position: absolute;
            right: 16px;
            top: 16px;
            opacity: 0;
            pointer-events: none;
            width: 32px;
            height: 32px;
            border-radius: 100px;
            background: var(--day-white01);
            box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.15), 0px 2px 2px 0px rgba(0, 0, 0, 0.13), 0px 5px 3px 0px rgba(0, 0, 0, 0.08), 0px 9px 4px 0px rgba(0, 0, 0, 0.02), 0px 15px 4px 0px rgba(0, 0, 0, 0.00);
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(0);
            cursor: pointer;
            transition: all 0.1s ease-in-out;
            border: none;
        }

        :host>a>.name 
        {
            color: var(--day-dark01);
            font-size: 32px;
            font-weight: 700;
            margin-top: 4px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }

        :host>a>.date
        {
            color: var(--day-dark03);
            font-size: 18px;
            font-weight: 600;
        }
      </style>

      
    <a href="${this.getAttribute('link')}" class="articol">
        <div class="img">
            <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}">
                <button class="settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clip-path="url(#clip0_83_1838)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13.8988 1.25229C13.1177 0.471243 11.8514 0.47124 11.0703 1.25229L1.63195 10.6907C1.35275 10.9699 1.16244 11.3255 1.08501 11.7126L0.693626 13.6696C0.507034 14.6025 1.32959 15.4251 2.26255 15.2385L4.21945 14.8471C4.60663 14.7697 4.96223 14.5794 5.24143 14.3002L14.6798 4.86176C15.4609 4.08072 15.4609 2.81439 14.6798 2.03334L13.8988 1.25229ZM12.0131 2.1951C12.2735 1.93475 12.6956 1.93475 12.956 2.1951L13.737 2.97615C13.9974 3.2365 13.9974 3.6586 13.737 3.91896L11.9559 5.70002L10.2321 3.97616L12.0131 2.1951ZM9.28926 4.91897L2.57476 11.6335C2.48169 11.7266 2.41826 11.8451 2.39245 11.9742L2.00107 13.931L3.95796 13.5396C4.08702 13.5138 4.20555 13.4504 4.29862 13.3574L11.0131 6.64282L9.28926 4.91897Z"
                                fill="var(--day-dark01)" />
                        </g>
                        <defs>
                            <clipPath id="clip0_83_1838">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
        </div>
        <span class="name">${this.getAttribute('name')}</span>
        <span class="date">${this.getAttribute('date')}</span>
    </a>
                    
    `;
        const button = this.shadowRoot.querySelector('a>.img>button');
        if (!isAdmin)
        {
            button.style.display = 'none';
        }
        else
        {
            button.addEventListener('click', (e) =>
            {
                e.stopPropagation();
                e.preventDefault();

                openArticlePopup();

                articleFileInputLabel.classList.remove('show');
                previewImg.classList.add('show');
                previewImg.src = this.getAttribute('img');
                articleFileInputLabel.children[0].innerHTML = 'Schimbă imaginea';
                articleName.value = this.getAttribute('name');
                articleAddBttn.innerHTML = 'Editează';

                adminOperation = 'edit';

                currentID = this.getAttribute('id');

            })
        }

    }

}

window.customElements.define("article-item", ArticleItem)

function renderArticles()
{
    articlesDB.onSnapshot((snapshot) =>
    {
        let docs = snapshot.docs;
        docs.sort(compar);
        articlesSection.innerHTML = '';
        for (let i = 0; i < docs.length; i++)
        {
            articlesSection.innerHTML += `<article-item img="${docs[i].data().photoURL}" name="${docs[i].data().name}" date="${niceDateFormatting(docs[i].data().datePosted)}"
                        link="articol.html?id=${docs[i].id}" id="${docs[i].id}"></article-item>`;
        }
    });
}

firebase.auth().onAuthStateChanged((fuser) =>
{
    if (fuser)
    {
        usersDB.where("admin", "==", true).where("ID", "==", fuser.uid).get().then((querySnapshot) =>
        {
            if (querySnapshot.size > 0)
            {
                isAdmin = true;
                addArticleBttn.classList.add("show");
            }
        }).then(() =>
        {
            renderArticles()
        });
    }
    else
    {
        renderArticles()
    }
});

articleDeleteBttn.addEventListener('click', () =>
{
    if (adminOperation == "edit" && currentID != "" && isAdmin)
    {
        articlesDB.doc(currentID).delete().then(() =>
        {
            closeArticlePopup();
        });
    }
})

articleAddBttn.addEventListener('click', () =>
{
    if (adminOperation == "add" && isAdmin)
    {
        let file = articleFileInput.files[0];
        let name = articleName.value;
        let date = new Date();

        if (file != null && name != "")
        {
            articlesDB.add({
                datePosted: date.getTime(),
                name: name,
                photoURL: "",
                textTypes: [],
                likes: [],
                views:0
            }).then((object) =>
            {
                firebase.storage().ref().child('/' + object.id + ".png").put(file).then((snapshot) =>
                {
                    snapshot.ref.getDownloadURL().then((urlfile) =>
                    {
                        articlesDB.doc(object.id).update({
                            photoURL: urlfile,
                        })
                    }).then(() =>
                    {
                        closeArticlePopup()
                    });
                })
            });
        } else
        {
            closeArticlePopup()
            window.alert("Introduce-ți toate informațiile");
        }
    } else if (adminOperation == "edit" && isAdmin)
    {
        let file = articleFileInput.files[0];
        let name = articleName.value;

        if (name != "")
        {
            articlesDB.doc(currentID).update({
                name: name,
            })

            if (file != null)
            {
                articlesDB.doc(currentID).update({
                    photoURL: "",
                }).then((object) =>
                {
                    firebase.storage().ref().child('/' + currentID + ".png").put(file).then((snapshot) =>
                    {
                        snapshot.ref.getDownloadURL().then((urlfile) =>
                        {
                            articlesDB.doc(currentID).update({
                                photoURL: urlfile,
                            })
                        }).then(() =>
                        {
                            closeArticlePopup()
                        });
                    })
                });
            }
            else
            {
                closeArticlePopup()
            }

        }
        else
        {
            closeArticlePopup()
        }
    }
})

