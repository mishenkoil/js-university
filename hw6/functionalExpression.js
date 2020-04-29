const cnst = val => () => val;
const operation = op => (...args) => (...vars) => op(...args.map(f => f(...vars)));

const add = operation((a, b) => a + b);
const subtract = operation((a, b) => a - b);
const multiply = operation((a, b) => a * b);
const divide = operation((a, b) => a / b);
const negate = operation(a => -a);
const avg5 = operation((...args) => args.reduce((a, b) => a + b) / args.length);
const med3 = operation((...args) => args.sort((a, b) => a - b)[1]);
const pi = () => Math.PI;
const e = () => Math.E;

const CONST = {
    "pi": pi,
    "e": e
};

const VARS = ["x", "y", "z"];

const variable = name => {
    let ind = VARS.indexOf(name);
    return (...values) => values[ind];
};

const VARIABLES = {
    "x" : variable("x"),
    "y" : variable("y"),
    "z" : variable("z")
};

const OPERATIONS = {
    "-" : [subtract, 2],
    "+" : [add, 2],
    "/" : [divide, 2],
    "*" : [multiply, 2],
    "negate" : [negate, 1],
    "avg5" : [avg5, 5],
    "med3" : [med3, 3]
};

function parse(expression) {
    let stack = [];
    let tokens = expression.trim().split(/\s+/);

    for (const token of tokens) {
        if (token in OPERATIONS) {
            let op = OPERATIONS[token][0];
            let count = OPERATIONS[token][1];
            stack.push(op(...stack.splice(-count)));
        }
        else if (token in CONST) {
            stack.push(CONST[token]);
        }
        else if (token in VARIABLES) {
            stack.push(VARIABLES[token]);
        }
        else {
            stack.push(cnst(Number(token)));
        }
    }
    return stack.pop();
}