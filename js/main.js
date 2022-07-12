export let init = function(){
    let target = document.querySelector('.btn-calcular')
    let alertTarget = document.querySelector('.alert-user')
    let fuel1Value, fuel2Value, count = "";
    let lim = 0.7;
    let baseAlertHTML = "";
    
    const args = {
        afterFormat(e) { },
        allowNegative: false,
        beforeFormat(e) { },
        negativeSignAfter: false,
        prefix: 'R$',
        suffix: '',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.',
        cursor: 'move'
      };

      // Select the element
      let inputAlchool = SimpleMaskMoney.setMask('#alchool', args);
      let inputGasolina = SimpleMaskMoney.setMask('#gasoline', args);

      // Convert the input value to a number, which you can save e.g. to a database:
      inputAlchool.formatToNumber();
      inputGasolina.formatToNumber();

    
    target.addEventListener("click", (x)=> {
        x.preventDefault()

        fuel1Value = parseFloat(document.querySelector('#alchool').value.replace(',', ".").replace("R$",""));
        fuel2Value = parseFloat(document.querySelector('#gasoline').value.replace(',', ".").replace("R$",""));
        console.log(fuel1Value, fuel2Value)
        count = fuel1Value / fuel2Value

        baseAlertHTML = "É melhor você abastecer com"
        
        if(count <= lim){
            //usar alcool
            baseAlertHTML += ` alcool`
            baseAlertHTML += `<ul>
                <li>Apesar do alcool gastar mais, ele é mais economico nesse momento</li>
                <li>Diferença de preço de ${Math.round(count*100)/100} %</li>
            </ul>`
        }else{
            //usar gasolina
            baseAlertHTML += ` gasolina`
            baseAlertHTML += `<ul>
                <li>Apesar da gasolina ser mais cara, seu rendimento é maior, então é a opção mais economica nesse momento</li>
                <li>Diferença de preço de ${Math.round(count*100)/100} %</li>
            </ul>`
        }

        alertTarget.classList.add('open')
        alertTarget.innerHTML = baseAlertHTML;
        
        
    })
}


init();