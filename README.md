## Cdscribe 

Cdscribe is a tool for making and retrieving source-code annotations in a simple way.

Text files contain annotations and can be written using any standard text editor. The tools retrieve the annotations using a search pattern.

It's a great solution for annotating third-party libraries. When it is not possible to insert comments in the code that can be replaced/deleted by the next version.


## Installation

### Install cdscribe 
```bash
npm install cdscribe
```
remember to give the necessary permissions

### Create the folder to store the .cdscribe files
```bash
cdscribe --init
```

## Documentation 

When you start cdscribe, a new folder called Cdscribe should have appeared in the root of your project - this is where the annotation files will be stored

```
project
| README.md
│ package.json 
| index.js
│   
└───Src
│ │ Controllers
│ │ Services
│   
└───Cdscribe
    │ index.js.cdscribe

```


You should add all your commented files inside this folder and add the extension .cdscribe to them


> index.js -> index.js.cdscribe 


ps: cdscribe must be run in the root of the project



## Example file

```js
//index.js.cdscribe

@About 
This is the project's main file, it imports the {ValidityMath, ComplexMath} functions from the utils.js file. 

one of its functions is to start server.js and open the API endpoints

It also makes use of the external library {math.js} 

@CalculateTotalPrice
function calculateTotalPrice(items, prices)

This function takes two arguments: items (an array of objects representing items)
and prices (an object with keys representing item names and values representing their corresponding prices). 
It calculates the total price of all the items in the items array by multiplying the quantity of each item by its price and adding up the results. 
```

## Use Cases
    
![cdscribe](https://github.com/gustavoberlat/cdscribe/assets/59585859/02a90f07-28c4-4b91-b0fd-39228f88d982)

### Return the complete annotations file  
```bash
cdscribe index.js 
```


### Return some specific @Blade from the file 

```bash
// Return the @about description
cdscribe index.js @About

// Return the description of @CalculateTotalPrice
cdscribe index.js @CalculateTotalPrice
```

## About 

cdscribe is a javascript tool that was developed in three days, and was mostly inspired by a tool available on https://suckless.org/. 

The tool is called Kelp and can be found here: https://kelp.sourceforge.net/ 

There have been several mentions of this library, such as the expression @blade
