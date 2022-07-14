export let setHistogram = async function(obj){
    localStorage.setItem("price-"+obj.date, JSON.stringify({"fuel":obj.fuel, "alchool":obj.alchoolPrice, "gasoline":obj.gasPrice, "date": obj.date}))
}

//gets all entries and order it as blog order posts
export let getHistogram = function(){
    let keys = Object.entries(localStorage)
    .map( x => x[0]  )
    .filter(x=> x.includes('price-'))
    .map( x=> localStorage.getItem(x) )
    .sort( (a, b) =>{
        a = eval("("+a+")")
        b = eval("("+b+")")
        if(a.date > b.date) return -1;
        else if(a.date < b.date) return 1;
    })
    return keys;
}

export let plotHistogramGraph = async function(data, totalResults){

}

export let plotHistogramTable = async function(data, totalResults){
    //retorna os últimos 5 resultaods por default
    totalResults = totalResults || data.length;
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