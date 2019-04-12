/*********************
William Hartman

This is a JavaScript solution to the Word Scramble Score coding challenge sent by Likewise

GitHub: https://github.com/WilliamHartman/Word-Scramble-Score
Replit: https://repl.it/@hartman/Word-Scramble-Score

Given more time there are a few ways I can make this more efficient. Mostly by reducing the number of loops that need to be run. I would also add in more fail-safes and error checking for bad input.
*********************/

const comboArr = ['AI', 'AY', 'EA', 'EE', 'EO', 'IO', 'OA', 'OO', 'OY', 'YA', 'YO', 'YU', 'BL', 'BR', 'CH', 'CK', 'CL', 'CR', 'DR', 'FL', 'FR', 'GH', 'GL', 'GR', 'KL', 'KR', 'KW', 'PF', 'PL', 'PR', 'SC', 'SCH', 'SCR', 'SHR', 'SK', 'SL', 'SM', 'SN', 'SP', 'SQ', 'ST', 'SW', 'TH', 'THR', 'TR', 'TW', 'WH', 'WR'];

//Returns true if letter is a vowel
function vowelTest(letter){
  return (/^[AEIOUY]$/i).test(letter);
}

//Returns true if it passes tests for hard scramble
function isHard(scrambledWord, word){
  //Loops through the word letter by letter
  for(let i=0; i<word.length; i++){
    //Return false if a letter is in the same position in both words
    if(scrambledWord[i] === word[i]){
      return false
    }  
  } 
  
  //If the word does not look real, returns false
  if(looksReal(scrambledWord) === false){
    return false
  }

  //Returns true if both if statements pass
  return true
}

//Returns true if it passes tests for poor scramble
function isPoor(scrambledWord, word){
  //If the scrambled word looks real check the other two conditions for poor
  if(looksReal(scrambledWord) === false){
    //If two consecutive letters are the same, return true
    if(checkTwoConsecutive(scrambledWord, word)){
       return true;
    }
    //If the word starts with the same letter, return true
    if(scrambledWord[0] === word[0]){
      return true;
    }
  }
}

//Returns true if two consecutive letters are in the correct place
function checkTwoConsecutive(scrambledWord, word){
  //Loop through scrambled word to find if any letters are in the same place
  for(let i=0; i<scrambledWord.length-1; i++){
    //If two letters in a row are found, return false
    if(scrambledWord[i] === word[i] && scrambledWord[i+1] === word[i+1]){
      return true
    }
  }
  return false;
}

//Returns true if the word "looks real"
function looksReal(scrambledWord){
  let real = false;
  //Loops through scrambled word
  for(let i=0; i<scrambledWord.length-1; i++){
    //Sends the next two and three letters to checkEveryOther.
    if(checkEveryOther(`${scrambledWord[i]}${scrambledWord[i+1]}`, `${scrambledWord[i]}${scrambledWord[i+1]}${scrambledWord.length-2 != i ? scrambledWord[i+2] : ''}`) === false){
      return false
    }
  }
  return true;
}

//Returns true if the consonents and vowels switch every other letter.  
function checkEveryOther(str, threeLetter){
  //If there is two in a row sends the parameters into checkComboArr to see if they are in the comboArr provided. If different returns true
  if(vowelTest(str[0]) === false && vowelTest(str[1]) === false || vowelTest(str[0]) === true && vowelTest(str[1]) === true){
    return checkComboArr(str, threeLetter)
  } else {
    return true;
  }
}

//Returns true if input string is in the comboArr
function checkComboArr(str, threeLetter){
  //Tests two letters vs comboArr. Returns true if it find a match
  for(let i=0; i<comboArr.length; i++){
    if(str === comboArr[i]){
      return true
    }
  }
  //Tests three letters vs comboArr. Returns true if it find a match
  for(let i=0; i<comboArr.length; i++){
    if(threeLetter === comboArr[i]){
      return true
    }
  }
  //Returns false if neither loop found a match
  return false;
}



/********************
* 
*   Main function
*
********************/
function solve(inputArr){
  //Convert input array to upper case
  inputArr = inputArr.map(x => x.toUpperCase())

  //Declare the array we will be building on for the result
  var resultArr = [];

  //Loop through input array
  for(let i=0; i<inputArr.length; i++){
    //Splits the string on the space between words into a new array
    let splitArr = inputArr[i].split(' ')

    //Adds error if there aren't exactly two words
    if(splitArr.length != 2){
      resultArr.push(`Input #${i+1} is not 2 words.`);
    }

    // *** Add error check to make sure both words have the same letters. Split both words into arrays of letters, splice letter out of each if a match is found. No letters left (.length of both = 0) in each is the same word


    //Adds to results array based on what it passes
    if(splitArr[0] === splitArr[1]){
      resultArr.push(`${splitArr[0]} is not a scramble of ${splitArr[1]}`)
    } else if(isHard(splitArr[0], splitArr[1])){
      resultArr.push(`${splitArr[0]} is a hard scramble of ${splitArr[1]}`)
    } else if(isPoor(splitArr[0], splitArr[1])){
      resultArr.push(`${splitArr[0]} is a poor scramble of ${splitArr[1]}`)
    } else {
      resultArr.push(`${splitArr[0]} is a fair scramble of ${splitArr[1]}`)
    }
  
  }
  console.log(resultArr)
  return resultArr
}

solve(['MAPS SPAM', 'RIONY IRONY', 'ONYRI IRONY', 'IRONY IRONY', 'INOYR IRONY', 'IOYRN IRONY']);
solve(['SIMULATOR SIMULATOR', 'SMULATOIR SIMULATOR', 'ROMULATSI SIMULATOR', 'ROMULATIS SIMULATOR', 'SMULATORI SIMULATOR', 'ROTASUMIL SIMULATOR'])



/********************
 *  Auto Scrambler
 *********************/
//Random number generater from 0 to parameter 
function getRandomNumber(max){
  return Math.floor(Math.random()*(max + 1))
}

//Scrambles a word using a RNG
function scrambler(word){
  //Split word into array of letters
  let wordArr = word.split('');
  let scrambledWordArr = [];
  
  //Loop through array while it isn't empty
  while(wordArr.length > 0){
    //Get a random number from 0-length
    let randNum = getRandomNumber(wordArr.length-1);
    //Remove letter from word array, push onto the end of scrambled word array
    scrambledWordArr.push(wordArr.splice(randNum, 1));
  }
  return scrambledWordArr.join('');
}

//Returns an array of scrambled words to use on the main Score function
function multiScramble(word, num){
  let returnArr = [];

  //Loops for as many times as user entered
  for(let i=0; i<num; i++){
    //Pushes scrambled word and seed word into array
    returnArr.push(`${scrambler(word)} word`)
  }
  return returnArr;  
}

let irony = multiScramble('IRONY', 10);
solve(irony)

solve(multiScramble('SIMULATOR', 10))
