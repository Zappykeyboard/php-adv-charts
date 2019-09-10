function init(){
  moment.locale('it');

  getData();
}

$(document).ready(init);

function getData(){

  $.ajax({
    url: 'fulldb.php',
    method: 'GET',
    success: function(data) {
      console.log(data);

      createMontlySalesChart(data)
    },
    error: function(err){

    }
  })
}

function createMontlySalesChart(data){

  var element = document.getElementById('monthly-sales').getContext('2d');

  var chart = new Chart(element, {
    type:'line',
    data: {
      labels: moment.months(),
      datasets: [{
        label: 'Vendite mensili',
        backgroundColor: 'rgb(105, 150, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data
      }]
    }
  })

}