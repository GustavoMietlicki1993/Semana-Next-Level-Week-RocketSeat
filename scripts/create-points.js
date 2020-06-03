function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            for(state of states){

            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
            
        } )
}

populateUFs()

function getCityes(event) {
    const citySelect = document.querySelector("select[name=city]");

    const idCityes = event.target.value
    const urlCityes = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idCityes}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>" 
    citySelect.disabled = true

    fetch(urlCityes)
        .then( res => res.json() )
        .then( cityes => {

            for(city of cityes){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            
            citySelect.disabled = false
        } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCityes )