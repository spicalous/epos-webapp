module.exports = function(app) {
  var express = require('express');
  var menuItemsRouter = express.Router();

  menuItemsRouter.get('/', function(req, res) {
    res.send(
    {
      'menu-items': [
        {
          "id": 1,
          "menuId": "",
          "name": "Edamame",
          "description": "Lightly salted green soybeans in pod",
          "price": 295,
          "categories": ["1", "14"]
        },
        {
          "id": 2,
          "menuId": "",
          "name": "Spicy Prawn Crackers",
          "description": "Authentic Thai spicy prawn crackers, served with sweet chilli sauce",
          "price": 250,
          "categories": ["1"]
        },
        {
          "id": 3,
          "menuId": "1",
          "name": "Satay Chicken (Four Sticks)",
          "description": "Marinated chicken skewered on bamboo, served with peanut sauce",
          "price": 525,
          "categories": ["2", "6"]
        },
        {
          "id": 4,
          "menuId": "2",
          "name": "Goong Hom Pa (Prawn Rolls)",
          "description": "Deep fried prawns and minced chicken wrapped in a pancake, served with plum sauce",
          "price": 575,
          "categories": ["2", "12"]
        },
        {
          "id": 5,
          "menuId": "3",
          "name": "Kanom Jeeb (Thai Dim Sum)",
          "description": "Steamed minced chicken and water chestnuts wrapped in won ton skin, served with sweet soy sauce and sprinkled with fried garlic",
          "price": 475,
          "categories": ["2", "6"]
        },
        {
          "id": 6,
          "menuId": "4",
          "name": "Poh Pia Tod (Spring Rolls)",
          "description": "Glass vermicelli, shredded cabbage and carrots rolled in rice paper and deep fried until crisp, served with sweet chilli sauce",
          "price": 475,
          "categories": ["2", "14"]
        },
        {
          "id": 7,
          "menuId": "5",
          "name": "Tod Mun Pla (Fish Cakes)",
          "description": "Fish made into cake with red curry paste, chopped lime leaves and green beans, served with a sweet chilli sauce",
          "price": 475,
          "categories": ["2", "10", "11"]
        },
        {
          "id": 8,
          "menuId": "6",
          "name": "Tod Man Kow Pod (Corn Cakes)",
          "description": "Corn spiced with curry paste mixed with chopped lime leaves, served with a sweet chilli sauce",
          "price": 475,
          "categories": ["2", "14"]
        },
        {
          "id": 9,
          "menuId": "7",
          "name": "Kanom Pang Na Goong (Prawn on Toast)",
          "description": "Minced prawns mixed with garlic, pepper and coriander roots spread on bread triangles and deep fried, served with sweet chilli sauce",
          "price": 475,
          "categories": ["2", "12"]
        },
        {
          "id": 10,
          "menuId": "8",
          "name": "Cee Krong Moo (Deep Fried Spare Ribs)",
          "description": "Deep fried spare ribs marinated in our chefs special sauce",
          "price": 475,
          "categories": ["2", "7"]
        },
        {
          "id": 11,
          "menuId": "9",
          "name": "Pla Muek Tord",
          "description": "Tender squids dipped in batter and fried, served with a sweet chilli sauce",
          "price": 475,
          "categories": ["2", "11"]
        },
        {
          "id": 12,
          "menuId": "10",
          "name": "Peek Kai Yai Sai (Stuffed Chicken Wings)",
          "description": "Boneless chicken wings stuffed with minced chicken and herb, served with chilli sauce",
          "price": 475,
          "categories": ["2", "6"]
        },
        {
          "id": 13,
          "menuId": "11",
          "name": "Tao Hoo Tod (Crispy Beancurd)",
          "description": "Deep fried beancurd, served with sweet chilli sauce",
          "price": 450,
          "categories": ["2", "14"]
        },
        {
          "id": 14,
          "menuId": "12",
          "name": "Crispy Won Ton",
          "description": "Deep fried won ton filled with minced chicken, served with sweet chilli sauce",
          "price": 450,
          "categories": ["2", "6"]
        },
        {
          "id": 15,
          "menuId": "14",
          "name": "Goong Yang",
          "description": "Grilled king prawns, served with Thai spicy sauce",
          "price": 575,
          "categories": ["2", "11", "12"]
        },
        {
          "id": 16,
          "menuId": "15",
          "name": "Vegetable Tempura",
          "description": "Deep fried mixed vegetables in batter, served with sweet chilli sauce",
          "price": 450,
          "categories": ["2", "14"]
        },
        {
          "id": 17,
          "menuId": "16",
          "name": "Gui Chai (Vegetable Pancake)",
          "description": "Deep fried Thai leek stuffing in pancakes served with a sweet soya sauce and sesame seeds",
          "price": 450,
          "categories": ["2", "14"]
        },
        {
          "id": 18,
          "menuId": "17",
          "name": "Talay Thai Selection (For 2)",
          "description": "A delicious platter of chicken satay, prawn rolls, spring rolls, fish cakes, prawn on toasts and crispy won tons",
          "price": 1350,
          "categories": ["2"]
        },
        {
          "id": 19,
          "menuId": "18",
          "name": "Tom Yum Goong",
          "description": "Popular Thai classic spicy lemongrass soup with prawns, mushrooms, fresh chilli, tomatoes and lime juice",
          "price": 575,
          "categories": ["3", "12"]
        },
        {
          "id": 20,
          "menuId": "19",
          "name": "Tom Kha Goong",
          "description": "Prawns, mushrooms and tomatoes in coconut milk soup flavoured with lemongrass, lime leaves, galangal, chilli and lime juice",
          "price": 575,
          "categories": ["3", "12"]
        },
        {
          "id": 21,
          "menuId": "20",
          "name": "Poh Tak (For 2)",
          "description": "Spicy soup with mixed seafood, shallots, lemongrass, lime leaves, basil leaves and fresh chilli in traditional Thai pot",
          "price": 1350,
          "categories": ["3", "11"]
        },
        {
          "id": 22,
          "menuId": "21",
          "name": "Tom Yum Hed",
          "description": "The classic spicy lemongrass soup with mushrooms, tomatoes, fresh chilli and lime juice",
          "price": 495,
          "categories": ["3", "14"]
        },
        {
          "id": 23,
          "menuId": "22",
          "name": "Tom Kha Hed Soup",
          "description": "Coconut soup with mushrooms and tomatoes spiced with galangal, lemongrass and lime leaves",
          "price": 495,
          "categories": ["3", "14"]
        },
        {
          "id": 24,
          "menuId": "23",
          "name": "Yum Nuea (Beef Salad)",
          "description": "Thinly sliced char-grilled beef served on top of a fresh salad with Thai herbs and a spicy dressing",
          "price": 850,
          "categories": ["4", "8"]
        },
        {
          "id": 25,
          "menuId": "24",
          "name": "Yum Woon Sean (Vermicelli Salad)",
          "description": "Clear glass vermicelli noodles with prawns, minced chicken, onion and coriander, served with a chilli and lemon dressing",
          "price": 850,
          "categories": ["4", "6", "12"]
        },
        {
          "id": 26,
          "menuId": "25",
          "name": "Yum Tao Hoo (Crispy Tofu Salad)",
          "description": "Delicious, vegan friendly and a healthy source of protein alternative to meat on a bed of fresh salad in a hot and spicy sauce, garnished with sesame seeds",
          "price": 695,
          "categories": ["4", "14"]
        },
        {
          "id": 27,
          "menuId": "26",
          "name": "Pla Goong (Prawn Salad)",
          "description": "King prawns cooked with lemongrass, shallots and lime leaves, mixed with hot and sour dressing, served on a bed of salad",
          "price": 895,
          "categories": ["4", "11", "12"]
        },
        {
          "id": 28,
           "menuId": "27",
          "name": "Larb Gai (Chicken Salad)",
          "description": "The freshly minced chicken cooked with Thai herbs, ground rice, chilli powder, fish sauce and lime juice",
          "price": 750,
          "categories": ["4", "6"]
        },
        {
          "id": 29,
          "menuId": "28",
          "name": "Yum Talay",
          "description": "Mixed seafood with Thai style herbs and lemon dressing",
          "price": 895,
          "categories": ["4", "11"]
        },
        {
          "id": 30,
          "menuId": "29",
          "name": "Som Tum (Papaya Salad)",
          "description": "Shredded papaya and carrots seasoned with ground peanuts, dry shrimp, lime juice, plum sugar, fish sauce and chilli",
          "price": 695,
          "categories": ["4", "13"]
        },
        {
          "id": 31,
          "menuId": "290",
          "name": "Aromatic Duck Salad",
          "description": "Shredded aromatic crispy duck with tomatoes, spring onions, cucumber, garlic, chilli and Hoi Sin dressing on a mixed salad",
          "price": 895,
          "categories": ["4", "9"]
        }
      ],
      categories:[
        {
          "id": 1,
          "name": "Snacks",
        },
        {
          "id": 2,
          "name": "Starters",
        },
        {
          "id": 3,
          "name": "Soups",
        },
        {
          "id": 4,
          "name": "Salads",
        },
        {
          "id": 5,
          "name": "Curries",
        },
        {
          "id": 6,
          "name": "Chicken",
        },
        {
          "id": 7,
          "name": "Pork",
        },
        {
          "id": 8,
          "name": "Beef",
        },
        {
          "id": 9,
          "name": "Duck",
        },
        {
          "id": 10,
          "name": "Fish",
        },
        {
          "id": 11,
          "name": "Seafood",
        },
        {
          "id": 12,
          "name": "Prawns",
        },
        {
          "id": 13,
          "name": "Shrimp",
        },
        {
          "id": 14,
          "name": "Vegetarian",
        },
        {
          "id": 15,
          "name": "Rice",
        },
        {
          "id": 16,
          "name": "Noodles",
        },
        {
          "id": 17,
          "name": "Chef Specials",
        },
        {
          "id": 18,
          "name": "Drinks",
        }
      ]
    });
  });

  app.use('/api/menuItems', menuItemsRouter);
};
