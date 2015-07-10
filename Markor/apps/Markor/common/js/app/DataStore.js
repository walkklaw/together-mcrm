'use strict';

define({
  user : {
    _id : 1,
    name : '赵毅',
    role : 'designer',
    storeId : 1
  },

  store : {
    _id : 1,
    city : '大连',
    address : '钻石路8号',
    alliance : '大华店'
  },

  customer : {
    _id: 1,
    "name" : "陈",
    "gender" : "male",
    "phones" : [
      "13811112222",
      "13811113333" ],
    "age" : 2,
    "birthday" : "1985-01-01",
    "family" : "李女士",
    "characteristic" : "国字脸戴眼镜",
    "comments" : [
      {
        "createTime" : "2015-05-01 21:35:03",
        "content" : "座驾：Jeep大切诺基",
        "userId" : 1
      },
      {
        "createTime" : "2015-05-02 20:35:03",
        "content" : "座驾：宝马",
        "userId" : 2
      } ]
  },
});