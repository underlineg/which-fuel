export let dealInputValue = async function(){
    let fuel1Value = parseFloat(document.querySelector('#alchool').value.replace(',', ".").replace("R$","")), 
    fuel2Value = parseFloat(document.querySelector('#gasoline').value.replace(',', ".").replace("R$",""));

    let objReturn = {
        message:"Tudo certo",
        state: 1
    }

    if( isNaN(fuel1Value) || isNaN(fuel2Value) ) {
        objReturn = {
            message:"Todos os campos devem ser preenchidos!",
            state: 0
        }
    }
    if( fuel1Value === 0 || fuel2Value === 0 ){
        objReturn = {
            message:"Nenhum campo pode ser preenchido com 0!",
            state: 0
        }
    }
    
    return objReturn;
}