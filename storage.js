// Sample data for issued items
const issuedItems = [
    { id: 1, memberName: "John Doe", itemName: "Laptop", quantity: 1 },
    { id: 2, memberName: "Jane Smith", itemName: "Projector", quantity: 2 },
    { id: 3, memberName: "Mike Johnson", itemName: "Mouse", quantity: 3 },
    { id: 4, memberName: "Sarah Wilson", itemName: "Keyboard", quantity: 1 },
    { id: 5, memberName: "Tom Brown", itemName: "Monitor", quantity: 2 }
];

// Function to display issued items
function displayIssuedItems(items) {
    const tableBody = document.querySelector('.issued-items-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (items.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center;">No items found</td>
            </tr>
        `;
        return;
    }

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.memberName}</td>
            <td>${item.itemName}</td>
            <td>${item.quantity}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editItem(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
function searchItems(searchTerm) {
    const filteredItems = issuedItems.filter(item => 
        item.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayIssuedItems(filteredItems);
}

// Edit item function
function editItem(id) {
    const item = issuedItems.find(item => item.id === id);
    if (item) {
        console.log('Editing item:', item);
        // Add your edit logic here
        alert(`Editing item: ${item.itemName} borrowed by ${item.memberName}`);
    }
}

// Delete item function
function deleteItem(id) {
    const item = issuedItems.find(item => item.id === id);
    if (item && confirm(`Are you sure you want to delete ${item.itemName} borrowed by ${item.memberName}?`)) {
        console.log('Deleting item:', item);
        // Add your delete logic here
        alert(`Item deleted: ${item.itemName}`);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display initial data
    displayIssuedItems(issuedItems);

    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchItems(e.target.value);
        });
    }

    // Set up add new button
    const addButton = document.querySelector('.add-btn');
    if (addButton) {
        addButton.addEventListener('click', () => {
            // Add your logic for adding new items
            alert('Add new item functionality will be implemented here');
        });
    }
});

// Dropdown toggle function (from your existing code)
function toggleDropdown(dropdownId) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    
    // Close all other dropdowns first
    for (let dropdown of dropdowns) {
        if (dropdown.id !== dropdownId + '-dropdown') {
            dropdown.classList.remove('show');
        }
    }
    
    const selectedDropdown = document.getElementById(dropdownId + '-dropdown');
    if (selectedDropdown) {
        selectedDropdown.classList.toggle('show');
        
        // Position the dropdown next to the button
        const button = document.getElementById(dropdownId);
        if (button) {
            const buttonRect = button.getBoundingClientRect();
            selectedDropdown.style.position = 'absolute';
            selectedDropdown.style.top = '0';
            selectedDropdown.style.left = '100%';
            selectedDropdown.style.marginTop = `${buttonRect.top}px`;
            selectedDropdown.style.transform = 'translateX(10px)';
        }
    }
}
