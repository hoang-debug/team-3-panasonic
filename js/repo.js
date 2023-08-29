//<!-- DATA STORE -->
function ClearData(key) {
    var list = [];
    localStorage.setItem(key, list);
  }
  
  function getDataList(key) {
    var list = [];
    var db = localStorage.getItem(key);
    if (db != null && db.length > 0) {
      list = JSON.parse(db);
    } else {
      localStorage.setItem(key, JSON.stringify(list));
    }
  
    return list;
  }
  
  function setDataList(list, key) {
    if (list == null || list.length == 0) {
      list = [];
    }
    localStorage.setItem(key, JSON.stringify(list));
  }
  