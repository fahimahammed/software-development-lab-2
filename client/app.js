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
            <td>
                <button onclick="deleteItem('${singleData._id}')"> Delete </button>
                <button onclick="updateItem('${singleData._id}')"> Update </button>
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
            <h3>Update Product</h3>
            <h6>ID: ${data._id}</h6>
            Name: <input type='text' value=${data.name} id="updateName">
            Price: <input type='number' value=${data.price} id="updatePrice">
            Quantity: <input type='number' value=${data.quantity} id="updateQuantity">
            <button onclick = "updateProduct('${data._id}')">Save</button>
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