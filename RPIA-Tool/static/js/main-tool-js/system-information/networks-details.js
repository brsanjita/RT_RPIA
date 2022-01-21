//Updating Circuit breaker table
// var cbdetails = $('#cbdetails').DataTable( {
//     paging: true,
//     "sDom":"tipr",
//     pageLength : 3,
//     "ajax": {
//         "url": "http://127.0.0.1:5000/cbdetails",
//         "type": "GET",
//         "datatype": 'json',
//     },
//     columns: [
//         { 'data': 'cb_id' },
//         { 'data': 'cb_loc' },
//         { 'data': 'cb_status'}
//     ], 
// } );

$(document).ready(function() {

    var columnDefs = [
        {
          data: "cb_id",
          title: "CB ID",
        //   type: "readonly"
        },
        {
          data: "cb_loc",
          title: "Location"
        },
       {
          data: "cb_status",
          title: "Status"
        }
    ];
  
    var cbdetails;
  
    var url_ws_mock_get = '../RPIA-Tool/static/js/main-tool-js/system-information/cbdetails_load.json';
    var url_ws_mock_ok = '../RPIA-Tool/static/js/main-tool-js/system-information/cbdetails_ok.json';
    if (location.href.startsWith("file://")) {
      // local URL's are not allowed
      url_ws_mock_get = 'https://github.com/SGDRIL-WSU/Sanjita/blob/main/cbdetails_load.json';
      url_ws_mock_ok = 'https://github.com/SGDRIL-WSU/Sanjita/blob/main/cbdetails_ok.json';
    }
    
    myTable = $('#cbdetails').DataTable({
      "sPaginationType": "full_numbers",
      ajax: {
          url : "http://127.0.0.1:5000/cbdetails",
          // our data is an array of objects, in the root node instead of /data node, so we need 'dataSrc' parameter
        //   dataSrc : ''
      },
      columns: columnDefs,
      dom: 'Bfrtip',        // Needs button container
      select: 'single',
      responsive: true,
      altEditor: true,     // Enable altEditor
      buttons: [
          {
              text: 'Add',
              name: 'add'        // do not change name
          },
          {
              extend: 'selected', // Bind to Selected row
              text: 'Edit',
              name: 'edit'        // do not change name
          },
          {
              extend: 'selected', // Bind to Selected row
              text: 'Delete',
              name: 'delete'      // do not change name
          },
          {
              text: 'Refresh',
              name: 'refresh'      // do not change name
          }
      ],
      onAddRow: function(datatable, rowdata, success, error) {
          $.ajax({
              // a tipycal url would be / with type='PUT'
              url: "http://127.0.0.1:5000/cbdetails",
              type: 'GET',
              data: rowdata,
              success: success,
              error: error
          });
      },
      onDeleteRow: function(datatable, rowdata, success, error) {
          $.ajax({
              // a tipycal url would be /{id} with type='DELETE'
              url: "http://127.0.0.1:5000/cbdetails",
              type: 'GET',
              data: rowdata,
              success: success,
              error: error
          });
      },
      onEditRow: function(datatable, rowdata, success, error) {
          $.ajax({
              // a tipycal url would be /{id} with type='POST'
              url: "http://127.0.0.1:5000/cbdetails",
              type: 'GET',
              data: rowdata,
              success: success,
              error: error
          });
      }
    });
}); 

//Updating Transformer table
var transformerTable = $('#transformerTable').DataTable( {
    paging: true,
    "sDom":"tipr",
    pageLength : 3,
    "ajax": {
        "url": "http://127.0.0.1:5000/transdetails",
        "type": "GET",
        "datatype": 'json',
    },
    columns: [
        { 'data': 'trans_id' },
        { 'data': 'trans_rating' },
        { 'data': 'trans_loc'},
        { 'data': 'trans_op_condition'}
    ], 
} );

//Updating Substation Table
var substationTable = $('#subtable').DataTable( {
    paging: true,
    "sDom":"tipr",
    pageLength : 5,
    "ajax": {
        "url": "http://127.0.0.1:5000/subdetails",
        "type": "GET",
        "datatype": 'json',
    },
    columns: [
        { 'data': 'sub_id' },
        { 'data': 'sub_loc' },
        { 'data': 'sub_out_feed'},
        { 'data': 'sub_remarks'}
    ], 
} );


//******************Network Details Map*************************** */
var nodes_map = L.map('nodes_map').setView([60.53972879, -145.7344047], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(nodes_map);

$("a[href='#netdetails']").on('shown.bs.tab', function (e) {
    nodes_map.invalidateSize();
});


//File upload functionality 

//Cb Details
var file = document.getElementById('cbdetailsinput');
file.onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  if (ext != 'csv'){
    document.getElementById("cbdetailsUpload").disabled = true;
    alert("Please select a csv file")
  }else{
    document.getElementById("cbdetailsUpload").disabled = false;}};

//Transformer
var file = document.getElementById('transformerdetails');
file.onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  if (ext != 'csv'){
    document.getElementById("transformerUpload").disabled = true;
    alert("Please select a csv file")
  }else{
    document.getElementById("transformerUpload").disabled = false;}};