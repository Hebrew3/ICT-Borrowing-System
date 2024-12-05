// Sample data for reservations
const reservations = [
    {
        id: 1,
        name: "John Doe",
        contact: "09123456789",
        type: "Student",
        department: "CICS",
        srCode: "21-12345",
        status: "Pending"
    },
    {
        id: 2,
        name: "Jane Smith",
        contact: "09987654321",
        type: "Faculty",
        department: "CAS",
        srCode: "22-54321",
        status: "Approved"
    },
    {
        id: 3,
        name: "Mike Johnson",
        contact: "09456789123",
        type: "Student",
        department: "COE",
        srCode: "20-98765",
        status: "Declined"
    }
];

// Function to display reservations
function displayReservations(items) {
    const tableBody = document.querySelector('.reserve-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (items.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center;">No reservations found</td>
            </tr>
        `;
        return;
    }

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.contact}</td>
            <td>${item.type}</td>
            <td>${item.department}</td>
            <td>${item.srCode}</td>
            <td><span class="status-badge ${item.status.toLowerCase()}">${item.status}</span></td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editReservation(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteReservation(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
function searchReservations(searchTerm) {
    const filteredItems = reservations.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.srCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayReservations(filteredItems);
}

// Edit reservation function
function editReservation(id) {
    const reservation = reservations.find(item => item.id === id);
    if (reservation) {
        console.log('Editing reservation:', reservation);
        alert(`Editing reservation for: ${reservation.name}`);
    }
}

// Delete reservation function
function deleteReservation(id) {
    const reservation = reservations.find(item => item.id === id);
    if (reservation && confirm(`Are you sure you want to delete reservation for ${reservation.name}?`)) {
        console.log('Deleting reservation:', reservation);
        alert(`Reservation deleted for: ${reservation.name}`);
    }
}

// Track active dropdowns
let activeDropdown = null;

// Function to toggle dropdown visibility
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(`${dropdownId}-dropdown`);
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    const currentButton = document.querySelector(`[onclick="toggleDropdown('${dropdownId}')"]`);
    
    // Close all other dropdowns first
    allDropdowns.forEach(d => {
        if (d !== dropdown && d.classList.contains('show')) {
            d.classList.remove('show');
            // Reset other dropdown button icons
            const otherButton = d.previousElementSibling;
            if (otherButton) {
                const icon = otherButton.querySelector('.dropdown-icon');
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Toggle current dropdown
    dropdown.classList.toggle('show');
    
    // Rotate icon based on dropdown state
    const icon = currentButton.querySelector('.dropdown-icon');
    if (icon) {
        icon.style.transform = dropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
    
    // Update active dropdown
    activeDropdown = dropdown.classList.contains('show') ? dropdown : null;
}

// Function to handle dropdown item selection
function handleDropdownClick(event, itemName) {
    event.preventDefault(); // Prevent immediate navigation
    
    const dropdownBtn = event.target.closest('.dropdown').querySelector('.dropdown-btn');
    if (dropdownBtn) {
        // Update button text to show selected item
        const icon = dropdownBtn.querySelector('i').cloneNode(true);
        dropdownBtn.innerHTML = '';
        dropdownBtn.appendChild(icon);
        dropdownBtn.appendChild(document.createTextNode(' ' + itemName));
        dropdownBtn.appendChild(document.createElement('i')).className = 'fas fa-caret-down dropdown-icon';
    }

    // Close the dropdown
    if (activeDropdown) {
        activeDropdown.classList.remove('show');
        activeDropdown = null;
    }

    // Navigate to the link after a small delay (for visual feedback)
    setTimeout(() => {
        window.location.href = event.target.href;
    }, 100);
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const isDropdownBtn = event.target.matches('.dropdown-btn') || 
                         event.target.matches('.dropdown-icon') ||
                         event.target.parentElement.matches('.dropdown-btn');
    
    if (!isDropdownBtn) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                // Reset icon rotation
                const button = dropdown.previousElementSibling;
                if (button) {
                    const icon = button.querySelector('.dropdown-icon');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                }
            }
        });
        activeDropdown = null;
    }
});

// Optional: Close dropdowns when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && activeDropdown) {
        activeDropdown.classList.remove('show');
        // Reset icon rotation
        const button = activeDropdown.previousElementSibling;
        if (button) {
            const icon = button.querySelector('.dropdown-icon');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
        activeDropdown = null;
    }
});

// Optional: Add hover effect for dropdown items
document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display initial data
    displayReservations(reservations);

    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchReservations(e.target.value);
        });
    }
}); 