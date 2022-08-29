$(() => {
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
    $(".flipCard").click(function () {
        if(!$(this).hasClass("disabledClick")){ 
            // console.log("click");
            clickedCounter++;
            $(this).addClass("clickedCard");
            if (clickedCounter == 2) {
                var card1 = document.getElementsByClassName("clickedCard")[0];
                var card2 = document.getElementsByClassName("clickedCard")[1];

                var img1 = card1.getElementsByClassName("backImg")[0].src;
                var img2 = card2.getElementsByClassName("backImg")[0].src;

                if (img1 == img2) {
                    
                    // audio.play();
                    
                    $(".clickedCard").off(".flip"); // turns off the ability to flip
                    clickedCounter = 0;
                    $(".clickedCard").addClass('disabledClick');
                    // $(".clickedCard").removeClass(".flipCard"); //turns off the ability to click this card 
                    // $(".clickedCard").removeClass("clickedCard");
                }
                else{
                    setTimeout(function(){
                        $(".clickedCard").flip(false);
                        $(".clickedCard").removeClass("clickedCard");
                        clickedCounter = 0;
                    }, 1900); 
                } 
            }
    }
    });
    //סיום המשחק 
});