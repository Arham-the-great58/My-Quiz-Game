class Quiz {
    constructor() { }
  
    getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", (data)=> {
        gameState = data.val();
      })
  
    }
  
    update(state) {
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start() {
      if (gameState === 0) {
        contestant = new Contestant();
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()) {
          playerCount = playerCountRef.val();
          contestant.getCount();
        }
        question = new Question()
        question.display();
      }
    }
    play(){
        question.hide();
        background("yellow");
        fill(0)
        textSize(30);
        text("Result of the Quiz",340,50);
        text("-------------------", 320,65);
        Contestant.getPlayerInfo();
        
        if(allContestants!==undefined){
          var display_answers = 230;
          fill("blue");
          text("*Note: Contestants who answered corret are highlited in green colour", 130,230);
          for(var plr in allContestants){
              var correctAnswer = "2";
            if(correctAnswer===allContestants[plr].answer)
            fill("green")
                      else 
                      fill("black");
            display_answers+=30;
            textSize(15);
            text(allContestants[plr].name+": "+allContestants[plr].answer,250,display_answers);
          }
    
        }
        
      }
}
