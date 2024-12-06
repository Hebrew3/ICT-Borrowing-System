// Sample data - replace this with your actual data source
let reservations = [
    {
        id: 1,
        name: "John Doe",
        contact: "09123456789",
        type: "Student",
        department: "ICT",
        srCode: "21-12345",
        status: "Pending"
    }
    // Add more sample data as needed
];

// DOM Elements
const addModal = document.getElementById('addModal');
const editModal = document.getElementById('editModal');
const deleteModal = document.getElementById('deleteModal');
const addBtn = document.querySelector('.add-btn');
const closeBtns = document.querySelectorAll('.close');
const addForm = document.getElementById('addReservationForm');
const editForm = document.getElementById('editReservationForm');
const searchInput = document.getElementById('searchInput');
let currentRow = null;

// Event Listeners
addBtn.addEventListener('click', () => addModal.style.display = 'block');

// Close Modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        addModal.style.display = 'none';
        editModal.style.display = 'none';
        deleteModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.onclick = (e) => {
    if (e.target === addModal || e.target === editModal || e.target === deleteModal) {
        addModal.style.display = 'none';
        editModal.style.display = 'none';
        deleteModal.style.display = 'none';
    }
};

// Add Reservation
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newReservation = {
        id: reservations.length + 1,
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        type: document.getElementById('type').value,
        department: document.getElementById('department').value,
        srCode: document.getElementById('srCode').value,
        status: "Pending"
    };
    reservations.push(newReservation);
    updateTable();
    addForm.reset();
    addModal.style.display = 'none';
});

// Open Edit Modal
function openEditModal(id) {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
        document.getElementById('editId').value = reservation.id;
        document.getElementById('editName').value = reservation.name;
        document.getElementById('editContact').value = reservation.contact;
        document.getElementById('editType').value = reservation.type;
        document.getElementById('editDepartment').value = reservation.department;
        document.getElementById('editSrCode').value = reservation.srCode;
        editModal.style.display = 'block';
    }
}

// Open Delete Modal
function openDeleteModal(id) {
    document.getElementById('deleteId').value = id;
    deleteModal.style.display = 'block';
}

// Edit Reservation
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('editId').value);
    const index = reservations.findIndex(r => r.id === id);
    
    if (index !== -1) {
        reservations[index] = {
            id: id,
            name: document.getElementById('editName').value,
            contact: document.getElementById('editContact').value,
            type: document.getElementById('editType').value,
            department: document.getElementById('editDepartment').value,
            srCode: document.getElementById('editSrCode').value,
            status: reservations[index].status
        };
        updateTable();
        editModal.style.display = 'none';
    }
});

// Confirm Delete
function confirmDelete() {
    const id = parseInt(document.getElementById('deleteId').value);
    reservations = reservations.filter(r => r.id !== id);
    updateTable();
    deleteModal.style.display = 'none';
}

// Cancel Delete
function cancelDelete() {
    deleteModal.style.display = 'none';
}

// Search functionality
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredReservations = reservations.filter(reservation => 
        reservation.name.toLowerCase().includes(searchTerm) ||
        reservation.srCode.toLowerCase().includes(searchTerm) ||
        reservation.department.toLowerCase().includes(searchTerm)
    );
    updateTable(filteredReservations);
});

// Update Table
function updateTable(data = reservations) {
    const tbody = document.querySelector('.reserve-table tbody');
    tbody.innerHTML = '';
    
    data.forEach(reservation => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${reservation.id}</td>
            <td>${reservation.name}</td>
            <td>${reservation.contact}</td>
            <td>${reservation.type}</td>
            <td>${reservation.department}</td>
            <td>${reservation.srCode}</td>
            <td>
                <span class="status-badge ${reservation.status.toLowerCase()}">
                    ${reservation.status}
                </span>
            </td>
            <td>
                <button onclick="openEditModal(${reservation.id})" class="btn btn-edit">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="openDeleteModal(${reservation.id})" class="btn btn-delete">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Initial table load
updateTable();

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const closeBtns = document.querySelectorAll('.close');
    let currentRow = null;

    // Add click event listeners to edit buttons
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            currentRow = this.closest('tr');
            editModal.style.display = 'block';
        });
    });

    // Add click event listeners to delete buttons
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            currentRow = this.closest('tr');
            deleteModal.style.display = 'block';
        });
    });

    // Close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            editModal.style.display = 'none';
            deleteModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == editModal || event.target == deleteModal) {
            editModal.style.display = 'none';
            deleteModal.style.display = 'none';
        }
    };
}); 