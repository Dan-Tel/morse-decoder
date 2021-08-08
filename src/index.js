const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let binaryCode = String(expr).match(/.{2}/g);  //Делит всё по 2 цифры
    for(let i in binaryCode) {
        if(binaryCode[i] === '10') {  //Заменяет 10 на точку
            binaryCode.splice(i, 1, '.');
        } else if(binaryCode[i] === '11') {  //Заменяет 11 на тире
            binaryCode.splice(i, 1, '-');
        } else if(binaryCode[i] === '00') {  //Заменяет 00 на одиночный 0 чтобы во всех буквах были по 5 символов
            binaryCode.splice(i, 1, '0');
        } else {  //Заменяет ** на одиночный * чтобы потом при замене ** на пробел не было 2 пробела вместо 1
            binaryCode.splice(i, 1, '*');
        }
    }
    binaryCode = binaryCode.join('').match(/.{5}/g);  //Делит буквы по 5 символов
    for(let i in binaryCode) {
        binaryCode[i] = binaryCode[i].replace(/(0)/g, '');  //Убирает ноли
        binaryCode.splice(i, 1, MORSE_TABLE[binaryCode[i]]);  //Проверяет на наличие ключей и заменяет ключи значениями
        if(binaryCode[i] === undefined) {  //Обрабатывает особый случай(пробел *****) и меняет его на ' '
            binaryCode.splice(i, 1, ' ');
        }
    }
    return binaryCode.join('');  //Собирает массив в строку
}

module.exports = {
    decode
}