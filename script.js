const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Función addItem
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validación del Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //Crea un list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  //Variable button que llama a a función
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Agréga item a la lista
  itemList.appendChild(li);
  //Muestra en consola el item que se agregó
  console.log('Artículo agregado: ' + itemList.appendChild(li).innerText);

  //Llama funcion checkItems
  checkItems();

  //Vacia el valor del input
  itemInput.value = '';
}

//Función createButton
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

//Función createIcon
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

//Función removeItem
function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (
      confirm('¿Estas seguro de que deseas eliminar este artículo de la lista?')
    ) {
      //Remuve el asritulo selecionado
      e.target.parentElement.parentElement.remove();
      //Muestra el artículo eliminado
      console.log(
        'Artículo eliminado: ' + e.target.parentElement.parentElement.innerText
      );
      //Llama funcion checkItems
      checkItems();
    }
  }
}

//Función clearItems
function clearItems(e) {
  e.preventDefault();
  for (let i = itemList.children.length - 1; i >= 0; i--) {
    const itemToRemove = itemList.children[i];
    // Muestra el texto del <li> que se está eliminando
    console.log('Artículo eliminado: ' + itemToRemove.innerText);
    itemList.removeChild(itemToRemove);
  }
  //Llama funcion checkItems
  checkItems();
}

//Función filerItems
function filterItems(e){
  const items = itemList.querySelectorAll('li');
  const filter_text = e.target.value.toLowerCase();
  //Verifica que existan conincidencias con los items y los va filtrando
  items.forEach((item) =>{
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(filter_text) != -1) {
      item.style.display = 'flex';
    } else{
      item.style.display = 'none';
    }
  });
}

//Función checkItems
function checkItems() {
  const items = itemList.querySelectorAll('li');
  //Verifica que existan items <li> en la lista <ul>
  if (items.length === 0) {
    //Si no los hay esconde el filtro y el boton "Limpiar todo"
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
    //Si los hay muestra el filtro y el boton "Limpiar todo"
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Agregar los eventListeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
checkItems();
