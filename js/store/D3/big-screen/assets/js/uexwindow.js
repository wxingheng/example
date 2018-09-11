window.uexOnload = function(){
  if(uexWidgetOne.getPlatform()){
    uexWindow.setReportKey(0, 1);
    uexWindow.setReportKey(1, 1);
    uexWindow.cbActionSheet = function(opId, dataType, data){
      if(data==0){
        window.location.reload();
      }else if(data==1){
        uexWidgetOne.exit();
      }
    };
    uexWindow.onKeyPressed=function(keyCode){
      if(keyCode==0){
        uexWidgetOne.exit();
      }else if(keyCode==1){
        uexWindow.actionSheet("菜单","取消","刷新,退出程序");
      }
    }
  }
};