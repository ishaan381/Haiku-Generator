var haiku = require('./haiku');

console.log("Haiku of format 5,7,5:");
haiku.createHaiku([5,7,5]);

console.log("Haiku of format 2,2,1,7,2,2,1:");
haiku.createHaiku([2,2,1,7,2,2,1]);


console.log("Technically not a Haiku, but a poem of format 7,9,14,9,7:");
haiku.createHaiku([7,9,14,9,7]);

