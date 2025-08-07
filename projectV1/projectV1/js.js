'use strict'
const contacts = [
  {
    name: "Clara Klein",
    phone: "050-123-4567",
    email: "clara@gmail.com",
    img: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Sagit Sason",
    phone: "052-888-4321",
    email: "sagit@gmail.com",
    img: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Jamesa Blonda",
    phone: "053-222-9876",
    email: "jamesa@gmail.com",
    img: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    name: "George Washington",
    phone: "054-456-7890",
    email: "george@gmail.com",
    img: "https://randomuser.me/api/portraits/women/4.jpg"
  }
];

const searchInput = document.getElementById('search-input');
const contactsList = document.querySelector('.contacts-list');
const popup = document.querySelector('.popup');
const nameText = popup.querySelector('.name');
const phoneText = popup.querySelector('.phone');
const emailText = popup.querySelector('.email');

function renderContacts(filteredContacts = contacts) {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
  contactsList.innerHTML = '';
  filteredContacts.forEach((contact, index) => {
    const card = document.createElement('div');
    card.className = 'contact-card';
    card.dataset.index = index;
    card.innerHTML = `
      <img src="${contact.img}" alt="${contact.name}" />
      <span class="contact-name">${contact.name}</span>
      <div class="actions">
        <i class="fas fa-info-circle" data-action="info"></i>
        <i class="fas fa-edit" data-action="edit"></i>
        <i class="fas fa-trash-alt" data-action="delete"></i>
      </div>
    `;
    contactsList.appendChild(card);
  });
}
searchInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm)
  );
  renderContacts(filtered);
});
contactsList.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  const card = e.target.closest('.contact-card');
  if (!action || !card) return;

  const index = card.dataset.index;
  const contact = contacts[index];

  if (action === 'info') {
    nameText.conten
    nameText.innerHTML = `<strong>Name:</strong> ${contact.name}`;
    phoneText.innerHTML = `<strong>Phone:</strong> ${contact.phone}`;
    emailText.innerHTML = `<strong>Email:</strong> ${contact.email}`;
    popup.classList.add('active');
  }

  if (action === 'edit') {
    const newName = prompt("New name:", contact.name);
    const newPhone = prompt("New phone:", contact.phone);
    const newEmail = prompt("New email:", contact.email);
    if (newName && newPhone && newEmail) {
      contacts[index] = { ...contact, name: newName, phone: newPhone, email: newEmail };
      renderContacts();
    }
  }

  if (action === 'delete') {
    if (confirm(`Delete ${contact.name}?`)) {
      contacts.splice(index, 1);
      renderContacts();
    }
  }
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.remove('active');
  }
});

renderContacts();
const addBtn = document.getElementById('addContactBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');


addBtn.addEventListener('click', () => {
  const name = prompt("Enter name:");
  const phone = prompt("Enter phone:");
  const email = prompt("Enter email:");
  const img = prompt("Enter image URL:", "https://randomuser.me/api/portraits/women/5.jpg");

  if (!name || !phone || !email || !img) return;

  const exists = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());

  if (exists) {
    alert("There is already a contact with this name!");
    return;
  }

  contacts.push({ name, phone, email, img });
  renderContacts();
});


deleteAllBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete ALL contacts?")) {
    contacts.length = 0; 
    renderContacts();
  }
});
contactsList.addEventListener('mouseover', (e) => {
  const card = e.target.closest('.contact-card');
  if (!card) return;
  card.classList.add('hovered');
});

contactsList.addEventListener('mouseout', (e) => {
  const card = e.target.closest('.contact-card');
  if (!card) return;
  card.classList.remove('hovered');
});