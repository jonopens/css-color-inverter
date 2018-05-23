# css-color-inverter

This started as an interest in adding an inverted color scheme to my personal site [jonopens.com](http://www.jonopens.com) and then grew into a desire to try creating a node package.

The goal of css-color-inverter is to generate a new css file from an existing one with inverted hexadecimal color values.

This is currently an active project and is in no way warranted to work for production purposes at this time.

## Usage

Clone to local machine and `npm install [-g]` (-g if you want the command available in other directories).

Super simple currently. Navigate to the directory of the `.css` file of which you'd like to invert the color scheme and run `cssinvert <filename>`.

## Planned Features

- can invert files not in current directory
- can invert multiple files with single command
- is tested
