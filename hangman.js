 
 const wordbank = ["apple","banana","pear","peach","grape","kiwi","orange","watermelon","pineapple","mango","cantelope","honeydew","zucchini","potato","carrot","broccoli","onion","squash","peas","corn","asparagus","pizza","hamburger","hotdog","spaghetti","lasagna","fettucini","sushi","marinara","alfredo","nuggets","car","truck","boat","plane","helicopter","tank","submarine","spaceship","jetski","spaceship","rocket","barge","bat","fish","lion","cheetah","elephant","frog","monkey","ape","gorilla","crocodile","alligator","bear","cougar","shark","whale","dolphin","zebra","giraffe","tiger","bird","eagle","hawk","duck","ostrich","computer","battery","laptop","man","woman","child","baby","girl","boy","friend"];

  //Prepare game
  let randomWord = Math.floor(Math.random()*wordbank.length);
  const word = wordbank[randomWord].toUpperCase().split('');
  const wordLength = word.length;
  const wordUL = document.querySelector('.word');
  const hangman = ["head","torso","right-arm","left-arm","right-leg","left-leg","face"];
  let bodyIndex = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let gameOverMessage = document.querySelector('#end-message');
  let modal = document.querySelector('.modal');
  // console.log(word);

  // Create word & blanks
  for(let i = 0; i < wordLength; i++){
    let newLetter = document.createElement('li');
    newLetter.className = 'letter';
    newLetter.style.color = 'white';
    newLetter.textContent = word[i];
    wordUL.appendChild(newLetter);
  }

  // Game start - Pick a letter
  const alphabetUl = document.querySelector('.alphabet');
  alphabetUl.addEventListener('click', function(e){
    e.target.style.fontWeight = 'normal';
    e.target.style.color = '#555';
    e.target.style.textDecoration = 'line-through';
    let elementClicked = e.target.textContent;
    let letterMatchIndices = [];

    // Check if letter in word
    for (let i=0;i<wordLength;i++) {
      if(elementClicked == word[i]){
        letterMatchIndices.push(i);
      }
    }

    // Show matching letter if correct
    if(letterMatchIndices.length > 0){
        letterMatchIndices.forEach(function(item){
        wordUL.children[item].style.color = "";
        correctAnswers++;
        });
    }
    else{
      // Add body part if wrong pick
      let bodypart = document.getElementById(hangman[bodyIndex]);bodypart.style.visibility = "visible";
      bodyIndex++;
      wrongAnswers++;
    }

  // Check if win or lose
  if(correctAnswers === wordLength){
    gameOverMessage.textContent = "You Won!";
    modal.style.display = "initial";
  }
  if(wrongAnswers === hangman.length){
    gameOverMessage.textContent = "You Lost";
    modal.style.display = "initial";
  }
  });
