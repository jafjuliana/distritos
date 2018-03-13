window.onload = function () {

    var dataDistrito, selectDistrito, nDist;
    selectDistrito = document.getElementById("distritos");

    //Consulta e inclusão dos Distritos
    fetch('http://2013.deolhonasmetas.org.br/api/public/districts')
    .then(response => {
    if (response.ok) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error('Falha ao carregar')); 
    }
    })
    .then(response => response.json())
    .then(data => {
        dataDistrito = data.districts;
        nDist = dataDistrito.length;
        for (var index = 0; index < nDist; index++) {
            selectDistrito.innerHTML += "<option value='" + dataDistrito[index].id +"'>" + dataDistrito[index].name + "</option>";
        }
    })
    .catch(function(error) {
    console.log('Erro encontrado');
    });

};


//Aparição das metas na tela, de acordo com o Distrito selecionado no Select
function changeDistrito() {
    var divGoals, nGoals, dataGoals;
    divGoals = document.getElementById("metas");
    divGoals.innerHTML = "";
    var selectDistrito = document.getElementById("distritos");
    var selectedValue = selectDistrito.options[selectDistrito.selectedIndex].value;
    fetch('http://2013.deolhonasmetas.org.br/api/public/goals?region_id=' + selectedValue)
    .then(response => {
    if (response.ok) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error('Falha ao carregar')); 
    }
    })
    .then(response => response.json())
    .then(data => {
        dataGoals = data.goals;
        nGoals = dataGoals.length;
        if(nGoals > 0){
            divGoals.innerHTML += "<h3 class='title-result'>Resultado da busca: " + nGoals + " metas encontradas<h3>";
            for (var index = 0; index < nGoals; index++) {
                divGoals.innerHTML += "<div class='metas__item'><h3>" + dataGoals[index].name + "</h3><p>" + dataGoals[index].description + "</p></div>";
            }
        }
        else{
            divGoals.innerHTML = "<h3 class='title-result'>Nenhuma meta registrada, realize uma nova consulta</h3>";
        }
    })
    .catch(function(error) {
    console.log('Erro encontrado');
    });
}