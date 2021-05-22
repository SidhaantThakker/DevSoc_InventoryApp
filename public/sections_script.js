deleteButtons = document.getElementsByClassName('delete-button')

for(let i=0; i<deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click",()=>deleteItem(deleteButtons[i].id))
}

viewButtons = document.getElementsByClassName('view-button')

for(let i=0; i<viewButtons.length; i++){
    viewButtons[i].addEventListener("click",()=>viewItem(viewButtons[i].id))
}


function deleteItem(id){
    console.log("Deleting -" + id);
    fetch('/sections', {
        method: 'delete',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id: id
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })  
    .then(response => {
        window.location.reload()
    })
}

function viewItem(id){
    fetch('/section_details_page/'+id)
}