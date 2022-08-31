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


    var numCardUser = 0;
    var userNameInput;

 
    $("#playBtn").click(() =>{
        var userName = document.getElementById("inputUserName").value;
        console.log(userName);
        var numOfCards = document.getElementById("inputNumCard").value;
        console.log(numOfCards);

        if(userName == '' && numOfCards == '')
        {
            $(".error").text("Invalid input - Both of them are required");
           event.preventDefault();
            
        }
        else if(userName == '')
        {
            $(".error").text("Invalid input - Username is required");
            event.preventDefault();
        }
        else if(numOfCards == '')
        {
            $(".error").text("Invalid input - Number of card is required");
            event.preventDefault();
        }
        else if(numOfCards % 2 !=0 )
        {
            $(".error").text("Invalid input - Number of card must be an even number");
            event.preventDefault();
            console.log("test");
        }
        else if(numOfCards > 100)
        {
            $(".error").text("Invalid input - The max number of card is 100");
            event.preventDefault();
        }
        else{
            numCardUser = document.getElementById("inputNumCard").value;
            userNameInput = document.getElementById("inputUserName").value;
            $('.newGameForm').modal('toggle');
            startGame(userNameInput, numCardUser);       
        }
     });
     
    
   

    function startGame(userName, numCards)
    {
        $(".userName").text("Hello " + userName +"!");
        
        console.log("test");
        console.log(userName);
        console.log(numCards);
       
       
        // Creating the cards for the game from the shuffled new img array 
        for (var i = 0; i < shuffledImgArr.length; i++) {
            var card = $(".flipCard").prop("outerHTML");
            // console.log(card);
            // Must copy to another var in order to save the changes
            var NewCard = $(card);
            NewCard.removeClass("d-none");
            $(".backImg", NewCard).attr("src", shuffledImgArr[i]);
            $(".cardsRow").append(NewCard);
        } 

        //-------- Creating the Board Game --------//

        // var numCardUser = document.getElementById("inputNumCard").value;
        var numOfPairs = numCardUser / 2; //? 10 from the user ----> means it should be 5 = from user/2 --> update dynamically

        // Creating the relevant img array with the num of cards chosen by the user
        var CurrImgArr = []
        var count = 0;

        for (var i = 0; i < numOfPairs; i++) {
            CurrImgArr[count] = imgArr[i];
            CurrImgArr[count + 1] = imgArr[i];
            count += 2;
        }
        console.log(CurrImgArr);

        // Shuffle the images array
        var shuffledImgArr = CurrImgArr.sort(() => Math.random() - 0.5).slice(0, numCardUser); 
        console.log(shuffledImgArr);


        // Creating the cards for the game from the shuffled new img array 
        for (var i = 0; i < shuffledImgArr.length; i++) {
            var card = $(".flipCard").prop("outerHTML");
            console.log(card);
            // Must copy to another var in order to save the changes
            var NewCard = $(card);
            NewCard.removeClass("d-none");
            $(".backImg", NewCard).attr("src", shuffledImgArr[i]);
            console.log(NewCard);
            $(".cardsRow").append(NewCard);

        }
        //-------- Creating the Board Game --------//

    function endGame() {
        $(".cards").addClass("d-none");
        $(".endOfGameDiv").removeClass("d-none");
        var clappingSound = new Audio("./sounds/clapping.mp3");
        clappingSound.play();
    }
    
    $(".flipCard").flip({
        axis: 'y',
        trigger: 'click'
    });
    var clickedCounter = 0;  // how many cards are clicked now 
    var pairFound = 0; //number of pair found
    $(".flipCard").click(function () {
        if (!$(this).hasClass("disabledClick")) {
            var clickSound = new Audio("./sounds/clickAudio.wav");
            clickSound.play();
            clickedCounter++;
            $(this).addClass("clickedCard");
            $(this).addClass("disabledClick");

            if (clickedCounter == 2) {
                document.getElementsByClassName('cards')[0].style.pointerEvents = 'none';

                var card1 = document.getElementsByClassName("clickedCard")[0];
                var card2 = document.getElementsByClassName("clickedCard")[1];
                var img1 = card1.getElementsByClassName("backImg")[0].src;
                var img2 = card2.getElementsByClassName("backImg")[0].src;

                if (img1 == img2) {
                    setTimeout(function () {
                    var pairFoundSound = new Audio("./sounds/pairFoundAudio.wav");
                    pairFoundSound.play();
                    pairFound++;
                    console.log(pairFound)
                    $(card1).off(".flip"); // turns off the ability to flip
                    $(card2).off(".flip"); // turns off the ability to flip
                    clickedCounter = 0;
                    $(card1).removeClass("clickedCard");
                    $(card2).removeClass("clickedCard");
                     document.getElementsByClassName('cards')[0].style.pointerEvents = 'auto';
                    if (pairFound == numOfPairs) {
                        setTimeout(function () {
                            endGame();
                        }, 1500);
                    }
                }, 1000); 
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
                        document.getElementsByClassName('cards')[0].style.pointerEvents = 'auto';
                    }, 1500);
                }
            }
        }
        else{
            $(this).flip(true)
        }
       
    });
}
});
