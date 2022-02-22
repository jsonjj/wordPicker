//var fs = require("fs");
//var text = fs.readFileSync("./words.txt");
//var words = text.split("\n")
testing = false
guessNumber = 0
maxGuesses = 6
gNumLetters = 5; // TBD: get this from the web-page

function loadDoc() {
  if (testing == false) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://gist.githubusercontent.com/wchargin/8927565/raw/d9783627c731268fb2935a731a618aa8e95cf465/words", false);
    xhttp.send();
    return xhttp.responseText;
  } else {
    return "spice\nplace\ngiant\nhello\ncreate"
  }
}


  var words = loadDoc().split("\n")
//console.log(`${words}`)



betterWords = []
letterWords = []
for (let i = 0; i < words.length; i++) {
    if ((words[i].indexOf("'") == -1) && (words[i].indexOf("é") == -1)) {
      betterWords.push(words[i])
    }
}

//for (let i = 0; i < betterWords.length; i++) {
//      console.log(betterWords[i])
//}

function letters(num) {
  for (let i = 0; i < betterWords.length; i++) {
    if (betterWords[i].length == num) {
      letterWords.push(betterWords[i])
    }
  }
  newWord = letterWords[Math.floor(Math.random() * (letterWords.length + 1))];
  return newWord
}

var currentWord = letters(gNumLetters).toLowerCase()
console.log("hello, is this working")
//currentWord = letterWords[Math.floor(Math.random() * (letterWords.length + 1))];

function updateGuess(guessNumber, numberOfLetters, inputPosArray, colors) {
  console.log(`hey, were in here; ${colors}`)
  for (let i=0; i < numberOfLetters; i++) {
    var guess;
    document.getElementById(`guess${guessNumber}_${i + 1}`).textContent=inputPosArray[i];
    document.getElementById(`guess${guessNumber}_${i + 1}`).style.color=colors[i];
    if (i < numberOfLetters - 1) {
      document.getElementById(`guess${guessNumber}_${i + 1}`).innerHTML=document.getElementById(`guess${guessNumber}_${i + 1}`).textContent.concat(" &nbsp;&nbsp;&nbsp; ")
    }
  }
}

function clickMe() {
  guessNumber ++
  if (guessNumber > maxGuesses) {
    alert(`You lost...BOOOOHHHOOOOO, ${currentWord}`)
  }
  currentLetters = currentWord.split("")
  var uno = document.getElementById("1")
  var dos = document.getElementById("2")
  var tres = document.getElementById("3")
  var cuatro = document.getElementById("4")
  var cinco = document.getElementById("5")
  var numeros = [uno, dos, tres, cuatro, cinco]
  var numValues = [uno.value, dos.value, tres.value, cuatro.value, cinco.value]
  var id = ["1", "2", "3", "4", "5"]
  var upperCaseInput = numValues.join("")
  var input = upperCaseInput.toLowerCase()
  console.log(input)
  console.log(currentWord)
  //retVal = []
  var colors = []
  var win = false
  var index;
  for (let i = 0; i < currentWord.length; i++) {
      index = currentLetters.indexOf(input[i])
      if (currentWord[i] == input[i]) {
        console.log("green", currentWord[i], input[i])
        currentLetters.splice(i, 1)
        //numeros[i].style.color = "green";
        colors.push("green")
        
        if (currentWord == input) {
          win = true
        }
      } else {
        var color = "red";
        if (index != -1) {
          color = "yellow"
          currentLetters.splice(index, 1)
        }
        console.log("not green", currentWord[i], input[i], color)
        //numeros[1].style.color = color
        colors.push(color)
      }
  }
  updateGuess(guessNumber, gNumLetters, numValues, colors)
  for (let i = 0; i < currentWord.length; i++) {
    numeros[i].value=""
  }
  if (win == true) {
    alert("you win...YYYAAAYYYY")
  }
}
