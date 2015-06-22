module.exports = {

  customers : {
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
    userId : { type: Number, ref: 'users' },
    start : String,
    end : String,
    isEffective : Boolean,
  },

  deliveryIntentions : {
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
    requirementId : { type: Number, ref: 'requirements' },
  },

  houses : {
    developer : String,
    address : String,
    building : String,
    deliveryDate : Date,
    checkInDate : Date,
    type : String,
    decorationCompany : String,
    designer : String,
    requirementId : { type: Number, ref: 'requirements' },
  },

  orderLostings : {
    lostingDate : Date,
    reason : String,
    competitorPurchaseReason : String,
    requirementId : { type: Number, ref: 'requirements' },
  },

  perchaseIntentions : {
    roomPlanning : String,
    style : String,
    category : String,
    series : String,
    requirementId : { type: Number, ref: 'requirements' },
  },

  requirements : {
    level : String,
    createDate : Date,
    store : { type: Number, ref: 'stores' },
    primaryUser : { type: Number, ref: 'users' },
    secondaryUsers : [],
    earnest : Number,
    predictedSale : Number,
    orderSum : Number,
    status : String,
    customerId : { type: Number, ref: 'customers' },
    creater : { type: Number, ref: 'users' },
  },

  stores : {
    city : String,
    address : String,
    alliance : String,
  },

  trackInfos : {
    level : String,
    eventType : String,
    trackMethod : String,
    tractString : String,
    comment : [],
    nextTractTime : Date,
    attachment : [],
    orderSum : Number,
    orderSerial : String,
    plannedString : String,
    detail : String,
    requirementId : { type: Number, ref: 'requirements' },
  },

  users : {
    name : String,
    role : String,
    storeId : { type: Number, ref: 'stores' },
  },
  
};