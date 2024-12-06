// Modal functionality
const addModal = document.getElementById('addMemberModal');
const editModal = document.getElementById('editMemberModal');
const addBtn = document.getElementById('addMemberBtn');
const closeBtns = document.getElementsByClassName('close');

// Add Member button click
addBtn.onclick = function() {
    addModal.style.display = "block";
}

// Close button functionality
Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        addModal.style.display = "none";
        editModal.style.display = "none";
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == addModal || event.target == editModal) {
        addModal.style.display = "none";
        editModal.style.display = "none";
    }
}

// Add Member Form Submit
document.getElementById('addMemberForm').onsubmit = function(e) {
    e.preventDefault();
    
    const tbody = document.querySelector('.table tbody');
    const rowCount = tbody.rows.length + 1;
    
    const newRow = tbody.insertRow();
    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>${document.getElementById('memberId').value}</td>
        <td>${document.getElementById('fullName').value}</td>
        <td>${document.getElementById('contact').value}</td>
        <td>${document.getElementById('email').value}</td>
        <td>${document.getElementById('department').value}</td>
        <td><span class="status-${document.getElementById('status').value}">${document.getElementById('status').value}</span></td>
        <td class="actions">
            <button class="action-btn edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete"><i class="fas fa-trash"></i></button>
        </td>
    `;
    
    this.reset();
    addModal.style.display = "none";
    
    // Reattach event listeners to new buttons
    attachActionListeners();
};

// Edit Member Form Submit
document.getElementById('editMemberForm').onsubmit = function(e) {
    e.preventDefault();
    
    const rowIndex = document.getElementById('editRowIndex').value;
    const row = document.querySelector('.table tbody').rows[rowIndex];
    
    row.cells[1].textContent = document.getElementById('editMemberId').value;
    row.cells[2].textContent = document.getElementById('editFullName').value;
    row.cells[3].textContent = document.getElementById('editContact').value;
    row.cells[4].textContent = document.getElementById('editEmail').value;
    row.cells[5].textContent = document.getElementById('editDepartment').value;
    row.cells[6].innerHTML = `<span class="status-${document.getElementById('editStatus').value}">${document.getElementById('editStatus').value}</span>`;
    
    editModal.style.display = "none";
};

// Attach event listeners to action buttons
function attachActionListeners() {
    // Edit buttons
    document.querySelectorAll('.action-btn.edit').forEach((btn, index) => {
        btn.onclick = function() {
            const row = this.closest('tr');
            document.getElementById('editRowIndex').value = index;
            document.getElementById('editMemberId').value = row.cells[1].textContent;
            document.getElementById('editFullName').value = row.cells[2].textContent;
            document.getElementById('editContact').value = row.cells[3].textContent;
            document.getElementById('editEmail').value = row.cells[4].textContent;
            document.getElementById('editDepartment').value = row.cells[5].textContent;
            document.getElementById('editStatus').value = row.cells[6].querySelector('span').textContent.toLowerCase();
            
            editModal.style.display = "block";
        };
    });

    // Delete buttons
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.onclick = function() {
            if (confirm('Are you sure you want to delete this member?')) {
                this.closest('tr').remove();
            }
        };
    });
}

// Initial attachment of event listeners
attachActionListeners();

// Dropdown functionality
function toggleDropdown(id) {
    const dropdown = document.getElementById(id + '-dropdown');
    const allDropdowns = document.getElementsByClassName('dropdown-content');
    const icon = event.currentTarget.querySelector('.dropdown-icon');
    
    // Close all other dropdowns first
    Array.from(allDropdowns).forEach(function(dropdown) {
        if (dropdown.id !== id + '-dropdown' && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            const otherIcon = dropdown.previousElementSibling.querySelector('.dropdown-icon');
            if (otherIcon) {
                otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Toggle the clicked dropdown
    dropdown.classList.toggle('show');
    
    // Rotate the icon
    if (icon) {
        icon.style.transform = dropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-icon')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        const icons = document.getElementsByClassName('dropdown-icon');
        
        Array.from(dropdowns).forEach(function(dropdown) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
        
        Array.from(icons).forEach(function(icon) {
            icon.style.transform = 'rotate(0deg)';
        });
    }
}
