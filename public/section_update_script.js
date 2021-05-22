function updateSection(id){
    updated_name = document.getElementById("section_name").value;
    updated_desc = document.getElementById("section_desc").value;
    const updatedProduct = {
        id: id,
        name: updated_name,
        desc: updated_desc
    }
    console.log("Trying to PUT", updatedProduct);
    fetch('/sections', {
        method: 'put',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(updatedProduct)
    })
    .then(res => {
        if(res.ok) return res.json();
    })
    .then(response => {
        window.location = "/section_details_page/"+id;
    });
}