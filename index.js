const express = require('express');
const app = express();
const morgan = require('morgan');
const uuid = require('uuid');

const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 5000;
const connectionString = "mongodb+srv://admin:"+process.env.DB_PASSWORD+"@cluster0.7uz2z.mongodb.net/InventoryAppDB?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
.then(client => {

    console.log("Database Connection Established!");
    const db = client.db('InventoryAppDB');
    const products_collection = db.collection('products');
    const employees_collection = db.collection('employees');
    const sections_collection = db.collection('sections');

    //Setting the View Engine
    app.set('view engine', 'ejs');

    //Setting up morgan
    app.use(morgan('tiny'));

    //Setting the Static Folder
    app.use(express.static('public'));

    //Setting up the body parser
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    //Handling GET
    //Homepage Route
    app.get('/', (req,res) => {
        products_collection.find().toArray()
        .then(products => {
            res.render("index.ejs", products);
        })
        .catch(err => console.error(err));
    })
    //Employees Page Route
    app.get('/employees_page', (req,res) => {
        employees_collection.find().toArray()
        .then(employees => {
            res.render("employees_page.ejs", {employees});
        })
        .catch(err => console.error(err));
    })
    //Products Page Route
    app.get('/products_page', (req,res) => {
        products_collection.find().toArray()
        .then(products => {
            console.log(products);
            res.render("products_page.ejs", {products});
        })
        .catch(err => console.error(err));
    })
    //Sections Page Route
    app.get('/sections_page', (req,res) => {
        sections_collection.find().toArray()
        .then(sections => {
            res.render("sections_page.ejs", {sections});
        })
        .catch(err => console.error(err));
    })
    //AddProducts Page Route
    app.get('/add_product_page', (req,res) => {
        products_collection.find().toArray()
        .then(() => {
            res.render("add_product_page.ejs");
        })
        .catch(err => console.error(err));
    })
    //AddEmployees Page Route
    app.get('/add_employee_page', (req,res) => {
        employees_collection.find().toArray()
        .then(() => {
            res.render("add_employee_page.ejs");
        })
        .catch(err => console.error(err));
    })
    //AddSection Page Route
    app.get('/add_section_page', (req,res) => {
        sections_collection.find().toArray()
        .then(() => {
            res.render("add_section_page.ejs");
        })
        .catch(err => console.error(err));
    })

    //SingleProduct Route
    app.get('/product_details_page/:id', (req, res) => {
        const id = req.params.id;
        products_collection.find({
            "id":id
        }).toArray()
        .then(product => {
            console.log(product);
            res.render("product_details_page.ejs", {product});
        })
        .catch(err => console.error(err));

    });

    //UpdateProduct Route
    app.get('/product_update_page/:id', (req, res) => {
        const id = req.params.id;
        products_collection.find({
            "id": id
        }).toArray()
        .then(product => {
            console.log(product);
            res.render("product_update_page.ejs", {product});
        })
        .catch(err => console.error(err));
    });

    //SingleEmployee Route
    app.get('/employee_details_page/:id', (req, res) => {
        const id = req.params.id;
        employees_collection.find({
            "id":id
        }).toArray()
        .then(employee => {
            console.log(employee);
            res.render("employee_details_page.ejs", {employee});
        })
        .catch(err => console.error(err));

    });

    //SingleSection Route
    app.get('/section_details_page/:id', (req, res) => {
        const id = req.params.id;
        sections_collection.find({
            "id":id
        }).toArray()
        .then(section => {
            products_collection.find({
                "sect":section[0].name
            }).toArray()
            .then(prods => {
                console.log("prods found -")
                console.log(prods);
                res.render("section_details_page.ejs", {section, prods});
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err));

    });
    
    //UpdateEmployee Route
    app.get('/employee_update_page/:id', (req, res) => {
        const id = req.params.id;
        employees_collection.find({
            "id": id
        }).toArray()
        .then(employee => {
            res.render("employee_update_page.ejs", {employee});
        })
        .catch(err => console.error(err));
    });

    //UpdateSection Route
    app.get('/section_update_page/:id', (req, res) => {
        const id = req.params.id;
        sections_collection.find({
            "id": id
        }).toArray()
        .then(section => {
            res.render("section_update_page.ejs", {section});
        })
        .catch(err => console.error(err));
    });
    
    //Handling POST to Products
    app.post('/products', (req, res) => {
        const newProduct = {
            id: uuid.v4(),
            img: req.body.img,
            name: req.body.name, 
            cost: req.body.cost,
            sect: req.body.sect
        }
        products_collection.insertOne(newProduct)
        .then(result => {
            res.redirect('/products_page');
        })
        .catch(err => console.log(err))
    });

    //Handling POST to Employees
    app.post('/employees', (req, res) => {
        const newEmployee = {
            id: uuid.v4(),
            name: req.body.name,
            section: req.body.section
        }
        employees_collection.insertOne(newEmployee)
        .then(result => {
            res.redirect('/employees_page');
        })
        .catch(err => console.log(err))
    });

    //Handling POST to Sections
    app.post('/sections', (req, res) => {
        const newSection = {
            id: uuid.v4(),
            name: req.body.name,
            desc: req.body.desc
        }
        sections_collection.insertOne(newSection)
        .then(result => {
            res.redirect('/sections_page');
        })
        .catch(err => console.log(err))
    });

    //Handling PUT to Products
    app.put('/products', (req, res) => {
        products_collection.findOneAndUpdate({
            id: req.body.id
        },
        {
            $set: req.body
        },
        {
            upsert: true
        })
        .then(result => {
            res.json("Product Updated");
        })
        .catch(err => console.error(err));
    });

    //Handling PUT to Employees
    app.put('/employees', (req, res) => {
        employees_collection.findOneAndUpdate({
            id: req.body.id
        },
        {
            $set: req.body
        },
        {
            upsert: true
        })
        .then(result => {
            res.json("Product Updated");
        })
        .catch(err => console.error(err));
    });

    //Handling PUT to Sections
    app.put('/sections', (req, res) => {
        sections_collection.findOneAndUpdate({
            id: req.body.id
        },
        {
            $set: req.body
        },
        {
            upsert: true
        })
        .then(result => {
            res.json("Section Updated");
        })
        .catch(err => console.error(err));
    });

    //Handling DELETE to Products
    app.delete('/products', (req, res)=> {

        products_collection.deleteOne(
            {id: req.body.id}
        )
        .then(result => {
            if(result.deletedCount === 0){
                res.json("Unexpected Error - Product Not Found")
            }
            res.json("Deleted Object")
        })
        .catch(err => console.error(err));
    });

    //Handling DELETE to Employees
    app.delete('/employees', (req, res)=> {

        employees_collection.deleteOne(
            {id: req.body.id}
        )
        .then(result => {
            if(result.deletedCount === 0){
                res.json("Unexpected Error - Product Not Found")
            }
            res.json("Deleted Object")
        })
        .catch(err => console.error(err));
    });

    //Handling DELETE to Sections
    app.delete('/sections', (req, res)=> {
 
        sections_collection.deleteOne(
            {id: req.body.id}
        )
        .then(result => {
            if(result.deletedCount === 0){
                res.json("Unexpected Error - Product Not Found")
            }
            res.json("Deleted Object")
        })
        .catch(err => console.error(err));
    });

    app.listen(PORT, ()=>{
        console.log("Server is running at port", PORT);
    })

}).catch(err => {
    console.log(err)
})
