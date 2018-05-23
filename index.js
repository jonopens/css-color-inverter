#!/usr/bin/env node --harmony

const program = require('commander');
const fs = require('fs');

// reference objects
const hexIndexReference = {
  '0': 0,'1': 1,'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'A': 10,'B': 11,'C': 12,'D': 13,'E': 14,'F': 15
};
const hexValueArray = Object.keys(hexIndexReference).sort(); // sort in case order not preserved
const hexValueRegex = /#[a-fA-F0-9]{3,6};/;
let invertedCSS = ''; //  resulting string

// functions

const hasMatch = ( string ) => !!string.match(hexValueRegex);

const hexColorOpposite = ( hex ) => {
  // let arrOfHex = hex.split(''); // assumes !hex.includes('#')

  let arrOfHex = hex.split('');

  // starts at 1 because assumes hex[0] === '#'
  // ends at length - 1 because last char should be ';'
  for ( let i = 1; i < arrOfHex.length - 1; i++ ) {
    let currentIndex = hexIndexReference[arrOfHex[i].toUpperCase()];
    arrOfHex[i] = hexValueArray[15 - currentIndex];
  }

  return arrOfHex.join('');
}

const recurseInvertCSS = ( string ) => {


  if ( hasMatch( string ) ) {
    const regexMatch      = string.match( hexValueRegex );
    const indexAfterMatch = regexMatch.index + regexMatch[0].length;
    const remainingCSS    = regexMatch.input.slice( indexAfterMatch );
    const pre = regexMatch.input.slice( 0, regexMatch.index ) + hexColorOpposite( regexMatch[0] );

    invertedCSS += pre;
    return recurseInvertCSS( remainingCSS );
  } else {
    return string;
  }
}

program
  .version('0.1.0')
  .arguments('<file>')
  .action( function ( file ) {
    fs.readFile(file, 'utf8', ( err, data ) => {
      if (err) throw err;
      recurseInvertCSS( data );
      fs.writeFile(`inverted-${file}`, invertedCSS, (err) => {
        if (err) throw err;
        console.log(`Inverted stylesheet created: inverted-${file}.`)
      });
    });
  })
  .parse(process.argv)
