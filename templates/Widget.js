define([
	'dojo/_base/declare',
	'dijit/_Widget'
], function(declare, _Widget){
	var $$$BASENAME$$$ = declare([_Widget], {
		constructor: function(args){
		},

		postCreate: function(){
			this.inherited(arguments);
		},

		startup: function(){
			if(this.started){ return; }

			this.inherited(arguments);
		}
	});

	return $$$BASENAME$$$;
});
