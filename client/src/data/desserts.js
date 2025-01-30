/**
 * Array of dessert objects, each with images for various screen sizes,
 * name, category, and price.
 */
// src/services/desserts.js

/**
 * Desserts API service module.
 * Replaces the static data export with fetch calls
 * to your Flask backend at /desserts.
 */

const BASE_URL = '/desserts';

/**
 * Fetch an array of all dessert objects.
 * @returns {Promise<Array>} array of dessert objects from the server.
 */
export function getAllDesserts() {
  return fetch(BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch desserts');
      }
      return response.json();
    });
}

/**
 * Fetch a single dessert by ID.
 * @param {number} id - The dessert's ID.
 * @returns {Promise<Object>} the dessert object from the server.
 */
export function getDessertById(id) {
  return fetch(`${BASE_URL}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch dessert by ID');
      }
      return response.json();
    });
}

/**
 * Create a new dessert on the server.
 * @param {Object} dessertData - { name, category, price, ... }
 * @returns {Promise<Object>} the newly created dessert object.
 */
export function createDessert(dessertData) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dessertData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create dessert');
      }
      return response.json();
    });
}

/**
 * Update (PATCH) an existing dessert by ID.
 * @param {number} dessertId
 * @param {Object} dessertData - updated fields, e.g. { name, price, ... }
 * @returns {Promise<Object>} the updated dessert object.
 */
export function updateDessert(dessertId, dessertData) {
  return fetch(`${BASE_URL}/${dessertId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dessertData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update dessert');
      }
      return response.json();
    });
}

/**
 * Delete an existing dessert by ID.
 * @param {number} dessertId
 * @returns {Promise<Object>} a message object or similar response from the server.
 */
export function deleteDessert(dessertId) {
  return fetch(`${BASE_URL}/${dessertId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete dessert');
      }
      return response.json();
    });
}
// export const dessertsData = [
//   {
//     image: {
//       thumbnail: "/assets/images/image-waffle-thumbnail.jpg",
//       mobile: "/assets/images/image-waffle-mobile.jpg",
//       tablet: "/assets/images/image-waffle-tablet.jpg",
//       desktop: "/assets/images/image-waffle-desktop.jpg"
//     },
//     name: "Waffle with Berries",
//     category: "Waffle",
//     price: 6.5
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-creme-brulee-thumbnail.jpg",
//       mobile: "/assets/images/image-creme-brulee-mobile.jpg",
//       tablet: "/assets/images/image-creme-brulee-tablet.jpg",
//       desktop: "/assets/images/image-creme-brulee-desktop.jpg"
//     },
//     name: "Vanilla Bean Crème Brûlée",
//     category: "Crème Brûlée",
//     price: 7.0
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-macaron-thumbnail.jpg",
//       mobile: "/assets/images/image-macaron-mobile.jpg",
//       tablet: "/assets/images/image-macaron-tablet.jpg",
//       desktop: "/assets/images/image-macaron-desktop.jpg"
//     },
//     name: "Macaron Mix of Five",
//     category: "Macaron",
//     price: 8.0
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-tiramisu-thumbnail.jpg",
//       mobile: "/assets/images/image-tiramisu-mobile.jpg",
//       tablet: "/assets/images/image-tiramisu-tablet.jpg",
//       desktop: "/assets/images/image-tiramisu-desktop.jpg"
//     },
//     name: "Classic Tiramisu",
//     category: "Tiramisu",
//     price: 5.5
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-baklava-thumbnail.jpg",
//       mobile: "/assets/images/image-baklava-mobile.jpg",
//       tablet: "/assets/images/image-baklava-tablet.jpg",
//       desktop: "/assets/images/image-baklava-desktop.jpg"
//     },
//     name: "Pistachio Baklava",
//     category: "Baklava",
//     price: 4.0
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-meringue-thumbnail.jpg",
//       mobile: "/assets/images/image-meringue-mobile.jpg",
//       tablet: "/assets/images/image-meringue-tablet.jpg",
//       desktop: "/assets/images/image-meringue-desktop.jpg"
//     },
//     name: "Lemon Meringue Pie",
//     category: "Pie",
//     price: 5.0
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-cake-thumbnail.jpg",
//       mobile: "/assets/images/image-cake-mobile.jpg",
//       tablet: "/assets/images/image-cake-tablet.jpg",
//       desktop: "/assets/images/image-cake-desktop.jpg"
//     },
//     name: "Red Velvet Cake",
//     category: "Cake",
//     price: 4.5
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-brownie-thumbnail.jpg",
//       mobile: "/assets/images/image-brownie-mobile.jpg",
//       tablet: "/assets/images/image-brownie-tablet.jpg",
//       desktop: "/assets/images/image-brownie-desktop.jpg"
//     },
//     name: "Salted Caramel Brownie",
//     category: "Brownie",
//     price: 4.5
//   },
//   {
//     image: {
//       thumbnail: "/assets/images/image-panna-cotta-thumbnail.jpg",
//       mobile: "/assets/images/image-panna-cotta-mobile.jpg",
//       tablet: "/assets/images/image-panna-cotta-tablet.jpg",
//       desktop: "/assets/images/image-panna-cotta-desktop.jpg"
//     },
//     name: "Vanilla Panna Cotta",
//     category: "Panna Cotta",
//     price: 6.5
//   }
// ];
