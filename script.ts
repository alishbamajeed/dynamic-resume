// Getting references to elements
const editButton = document.getElementById('edit-btn') as HTMLButtonElement;
const resume = document.getElementById('resume') as HTMLElement;
const editableSections = ['name', 'email', 'education', 'work-experience', 'skills'];

// Function to enable content editing
function enableEditing() {
  editableSections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.contentEditable = 'true'; // Make it editable
      section.style.border = '1px solid #ccc'; // Optional: Add border to indicate editing
    }
  });

  // Change the button text to indicate save action
  editButton.textContent = 'Save Changes';
  editButton.removeEventListener('click', enableEditing);
  editButton.addEventListener('click', saveChanges);
}

// Function to save the changes
function saveChanges() {
  editableSections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.contentEditable = 'false'; // Disable editing
      section.style.border = 'none'; // Remove the border
    }
  });

  // Revert the button back to edit mode
  editButton.textContent = 'Enable Editing';
  editButton.removeEventListener('click', saveChanges);
  editButton.addEventListener('click', enableEditing);
}

// Add event listener to the edit button
editButton.addEventListener('click', enableEditing);

// Optional: Save changes when pressing Enter inside an editable field
editableSections.forEach((id) => {
  const section = document.getElementById(id);
  if (section) {
    section.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent creating new lines
        saveChanges();
      }
    });
  }
});
