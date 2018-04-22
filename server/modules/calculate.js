module.exports = calculate;

function calculate(object) {
    if (object.op == '+') {
        result = Number(object.x) + Number(object.y);
        return result.toString();
    }
    else if (object.op == '-') {
        result = Number(object.x) - Number(object.y);
        return result.toString();
    }
    else if (object.op == '*') {
        result = Number(object.x) * Number(object.y);
        return result.toString();
    }
    else if (object.op == '/') {
        result = Number(object.x) / Number(object.y);
        return result.toString();
    }
    else {
        return 'error';
    }
}