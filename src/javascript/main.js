import {dealInputValue} from './dealInputValue.js';
import * as histogram from './histogram.js';

export let init = function(){
    let target = document.querySelector('.btn-calcular')
    let alertTarget = document.querySelector('.alert-user')
    let fuel1Value, fuel2Value, count = "";
    let lim = 0.7;
    let baseAlertHTML = "";
    let wich = "";

    $('.container-text-splashscreen .btn').click((e) =>{
        e.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#main-section').offset().top
        },'slow', 'linear',()=>{
            setTimeout(()=>{
                $('.splashscreen').remove(); 
            }, 1000);
        })
    })

    histogram.plotHistogramTable( histogram.getHistogram() )
    .then( histogram.plotHistogramChart( histogram.getHistogram() )  )

    $('.btn-calcular').click((e)=> {
       e.preventDefault()

       dealInputValue()
        .then( x => {
            if( !x.state ) {
                alert(x.message)
                return false;
            }
            fuel1Value = parseFloat(document.querySelector('#alchool').value.replace(',', ".").replace("R$",""));
            fuel2Value = parseFloat(document.querySelector('#gasoline').value.replace(',', ".").replace("R$",""));
            
            count = fuel1Value / fuel2Value

            baseAlertHTML = ""
            
            if(count <= lim){
                //usar alcool
                baseAlertHTML += `Alcool`
                wich = "Alcool"
                baseAlertHTML += `<ul>
                    <li>Apesar do alcool gastar mais, ele é mais economico nesse momento</li>
                    <li>Diferença de preço de ${Math.round(count*100)/100} %</li>
                </ul>`
            }else{
                //usar gasolina
                baseAlertHTML += `Gasolina`
                wich = "Gasolina"
                baseAlertHTML += `<ul>
                    <li>Apesar da gasolina ser mais cara, seu rendimento é maior, então é a opção mais economica nesse momento</li>
                    <li>Diferença de preço de ${Math.round(count*100)/100} %</li>
                </ul>`
            }

            alertTarget.classList.add('open')
            alertTarget.innerHTML = baseAlertHTML;

            histogram.setHistogram({alchoolPrice:fuel1Value,
                gasPrice:fuel2Value,
                date:Date.now(),
                fuel: wich
            }).then( histogram.plotHistogramTable( histogram.getHistogram() ) )
            .then( histogram.updateLineChart( histogram.getHistogram() ) )
        })
    })
}


init();