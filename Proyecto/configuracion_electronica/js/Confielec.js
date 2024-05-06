const n = ["s", "p", "d", "f", "g", "h", "i"];

const input = document.querySelector("#inputZ");
const getExceptions = document.querySelector("#exceptions");
const outputCE = document.querySelector("#output-ce");
const outputCEE = document.querySelector("#output-cee");
const outputPT = document.querySelector("#output-pt");
const message = document.querySelector("#message");
const elementname={

  1:"Hidrógeno",
2:"Helio",
3:"Litio",
4:"Berilio",
5:"Boro",
6:"Carbono",
7:"Nitrógeno",
8:"Oxígeno",
9:"Flúor",
10:"Neón",
11:"Sodio",
12:"Magnesio",
13:"Aluminio",
14:"Silicio",
15:"Fósforo",
16:"Azufre",
17:"Cloro",
18:"Argón",
19:"Potasio",
20:"Calcio",
21:"Escandio",
22:"Titanio",
23:"Vanadio",
24:"Cromo",
25:"Manganeso",
26:"Hierro",
27:"Cobalto",
28:"Níquel",
29:"Cobre",
30:"Zinc",
31:"Galio",
32:"Germanio",
33:"Arsénico",
34:"Selenio",
35:"Bromo",
36:"Kriptón",
37:"Rubidio",
38:"Estroncio",
39:"Itrio",
40:"Circonio",
41:"Niobio",
42:"Molibdeno",
43:"Tecnecio",
44:"Rutenio",
45:"Rodio",
46:"Paladio",
47:"Plata",
48:"Cadmio",
49:"Indio",
50:"Estaño",
51: "Antimonio",
52: "Teluro",
53: "Yodo",
54: "Xenón",
55: "Cesio",
56: "Bario",
57: "Lantano",
58: "Cerio",
59: "Praseodimio",
60: "Neodimio",
61: "Prometio",
62: "Samario",
63: "Europio",
64: "Gadolinio",
65: "Terbio",
66: "Disprosio",
67: "Holmio",
68: "Erbio",
69: "Tulio",
70: "Iterbio",
71: "Lutecio",
72: "Hafnio",
73: "Tantalio",
74: "Wolframio",
75: "Renio",
76: "Osmio",
77: "Iridio",
78: "Platino",
79: "Oro",
80: "Mercurio",
81: "Talio",
82: "Plomo",
83: "Bismuto",
84: "Polonio",
85: "Astato",
86: "Radón",
87: "Francio",
88: "Radio",
89: "Actinio",
90: "Torio",
91: "Protactinio",
92: "Uranio",
93: "Neptunio",
94: "Plutonio",
95: "Americio",
96: "Curio",
97: "Berkelio",
98: "Californio",
99: "Einstenio",
100: "Fermio",
101: "Mendelevio",
102: "Nobelio",
103: "Lawrencio",
104: "Rutherfordio",
105: "Dubnio",
106: "Seaborgio",
107: "Bohrio",
108: "Hassio",
109: "Meitnerio",
110: "Darmstadtio",
111: "Roentgenio",
112: "Copernicio",
113: "Nihonio",
114: "Flerovio",
115: "Moscovio",
116: "Livermorio",
117: "Teneso",
118: "Oganesson",
}
outputCE.innerHTML = lang.open;

//Main call
function calculate() {
  // Turn the input into a number
  let electrons = input.value * 1;
  w
  let responses;
  if (electrons === 0) {
    responses = { ce: lang.open, cee: "", pt: "", };
  } else if (electrons < 0 || electrons > 118) {
    responses = { ce: lang.limit, cee: "", pt: "", };
  } else {
    responses = generateGraph(electrons);
  }

  outputCE.innerHTML = responses.ce;
  outputCEE.innerHTML = responses.cee;
  outputPT.innerHTML = responses.pt ?? "";
  message.innerHTML = getExceptions.checked && !!responses.cee ? iHateExceptions(electrons) : "";
}

//Generate the output (CE, CEE and Periodic Table Location) generating Linus Diagonals "rule"
//Also, hell script
function generateGraph(z) {
  //The number of elements to read from the array (from right to left)
  let arrayActiveLength = 1;

  //The n value of each l (temp array for each calc)
  let baseN = Object.keys(n);
  
  //Used for the CEE and the table finder
  let incomplete = false;

  //Results to return
  let arrayOutputCE = [];
  let arrayOutputCEE = [];

  dance: for (let leftElectrons = z; leftElectrons > 0; ) {
    //Go through all the n values, from right to left, in order to complete each diagonal
    for (let pos = arrayActiveLength - 1; pos >= 0; pos--) {
      //Next l, next n
      baseN[pos]++;

      let ml = 2 + 4 * pos;

      //If there are more than enough electrons to complete this level
      if (leftElectrons > ml) {
        arrayOutputCE.push(baseN[pos] + n[pos] + ml);

        //Remove the used electrons from the leftElectrons
        leftElectrons -= ml;
      }

      //If there are just enough electrons or not enough to complete the level
      else {
        //Complete the level with all the left electrons
        arrayOutputCE.push(baseN[pos] + n[pos] + leftElectrons);

        //Need to take into account in the CEE
        incomplete = leftElectrons < ml ? n[pos] : false;

        //No need to change any number as there are no electrons left
        break dance;
      }
    }

    //If the next n value of s (baseN[0]) is odd, then a new l is required
    if (baseN[0] % 2 === 0) {
      arrayActiveLength++;
    }
  }

  //All the n values of the used l
  let endingN = baseN.slice(0, arrayActiveLength);

  //If s is incomplete, the CEE is only the last level (s)
  if (incomplete === "s") {
    arrayOutputCEE = arrayOutputCE.slice(-1);
  }

  //Else if p has the same level as s
  else if (endingN[1] >= endingN[0]) {
    //If p is incomplete then s and the last element in CE are the CEE
    if (incomplete === "p") {
      arrayOutputCEE.push(endingN[0] + "s2");
      arrayOutputCEE.push(arrayOutputCE.slice(-1)[0]);
    }

    //Else p is completed too, add both elements manually
    else {
      arrayOutputCEE.push(endingN[0] + "s2");
      arrayOutputCEE.push(endingN[1] + "p6");

      //If the last element isn't the completed p then it's the real incompleted
      if (arrayOutputCE.slice(-1) != endingN[1] + "p6") {
        arrayOutputCEE.push(arrayOutputCE.slice(-1)[0]);
      }
    }
  }

  //Else s is part of the CEE, but might not be the only one
  else {
    arrayOutputCEE.push(endingN[0] + "s2");

    //If the last element isn't the completed s then it's the real incompleted
    if (arrayOutputCE.slice(-1) != endingN[0] + "s2") {
      arrayOutputCEE.push(arrayOutputCE.slice(-1)[0]);
    }
  }

  //Return the arrays with spaces between elements
  let itsTheFinalOutput = {
    ce: arrayOutputCE.join(" "),
    cee: arrayOutputCEE.join(" "),
    pt: undefined,
  };

  //Only run this if it's a real element in the table
  if (z <= 121) {
    itsTheFinalOutput.pt = tableLocation(arrayOutputCEE, endingN[0]).join(" ");
  }
  
  return itsTheFinalOutput;
}

//Find the location of the element in the table (only run if it's a valid element)
function tableLocation(CEE, ns) {
  let output = [];

  //The period is the higest n (s always has the highest n)
  output.push(`${lang.period} ${ns}`);

  //Group is the sum of the electrons in the CEE
  let group = 0;

  //Read all the elements of the CEE
  CEE.forEach((string, i) => {
    //Get each char of the element
    let chars = string.split("");
    //Loop through the chars from right to left
    for (let k = chars.length - 1; k > 0; k--) {
      //The first NaN char must be the l
      if (isNaN(chars[k]) || chars[k] === 0) {
        //f and g are always in group 3 (s is always complete, 2 + 1 = 3)
        if (chars[k] === "f" || chars[k] === "g") {
          group += 1;
          break;
        }

        //As we where looping backwards we can take the ml with the -
        group += parseInt(chars.slice(k - (chars.length - 1)).join(""));

        if (i === CEE.length - 1) {
          if (chars[k] === "p") {
            group += 10;
          }
        }

        break;
      }
    }
  });

  //Save the result in the array
  output.push(`${lang.group} ${(ns === 1 && group === 2) ? 18 : group}`); // Exception for the Helium

  return output;
}

//Just check if for some reason an element doesn't fit in the "rule"
function iHateExceptions(z) {
  return z > 121 ?
    `${lang.the_element_with} ${z} ${lang.doesnt_exist}`
  : exceptions.includes(z) ?
    `${lang.the_element_with} ${z} ${lang.irregular}`
  : "";
  

}
function calculate() {
  
  let electrons = input.value * 1;
  
  
  getElementName(electrons);

  let responses;
  if (electrons === 0) {
    responses = { ce: lang.open, cee: "", pt: "", };
  } else if (electrons < 1 || electrons > 118) {
    responses = { ce: lang.limit, cee: "", pt: "", };
  } else {
    responses = generateGraph(electrons);
  }

  outputCE.innerHTML = responses.ce;
  outputCEE.innerHTML = responses.cee;
  outputPT.innerHTML = responses.pt ?? "";
  message.innerHTML = getExceptions.checked && !!responses.cee ? iHateExceptions(electrons) : "";
}
