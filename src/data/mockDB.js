// In-memory mock database using localStorage for persistence across reloads.

const initialUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Eco',
    email: 'demo@ecofinds.com',
    username: 'johndoe',
    password: 'demo123', // Storing plaintext password for mock purposes
    displayName: 'John Eco',
    phone: '123-456-7890',
    bio: 'Eco-conscious shopper and seller. Love finding unique sustainable items!',
    shippingAddress: '123 Green Way, Eco City, 12345',
    location: { lat: 51.505, lng: -0.09 },
    preferences: {
      ecoShipping: true,
      newsletter: false,
      saveSearches: true,
    },
  },
];

const initializeDB = () => {
  const users = localStorage.getItem('ecofinds_users');
  if (!users) {
    localStorage.setItem('ecofinds_users', JSON.stringify(initialUsers));
  }
};

initializeDB();

const db = {
  users: {
    getAll: () => {
      return JSON.parse(localStorage.getItem('ecofinds_users')) || [];
    },
    findByEmail: (email) => {
      const users = db.users.getAll();
      return users.find(user => user.email === email || user.username === email);
    },
    findById: (id) => {
      const users = db.users.getAll();
      return users.find(user => user.id === id);
    },
    create: (userData) => {
      const users = db.users.getAll();
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...userData,
      };
      users.push(newUser);
      localStorage.setItem('ecofinds_users', JSON.stringify(users));
      return newUser;
    },
    update: (id, updateData) => {
      let users = db.users.getAll();
      let userToUpdate;
      users = users.map(user => {
        if (user.id === id) {
          userToUpdate = { ...user, ...updateData };
          return userToUpdate;
        }
        return user;
      });
      localStorage.setItem('ecofinds_users', JSON.stringify(users));
      return userToUpdate;
    }
  },
};

export default db;
