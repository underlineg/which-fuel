let myChart = "";

export let setHistogram = async function(obj){
    localStorage.setItem("price-"+obj.date, JSON.stringify({"fuel":obj.fuel, "alchool":obj.alchoolPrice, "gasoline":obj.gasPrice, "date": obj.date}))
}

//gets all entries and order it as blog order posts
export let getHistogram = function(){
    let keys = Object.entries(localStorage)
    .map( x => x[0]  )
    .filter(x=> x.includes('price-'))
    .map( x=> localStorage.getItem(x) )
    return keys;
}

export let plotHistogramChart = async function(data, totalResults){
    let dataPlot = data;
    

    dataPlot = dataPlot.sort( (a, b) =>{
        a = eval("("+a+")")
        b = eval("("+b+")")
        if(a.date > b.date) return 1;
        else if(a.date < b.date) return -1;
    })

    //chart basic definition
    let data2 = {
        labels: [],
        datasets: [
        {
            label: 'Gasolina',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            responsive: true,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
        },
        {
            label: 'Álcool',
            backgroundColor: 'rgb(0, 99, 132)',
            borderColor: 'rgb(0, 99, 132)',
            data: [],
            fill: false,
            responsive: true,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
        }]
    };

    for(var i in dataPlot){
        data2.datasets[0].data.push( JSON.parse(dataPlot[i]).gasoline )
        data2.datasets[1].data.push( JSON.parse(dataPlot[i]).alchool )
        data2.labels.push( new Date(JSON.parse(dataPlot[i]).date).toLocaleString('pt-br', {timeZoneName: "short"}) );
    }

    const config = {
        type: 'line',
        data: data2,
        
    };
    
    myChart = new Chart(
        document.querySelector('#line-chart'),
        config
    );
}

export let updateLineChart = async function(data){
    let dataPlot = data.sort( (a, b) =>{
        a = eval("("+a+")")
        b = eval("("+b+")")
        if(a.date > b.date) return 1;
        else if(a.date < b.date) return -1;
    })

    myChart.data.datasets[0].data.push( JSON.parse(dataPlot[dataPlot.length-1]).gasoline )
    myChart.data.datasets[1].data.push( JSON.parse(dataPlot[dataPlot.length-1]).alchool )
    myChart.data.labels.push( new Date(JSON.parse(dataPlot[dataPlot.length-1]).date).toLocaleString('pt-br', {timeZoneName: "short"}) );
    
    myChart.update();
}

export let plotHistogramTable = async function(data, totalResults){
    //retorna os últimos 5 resultaods por default
    totalResults = totalResults || data.length;
    data = data .sort( (a, b) =>{
        a = eval("("+a+")")
        b = eval("("+b+")")
        if(a.date > b.date) return -1;
        else if(a.date < b.date) return 1;
    })
    if(data.length > 0){
        let html = `<table>
            <tr>
                <td colspan="5"><h4>Histórico de preços anteriores</h4></td>
            </tr>
            <tr>
                <th>Data</th>
                <th>Melhor escolha</th>
                <th>Preço alcool</th>
                <th>Preço gasolina</th>
                <th>Variação</th> 
            </tr>`
        let obj = "";
        for(let i = 0, limI = totalResults; i < limI; i++){
            obj = eval ("(" + data[i] + ")");
            html += "<tr>"
                html += `<td>${new Date(obj.date).toLocaleString('pt-br', {timeZoneName: "short"})}</td>`
                html += `<td>${obj.fuel}</td>`
                html += `<td>R$ ${obj.alchool.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>`
                
                html += `<td>R$ ${obj.gasoline.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>`
                html += `<td>-</td>`
                
                
            html += "</tr>"
        }
        html += "<table>"
        $('.table-user-price-variation').html(html)
    }
}