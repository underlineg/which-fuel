export let dealInputValue=async function(){let e=parseFloat(document.querySelector("#alchool").value.replace(",",".").replace("R$","")),a=parseFloat(document.querySelector("#gasoline").value.replace(",",".").replace("R$","")),o={message:"Tudo certo",state:1};return(isNaN(e)||isNaN(a))&&(o={message:"Todos os campos devem ser preenchidos!",state:0}),0!==e&&0!==a||(o={message:"Nenhum campo pode ser preenchido com 0!",state:0}),o};
//# sourceMappingURL=../maps/dealInputValue.js.map
