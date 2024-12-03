export function addZeroes(value) {
    var new_value = value * 1;
    new_value = new_value + "";

    var pos = new_value.indexOf(".");
    if (pos === -1) new_value = new_value + ".0";
    else {
        var integer = new_value.substring(0, pos);
        var decimals = new_value.substring(pos + 1);
        while (decimals.length < 1) decimals = decimals + "0";
        new_value = integer + "." + decimals;
    }
    return new_value;
}