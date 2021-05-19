function deleteItem(id){
    console.log("Deleting -" + id);
    fetch('/employees', {
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
        window.location = "/employees_page";
    });
}
