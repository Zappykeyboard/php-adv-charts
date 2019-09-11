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

      createMontlySalesChart(data.fatturato);
      createSalesByAgentChart(data.fatturato_by_agent); 
     
    },
    error: function(err){

    }
  })
}

function createMontlySalesChart(dataset){

  var element = document.getElementById('monthly-sales').getContext('2d');

  var chart = new Chart(element, {
    type: dataset.type,
    data: {
      labels: moment.months(),
      datasets: [{
        label: 'Vendite mensili',
        backgroundColor: 'rgb(105, 150, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataset.data
      }]
    }
  })

}

function createSalesByAgentChart(dataset){
  var element = document.getElementById('sales-by-agent').getContext('2d');
  var salesPeople = Object.keys(dataset.data);
  var sales = Object.values(dataset.data);

  var chart = new Chart(element, {
    type: dataset.type,
    data: {
      labels: salesPeople,
      datasets: [{
        label: 'Vendite per agente',
        backgroundColor: [
          'rgb(105, 150, 132)',
          'rgb(204, 51, 255)',
          'rgb(102, 255, 102)',
          'rgb(255, 153, 51)'],
        borderColor: 'rgb(255, 99, 132)',
        data: sales
      }]
    }
  })
}