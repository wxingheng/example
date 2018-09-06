export default {
  isIdentity: function isIdCard(id_number) {
    if (isNaN(id_number.substring(0, id_number.length - 1))) {
      return false
    }
    const len = id_number.length
    let re
    if (len === 15) {
      re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/)
    } else if (len === 18) {
      re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d|X|x)$/);
    } else {
      return false
    }
    if (!re.exec(id_number)) {
      return false
    }
    var a = id_number.match(re)
    if (a != null) {
      if (len == 15) {
        var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
        var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
      } else {
        var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
        var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
      }
      if (!B) {
        return false;
      }
    }
    return true;
  },
  checkTel: function (tel) {
    const mobile = /^1[3|5|8]\d{9}$/,
      phone = /^0\d{2,3}-?\d{7,8}$/
    return mobile.test(tel) || phone.test(tel)
  },
  IdCard: function (UUserCard, num) {
    if (num == 1) {
//获取出生日期
        var birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
        return birth;
    }
    if (num == 2) {
//获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
//男
            return "1";
        } else {
//女
            return "2";
        }
    }
    if (num == 3) {
//获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}
}
