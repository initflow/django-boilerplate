export const getColorLuma = (colorString) => {
    let rgb = parseInt(colorString, 16); // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff; // extract red
    let g = (rgb >>  8) & 0xff; // extract green
    let b = (rgb >>  0) & 0xff; // extract blue
    let luma = r * 0.2126 + g * 0.7152 + b * 0.0722; // per ITU-R BT.709 // 0 - 255
    return luma;
};

export const isColorDark = (colorString) => {
    return getColorLuma(colorString) < 120;
};

export const isColorLight = (colorString) => {
    return getColorLuma(colorString) > 200;
};

export default {
    getColorLuma,
    isColorDark,
    isColorLight,
}