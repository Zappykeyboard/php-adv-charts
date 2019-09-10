function init(){
  getData();
}

$(document).ready(init);

function getData(){

  $.ajax({
    url: 'fulldb.php',
    method: 'GET',
    success: function(data) {
      console.log(data);
    },
    error: function(err){

    }
  })
}