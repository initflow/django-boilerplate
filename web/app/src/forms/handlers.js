export const phoneInput = (e) => {
    let value = e.target.value;
    if (value.length === 0) {
        return;
    }
    const first3 = value.substring(0, 3);
    if (first3[0] === '+' && first3[1] !== '7') {
        value = `+7${value.substring(1, value.length - 1)}`;
    }

    value = value.substring(0, 1) + value.substring(1).replace(/\+./g, '');

    if (first3 === '8' || first3 === '7') {
        value = '+7';
    }
    if (first3 === '+78' || first3 === '+77') {
        value = `+7${value.substring(3)}`;
    }
    if (value.substring(0, 2) !== '+7') {
        if (value[0] !== '+') {
            value = `+${value}`;
        }
        if (value[1] !== '7') {
            if (value[1] === '8') {
                value = `+7${value.substring(1)}`;
            } else {
                value = `+7${value.substring(0)}`;
            }
        }
    }
    if (value.substring(0, 4) === '+7+7') {
        value = `+7${value.substring(4)}`;
    }
    if (value.substring(0, 3) === '+78' && value.length >= 13) {
        value = `+7${value.substring(3)}`;
    }
    value = `+${value.substring(1).replace(/[^0-9]/g, '').substring(0, 11)}`;

    e.target.value = value;
};
