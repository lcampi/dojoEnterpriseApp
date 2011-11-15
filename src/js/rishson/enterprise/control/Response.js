dojo.provide('rishson.enterprise.control.Response');

/**
 * @class
 * @name rishson.enterprise.control.Response
 * @description This class is used to wrap any server response.
 */
dojo.declare('rishson.enterprise.control.Response', null, {

    /**
     * @field
     * @name rishson.enterprise.control.Request.isOk
     * @type {boolean}
     * @description is the response OK. This equates to HTTP status code 200.
     */
    isOk : false,

    /**
     * @field
     * @name rishson.enterprise.control.Request.isConflicted
     * @type {boolean}
     * @description is the response indicating a conflicted server state. This equates to HTTP status code 409.
     */
    isConflicted : false,

    /**
     * @field
     * @name rishson.enterprise.control.Request.isInvalid
     * @type {boolean}
     * @description is the response indicating that the request was invalid. This equates to HTTP status code 400.
	 * This is a bit of a judgement call. Technically this should probably be mapped to 403, section 10.4.4 of RFC 2119
	 * states that: "403 Forbidden The server understood the request, but is refusing to fulfill it. Authorization will 
	 * not help and the request SHOULD NOT be repeated. If the request method was not HEAD and the server wishes to make
	 * public why the request has not been fulfilled, it SHOULD describe the reason for the refusal in the entity. 
	 * If the server does not wish to make this	information available to the client, the status code 404 (Not Found)
	 * can be used instead."
	 * However, convention (O'Reiley RESTful Web Services) tends to map invalid to 400 (BAD REQUEST) rather than 403.     
	 */
    isInvalid : false,

    /**
     * @field
     * @name rishson.enterprise.control.Request.isUnauthorised
     * @type {boolean}
     * @description is the response indicating that the request was not authorised. This equates to HTTP status code 403.
	 */
    isUnauthorised : false,

   /**
     * @field
     * @name rishson.enterprise.control.Request.payload
     * @type {object}
     * @description the contents of the server response.
     */
    payload : null,


    /**
     * @constructor
     * @param {Object} params the server response
	 * @param {booelan} wasRestRequest was the server request a REST request
     */
    constructor : function (response, wasRestRequest) {

        //@todo remove {}&& prefix if added - should we be allowing comment-filtered anymore or is it an antipattern?
		if(wasRestRequest) {
			this._createFromRestResponse(response);    
		}
		else {
			//service responses should not have a blank payload
		    if(! response.payload) {
    			console.error('Invalid server response. No payload.');
            	throw('Invalid server response. No payload.');
        	}
			dojo.mixin(this, response);
		}
	},

	_createFromRestResponse : function(response) {
		
		switch(response.ioArgs.statusCode) {
			case 200:
				this.isOk = true;
				break;
			case 400:
				this.isInvalid = true;
				break;
			case 403:
				this.isUnauthorised = true;
				break;		
			case 409:
				this.isConflicted = true;
				break;
		}
		this.payload = response.payload;		
	}
 
});