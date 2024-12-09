function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId + '-dropdown');
  const allDropdowns = document.querySelectorAll('.dropdown-content');
  
  // Close all other dropdowns first
  allDropdowns.forEach(function(d) {
    if (d.id !== dropdownId + '-dropdown') {
      d.classList.remove('show');
    }
  });
  
  // Toggle the clicked dropdown
  dropdown.classList.toggle('show');
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-icon')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let dropdown of dropdowns) {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  }
}

// Sample data array with predefined items
let items = [
    {
        quantity: "5",
        issued: "No",
        serialNo: "ICT-001",
        itemName: "Laptop",
        brand: "Dell",
        category: "ICT Equipment",
        description: "Core i5 Laptop",
        date: "2024-03-20"
    },
    {
        quantity: "3",
        issued: "Yes",
        serialNo: "AV-002",
        itemName: "Projector",
        brand: "Epson",
        category: "Audio Visual",
        description: "HD Projector",
        date: "2024-03-21"
    }
];

// DOM Elements
const addModal = document.getElementById('addModal');
const editModal = document.getElementById('editModal');
const deleteModal = document.getElementById('deleteModal');
const addBtn = document.querySelector('.add-btn');
const closeBtns = document.querySelectorAll('.close');
const addForm = document.getElementById('addItemForm');
const editForm = document.getElementById('editItemForm');

// Show Add Modal
addBtn.addEventListener('click', () => {
    addModal.style.display = 'block';
});

// Close Modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        addModal.style.display = 'none';
        editModal.style.display = 'none';
        deleteModal.style.display = 'none';
    });
});

// Add Item
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItem = {
        quantity: document.getElementById('quantity').value,
        issued: document.getElementById('issued').value,
        serialNo: document.getElementById('serialNo').value,
        itemName: document.getElementById('itemName').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value
    };
    
    items.push(newItem);
    updateTable();
    addForm.reset();
    addModal.style.display = 'none';
});

// Edit Item
function openEditModal(index) {
    console.log('Opening edit modal for index:', index);
    const item = items[index];
    if (!item) {
        console.error('No item found at index:', index);
        return;
    }

    document.getElementById('editQuantity').value = item.quantity;
    document.getElementById('editIssued').value = item.issued;
    document.getElementById('editSerialNo').value = item.serialNo;
    document.getElementById('editItemName').value = item.itemName;
    document.getElementById('editBrand').value = item.brand;
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editDescription').value = item.description;
    document.getElementById('editDate').value = item.date;
    document.getElementById('editIndex').value = index;
    
    editModal.style.display = 'block';
}

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const index = parseInt(document.getElementById('editIndex').value);
    
    items[index] = {
        quantity: document.getElementById('editQuantity').value,
        issued: document.getElementById('editIssued').value,
        serialNo: document.getElementById('editSerialNo').value,
        itemName: document.getElementById('editItemName').value,
        brand: document.getElementById('editBrand').value,
        category: document.getElementById('editCategory').value,
        description: document.getElementById('editDescription').value,
        date: document.getElementById('editDate').value
    };
    
    updateTable();
    editModal.style.display = 'none';
});

// Update Table
function updateTable() {
    const tbody = document.querySelector('.items-table tbody');
    tbody.innerHTML = '';
    
    items.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.quantity}</td>
            <td>${item.issued}</td>
            <td>${item.serialNo}</td>
            <td>${item.itemName}</td>
            <td>${item.brand}</td>
            <td>${item.category}</td>
            <td>${item.description}</td>
            <td>${item.date}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="openEditModal(${index})" class="btn btn-edit">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="openDeleteModal(${index})" class="btn btn-delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Delete functionality
function openDeleteModal(index) {
    console.log('Opening delete modal for index:', index);
    document.getElementById('deleteIndex').value = index;
    deleteModal.style.display = 'block';
}

function confirmDelete() {
    const index = parseInt(document.getElementById('deleteIndex').value);
    items.splice(index, 1);
    updateTable();
    deleteModal.style.display = 'none';
}

function closeDeleteModal() {
    deleteModal.style.display = 'none';
}

// Make functions available globally
window.openEditModal = openEditModal;
window.openDeleteModal = openDeleteModal;
window.confirmDelete = confirmDelete;
window.closeDeleteModal = closeDeleteModal;

// Event delegation for dynamically created buttons
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
        if(e.target.closest('.edit-btn')) {
            const row = e.target.closest('tr');
            const index = Array.from(row.parentNode.children).indexOf(row);
            openEditModal(index);
        }
        if(e.target.closest('.delete-btn')) {
            const row = e.target.closest('tr');
            const index = Array.from(row.parentNode.children).indexOf(row);
            openDeleteModal(index);
        }
    });
});

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === addModal || event.target === editModal || event.target === deleteModal) {
        addModal.style.display = 'none';
        editModal.style.display = 'none';
        deleteModal.style.display = 'none';
    }
}

// Initial table load
updateTable();

// Add this search function
searchInput.addEventListener('keyup', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.quantity.toLowerCase().includes(searchTerm) ||
        item.issued.toLowerCase().includes(searchTerm) ||
        item.serialNo.toLowerCase().includes(searchTerm) ||
        item.itemName.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.date.toLowerCase().includes(searchTerm)
    );
    
    // Update table with filtered results
    const tbody = document.querySelector('.items-table tbody');
    tbody.innerHTML = '';
    
    filteredItems.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.quantity}</td>
            <td>${item.issued}</td>
            <td>${item.serialNo}</td>
            <td>${item.itemName}</td>
            <td>${item.brand}</td>
            <td>${item.category}</td>
            <td>${item.description}</td>
            <td>${item.date}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="openEditModal(${index})" class="btn btn-edit">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="openDeleteModal(${index})" class="btn btn-delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
});
