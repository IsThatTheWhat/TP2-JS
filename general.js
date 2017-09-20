$(function () {
    $(document).ready(function() {
        document.getElementById('ajout_ligne').addEventListener('click', function (e) {
	        e.preventDefault()
	        console.log('ajout_ligne')

	        // document.getElementById('masse').value = null
	        // document.getElementById('taille').value = null
	    })
    });
});

$(function () {
    $(document).ready(function() {
        document.getElementById('supprime_ligne').addEventListener('click', function (e) {
	        e.preventDefault()
	        console.log('supprime_ligne')
	    })
    });
});

function getClientInformation(id){
	// if (str.length==0){ 
	// 	document.getElementById("txtHint").innerHTML=""; 
	// 	return; 
	// } 
	xmlhttp=new XMLHttpRequest(); 
	xmlhttp.onreadystatechange=function(){   
	if (xmlhttp.readyState==4 && xmlhttp.status==200)  
		console.log(xmlhttp.responseText)     
		//document.getElementById("txtHint").innerHTML = xmlhttp.responseText; 
	} 
	xmlhttp.open("POST","database.php",true); 
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("id="+id);


}