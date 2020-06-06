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
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            
            citySelect.disabled = false
        } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCityes )



// Itens de coleta
//Pegar todos os li´s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for ( item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem (event) {
    const itemLi = event.target


    // Adicionar ou remover com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id




    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadSelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId // Isso ira retornar valor booleano
        return itemFound
    })

    //Se ja estiver selecionado, tirar da seleção
    if (alreadSelected >=0 ){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{

    //Se não estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)

    }

    console.log(selectedItems)

    

    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}