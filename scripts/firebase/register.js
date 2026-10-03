let submitBtn = document.querySelector(".submit-btn-form-register");
let emailField = document.querySelector(".email-field-input-sign");
let GoogleBTN = document.getElementById("google-signin-provider");
let TwitterBTN = document.getElementById("twitter-login-btn");

// Google SignIn

const form = document.querySelector("#form")
const submitBtnLoading = document.querySelector('#submit-bttn>.loading');
const submitBtnText = document.querySelector('#submit-bttn>.text');

const errorText = document.querySelector('header>.main-text>.error')
const succesText = document.querySelector('header>.main-text>.succes')
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
    submitBtnLoading.style.opacity = "1";
    submitBtnText.style.display = "none";

    e.preventDefault();
    email = emailField.value;
    if (email.value != "")
    {
        startLoad()
        var actionCodeSettings = {
            url: window.location.origin + '/pages/menu.html',
            handleCodeInApp: true,
        };

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() =>
            {
                window.localStorage.setItem('emailForSignIn', email);
                finishLoad()
            })
            .catch((error) =>
            {
                console.log(error)
                errorLoad()
            });
    }
})

GoogleBTN.addEventListener("click", () =>
{
    startLoad()
    firebase.auth()
        .signInWithPopup(GoogleProvider)
        .then((result) =>
        {
            var user = result.user;
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
            {
                querySnapshot.forEach((obj) =>
                {
                    console.log(obj)
                    is_user = true;
                })
            }).then(() =>
            {
                usersDB.where("ID", "==", user.email).get().then((querySnapshot) =>
                {
                    querySnapshot.forEach((obj) =>
                    {
                        console.log(obj)
                        is_user = true;
                    })
                }).then(() =>
                {
                    console.log(user)
                    if (!is_user)
                    {

                        let date = new Date();
                        usersDB.add({
                            name: user.displayName,
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
                            }).then(() =>
                            {


                                // End animation
                                window.location.href = '/';

                            });
                        });
                    }
                });
            })
        }).catch((error) =>
        {
            // Error anim
            console.error(error);
            succesText.classList.remove('show')
            errorText.classList.add('show')
        });
});

// Twitter SignIn

TwitterBTN.addEventListener("click", () =>
{
    startLoad()
    firebase
        .auth()
        .signInWithPopup(TwitterProvider)
        .then((result) =>
        {
            var user = result.user;
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
            {
                querySnapshot.forEach((obj) =>
                {
                    console.log(obj)
                    is_user = true;
                })
            }).then(() =>
            {
                usersDB.where("ID", "==", user.email).get().then((querySnapshot) =>
                {
                    querySnapshot.forEach((obj) =>
                    {
                        console.log(obj)
                        is_user = true;
                    })
                }).then(() =>
                {
                    console.log(user)
                    if (!is_user)
                    {

                        let date = new Date();
                        usersDB.add({
                            name: user.displayName,
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
                            }).then(() =>
                            {

                                // End anim


                                window.location.href = '/';
                            });
                        });
                    }
                });
            })
        }).catch((error) =>
        {
            // Error anim
            console.error(error);
            succesText.classList.remove('show')
            errorText.classList.add('show')

        });
});
