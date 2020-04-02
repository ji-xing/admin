import { MessageBox } from 'element-ui';

let commom={
  messageBox: function (params) {
    MessageBox(params.content||"确认删除当前信息，确认后将无法恢复！！", '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type:'warning',
    }).then(() => {
      params.succcessFun&&params.succcessFun(params.id);

    }).catch(() => {
     params.errorFun&&params.errorFun();
    })
  }
};
export default commom;