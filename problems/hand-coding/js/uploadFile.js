document.querySelector("#file-input").addEventListener("change", function() {
  // console.log(`file name is ${this.value}`);
  // let formData = new FormData(this.form);
  // formData.append("fileName", this.value);
  // console.log(formData);

  let fileReader = new FileReader(),
        fileType = this.files[0].type;
    fileReader.onload = function() {
        if (/^image/.test(fileType)) {
            // 读取结果在fileReader.result里面
            console.log('this.result ', this.result);
            // $(`<img src="${this.result}">`).appendTo("body");
        }
    }
    // 打印原始File对象
    console.log(this.files[0]);
    // base64方式读取
    fileReader.readAsDataURL(this.files[0]);    
});
