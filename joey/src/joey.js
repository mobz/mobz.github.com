(function() {

	var global = this;
	
	function lower( name ) {
		return name.replace(/^[A-Z]/, function(a) { return a.toLowerCase(); });
	}

	function addAttr( el, attr, value, context ) {
		if( attr === 'text' ) {
			el.appendChild( context.createTextNode( value ) );
		} else if( attr === 'children' ) {
			for( var i = 0; i < value.length; i++) {
				var newNode = createNode( value[i], el, context );
				if( newNode ) {
					el.appendChild( newNode );
				}
			}
		} else if( attr === 'style' || attr === 'dataset' ) {
			for( var prop in value ) {
				el[ attr ][ prop ] = value[ prop ];
			}
		} else if( attr.indexOf("on") === 0 && ( typeof value === 'function' ) ) {
			el.addEventListener( lower( attr.substr(2) ), value, false );
		} else {
			el[ attr ] = value;
		}
	}

	function createNode( obj, parent, context ) {
		var el, attr;
		if( obj == null ) {
			el = undefined;
		} else if( typeof obj === 'string' ) {
			el = context.createTextNode( obj );
		} else if( obj.nodeType === 1 ) {
			el = obj;
		} else {
			el = context.createElement( obj.tag || 'DIV' );
			for( attr in obj ) {
				addAttr( el, attr, obj[ attr ], context );
			}
		}
		if( parent ) {
			parent.appendChild( el );
		}
		return el;
	};

	global.joey = function joey(elementDef, parentNode) {
		return createNode( elementDef, parentNode, (parentNode && parentNode.ownerDocument) || global.document );
	};

}());

