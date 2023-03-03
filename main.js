const loadAllData = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.data.tools))
}

// showing all data in a cards
const showData = (allData) => {
    const cardsContainer = document.getElementById('cards')
    
    allData.forEach((data) => {
        const div = document.createElement('div');
        const {name, description, image, features, published_in} = data;
        div.innerHTML = `
        <div class="">
        <div class=" card mx-auto w-full" style=" ">
            <img class="m-3 rounded"
                src="${image}" alt="" style="height: 150px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <div class="">
                    <ol id="list" class="text-muted">
                    ${listItems(features)}
                    </ol>
                    <hr>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="">
                            <h5>${name}</h5>
                            <p class="mb-0 text-muted"><i class="bi bi-calendar3"></i> ${published_in}</p>
                        </div>
                        <button class="rounded-circle bg-danger-subtle border-0"
                            style="height: 45px; width: 45px;"><i
                                class="bi bi-arrow-right fw-bold text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        // console.log(data)
        cardsContainer.appendChild(div)
    })
}

// show list items
const listItems = lists => {
    let loopList = ''
    for(let i = 0; i < lists.length; i++){
        loopList += `<li>${lists[i]}</li>`
    }
    return loopList;
}

loadAllData()
