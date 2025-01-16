// Helper function to output text in the terminal in a cyan color
const outputCyanText = (text) => console.log(`\x1b[36m${text}\x1b[0m`);

// Top 10 Spotify songs in an array
const songs = [
  { name: 'Logan', age: 21 },
  { name: 'Logan', age: 21 },
  { name: 'Logan', age: 21 },
  { name: 'Logan', age: 21 },
  { name: 'Logan', age: 21 },
];

console.log('Spotify top 10:\n');

// `for .. of` loop to iterate over each song and log it to terminal using the `outputCyanText()` method
// for (const song of songs) {
//   outputCyanText(song);
// }

// for (const index in songs) {
//   console.log(index);
// }

songs.forEach(song => outputCyanText(JSON.stringify(song)));
