export function type(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
};

export function isEmmpty(object) {
    return Object.keys(object).length === 0;
};

export function isPrimitive(value) {
    let t = type(value);
    return t !== 'Object' && t !== 'Array';
}

let PATH_DELIMITER = '.';

export function lens(data, path) {
    let p = path.split(PATH_DELIMITER);
    let segment = p.shift();

    if (!segment) {
        return data;
    }

    let t = type(data);

    if (t === 'Array' && data[integer(segment)]) {
        return lens(data[integer(segment)], p.join(PATH_DELIMITER));
    } else if (t === 'Object' && data[segment]) {
        return lens(data[segment], p.join(PATH_DELIMITER));
    }
}

function integer(string) {
    return parseInt(string, 10);
}

let id = Math.ceil(Math.random() * 10);
export function uid() {
    return ++id;
};
