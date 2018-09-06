export default {
  identityTypeList: [],
  userbase: localStorage.getItem('userbase') ? JSON.parse(localStorage.getItem('userbase')) : {
    name: '',
    identityType: '01',
    idNumber: '',
    agree: true,
    gender: '1',
    age: 0,
    phone: ''
  }
}
