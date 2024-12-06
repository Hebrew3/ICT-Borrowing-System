// Sample data array with predefined trash items
let trashItems = [
    {
        itemName: "Old Laptop",
        serialNo: "ICT-001",
        category: "ICT Equipment",
        description: "Broken Core i5 Laptop",
        dateRemoved: "2024-03-15",
        reason: "Beyond repair"
    },
    {
        itemName: "Damaged Projector",
        serialNo: "AV-002",
        category: "Audio Visual",
        description: "Faulty HD Projector",
        dateRemoved: "2024-03-16",
        reason: "Unrepairable damage"
    }
];

// DOM Elements
const addModal = document.getElementById('addModal');
const addBtn = document.querySelector('.add-btn');
const closeBtns = document.querySelectorAll('.close');
const addForm = document.getElementById('addItemForm');
const searchInput = document.getElementById('searchInput');

// Show Add Modal
addBtn.addEventListener('click', () => {
    addModal.style.display = "block";
});

// Close Modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        addModal.style.display = "none";
    });
});

// Add Item
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItem = {
        itemName: document.getElementById('itemName').value,
        serialNo: document.getElementById('serialNo').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        dateRemoved: document.getElementById('dateRemoved').value,
        reason: document.getElementById('reason').value
    };
    
    trashItems.push(newItem);
    updateTable();
    addForm.reset();
    addModal.style.display = "none";
});

// Update Table
function updateTable() {
    const tbody = document.querySelector('.trash-items-table tbody');
    tbody.innerHTML = '';
    
    trashItems.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.serialNo}</td>
            <td>${item.category}</td>
            <td>${item.description}</td>
            <td>${item.dateRemoved}</td>
            <td>${item.reason}</td>
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

// Dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId + '-dropdown');
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    
    allDropdowns.forEach(function(d) {
        if (d.id !== dropdownId + '-dropdown') {
            d.classList.remove('show');
        }
    });
    
    dropdown.classList.toggle('show');
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const restoreModal = document.getElementById('restoreModal');
    const deleteModal = document.getElementById('deleteModal');
    const closeBtns = document.querySelectorAll('.close');
    let currentRow = null;

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(function(row) {
            const cells = row.getElementsByTagName('td');
            let found = false;
            
            Array.from(cells).forEach(function(cell) {
                const text = cell.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    found = true;
                }
            });
            
            row.style.display = found ? '' : 'none';
        });
    });

    // Restore button click handlers
    document.querySelectorAll('.restore-btn').forEach(button => {
        button.addEventListener('click', function() {
            currentRow = this.closest('tr');
            restoreModal.style.display = 'block';
        });
    });

    // Delete button click handlers
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            currentRow = this.closest('tr');
            deleteModal.style.display = 'block';
        });
    });

    // Confirm restore
    document.getElementById('confirmRestore').addEventListener('click', function() {
        if (currentRow) {
            currentRow.remove();
            restoreModal.style.display = 'none';
        }
    });

    // Confirm delete
    document.getElementById('confirmDelete').addEventListener('click', function() {
        if (currentRow) {
            currentRow.remove();
            deleteModal.style.display = 'none';
        }
    });

    // Cancel buttons
    document.getElementById('cancelRestore').addEventListener('click', function() {
        restoreModal.style.display = 'none';
    });

    document.getElementById('cancelDelete').addEventListener('click', function() {
        deleteModal.style.display = 'none';
    });

    // Close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            restoreModal.style.display = 'none';
            deleteModal.style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target == restoreModal) {
            restoreModal.style.display = 'none';
        }
        if (event.target == deleteModal) {
            deleteModal.style.display = 'none';
        }
        // Dropdown close functionality
        if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-icon')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let dropdown of dropdowns) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        }
    };
});

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}

// Initial table load
updateTable();