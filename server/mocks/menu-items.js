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
          "price": 2.95,
          "categories": ["1"]
        },
        {
          "id": 2,
          "menuId": "",
        "name": "Spicy Prawn Crackers",
        "description": "Authentic Thai spicy prawn crackers, served with sweet chilli sauce",
        "price": 2.5,
        "categories": ["1"]
      },
      {
        "id": 3,
        "menuId": "1",
        "name": "Satay Chicken (Four Sticks)",
        "description": "Marinated chicken skewered on bamboo, served with peanut sauce",
        "price": 5.25,
        "categories": ["2", "3"]
      },
      {
        "id": 4,
        "menuId": "2",
        "name": "Goong Hom Pa (Prawn Rolls)",
        "description": "Deep fried prawns and minced chicken wrapped in a pancake, served with plum sauce",
        "price": 5.75,
        "categories": ["2", "5", "9"]
      },
      {
        "id": 5,
        "menuId": "3",
        "name": "Kanom Jeeb (Thai Dim Sum)",
        "description": "Steamed minced chicken and water chestnuts wrapped in won ton skin, served with sweet soy sauce and sprinkled with fried garlic",
        "price": 4.75,
        "categories": ["2", "3"]
      },
      {
        "id": 6,
        "menuId": "4",
        "name": "Poh Pia Tod (Spring Rolls)",
        "description": "Glass vermicelli, shredded cabbage and carrots rolled in rice paper and deep fried until crisp, served with sweet chilli sauce",
        "price": 4.75,
        "categories": ["2", "8"]
      },
      {
        "id": 7,
        "menuId": "5",
        "name": "Tod Mun Pla (Fish Cakes)",
        "description": "Fish made into cake with red curry paste, chopped lime leaves and green beans, served with a sweet chilli sauce",
        "price": 4.75,
        "categories": ["2", "9", "7"]
      },
      {
        "id": 8,
        "menuId": "6",
        "name": "Tod Man Kow Pod (Corn Cakes)",
        "description": "Corn spiced with curry paste mixed with chopped lime leaves, served with a sweet chilli sauce",
        "price": 4.75,
        "categories": ["2", "8"]
      },
      {
        "id": 9,
        "menuId": "7",
        "name": "Kanom Pang Na Goong (Prawn on Toast)",
        "description": "Minced prawns mixed with garlic, pepper and coriander roots spread on bread triangles and deep fried, served with sweet chilli sauce",
        "price": 4.75,
        "categories": ["2", "9"]
      },
      {
        "id": 10,
        "menuId": "8",
        "name": "Cee Krong Moo (Deep Fried Spare Ribs)",
        "description": "Deep fried spare ribs marinated in our chefs special sauce",
        "price": 4.75,
        "categories": ["2", "4"]
      },
      {
        "id": 11,
        "menuId": "9",
        "name": "Pla Muek Tord",
        "description": "Tender squids dipped in batter and fried, served with a sweet chilli sauce",
        "price": 4.75,
        "categories": ["2", "9"]
      },
      {
        "id": 12,
        "menuId": "10",
        "name": "Peek Kai Yai Sai (Stuffed Chicken Wings)",
        "description": "Boneless chicken wings stuffed with minced chicken and herb, served with chilli sauce",
        "price": 4.75,
        "categories": ["2", "3"]
      },
      {
        "id": 13,
        "menuId": "11",
        "name": "Tao Hoo Tod (Crispy Beancurd)",
        "description": "Deep fried beancurd, served with sweet chilli sauce",
        "price": 4.5,
        "categories": ["2", "8"]
      },
      {
        "id": 14,
        "menuId": "12",
        "name": "Crispy Won Ton",
        "description": "Deep fried won ton filled with minced chicken, served with sweet chilli sauce",
        "price": 4.5,
        "categories": ["2", "3"]
      },
      {
        "id": 15,
        "menuId": "14",
        "name": "Goong Yang",
        "description": "Grilled king prawns, served with Thai spicy sauce",
        "price": 5.75,
        "categories": ["2", "5", "9"]
      },
      {
        "id": 16,
        "menuId": "15",
        "name": "Vegetable Tempura",
        "description": "Deep fried mixed vegetables in batter, served with sweet chilli sauce",
        "price": 4.5,
        "categories": ["2", "8"]
      },
      {
        "id": 17,
        "menuId": "16",
        "name": "Gui Chai (Vegetable Pancake)",
        "description": "Deep fried Thai leek stuffing in pancakes served with a sweet soya sauce and sesame seeds",
        "price": 4.5,
        "categories": ["2", "8"]
      },
      {
        "id": 18,
        "menuId": "17",
        "name": "Talay Thai Selection (For 2)",
        "description": "A delicious platter of chicken satay, prawn rolls, spring rolls, fish cakes, prawn on toasts and crispy won tons",
        "price": 13.5,
        "categories": ["2"]
      }],
      categories:[
        {
          "id": 1,
          "name": "SNACKS"
        },
        {
          "id": 2,
          "name": "STARTER"
        },
        {
          "id": 3,
          "name": "CHICKEN"
        },
        {
          "id": 4,
          "name": "PORK"
        },
        {
          "id": 5,
          "name": "PRAWNS"
        },
        {
          "id": 6,
          "name": "BEEF"
        },
        {
          "id": 7,
          "name": "FISH"
        },
        {
          "id": 8,
          "name": "VEGETARIAN"
        },
        {
          "id": 9,
          "name": "SEAFOOD"
        }
      ]
    });
  });

  app.use('/api/menuItems', menuItemsRouter);
};
