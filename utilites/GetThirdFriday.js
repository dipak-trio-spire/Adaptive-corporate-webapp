const getNextThirdFriday = () => {
    let currentDate = moment();
    
    let thirdFriday = currentDate.clone().startOf('month').day(5);

    if (thirdFriday.date() < 15) {
        thirdFriday.add(14, 'days');
    } else {
        thirdFriday.add(21, 'days');
    }
    if (thirdFriday.isSameOrBefore(currentDate, 'day')) {
        thirdFriday.add(1, 'month').startOf('month').day(5);
        if (thirdFriday.date() < 15) {
            thirdFriday.add(14, 'days'); 
        } else {
            thirdFriday.add(21, 'days');
        }
    }
    return thirdFriday.toDate(); 
};
