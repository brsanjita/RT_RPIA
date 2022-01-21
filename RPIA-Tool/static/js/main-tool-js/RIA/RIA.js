// script for RIA datatable    
var resilience_investment_analysis = $('#resilience_investment_analysis').DataTable( {
    paging: false,
    searching: false,
    "sDom": '<"top"><"bottom"><"clear">',
        paging:         false,
        order:          false,
        searching:       false,
        fixedColumns:   {
            heightMatch: 'none'
        },         
    "ajax": {
    "url": "http://127.0.0.1:5000/resilienceinvestmentanalysis",
    "type": "GET",
    "datatype": 'json',    
        },
    columns: [
        { 'data': 'property' },
        { 'data': '_value' },
    ]
} );   

// script for RIA bar chart
        
const categories = [{
    category: [
    { label: "Technology 1" },
    { label: "Technology 2" }
    ]
}];

const dataset = [
{
    seriesname: "Cost",
    data: [
    { value: "0.56" },
    { value: "0.65" }
    ]
},
{
    seriesname: "Percentage change in resiliency",
    data: [
    { value: "0.64" },
    { value: "0.72" }
    
    ]
}];

var chartConfigurations = {
type: "mscolumn2d",
renderAt: "RIA-chart-container",
width: "100%",
height: "255",
dataFormat: "json",
dataSource: {
    chart: {
    theme: "fusion",
    caption: "Cost, Percentage change in resilency",
    xAxisname: "Cost in (M$)",
    yAxisName: "Percentage change in resiliency"
    },
    categories: categories,
    dataset: dataset
}
};
FusionCharts.ready(function() {
var fusioncharts = new fusioncharts(chartConfigurations);
fusioncharts.render();
});
        
// script for resilience-analysis-investment-barchart
// var resilienceanalysisbarchart = document.getElementById('resilience-analysis-investment-barchart').getContext('2d');
var resilienceanalysisbarchart = document.getElementById('investment-analysis-barchart').getContext('2d');
var resilienceinvestmentanalysis_barChart = new Chart(resilienceanalysisbarchart, {
    type: 'bar',
    data: {
        labels: ['Technology-1', 'Technology-2'],
        datasets: [
            {
                label: 'With technology',
                backgroundColor: "red",
                data: [0.704,	0.685],
            },
            {
                label: 'Without technology',
                backgroundColor: "blue",
                data: [0.653, 0.635],
            },
        ]
    },
    options: {
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Percentage change in Resiliency'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: ''
                }
            }],
        }
    }
});
        
// **********************Resilience Investment Analysis Map***********************************                
// var divElement = document.getElementById('viz1627335502229');                    
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