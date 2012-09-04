// Base JS file for the people builder

var People = Backbone.View.extend({

  events: {
    'change #rngHeadHeight': 'changeHeadHeight',
    'change #rngHeadWidth': 'changeHeadWidth',

    'change #rngEyeSpacing': 'changeEyeSpacing',
    'change #rngEyeHeight': 'changeEyeHeight',
    'change #rngEyeSize': 'changeEyeSize',

    'change #rngEyebrowSpacing': 'changeEyebrowSpacing',
    'change #rngEyebrowHeight': 'changeEyebrowHeight',
    'change #rngEyebrowSize': 'changeEyebrowSize',
    'change #rngEyebrowAngle': 'changeEyebrowAngle',

    'change #rngNoseBalance': 'changeNoseBalance',
    'change #rngNoseHeight': 'changeNoseHeight',
    'change #rngNoseSize': 'changeNoseSize',

    'change #rngMouthBalance': 'changeMouthBalance',
    'change #rngMouthHeight': 'changeMouthHeight',
    'change #rngMouthScaleX': 'changeMouthScaleX',
    'change #rngMouthScaleY': 'changeMouthScaleY'
  },

  initialize: function(options) {
    var width = this.width = options.width
    var height = this.height = options.height
    var cWidth = width / 2
    var cHeight = height / 2

    this.r = Raphael('person', width, height)

    this.head = this.r.ellipse(cWidth, cHeight, cWidth*0.6, cHeight*0.9)

    this.r.setStart()
    this.eyeLeft = this.r.ellipse(cWidth*0.75, cHeight*0.9, cWidth*0.1, cHeight*0.05)
    this.eyeRight = this.r.ellipse(cWidth*1.25, cHeight*0.9, cWidth*0.1, cHeight*0.05)
    this.eyes = this.r.setFinish()

    this.r.setStart()
    var browWidth = cWidth*0.2
    this.eyebrowLeft = this.r.rect((cWidth*0.75)-(browWidth/2), cHeight*0.75, browWidth, cHeight*0.05)
    this.eyebrowRight = this.r.rect((cWidth*1.25)-(browWidth/2), cHeight*0.75, browWidth, cHeight*0.05)
    this.eyes = this.r.setFinish()

    var noseWidth = cWidth*0.1
    this.nose = this.r.rect(cWidth-(noseWidth/2), cHeight+(noseWidth/2), noseWidth, noseWidth)

    var mouthWidth = cWidth*0.3
    this.mouth = this.r.ellipse(cWidth, cHeight*1.5, mouthWidth, mouthWidth/5)

    this.model.eyes.on('change', this.updateEyes, this)
    this.model.eyebrows.on('change', this.updateEyebrows, this)
    this.model.nose.on('change', this.updateNose, this)
    this.model.mouth.on('change', this.updateMouth, this)
  },

  changeHeadHeight: function(ev) {
    var val = ev.target.value / 100
    var headScaleX = this.model.head.get('scaleX')
    this.head.transform('s'+headScaleX+','+val)
    this.model.head.set('scaleY', parseFloat(val,10))
    //console.log('S'+headScaleX+','+val)
  },

  changeHeadWidth: function(ev) {
    var val = ev.target.value / 100
    var scaleY = this.model.head.get('scaleY')
    this.head.transform('s'+val+','+scaleY)
    this.model.head.set('scaleX', parseFloat(val,10))
    //console.log('S'+val+','+scaleY)
  },

  changeEyeSpacing: function(ev) {
    var cWidth = this.width / 2
    var val = (ev.target.value / 100) * cWidth
    this.model.eyes.set('spacing', parseFloat(val, 10))
  },

  changeEyeHeight: function(ev) {
    var cHeight = this.height / 2
    var val = (ev.target.value / 100) * cHeight
    this.model.eyes.set('height', parseFloat(val))
  },

  changeEyeSize: function(ev) {
    var val = ev.target.value / 100
    this.model.eyes.set('scale', val)
  },

  updateEyes: function() {
    var spacing = this.model.eyes.get('spacing')
    var height = this.model.eyes.get('height')
    var scale = this.model.eyes.get('scale')
    this.eyeLeft.transform('t'+spacing+','+height+'s'+scale)
    this.eyeRight.transform('t'+(-spacing)+','+height+'s'+scale)
  },

  changeEyebrowSpacing: function(ev) {
    var cWidth = this.width / 2
    var val = (ev.target.value / 100) * cWidth
    this.model.eyebrows.set('spacing', parseFloat(val, 10))
  },

  changeEyebrowHeight: function(ev) {
    var cHeight = this.height / 2
    var val = (ev.target.value / 100) * cHeight
    this.model.eyebrows.set('height', parseFloat(val))
  },

  changeEyebrowSize: function(ev) {
    var val = ev.target.value / 100
    this.model.eyebrows.set('scale', val)
  },

  changeEyebrowAngle: function(ev) {
    var val = ev.target.value
    this.model.eyebrows.set('angle', val)
  },

  updateEyebrows: function() {
    var spacing = this.model.eyebrows.get('spacing')
    var height = this.model.eyebrows.get('height')
    var scale = this.model.eyebrows.get('scale')
    var angle = this.model.eyebrows.get('angle')
    this.eyebrowLeft.transform('t'+spacing+','+height+'s'+scale+'r'+angle)
    this.eyebrowRight.transform('t'+(-spacing)+','+height+'s'+scale+'r'+-angle)
  },


  changeNoseBalance: function(ev) {
    var cWidth = this.width / 2
    var val = (ev.target.value / 100) * cWidth
    this.model.nose.set('balance', val)
  },

  changeNoseHeight: function(ev) {
    var cHeight = this.height / 2
    var val = (ev.target.value / 100) * cHeight
    this.model.nose.set('height', val)
  },

  changeNoseSize: function(ev) {
    var val = ev.target.value / 100
    this.model.nose.set('scale', val)
  },

  updateNose: function() {
    var balance = this.model.nose.get('balance')
    var height = this.model.nose.get('height')
    var scale = this.model.nose.get('scale')
    this.nose.transform('t'+balance+','+height+'s'+scale)
  },


  changeMouthBalance: function(ev) {
    var cWidth = this.width / 2
    var val = (ev.target.value / 100) * cWidth
    this.model.mouth.set('balance', val)
  },

  changeMouthHeight: function(ev) {
    var cHeight = this.height / 2
    var val = (ev.target.value / 100) * cHeight
    this.model.mouth.set('height', val)
  },

  changeMouthScaleX: function(ev) {
    var val = ev.target.value / 100
    this.model.mouth.set('scaleX', val)
  },

  changeMouthScaleY: function(ev) {
    var val = ev.target.value / 100
    this.model.mouth.set('scaleY', val)
  },

  updateMouth: function() {
    var height = this.model.mouth.get('height')
    var balance = this.model.mouth.get('balance')
    var scaleX = this.model.mouth.get('scaleX')
    var scaleY = this.model.mouth.get('scaleY')
    this.mouth.transform('t'+balance+','+height+'s'+scaleX+','+scaleY)
  }

})
