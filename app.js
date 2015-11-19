var Item = Backbone.Model.extend({

           initialize: function() {

                console.log('Flickr is the answer')
           } 
})

var ItemsCollection = Backbone.Collection.extend({
    model: Item
})

var ItemView = Backbone.View.extend({

    className: "list_item",

    tmpl: "#item",

    render: function() {

            var tmpl = _.template($(this.tmpl).html());

            this.$el.html(tmpl(this.model.toJSON()));

            return this;
    } 
})

var ItemsView = Backbone.View.extend({

    initialize: function() {
 
    },

    className: '',

    render: function() {

            this.collection.each( function( item ){

                 var itemView = new ItemView({model: item})   

                 this.$el.append(itemView.render().el)

            }, this)  

            return this
    } 
})


var controller = {

    fetch: function(params, callback){        

	// add base params
	params.api_key = 'f7419c7c353a4812a53523af90e255df';

	params.format = 'json';
	
	$.ajax({

	    url: 'http://api.flickr.com/services/feeds/photos_public.gne?id=23455178@N06',

	    type: 'GET',

	    dataType: 'jsonp',

	    data: params,

	    jsonp: 'jsoncallback',

	    success: function(data){

                   var myCollection = new ItemsCollection(data.items) 

                   var itemsView = new ItemsView({collection: myCollection})

                   $("#photos").append(itemsView.render().el);  
	    },	    
	    error: function() {

		callback();		
	    }
	});
    }
};

controller.fetch({})
