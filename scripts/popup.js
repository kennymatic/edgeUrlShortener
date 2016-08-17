(function() { 
	var urlInput = document.getElementById("url");	

	try 
	{
		browser.tabs.query({ currentWindow:true, active: true }, function(tabs) { 
			
			urlInput.value = tabs[0].url;

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() { 
				if (xmlhttp.readyState === 4) { 
					if (xmlhttp.status === 200) { 
						var response = JSON.parse(xmlhttp.responseText); 
						urlInput.value = response.id;
						urlInput.setSelectionRange(0, urlInput.value.length); 
						urlInput.focus(); 
					} else { 
						alert("Could not shorten URL, response code: " + xmlhttp.status);
					}
				} 
			}; 

			xmlhttp.open("POST", "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBJv5k2xe31eZkTn-wNwTkZa4_FePIS_k8");
			xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			xmlhttp.send(JSON.stringify({ "longUrl": tabs[0].url}));
		}); 
	} catch (e) { 
		alert("Unexpected error");
	}
	
})(); 