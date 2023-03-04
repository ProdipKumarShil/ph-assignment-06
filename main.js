const loadAllData = (items) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => showData((data.data.tools).slice(0, items)))
}
function sorting(data) {

    data.sort(function (a, b) {
        if ((new Date(a.published_in)) < (new Date(b.published_in))
        ) return -1
    })
    console.log(data)

    const cardsContainer = document.getElementById('cards')
    cardsContainer.innerHTML = ''

    data.forEach((data) => {
        // adding spinner
        const spinnerContainer = document.getElementById('spinner')
        if (data.length) {
            spinnerContainer.classList.remove('d-none')
        }
        else {
            spinnerContainer.classList.add('d-none')
        }

        const div = document.createElement('div');
        const { name, id, image, features, published_in } = data;
        div.innerHTML = `
        <div class=" card mx-auto w-full h-100" >
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
                        <button onclick="openModal('${id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="rounded-circle bg-danger-subtle border-0"
                            style="height: 45px; width: 45px;"><i
                                class="bi bi-arrow-right fw-bold text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `
        // console.log(features)
        cardsContainer.appendChild(div)
    })

}
// showing all data in a cards
const showData = (allData) => {
    // allData.forEach((data) => {
    //     console.log(data.published_in)
    // })

    document.getElementById('sort').addEventListener('click', () => {
        sorting(allData)
    })

    // allData.sort(function(a, b) {
    //     if((new Date(a.published_in)) < (new Date(b.published_in))
    //     ) return -1
    // })

    const cardsContainer = document.getElementById('cards')
    cardsContainer.innerHTML = ''

    allData.forEach((data) => {
        // adding spinner
        const spinnerContainer = document.getElementById('spinner')
        if (data.length) {
            spinnerContainer.classList.remove('d-none')
        }
        else {
            spinnerContainer.classList.add('d-none')
        }

        const div = document.createElement('div');
        const { name, id, image, features, published_in } = data;
        div.innerHTML = `
        <div class=" card mx-auto w-full h-100" >
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
                        <button onclick="openModal('${id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="rounded-circle bg-danger-subtle border-0"
                            style="height: 45px; width: 45px;"><i
                                class="bi bi-arrow-right fw-bold text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `
        // console.log(features)
        cardsContainer.appendChild(div)
    })
}

// show list items
const listItems = lists => {
    let loopList = ''
    for (let i = 0; i < lists.length; i++) {
        loopList += `<li>${lists[i]}</li>`
    }
    return loopList;
}
// show featureList items
const featureListItems = lists => {
    const itmLength = Object.keys(lists).length
    let loopList = ''
    for (let i = 1; i <= itmLength; i++) {
        loopList += `<li>${lists[i].feature_name}</li>`
    }
    return loopList;
}
// ${accuracyFunc(data.accuracy.score)}
// accuracy function
const accuracyFunc = score => {
    const accu = document.getElementById('accuracy')

    console.log(accu)
    if (score) {
        accu.classList.add('p-1')
        accu.innerText = (score * 100) + '% accuracy'
    }
    else {
        accu.innerText = ''
    }
}

// open modal
const openModal = idNum => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${idNum}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDataInModal(data.data))
}

// show data in modal
const showDataInModal = data => {
    const { description } = data
    const card1 = document.getElementById('card-1')
    card1.innerHTML = ''
    card1.innerHTML += `
    <div class="p-4 pt-0 pr-0 ">
        <div class="card bg-danger-subtle border-danger h-100">
            <div class="card-body">
                <h5 class="card-title text-justify ">${description}</h5>
                <div class="row row-cols-2 row-cols-md-3 text-center justify-content-center g-2">
                    <div class=" ">
                        <p class="text-center fw-semibold bg-light p-2 rounded m-0 text-success">
                        <span>${data.pricing ? data.pricing[0].price : 'No cost <br> Free'}</span><br><span>${data.pricing ? data.pricing[0].plan : ''}</span></p>
                    </div>
                    <div class=" ">
                        <p class="text-center fw-semibold bg-light p-2 rounded m-0 text-warning">
                        <span>${data.pricing ? data.pricing[1].price : 'No cost <br> Free'}</span><br><span>${data.pricing ? data.pricing[0].plan : ''}</span>
                    </div>
                    <div class=" ">
                        <p class="text-center fw-semibold bg-light p-2 rounded m-0 text-danger">
                        <span>${data.pricing ? data.pricing[2].price : 'No cost <br> Free'}</span><br><span>${data.pricing ? data.pricing[0].plan : ''}</span>
                    </div>
                </div>
                <div class="row row-cols-2 mt-3">
                    <div class="">
                        <h5>Features</h5>
                        <ul class="font-size-small">
                            ${featureListItems(data.features)}
                        </ul>
                    </div>
                    <div class="">
                        <h5>Integrations</h5>
                        <ul class="font-size-small">
                            ${data.integrations ? listItems(data.integrations) : 'Warning: no data found'}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="p-4 pt-0 pl-0">
        <div class="card h-100">
            <div class="position-relative">
            <p id="accuracy" class="accuracy-content fw-bold  rounded bg-danger text-light position-absolute"></p>
                <img class="img-fluid p-3 rounded"0
                src="${data.image_link[0]}"
                alt="...">
            </div>
            <div class="card-body text-center">
                <h5>${data.input_output_examples ? data.input_output_examples[0].input : 'Warning: No data found'}</h5>
                <p class="card-text">${data.input_output_examples ? data.input_output_examples[0].output : 'Warning: no data found'}</p>
            </div>
        </div>
    </div>
    `
    accuracyFunc(data.accuracy.score)

}

loadAllData(items = 6)

// show more button 
document.getElementById('btn-show-all').addEventListener('click', (event) => {
    event.target.style.display = 'none'
    loadAllData()
})
