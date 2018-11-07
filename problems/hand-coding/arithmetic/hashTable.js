let strings = ['oajs', 'sund', 'uixo', 'pqkf','nxzh','fwnm','vgyy','frhs','xnzf','huiq','runm','zbvc','jhas'];

strings.forEach((str, index, arr) => {
  let len = arr.length;
  let hash = stringHash(str, len);
  console.log(`${index} hash ${hash}`);
})

function stringHash(str, M) {
  let hash = 0;
  let R = 100;
  
  for (let i = 0, len = str.length; i < len; i++) {
    hash = (R * hash + str.codePointAt(i)) % M;
  }

  return hash;
}

function floatHash(number) {

}