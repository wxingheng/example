/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    let result = [];
    let GAP = 10;
    let len1 = num1.length;
    let len2 = num2.length;
    let len1GAP = Math.ceil(len1/GAP);
    let flag = 0; // 进位标志
    let finalResult = '';

    for (let i = len2-1; i >= 0; i--) {
      let tempI = len2-1-i;
      let tempStr = '';
      let flag = 0;
      for (let k = 0; k < tempI; k++) {
        tempStr += '0'; 
      }

      for (let j = len1GAP; j > 0; j--) {
        let end = j * 10;
        let start = (j-1)*10;
        if (end >= len1-1) {
          end = len1;
        }

        let temp = Number(num1.slice(start, end)) * Number(num2[i]) + flag;
        tempStr = String(temp).slice(start-end) + tempStr;
        flag = Math.floor(temp/Math.pow(10, end-start));
      }

      flag = flag === 0 ? '' : flag;
      result[tempI] = flag + tempStr;
    }

    console.log('result ', result);

    for (let i = -1, len = result[result.length-1].length; i + len >= 0; i--) {
      let start = i; end = i+1;
      let res = 0;

      if (end !== 0) {
        result.forEach(num => {
          res += Number(num.slice(start, end)) || 0;
        })
      } else {
        result.forEach(num => {
          res += Number(num.slice(start));
        })
      }

      res = res + flag;
      finalResult = res%10 + finalResult;
      flag = Math.floor(res/10);
    }
    flag = flag === 0 ? '' : flag;
    finalResult = flag + finalResult;
    finalResult = finalResult.indexOf('0') === 0 ? '0' : finalResult;

    return finalResult;
};

// console.log(multiply('0', '52'));
// console.log(multiply('140', '721'));
console.log(multiply('93553535314', '25247452591474')); // "2361988447605003674312836"
// console.log(multiply('498828660196', '840477629533'));  // "419254329864656431168468"
// console.log(multiply('4321432101234132', '111111111111111111'));