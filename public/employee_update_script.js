function updateEmployee(id){
    updated_name = document.getElementById("employee_name").value;
    updated_section = document.getElementById("employee_section").value;
    const updatedEmployee = {
        id: id,
        name: updated_name,
        section: updated_section
    }
    console.log("Trying to PUT", updatedEmployee);
    fetch('/employees', {
        method: 'put',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(updatedEmployee)
    })
    .then(res => {
        if(res.ok) return res.json();
    })
    .then(response => {
        window.location = "/employee_details_page/"+id;
    });
}