function updateProduct(id){
    updated_name = document.getElementById("product_name").value;
    updated_cost = document.getElementById("product_cost").value;
    updated_sect = document.getElementById("product_sect").value;
    const updatedProduct = {
        id: id,
        name: updated_name,
        cost: updated_cost,
        sect: updated_sect
    }
    console.log("Trying to PUT", updatedProduct);
    fetch('/products', {
        method: 'put',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(updatedProduct)
    })
    .then(res => {
        if(res.ok) return res.json();
    })
    .then(response => {
        window.location = "/product_details_page/"+id;
    });
}