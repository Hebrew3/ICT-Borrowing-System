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

// Get modal elements
const addModal = document.getElementById('addModal');
const addBtn = document.querySelector('.add-btn');
const closeBtns = document.querySelectorAll('.close');

// Show Add Modal
document.addEventListener('DOMContentLoaded', function() {
    console.log('Add button:', addBtn); // Debug log
    
    addBtn.addEventListener('click', function() {
        console.log('Add button clicked'); // Debug log
        addModal.style.display = "block";
    });

// Close Modal with X button
closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        addModal.style.display = "none";
    });
});

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == addModal) {
            addModal.style.display = "none";
        }
    });

    // Handle form submission
    const addForm = document.getElementById('addItemForm');
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const itemName = document.getElementById('itemName').value;
        const serialNo = document.getElementById('serialNo').value;
        const borrower = document.getElementById('borrower').value;
        const dateIssued = document.getElementById('dateIssued').value;
        const returnDate = document.getElementById('returnDate').value;
        const status = document.getElementById('status').value;
        const remarks = document.getElementById('remarks').value;

    // Create new table row
    const tbody = document.querySelector('.issued-items-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${serialNo}</td>
        <td>${borrower}</td>
        <td>${dateIssued}</td>
        <td>${returnDate}</td>
        <td><span class="status-borrowed">${status}</span></td>
        <td>
            <button class="return-btn"><i class="fas fa-undo"></i> Return</button>
        </td>
    `;
    
    tbody.appendChild(newRow);

        // Close modal and reset form
        addModal.style.display = "none";
        addForm.reset();
    });

    // Keep existing code and add this search functionality
    const searchInput = document.getElementById('searchInput');
    const tbody = document.querySelector('.issued-items-table tbody');
    const rows = tbody.getElementsByTagName('tr');

    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase();

        // Loop through all table rows
        for (let row of rows) {
            const cells = row.getElementsByTagName('td');
            let found = false;

            // Loop through all cells in the row
            for (let cell of cells) {
                const text = cell.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    found = true;
                    break;
                }
            }

            // Show/hide row based on search
            row.style.display = found ? '' : 'none';
        }
    });
});
