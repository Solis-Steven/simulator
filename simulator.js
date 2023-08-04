const { io, memory, instructions } = require('./resources')

var ac = 0;

function parseInstruction(instruction) {
    return {
        operation: instruction.slice(0, 4),
        direction1: instruction.slice(4, 15),
        direction2: instruction.slice(15, 26)
    }
}

function binaryToDecimal(binaryString) {
    return parseInt(binaryString, 2)
}

function decimalToBinary(number) {
    let num = number;
    let binary = (num % 2).toString();
    for (; num > 1;) {
        num = parseInt(num / 2);
        binary = (num % 2) + (binary);
    }
    return binary;
}

(() => {
    for (position of Object.keys(instructions)) {
        const { operation, direction1, direction2 } = parseInstruction(instructions[position])
        const posMemory1 = binaryToDecimal(direction1);
        const posMemory2 = binaryToDecimal(direction2);
        let result;
        switch (binaryToDecimal(operation)) {

            case 1:
                //  AC <- MEM[DIR1]
                ac = binaryToDecimal(memory[posMemory1]);
                break;
            case 2:
                //  MEM[DIR1] <- AC
                memory[posMemory1] = decimalToBinary(ac);
                break;
            case 3:
                // AC <- AC + MEM[DIR1]
                ac += binaryToDecimal(memory[posMemory1]);
                break;
            case 4:
                // AC <- AC + MEM[DIR1] + MEM[DIR2]
                ac = ac + binaryToDecimal(memory[posMemory1]) + binaryToDecimal(memory[posMemory2]);
                break;
            case 5:
                // AC <- AC - MEM[DIR1]
                ac -= binaryToDecimal(memory[posMemory1]);
                break;
            case 6:
                // MEM[DIR2] <- AC - MEM[DIR1]
                result = ac - binaryToDecimal(memory[posMemory1]);
                memory[posMemory2] = decimalToBinary(result);
                break;
            case 7:
                // AC <- AC * MEM[DIR1]
                ac = binaryToDecimal(memory[posMemory1]) * ac;
                break;
            case 8:
                // AC <- E/S[DIR1]
                ac = io[binaryToDecimal(direction1)]
                break;
            case 9:
                // E/S[DIR1] <- AC
                io[binaryToDecimal(direction1)] = ac
                break;
            case 10:
                // MEM[DIR1] <- MEM[DIR1] + MEM[DIR2]
                result = binaryToDecimal(memory[posMemory1]) + binaryToDecimal(memory[posMemory2])
                memory[posMemory1] = decimalToBinary(result)
                break;
            case 11:
                // MEM[DIR2] <- MEM[DIR1] * AC
                result = binaryToDecimal(memory[posMemory1]) * ac
                memory[posMemory2] = decimalToBinary(result)
                break;
            case 12:
                // AC <- AC / MEM[DIR1]
                result = ac / binaryToDecimal(memory[posMemory1])
                ac = result
                break;
            case 13:
                // MEM[DIR2] <- AC / MEM[DIR1]
                result = ac / binaryToDecimal(memory[posMemory1])
                memory[posMemory2] = decimalToBinary(result)
                break;
            default:
                break;
        }
    }
})()

console.log('Memory: ', memory)
console.log('AC: ', ac)
console.log('IO: ', io)
