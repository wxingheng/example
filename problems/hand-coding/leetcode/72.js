// https://www.dreamxu.com/books/dsa/dp/edit-distance.html

function edit_distance(word1, word2){
    let lena = word1.length;
    let lenb = word2.length;
    let d = [];

    for (let i = 0; i <= lena; i++) {
        d[i] = [];
        d[i][0] = i;
    }
    for (let j = 0; j <= lenb; j++) {
        d[0][j] = j;
    }

    for (let i = 1; i <= lena; i++) {
        for (let j = 1; j <= lenb; j++) {
            // 算法中 a, b 字符串下标从 1 开始，c 语言从 0 开始，所以 -1
            if (word1[i-1] == word2[j-1]) {
                d[i][j] = d[i-1][j-1];
            } else {
                d[i][j] = Math.min.call(this, d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+1);
            }
        }
    }

    return d[lena][lenb];
}