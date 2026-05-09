const STORAGE = {
  RECIPES: 'cuisineRecipes',
  USERS: 'cuisineUsers',
  SESSION: 'cuisineUser',
};

const state = {
  user: null,
  users: [],
  recipes: [],
  filteredRecipes: [],
  currentPage: 1,
  recipesPerPage: 12,
  currentRecipeId: null,
};

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function create(tag, attributes = {}, text = '') {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  if (text) el.textContent = text;
  return el;
}

function notify(message, type = 'success') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  const notification = create('div', { class: `notification ${type}` });
  notification.innerHTML = `<strong>${type === 'error' ? 'Error' : 'Success'}</strong><span>${message}</span>`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 4000);
}

function normalizeSelector(selector) {
  if (!selector) return null;
  if (selector.startsWith('#') || selector.startsWith('.')) return selector;
  return `#${selector}`;
}

function openModal(selector) {
  const normalized = normalizeSelector(selector);
  const modal = $(normalized);
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
  }
}

function closeModal(selector) {
  const normalized = normalizeSelector(selector);
  const modal = $(normalized);
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('open');
  }
}

function showLoginModal() {
  openModal('#login-modal');
}

function showRegisterModal() {
  openModal('#register-modal');
}

function debounce(fn, delay = 250) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function loadUsers() {
  const raw = localStorage.getItem(STORAGE.USERS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Invalid user storage', error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
}

function loadCurrentUser() {
  const raw = localStorage.getItem(STORAGE.SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Invalid current user', error);
    return null;
  }
}

function saveCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE.SESSION, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE.SESSION);
  }
}

function loadRecipes() {
  const raw = localStorage.getItem(STORAGE.RECIPES);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Invalid recipe storage', error);
    return [];
  }
}

function saveRecipes(recipes) {
  localStorage.setItem(STORAGE.RECIPES, JSON.stringify(recipes));
}

async function loadInitialRecipes() {
  const stored = loadRecipes();
  if (stored && stored.length) {
    state.recipes = stored;
    state.filteredRecipes = [...stored];
    return;
  }

  try {
    const response = await fetch('data/recipes.json');
    if (!response.ok) throw new Error('Failed to load recipe data');
    const data = await response.json();
    const recipes = Array.isArray(data) ? data : data.recipes || [];
    state.recipes = recipes.map(recipe => ({ ...recipe, id: recipe.id || `${Date.now()}_${Math.random()}` }));
    state.filteredRecipes = [...state.recipes];
    saveRecipes(state.recipes);
  } catch (error) {
    console.error('Failed to load initial recipes:', error);
    state.recipes = [];
    state.filteredRecipes = [];
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

function validateUsername(name) {
  return typeof name === 'string' && name.trim().length >= 3;
}

function findUserByEmail(email) {
  return state.users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

function updateAuthUI() {
  const loginBtn = $('#login-btn');
  const registerBtn = $('#register-btn');
  const logoutBtn = $('#logout-btn');
  const greeting = $('#user-greeting');

  if (state.user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    if (greeting) greeting.textContent = `Hello, ${state.user.username}`;
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (registerBtn) registerBtn.style.display = 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (greeting) greeting.textContent = '';
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = $('#login-email')?.value.trim() || '';
  const password = $('#login-password')?.value || '';

  if (!validateEmail(email)) {
    notify('Enter a valid email address.', 'error');
    return;
  }
  if (!validatePassword(password)) {
    notify('Password must be at least 6 characters.', 'error');
    return;
  }

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    notify('Invalid email or password.', 'error');
    return;
  }

  state.user = { username: user.username, email: user.email, favorites: user.favorites || [] };
  saveCurrentUser(state.user);
  updateAuthUI();
  closeModal('#login-modal');
  notify(`Welcome back, ${state.user.username}!`);
  if ($('#profile-section')) renderProfile();
}

function handleRegister(event) {
  event.preventDefault();
  const username = $('#reg-name')?.value.trim() || '';
  const email = $('#reg-email')?.value.trim() || '';
  const password = $('#reg-password')?.value || '';
  const confirm = $('#reg-password-confirm')?.value || '';

  if (!validateUsername(username)) {
    notify('Enter a name with at least 3 characters.', 'error');
    return;
  }
  if (!validateEmail(email)) {
    notify('Enter a valid email address.', 'error');
    return;
  }
  if (!validatePassword(password)) {
    notify('Password must be at least 6 characters.', 'error');
    return;
  }
  if (password !== confirm) {
    notify('Passwords do not match.', 'error');
    return;
  }
  if (findUserByEmail(email)) {
    notify('An account already exists with that email.', 'error');
    return;
  }

  const newUser = { username, email, password, favorites: [] };
  state.users.push(newUser);
  saveUsers(state.users);
  state.user = { username: newUser.username, email: newUser.email, favorites: [] };
  saveCurrentUser(state.user);
  updateAuthUI();
  closeModal('#register-modal');
  notify('Registration successful!');
  if ($('#profile-section')) renderProfile();
}

function logout() {
  state.user = null;
  saveCurrentUser(null);
  updateAuthUI();
  notify('Logged out successfully.', 'success');
  if ($('#profile-section')) renderProfile();
}

function applyFilters() {
  const cuisine = $('#cuisine-filter')?.value || '';
  const difficulty = $('#difficulty-filter')?.value || '';
  const maxTime = parseInt($('#max-time-filter')?.value, 10) || 0;
  const dietary = ['diet-vegan', 'diet-gluten-free', 'diet-low-carb', 'diet-vegetarian', 'diet-dairy-free']
    .map(id => $(`#${id}`)?.checked ? $(`#${id}`)?.value : null)
    .filter(Boolean);
  const searchTerm = ($('#search')?.value || '').trim().toLowerCase();
  const sortBy = $('#sort-by')?.value || 'popular';

  state.filteredRecipes = state.recipes.filter(recipe => {
    const matchesCuisine = !cuisine || recipe.cuisine === cuisine;
    const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
    const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
    const matchesTime = !maxTime || totalTime <= maxTime;
    const matchesDietary = dietary.length === 0 || (recipe.dietary || []).some(tag => dietary.includes(tag));
    const searchable = [recipe.title, recipe.description, recipe.cuisine, ...(recipe.tags || []), ...(recipe.ingredients || [])].join(' ').toLowerCase();
    const matchesSearch = !searchTerm || searchable.includes(searchTerm);
    return matchesCuisine && matchesDifficulty && matchesTime && matchesDietary && matchesSearch;
  });

  if (sortBy === 'rating') {
    state.filteredRecipes.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'newest') {
    state.filteredRecipes.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    state.filteredRecipes.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  state.currentPage = 1;
  renderRecipeGrid();
}

function clearFilters() {
  if ($('#cuisine-filter')) $('#cuisine-filter').value = '';
  if ($('#sort-by')) $('#sort-by').value = 'popular';
  if ($('#difficulty-filter')) $('#difficulty-filter').value = '';
  if ($('#max-time-filter')) $('#max-time-filter').value = '';
  ['diet-vegan', 'diet-gluten-free', 'diet-low-carb', 'diet-vegetarian', 'diet-dairy-free'].forEach(id => {
    if ($(`#${id}`)) $(`#${id}`).checked = false;
  });
  if ($('#search')) $('#search').value = '';
  state.filteredRecipes = [...state.recipes];
  state.currentPage = 1;
  renderRecipeGrid();
}

function renderRecipeGrid() {
  const container = $('#recipe-list');
  if (!container) return;

  container.innerHTML = '';
  if (!state.filteredRecipes.length) {
    container.innerHTML = '<p>No recipes found. Try a different filter or keyword.</p>';
    return;
  }

  const totalPages = Math.max(1, Math.ceil(state.filteredRecipes.length / state.recipesPerPage));
  if (state.currentPage > totalPages) state.currentPage = totalPages;
  const start = (state.currentPage - 1) * state.recipesPerPage;
  const pageRecipes = state.filteredRecipes.slice(start, start + state.recipesPerPage);

  pageRecipes.forEach(recipe => {
    const card = create('article', { class: 'recipe-card' });
    card.innerHTML = `
      <div class="recipe-card-image" style="background-image:url('${recipe.image || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80'}')"></div>
      <div class="recipe-card-body">
        <div class="recipe-meta"><span>${recipe.cuisine || 'Global'}</span><span>${(recipe.rating || 0).toFixed(1)} ⭐</span></div>
        <h3>${recipe.title}</h3>
        <p>${recipe.description || 'A delicious recipe to enjoy with friends and family.'}</p>
        <div class="chip">${(recipe.tags || []).slice(0, 3).map(tag => `<span>${tag}</span>`).join('')}</div>
        <div class="card-footer">
          <span class="tag">${recipe.servings || 'N/A'} servings</span>
          <button class="button-primary view-button" onclick="openRecipe('${recipe.id}')">View Recipe</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  const pageInfo = $('#page-info');
  if (pageInfo) pageInfo.textContent = `Page ${state.currentPage} of ${totalPages}`;
  const prevBtn = $('#prev-btn');
  const nextBtn = $('#next-btn');
  if (prevBtn) prevBtn.disabled = state.currentPage <= 1;
  if (nextBtn) nextBtn.disabled = state.currentPage >= totalPages;
}

function changePage(delta) {
  const totalPages = Math.max(1, Math.ceil(state.filteredRecipes.length / state.recipesPerPage));
  state.currentPage = Math.min(totalPages, Math.max(1, state.currentPage + delta));
  renderRecipeGrid();
}

function openRecipe(recipeId) {
  const recipe = state.recipes.find(item => item.id === recipeId);
  if (!recipe) return;
  state.currentRecipeId = recipeId;

  $('#view-title') && ($('#view-title').textContent = recipe.title);
  $('#view-cuisine') && ($('#view-cuisine').textContent = recipe.cuisine || 'Global');
  $('#view-author') && ($('#view-author').textContent = recipe.author || 'Chef');
  $('#view-rating') && ($('#view-rating').textContent = (recipe.rating || 0).toFixed(1));
  $('#view-difficulty') && ($('#view-difficulty').textContent = recipe.difficulty || 'Any');
  $('#view-dietary') && ($('#view-dietary').textContent = (recipe.dietary || []).join(', ') || 'None');
  $('#view-prep-time') && ($('#view-prep-time').textContent = recipe.prepTime || 0);
  $('#view-cook-time') && ($('#view-cook-time').textContent = recipe.cookTime || 0);
  $('#view-servings') && ($('#view-servings').textContent = recipe.servings || 0);
  $('#view-description') && ($('#view-description').textContent = recipe.description || '');
  $('#like-count') && ($('#like-count').textContent = recipe.likes || 0);

  const favoriteButton = $('#favorite-button');
  if (favoriteButton) {
    const isFav = state.user?.favorites?.includes(recipeId);
    favoriteButton.textContent = isFav ? '❤️ Favorited' : '🤍 Favorite';
  }

  const ingredientsContainer = $('#view-ingredients');
  if (ingredientsContainer) {
    ingredientsContainer.innerHTML = `<h3>Ingredients</h3><ul>${(recipe.ingredients || []).map(item => `<li>${item}</li>`).join('')}</ul>`;
  }

  const stepsContainer = $('#view-steps');
  if (stepsContainer) {
    stepsContainer.innerHTML = `<h3>Instructions</h3><ol>${(recipe.steps || []).map(step => `<li>${typeof step === 'string' ? step : step.text}</li>`).join('')}</ol>`;
  }

  const commentsList = $('#comments-list');
  if (commentsList) {
    const comments = recipe.comments || [];
    commentsList.innerHTML = comments.length
      ? comments.map(comment => `
            <div class="comment">
              <div class="author">${comment.author}</div>
              <div class="date">${formatDate(comment.date)}</div>
              <div class="content">${comment.text}</div>
            </div>
          `).join('')
      : '<p>No comments yet. Share your thoughts below!</p>';
  }

  showRecipeView();
}

function showRecipeView() {
  const view = $('#recipe-view');
  if (view) view.style.display = 'block';
  const recipesSection = $('#recipes');
  if (recipesSection) recipesSection.style.display = 'none';
}

function closeView() {
  const view = $('#recipe-view');
  if (view) view.style.display = 'none';
  const recipesSection = $('#recipes');
  if (recipesSection) recipesSection.style.display = 'block';
}

function addComment() {
  if (!state.user) {
    notify('Login first to add a comment.', 'error');
    return;
  }
  const textArea = $('#new-comment');
  const text = textArea?.value.trim() || '';
  if (!text) {
    notify('Comment cannot be empty.', 'error');
    return;
  }
  const recipe = state.recipes.find(item => item.id === state.currentRecipeId);
  if (!recipe) return;
  recipe.comments = recipe.comments || [];
  recipe.comments.push({ id: Date.now().toString(), author: state.user.username, date: new Date().toISOString(), text });
  saveRecipes(state.recipes);
  textArea.value = '';
  openRecipe(recipe.id);
  notify('Comment posted!');
}

function likeRecipe() {
  if (!state.user) {
    notify('Login to like recipes.', 'error');
    return;
  }
  const recipe = state.recipes.find(item => item.id === state.currentRecipeId);
  if (!recipe) return;
  recipe.likes = (recipe.likes || 0) + 1;
  saveRecipes(state.recipes);
  openRecipe(recipe.id);
  notify('Recipe liked!');
}

function toggleFavorite() {
  if (!state.user) {
    notify('Login to save favorites.', 'error');
    return;
  }
  const recipe = state.recipes.find(item => item.id === state.currentRecipeId);
  if (!recipe) return;
  state.user.favorites = state.user.favorites || [];
  const index = state.user.favorites.indexOf(recipe.id);
  if (index >= 0) {
    state.user.favorites.splice(index, 1);
    notify('Removed from favorites.');
  } else {
    state.user.favorites.push(recipe.id);
    notify('Added to favorites.');
  }
  saveCurrentUser(state.user);

  const userRecord = findUserByEmail(state.user.email);
  if (userRecord) {
    userRecord.favorites = state.user.favorites;
    saveUsers(state.users);
  }
  openRecipe(recipe.id);
  if ($('#profile-section')) renderProfile();
}

function submitRating(event) {
  event.preventDefault();
  if (!state.user) {
    notify('Login to rate recipes.', 'error');
    return;
  }
  const rating = parseFloat($('#rating-select')?.value);
  if (!rating || rating < 1) {
    notify('Please select a rating.', 'error');
    return;
  }
  const recipe = state.recipes.find(item => item.id === state.currentRecipeId);
  if (!recipe) return;
  recipe.rating = rating;
  saveRecipes(state.recipes);
  closeModal('#rate-modal');
  openRecipe(recipe.id);
  notify('Rating submitted!');
}

function setupUploadPage() {
  const stepsContainer = $('#steps-container');
  const addStepButton = $('#add-step');
  if (!stepsContainer || !addStepButton) return;

  function addStepField() {
    const stepIndex = stepsContainer.children.length + 1;
    const stepBlock = create('div', { class: 'step' });
    const textarea = create('textarea', { placeholder: `Step ${stepIndex} description`, required: 'true' });
    const fileInput = create('input', { type: 'file', accept: 'image/*,video/*' });
    stepBlock.appendChild(textarea);
    stepBlock.appendChild(fileInput);
    stepsContainer.appendChild(stepBlock);
  }

  if (!stepsContainer.children.length) {
    addStepField();
  }

  addStepButton.addEventListener('click', event => {
    event.preventDefault();
    addStepField();
  });

  const uploadForm = $('#upload-form');
  if (!uploadForm) return;
  uploadForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!state.user) {
      notify('Login to upload recipes.', 'error');
      return;
    }

    const title = $('#title')?.value.trim() || '';
    const description = $('#description')?.value.trim() || '';
    const imageUrl = $('#image-url')?.value.trim() || '';
    const cuisine = $('#cuisine')?.value || '';
    const difficulty = $('#difficulty')?.value || '';
    const dietary = Array.from(document.querySelectorAll('input[name="dietary"]:checked')).map(input => input.value);
    const ingredientText = $('#ingredients')?.value.trim() || '';
    const prepTime = parseInt($('#prep-time')?.value, 10);
    const cookTime = parseInt($('#cook-time')?.value, 10);
    const servings = parseInt($('#servings')?.value, 10);
    const tags = ($('#tags')?.value || '').split(',').map(tag => tag.trim()).filter(Boolean);

    if (!title || !description || !cuisine || !difficulty || !ingredientText || !prepTime || !cookTime || !servings) {
      notify('Please complete all required fields.', 'error');
      return;
    }

    const ingredients = ingredientText.split('\n').map(line => line.trim()).filter(Boolean);
    const stepBlocks = Array.from(stepsContainer.querySelectorAll('.step'));
    if (!stepBlocks.length) {
      notify('Add at least one step.', 'error');
      return;
    }

    const steps = [];
    for (const stepBlock of stepBlocks) {
      const text = stepBlock.querySelector('textarea')?.value.trim() || '';
      if (!text) {
        notify('Fill every step description.', 'error');
        return;
      }
      const fileInput = stepBlock.querySelector('input[type=file]');
      let media = null;
      if (fileInput?.files?.length) {
        media = await fileToDataURL(fileInput.files[0]);
      }
      steps.push({ text, media });
    }

    const recipe = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title,
      description,
      cuisine,
      difficulty,
      dietary,
      author: state.user.username,
      rating: 0,
      likes: 0,
      servings,
      prepTime,
      cookTime,
      image: imageUrl || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80',
      ingredients,
      steps,
      tags,
      comments: [],
      date: new Date().toISOString(),
    };

    state.recipes.unshift(recipe);
    saveRecipes(state.recipes);
    notify('Recipe uploaded successfully! Redirecting...', 'success');
    setTimeout(() => { window.location.href = 'index.html'; }, 900);
  });
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderProfile() {
  const profileUsername = $('#profile-username');
  const profileEmail = $('#profile-email');
  const profileRecipesCount = $('#profile-recipes-count');
  const myRecipesContainer = $('#my-recipes');
  const favoritesContainer = $('#my-favorites');

  if (!state.user) {
    if (profileUsername) profileUsername.textContent = 'Guest';
    if (profileEmail) profileEmail.textContent = 'Not logged in';
    if (profileRecipesCount) profileRecipesCount.textContent = '0';
    if (myRecipesContainer) myRecipesContainer.innerHTML = '<p>Please log in to manage your recipes.</p>';
    if (favoritesContainer) favoritesContainer.innerHTML = '<p>Favorites will appear here after you add them.</p>';
    return;
  }

  const myRecipes = state.recipes.filter(recipe => recipe.author === state.user.username);
  if (profileUsername) profileUsername.textContent = state.user.username;
  if (profileEmail) profileEmail.textContent = state.user.email;
  if (profileRecipesCount) profileRecipesCount.textContent = myRecipes.length;

  if (myRecipesContainer) {
    myRecipesContainer.innerHTML = myRecipes.length
      ? myRecipes.map(recipe => `
          <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <div class="card-footer">
              <button class="button-secondary" onclick="openRecipe('${recipe.id}')">View</button>
              <button class="button-secondary" onclick="deleteRecipe('${recipe.id}')">Delete</button>
            </div>
          </div>`).join('')
      : '<p>You have not uploaded any recipes yet.</p>';
  }

  if (favoritesContainer) {
    const favoriteIds = state.user.favorites || [];
    favoritesContainer.innerHTML = favoriteIds.length
      ? favoriteIds.map(id => {
          const recipe = state.recipes.find(item => item.id === id);
          return recipe ? `
            <div class="recipe-card">
              <h3>${recipe.title}</h3>
              <p>${recipe.description}</p>
              <div class="card-footer">
                <button class="button-secondary" onclick="openRecipe('${recipe.id}')">View</button>
              </div>
            </div>` : '';
        }).join('')
      : '<p>No favorites yet. Mark recipes as favorites to save them here.</p>';
  }
}

function deleteRecipe(recipeId) { 
  if (!state.user) {
    notify('Login first to delete recipes.', 'error');
    return;
  }

  const recipe = state.recipes.find(item => item.id === recipeId);
  if (!recipe) return;
  if (recipe.author !== state.user.username) {
    notify('You can only delete your own recipes.', 'error');
    return;
  }

  if (!confirm('Delete this recipe? This cannot be undone.')) return;
  state.recipes = state.recipes.filter(item => item.id !== recipeId);
  saveRecipes(state.recipes);
  notify('Recipe deleted.');
  if ($('#my-recipes')) renderProfile();
  if ($('#recipe-list')) applyFilters();
}

function setupContactPage() {
  const contactForm = $('#contact-form');
  if (!contactForm) return;
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    notify('Thanks for reaching out! Your message has been received.', 'success');
    contactForm.reset();
  });
}

function bindFormHandlers() {
  if ($('#login-form')) $('#login-form').addEventListener('submit', handleLogin);
  if ($('#register-form')) $('#register-form').addEventListener('submit', handleRegister);
  if ($('#rate-modal')) {
    const rateForm = $('#rate-modal').querySelector('form');
    if (rateForm) rateForm.addEventListener('submit', submitRating);
  }

  $$('.modal').forEach(modal => {
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeModal(`#${modal.id}`);
      }
    });
  });
}

function init() {
  state.users = loadUsers();
  state.user = loadCurrentUser();
  updateAuthUI();
  bindFormHandlers();

  const path = window.location.pathname.split('/').pop() || 'index.html';

  loadInitialRecipes().then(() => {
    if (path === 'index.html' || path === '') {
      if ($('#search')) $('#search').addEventListener('input', debounce(applyFilters, 300));
      if ($('#cuisine-filter')) $('#cuisine-filter').addEventListener('change', applyFilters);
      if ($('#sort-by')) $('#sort-by').addEventListener('change', applyFilters);
      if ($('#prev-btn')) $('#prev-btn').addEventListener('click', () => changePage(-1));
      if ($('#next-btn')) $('#next-btn').addEventListener('click', () => changePage(1));
      state.filteredRecipes = [...state.recipes];
      renderRecipeGrid();
    }
    if (path === 'upload.html') {
      setupUploadPage();
    }
    if (path === 'profile.html') {
      renderProfile();
    }
    if (path === 'contact.html') {
      setupContactPage();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
