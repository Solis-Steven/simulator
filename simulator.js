const instructionsData = require("./instructionsData.js");
const data = require("./data.js")
const io = require("./io.js")

let ac = 0;

const instructions = {
    "0001": 1,
    "0010": 2,
    "0011": 3,
    "0100": 4,
    "0101": 5,
    "0110": 6,
    "0111": 7,
    "1000": 8,
    "1001": 9,
    "1010": 10,
    "1011": 11,
    "1100": 12,
    "1101": 13,
}

const getInstruction = (bits) => {
    const instruction = bits.slice(0, 4);
    
    return(instructions[instruction]);
}

const getDirections = (bits) => {
    const directions = {
        direction1: bits.slice(4, 15),
        direction2: bits.slice(15, 26)
    }

    return directions
}

function BinarioADecimal(binaryString) {
    return parseInt(binaryString, 2)
}


function convertToBinary1 (number) {
    let num = number;
    let binary = (num % 2).toString();
    for (; num > 1; ) {
        num = parseInt(num / 2);
        binary =  (num % 2) + (binary);
    }
    return binary;
}

(() => {
    for(position of Object.keys(instructionsData)) {
        const instruction = getInstruction(instructionsData[position]);
        const {direction1, direction2} =  getDirections(instructionsData[position]);
        const posMemory1 = BinarioADecimal(direction1);
        const posMemory2 = BinarioADecimal(direction2);
        let result;
        switch (instruction) {
            
            case 1:
                ac = BinarioADecimal(data[posMemory1]);
                break;
            case 2:
                data[posMemory1] = convertToBinary1(ac);
                break;
            case 3:
                ac += BinarioADecimal(data[posMemory1]);
                break;
            case 4:
                ac = ac + BinarioADecimal(data[posMemory1]) + BinarioADecimal(data[posMemory2]);
                break;
            case 5:
                ac -= BinarioADecimal(data[posMemory1]);
                break;
            case 6:
                result = ac - BinarioADecimal(data[posMemory1]);
                
                data[posMemory2] = convertToBinary1(result);
                break;
            case 7:
                ac = BinarioADecimal(data[posMemory1]) * ac;
                break;
            case 8:
                ac = io[BinarioADecimal(direction1)]
                break;
            case 9:
                io[BinarioADecimal(direction1)] = ac
                break;
            case 10:
                result = BinarioADecimal(data[posMemory1]) + BinarioADecimal(data[posMemory2])
                data[posMemory1] = convertToBinary1(result)
                break;
            case 11:
                result = BinarioADecimal(data[posMemory1]) * ac
                data[posMemory2] = convertToBinary1(result)
                break;
            case 12:
                result = ac / BinarioADecimal(data[posMemory1])
                ac = result
                break;
            case 13:
                result = ac / BinarioADecimal(data[posMemory1])
                data[posMemory2] = convertToBinary1(result)
                break;
            default:
                break;
        }
    }

    console.log(data);
    console.log({ac});
    console.log(io)
})()