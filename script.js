const addBtn = document.querySelector('#btn-add');
const updateBtn = document.querySelector('#btn-update');
const cancelBtn = document.querySelector('#btn-cancel');
const table = document.querySelector('#data-columns');

let actionKeys = document.querySelector('#data-columns');;
let songName = document.querySelector('#song-name');
let artist = document.querySelector('#artist');
let publishDate = document.querySelector('#publish-date');

// create new tr
function createTr (inputArray) {
    let tr = document.createElement('tr');
    for(let i=0; i < 4; i++) {
        // create td for given amount of time
        let td = document.createElement('td');

        // if it's for actions column
        if(inputArray[i] === 'actions') {
            
            // create edit btn
            let editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('btn');
            editBtn.classList.add('btn-edit');
            editBtn.dataset.action = 'edit';

            // create delete btn
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Del';
            deleteBtn.classList.add('btn');
            deleteBtn.classList.add('btn-delete');
            deleteBtn.dataset.action = 'delete';

            // append buttons
            td.append(editBtn,deleteBtn);
        }else td.textContent = inputArray[i];
        
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

// clear inputs
function clearInputs(...inputs) {
    inputs.forEach(input => input.value = '');
}

// hide update and cancel btns
function hideUpdateAndCancelBtn (songName,artist,publishDate,clearInputs) {
    addBtn.classList.remove('hidden');
    updateBtn.classList.add('hidden');
    cancelBtn.classList.add('hidden');
    clearInputs(songName,artist,publishDate);
}

addBtn.addEventListener('click',(e) => {
    let inputSongName,inputArtist,inputPublishDate;
    
    // validation
    if (songName.value === null || songName.value === '' || songName.value === undefined ) return
    else inputSongName = songName.value;
    if (artist.value === null || artist.value === '' || artist.value === undefined ) return
    else inputArtist = artist.value;
    if (publishDate.value === null || publishDate.value === '' || publishDate.value === undefined ) return
    else inputPublishDate = publishDate.value;

    // if user has inputs
    if (inputSongName,inputArtist,inputPublishDate) {
        let inputArray = [inputSongName,inputArtist,inputPublishDate,'actions'];
        createTr(inputArray);
        clearInputs(songName,artist,publishDate); 
    }else return;
});

// edit & del keys
actionKeys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        let action = e.target.dataset.action;
        
        // edit key
        if (action === 'edit') {
            // show update btn
            addBtn.classList.add('hidden');
            updateBtn.classList.remove('hidden');
            cancelBtn.classList.remove('hidden');

            // when cancel btn click show back add btn
            cancelBtn.addEventListener('click',(e) => {
                hideUpdateAndCancelBtn(songName,artist,publishDate,clearInputs);
            })

            // select current tr
            let currentTr = e.target.parentNode.parentNode;

            // select each td
            let curretSongName = currentTr.firstElementChild;
            let currentArtist = currentTr.firstElementChild.nextElementSibling;
            let currentPublishDate = currentTr.lastElementChild.previousElementSibling;

            // get actual value of td
            let curretSongNameValue = curretSongName.textContent; 
            let currentArtistValue = currentArtist.textContent;
            let currentPublishDateValue = currentPublishDate.textContent;

            // set value to input fields
            songName.value = curretSongNameValue;
            artist.value = currentArtistValue;
            publishDate.value = new Date(currentPublishDateValue).toLocaleDateString('en-CA');

            updateBtn.addEventListener('click', (e) => {
                // validation
                if (songName.value === null || songName.value === '' || songName.value === undefined && artist.value === null || artist.value === '' || artist.value === undefined  && publishDate.value === null || publishDate.value === '' || publishDate.value === undefined ) return;
                else {
                    // get update value
                    let updateSongNameValue = songName.value;
                    let updateArtistValue = artist.value;
                    let updatePublishDateValue = publishDate.value;

                    // update to each td of current tr
                    curretSongName.textContent = updateSongNameValue;
                    currentArtist.textContent = updateArtistValue;
                    currentPublishDate.textContent = updatePublishDateValue;
                    
                    hideUpdateAndCancelBtn(songName,artist,publishDate,clearInputs);
                }
            })
            
        }

        // delete key
        if (action === 'delete') {
            e.target.parentNode.parentNode.remove();
        }
    }
})