// Base JS file for the people builder

var People = Backbone.View.extend({

  events: {
    'change .rngHeadHeight': 'changeHeadHeight',
    'change #rngHeadWidth': 'changeHeadWidth',
    'change #rngEyeSpacing': 'changeEyeSpacing',
    'change #rngEyeHeight': 'changeEyeHeight',
    'change #rngEyeSize': 'changeEyeSize'
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

    this.model.eyes.on('change', this.updateEyes, this)
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
  }


})
