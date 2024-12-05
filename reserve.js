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