// script for resilience analysis datatable case-1
var resilience_analysis_casea = $('#resilience_analysis_casea').DataTable( {
    // "sDom":"tipr",
    "sDom": '<"top"><"bottom"><"clear">',
        paging:         false,
        order:          false,
        searching:       false,
        fixedColumns:   {
            heightMatch: 'none'
        },          
    "ajax": {
    "url": "http://127.0.0.1:5000/resilienceanalysiscasea",
    "type": "GET",
    "datatype": 'json',    
        },
    columns: [
        { 'data': 'property' },
        { 'data': '_value' },
    ], 
} );    
       
// **********************Resilience Analysis Case-1 Map***********************************                            
// var divElement = document.getElementById('viz1627662464506');                    
// var vizElement = divElement.getElementsByTagName('object')[0];                    
// vizElement.style.width='100%';
// vizElement.style.height=(divElement.offsetWidth*0.75)+'px';                    
// var scriptElement = document.createElement('script');                    
// scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
// vizElement.parentNode.insertBefore(scriptElement, vizElement);                
       

var planning_pre_map = L.map('planning-pre-map').setView([60.53972879, -145.7344047], 12);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 30,
        //id: 'mapbox/streets-v11',
        id: 'mapbox/streets-v11',
        accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
    }).addTo(planning_pre_map);

$("a[href='#resilience-analysis']").on('shown.bs.tab', function (e) {
planning_pre_map.invalidateSize();
});

function preEventPlanningGetEdges() {
    //Ajax call
        $.ajax({url: "http://127.0.0.1:5000/duringeventedges", 
        success: function(data){
            console.log(data);
            
            for(let i=0; i<data.links.length; i++){
                
                if (data.links[i].link_status == 1){
                    var edges = L.polyline(
                        [
                            [data.links[i].from_node_lat, data.links[i].from_node_long], 
                            [data.links[i].to_node_lat, data.links[i].to_node_long]
                        ], 
                        {color: 'black' }
                        ).addTo(planning_pre_map);
                    }
                
                
                if (data.links[i].link_status == 2){
                    var edges = L.polyline(
                        [
                            [data.links[i].from_node_lat, data.links[i].from_node_long], 
                            [data.links[i].to_node_lat, data.links[i].to_node_long]
                        ], 
                        {dashArray: "10 10", color: 'black' }
                        ).addTo(planning_pre_map);
                    }
                
                    if (data.links[i].link_status == 3){
                        var edges = L.polyline(
                            [
                                [data.links[i].from_node_lat, data.links[i].from_node_long], 
                                [data.links[i].to_node_lat, data.links[i].to_node_long]
                            ], 
                            {color: 'red' }
                            ).addTo(planning_pre_map);
                        }

                }

        }    
    });
}
preEventPlanningGetEdges();