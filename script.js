var globalQty=0;
var cartProducts = [];
function minusQuantity(elem) {
    var parent = elem.parentNode;
    var qtyElement = parent.querySelector('.quatity');
    if(qtyElement.value>1) {
        qtyElement.value--;
    } else {
        // reste 1, car le minimum c'est 1
    }
}

function plusQuantity(elem) {
    var parent = elem.parentNode;
    var qtyElement = parent.querySelector('.quatity');
    qtyElement.value++;
    
}

function addToCart(elem) {
    var parent = elem.parentNode;
    var grandparent = parent.parentNode;
    var grandgrandparent = grandparent.parentNode;
    var qty = grandparent.querySelector('.quatity').value;
    var price = grandparent.querySelector('.price').value;
    var name = grandparent.querySelector('.card-title').innerText;
    var image = grandgrandparent.querySelector('.card-img-top').src;
    globalQty = parseInt(globalQty) + parseInt(qty);
    document.getElementById("cartCount").innerText = globalQty;
    var prd = {'name':name,'qty':parseInt(qty),'price':price,'image':image};
    var indExist = productExist(cartProducts,prd);
    if(indExist!=-1) {
        cartProducts[indExist].qty += parseInt(qty);
    } else {
        cartProducts.push(prd);
    }
}

function productExist(array,product) {
    for(i=0;i<array.length;i++) {
        if(array[i].name == product.name) {
            return i;
        }
    }
    return -1;
}
/*
<tr>
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">John Doe</p>
            <p class="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">Software engineer</p>
        <p class="text-muted mb-0">IT department</p>
      </td>
      <td>
        <span class="badge badge-success rounded-pill d-inline">Active</span>
      </td>
      <td>Senior</td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded">
          Edit
        </button>
      </td>
    </tr>
*/
function viewCart() {
    var html ="";
    for(i=0;i<cartProducts.length;i++) {
        html += `<tr>
        <td>
          <div class="d-flex align-items-center">
            <img
                src="`+cartProducts[i].image+`"
                alt=""
                style="width: 45px; height: 45px"
                class="rounded-circle"
                />
            <div class="ms-3">
              <p class="fw-bold mb-1">`+cartProducts[i].name+`</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">`+cartProducts[i].price+`</p>
         
        </td>
        <td>
          <span class="badge badge-success rounded-pill d-inline">`+cartProducts[i].qty+`</span>
        </td>
        
        <td>
          <button type="button" class="btn btn-link btn-sm btn-rounded" onclick="deleteFromCart(`+cartProducts[i].name+`)">
            Supprimer
          </button>
        </td>
      </tr>`;        
    }
    var tbody = document.getElementById("productsTable").getElementsByTagName('tbody')[0];
    tbody.innerHTML=html;
    return true;
}