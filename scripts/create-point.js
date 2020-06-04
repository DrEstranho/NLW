function populateUFs() {    
    const ufSelect = document.querySelector("select[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then(states => { 

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities) 

//Itens de coleta
//pega todos os LI
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selecteditems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selecteditems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    // se já tive selecionado, tirar da seleção
    if(alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selecteditems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selecteditems = filteredItems
    } else {
    // se ja estiver selecionado
    // adicionar á seleção
        selecteditems.push(itemId)
    }

    console.log(selecteditems)
    // Atualizar o campo escondido com os itens selecioandos
    collectedItems.value = selecteditems
    
}