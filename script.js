const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Muestra los artículos almacenados en LocalStorage en el DOM
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  // Recorre cada artículo almacenado en LocalStorage y los añade a la Lista
  itemsFromStorage.forEach((item) => addItemToDOM(item));
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
    alert('Porfavor agrega un artículo');
    return;
  }
  // Verifica si está activado el modo de edición (isEditMode)
  if (isEditMode) {
    // Obtiene el elemento <li> que tiene la clase 'edit-mode' (el que está siendo editado)
    const itemToEdit = itemList.querySelector('.edit-mode');
    // Elimina el ítem del LocalStorage utilizando su texto actual
    removeitemFromStorage(itemToEdit.textContent);
    // Elimina la clase 'edit-mode' del ítem que estaba siendo editado
    itemToEdit.classList.remove('edit-mode');
    // Elimina el ítem del DOM
    itemToEdit.remove();
    // Cambia el estado de edición a falso, ya que el proceso de edición ha finalizado
    isEditMode = false;
    
    // Verifica si el texto del ítem antes de editar es igual al nuevo valor ingresado
    if (itemToEdit.textContent === itemInput.value) {
      // Si el texto no cambió, muestra una alerta y un mensaje en la consola
      alert("El artículo no se editó");
      console.log('El artículo no se editó');
    } else {
      // Si el texto cambió, muestra una alerta y un mensaje en la consola indicando el cambio
      alert("Artículo editado");
      console.log('Artículo editado: ' + itemToEdit.textContent + ' por: ' + itemInput.value);
    }
  } else {
    alert("Artículo agregado: " + newItem);
    // Si no está en modo de edición, verifica si el ítem ya existe en la lista
    if (checkIfItemExists(newItem)) {
      // Si el ítem ya existe, muestra una alerta y detiene la ejecución
      alert("Este artículo ya se encuentra en la lista");
      return;
    }
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

// Crea un elemento en la lista del DOM
function addItemToDOM(item) {
  const li = document.createElement('li');

  // Añade el texto del elemento al elemento de lista
  li.appendChild(document.createTextNode(item));

  // Crea el botón x
  const button = createButton('remove-item btn-link text-red');

  // Añade el botón al elemento de lista
  li.appendChild(button);

  // Agrega el elemento de lista (li) al DOM dentro de la lista principal (itemList)
  itemList.appendChild(li);
}

// Elimina un elemento del Local Storage
function removeitemFromStorage(item) {
  // Obtiene los elementos almacenados en el LocalStorage
  let itemsFromStorage = getItemsFromStorage();

  // Filtra los elementos para excluir el que se desea eliminar
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Actualiza el LocalStorage con la lista filtrada
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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
function addItemToStorage(item) {
  // Obtiene los elementos actuales desde LocalStorage
  const itemsFromStorage = getItemsFromStorage();
  // Añade el nuevo elemento a la lista
  itemsFromStorage.push(item);
  //Convertir respuesta en JSON string y agregarla en el LocalStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Obtiene los elementos almacenados en LocalStorage y los retorna como un arreglo
function getItemsFromStorage() {
  let itemsFromStorage;
  // Verifica si no existen elementos almacenados bajo la clave 'items' en LocalStorage
  if (localStorage.getItem('items') === null) {
    // Si no existen, inicializa un arreglo vacío
    itemsFromStorage = [];
  } else {
    // Si existen, los convierte de una cadena JSON a un objeto JavaScript
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  // Retorna el arreglo con los elementos
  return itemsFromStorage;
}

// Remueve los items de la lista del DOM al dar click en el bototn con clase remove-item
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

// Verifica si un ítem ya existe en el LocalStorage
function checkIfItemExists(item) {
  // Obtiene los ítems almacenados en el LocalStorage
  const itemsFromStorage = getItemsFromStorage();
  // Devuelve un valor booleano (true o false) indicando si el ítem existe en el array
  return itemsFromStorage.includes(item);
}

// Edita el ítem seleccionado
function setItemToEdit(item) {
  // Activa el modo de edición
  isEditMode = true;
  // Elimina la clase 'edit-mode' de todos los elementos <li> en la lista
  itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
  // Agrega la clase 'edit-mode' al elemento seleccionado
  item.classList.add('edit-mode');
  // Cambia el texto y el ícono del botón del formulario para reflejar el modo de edición
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Editar artículo';
  // Cambia el color de fondo del botón para indicar visualmente el modo de edición
  formBtn.style.backgroundColor = '#228B22';
  // Rellena el campo de entrada del formulario con el texto del ítem seleccionado
  itemInput.value = item.textContent;
}


// Elimina un elemento de la lista y actualiza el estado del DOM
function removeItem(item) {
  if (confirm('¿Estas seguro que deseas eliminar el artículo?')) {
    // Elimina el item del DOM
    item.remove();
    console.log("Artículo eliminado: " + item.textContent);
    // Elimina el item del LocalStorage
    removeitemFromStorage(item.textContent);
    // Verifica que existan items en la lista
    checkItems();
  }
}

// Elimina el elemento del Loca Storage
function removeitemFromStorage(item) {
  // Obtiene los elementos almacenados en el LocalStorage
  let itemsFromStorage = getItemsFromStorage();

  // Filtra los elementos para excluir el que se desea eliminar
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Actualiza el LocalStorage con la lista filtrada
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Elimina todos los elementos de la lista y actualiza el estado del DOM
function clearItems(e) {
  e.preventDefault();
  // Almacena los artículos eliminados
  const removedItems = [];

  // Recorre la lista de elementos en orden inverso para eliminarlos uno por uno
  for (let i = itemList.children.length - 1; i >= 0; i--) {
    const itemToRemove = itemList.children[i];
    // Almacena el texto del elemento <li> eliminado
    removedItems.push(itemToRemove.textContent);
    // Elimina el elemento del DOM
    itemList.removeChild(itemToRemove);
  }

  // Muestra en la consola los artículos eliminados como lista
  console.log('Artículos eliminados:');
  removedItems.forEach((removedItem, index) => {
    console.log(`${index + 1}. ${removedItem}`);
  });

  // Eliminar los elementos del localStorage
  localStorage.removeItem('items');

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

  //Limpia el valor del input
  itemInput.value = '';

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
  // Restablece el texto y el ícono del botón del formulario para reflejar el modo de agregar nuevos ítems
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Agregar artículo';
  // Cambia el color de fondo del botón para indicar que ya no está en modo de edición
  formBtn.style.backgroundColor = '#333';
  // Desactiva el modo de edición
  isEditMode = false;
}

//Inicializar App
function initializeApp() {
  // Agregar los EventListeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkItems();
}

initializeApp();
