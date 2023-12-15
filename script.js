const addBtn = document.querySelector('#btn-add');
const updateBtn = document.querySelector('#btn-update');
const cancelBtn = document.querySelector('#btn-cancel');
const table = document.querySelector('#data-columns');

let actionKeys = document.querySelector('#data-columns');;
let songName = document.querySelector('#song-name');
let artist = document.querySelector('#artist');
let publishDate = document.querySelector('#publish-date');
let currentTr;

// add custom method to Storage obj
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

window.addEventListener('load', function () {
   if(JSON.parse(localStorage.getItem('data'))?.length === 0) {
    // save in localStorage
      let inputArray = ['Northern Attitude','Noah Kahan','2022-11-10','actions'];
      let storageArray = [];
      let trData = convertObj(inputArray[0],inputArray[1],inputArray[2]);
      storageArray.push(trData);
      localStorage.setObj('data',storageArray);
   }

    // after reload, show the stored data to UI if there is
    let tableRows = JSON.parse(localStorage.getItem('data'));
    // create tr for each table row that is stored
    tableRows.forEach(tableRow => {
        let inputArray = [tableRow.song,tableRow.artist,tableRow.publishDate,'actions'];
        createTr(inputArray);
    })

})

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

// convert to obj
function convertObj (song,artist,publishDate) {
    return {
        'song' : song,
        'artist' : artist,
        'publishDate' : publishDate
    }
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

        // check if storage data is there
        let storageArray = JSON.parse(localStorage.getItem('data'));
        if (storageArray === null) storageArray = [];

        // convert to each tr to obj and save all as an array
        let trData = convertObj(inputArray[0],inputArray[1],inputArray[2]);
        storageArray.push(trData);
        localStorage.setObj('data',storageArray);

        // create newTr in UI
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
            currentTr = e.target.parentNode.parentNode;

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
        }

        // delete key
        if (action === 'delete') {
            e.target.parentNode.parentNode.remove();

            // delete from localStorage
            let tableRows = JSON.parse(localStorage.getItem('data'));
            tableRows.forEach(tableRow => {
                // check all fileds equal
                if (
                    tableRow.song == e.target.parentNode.parentNode.firstElementChild.textContent && 
                    tableRow.artist == e.target.parentNode.parentNode.firstElementChild.nextElementSibling.textContent && 
                    tableRow.publishDate == e.target.parentNode.parentNode.lastElementChild.previousElementSibling.textContent
                    ) {
                        // remove specific obj from array data
                        const itemToBeRemoved = tableRow;
                        tableRows.splice(tableRows.findIndex(row => row.song === itemToBeRemoved.song) , 1)
                    }
            })
            localStorage.setObj('data',tableRows);
        }
    }
})

// update btn click
updateBtn.addEventListener('click', (e) => {
    // validation
    if (
        songName.value === null || 
        songName.value === '' || 
        songName.value === undefined && 
        artist.value === null || 
        artist.value === '' || 
        artist.value === undefined && 
        publishDate.value === null || 
        publishDate.value === '' || 
        publishDate.value === undefined ) return;
    else {
        // get update value
        let updateSongNameValue = songName.value;
        let updateArtistValue = artist.value;
        let updatePublishDateValue = publishDate.value;

         // select each td
        let curretSongNameUpdate = currentTr.firstElementChild;
        let currentArtistUpdate = currentTr.firstElementChild.nextElementSibling;
        let currentPublishDateUpdate = currentTr.lastElementChild.previousElementSibling;

        // save updated values to localStorage
        let tableRows = JSON.parse(localStorage.getItem('data'));
        tableRows.forEach(tableRow => {
            if (
                tableRow.song == curretSongNameUpdate.textContent && 
                tableRow.artist == currentArtistUpdate.textContent && 
                tableRow.publishDate == currentPublishDateUpdate.textContent) {
                    tableRow.song = updateSongNameValue;
                    tableRow.artist = updateArtistValue;
                    tableRow.publishDate = updatePublishDateValue;
                }
        })
        localStorage.setObj('data',tableRows);
        // update to each td of current tr
        curretSongNameUpdate.textContent = updateSongNameValue;
        currentArtistUpdate.textContent = updateArtistValue;
        currentPublishDateUpdate.textContent = updatePublishDateValue;
        
        hideUpdateAndCancelBtn(songName,artist,publishDate,clearInputs);
    }
})