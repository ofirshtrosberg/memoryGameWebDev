$(() => {
    var imgArr =
        ['./images/img1.png',
            './images/img2.jpg',
            './images/img3.jpg',
            './images/img4.png',
            './images/img5.jpg',
            './images/img6.jpg',
            './images/img7.jpg',
            './images/img8.jpg',
            './images/img9.jpg',
            './images/img10.jpg',
            './images/img11.jpg',
            './images/img12.jpg',
            './images/img13.jpg',
            './images/img14.jpg',
            './images/img15.png',
            './images/img16.jpg',
            './images/img17.jpg',
            './images/img18.png',
            './images/img19.jpg',
            './images/img20.jpg',
            './images/img21.jpg',
            './images/img22.jpg',
            './images/img23.jpg',
            './images/img24.jpg',
            './images/img25.jpg',
            './images/img26.png',
            './images/img27.png',
            './images/img28.jpg',
            './images/img29.jpg',
            './images/img30.png',
            './images/img31.jpg',
            './images/img32.png',
            './images/img33.jpg',
            './images/img34.jpg',
            './images/img35.jpg',
            './images/img36.jpg',
            './images/img37.jpg',
            './images/img38.png',
            './images/img39.jpg',
            './images/img40.jpg',
            './images/img41.png',
            './images/img42.jpg',
            './images/img43.jpg',
            './images/img44.jpg',
            './images/img45.jpg',
            './images/img46.jpg',
            './images/img47.jpg',
            './images/img48.jpg',
            './images/img49.jpg',
            './images/img50.png'];

    var gamesCounter = 0;
    var numCardUser = 0;
    var userNameInput;
    var secondsCounter;
    var seconds;
    var minutes;
    var hours;
    setInterval(timerChanger, 1000);
    $("#openingPlayBtn").click(() => {
        var userName = document.getElementById("openingUserName").value;
        var numOfCards = document.getElementById("openingNumCard").value;

        if (userName == '' && numOfCards == '') {
            $(".erroropening").text("Invalid input - Both of them are required");
        }
        else if (userName == '') {
            $(".erroropening").text("Invalid input - Username is required");
        }
        else if (numOfCards == '') {
            $(".erroropening").text("Invalid input - Number of card is required");
        }
        else if (numOfCards % 2 != 0) {
            $(".erroropening").text("Invalid input - Number of card must be an even number");
        }
        else if (numOfCards > 100) {
            $(".erroropening").text("Invalid input - The max number of card is 100");
        }
        else {
            numCardUser = document.getElementById("openingNumCard").value;
            userNameInput = document.getElementById("openingUserName").value;
            $(".openingFormContainer").addClass("d-none");
            document.getElementById("newGameBtnId").style.visibility = "visible";
            $(".openingTitle").addClass("d-none");
            $(".erroropening").text("");
            startGame(userNameInput, numCardUser);
        }
    });
    
    $("#playBtn").click(() => {
        if(gamesCounter>=1){
            $(".cardsRow").children().not(".flipCard.d-none").remove();
            $(".endOfGameDiv").addClass("d-none");
        }
        var userName = document.getElementById("inputUserName").value;
        var numOfCards = document.getElementById("inputNumCard").value;

        if (userName == '' && numOfCards == '') {
            $(".error").text("Invalid input - Both of them are required");
        }
        else if (userName == '') {
            $(".error").text("Invalid input - Username is required");
        }
        else if (numOfCards == '') {
            $(".error").text("Invalid input - Number of card is required");
        }
        else if (numOfCards % 2 != 0) {
            $(".error").text("Invalid input - Number of card must be an even number");
        }
        else if (numOfCards > 100) {
            $(".error").text("Invalid input - The max number of card is 100");
        }
        else {
            numCardUser = document.getElementById("inputNumCard").value;
            userNameInput = document.getElementById("inputUserName").value;
            $('.newGameForm').modal('toggle');
            $(".error").text("");
            startGame(userNameInput, numCardUser);
            
        }
    });
    
    function timer(){
        secondsCounter = 0;
        seconds = document.getElementsByClassName("seconds")[0];
        minutes = document.getElementsByClassName("minutes")[0];
        hours = document.getElementsByClassName("hours")[0]; 
        seconds.innerHTML = "00";
        minutes.innerHTML = "00";
        hours.innerHTML = "00";
        $(".timer").removeClass("d-none");
        
    }
    function timerChanger(){
        secondsCounter++;
        var currSeconds = secondsCounter%60;
        var currMinutes = Math.floor(secondsCounter/60);
        var currHours = Math.floor(secondsCounter/3600);
        if(currSeconds<10){
           
            seconds.innerHTML="0"+currSeconds;
        }
        else{
            seconds.innerHTML=currSeconds;
        }
        if(currMinutes<10){
            minutes.innerHTML="0"+currMinutes;
        }
        else{
            minutes.innerHTML=currMinutes;
        }
        if(currHours<10){
            hours.innerHTML="0"+currHours;
        }
        else{
            hours.innerHTML=currHours;
        }
    }

    function startGame(userName, numCards) {
        $(".cards").removeClass("d-none");
        gamesCounter++;
        timer();
        $(".userName").text("Hello " + userName + "!");

        //-------- Creating the Board Game --------//

        var numOfPairs = numCardUser / 2; //? 10 from the user ----> means it should be 5 = from user/2 --> update dynamically

        // Creating the relevant img array with the num of cards chosen by the user
        var CurrImgArr = []
        var count = 0;

        for (var i = 0; i < numOfPairs; i++) {
            CurrImgArr[count] = imgArr[i];
            CurrImgArr[count + 1] = imgArr[i];
            count += 2;
        }
        
        // Shuffle the images array
        var shuffledImgArr = CurrImgArr.sort(() => Math.random() - 0.5).slice(0, numCardUser);

        // Creating the cards for the game from the shuffled new img array 
        for (var i = 0; i < shuffledImgArr.length; i++) {
            var card = $(".flipCard").prop("outerHTML");
            // Must copy to another var in order to save the changes
            var NewCard = $(card);
            NewCard.removeClass("d-none");
            $(".backImg", NewCard).attr("src", shuffledImgArr[i]);
            $(".cardsRow").append(NewCard);

        }
        //-------- Creating the Board Game --------//
       

        function endGame() {
            $(".cards").addClass("d-none");
            $(".timer").addClass("d-none");
            var seconds = document.getElementsByClassName("seconds")[0].innerHTML;
            var minutes = document.getElementsByClassName("minutes")[0].innerHTML;
            var hours = document.getElementsByClassName("hours")[0].innerHTML;

            var finishSeconds = document.getElementsByClassName("seconds")[1];
            var finishMinutes = document.getElementsByClassName("minutes")[1];
            var fhinishHours = document.getElementsByClassName("hours")[1];
            finishSeconds.innerHTML=seconds;
            finishMinutes.innerHTML=minutes;
            fhinishHours.innerHTML=hours;
            $(".endOfGameDiv").removeClass("d-none"); //show end of game form
            var clappingSound = new Audio("./sounds/clapping.mp3"); //end of game sound
            clappingSound.play();
        }


        $(".flipCard").flip({
            axis: 'y',
            trigger: 'click'
        });
        var clickedCounter = 0;  // how many cards are clicked now 
        var pairFound = 0; //number of pair found
        $(".flipCard").click(function () {
            // if click is valid
            if (!$(this).hasClass("disabledClick")) {
                var clickSound = new Audio("./sounds/clickAudio.wav"); 
                clickSound.play();
                clickedCounter++;
                $(this).addClass("clickedCard"); // clickedCard mean the card is ope
                $(this).addClass("disabledClick"); // disabledClick means you can't click on this card

                //check if the 2 ope card have the same image
                if (clickedCounter == 2) {
                    document.getElementsByClassName('cards')[0].style.pointerEvents = 'none'; // disable the ability to click on cards
                    var card1 = document.getElementsByClassName("clickedCard")[0];
                    var card2 = document.getElementsByClassName("clickedCard")[1];
                    var img1 = card1.getElementsByClassName("backImg")[0].src;
                    var img2 = card2.getElementsByClassName("backImg")[0].src;
                    // if the 2 ope cards are pair
                    if (img1 == img2) {
                        setTimeout(function () {
                            var pairFoundSound = new Audio("./sounds/pairFoundAudio.wav");
                            pairFoundSound.play();
                            pairFound++;
                            $(card1).off(".flip"); // turns off the ability to flip
                            $(card2).off(".flip"); // turns off the ability to flip
                            clickedCounter = 0;
                            $(card1).removeClass("clickedCard");
                            $(card2).removeClass("clickedCard");
                            document.getElementsByClassName('cards')[0].style.pointerEvents = 'auto'; //enable the ability to click on cards
                            // if all pairs found
                            if (pairFound == numOfPairs) {
                                setTimeout(function () {
                                    endGame();
                                }, 600);
                            }
                        }, 1000);
                    }
                    else {
                        // if the 2 ope cards are'nt pair
                        setTimeout(function () {
                            $(card1).flip(false); // close the first card
                            $(card2).flip(false);// close the second card
                            $(card1).removeClass("disabledClick");
                            $(card1).removeClass("clickedCard");
                            $(card2).removeClass("disabledClick");
                            $(card2).removeClass("clickedCard");
                            clickedCounter = 0;
                            document.getElementsByClassName('cards')[0].style.pointerEvents = 'auto';  //enable the ability to click on cards
                        }, 1500);
                    }
                }
            }
            else {
                $(this).flip(true); // prevent clicking the same card twice
            }

        });
        $("#startOver").click(function () {
            $(".cardsRow").children().not(".flipCard.d-none").remove();
            $(".endOfGameDiv").addClass("d-none");
            startGame(userName, numCards);

        });
        $("#newGame").click(function () {
            $(".cardsRow").children().not(".flipCard.d-none").remove();
            $(".endOfGameDiv").addClass("d-none");
            $('.newGameForm').modal('toggle');
        });  
    }
});
