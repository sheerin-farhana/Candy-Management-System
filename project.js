 // Getting the data we need in variables

let candyName = document.getElementById('candyname')
let description = document.getElementById('description')
let price = document.getElementById('price')
let quantity = document.getElementById('quantity')
let addItemBtn = document.getElementById('additem');

//to add item to the screen and database
addItemBtn.addEventListener('click', async function () {
    let candyNameValue = candyName.value;
    let descriptionValue = description.value;
    let priceValue = price.value;
    let quantityValue = quantity.value;

    let candyobj =
    {
        'candyname': candyNameValue,
        'description': descriptionValue,
        'price': priceValue,
        'quantity': quantityValue
    }


    try {
        let res = await axios.post('https://crudcrud.com/api/67b325c3b91747338c02c24318b84285/candydata', candyobj);

        let candydataObj = {
            '_id': res.data._id,
            'candyname': res.data.candyname,
            'description': res.data.description,
            'price': res.data.price,
            'quantity': res.data.quantity
        }
        showContentOnScreen(candydataObj)
        console.log(candydataObj);
    } catch (error) {
        console.log(error);
    }

    document.getElementById('candyname').value = "";
    document.getElementById('description').value = "";

    document.getElementById('price').value = "";

    document.getElementById('quantity').value = ""


})


//to handle buy button click 
function handleBuyButton(user, quantityToBuy, tdElement) {
    return async function () {
        let candyId = user._id;
        let updatedCandyData = {
            candyname: user.candyname,
            description: user.description,
            price: user.price,
            quantity: user.quantity - quantityToBuy
        };

        if (user.quantity >= quantityToBuy) {
            try {
                let res =await axios.put(`https://crudcrud.com/api/67b325c3b91747338c02c24318b84285/candydata/${candyId}`, updatedCandyData);
                let updatedQuantity = user.quantity - quantityToBuy;
                user.quantity = updatedQuantity;
                tdElement.textContent = updatedQuantity;
            } catch (error) {
                let updatedQuantity = user.quantity - quantityToBuy;
                user.quantity = updatedQuantity;
                tdElement.textContent = updatedQuantity;
                console.log(error);
            }
        } else {
            alert(`Not enough chocolates available`);
        }
    }
}

// To display content on screen
async function showContentOnScreen(user) {

    let table = document.getElementById('datatable');

    //creating row element
    let tr = document.createElement('tr');
    tr.classList = "table-warning table-bordered table fw-bold";

    //creating row data elements
    let td1 = document.createElement('td');
    td1.textContent = user.candyname;
    td1.style.textTransform = "capitalize";

    let td2 = document.createElement('td');
    td2.textContent = user.description;
    td2.style.textTransform = "capitalize";


    let td3 = document.createElement('td');
    td3.textContent = user.price;

    let td4 = document.createElement('td');
    td4.textContent = user.quantity;


    //creating buy buttons
    let buyOneBtn = document.createElement('button');
    buyOneBtn.classList = "btn btn-info"
    buyOneBtn.textContent = 'BUY ONE';

    let buyTwoBtn = document.createElement('button');
    buyTwoBtn.classList = "btn btn-info"
    buyTwoBtn.textContent = 'BUY TWO';

    let buyThreeBtn = document.createElement('button');
    buyThreeBtn.classList = "btn btn-info"
    buyThreeBtn.textContent = 'BUY THREE';

    let td5 = document.createElement('td');
    td5.appendChild(buyOneBtn);

    let td6 = document.createElement('td');
    td6.appendChild(buyTwoBtn);

    let td7 = document.createElement('td');
    td7.appendChild(buyThreeBtn)

    //appendind row data to row
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    //appending row to table;
    table.append(tr);

    //handling buy button click
    buyOneBtn.addEventListener('click', handleBuyButton(user, 1, td4));
    buyTwoBtn.addEventListener('click', handleBuyButton(user, 2, td4));
    buyThreeBtn.addEventListener('click', handleBuyButton(user, 3, td4));

}


//To display content after reload
document.addEventListener('DOMContentLoaded', async function () {
    
    try {
        let res = await axios.get('https://crudcrud.com/api/67b325c3b91747338c02c24318b84285/candydata');
        let candyData = res.data;
        candyData.forEach(candy => {
            showContentOnScreen(candy);
        })
    } catch (error) {
        console.log(error);
    }
    
});