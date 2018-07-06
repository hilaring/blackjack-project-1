window.onload = function(){
    var blackjack = new Game;
    $("#start-btn").on("click", function(){  
        $("#gameboard").toggle();
        $("#start-page").toggle();
        blackjack.start();
    })
    $("#hit").on("click", function(){
        blackjack.giveCard();
    });
    $("#stand").on("click", function(){
        blackjack._stand();
    });
    onclick="blackjack.verifyPoints()"

    $("#try-again-btn").on('click', function(){
        window.location.reload();
    })

};
