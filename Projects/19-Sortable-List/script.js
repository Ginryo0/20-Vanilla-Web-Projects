const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const sahaba = [
  'Abu Bakr',
  'Umar ibn al-Khattab',
  'Uthman bin Affan',
  'Ali bin Abu Talib',
  'Talha Ibn Ubaidullah',
  'Al Zubair Ibn Al-Awwam',
  'AbdulRahman Bin Auf',
  'Saad Ibn Abi Waqqas',
  'Saeed Ibn Zayd',
  'Abu Ubaida ibn Al-Jarrah',
];

// Store ListItems = actual DOM elements
const listItems = [];

let dragStartIndex;

createList();
// Insert list items to DOM
function createList() {
  [...sahaba]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, idx) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', idx);

      listItem.innerHTML = `
      <span class='number'>${idx + 1}</span>
      <div class="draggable" draggable='true'> 
        <p class='person-name'>${person}</p>
        <i class='fas fa-grip-lines'></i>     
      </div>
    `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

// Start dragging an item
function dragStart(idx) {
  // console.log(`start, ${idx}`);
  // dragStartIndex = idx;
  // console.log(this);
  dragStartIndex = +this.closest('li').dataset['index'];
  // console.log(dragStartIndex);
}

// Entering drop area
function dragEnter(idx, e) {
  // console.log(`enter, ${idx}`);
  this.classList.add('over');
}

// Hovering over drop area
function dragOver(idx, e) {
  // console.log(`over, ${idx}`);
  e.preventDefault();
}

// Leaving drop area
function dragLeave(idx) {
  // console.log(`leave, ${idx}`);
  this.classList.remove('over');
}

// Dropping into drop area
function dragDrop(idx) {
  // console.log(`drop, ${idx}`);
  // const dragEndIndex = idx;
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items in drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the right order of the items
function checkOrder() {
  listItems.forEach((item, idx) => {
    const personName = item.querySelector('.draggable').textContent.trim();

    if (personName === sahaba[idx]) {
      item.classList.remove('wrong');
      item.classList.add('right');
    } else {
      item.classList.remove('right');
      item.classList.add('wrong');
    }
  });
}

// Dragging event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable, idx) => {
    draggable.addEventListener('dragstart', dragStart.bind(draggable, idx));
  });

  dragListItems.forEach((item, idx) => {
    item.addEventListener('dragover', dragOver.bind(item, idx));
    item.addEventListener('dragenter', dragEnter.bind(item, idx));
    item.addEventListener('dragleave', dragLeave.bind(item, idx));
    item.addEventListener('drop', dragDrop.bind(item, idx));
  });
}

check.addEventListener('click', checkOrder);
