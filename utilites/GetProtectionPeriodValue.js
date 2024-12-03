export function GetPeriodValue(ProtectionPeriodValue) {
    if (ProtectionPeriodValue === "day") {
        return "Day";
    } else if (ProtectionPeriodValue === "week") {
        return "Weekly";
    } else if (ProtectionPeriodValue === "week_2") {
        return "2 Weeks";
    } else if (ProtectionPeriodValue === "week_3") {
        return "3 Weeks";
    } else if (ProtectionPeriodValue === "month") {
        return "1 Month";
    } else if (ProtectionPeriodValue === "month_2") {
        return "2 Months";
    } else if (ProtectionPeriodValue === "quarter") {
        return "3 Months";
    } else if (ProtectionPeriodValue === "half_year") {
        return "6 Months";
    } else if (ProtectionPeriodValue === "year") {
        return "Year";
    }
}

export function GetPeriodIntValue(ProtectionPeriodValue) {
    if (ProtectionPeriodValue === "day") {
        return 2;
    } else if (ProtectionPeriodValue === "week") {
        return 7;
    } else if (ProtectionPeriodValue === "week_2") {
        return 14;
    } else if (ProtectionPeriodValue === "week_3") {
        return 21;
    } else if (ProtectionPeriodValue === "month") {
        return 30;
    } else if (ProtectionPeriodValue === "month_2") {
        return 60;
    } else if (ProtectionPeriodValue === "quarter") {
        return 91;
    } else if (ProtectionPeriodValue === "half_year") {
        return 182;
    } else if (ProtectionPeriodValue === "year") {
        return 365;
    }
}

export function selectedPeriodBackend(period) {
    if (period === "Day") {
        return {
            period_str: 'day',
            period_int: 2
        };
    } else if (period === "Weekly") {
        return {
            period_str: 'week',
            period_int: 7
        };
    } else if (period === "2 Weeks") {
        return {
            period_str: 'week_2',
            period_int: 14
        };
    } else if (period === "3 Weeks") {
        return {
            period_str: 'week_3',
            period_int: 21
        };
    } else if (period === "1 Month") {
        return {
            period_str: 'month',
            period_int: 30
        };
    } else if (period === "2 Months") {
        return {
            period_str: 'month_2',
            period_int: 60
        };
    } else if (period === "3 Months") {
        return {
            period_str: 'quarter',
            period_int: 91
        };
    } else if (period === "6 Months") {
        return {
            period_str: 'half_year',
            period_int: 182
        };
    } else if (period === "Year") {
        return {
            period_str: 'year',
            period_int: 365
        };
    }
}