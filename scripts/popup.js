(function() { 
	var urlInput = document.getElementById("url");	

	try 
	{
		browser.tabs.query({ currentWindow:true, active: true }, function(tabs) { 
			
			urlInput.value = tabs[0].url;
			var dest = "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBJv5k2xe31eZkTn-wNwTkZa4_FePIS_k8";
			var url = tabs[0].url;
			var data = { "longUrl": url };
			$.ajax({
				type:'POST', 
				dataType: 'json', 
        		contentType: 'application/json',
				url: dest, 
				data: JSON.stringify(data), 
				success: function success(data) { 
					urlInput.value = data.id;
					urlInput.setSelectionRange(0, urlInput.value.length); 
					urlInput.focus();  
					
				}, 
				error:function err(x,s,e) { 
					
					if (x.readyState === 4 && x.status === 400) { 
						var error = JSON.parse(x.responseText); 
						var msgs = '';
						error.error.errors.forEach(function(err) { 
							msgs+= err.message;
						}); 
						//console.log(msgs); 
						urlInput.value = msgs; 
					} else { 
						//console.log(x.responseText + ', ' + s); 
						urlInput.value = x.status + ', ' + s; 
					}
				} 
			});

			
		}); 
	} catch (e) { 
		urlInput.value = e; 
	}
	
})(); 