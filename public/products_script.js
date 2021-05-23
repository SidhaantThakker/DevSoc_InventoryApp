deleteButtons = document.getElementsByClassName('delete-button');
const search_bar = document.querySelector('input');

search_bar.addEventListener('input', findProducts)

for(let i=0; i<deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click",()=>deleteItem(deleteButtons[i].id))
}

viewButtons = document.getElementsByClassName('view-button')

for(let i=0; i<viewButtons.length; i++){
    viewButtons[i].addEventListener("click",()=>viewItem(viewButtons[i].id))
}


function deleteItem(id){
    console.log("Deleting -" + id);
    fetch('/products', {
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
    fetch('/product_details_page/'+id)
}

function findProducts(){
    console.log('fired');
    prod_boxes = document.getElementsByClassName('product-class');
    req_str = document.getElementById('search-bar').value;
    for(let  i=0; i<par_prod.length;i++){
        if(par_prod[i].name.includes(req_str)){
            document.getElementById('Product_'+par_prod[i].id).style.display = 'block';
        
        } else {
            document.getElementById('Product_'+par_prod[i].id).style.display = 'none';
        }
    }
}
