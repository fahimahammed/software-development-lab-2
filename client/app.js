const getInputValue = (id) => {
    return document.getElementById(id).value;
}

// post dish data
async function addDish()  {
    const dishData = {
        name: getInputValue('name'),
        price: getInputValue('price'),
        quantity: getInputValue('quantity')
    }

    // console.log(dishData);
    const url = `http://localhost:3000/dishes`;
    const res = await fetch(url, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dishData)
    })
    .then(res => loadDishData());
    
}

const deleteItem = (id) =>{
    fetch(`http://localhost:3000/dishes/${id}`, {
        method: 'DELETE'
    })
    .then(res => loadDishData())
    //.then(result => console.log(result))
}


const loadDishData = () => {
    fetch('http://localhost:3000/dishes')
    .then(res => res.json())
    .then(data => displayDishData(data))
}

const displayDishData = (data) => {
    const dishContainer = document.getElementById('dish-container');
    dishContainer.textContent = '';
    for(const singleData of data){
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${singleData.name}</td>
            <td>${singleData.price}</td>
            <td>${singleData.quantity}</td>
            <td class='d-flex'>
                <button class='btn text-primary' onclick="updateItem('${singleData._id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class='btn text-danger' onclick="deleteItem('${singleData._id}')"> <i class="fa-solid fa-trash-can"></i> </button>
            </td>
        `
        dishContainer.appendChild(tableRow);
    }
}

const updateItem = (id) => {
    fetch(`http://localhost:3000/dishes/${id}`) 
    .then(res => res.json())
    .then(data => {
        const update = document.getElementById('update');
        update.innerHTML = `
            <h3 class='mt-4 text-primary'><i class="fa-solid fa-pen-to-square"></i> Update Product</h3> 
            <hr class='text-primary'>
            <p class='text-secondary'>ID: ${data._id}</p>
            <label for="updateName" class="form-label">Dish Name</label>
            <input type='text' class="form-control" value=${data.name} id="updateName">

            <div class='row'>
                <div class='col'>
                    <label for="updatePrice" class="form-label">Price</label>
                    <input type='number' class="form-control" value=${data.price} id="updatePrice">
                </div>

                <div class='col'>
                    <label for="updateQuantity" class="form-label">Quantity</label>
                    <input type='number' class="form-control" value=${data.quantity} id="updateQuantity">
                </div>
            </div>
            <button class="btn btn-primary mt-1" onclick = "updateProduct('${data._id}')"><i class="fa-solid fa-database"></i> Save</button>
        `
    })
}

const updateProduct = (id) =>{
    // console.log(i?d);
    const name =getInputValue('updateName');
    const price = getInputValue('updatePrice');
    const quantity = getInputValue('updateQuantity');
    const item = {name, price, quantity};
    // console.log(item);

    fetch(`http://localhost:3000/dishes/${id}`, {
        method: 'PUT', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(item)
    })
    .then(res => {
        loadDishData();
        document.getElementById('update').innerHTML = '';
    })
    
}

loadDishData();