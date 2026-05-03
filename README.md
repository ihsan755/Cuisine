# Cuisine Recipe Website

A comprehensive cooking recipe sharing website where users can upload step-by-step recipes with images and videos. 

## Features

- **User Registration and Login**: Create accounts and manage profiles
- **Recipe Upload**: Add recipes with detailed steps, ingredients, times, and media
- **Recipe Browsing**: View recipes with ratings, likes, and comments
- **Search and Filter**: Find recipes by cuisine, title, or tags
- **User Profiles**: View uploaded recipes and favorites
- **Interactive Features**: Rate, like, and comment on recipes
- **Pagination**: Navigate through recipe pages
- **Responsive Design**: Works on desktop and mobile
- **Print Recipes**: Print-friendly recipe views
- **Multiple Cuisines**: Support for various world cuisines

## How to Run

1. Ensure Python is installed on your system.
2. Navigate to the project directory: `cd path/to/cuisine-app`
3. Run the server: `python -m http.server 8000`
4. Open your browser and go to `http://localhost:8000`

## Usage

- **Home Page**: Browse and search recipes
- **Upload Page**: Add new recipes (login required)
- **Profile Page**: Manage your recipes and favorites
- **About/Contact**: Learn more and get in touch

## Pages

- `index.html`: Main recipe browsing page
- `upload.html`: Recipe upload form
- `profile.html`: User profile management
- `about.html`: About the website
- `contact.html`: Contact form

## Technologies

- HTML5
- CSS3 (with extensive utility classes)
- JavaScript (ES6+ with utility functions)
- Local Storage for data persistence

## Data Storage

Recipes, users, and interactions are stored in browser localStorage. For production, integrate with a backend database.

## Browser Compatibility

Works in modern browsers supporting ES6, localStorage, and File API.

## Contributing

Feel free to enhance the website with more features like backend integration, advanced search, or social sharing.

## License

Open source - share and modify as needed.