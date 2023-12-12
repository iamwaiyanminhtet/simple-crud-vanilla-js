const addBtn = document.querySelector('#btn-add');
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

addBtn.addEventListener('click',e => {
    if (songName.value === null || songName.value === '' || songName.value === undefined ) return
    else songName = songName.value;
    if (artist.value === null || artist.value === '' || artist.value === undefined ) return
    else artist = artist.value;
    if (publishDate.value === null || publishDate.value === '' || publishDate.value === undefined ) return
    else publishDate = publishDate.value;

    if (songName,artist,publishDate) {
        let inputArray = [songName,artist,publishDate,'actions'];
        createTr(inputArray);
    }else return;
});

// edit & del keys
actionKeys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        let action = e.target.dataset.action;
        
        if (action === 'edit') {
            console.log('edit btn')
        }

        if (action === 'delete') {
            console.log('delete btn')
        }
    }
})