
async function getUsers() {
  try {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) throw new Error('Could not get users');

    const users = await response.json();
    
    showUsers(users.users);

    
    enableSearch(users.users);
  } catch (error) {
    console.error('Error:', error);
  }
}


function showUsers(users) {
  const container = document.getElementById('users-container');
  container.innerHTML = ''; 

  let content = '';
  for (let i = 0; i < users.length; i++) {
    content += makeUserCard(users[i]);
  }
  container.innerHTML = content; 
}


function makeUserCard(user) {
  return `
    <div class="user-card">
      <img  src="${user.image}" alt="${user.name}" class="user-image">
      
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>First Name:</strong> ${user.firstName}</p>
      <p><strong>Last Name:</strong> ${user.lastName}</p>
      <p><strong>Maiden Name:</strong> ${user.maidenName ? user.maidenName : '-'}</p>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
    </div>
  `;
}


function enableSearch(users) {
  const searchBox = document.getElementById('search-input');
  searchBox.addEventListener('input', () => {
    const searchText = searchBox.value.trim().toLowerCase();

    
    const filteredUsers = users.filter(user =>
      user.firstName.toLowerCase().includes(searchText)
    );

    
    if (searchText === '') {
      showUsers(users);
    } else {
      showUsers(filteredUsers);
    }
  });
}

getUsers();
