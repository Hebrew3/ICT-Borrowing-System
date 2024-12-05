// Function to handle dropdown toggles
function toggleDropdown(dropdownId) {
    // Get all dropdown contents
    const dropdowns = document.getElementsByClassName('dropdown-content');
    
    // Close all dropdowns first
    for (let dropdown of dropdowns) {
        if (dropdown.id !== dropdownId + '-dropdown') {
            dropdown.classList.remove('show');
        }
    }
    
    // Toggle the selected dropdown
    const selectedDropdown = document.getElementById(dropdownId + '-dropdown');
    if (selectedDropdown) {
        selectedDropdown.classList.toggle('show');
    }
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn') && 
        !event.target.matches('.dropdown-icon')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
}

// Add active class to current menu item
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.menu-links a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
  