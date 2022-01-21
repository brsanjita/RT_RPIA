
// script for threat type datatable        
var threat_type = $('#threat_type').DataTable( {
    "paging": false,    
    "info" : false,
    "sDom":"tipr",   
    "ajax": {
        "url": "http://127.0.0.1:5000/threattype",
        "type": "POST",
        "datatype": 'json',    
        },
    columns: [
        { 'data': 't_property' },
        { 'data': 't_value' },
    ], 
});


//Getting threat details from the API.  
function getThreatInfo() {
        $.ajax({
        url: "http://127.0.0.1:5000/threatinfo",     
        type: 'GET',
        success: function(data){

            // console.log(data)

            // //*************DO NOT DELETE THESE COMMENTED LINES************
            // document.getElementById('threattype').innerHTML = data.data[0].key_val;
            // document.getElementById('daytime').innerHTML = data.data[1].key_val;
            // document.getElementById('threatduration').innerHTML = data.data[2].key_val;
            // document.getElementById('humidity').innerHTML = data.data[3].key_val;
            // document.getElementById('temperature').innerHTML = data.data[4].key_val;
            // document.getElementById('precipitation').innerHTML = data.data[5].key_val;
            // document.getElementById('windspeed').innerHTML = data.data[6].key_val;

            document.getElementById('threattype').innerHTML = "Tsunami" ;
            document.getElementById('daytime').innerHTML = "Friday, October 15, 2021" ;
            document.getElementById('threatduration').innerHTML = "1 hr" ;
            document.getElementById('humidity').innerHTML = "64%" ;
            document.getElementById('temperature').innerHTML = "52 F" ;
            document.getElementById('precipitation').innerHTML = "0.1 In" ;
            document.getElementById('windspeed').innerHTML = "12 m/s NW";
        }    
    });
}
getThreatInfo()

//File upload functioning
var file = document.getElementById('threatinfo');
file.onchange = function(e) {
var ext = this.value.match(/\.([^\.]+)$/)[1];
if (ext != 'csv'){
document.getElementById("threatinfoUpload").disabled = true;
alert("Please select a csv file")
}else{
document.getElementById("threatinfoUpload").disabled = false;}};

// **********************Threat Modeling Map*********************************** 

var divElement = document.getElementById('viz1627662464505');                    
var vizElement = divElement.getElementsByTagName('object')[0];                    
vizElement.style.width='100%';
vizElement.style.height=(divElement.offsetWidth*0.75)+'px';                    
var scriptElement = document.createElement('script');                    
scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
vizElement.parentNode.insertBefore(scriptElement, vizElement);             