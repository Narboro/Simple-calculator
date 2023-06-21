function calculator(string) {
  const operations = {
    '+': function(a, b) { return a + b },
    '-': function(a, b) { return a - b },
    '*': function(a, b) { return a * b },
    '/': function(a, b) { return a / b },
  };
  const romanNumbers = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10,
  };

  function integerToRoman(num) {
    if (typeof num !== 'number') return false;

    let digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman_num = "",
      i = 3;
    while (i--)
      roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    return Array(+digits.join("") + 1).join("M") + roman_num;
  }

  let expression;
  let operator;
  Object.keys(operations).forEach((op) => {
    if (string.split(op).length === 2) {
      expression = string.replace(/\s/g, '').split(op);
      operator = op;
    }
  });

  if (!operator) throw new Error('No expression passed');

  if (Object.keys(romanNumbers).includes(expression[0]) && Object.keys(romanNumbers).includes(expression[1])) {
    const result = Math.floor(operations[operator](Number(romanNumbers[expression[0]]), Number(romanNumbers[expression[1]])));
    if (result <= 0) return '';
    return integerToRoman(result);
  } else if (Object.values(romanNumbers).includes(Number(expression[0])) && Object.values(romanNumbers).includes(Number(expression[1]))) {
    return String(Math.floor(operations[operator](Number(expression[0]), Number(expression[1]))));
  } else {
    throw new Error('No expression passed');
  }
}
