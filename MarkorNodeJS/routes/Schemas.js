module.exports = {
  customers : {
    id : Number,
    name : String,
    gender : String,
    phones : [],
    age : Number,
    birthday : String,
    family : String,
    characteristic : String,
    comment : [],
  },

  cutomerRecords : {
    id : Number,
    userId : Number,
    start : String,
    end : String,
    isEffective : Boolean,
  },

  deliveryIntentions : {
    id : Number,
    liftDoorSize : String,
    staircaseDoorSize : String,
    houseDoorSize : String,
    liftSize : String,
    staircaseSize : String,
    roomDoorSize : String,
    needCarryThroughStair : Boolean,
    needHangingDecoration : Boolean,
    floor : Number,
    hangingDecorationComment : String,
    requirementId : Number,
  },

  houses : {
    id : Number,
    developer : String,
    address : String,
    building : String,
    deliveryDate : String,
    checkInDate : String,
    type : String,
    decorationCompany : String,
    designer : String,
    requirementId : Number,
  },

  orderLostings : {
    id : Number,
    lostingDate : String,
    reason : String,
    competitorPurchaseReason : String,
    requirementId : Number,
  },

  perchaseIntentions : {
    id : Number,
    roomPlanning : String,
    style : String,
    category : String,
    series : String,
    requirementId : Number,
  },

  requirements : {
    id : Number,
    createDate : Date,
    store : Number,
    primaryUser : Number,
    secondaryUsers : [],
    earnest : Number,
    predictedSale : Number,
    orderSum : Number,
    status : String,
    customerId : Number,
    creater : Number,
  },

  stores : {
    id : Number,
    city : String,
    address : String,
    alliance : String,
  },

  trackInfos : {
    id : Number,
    level : String,
    eventType : String,
    trackMethod : String,
    tractString : String,
    comment : [],
    nextTractTime : String,
    attachment : [],
    orderSum : Number,
    orderSerial : String,
    plannedString : String,
    detail : String,
    requirementId : Number,
  },

  users : {
    id : Number,
    role : String,
    storeId : Number,
  },
};