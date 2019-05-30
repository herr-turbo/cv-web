CalculsDates();


var headers = document.getElementsByClassName("section-header");
var lMainTop = document.getElementsByTagName("main")[0].getBoundingClientRect().top;
var lBtnTop = document.getElementById("btn-top");
var derniere_position_de_scroll_connue = 0;
var ticking = false;






window.addEventListener('scroll', function (e) {
    derniere_position_de_scroll_connue = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
            FondPleinQuandSticky(derniere_position_de_scroll_connue);
            AfficheBackToTopButton(derniere_position_de_scroll_connue);
            ticking = false;
        });
    }
    ticking = true;
});






/////////////////////////////////////////////////////////////////////
//                      FONCTIONS
/////////////////////////////////////////////////////////////////////

function CalculsDates() {
    let lNow = new Date();

    //Année en cours pour le footer
    var lCurrentYear = document.getElementById("current-year");
    if (lCurrentYear != null) {
        lCurrentYear.innerText = lNow.getFullYear().toString();
    }


    //Calcul de mon jeune âge
    var lMyAge = document.getElementById("my-age");
    if (lMyAge != null) {
        let lAge = Math.floor(new Number((lNow.getTime() - new Date(1980, 4, 10).getTime()) / 31536000000));
        lMyAge.innerText = lAge.toString();
    }

}



//Met le fond des header des section en blanc plein quand il devient sticky.
function FondPleinQuandSticky(position_scroll) {

    for (let index = 0; index < headers.length; index++) {
        const element = headers[index];

        let lTop = element.getBoundingClientRect().top;
        if (lTop === 0) {
            element.classList.add("header-white");
        }
        else if (lTop > 0) {
            element.classList.remove("header-white");
        }

    }
}


//Apparition du bouton Back to Top une fois que le header est sorti du haut de page.
//la hauteur du header est calculée une seule fois au chargement de la page
//Peut poser souci en cas de changement d'orientation de la page, mais je préfère ça à le recalculer à chaque scroll.
function AfficheBackToTopButton(position_scroll) {

    if (lMainTop != null && lBtnTop != null) {
        lBtnTop.style.right = (position_scroll >= lMainTop ? "1rem" : "-10rem");
    }
}

//var lDepart;
var timeOut;

//Retour en haut de page à la pression sur le bouton.
function BackToTop() {

    //lDepart = new Date();
  
    let lMillisecondStep = 10;
    let lAnimationTime = 200;

    //Définit la hauteur de scroll depuis le début de page
    let lPixelsToTop = (document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop );

    let lPixelStep = Math.round(lPixelsToTop * lMillisecondStep / lAnimationTime * (-1));


    ScrollToTop(lPixelStep, lMillisecondStep);

    

   
    

    // //Tant que pas arrivé en haut, scrolle par à coup de 100 pixels toutes les 7 millisecondes
    // //Ca fait une jolie animation sans JQuery
    // if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
    //     window.scrollBy(0,-100);
    //     timeOut=setTimeout('BackToTop()',10);        
    // }
    // else{
    //     clearTimeout(timeOut);
    //     lBtnTop.style.right = "-10rem";
    // }
}


function ScrollToTop(pPixelStep, pMillisecondStep) {
    
    
   

    if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
        window.scrollBy(0,pPixelStep);
        timeOut=setTimeout('ScrollToTop('+ pPixelStep + ', ' + pMillisecondStep + ')',pMillisecondStep);        
    }
    else{
        clearTimeout(timeOut);
        lBtnTop.style.right = "-10rem";
        //alert((new Date() - lDepart));
    }

}


/**!
Navigation Button Toggle class
*/
(function () {

    // old browser or not ?
    if (!('querySelector' in document && 'addEventListener' in window)) {
        return;
    }
    window.document.documentElement.className += ' js-enabled';

    function toggleNav() {

        // Define targets by their class or id
        var button = document.querySelector('.nav-button');
        var target = document.querySelector('#navbar');

        // click-touch event
        if (button && target) {
            button.addEventListener('click',
                function (e) {
                    button.classList.toggle('is-active');
                    target.classList.toggle('is-opened');
                    e.preventDefault();
                }, false);

                target.addEventListener('click',
                function (e) {
                    button.classList.toggle('is-active');
                    target.classList.toggle('is-opened');
                    // e.preventDefault();
                }, false);
        }
    } // end toggleNav()

    toggleNav();
}());