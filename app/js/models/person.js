var Person = Backbone.Model.extend({

  initialize: function() {

    this.head = new Backbone.Model({
      scaleX: 1,
      scaleY: 1
    })

    this.eyes = new Backbone.Model({
      spacing: 0,
      height: 0,
      scale: 1
    })

    this.eyebrows = new Backbone.Model({
      spacing: 0,
      height: 0,
      scale: 1,
      angle: 0
    })

  }

})