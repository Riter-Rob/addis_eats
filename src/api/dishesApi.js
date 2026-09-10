// API helper for dishes with simulated network delay, search/category filtering, and AbortSignal support

export const DISHES_DATA = [
  {
    id: 1,
    name: 'Special Beef Tibs',
    category: 'Traditional',
    price: 650,
    isVegetarian: false,
    isSpecial: true,
    prepTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80',
    description: 'Sautéed tender prime beef chunks with sliced green jalapeño, red onions, minced garlic, and fresh rosemary sprigs. Served sizzling with fresh injera.',
    ingredients: ['Prime Beef Tenderloin', 'Fresh Rosemary', 'Garlic', 'Red Onions', 'Jalapeño Pepper', 'Niter Kibbeh (Spiced Clarified Butter)', 'Mitmita']
  },
  {
    id: 2,
    name: 'Doro Wat Classic',
    category: 'Traditional',
    price: 750,
    isVegetarian: false,
    isSpecial: true,
    prepTime: '30-35 min',
    image: 'https://images.unsplash.com/photo-1547928576-965415777893?w=700&auto=format&fit=crop&q=80',
    description: 'Slow-simmered chicken drumstick in a deep, fragrant berbere stew with sweet caramelized shallots, seasoned butter, and a hard-boiled farm egg.',
    ingredients: ['Free-Range Chicken Drumstick', 'Berbere Chili Blend', 'Boiled Farm Egg', 'Shallots', 'Garlic', 'Ginger', 'Niter Kibbeh']
  },
  {
    id: 3,
    name: 'Shiro Tegabino',
    category: 'Traditional',
    price: 380,
    isVegetarian: true,
    isSpecial: false,
    prepTime: '15-20 min',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=700&auto=format&fit=crop&q=80',
    description: 'Roasted chickpea and split-pea flour simmered with minced onions, garlic, and berbere in an earthen clay pot until bubbling hot.',
    ingredients: ['Spiced Chickpea Flour (Shiro)', 'Garlic', 'Red Onion', 'Berbere', 'Fresh Green Chili', 'Injera']
  },
  {
    id: 4,
    name: 'Special Beyaynetu Platter',
    category: 'Traditional',
    price: 490,
    isVegetarian: true,
    isSpecial: true,
    prepTime: '20 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80',
    description: 'A colorful royal fasting combination platter served over sourdough injera: Misir Wat (red lentils), Ater Kik (yellow split peas), Gomen (collards), and Atkilt.',
    ingredients: ['Misir Wat (Spiced Red Lentils)', 'Ater Kik (Yellow Split Peas)', 'Gomen (Braised Collards)', 'Atkilt (Cabbage & Carrots)', 'Tomato Salad', 'Injera']
  },
  {
    id: 5,
    name: 'Special Kitfo',
    category: 'Traditional',
    price: 720,
    isVegetarian: false,
    isSpecial: true,
    prepTime: '15-20 min',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80',
    description: 'Freshly minced lean beef infused with aromatic niter kibbeh (clarified butter) and fiery mitmita chili. Served leb-leb (gently warmed) with ayib cottage cheese and gomen.',
    ingredients: ['Finely Minced Lean Beef', 'Niter Kibbeh', 'Mitmita Chili', 'Cardamom (Korerima)', 'Ayib (Herbed Cottage Cheese)', 'Kocho / Injera']
  },
  {
    id: 6,
    name: 'Asa Gulash (Fish Gulash)',
    category: 'Traditional',
    price: 540,
    isVegetarian: false,
    isSpecial: false,
    prepTime: '20 min',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80',
    description: 'Crisp Lake Tana tilapia cubes simmered in a spiced garlic, tomato, and fresh herb reduction. Served with fresh lemon wedges and bread or injera.',
    ingredients: ['Lake Tilapia Fillet', 'Tomato Puree', 'Garlic', 'Green Peppers', 'Lemon', 'Spices']
  },
  {
    id: 7,
    name: 'Fasting Firfir with Salad',
    category: 'Traditional',
    price: 320,
    isVegetarian: true,
    isSpecial: false,
    prepTime: '15 min',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
    description: 'Torn pieces of injera thoroughly soaked in a rich, tangy berbere and tomato sauce with garlic and herbs. Topped with fresh diced tomato and green chili salad.',
    ingredients: ['Injera Pieces', 'Berbere Sauce', 'Tomatoes', 'Onions', 'Jalapeño', 'Sunflower Oil']
  },
  {
    id: 8,
    name: 'Addis Fresh Avocado Salad',
    category: 'Salads',
    price: 290,
    isVegetarian: true,
    isSpecial: false,
    prepTime: '10 min',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80',
    description: 'Ripe Highland avocado slices tossed with vine-ripened tomatoes, red onion rings, fresh coriander, and cold-pressed lime vinaigrette.',
    ingredients: ['Highland Avocado', 'Ripe Tomatoes', 'Red Onions', 'Fresh Coriander', 'Lime Juice', 'Extra Virgin Olive Oil']
  },
  {
    id: 9,
    name: 'Layered Spris Juice (Mango & Papaya)',
    category: 'Beverages',
    price: 180,
    isVegetarian: true,
    isSpecial: false,
    prepTime: '5-10 min',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=700&auto=format&fit=crop&q=80',
    description: 'Addis-style layered fresh fruit smoothie featuring vibrant fresh mango puree layered over creamy blended papaya, served chilled with a fresh lime squeeze.',
    ingredients: ['Fresh Ripe Mango', 'Sweet Papaya', 'Lime Slice', 'Crushed Ice']
  },
  {
    id: 10,
    name: 'Jebena Buna (Traditional Coffee)',
    category: 'Beverages',
    price: 120,
    isVegetarian: true,
    isSpecial: true,
    prepTime: '10 min',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80',
    description: 'Freshly roasted Yirgacheffe Arabica beans brewed in a traditional black clay jebena, infused with a sprig of fresh Rue (Tena Adam) and served with fresh popcorn.',
    ingredients: ['Single-Origin Yirgacheffe Beans', 'Spring Water', 'Fresh Tena Adam (Rue)', 'Roasted Popcorn Side']
  }
]

export const CATEGORIES = ['All', 'Traditional', 'Salads', 'Beverages']

/**
 * Fetch dishes with support for AbortSignal, simulated network delay, and filters.
 */
export function fetchDishes({ category = 'All', search = '', signal } = {}) {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      let filtered = [...DISHES_DATA]

      if (category && category !== 'All') {
        filtered = filtered.filter(
          (dish) => dish.category.toLowerCase() === category.toLowerCase()
        )
      }

      if (search.trim()) {
        const q = search.trim().toLowerCase()
        filtered = filtered.filter(
          (dish) =>
            dish.name.toLowerCase().includes(q) ||
            dish.description.toLowerCase().includes(q) ||
            dish.ingredients.some((ing) => ing.toLowerCase().includes(q))
        )
      }

      resolve(filtered)
    }, 280)

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timerId)
        reject(new DOMException('Aborted fetchDishes', 'AbortError'))
      })
    }
  })
}

/**
 * Fetch a single dish by its ID.
 */
export function fetchDishById(id, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      const numId = Number(id)
      const dish = DISHES_DATA.find((item) => item.id === numId)
      if (!dish) {
        reject(new Error(`Dish with ID ${id} was not found.`))
      } else {
        resolve(dish)
      }
    }, 200)

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timerId)
        reject(new DOMException('Aborted fetchDishById', 'AbortError'))
      })
    }
  })
}

/**
 * Fetch today's featured chef specials.
 */
export function fetchSpecials({ signal } = {}) {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      const specials = DISHES_DATA.filter((dish) => dish.isSpecial)
      resolve(specials)
    }, 200)

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timerId)
        reject(new DOMException('Aborted fetchSpecials', 'AbortError'))
      })
    }
  })
}
