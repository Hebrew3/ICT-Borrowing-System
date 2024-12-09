// Get all modals and close buttons
const addModal = document.getElementById('addModal');
const restoreModal = document.getElementById('restoreModal');
const deleteModal = document.getElementById('deleteModal');
const closeButtons = document.querySelectorAll('.close');

// Dropdown toggle functionality
function toggleDropdown(id) {
    const dropdownContent = document.getElementById(`${id}-dropdown`);
    dropdownContent.classList.toggle('show');
}

// Close dropdowns when clicking outside
window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach((dropdown) => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
});

// Modal control functions
function showModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Close modals on clicking the close button
closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Close modals when clicking outside the modal content
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

// Restore button functionality
document.querySelectorAll('.restore-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const row = button.closest('tr'); 
        showModal(restoreModal);

        document.getElementById('confirmRestore').onclick = () => {
            alert('Item restored successfully!');
            row.remove();
            closeModal(restoreModal);
        };
    });
});

document.getElementById('cancelRestore').addEventListener('click', () => {
    closeModal(restoreModal);
});

// Delete button functionality
document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const row = button.closest('tr');
        showModal(deleteModal);

        document.getElementById('confirmDelete').onclick = () => {
            row.remove(); 
            alert('Item deleted successfully!');
            closeModal(deleteModal);
        };
    });
});

document.getElementById('cancelDelete').addEventListener('click', () => {
    closeModal(deleteModal);
});

// Add item functionality
document.getElementById('addItemForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
    alert('Item added to trash successfully!');
    closeModal(addModal);
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const tableRows = document.querySelectorAll('.items-table tbody tr');

searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    tableRows.forEach((row) => {
        const cells = row.getElementsByTagName('td');
        const match = Array.from(cells).some((cell) =>
            cell.textContent.toLowerCase().includes(filter)
        );
        row.style.display = match ? '' : 'none';
    });
});