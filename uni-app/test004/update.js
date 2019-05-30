document.addEventListener(
  "deviceready",
  function() {
    window.AppUpdate &&
      window.AppUpdate.checkAppUpdate(
        function() {
          //   alert("update-success");
        },
        function() {
          //   alert("update-error");
        },
        "http://149.129.86.255:8080/update/version.xml"
      );
  },
  false
);
