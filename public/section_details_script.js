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
        window.location = "/sections_page";
    });
}

function viewProduct(id){
    window.location = "/product_details_page/"+id;
}
