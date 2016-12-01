// JavaScript Document

(function($){
	
	$.fn.selectplus = function(settings){

		var config = {
			class : '',
			classhover : '',
			textButton : '',
			open: function() {
				
			},
			dialogbox : "<div id='dialogbox-selectplus'></div>",
			popsize: {'width':700,'height':480},
			label : 'Description',
			field : '',
			action : '',
			urlform : '',
			data : '',
			success : '',
			css : '',
			altButton : '',
			invocation : 'click'

		};
		

		// variaveis do objeto
		var select = ''; // carrega o valor do input que estiver com erro
		
		// pega as propriedades da função e transfere para o objeto
		if (settings){$.extend(config, settings);}

		this.filter( "select,input" ).each(function() {
			select = $( this );
			select.parent().css('position','relative');

			select.parent().on( config.invocation , function(){

				if( !select.attr('opened') ){
					showAdd( select );
				}else{
					hideAdd( select );
				}				
			});

        });

		var showAdd = function( elem ){

			var plus_html = "";
				plus_html += "<div class='plus-sel'>";
					plus_html += config.textButton;
				plus_html += "</div>";

			var pos = elem.position();	
			var style = { 	'position' 	 : 'absolute',
							'top'		 : (pos.top) +'px',
							'cursor'	 : 'pointer',
							'z-index'	 : 1000,
							'left'		 : elem.parent().outerWidth(),
							'word-wrap'	 : 'break-word',
							'width'	 	 : '100px',
							'height'  	 : elem.height()  }
			if( config.css ){
				for (var attrname in config.css){
					style[attrname] = config.css[attrname];
				}
			}
			

	    	elem.attr('opened',true);
			elem.parent().find('.plus-sel').remove();
			elem.after( plus_html );
			elem.parent().find('.plus-sel').css( style );

			if( config.altButton ) elem.parent().find('.plus-sel').attr('title', config.altButton );

			elem.parent().find('.plus-sel').mousedown(function(){
				hideAdd( select );	
				if( config.url){
					$.ajax({
						url : config.url,
						success : function( hmtl ){
							$('#dialogbox-selectplus').remove();
							$('body').prepend( config.dialogbox );
							$('#dialogbox-selectplus').html( html )
							DoExpandDiv("dialogbox-selectplus", config.popsize.width, config.popsize.height);
							config.open();
						}
					})
				}else{
					
					var prompt_ = prompt( config.label );
					if( prompt_ ){
						$.ajax({
							url : config.action,
							dataType : 'JSON',
							data : config.data+"&"+config.field+"="+prompt_,
							type : 'POST',
							success : function( ret ){
								if( config.success ){
									config.success(ret);
								}else{
									if( ret.message ){
										alert( ret.message )
									}
									if( ret.success ){
										if( ret.data ){
											elem.append( "<option value='"+ret.data.value+"' selected='selected' >"+ret.data.text+"</option>" )
										}
									}
								}
								
							}
						})	
					}else{
						if( prompt_ !== null ){
							alert( ' "'+config.label+'" esta vazio(a)! ' );	
						}
						
					}
				}
				$('#dialogbox-selectplus').remove();				
			})

			elem.blur( function(){
				hideAdd( select );				
			});

	    }
			
	    var hideAdd = function( elem ){
			elem.removeAttr('opened');
			var addelem = elem.parent().find('.plus-sel')
			addelem.hide();
	    }

        return this;
		
	}

	

})(jQuery);