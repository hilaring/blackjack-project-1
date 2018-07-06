function Game(){
    this.allCards = deckCards;
    this.acc = 0;
    this.totalPlayer = 0;
    this.totalCrupier = 0;
    this.cardsPlayer = [];
    this.cardsCrupier = [];
    this.cardsPlayerDiv = ["#player1","#player2","#player3","#player4","#player5"];
    this.cardsCrupierDiv = ["#dealer1","#dealer2","#dealer3","#dealer4","#dealer5"];
}

//Funció start, afegeix dues cartes a cada jugador, posa el total a les variables corresponents i imprimeix cartes i missatge. (També reprodueix la cançó)
Game.prototype.start = function (){
    if(this.cardsPlayer.length > 0){
        this.messages("Error: El juego ya ha empezado");
    }
    else {
    this.cardsPlayer = [this._randomcard(),this._randomcard()]
    this.cardsCrupier = [this._randomcard(),this._randomcard()]
    this._updateTotal();   
    
    console.log(this.cardsCrupier);
    console.log(this.cardsPlayer);
    
    this.innerHtmlCard();
    this.innerHtmlCardCrupier();
    this.messages("Controla tu adicción")
    }
    song.play()
}

//Funció stand, calcula el total, el jugador es planta i si el crupier pot demanar, demana i verifiquem.
Game.prototype._stand = function(){
    var playerPoints = this._getTotal(this.cardsPlayer);
    var crupierPoints = this._getTotal(this.cardsCrupier);
    //setTimeout((this.giveCardCrupier).bind(this), 2000);

    if (playerPoints > crupierPoints && crupierPoints >= 16){
        this.innerTotalCrupier();
        this.messages("¡Has ganado! Total: " + playerPoints + " vs " + crupierPoints);
        $("#game-over-page").toggle();
    }
    else if(playerPoints < crupierPoints){
        this.innerTotalCrupier();
        this.messages("Has perdido... Total: " + playerPoints + " vs " + crupierPoints);
        $("#game-over-page").toggle();
    }
    else if(playerPoints > crupierPoints){
        this.innerTotalCrupier();
        this.messages("¡Has ganado! Total: " + playerPoints + " vs " + crupierPoints);
        $("#game-over-page").toggle();
    }
    else if(playerPoints === crupierPoints && crupierPoints >= 16){
        this.innerTotalCrupier();
        this.messages("Empate, gana la banca. Total:" + playerPoints + " vs " + crupierPoints);
        $("#game-over-page").toggle();
    }
}

//Funció que demana una carta pel jugador i crida la funció de demanar carta del crupier.
Game.prototype.giveCard = function (){ 
    if (this.totalPlayer === 0){
        this.messages("Error: Antes de pedir carta debes iniciar el juego");
    }

    else if(this.cardsPlayer.length > 0 && this.totalPlayer < 21){
        this.cardsPlayer.push(this._randomcard());
        this.innerHtmlCard();
        this._updateTotal();
        this.verifyPoints();

        if(this.totalCrupier < 21 && this.totalPlayer < 21){
            var crupierCard = setTimeout((this.giveCardCrupier).bind(this), 2000);
            var newCrupierCard = setTimeout((this.innerHtmlCardCrupier).bind(this), 2100);
            this.verifyPoints();
            console.log("Crupier demana carta")
        }
        
        else if(this.cardsPlayer === 4 && this.cardsPlayer < this.cardsCrupier){
            $("#game-over-page").toggle();
        }
    }
}

//Funció que afegeix una carta al crupier si el seu valor total és inferior a 17
Game.prototype.giveCardCrupier = function(){
    this._updateTotal();
    if(this.totalCrupier < 17){
        this.cardsCrupier.push(this._randomcard());
        this.innerHtmlCardCrupier();
        this._updateTotal();
        if(this.totalCrupier === 21){
            this.messages("21 Blackjack! Has perdido... Total: " + this.totalPlayer + " vs " + this.totalCrupier);
            this.innerTotalCrupier();
            $("#game-over-page").toggle();
        }
        else if(this.totalCrupier > 21){
            //this.innerTotalCrupier();
            this.innerTotalCrupier();
            this.messages("Has ganado. Total: " + this.totalPlayer + " vs " + this.totalCrupier);
            $("#game-over-page").toggle();
        }
    }
}

//ACABAR DE VERIFICAR EL PLAYER
Game.prototype.verifyPlayer = function (){
    this._updateTotal();
    if(this.totalPlayer === 21){
        this.messages("21 BlackJack, has ganado!");
        this.innerHtmlCard();
        this.innerTotalCrupier();
        $("#game-over-page").toggle();
    }
    if(this.totalPlayer > 21){
        this.innerHtmlCard();
        this.innerTotalCrupier();
        this.messages("Te has pasado vaquero... Total: " + this.totalPlayer + " vs " + this.totalCrupier);
        $("#game-over-page").toggle();
    }

}

Game.prototype.verifyPoints = function (){
    var playerPoints = this._getTotal(this.cardsPlayer);
    var crupierPoints = this._getTotal(this.cardsCrupier);

    if(playerPoints === 21){
        this.messages("21 BlackJack, has ganado!");
        //this.innerHtmlCard();
        this.innerTotalCrupier();
        $("#game-over-page").toggle();
    }
    else if(playerPoints > 21){
        this.innerHtmlCard();
        this.innerTotalCrupier();
        this.messages("Te has pasado vaquero... Total: " + playerPoints + " vs " + crupierPoints);
        $("#game-over-page").toggle();
    }
    else if(crupierPoints === 21){
        this.messages("21 BlackJack, has perdido: " + playerPoints + " vs " + crupierPoints);
        this.innerTotalCrupier();
        $("#game-over-page").toggle();
    }
    else if(crupierPoints > 21){
        this.messages("Has ganado! Total: " + this.totalPlayer + " vs " + this.totalCrupier);
        this.innerTotalCrupier();
        $("#game-over-page").toggle();
    }
}

//Funció que retorna el valor total de l'array de cartes que li passem.
Game.prototype._getTotal = function(arr){
    if(arr.length > 0){
        var acc = 0;
        for(var i=0; i<arr.length; i++){
            acc += arr[i].Value;
        }
        return acc;
    }
}

//Funció que actualitza els totals amb la funció getTotal.
Game.prototype._updateTotal = function(){
    this.totalPlayer = this._getTotal(this.cardsPlayer);
    this.totalCrupier = this._getTotal(this.cardsCrupier); 
}

//Funció que comprova els totals de cada jugador i verifica si algú ha guanyat o ha perdut
Game.prototype.verifyTotal = function(){
    if (this.totalPlayer > this.totalCrupier && this.totalCrupier >= 16){
        this.innerTotalCrupier();
        this.messages("¡Has ganado! Total: " + this.totalPlayer + " vs " + this.totalCrupier);
        $("#game-over-page").toggle();
    }

    else if(this.totalPlayer < this.totalCrupier){
        this.innerTotalCrupier();
        this.messages("Has perdido... Total: " + this.totalPlayer + " vs " + this.totalCrupier);
        $("#game-over-page").toggle();
    }
    else if(this.totalPlayer === this.totalCrupier && this.totalCrupier >= 16){
        this.innerTotalCrupier();
        this.messages("Empate, gana la banca. Total:" + this.totalPlayer + " vs " + this.totalCrupier);
        $("#game-over-page").toggle();
    }
}

//Funció que genera una carta aleatòria i retorna tot l'objecte.
Game.prototype._randomcard = function(){
    var number = Math.floor((Math.random() * 52) + 1);
    var cardRandom = this.allCards[number];
    return cardRandom;
}

//Funcions per manipular el DOM:
//Funció que afegeix com a background la imatge de la carta al player
Game.prototype.innerHtmlCard = function(){
    for(var i=0; i<this.cardsPlayer.length; i++){
        var cardImg = this.cardsPlayer[i].Img;
            $(this.cardsPlayerDiv[i]).css("background-image", 'url(' + cardImg + ')');
            $(this.cardsPlayerDiv[i]).css("background-size", "cover");
        //}
    }
}

//Funció que afegeix com a background la imatge del dors de les cartes
Game.prototype.innerHtmlCardCrupier = function(){
    for(var i=0; i<this.cardsCrupier.length; i++){
        var cardImg = this.cardsCrupier[i].ImgBack;
            $(this.cardsCrupierDiv[i]).css("background-image", 'url(' + cardImg + ')');
            $(this.cardsCrupierDiv[i]).css("background-size", "cover");
        //}
    }
}

//Funció que "gira" les cartes del crupier per ensenyar-les quan acaba la partida
Game.prototype.innerTotalCrupier = function(){
    for(var i=0; i<this.cardsCrupier.length; i++){
        var cardImg = this.cardsCrupier[i].Img;
            $(this.cardsCrupierDiv[i]).css("background-image", 'url(' + cardImg + ')');
            $(this.cardsCrupierDiv[i]).css("background-size", "cover");
        //}
    }
}

//Funció que afegeis el missatge que li passem al div de messages.
Game.prototype.messages = function(str){
    var message = str;
    $('#message').html(message);
}

//Funció per reiniciar els valors del joc.
Game.prototype._restart = function(){
    this.totalPlayer = 0;
    this.totalCrupier = 0;
    this.cardsPlayer = [];
    this.cardsCrupier = [];
}

