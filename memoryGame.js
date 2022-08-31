$(() => {

    //-------- Creating the Board Game --------//
    var imgArr =
        ['/images/img1.png',
            '/images/img2.jpg',
            '/images/img3.jpg',
            '/images/img4.png',
            '/images/img5.jpg',
            '/images/img6.jpg',
            '/images/img7.jpg',
            '/images/img8.jpg',
            '/images/img9.jpg',
            '/images/img10.jpg',
            '/images/img11.jpg',
            '/images/img12.jpg',
            '/images/img13.jpg',
            '/images/img14.jpg',
            '/images/img15.png',
            '/images/img16.jpg',
            '/images/img17.jpg',
            '/images/img18.png',
            '/images/img19.jpg',
            '/images/img20.jpg',
            '/images/img21.jpg',
            '/images/img22.jpg',
            '/images/img23.jpg',
            '/images/img24.jpg',
            '/images/img25.jpg',
            '/images/img26.png',
            '/images/img27.png',
            '/images/img28.jpg',
            '/images/img29.jpg',
            '/images/img30.png',
            '/images/img31.jpg',
            '/images/img32.png',
            '/images/img33.jpg',
            '/images/img34.jpg',
            '/images/img35.jpg',
            '/images/img36.jpg',
            '/images/img37.jpg',
            '/images/img38.png',
            '/images/img39.jpg',
            '/images/img40.jpg',
            '/images/img41.png',
            '/images/img42.jpg',
            '/images/img43.jpg',
            '/images/img44.jpg',
            '/images/img45.jpg',
            '/images/img46.jpg',
            '/images/img47.jpg',
            '/images/img48.jpg',
            '/images/img49.jpg',
            '/images/img50.png'];

    var numCardUser = 100;
    var numOfPairs = numCardUser / 2; //? 10 from the user ----> means it should be 5 = from user/2 --> update dynamically


    // Creating the relevant img array with the num of cards chosen by the user
    var CurrImgArr = []
    var count = 0;

    for (var i = 0; i < numOfPairs; i++) {
        CurrImgArr[count] = imgArr[i];
        CurrImgArr[count + 1] = imgArr[i];
        count += 2;
    }
    // console.log(CurrImgArr);


    // Shuffle the images array
    // var shuffledImgArr = imgArr.sort(() => Math.random() - 0.5).slice(0, numOfPairs); //? using the cardsNum
    var shuffledImgArr = CurrImgArr.sort(() => Math.random() - 0.5).slice(0, numCardUser); //? using the cardsNum
    // console.log(shuffledImgArr);


    // Creating the cards for the game from the shuffled new img array 
    for (var i = 0; i < shuffledImgArr.length; i++) {
        var card = $(".flipCard").prop("outerHTML");
        // console.log(card);
        // Must copy to another var in order to save the changes
        var NewCard = $(card);
        NewCard.removeClass("d-none");
        $(".backImg", NewCard).attr("src", shuffledImgArr[i]);
        // console.log("!!!!!!!!!!!!!");
        // console.log(NewCard);
        $(".cardsRow").append(NewCard);
    } 
    //-------- Creating the Board Game --------//

    function endGame() {
        console.log("end of the game");
    }


    var audio = new Audio("http://music.ogg");
    // הכנסת שם ומספר קלפים 

    //הוספה דינאמית של כרטיסים

    //מציאת זוג + אולי סאונד

    // var arr=['','',......]
    //foreach
    $(".flipCard").flip({
        axis: 'y',
        trigger: 'click'
    });
    var clickedCounter = 0;  // how many cards are clicked now 
    var pairFound = 0;
    $(".flipCard").click(function () {
        if (!$(this).hasClass("disabledClick")) {
            // console.log("click");
            clickedCounter++;
            $(this).addClass("clickedCard");
            $(this).addClass("disabledClick");
            // $(this).off(".flip");

            if (clickedCounter == 2) {
                var card1 = document.getElementsByClassName("clickedCard")[0];
                var card2 = document.getElementsByClassName("clickedCard")[1];
                var img1 = card1.getElementsByClassName("backImg")[0].src;
                var img2 = card2.getElementsByClassName("backImg")[0].src;

                if (img1 == img2) {

                    // audio.play();
                    pairFound++;
                    console.log(pairFound)
                    $(card1).off(".flip"); // turns off the ability to flip
                    $(card2).off(".flip"); // turns off the ability to flip
                    clickedCounter = 0;
                    $(card1).removeClass("clickedCard");
                    $(card2).removeClass("clickedCard");
                    if (pairFound == numOfPairs) {
                        endGame();
                    }
                }
                else {
                    setTimeout(function () {
                        $(card1).flip(false);
                        $(card2).flip(false);
                        $(card1).removeClass("disabledClick");
                        $(card1).removeClass("clickedCard");
                        $(card2).removeClass("disabledClick");
                        $(card2).removeClass("clickedCard");
                        clickedCounter = 0;
                    }, 1500);
                }
            }
        }
    });
    //סיום המשחק 
});