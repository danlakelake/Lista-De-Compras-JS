const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Muestra los artículos almacenados en LocalStorage en el DOM
function displayItems(){
  const itemFromStorage = getItemsFromStorage();
  // Recorre cada artículo almacenado en LocalStorage y los añade a la Lista
  itemFromStorage.forEach(item => addItemToDOM(item));
  // Llama función checkItems
  checkItems();
}

// Maneja el evento de envío del formulario para agregar un nuevo elemento
function onAddItemSubmit(e) {
  e.preventDefault();
  // Obtiene el valor del input
  const newItem = itemInput.value; 

  // Validación del input: Verifica si el campo está vacío
  if (newItem === '') {
    alert('Please add an item'); 
    return; 
  }
  // Añade el nuevo elemento al DOM
  addItemToDOM(newItem);

  // Guarda el nuevo elemento en LocalStorage
  addItemToStorage(newItem);

  // Verifica si la lista de elementos está vacía
  checkItems();

  // Limpia el valor del input después de agregar el elemento
  itemInput.value = '';
}

// Añade un nuevo elemento a la lista del DOM
function addItemToDOM(item){
  // Crea un elemento <li> y le añade el texto del item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  // Crea un botón de eliminación utilizando la función createButton y lo agrega al <li>
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Agrega el elemento <li> completo a la lista existente en el DOM
  itemList.appendChild(li);

  // Muestra en la consola el texto del elemento añadido
  console.log('Artículo agregado: ' + itemList.appendChild(li).innerText);
}

// Crea un botón con clases específicas y añade el icono x-mark
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Crea un elemento <i> con las clases especificadas
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Agrega un nuevo elemento a la lista almacenada en LocalStorage
function addItemToStorage(item){
  // Obtiene los elementos actuales desde LocalStorage
  const itemFromStorage = getItemsFromStorage();
  // Añade el nuevo elemento a la lista
  itemFromStorage.push(item);
  //Convertir respuesta en JSON string y agregarla en el LocalStorage
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

// Obtiene los elementos almacenados en LocalStorage y los retorna como un arreglo
function getItemsFromStorage(){
  // Verifica si no existen elementos almacenados bajo la clave 'items' en LocalStorage
  if (localStorage.getItem('items') === null) {
    // Si no existen, inicializa un arreglo vacío
    itemFromStorage = [];
  } else {
    // Si existen, los convierte de una cadena JSON a un objeto JavaScript
    itemFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  // Retorna el arreglo con los elementos
  return itemFromStorage;
}


// Elimina un elemento de la lista y actualiza el estado del DOM
function removeItem(e) {
  // Verifica si se hizo clic en un botón con la clase 'remove-item'
  if (e.target.parentElement.classList.contains('remove-item')) {
    // Solicita confirmación antes de eliminar el elemento
    if (confirm('¿Estás seguro de que deseas eliminar este artículo de la lista?')) {
      // Elimina el elemento seleccionado del DOM
      e.target.parentElement.parentElement.remove();
      
      // Muestra en la consola el nombre del artículo eliminado
      console.log(
        'Artículo eliminado: ' + e.target.parentElement.parentElement.innerText
      );
      
      // Verifica si quedan elementos en la lista
      checkItems();
    }
  }
}

// Elimina todos los elementos de la lista y actualiza el estado del DOM
function clearItems(e) {
  e.preventDefault();
  // Recorre la lista de elementos en orden inverso para eliminarlos uno por uno
  for (let i = itemList.children.length - 1; i >= 0; i--) {
    const itemToRemove = itemList.children[i];
    // Muestra en la consola el texto del elemento <li> que se está eliminando
    console.log('Artículo eliminado: ' + itemToRemove.innerText);
    itemList.removeChild(itemToRemove); // Elimina el elemento del DOM
  }
  // Verifica si la lista está vacía y actualiza el estado del DOM
  checkItems();
}

// Filtra los elementos de la lista según el texto ingresado en el campo de búsqueda
function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  // Convierte el texto del campo de búsqueda a minúsculas
  const filter_text = e.target.value.toLowerCase();

  // Recorre cada elemento de la lista y verifica si coincide con el texto de búsqueda
  items.forEach((item) => {
    // Obtiene el texto del elemento <li>
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(filter_text) != -1) {
      // Si hay coincidencias, muestra el elemento
      item.style.display = 'flex';
    } else {
      // Si no hay coincidencias, oculta el elemento
      item.style.display = 'none';
    }
  });
}

// Verifica si hay elementos <li> en la lista y muestra u oculta los elementos de la interfaz según corresponda
function checkItems() {
  // Obtiene todos los elementos <li> de la lista
  const items = itemList.querySelectorAll('li');

  // Si no hay elementos <li> en la lista
  if (items.length === 0) {
    // Oculta los elementos de filtro y el botón "Limpiar todo"
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    // Muestra los elementos de filtro y el botón "Limpiar todo"
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Agregar los eventListeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
checkItems();
