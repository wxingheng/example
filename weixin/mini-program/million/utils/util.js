const moment = require('./moment.js');

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    formatTime: formatTime,
    coreComput: coreComput
}


/**
 *
 * @param deposit
 * @param monthlyDeposit
 * @param incomeReturn
 * @param target
 * @returns {string}
 */
export function coreComput(deposit = 100000, monthlyDeposit = 3000, incomeReturn = 4, target = 1000000, swell) {
    let result = deposit;
    let count = 0;
    let categories = [];
    let categoriesCount = 0;
    let data = [];
    let int = [];
    let detail = [];
    do {
        if (count % 30 === 0) {
            data.push(result);
            int.push(parseFloat((result * (incomeReturn / 100 / 12)).toFixed(2)));
            categories.push(moment().add(categoriesCount, 'month').format('YYYY-MM-DD'));
            categoriesCount++;
            detail.push({
                categories: moment().add(categoriesCount, 'month').format('YYYY-MM-DD'),
                data: result,
                int: parseFloat((result * (incomeReturn / 100 / 12)).toFixed(2)),
            });
            // monthlyDeposit = monthlyDeposit * (1 + (swell / 100 / 12));
        }
        result = (monthlyDeposit / 30 + result) * (1 + incomeReturn / (365 * 100));
        result = parseFloat(result.toFixed(2));
        count++;
    } while (result < target)


    return {
        result: `${parseInt(count / 365)}年${Math.round((count % 365) / 30)}个月`,
        categories, data, int, intReduce: int.reduce((a, b) => a + b, 0).toFixed(2), target, detail
    }
}
