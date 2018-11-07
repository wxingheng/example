/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    var dp = {}; // dp[i][j] 表示 S[i] 至 S[j] 所表示的子串是否是回文子串，是则为 1，不是则为 0
    var len = s.length;
    var ans = 1; // 记录最长回文字符串的长度
    var start = 0, end = 0; // 记录最长回文字符串的长度
    var i, j, L;

    // 计算更新后的最长回文子串长度为1和2的情况    
    for (i = 0; i < len; i++) {
      dp[i] = {};
      dp[i][i] = 1;
      
      if (end <= start) {
        start = i;
        end = i;
      }

      if (i < len-1) {
        if (s[i] === s[i+1]) {
          dp[i][i+1] = 1;
          start = i;
          end = i+1;
          ans = 2;
        }
      }
    }

    // 计算更新后的最长回文子串长度为3开始的情况
    // 计算完3以后再计算4 
    for (L = 3; L <= len; L++) {
      // 枚举子串的起始节点 
      for (i = 0; i+L-1<len; i++) {
         // 子串的右端结点 
        j = i+L-1;

        if (s[i] === s[j] && dp[i+1][j-1] === 1) {
          dp[i][j] = 1;
          start = i;
          end = j;
          ans = L;
        }
      }
    }

    return s.slice(start, end+1);
};


console.log(longestPalindrome('fasfdsafdsafdsaffffffffasfdsa'));
