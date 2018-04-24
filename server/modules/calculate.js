module.exports = calculate;

function calculate(object) {
    if (object.op == '+') {
        return Number(object.x) + Number(object.y);
    }
    else if (object.op == '-') {
        return Number(object.x) - Number(object.y);
    }
    else if (object.op == '*') {
        return Number(object.x) * Number(object.y);
    }
    else if (object.op == '/') {
        return Number(object.x) / Number(object.y);
    }
    else if (object.op == '^') {
        return Math.pow(object.x, object.y);
    }
    else if (object.op == '!') {
        if (Number(object.x) == 0) {
            return 1;
        }
        else {
            return Number(object.x) * calculate({
                x: object.x - 1,
                op: '!'
            });
        }
    }
    else if (object.op == '√') {
        return Math.sqrt(Number(object.y));
    }
    else if (object.op == '=') {
        return object.x;
    }
    else {
        return 'error';
    }
}
