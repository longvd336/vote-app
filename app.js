// // npm install , install tat ca cac library can co trong project(khi pull code tu tren github ve chuau co file node_modules)

// import data from "./server.js";
const Chart = require('chart.js');

// const fs = require('fs');
var ctx = document.getElementById('myChart').getContext("2d");
// console.log(ctx)


// const fileData = fs.readFileSync("questions.json", {encoding:"utf-8"});
// const questionList = JSON.parse(fileData);
// var randomQuestion = questionList[data.data];
// console.log(randomQuestion);

let myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Yes', 'No'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth:1
        }]
    },
    options:{
        title:{
            display:true,
            text:'Largest Cities in Masschusets',
            fontSize: 20,
        },
        legend:{
            display: true,
            position:'right',
            labels:{
                fontColor:"#000",
            }
        },
        layout:{
            padding:{
                left:50,
                right:0,
                bottom:0,
                top:0               
            }
        },
        tooltips:{
            enabled:true,
            mode: 'point'
        }
    }
})