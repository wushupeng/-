let mongodb = require("mongodb");

let config = require("./config").DB;
let d = new mongodb.Db(
  config.db,
  new mongodb.Server(config.host, config.port, { auto_reconnect: true }),
  { safe: true }
);
/**
 * 打开数据库，操作集合
 * @param {*} col 集合名
 * @param {*} fn 操作方法
 */
 function content(col,fn){
    d.open(function(err,db){
        if(err){
            throw err;
        }else {
            db.collection(col,function(err,col){
                if(err){
                    throw err;
                }else {
                    fn&&fn(col,db)
                }
            })
        }
    })
}
exports.DB = function (col) {
  return {
    /**
     * 插入数据
     * @param {*} data 插入数据项
     * @param {*} success 成功回调
     * @param {*} fail 失败回调
     */
    insert: function (data, success, fail) {
      connect(col, function (col, db) {
        col.insert(data, function (err, docs) {
          if (err) fail && fail(err);
          else success && success(docs);
          db.close();
        });
      });
    },
    /**
     * 删除数据
     * @param {*} data 删除数据项
     * @param {*} success 成功回调
     * @param {*} fail 失败回调
     */
    remove: function (data, success, fail) {
      connect(col, function (col, db) {
        col.remove(data, function (err, len) {
          if (err) fail && fail(err);
          else success && success(len);
          db.close();
        });
      });
    },
    /**
     * 更新数据
     * @param {*} con 筛选条件
     * @param {*} doc 更新数据项
     * @param {*} success 成功回调
     * @param {*} fail 失败回调
     */
    update: function (con, doc, success, fail) {
      connect(col, function (col, db) {
        col.update(con, doc, function (err, len) {
          if (err) fail && fail(err);
          else success && success(len);
          cb.close();
        });
      });
    },
    find: function (con, success, fail) {
      connect(col, function (col, db) {
        col.find(con).toArray(function (err, docs) {
          if (err) fail && fail(err);
          else success && success(docs);
          db.close();
        });
      });
    },
  };
};
