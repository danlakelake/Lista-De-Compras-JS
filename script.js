const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
 
  // Agrega item a la lista
  itemList.appendChild(li);
  
  console.log(itemList);

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

itemForm.addEventListener('submit', addItem);
