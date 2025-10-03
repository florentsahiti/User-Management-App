import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    hasFetched: false,
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(), 
        isNew: true, 
        addedAt: Date.now(),
      };
      state.items.unshift(newUser);
    },
    updateUser: (state, action) => {
      const index = state.items.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      state.items = state.items.filter(user => user.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.hasFetched) {
          state.items = action.payload;
          state.hasFetched = true;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setSearchQuery,
  setSortBy,
  toggleSortOrder,
} = usersSlice.actions;


export const selectAllUsers = (state) => state.users.items;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectSearchQuery = (state) => state.users.searchQuery;
export const selectSortBy = (state) => state.users.sortBy;
export const selectSortOrder = (state) => state.users.sortOrder;

export const selectFilteredAndSortedUsers = (state) => {
  const users = state.users.items;
  const searchQuery = state.users.searchQuery.toLowerCase();
  const sortBy = state.users.sortBy;
  const sortOrder = state.users.sortOrder;

  let filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(searchQuery);
    const emailMatch = user.email.toLowerCase().includes(searchQuery);
    return nameMatch || emailMatch;
  });

  filteredUsers.sort((a, b) => {
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'email':
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case 'company':
        aValue = a.company?.name?.toLowerCase() || '';
        bValue = b.company?.name?.toLowerCase() || '';
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return filteredUsers;
};

export const selectUserById = (state, userId) => {
  return state.users.items.find(user => user.id === parseInt(userId));
};

export default usersSlice.reducer;

