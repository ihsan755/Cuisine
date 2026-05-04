from pathlib import Path
import json
import uuid

base = Path(r'c:/Users/ihsan/Documents/cuisine-app')

styles = '''/* Cuisine App - Modern Simple Design */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --bg: #f7f2e8;
  --panel: #ffffff;
  --panel-strong: #ece0cb;
  --text: #2c2116;
  --muted: #6d5a45;
  --accent: #6f4e37;
  --accent-soft: #d4c4b0;
  --border: rgba(108, 80, 58, 0.15);
  --shadow: 0 18px 45px rgba(111, 78, 55, 0.08);
  --radius: 22px;
  --radius-sm: 14px;
  --gap: 24px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  border: none;
  cursor: pointer;
}

img,
video {
  max-width: 100%;
  display: block;
}

.page-shell {
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: 32px 28px 64px;
}

.header-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 24px 28px;
  margin-bottom: 32px;
  border-radius: var(--radius);
  background: rgba(255,255,255,0.88);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 18px;
}

.brand-logo {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: white;
  font-size: 24px;
}

.brand-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-title h1 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.03em;
}

.brand-title p {
  margin: 0;
  color: var(--muted);
  font-size: 0.98rem;
}

nav.header-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

nav.header-nav a {
  color: var(--muted);
  padding: 12px 16px;
  border-radius: 14px;
  transition: background 0.25s ease, color 0.25s ease;
}

nav.header-nav a:hover,
nav.header-nav a.active {
  background: rgba(111, 78, 55, 0.1);
  color: var(--accent);
}

.user-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.user-actions button,
.user-actions a {
  border-radius: 999px;
  padding: 12px 20px;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.user-actions button:hover,
.user-actions a:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: var(--accent);
  color: white;
  box-shadow: 0 12px 30px rgba(111, 78, 55, 0.12);
}

.button-secondary {
  background: rgba(111, 78, 55, 0.08);
  color: var(--text);
}

.sections {
  display: grid;
  gap: 32px;
}

.hero-card,
.card,
.panel {
  background: white;
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.hero-card {
  display: grid;
  gap: 24px;
}

.hero-card h2 {
  margin: 0;
  font-size: clamp(2.6rem, 3vw, 4rem);
  line-height: 1.02;
}

.hero-card p {
  margin: 0;
  color: var(--muted);
  font-size: 1.05rem;
  max-width: 760px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.feature-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.feature-header h2 {
  margin: 0;
  font-size: 2rem;
}

.feature-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-panel {
  display: grid;
  gap: 16px;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.filter-row label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--muted);
}

.filter-row input,
.filter-row select {
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--bg);
  padding: 14px 16px;
  color: var(--text);
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.recipe-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.recipe-card img {
  border-radius: 18px;
  height: 220px;
  object-fit: cover;
}

.recipe-card .recipe-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 0.95rem;
}

.recipe-card h3 {
  margin: 0;
  font-size: 1.3rem;
}

.recipe-card p {
  margin: 0;
  color: var(--muted);
  min-height: 56px;
}

.recipe-card .chip {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.chip span {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
}

.recipe-card .card-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.card-footer .tag {
  color: var(--muted);
}

.card-footer .view-button {
  min-width: 120px;
}

.recipe-view,
.profile-panel,
.upload-panel,
.contact-panel,
.about-panel {
  display: grid;
  gap: 24px;
}

.recipe-view .view-inner {
  display: grid;
  gap: 18px;
}

.recipe-view h2 {
  margin: 0;
  font-size: 2.4rem;
}

.recipe-view .recipe-details {
  display: grid;
  gap: 16px;
}

.recipe-view .meta-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.recipe-view .meta-grid div {
  background: var(--bg);
  border-radius: 18px;
  padding: 16px;
  color: var(--muted);
}

.recipe-view .list-block {
  display: grid;
  gap: 12px;
}

.recipe-view .list-block h3 {
  margin: 0;
  font-size: 1.15rem;
}

.recipe-view .list-block ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.recipe-view .list-block li {
  background: var(--bg);
  border-radius: 14px;
  padding: 14px 16px;
  color: var(--text);
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.action-buttons button {
  min-width: 120px;
  border-radius: 999px;
}

.form-card {
  display: grid;
  gap: 18px;
}

.form-card label {
  font-size: 0.95rem;
  color: var(--muted);
  font-weight: 600;
}

.form-card input,
.form-card textarea,
.form-card select {
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--bg);
  padding: 16px;
  color: var(--text);
}

.form-card textarea {
  min-height: 150px;
}

.field-group {
  display: grid;
  gap: 14px;
}

.email-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.email-links a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(111, 78, 55, 0.08);
  color: var(--accent);
  font-weight: 600;
}

.modal {
  position: fixed;
  inset: 0;
  display: none;
  justify-content: center;
  align-items: center;
  padding: 28px;
  background: rgba(33, 22, 13, 0.32);
  z-index: 1000;
}

.modal.open {
  display: flex;
}

.modal-panel {
  width: min(520px, 100%);
  background: white;
  border-radius: 32px;
  padding: 32px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  position: relative;
}

.modal-close {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--bg);
  cursor: pointer;
  color: var(--muted);
  font-size: 24px;
}

.modal-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 28px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.8rem;
}

.notification {
  position: fixed;
  right: 28px;
  bottom: 28px;
  background: white;
  color: var(--text);
  border-radius: 18px;
  padding: 18px 22px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  z-index: 1200;
  min-width: 240px;
}

.notification.success {
  border-color: rgba(81, 148, 98, 0.25);
}

.notification.error {
  border-color: rgba(173, 47, 47, 0.25);
}

.notification strong {
  display: block;
  margin-bottom: 6px;
}

footer.site-footer {
  margin-top: 48px;
  border-top: 1px solid rgba(108, 80, 58, 0.12);
  padding: 34px 0 18px;
  color: var(--muted);
  text-align: center;
}

footer.site-footer a {
  color: var(--accent);
}

@media (max-width: 960px) {
  .header-bar,
  .hero-card,
  .card,
  .panel {
    padding: 24px;
  }

  .page-shell {
    padding: 24px 20px 48px;
  }
}

@media (max-width: 720px) {
  .header-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-row {
    grid-template-columns: 1fr;
  }

  .meta-grid {
    grid-template-columns: 1fr;
  }

  .recipe-card .card-footer {
    flex-direction: column;
    align-items: stretch;
  }
}
'''
base.joinpath('styles.css').write_text(styles, encoding='utf-8')

script = '''// Main app script for Cuisine
const apiBase = '/api';
let currentUser = null;
let recipes = [];
let currentRecipe = null;
let currentPage = 1;
const recipesPerPage = 12;

const emailProviders = [
  { name: 'Gmail', url: 'https://mail.google.com' },
  { name: 'Yahoo', url: 'https://mail.yahoo.com' },
  { name: 'Outlook', url: 'https://outlook.live.com' }
];

function query(selector) {
  return document.querySelector(selector);
}

function queryAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function show(element) {
  if (!element) return;
  element.style.display = '';
}

function hide(element) {
  if (!element) return;
  element.style.display = 'none';
}

function setText(selector, text) {
  const el = query(selector);
  if (el) el.textContent = text;
}

function setHTML(selector, html) {
  const el = query(selector);
  if (el) el.innerHTML = html;
}

function create(tag, props = {}) {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'class') el.className = value;
    else if (key === 'text') el.textContent = value;
    else if (key === 'html') el.innerHTML = value;
    else el.setAttribute(key, value);
  });
  return el;
}

function toast(message, type = 'success') {
  const existing = query('.notification');
  if (existing) existing.remove();
  const note = create('div', { class: `notification ${type}` });
  note.innerHTML = `<strong>${type === 'error' ? 'Error' : 'Success'}</strong><span>${message}</span>`;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3800);
}

function openModal(modalId) {
  const modal = query(`#${modalId}`);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = query(`#${modalId}`);
  if (modal) modal.classList.remove('open');
}

function addEmailLinks(containerId) {
  const container = query(containerId);
  if (!container) return;
  const wrapper = create('div', { class: 'email-links' });
  emailProviders.forEach(provider => {
    const link = create('a', { href: provider.url, target: '_blank', rel: 'noreferrer' });
    link.textContent = provider.name;
    wrapper.appendChild(link);
  });
  container.appendChild(wrapper);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPageName() {
  const path = window.location.pathname.split('/').pop();
  return path || 'index.html';
}

function loadUser() {
  const saved = localStorage.getItem('cuisineUser');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
    } catch (error) {
      currentUser = null;
    }
  }
  updateAuthUI();
}

function saveUser() {
  if (currentUser) {
    localStorage.setItem('cuisineUser', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('cuisineUser');
  }
}

function updateAuthUI() {
  const greeting = query('#user-greeting');
  const loginBtn = query('#login-btn');
  const registerBtn = query('#register-btn');
  const logoutBtn = query('#logout-btn');
  if (currentUser) {
    if (greeting) greeting.textContent = `Signed in as ${currentUser.email}`;
    if (loginBtn) hide(loginBtn);
    if (registerBtn) hide(registerBtn);
    if (logoutBtn) show(logoutBtn);
  } else {
    if (greeting) greeting.textContent = '';
    if (loginBtn) show(loginBtn);
    if (registerBtn) show(registerBtn);
    if (logoutBtn) hide(logoutBtn);
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = query('#login-email')?.value.trim();
  const password = query('#login-password')?.value || '';
  if (!validateEmail(email)) {
    toast('Enter a valid email address.', 'error');
    return;
  }
  if (password.length < 6) {
    toast('Password must be at least 6 characters.', 'error');
    return;
  }
  fetch(`${apiBase}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        currentUser = data.user;
        saveUser();
        updateAuthUI();
        closeModal('login-modal');
        toast('Logged in successfully.');
      } else {
        toast(data.message || 'Login failed.', 'error');
      }
    })
    .catch(() => toast('Login failed. Please try again later.', 'error'));
}

function handleRegister(event) {
  event.preventDefault();
  const name = query('#reg-name')?.value.trim();
  const email = query('#reg-email')?.value.trim();
  const password = query('#reg-password')?.value || '';
  const confirm = query('#reg-password-confirm')?.value || '';
  if (!name) {
    toast('Enter your full name.', 'error');
    return;
  }
  if (!validateEmail(email)) {
    toast('Enter a valid email address.', 'error');
    return;
  }
  if (password.length < 6) {
    toast('Password must be at least 6 characters.', 'error');
    return;
  }
  if (password !== confirm) {
    toast('Passwords do not match.', 'error');
    return;
  }
  fetch(`${apiBase}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: name, email, password })
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        currentUser = data.user;
        saveUser();
        updateAuthUI();
        closeModal('register-modal');
        toast('Registered successfully.');
      } else {
        toast(data.message || 'Registration failed.', 'error');
      }
    })
    .catch(() => toast('Registration failed. Please try later.', 'error'));
}

function logout() {
  currentUser = null;
  saveUser();
  updateAuthUI();
  toast('You have been logged out.');
}

function fetchRecipes() {
  return fetch(`${apiBase}/recipes`)
    .then(res => res.json())
    .then(data => {
      recipes = Array.isArray(data.recipes) ? data.recipes : [];
      recipes.forEach(recipe => {
        if (!recipe.tags || !Array.isArray(recipe.tags)) {
          recipe.tags = [];
        }
      });
      return recipes;
    })
    .catch(() => {
      toast('Could not load recipes from server. Using local samples.', 'error');
      return [];
    });
}

function buildRecipeCard(recipe) {
  const card = create('article', { class: 'recipe-card' });
  card.innerHTML = `
    <img src="${recipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80'}" alt="${recipe.title}">
    <div>
      <div class="recipe-meta">
        <span>${recipe.cuisine}</span>
        <span>${recipe.rating?.toFixed(1) || '0.0'} ⭐</span>
      </div>
      <h3>${recipe.title}</h3>
      <p>${recipe.description || 'A delicious recipe from our global community.'}</p>
      <div class="chip">${(recipe.tags || []).slice(0, 4).map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="card-footer">
        <span class="tag">${recipe.servings || 1} servings · ${recipe.cookTime || 0} min</span>
        <button class="button-primary view-button" data-id="${recipe.id}">View</button>
      </div>
    </div>
  `;
  const viewBtn = card.querySelector('.view-button');
  if (viewBtn) {
    viewBtn.addEventListener('click', () => openRecipe(recipe.id));
  }
  return card;
}

function renderRecipeGrid(recipeList) {
  const container = query('#recipe-list');
  if (!container) return;
  container.innerHTML = '';
  if (!recipeList.length) {
    container.innerHTML = '<p class="panel">No recipes match your filters. Try a different keyword or dietary option.</p>';
    setText('#page-info', '0 recipes');
    return;
  }
  const start = (currentPage - 1) * recipesPerPage;
  const pageRecipes = recipeList.slice(start, start + recipesPerPage);
  pageRecipes.forEach(recipe => container.appendChild(buildRecipeCard(recipe)));
  const pageCount = Math.ceil(recipeList.length / recipesPerPage);
  setText('#page-info', `Page ${currentPage} of ${pageCount}`);
  query('#prev-btn')?.toggleAttribute('disabled', currentPage <= 1);
  query('#next-btn')?.toggleAttribute('disabled', currentPage >= pageCount);
}

function searchAndFilter() {
  const cuisine = query('#cuisine-filter')?.value || '';
  const diet = query('#diet-filter')?.value || '';
  const keyword = query('#search')?.value.trim().toLowerCase() || '';
  let result = recipes.slice();
  if (cuisine) {
    result = result.filter(recipe => recipe.cuisine?.toLowerCase() === cuisine.toLowerCase());
  }
  if (diet) {
    result = result.filter(recipe => (recipe.tags || []).some(tag => tag.toLowerCase().includes(diet.toLowerCase())));
  }
  if (keyword) {
    result = result.filter(recipe => {
      return [recipe.title, recipe.description, recipe.cuisine, ...(recipe.tags || [])]
        .filter(Boolean)
        .some(value => value.toLowerCase().includes(keyword));
    });
  }
  currentPage = 1;
  renderRecipeGrid(result);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    searchAndFilter();
  }
}

function nextPage() {
  currentPage += 1;
  searchAndFilter();
}

function openRecipe(recipeId) {
  const recipe = recipes.find(item => item.id === recipeId);
  if (!recipe) return;
  currentRecipe = recipe;
  const view = query('#recipe-view');
  if (!view) return;
  setText('#view-title', recipe.title);
  setText('#view-cuisine', recipe.cuisine || 'Global');
  setText('#view-author', recipe.author || recipe.username || 'Cuisine Community');
  setText('#view-rating', (recipe.rating || 0).toFixed(1));
  setText('#view-prep-time', recipe.prepTime || 0);
  setText('#view-cook-time', recipe.cookTime || 0);
  setText('#view-servings', recipe.servings || 1);
  setText('#view-description', recipe.description || 'No description provided.');
  const ingredientsList = query('#view-ingredients');
  const stepsList = query('#view-steps');
  if (ingredientsList) {
    ingredientsList.innerHTML = '<h3>Ingredients</h3><ul>' + (recipe.ingredients || []).map(item => `<li>${item}</li>`).join('') + '</ul>';
  }
  if (stepsList) {
    stepsList.innerHTML = '<h3>Instructions</h3><ol>' + (recipe.steps || []).map(step => `<li>${step.text || step}</li>`).join('') + '</ol>';
  }
  const commentsList = query('#comments-list');
  if (commentsList) {
    commentsList.innerHTML = (recipe.comments || []).map(comment => `<div class="comment"><strong>${comment.author}</strong><p>${comment.text}</p><small>${comment.date ? new Date(comment.date).toLocaleDateString() : ''}</small></div>`).join('');
  }
  setText('#like-count', recipe.likes || 0);
  view.style.display = 'block';
  view.scrollIntoView({ behavior: 'smooth' });
}

function closeView() {
  const view = query('#recipe-view');
  if (view) view.style.display = 'none';
  currentRecipe = null;
}

function addComment() {
  if (!currentUser) {
    toast('Please login to add comments.', 'error');
    return;
  }
  const text = query('#new-comment')?.value.trim();
  if (!text) {
    toast('Enter a comment first.', 'error');
    return;
  }
  const recipeId = currentRecipe?.id;
  if (!recipeId) return;
  fetch(`${apiBase}/recipes/${recipeId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, author: currentUser.username || currentUser.email })
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        toast('Comment posted.');
        query('#new-comment').value = '';
        fetchRecipes().then(searchAndFilter);
      } else {
        toast(data.message || 'Unable to post comment.', 'error');
      }
    })
    .catch(() => toast('Unable to post comment right now.', 'error'));
}

function setupUploadForm() {
  const form = query('#upload-form');
  const addStepBtn = query('#add-step');
  const stepsContainer = query('#steps-container');
  if (!form || !addStepBtn || !stepsContainer) return;
  addStepBtn.addEventListener('click', () => {
    const stepCount = stepsContainer.querySelectorAll('.step-row').length + 1;
    const row = create('div', { class: 'step-row' });
    row.innerHTML = `
      <textarea placeholder="Step ${stepCount} description" required></textarea>
      <input type="file" accept="image/*,video/*">
    `;
    stepsContainer.appendChild(row);
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!currentUser) {
      toast('Login to upload your recipe.', 'error');
      return;
    }
    const title = query('#title')?.value.trim();
    const description = query('#description')?.value.trim();
    const cuisine = query('#cuisine')?.value.trim();
    const ingredients = query('#ingredients')?.value.split('\n').map(item => item.trim()).filter(Boolean);
    const prepTime = Number(query('#prep-time')?.value) || 0;
    const cookTime = Number(query('#cook-time')?.value) || 0;
    const servings = Number(query('#servings')?.value) || 1;
    const tags = query('#tags')?.value.split(',').map(tag => tag.trim()).filter(Boolean);
    const steps = Array.from(stepsContainer.querySelectorAll('textarea')).map((textarea, index) => ({ text: textarea.value.trim() || `Step ${index + 1}` }));
    if (!title || !description || !cuisine || !ingredients.length || !steps.length) {
      toast('Please fill in all required upload fields.', 'error');
      return;
    }
    fetch(`${apiBase}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        cuisine,
        ingredients,
        prepTime,
        cookTime,
        servings,
        tags,
        steps,
        author: currentUser.username || currentUser.email
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          toast('Recipe uploaded successfully.');
          form.reset();
          stepsContainer.innerHTML = `
            <div class="step-row">
              <textarea placeholder="Step 1 description" required></textarea>
              <input type="file" accept="image/*,video/*">
            </div>`;
        } else {
          toast(data.message || 'Upload failed.', 'error');
        }
      })
      .catch(() => toast('Upload failed. Please try later.', 'error'));
  });
}

function loadProfilePage() {
  const profileInfo = query('#profile-info');
  const recipesList = query('#my-recipes');
  const favoritesList = query('#my-favorites');
  if (!profileInfo || !recipesList || !favoritesList) return;
  if (!currentUser) {
    profileInfo.innerHTML = '<p>Please login to view your profile.</p>';
    recipesList.innerHTML = '';
    favoritesList.innerHTML = '';
    return;
  }
  const userRecipes = recipes.filter(recipe => (recipe.author || '').toLowerCase() === (currentUser.username || currentUser.email || '').toLowerCase());
  profileInfo.innerHTML = `
    <p><strong>Name:</strong> ${currentUser.username || 'Chef'}</p>
    <p><strong>Email:</strong> ${currentUser.email}</p>
    <p><strong>Recipes shared:</strong> ${userRecipes.length}</p>
  `;
  recipesList.innerHTML = userRecipes.length ? userRecipes.map(recipe => `<div class="panel"><strong>${recipe.title}</strong><p>${recipe.cuisine}</p></div>`).join('') : '<p class="panel">You have not uploaded recipes yet.</p>';
  const popular = recipes.slice(0, 4);
  favoritesList.innerHTML = popular.map(recipe => `<div class="panel"><strong>${recipe.title}</strong><p>${recipe.cuisine}</p></div>`).join('');
}

function setupContactPage() {
  const form = query('#contact-form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = query('#contact-name')?.value.trim();
    const email = query('#contact-email')?.value.trim();
    const subject = query('#contact-subject')?.value.trim();
    const message = query('#contact-message')?.value.trim();
    if (!name || !validateEmail(email) || !subject || !message) {
      toast('Please complete all contact fields.', 'error');
      return;
    }
    toast('Message sent! We will reply by email soon.');
    form.reset();
  });
}

function setupPage() {
  loadUser();
  addEmailLinks('#login-providers');
  addEmailLinks('#register-providers');
  query('#login-form')?.addEventListener('submit', handleLogin);
  query('#register-form')?.addEventListener('submit', handleRegister);
  query('#logout-btn')?.addEventListener('click', logout);
  query('#prev-btn')?.addEventListener('click', prevPage);
  query('#next-btn')?.addEventListener('click', nextPage);
  query('#search')?.addEventListener('input', () => { currentPage = 1; searchAndFilter(); });
  query('#cuisine-filter')?.addEventListener('change', () => { currentPage = 1; searchAndFilter(); });
  query('#diet-filter')?.addEventListener('change', () => { currentPage = 1; searchAndFilter(); });

  const page = getPageName();
  if (page === 'index.html' || page === '' || page === 'index') {
    fetchRecipes().then(() => searchAndFilter());
  }
  if (page === 'upload.html') {
    setupUploadForm();
  }
  if (page === 'profile.html') {
    fetchRecipes().then(() => loadProfilePage());
  }
  if (page === 'contact.html') {
    setupContactPage();
  }
}

window.addEventListener('DOMContentLoaded', setupPage);
'''
base.joinpath('script.js').write_text(script, encoding='utf-8')

index_html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cuisine - Share Recipes</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="page-shell">
    <header class="header-bar">
      <div class="brand-group">
        <div class="brand-logo">C</div>
        <div class="brand-title">
          <h1>Cuisine</h1>
          <p>Modern global recipes for every kitchen.</p>
        </div>
      </div>
      <nav class="header-nav">
        <a href="index.html" class="active">Home</a>
        <a href="upload.html">Upload</a>
        <a href="profile.html">Profile</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="user-actions">
        <button class="button-secondary" id="login-btn">Login</button>
        <button class="button-secondary" id="register-btn">Register</button>
        <button class="button-secondary" id="logout-btn" style="display:none;">Logout</button>
      </div>
    </header>

    <section class="hero-card">
      <div>
        <h2>Learn, cook and share recipes from around the world.</h2>
        <p>Browse popular dishes, upload your own recipes, and discover dietary-friendly meals with a modern, clean experience.</p>
      </div>
      <div class="hero-actions">
        <button class="button-primary" onclick="showLoginModal()">Sign in</button>
        <a class="button-secondary" href="upload.html">Upload a recipe</a>
      </div>
    </section>

    <section class="card">
      <div class="feature-header">
        <h2>Featured Recipes</h2>
        <div class="feature-actions">
          <button class="button-secondary" onclick="searchAndFilter()">Refresh</button>
        </div>
      </div>
      <div class="filter-panel">
        <div class="filter-row">
          <label>
            Cuisine
            <select id="cuisine-filter">
              <option value="">All cuisines</option>
              <option>Italian</option>
              <option>Mexican</option>
              <option>Indian</option>
              <option>Chinese</option>
              <option>French</option>
              <option>Japanese</option>
              <option>Thai</option>
              <option>Spanish</option>
              <option>Middle Eastern</option>
            </select>
          </label>
          <label>
            Filter
            <select id="diet-filter">
              <option value="">All recipes</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten">Gluten free</option>
              <option value="low carb">Low carb</option>
              <option value="sugar free">Sugar free</option>
              <option value="dairy free">Dairy free</option>
            </select>
          </label>
          <label>
            Search
            <input id="search" type="search" placeholder="Search by dish, ingredient, or tag">
          </label>
        </div>
      </div>
      <div id="recipe-list" class="recipe-grid"></div>
      <div class="feature-actions" style="justify-content: space-between; margin-top: 28px;">
        <button class="button-secondary" id="prev-btn" onclick="prevPage()">Previous</button>
        <span id="page-info">Page 1</span>
        <button class="button-secondary" id="next-btn" onclick="nextPage()">Next</button>
      </div>
    </section>

    <section id="recipe-view" class="recipe-view" style="display:none;">
      <div class="view-inner panel">
        <div class="feature-header">
          <h2 id="view-title">Recipe title</h2>
          <button class="button-secondary" onclick="closeView()">Close</button>
        </div>
        <div class="recipe-details">
          <div class="meta-grid">
            <div><strong>Cuisine</strong><p id="view-cuisine"></p></div>
            <div><strong>Author</strong><p id="view-author"></p></div>
            <div><strong>Rating</strong><p id="view-rating"></p></div>
            <div><strong>Prep</strong><p id="view-prep-time"></p></div>
            <div><strong>Cook</strong><p id="view-cook-time"></p></div>
            <div><strong>Servings</strong><p id="view-servings"></p></div>
          </div>
          <div id="view-description"></div>
          <div class="list-block" id="view-ingredients"></div>
          <div class="list-block" id="view-steps"></div>
        </div>
        <div class="action-buttons">
          <button class="button-secondary" onclick="likeRecipe()">Like (<span id="like-count">0</span>)</button>
          <button class="button-secondary" onclick="addComment()">Comment</button>
        </div>
        <div id="comments-section" class="panel">
          <h3>Comments</h3>
          <div id="comments-list"></div>
          <textarea id="new-comment" placeholder="Leave a comment..."></textarea>
          <button class="button-primary" onclick="addComment()">Post comment</button>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <p>&copy; 2026 Cuisine. Built for easy cooking and clean browsing.</p>
      <p><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
    </footer>
  </div>

  <div class="modal" id="login-modal">
    <div class="modal-panel">
      <div class="modal-close" onclick="closeModal('login-modal')">&times;</div>
      <div class="modal-header">
        <h3>Login with email</h3>
        <p>Use your email account to access Cuisine.</p>
      </div>
      <form id="login-form" class="form-card">
        <label>Email</label>
        <input type="email" id="login-email" required placeholder="name@example.com">
        <label>Password</label>
        <input type="password" id="login-password" required placeholder="Enter your password">
        <button class="button-primary" type="submit">Sign in</button>
      </form>
      <div id="login-providers"></div>
    </div>
  </div>

  <div class="modal" id="register-modal">
    <div class="modal-panel">
      <div class="modal-close" onclick="closeModal('register-modal')">&times;</div>
      <div class="modal-header">
        <h3>Register a new account</h3>
        <p>Create an account and start sharing your recipes.</p>
      </div>
      <form id="register-form" class="form-card">
        <label>Full name</label>
        <input type="text" id="reg-name" required placeholder="Your name">
        <label>Email</label>
        <input type="email" id="reg-email" required placeholder="name@example.com">
        <label>Password</label>
        <input type="password" id="reg-password" required placeholder="Create a password">
        <label>Confirm password</label>
        <input type="password" id="reg-password-confirm" required placeholder="Re-enter password">
        <button class="button-primary" type="submit">Register</button>
      </form>
      <div id="register-providers"></div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>'''
base.joinpath('index.html').write_text(index_html, encoding='utf-8')

print('write complete')
'''
