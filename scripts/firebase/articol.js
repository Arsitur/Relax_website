import { niceDateFormatting } from "../utils.js";

const adminBtnsEdit = document.querySelector(".admin-buttons");
const articleImg = document.querySelector(".contents>.initial>.article-img>img");
const articleImgDiv = document.querySelector(".contents>.initial>.article-img");
const articleName = document.querySelector(".contents>.initial>.article-name");
const articleDate = document.querySelector(".contents>.initial>.article-date");
const addedText = document.querySelector(".added");
const adminSave = document.querySelector(".save");
const likeBTN = document.querySelector(".likes");
const likeFill = document.querySelector(".fill");
const likesCount = document.getElementById("likes-number-count");
const postComment = document.getElementById("comment-post-btn");
const textAreaComment = document.getElementById("text-area-comment");
const commentsArea = document.getElementsByClassName("comments")[1];
const commentsCount = document.getElementById("nr-of-comments");
const maxWords = document.querySelector('.contents>.end>#add-comment>.textarea>.max')

const addComment = document.querySelector('.contents>.end>#add-comment');

let isAdmin = false;
let fuser = null;

const url = new URL(document.location);
let DocumentID = url.searchParams.get("id");

// Luam articolul si facem views++
// Dupa il iei si pui undeva sa arate vizualizările

await articlesDB.doc(DocumentID).get().then((obj) => {
    console.log(obj.data())
    articlesDB.doc(DocumentID).update({
        views: obj.data().views+1
    })
})

function generateText(object, contentEditable)
{
    for (let i = 0; i < object.data().textTypes.length; i++)
    {
        if (object.data().textTypes[i].startsWith("BIGTXT2023CODE"))
        {
            addedText.innerHTML += `<div contenteditable="${contentEditable}" class="header">${object.data().textTypes[i].slice(14)}</div>`;
        } else if (object.data().textTypes[i].startsWith("SMALLTXT2023CODE"))
        {
            addedText.innerHTML += `<div contenteditable="${contentEditable}" class="paragraph">${object.data().textTypes[i].slice(16)}</div>`;
        }
    }
}

firebase.auth().onAuthStateChanged((user) =>
{

    if (user)
    {
        fuser = user;
        const addCommentLikes = document.querySelector('.contents>.end>.wrap>.likes');
        addCommentLikes.classList.remove('disabled')
        addComment.classList.remove('disabled')
    }

    const initialPlaceholder = document.querySelector('.contents>.initial>.placeholder');
    initialPlaceholder.style.display = 'none';
    articleImgDiv.style.display = 'initial';
    articleName.style.display = 'initial';
    articleDate.style.display = 'initial';

    const contentPlaceholder = document.querySelector(".contents>.added>.placeholder");
    contentPlaceholder.style.display = 'none'

    const addCommentWrap = document.querySelector('.contents>.end>.wrap');
    const addCommentPlaceholder = document.querySelector('.contents>.end>.placeholder');

    addCommentPlaceholder.style.display = 'none';

    addCommentWrap.style.display = 'flex';
    addComment.style.display = 'initial';

    try
    {
        usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
        {
            querySnapshot.forEach((obj) =>
            {
                if (obj.data().admin == true)
                {
                    isAdmin = true;
                    adminBtnsEdit.style.display = "flex";

                }
            })
        })
    } catch (err)
    {
        adminBtnsEdit.style.display = "none";
    }

    articlesDB.doc(DocumentID).get().then((object) =>
    {
        articleImg.src = object.data().photoURL;
        likesCount.innerHTML = object.data().likes.length;
        if (user)
        {
            if (object.data().likes.includes(fuser.uid))
            {
                likeFill.classList.add("show");
            }
        }


        articleName.textContent = object.data().name;
        articleDate.textContent = niceDateFormatting(object.data().datePosted);
        if (isAdmin)
        {
            generateText(object, true)
        }
        else
        {
            generateText(object, false)
        }


    })

    let canPostComment = true;
    let errorTimeout;

    postComment.addEventListener("click", (event) =>
    {
        event.preventDefault();

        if (!fuser)
        {
            window.alert('Nu ești conectat în cont.');
        } else if (textAreaComment.value === '')
        {
            clearTimeout(errorTimeout)
            textAreaComment.classList.add('error')
            maxWords.classList.add('error')

            errorTimeout = setTimeout(() =>
            {
                textAreaComment.classList.remove('error')
                maxWords.classList.remove('error')
            }, 2500);
        } else if (canPostComment)
        {
            let textValue = textAreaComment.value;
            let date = new Date();

            commentsDB.add({
                author: fuser.uid,
                ID: DocumentID,
                text: textValue,
                datePosted: Number(date.getTime()),
            }).then(() =>
            {
                textAreaComment.value = "";
                canPostComment = false;

                setTimeout(() =>
                {
                    canPostComment = true;
                }, 10000);
            });
        } else
        {
            window.alert('Vă rog așteptați 10 secunde înainte să postați un alt comentariu.');
        }
    });

    commentsDB.onSnapshot((snapshot) =>
    {

        commentsArea.innerHTML = "";
        commentsCount.innerHTML = 0;
        let commentsList = snapshot.docs;
        commentsList.sort(compar);

        for (let object of commentsList)
        {
            if (object.data().ID == DocumentID)
            {
                usersDB.where("ID", "==", object.data().author).get().then((querySnapshot) =>
                {
                    querySnapshot.forEach((auth) =>
                    {
                        commentsArea.innerHTML += `
                        <article-comment img="${auth.data().photoURL}" name="${auth.data().name}" date="${niceDateFormatting(object.data().datePosted)}" text="${object.data().text}"></article-comment>
                            
                            `;
                        commentsCount.innerHTML = Number(commentsCount.innerHTML) + 1;
                    })
                })
            }
        }

    })

    function deleteItem(arr, item)
    {
        var index = arr.indexOf(item);
        if (index !== -1)
        {
            arr.splice(index, 1);
        }
    }

    let likeTimeout;
    let likesList;
    const likesDiv = document.querySelector(".contents>.end>.wrap>.likes");

    articlesDB.doc(DocumentID).get().then((object) =>
    {
        likesDiv.style.pointerEvents = 'initial';
        likesList = object.data().likes;
        likeBTN.addEventListener('click', () =>
        {
            if (fuser == null)
            {
                window.alert('Nu esti conectat in account');
            }
            else
            {
                if (likesList.includes(fuser.uid))
                {
                    likeFill.classList.remove("show");
                    likesCount.innerText = Number(likesCount.innerText) - 1;
                    deleteItem(likesList, fuser.uid);

                } else
                {
                    likeFill.classList.add("show");
                    likesCount.innerText = Number(likesCount.innerText) + 1;
                    likesList.push(fuser.uid);

                }
                clearTimeout(likeTimeout);
                likeTimeout = setTimeout(() =>
                {
                    articlesDB.doc(DocumentID).update({
                        likes: likesList,
                    }, 50);
                })
            }


        })
    })


    addedText.addEventListener("focusout", () =>
    {
        for (let i = 0; i < addedText.children.length; i++)
        {
            if (addedText.children[i].innerHTML == "")
            {
                addedText.children[i].remove();
            }
        }
    })


    adminSave.addEventListener('click', () =>
    {
        let allTexts = [];
        for (let i = 0; i < addedText.children.length; i++)
        {
            if (addedText.children[i].className == "paragraph")
            {
                allTexts.push("SMALLTXT2023CODE" + addedText.children[i].innerHTML);
            } else if (addedText.children[i].className == "header")
            {
                allTexts.push("BIGTXT2023CODE" + addedText.children[i].innerHTML);
            }
        }
        articlesDB.doc(DocumentID).update({
            textTypes: allTexts,
        });
    }
    )


});

