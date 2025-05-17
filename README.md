# Ingredient-Based Recipes Finder

A smart recipe recommendation system that helps users discover recipes based on the ingredients they have on hand. The app leverages the Tasty API to provide personalized recipe suggestions, complete with detailed instructions, nutritional information, and cooking tips.

> ⚡ **Note:** There is an explanation to install this Web App below for developers, however you don't need to install anything to try this Web App!  
> An online demo is available here: [Live Web App Deployment](https://ingredient-based-recipes-finder-production.up.railway.app/)

## Features

- **Smart Ingredient Input**: Easy-to-use interface for adding available ingredients
- **Real-time Recipe Search**: Instant recipe suggestions from Tasty's extensive database
- **Detailed Recipe Information**: 
  - Step-by-step cooking instructions
  - Nutritional facts
  - Preparation and cooking times
  - Serving sizes
  - Recipe tags and categories
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Modal Interface**: Detailed recipe view with high-resolution images

## Technology Stack

- [![Vue.js](https://img.shields.io/badge/Vue.js-35495E?logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
- [![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
- [![Pinia](https://img.shields.io/badge/Pinia-35495E?logo=vue.js&logoColor=4FC08D)](https://pinia.vuejs.org/)
- [![RapidAPI](https://img.shields.io/badge/RapidAPI-1D4371?logo=rapidapi&logoColor=white)](https://rapidapi.com/)
  
## Installation

1. ### Clone the repo:
    ```bash
    git clone https://github.com/Eduardo-J-Morales/Ingredient-Based-Recipes-Finder.git
    cd Ingredient-Based-Recipes-Finder
    ```

2. ### Install dependencies:
    ```bash
    npm install
    ```

3. ### Configure API Key:
    - Sign up for a RapidAPI account
    - Subscribe to the Tasty API
    - Copy your API key
    - Update the API key in your `.env` file as `PUBLIC_TASTY_API_KEY`

4. ### Run the app:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:4321`

## Project Structure


## API Integration

The app integrates with the Tasty API through RapidAPI, providing access to:
- Extensive recipe database
- Detailed cooking instructions
- Nutritional information
- High-quality recipe images
- Recipe categories and tags

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
