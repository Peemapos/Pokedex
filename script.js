const formEle = document.querySelector('#searchForm')
const inputEle = document.querySelector('input')
const searchBtn = document.querySelector('#searchResult')
const resetBtn = document.querySelector('#resetBtn')
const searchResult = document.querySelector('.Result')
const containerResult = document.querySelector('.containerResult')
const dropdownEle = document.querySelector('#dropDown')

const getDropdown = async () =>{
    const resAll = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        for (const lists of resAll.data.results) {
            const newLink = document.createElement('option')
            newLink.innerText += lists.name
            newLink.setAttribute('value', lists.name)
            dropdownEle.appendChild(newLink)
        }
}
getDropdown()

dropdownEle.addEventListener('change', function (e) {
    searchResult.innerHTML='';
    getPokemonDetails(dropdownEle.value)
})


searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let search = formEle.elements.query.value //ค่าที่พิมพ​์ input ไป
    searchResult.innerHTML='';
    getPokemonDetails(search)

})


const getPokemonDetails = async (search) => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
        renderType(res.data)
        console.log(res);
        inputEle.value=''

    } catch (err) {
        alert("Invalid Name or ID")
        console.log(err);
        inputEle.value=''
    }
}

const renderType = (data) => {
    const num = 0;
    if (data.name) {
        const containEle = document.createElement('div')
        searchResult.appendChild(containEle)
        const imgEle = document.createElement('img')
        imgEle.src = data.sprites.front_default;
        containEle.appendChild(imgEle)
        const divEleName = document.createElement('div')
        divEleName.innerText += data.name
        containEle.appendChild(divEleName)
        for (let item of data.types) {
            const divEleType = document.createElement('div')
            divEleType.innerText += `Type:${item.type.name}`
            containEle.appendChild(divEleType)

    }
}

}
