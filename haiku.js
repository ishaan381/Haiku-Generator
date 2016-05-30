var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

//Function reads the parsed file and converts the buffer to a string
function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
};

//Returns an array of lines in our text file
function formatData(data) {
  return data.toString().split("\n");
};

//Picks a random line to find a word for our haiku
function startingIndexGenerator(arrayLength) {
  return Math.floor(Math.random()*arrayLength);
};

//Given a syllable count and an array of lines, this function
//returns a sentence of one or more words, with a total syllable
//count as that of the argument. All words are found randomly.
function matchSyllables(lines, count) {
  
  var startIndex = startingIndexGenerator(lines.length);
  var poemLine = "";

  while (true) {
    var syllablesInThisWord = 0;

    //Split the line into its components: The word, and the syllable breakdown
    var currentLine = lines[startIndex].split(" ");
    
    //This if statement helps with some words in the cmudict with
    //the format: STRING(1) etc. by basically filtering them out
    if (!currentLine[0].match(/\d/)) {

      //Determine how many syllables in the word
      for (var i in currentLine) {
        if (currentLine[i].match(/\d/)) {
          syllablesInThisWord++
        };
      };

      //If syllable count is matched, only then we return something to
      //break the infinite loop
      if (syllablesInThisWord == count) {
        return poemLine + currentLine[0] + "\n";
      } 
      //Also allow to select words with less syllables to make for more 
      //interesting sentences
      //Important to reduce the 'count' that is being matched
      else if (syllablesInThisWord < count) {
        poemLine += currentLine[0] + " ";
        count -= syllablesInThisWord;
      };

    };

    //If nothing is returned, randomly select a new start index for further looping
    startIndex = startingIndexGenerator(lines.length);
  };
};

//Given a structure array, this function generates and logs a Haiku poem
function createHaiku(structure) {
var linesToSearch = formatData(cmudictFile);
var haikuPoem = ""

  for (var i in structure) {
    haikuPoem += matchSyllables(linesToSearch, structure[i]);
  };

console.log(haikuPoem);
};



module.exports.createHaiku = createHaiku;


