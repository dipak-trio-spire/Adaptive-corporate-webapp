export function findClosest(quote_data, target) {
    var protectionlevel = [];
    var tp2 = Object.keys(quote_data);
    //setting percent based on protection level selected
    for (var i = 0; i < tp2.length; i++) {
        protectionlevel.push(100 - parseFloat(tp2[i]).toFixed(2));
    }
    var mid;
    var low = 0;
    var high = protectionlevel.length - 1;
    while (high - low > 1) {
        mid = Math.floor((low + high) / 2);
        if (protectionlevel[mid] < target) {
            low = mid;
        } else {
            high = mid;
        }
    }
    if (target - protectionlevel[low] <= protectionlevel[high] - target) {
        return protectionlevel[low];
    }
    return protectionlevel[high];
}