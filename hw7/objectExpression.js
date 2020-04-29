'use strict';
let VARS = ['x', 'y', 'z'];

// Const
function Const(a) {
    this.value = a;
}

Const.E = new Const(Math.E);
Const.ZERO = new Const(0);
Const.ONE = new Const(1);

Const.prototype.evaluate = function () {
    return this.value;
};

Const.prototype.diff = function () {
    return Const.ZERO;
};

Const.prototype.toString = function () {
    return this.value.toString();
};

// Variable
function Variable(name) {
    this.index = VARS.indexOf(name);
}

Variable.prototype.evaluate = function () {
    return arguments[this.index];
};

Variable.prototype.diff = function (name) {
    return VARS[this.index] === name ? Const.ONE : Const.ZERO;
};

Variable.prototype.toString = function () {
    return VARS[this.index];
};

// Operations
function AbstractOperation(args) {
    this.operands = args;
}

AbstractOperation.prototype.evaluate = function (...args) {
    return this.calc(...this.operands.map(arg => arg.evaluate(...args)));
};

AbstractOperation.prototype.diff = function (name) {
    return this.calcDiff(...this.operands, ...this.operands.map(arg => arg.diff(name)));
};

AbstractOperation.prototype.toString = function () {
    return this.operands.join(' ') + ' ' + this.operation;
};

function makeOperation(calcParam, operationParam, calcDiffParam) {
    function Operation(...args) {
        AbstractOperation.call(this, [...args]);
    }
    Operation.prototype = Object.create(AbstractOperation.prototype);
    Operation.prototype.calc = calcParam;
    Operation.prototype.operation = operationParam;
    Operation.prototype.calcDiff = calcDiffParam;
    return Operation;
}

const Add = makeOperation(
    (a, b) => a + b,
    '+',
    (a, b, da, db) => new Add(da, db)
);

const Subtract = makeOperation(
    (a, b) => a - b,
    '-',
    (a, b, da, db) => new Subtract(da, db)
);

const Multiply = makeOperation(
    (a, b) => a * b,
    '*',
    (a, b, da, db) => new Add(new Multiply(a, db), new Multiply(da, b))
);

const Divide = makeOperation(
    (a, b) => a / b,
    '/',
    (a, b, da, db) => new Divide(new Subtract(new Multiply(da, b), new Multiply(a, db)), new Multiply(b, b))
);

const Negate = makeOperation(
    a => -a,
    'negate',
    (a, da) => new Negate(da)
);

const Power = makeOperation(
    (a, b) => Math.pow(a, b),
    'pow',
    function (a, b, da, db) {
        return new Multiply(
            new Power(a, b),
            new Add(
                new Divide(new Multiply(da, b), a),
                new Multiply(new Log(Const.E, a), db)
            )
        )
    }
);

const Log = makeOperation(
    (a, b) => Math.log(Math.abs(b)) / Math.log(Math.abs(a)),
    'log',
    function (a, b, da, db) {
        // :NOTE: Дубли
        return new Divide(
            new Subtract(
                new Divide(new Multiply(db, new Log(Const.E, a)), b),
                new Divide(new Multiply(da, new Log(Const.E, b)), a)
            ),
            new Multiply(new Log(Const.E, a), new Log(Const.E, a))
        );
    }
);

const OPERATIONS = {
    '+': Add,
    '-': Subtract,
    '*': Multiply,
    '/': Divide,
    'negate': Negate,
    'pow': Power,
    'log': Log,
};

const VARIABLES = {};
for (const vars of VARS) {
    VARIABLES[vars] = new Variable(vars);
}

function parse(expression) {
    let stack = [];
    let tokens = expression.trim().split(/\s+/);

    for (const token of tokens) {
        if (token in OPERATIONS) {
            let args = [];
            for (let j = 0; j < OPERATIONS[token].prototype.calc.length; j++)
                args.push(stack.pop());
            args.reverse();
            stack.push(new OPERATIONS[token](...args));
        }
        else if (token in VARIABLES) {
            stack.push(VARIABLES[token]);
        }
        else {
            stack.push(new Const(Number(token)));
        }
    }
    return stack.pop();
}