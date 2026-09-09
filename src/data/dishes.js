export const initialDishes = [
  {
    id: 1,
    name: 'Special Beef Tibs',
    category: 'Traditional',
    price: 650,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    description: 'Sautéed tender beef chunks with sliced jalapeño, red onions, garlic, and rosemary. Served hot with fresh injera.',
    ingredients: ['Prime Beef Tenderloin', 'Rosemary', 'Garlic', 'Red Onions', 'Jalapeño Pepper', 'Spiced Butter (Niter Kibbeh)']
  },
  {
    id: 2,
    name: 'Doro Wat Classic',
    category: 'Traditional',
    price: 750,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1547928576-965415777893?w=600&auto=format&fit=crop&q=80',
    description: 'Slow-simmered chicken drumstick in a rich berbere chili stew with caramelized shallots and a boiled egg.',
    ingredients: ['Chicken Drumstick', 'Berbere Spice Blend', 'Boiled Farm Egg', 'Shallots', 'Garlic', 'Niter Kibbeh']
  },
  {
    id: 3,
    name: 'Shiro Tegabino',
    category: 'Traditional',
    price: 350,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80',
    description: 'Flavorful spiced chickpea powder cooked slowly in an earthen clay pot until bubbling, served with warm injera.',
    ingredients: ['Chickpea Flour (Shiro)', 'Garlic', 'Onion', 'Berbere', 'Green Chili', 'Vegetable Oil']
  },
  {
    id: 4,
    name: 'Special Beyaynetu',
    category: 'Traditional',
    price: 490,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional fasting platter featuring split pea stew, red lentil stew, collard greens, cabbage, and tomato fitfit on injera.',
    ingredients: ['Misir Wat (Red Lentils)', 'Ater Kik (Yellow Peas)', 'Gomen (Collard Greens)', 'Atkilt (Cabbage & Potato)', 'Injera']
  },
  {
    id: 5,
    name: 'Addis Gourmet Burger',
    category: 'Fast Food',
    price: 520,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Grilled double beef patties with gouda cheese, caramelized onions, crisp lettuce, and signature house burger sauce.',
    ingredients: ['Beef Patty', 'Brioche Bun', 'Gouda Cheese', 'Caramelized Onion', 'Crisp Lettuce', 'House Burger Sauce']
  },
  {
    id: 6,
    name: 'Wood-Fired Veggie Pizza',
    category: 'Fast Food',
    price: 460,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    description: 'Hand-tossed thin crust with San Marzano tomato sauce, fresh mozzarella, bell peppers, black olives, and mushrooms.',
    ingredients: ['Pizza Dough', 'Tomato Passata', 'Fresh Mozzarella', 'Sweet Bell Peppers', 'Black Olives', 'Fresh Basil']
  },
  {
    id: 7,
    name: 'Pasta al Forno',
    category: 'Fast Food',
    price: 420,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=600&auto=format&fit=crop&q=80',
    description: 'Penne pasta baked in a slow-cooked beef bolognese sauce, silky béchamel, and a golden melted parmesan crust.',
    ingredients: ['Penne Pasta', 'Minced Beef Ragù', 'Béchamel Sauce', 'Parmesan Cheese', 'Garlic', 'Herbs']
  },
  {
    id: 8,
    name: 'Fresh Avocado Salad',
    category: 'Salads',
    price: 320,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Creamy Ethiopian avocado wedges tossed with garden tomatoes, red onions, and a zesty lime-vinaigrette dressing.',
    ingredients: ['Ripe Ethiopian Avocado', 'Vine Tomatoes', 'Red Onion', 'Lime Juice', 'Extra Virgin Olive Oil', 'Fresh Cilantro']
  },
  {
    id: 9,
    name: 'Fresh Mango & Papaya Juice',
    category: 'Beverages',
    price: 180,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    description: 'Layered fresh tropical mango and papaya smoothie, served chilled with a hint of fresh lime juice.',
    ingredients: ['Fresh Ripe Mango', 'Fresh Papaya', 'Lime Juice', 'Crushed Ice']
  },
  {
    id: 10,
    name: 'Traditional Spiced Coffee',
    category: 'Beverages',
    price: 120,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Freshly roasted Ethiopian Arabica coffee brewed in a traditional clay jebena with fragrant rue herb.',
    ingredients: ['Ethiopian Arabica Beans', 'Spring Water', 'Fresh Rue (Tena Adam)']
  }
]

export function fetchDishes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialDishes)
    }, 250)
  })
}