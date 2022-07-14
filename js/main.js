'use strict';

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const GITHUB_USER = 'MLLuisa';
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

const urlKitten1 = "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg";
const urlKitten2 = "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg";
const urlKitten3 = "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg";

//Objetos con cada gatito
const kittenData = [{
        image: urlKitten1,
        name: "Anastacio",
        desc: "Risueño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
        race: "British Shorthair",
    },
    {
        image: urlKitten2,
        name: "Fiona",
        desc: "Dormilon, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
        race: "British Shorthair",
    },
    {
        image: urlKitten3,
        name: "Cielo",
        desc: "Risueño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
        race: "Europea",
    }
];

function renderKitten(kitten) {
    // liElement.classList.add("list");
    const liElement = document.createElement("li");
    liElement.setAttribute('class', 'card');


    const image = document.createElement("img");
    image.setAttribute('class', 'card_img');
    image.setAttribute('src', kitten.image);
    image.setAttribute('alt', 'gatito');
    liElement.appendChild(image);


    const name = document.createElement("h3");
    const nameText = document.createTextNode(kitten.name);
    name.setAttribute('class', 'card_title');
    name.appendChild(nameText);
    liElement.appendChild(name);


    const race = document.createElement("h3");
    const raceText = document.createTextNode(kitten.race);
    race.setAttribute('class', 'card_race');
    race.appendChild(raceText);
    liElement.appendChild(race);

    const desc = document.createElement("p");
    const descText = document.createTextNode(kitten.desc);
    desc.setAttribute('class', 'card_description');
    desc.appendChild(descText);
    liElement.appendChild(desc);

    listElement.appendChild(liElement);

    return liElement;
}



let kittenDataList = [];

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}

function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}

//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMesageError.innerHTML = "";
        }
        const newKittenDataObject = {
            url: newURL,
            name: newName,
            desc: newDescription,
            race: newRace,
        };

        // Nueva petición al servidor

        fetch(`https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newKittenDataObject),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    kittenDataList.push(newKittenDataObject);
                    localStorage.setItem("kittenDataList", JSON.stringify(kittenDataList));
                    renderKittenList(kittenDataList);
                    // No terminado
                    //Completa y/o modifica el código:
                    //Agrega el nuevo gatito al listado
                    //Guarda el listado actualizado en el local stoarge
                    //Visualiza nuevamente el listado de gatitos
                    //Limpia los valores de cada input
                } else {
                    //muestra un mensaje de error.
                }
            });


        kittenDataList.push(newKittenDataObject);
        labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
        renderKittenList(kittenDataList);
    }
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    const raceSearchText = inputRace.value;
    listElement.innerHTML = "";
    const kittenFilterOne = kittenDataList.filter((kitten) => kitten.desc.includes(descrSearchText));
    const kittenFilterTwo = kittenDataList.filter((kitten) => kitten.race.includes(raceSearchText));
    renderKittenList(kittenDataList);
}

// Fetch

// fetch(SERVER_URL, {
//     method: 'GET',
//     headers: {'Content-Type': 'application/json'},
//   }).then(response => response.json()).then(data => {
//     console.log(data.results);
//     kittenDataList = data.results;
//     renderKittenList(kittenDataList);
// });
//Completa el código;

// Local Storage
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

if (kittenListStored) {
    //si existe el listado de gatitos en el local storage
    // vuelve a pintar el listado de gatitos
    renderKittenList(kittenDataList);
} else {
    //sino existe el listado de gatitos en el local storage
    //haz la petición al servidor
    fetch(SERVER_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(data => {
            console.log(data.results);
            kittenDataList = data.results;
            localStorage.setItem("kittenDataList", JSON.stringify(kittenDataList));
            renderKittenList(kittenDataList);
        })
        .catch((error) => {
            console.error(error);
        });
}

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);