export default {
  identityTypeList: [],
  // userbase: {
  userbase: localStorage.getItem('userbase') ? JSON.parse(localStorage.getItem('userbase')) : {
    name: '',
    identityType: '01',
    idNumber: '',
    agree: true,
    gender: '9',
    age: 0,
    phone: ''
  },
  isImplant: false
}
