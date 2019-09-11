function init() {
  moment.locale('it');
  console.log(getRandRGB());

  getData();
}

$(document).ready(init);

function getRandRGB(){
  var red = Math.floor(Math.random() * 256 );
  var green = Math.floor(Math.random() * 256 );
  var blue = Math.floor(Math.random() * 256 );

  return 'rgb('+ red +', ' + green +', ' + blue +')';
}

function getData() {

  $.ajax({
    url: 'fulldb.php',
    method: 'GET',
    data: {'level': 'c-level'},
    success: function (data) {
      console.log(data);
      if(data){
        generateCanvas(data);
      } else {
        $('body').html('Parametro non corretto');
      }
      
    },
    error: function (err) {

    }
  })
}

//astrazione per generare canavas nell'html
function generateCanvas(dataset) {
  //genero template
  var template = Handlebars.compile($("#chart-template").html());
  var container = $(".container");

  //l'array di keys di grafici
  var graphsArr = Object.keys(dataset);

  for (var i = 0; i < graphsArr.length; i++) {

    //el indica il nome del grafico, oltre alla posizione dell'array
    var el = graphsArr[i];

    var context = {
      chart_id: el
    };

    container.append(template(context));

    switch (dataset[el].type) {
      case 'line':
        makeLineChart(dataset[el], el);
        break;
      case 'pie':
        makePieChart(dataset[el], el);
        break;
      default: 
        console.log('tipo di grafico non supportato');
    }


  }

}

//disegno la chart, prende oggetto e ID elemento html
/* function drawGenericChart(dataset, elementID){
  var element = document.getElementById(elementID).getContext('2d');

  var theData = dataset.data;
  var dataKeys = Object.keys(theData);
  var dataValues = Object.values(theData);

  console.log(dataKeys, dataValues);
  

  if (dataKeys.length === 12){
    dataKeys = moment.months();
  } 


  var chart = new Chart(element, {
    type: dataset.type,
    data: {
      labels: dataKeys,
      datasets: [{
        label: elementID,
        backgroundColor: 'rgb(105, 150, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataValues
      }]
    }

  })
}
 */

//funzione generica di grafico a linee
function makeLineChart(dataset, ID) {
  //elemento canvas
  var canvas = $('#' + ID);  
  
  //definisco due comportamenti separati, a seconda sedataset.data contiene un array od un oggetto
  if (Array.isArray(dataset.data)){
    var theData = {}
    var myData = dataset.data;

    theData = {
      label: ID, //il nome del grafico, ricevuto dal database
      backgroundColor: getRandRGB(),
      borderColor : getRandRGB(),
      data : myData
    };

    //creo la chart
    var chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: moment.months(),
        datasets: [theData]
      }
    });



  } else if ($.isPlainObject(dataset.data)){

    //l'array contenente gli oggetti dataset
    var theDatasets = [];
    
    //estraggo le chiavi ed i valori
    var keys = Object.keys(dataset.data);
    var values = Object.values(dataset.data);

    //itero le chiavi
    for (var i = 0; i < keys.length; i++){
      var myData = {
      label: keys[i], //il nome del grafico, ricevuto dal database
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderColor : getRandRGB(),
      data : values[i]
      };

      //aggiungo le opzioni all'array
      theDatasets.push(myData);
    }

    //creo la chart
    var chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: moment.months(),
        datasets: theDatasets
      }
    });
    
  }

}

//funzione generica di grafico a torta
function makePieChart(dataset, ID){

  //elemento canvas
  var canvas = $('#' + ID);

  //estraggo chiavi e volori del dataset come array
  var keys = Object.keys(dataset.data);
  var values = Object.values(dataset.data);

  var bgColorsArr = []

  for (var i = 0; i < keys.length; i++){
    bgColorsArr.push(getRandRGB());
  }

  var chart = new Chart(canvas, {
    type: 'pie',
    data: {
      labels: keys,
      datasets: [{
        label: 'Vendite per agente',
        backgroundColor: bgColorsArr,
        borderColor: 'rgb(255, 99, 132)',
        data: values
      }]
    }
  })
}

