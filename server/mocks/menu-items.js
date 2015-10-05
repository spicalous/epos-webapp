module.exports = function(app) {
  var express = require('express');
  var menuItemsRouter = express.Router();

  menuItemsRouter.get('/', function(req, res) {
    res.send(
    {
      "editCategories": [
        {
          "id": 0,
          "name": "Add Food"
        },
        {
          "id": 1,
          "name": "Edit Food"
        },
        {
          "id": 2,
          "name": "Add Drink"
        },
        {
          "id": 3,
          "name": "Edit Drink"
        }
      ],
      "editOptions": [
        {
          "id": 0,
          "editCategory": 0,
          "name": "ADD CHICKEN",
          "price": 150
        },
        {
          "id": 1,
          "editCategory": 0,
          "name": "ADD PORK",
          "price": 150
        },
        {
          "id": 2,
          "editCategory": 0,
          "name": "ADD BEEF",
          "price": 150
        },
        {
          "id": 3,
          "editCategory": 0,
          "name": "ADD PRAWNS",
          "price": 150
        },
        {
          "id": 4,
          "editCategory": 0,
          "name": "ADD CASHEW",
          "price": 150
        },
        {
          "id": 5,
          "editCategory": 1,
          "name": "NOT SPICY",
          "price": 0
        },
        {
          "id": 6,
          "editCategory": 1,
          "name": "MILD",
          "price": 0
        },
        {
          "id": 7,
          "editCategory": 1,
          "name": "SPICY",
          "price": 0
        },
        {
          "id": 8,
          "editCategory": 1,
          "name": "VERY SPICY",
          "price": 0
        },
        {
          "id": 9,
          "editCategory": 1,
          "name": "CHICKEN ONLY",
          "price": 0
        },
        {
          "id": 10,
          "editCategory": 1,
          "name": "PORK ONLY",
          "price": 0
        },
        {
          "id": 11,
          "editCategory": 1,
          "name": "BEEF ONLY",
          "price": 0
        },
        {
          "id": 12,
          "editCategory": 1,
          "name": "PRAWNS ONLY",
          "price": 0
        },
        {
          "id": 13,
          "editCategory": 1,
          "name": "NO PEANUTS",
          "price": 0
        },
        {
          "id": 14,
          "editCategory": 1,
          "name": "NO GLUTEN",
          "price": 0
        },
        {
          "id": 15,
          "editCategory": 1,
          "name": "NO FISH SAUCE",
          "price": 0
        },
        {
          "id": 16,
          "editCategory": 1,
          "name": "NO SOY SAUCE",
          "price": 0
        },
        {
          "id": 17,
          "editCategory": 1,
          "name": "NO PEPPERS",
          "price": 0
        },
        {
          "id": 18,
          "editCategory": 1,
          "name": "NO MUSHROOMS",
          "price": 0
        },
        {
          "id": 19,
          "editCategory": 1,
          "name": "NO ONIONS",
          "price": 0
        },
        {
          "id": 20,
          "editCategory": 1,
          "name": "NO BEANSPROUTS",
          "price": 0
        },
        {
          "id": 21,
          "editCategory": 2,
          "name": "MIXER (COKE)",
          "price": 75
        },
        {
          "id": 22,
          "editCategory": 2,
          "name": "MIXER (7UP)",
          "price": 75
        },
        {
          "id": 23,
          "editCategory": 2,
          "name": "MIXER (TANGO)",
          "price": 75
        },
        {
          "id": 24,
          "editCategory": 2,
          "name": "MIXER (SODA WATER)",
          "price": 75
        },
        {
          "id": 25,
          "editCategory": 2,
          "name": "MIXER (LIME CORDIAL)",
          "price": 75
        },
        {
          "id": 26,
          "editCategory": 3,
          "name": "ADD ICE",
          "price": 0
        },
        {
          "id": 27,
          "editCategory": 3,
          "name": "LESS ICE",
          "price": 0
        },
        {
          "id": 28,
          "editCategory": 3,
          "name": "NO ICE",
          "price": 0
        }
      ],
      "menuItems": [
        {
          "id": 0,
          "menuId": "",
          "name": "Edamame",
          "description": "Lightly salted green soybeans in pod",
          "price": 295,
          "categories": [
            0,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 1,
          "menuId": "",
          "name": "Spicy Prawn Crackers",
          "description": "Authentic Thai spicy prawn crackers, served with sweet chilli sauce",
          "price": 250,
          "categories": [
            0
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 2,
          "menuId": "1",
          "name": "Satay Chicken (Four Sticks)",
          "description": "Marinated chicken skewered on bamboo, served with peanut sauce",
          "price": 525,
          "categories": [
            0,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 3,
          "menuId": "2",
          "name": "Goong Hom Pa (Prawn Rolls)",
          "description": "Deep fried prawns and minced chicken wrapped in a pancake, served with plum sauce",
          "price": 575,
          "categories": [
            0,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 4,
          "menuId": "3",
          "name": "Kanom Jeeb (Thai Dim Sum)",
          "description": "Steamed minced chicken and water chestnuts wrapped in won ton skin, served with sweet soy sauce and sprinkled with fried garlic",
          "price": 475,
          "categories": [
            0
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 5,
          "menuId": "4",
          "name": "Poh Pia Tod (Spring Rolls)",
          "description": "Glass vermicelli, shredded cabbage and carrots rolled in rice paper and deep fried until crisp, served with sweet chilli sauce",
          "price": 475,
          "categories": [
            0,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 6,
          "menuId": "5",
          "name": "Tod Mun Pla (Fish Cakes)",
          "description": "Fish made into cake with red curry paste, chopped lime leaves and green beans, served with a sweet chilli sauce",
          "price": 475,
          "categories": [
            0
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 7,
          "menuId": "6",
          "name": "Tod Man Kow Pod (Corn Cakes)",
          "description": "Corn spiced with curry paste mixed with chopped lime leaves, served with a sweet chilli sauce",
          "price": 475,
          "categories": [
            0,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 8,
          "menuId": "7",
          "name": "Kanom Pang Na Goong (Prawn on Toast)",
          "description": "Minced prawns mixed with garlic, pepper and coriander roots spread on bread triangles and deep fried, served with sweet chilli sauce",
          "price": 475,
          "categories": [
            0,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 9,
          "menuId": "8",
          "name": "Cee Krong Moo (Deep Fried Spare Ribs)",
          "description": "Deep fried spare ribs marinated in our chefs special sauce",
          "price": 475,
          "categories": [
            0,
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 10,
          "menuId": "9",
          "name": "Pla Muek Tord",
          "description": "Tender squids dipped in batter and fried, served with a sweet chilli sauce",
          "price": 475,
          "categories": [
            0,
            9
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 11,
          "menuId": "10",
          "name": "Peek Kai Yai Sai (Stuffed Chicken Wings)",
          "description": "Boneless chicken wings stuffed with minced chicken and herb, served with chilli sauce",
          "price": 475,
          "categories": [
            0,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 12,
          "menuId": "11",
          "name": "Tao Hoo Tod (Crispy Beancurd)",
          "description": "Deep fried beancurd, served with sweet chilli sauce",
          "price": 450,
          "categories": [
            0,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 13,
          "menuId": "12",
          "name": "Crispy Won Ton",
          "description": "Deep fried won ton filled with minced chicken, served with sweet chilli sauce",
          "price": 450,
          "categories": [
            0
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 14,
          "menuId": "14",
          "name": "Goong Yang",
          "description": "Grilled king prawns, served with Thai spicy sauce",
          "price": 575,
          "categories": [
            0,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 15,
          "menuId": "15",
          "name": "Vegetable Tempura",
          "description": "Deep fried mixed vegetables in batter, served with sweet chilli sauce",
          "price": 450,
          "categories": [
            0,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 16,
          "menuId": "16",
          "name": "Gui Chai (Vegetable Pancake)",
          "description": "Deep fried Thai leek stuffing in pancakes served with a sweet soya sauce and sesame seeds",
          "price": 450,
          "categories": [
            0,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 17,
          "menuId": "17",
          "name": "Talay Thai Selection (For 2)",
          "description": "A delicious platter of chicken satay, prawn rolls, spring rolls, fish cakes, prawn on toasts and crispy won tons",
          "price": 1350,
          "categories": [
            0
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 18,
          "menuId": "18",
          "name": "Tom Yum Goong",
          "description": "Popular Thai classic spicy lemongrass soup with prawns, mushrooms, fresh chilli, tomatoes and lime juice",
          "price": 575,
          "categories": [
            1,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 19,
          "menuId": "19",
          "name": "Tom Kha Goong",
          "description": "Prawns, mushrooms and tomatoes in coconut milk soup flavoured with lemongrass, lime leaves, galangal, chilli and lime juice",
          "price": 575,
          "categories": [
            1,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 20,
          "menuId": "20",
          "name": "Poh Tak (For 2)",
          "description": "Spicy soup with mixed seafood, shallots, lemongrass, lime leaves, basil leaves and fresh chilli in traditional Thai pot",
          "price": 1350,
          "categories": [
            1,
            9
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 21,
          "menuId": "21",
          "name": "Tom Yum Hed",
          "description": "The classic spicy lemongrass soup with mushrooms, tomatoes, fresh chilli and lime juice",
          "price": 495,
          "categories": [
            1,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 22,
          "menuId": "22",
          "name": "Tom Kha Hed Soup",
          "description": "Coconut soup with mushrooms and tomatoes spiced with galangal, lemongrass and lime leaves",
          "price": 495,
          "categories": [
            1,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 23,
          "menuId": "23",
          "name": "Yum Nuea (Beef Salad)",
          "description": "Thinly sliced char-grilled beef served on top of a fresh salad with Thai herbs and a spicy dressing",
          "price": 850,
          "categories": [
            2,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 24,
          "menuId": "24",
          "name": "Yum Woon Sean (Vermicelli Salad)",
          "description": "Clear glass vermicelli noodles with prawns, minced chicken, onion and coriander, served with a chilli and lemon dressing",
          "price": 850,
          "categories": [
            2
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 25,
          "menuId": "25",
          "name": "Yum Tao Hoo (Crispy Tofu Salad)",
          "description": "Delicious, vegan friendly and a healthy source of protein alternative to meat on a bed of fresh salad in a hot and spicy sauce, garnished with sesame seeds",
          "price": 695,
          "categories": [
            2,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 26,
          "menuId": "26",
          "name": "Pla Goong (Prawn Salad)",
          "description": "King prawns cooked with lemongrass, shallots and lime leaves, mixed with hot and sour dressing, served on a bed of salad",
          "price": 895,
          "categories": [
            2,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 27,
          "menuId": "27",
          "name": "Larb Gai (Chicken Salad)",
          "description": "The freshly minced chicken cooked with Thai herbs, ground rice, chilli powder, fish sauce and lime juice",
          "price": 750,
          "categories": [
            2,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 28,
          "menuId": "28",
          "name": "Yum Talay",
          "description": "Mixed seafood with Thai style herbs and lemon dressing",
          "price": 895,
          "categories": [
            2,
            9
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 29,
          "menuId": "29",
          "name": "Som Tum (Papaya Salad)",
          "description": "Shredded papaya and carrots seasoned with ground peanuts, dry shrimp, lime juice, plum sugar, fish sauce and chilli",
          "price": 695,
          "categories": [
            2,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 30,
          "menuId": "290",
          "name": "Aromatic Duck Salad",
          "description": "Shredded aromatic crispy duck with tomatoes, spring onions, cucumber, garlic, chilli and Hoi Sin dressing on a mixed salad",
          "price": 895,
          "categories": [
            2,
            7
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 31,
          "menuId": "30",
          "name": "Chicken Green Curry",
          "description": "A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots",
          "price": 795,
          "categories": [
            3,
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 32,
          "menuId": "30",
          "name": "Pork Green Curry",
          "description": "A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots",
          "price": 795,
          "categories": [
            3,
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 33,
          "menuId": "30",
          "name": "Beef Green Curry",
          "description": "A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots",
          "price": 850,
          "categories": [
            3,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 34,
          "menuId": "30",
          "name": "Prawns Green Curry",
          "description": "A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots",
          "price": 895,
          "categories": [
            3,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 35,
          "menuId": "31",
          "name": "Chicken Red Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 795,
          "categories": [
            3,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 36,
          "menuId": "31",
          "name": "Pork Red Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 795,
          "categories": [
            3,
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 37,
          "menuId": "31",
          "name": "Beef Red Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 850,
          "categories": [
            3,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 38,
          "menuId": "31",
          "name": "Prawns Red Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 895,
          "categories": [
            3,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 39,
          "menuId": "32",
          "name": "Chicken Panang Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 795,
          "categories": [
            3,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 40,
          "menuId": "32",
          "name": "Pork Panang Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 795,
          "categories": [
            3,
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 41,
          "menuId": "32",
          "name": "Beef Panang Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 850,
          "categories": [
            3,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 42,
          "menuId": "32",
          "name": "Prawns Panang Curry",
          "description": "Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli",
          "price": 895,
          "categories": [
            3,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 43,
          "menuId": "33",
          "name": "Chicken Jungle Curry",
          "description": "Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables",
          "price": 795,
          "categories": [
            3,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 44,
          "menuId": "33",
          "name": "Pork Jungle Curry",
          "description": "Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables",
          "price": 795,
          "categories": [
            3,
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 45,
          "menuId": "33",
          "name": "Beef Jungle Curry",
          "description": "Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables",
          "price": 850,
          "categories": [
            3,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 46,
          "menuId": "33",
          "name": "Prawns Jungle Curry",
          "description": "Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables",
          "price": 895,
          "categories": [
            3,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 47,
          "menuId": "34",
          "name": "Beef Massaman",
          "description": "A mild beef coconut curry with potatoes, red and green bell peppers, onions, carrots and peanuts",
          "price": 850,
          "categories": [
            3,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 48,
          "menuId": "34",
          "name": "Chicken Massaman",
          "description": "A mild chicken coconut curry with potatoes, red and green bell peppers, onions, carrots and peanuts",
          "price": 850,
          "categories": [
            3,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 49,
          "menuId": "35",
          "name": "Vegetable Green Curry",
          "description": "Mixed fresh vegetables cooked in coconut milk with bamboo shoots, sweet basil leaves and green curry paste",
          "price": 695,
          "categories": [
            3,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 50,
          "menuId": "36",
          "name": "Vegetable Red Curry",
          "description": "Mixed fresh vegetables cooked in coconut milk with bamboo shoots, sweet basil leaves and red curry paste",
          "price": 695,
          "categories": [
            3,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 51,
          "menuId": "37",
          "name": "Vegetable Jungle Curry",
          "description": "Mixed vegetables in clear spicy red curry without coconut milk",
          "price": 695,
          "categories": [
            3,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 52,
          "menuId": "38",
          "name": "Kai Pad Mamuang Himmaparn",
          "description": "Chicken with cashew nuts, bell peppers, onions, mushrooms, pineapple and spring onions",
          "price": 795,
          "categories": [
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 53,
          "menuId": "39",
          "name": "Kai Pad Khing",
          "description": "Chicken with shredded ginger, mushrooms, carrots, onions in yellow bean sauce",
          "price": 795,
          "categories": [
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 54,
          "menuId": "40",
          "name": "Kai Ta Krai",
          "description": "Stir fried chicken with lemongrass and chilli",
          "price": 795,
          "categories": [
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 55,
          "menuId": "41",
          "name": "Kai Pad Prik Khing",
          "description": "Chicken stir fried with curry paste and green beans then garnished with finely shredded lime leaves",
          "price": 795,
          "categories": [
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 56,
          "menuId": "42",
          "name": "Kai Pad Priew Wan",
          "description": "Thai style sweet and sour chicken with tomatoes and pineapple",
          "price": 795,
          "categories": [
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 57,
          "menuId": "43",
          "name": "Kai Pad Bai Kra Prao",
          "description": "Sliced chicken stir fried with basil leaves, onion and chillies",
          "price": 795,
          "categories": [
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 58,
          "menuId": "44",
          "name": "Mu Tod Kra Tiem Prik Tai",
          "description": "Stir fried pork with garlic, pepper and coriander",
          "price": 795,
          "categories": [
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 59,
          "menuId": "45",
          "name": "Mu Pad Khing",
          "description": "Sliced pork stir fried with fresh ginger, onion, mushroom and spring onion",
          "price": 795,
          "categories": [
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 60,
          "menuId": "46",
          "name": "Mu Priew Wan",
          "description": "Thai style sweet and sour dish with pork",
          "price": 795,
          "categories": [
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 61,
          "menuId": "47",
          "name": "Mu Pad Kra Prao",
          "description": "Wok fried pork with added Thai basil and fresh chilli",
          "price": 795,
          "categories": [
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 62,
          "menuId": "48",
          "name": "Mu Pad Prik Khing",
          "description": "",
          "price": 795,
          "categories": [
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 63,
          "menuId": "49",
          "name": "Nuea Pad Bai Kra Prao",
          "description": "Stir fried beef with basil leaves, onions and fresh chillies",
          "price": 850,
          "categories": [
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 64,
          "menuId": "50",
          "name": "Nuea Pad Nam Mun Hoi",
          "description": "Stir fried beef with oyster sauce, mushroom, peppers and spring onion",
          "price": 850,
          "categories": [
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 65,
          "menuId": "51",
          "name": "Nuea Ka Ta",
          "description": "Stir fried marinated beef with pineapple, mushroom in XO sauce served on a hot sizzling plate",
          "price": 895,
          "categories": [
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 66,
          "menuId": "52",
          "name": "Ped Pad Kraprao",
          "description": "Wok fried duck with added Thai basil and fresh chilli",
          "price": 895,
          "categories": [
            7
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 67,
          "menuId": "53",
          "name": "Panang Ped",
          "description": "Roast duck in rich red coconut curry and lime leaves",
          "price": 950,
          "categories": [
            7,
            3
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 68,
          "menuId": "54",
          "name": "Ped Ka Ta",
          "description": "Roasted duck with pineapple, mushroom and peppers in XO sauce served on a hot sizzling plate",
          "price": 950,
          "categories": [
            7
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 69,
          "menuId": "55",
          "name": "Ped Ta Krai",
          "description": "Succulent slices of duck quickly wok fried with lemongrass and chilli",
          "price": 895,
          "categories": [
            7
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 70,
          "menuId": "56 Cod",
          "name": "Pla Chu Chee",
          "description": "Deep fried topped with chu chee curry sauce, coconut milk and garnished with shredded lime leaves",
          "price": 950,
          "categories": [
            8,
            3
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 71,
          "menuId": "56 Trout",
          "name": "Pla Chu Chee",
          "description": "Deep fried topped with chu chee curry sauce, coconut milk and garnished with shredded lime leaves",
          "price": 950,
          "categories": [
            8,
            3
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 72,
          "menuId": "57 Cod",
          "name": "Pla Rad Prik",
          "description": "Deef fried and topped with chilli and garlic sauce",
          "price": 950,
          "categories": [
            8
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 73,
          "menuId": "57 Trout",
          "name": "Pla Rad Prik",
          "description": "Deef fried and topped with chilli and garlic sauce",
          "price": 950,
          "categories": [
            8
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 74,
          "menuId": "58 Cod",
          "name": "Pla Priew Wan",
          "description": "Deep fried and topped with vegetables in sweet and sour sauce",
          "price": 950,
          "categories": [
            8
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 75,
          "menuId": "58 Trout",
          "name": "Pla Priew Wan",
          "description": "Deep fried and topped with vegetables in sweet and sour sauce",
          "price": 950,
          "categories": [
            8
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 76,
          "menuId": "59",
          "name": "Goong Kra Tiam",
          "description": "King prawns sauteed with garlic and Thai pepper sauce",
          "price": 895,
          "categories": [
            9,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 77,
          "menuId": "60",
          "name": "Goong Pad Kra Prao",
          "description": "Stir fried king prawns with Thai basil and fresh chilli",
          "price": 895,
          "categories": [
            9,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 78,
          "menuId": "61",
          "name": "Goong Pad Nam Prik Pao",
          "description": "Prawns sauteed with a roasted chilli sauce",
          "price": 895,
          "categories": [
            9,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 79,
          "menuId": "62",
          "name": "Chu Chee Goong",
          "description": "Stir fried king prawn topped with chu chee curry sauce then garnished with shredded lime leaves",
          "price": 895,
          "categories": [
            9,
            10,
            3
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 80,
          "menuId": "63",
          "name": "Pla Muek Pad Prik",
          "description": "Tender squid stir fried with fresh chilli, garlic and onions",
          "price": 850,
          "categories": [
            9
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 81,
          "menuId": "64",
          "name": "Priew Wan Goong",
          "description": "Thai style sweet and sour king prawns",
          "price": 895,
          "categories": [
            9,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 82,
          "menuId": "65",
          "name": "Goong Pad Khing",
          "description": "King prawns stir fried with fresh ginger in yellow bean sauce",
          "price": 895,
          "categories": [
            9,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 83,
          "menuId": "66",
          "name": "Pad Talay",
          "description": "A medley of mixed seafood in spicy sauce with flavours of lemongrass, basil leaves and red pepper",
          "price": 950,
          "categories": [
            9
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 84,
          "menuId": "67",
          "name": "Pad Khing Tao Hoo",
          "description": "Fried beancurd with shredded ginger, mushrooms and spring onions, seasoned with yellow bean sauce",
          "price": 695,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 85,
          "menuId": "68",
          "name": "Pad Kra Prao Tao Hoo",
          "description": "Fried beancurd with chilli, onions and fresh basil leaves",
          "price": 695,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 86,
          "menuId": "69",
          "name": "Pak Ob",
          "description": "Steamed green vegetables topped with garlic and oyster sauce",
          "price": 650,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 87,
          "menuId": "70",
          "name": "Pad Pak Met Ma Muang",
          "description": "Stir fried mixed vegetables with cashew nuts",
          "price": 650,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 88,
          "menuId": "71",
          "name": "Hed Kee Mao",
          "description": "Mushrooms, fried with fresh chilli, garlic, basil leaves in XO sauce",
          "price": 650,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 89,
          "menuId": "72",
          "name": "Hed Wine Dang",
          "description": "Mushrooms and French red wine cooked with sweet and sour sauce",
          "price": 650,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 90,
          "menuId": "73",
          "name": "Pad Pak",
          "description": "Mixed vegetables with light soya sauce",
          "price": 650,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 91,
          "menuId": "74",
          "name": "Pad Pak Bung Fai Daeng",
          "description": "Thai hawker stall favourite of stir fried morning glory with fresh chilli, garlic and oyster sauce",
          "price": 675,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 92,
          "menuId": "75",
          "name": "Pad Kwang Tung",
          "description": "Stir fried choi sum cooked with fresh chilli, garlic and oyster sauce",
          "price": 675,
          "categories": [
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 93,
          "menuId": "76",
          "name": "Pad Thai",
          "description": "Special Thai style noodles with chicken, prawns, beansprouts, spring onion and egg topped with ground peanuts",
          "price": 795,
          "categories": [
            13
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 94,
          "menuId": "77",
          "name": "Singapore Noodles",
          "description": "Vermicelli noodles stir fried with curry powder, egg, baby prawns, beansprouts and spring onion",
          "price": 795,
          "categories": [
            13
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 95,
          "menuId": "78",
          "name": "Chicken Pad Si Ew",
          "description": "Fried rice noodles with egg, vegetables and a choice of pork, chicken OR beef in a dark soya sauce",
          "price": 795,
          "categories": [
            13,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 96,
          "menuId": "78",
          "name": "Pork Pad Si Ew",
          "description": "Fried rice noodles with egg, vegetables and a choice of pork, chicken OR beef in a dark soya sauce",
          "price": 795,
          "categories": [
            13,
            5
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 97,
          "menuId": "78",
          "name": "Beef Pad Si Ew",
          "description": "Fried rice noodles with egg, vegetables and a choice of pork, chicken OR beef in a dark soya sauce",
          "price": 795,
          "categories": [
            13,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 98,
          "menuId": "79",
          "name": "Pad Kee Mao",
          "description": "Fried egg noodles with beef, green vegetables, fresh chilli, garlic and basil leaves",
          "price": 795,
          "categories": [
            13,
            6
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 99,
          "menuId": "80",
          "name": "Pad Thai Jay",
          "description": "Popular pad Thai noodles stir fried sweet radish, beansprouts, spring onions, egg and ground peanut",
          "price": 725,
          "categories": [
            13,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 100,
          "menuId": "81",
          "name": "Guay Teaw Jay",
          "description": "Fried egg noodles with spring onions and beansprouts",
          "price": 550,
          "categories": [
            13,
            11
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 101,
          "menuId": "82",
          "name": "Steamed Jasmine Rice",
          "description": "",
          "price": 250,
          "categories": [
            12
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 102,
          "menuId": "83",
          "name": "Egg Fried Rice",
          "description": "",
          "price": 280,
          "categories": [
            12
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 103,
          "menuId": "84",
          "name": "Coconut Rice",
          "description": "",
          "price": 280,
          "categories": [
            12
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 104,
          "menuId": "85",
          "name": "Sticky Rice",
          "description": "",
          "price": 295,
          "categories": [
            12
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 105,
          "menuId": "86",
          "name": "House Special Fried Rice",
          "description": "Stir fried rice with prawns and chicken",
          "price": 795,
          "categories": [
            12,
            4,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 106,
          "menuId": "87",
          "name": "Prawn Fried Rice",
          "description": "Fried rice with prawns, pineapple and cashew nuts",
          "price": 795,
          "categories": [
            14,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 107,
          "menuId": "770",
          "name": "Singapore Fried Rice",
          "description": "Fried rice with curry powder, egg, baby prawns and spring onions",
          "price": 795,
          "categories": [
            12
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 108,
          "menuId": "771",
          "name": "Tom Yum Fried Rice",
          "description": "The most talked about fried rice, now comes to our menu. Absolute blast of hot and sour flavours, prawns and chicken fried rice with aroma of Thai herbs",
          "price": 795,
          "categories": [
            12,
            4,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 109,
          "menuId": "772",
          "name": "Tom Yum Noodle Soup",
          "description": "Thin rice vermicelli noodles with chicken and prawns, tomatoes, mushrooms, fresh chilli and lemongrass in Thai famous hot and sour tom yum soup",
          "price": 895,
          "categories": [
            13,
            4,
            10
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 110,
          "menuId": "773",
          "name": "Tom Kha Noodle Soup",
          "description": "Thick egg noodles with chicken, galangal, lemongrass, fresh chilli, lime juice in a creamy coconut based Thai classic tom kha soup topped with sesame oil",
          "price": 895,
          "categories": [
            13,
            4
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 111,
          "menuId": "88",
          "name": "Ped Makarm",
          "description": "Crispy fried roasted duck topped with tamarind sauce",
          "price": 950,
          "categories": [
            14,
            7
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 112,
          "menuId": "89",
          "name": "Gang Phed Ped Yung",
          "description": "Roasted duck cooked in red curry, coconut milk, pineapple and tomato",
          "price": 895,
          "categories": [
            14,
            7,
            3
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 113,
          "menuId": "90",
          "name": "Ped Pad Khing",
          "description": "Stir fried duck with fresh ginger, mushroom, yellow bean sauce and spring onion",
          "price": 895,
          "categories": [
            14,
            7
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 114,
          "menuId": "91",
          "name": "Pla Nueng",
          "description": "Steamed whole seabass with ginger, spring onion and bean sauce",
          "price": 1695,
          "categories": [
            14,
            8
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 115,
          "menuId": "92",
          "name": "Pla Tod Rad Prik",
          "description": "Deep fried whole seabass topped with chilli garlic sauce",
          "price": 1695,
          "categories": [
            14,
            8
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 116,
          "menuId": "93",
          "name": "Salmon Panang Curry",
          "description": "Battered salmon fillet topped with panang curry sauce, lime leaves and basil",
          "price": 1150,
          "categories": [
            14,
            8,
            3
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 117,
          "menuId": "94",
          "name": "Seabass Tamarind",
          "description": "Deep fried whole seabass topped with tamarind sauce",
          "price": 1695,
          "categories": [
            14,
            8
          ],
          "editCategories": [
            0,
            1
          ]
        },
        {
          "id": 118,
          "menuId": "",
          "name": "Coke",
          "description": "",
          "price": 195,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 119,
          "menuId": "",
          "name": "Diet Coke",
          "description": "",
          "price": 195,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 120,
          "menuId": "",
          "name": "7up",
          "description": "",
          "price": 195,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 121,
          "menuId": "",
          "name": "Tango",
          "description": "",
          "price": 195,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 122,
          "menuId": "",
          "name": "Thai Iced Tea",
          "description": "",
          "price": 250,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 123,
          "menuId": "",
          "name": "Lemon Iced Tea",
          "description": "",
          "price": 250,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 124,
          "menuId": "",
          "name": "Orange Juice",
          "description": "",
          "price": 225,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 125,
          "menuId": "",
          "name": "Pineapple Juice",
          "description": "",
          "price": 225,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 126,
          "menuId": "",
          "name": "Apple Juice",
          "description": "",
          "price": 225,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 127,
          "menuId": "",
          "name": "Coconut Juice",
          "description": "",
          "price": 250,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 128,
          "menuId": "",
          "name": "Singha",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 129,
          "menuId": "",
          "name": "Chang",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 130,
          "menuId": "",
          "name": "Small Still Water",
          "description": "",
          "price": 240,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 131,
          "menuId": "",
          "name": "Large Still Water",
          "description": "",
          "price": 330,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 132,
          "menuId": "",
          "name": "Small Sparkling Water",
          "description": "",
          "price": 240,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 133,
          "menuId": "",
          "name": "Large Sparkling Water",
          "description": "",
          "price": 330,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 134,
          "menuId": "",
          "name": "Whisky",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 135,
          "menuId": "",
          "name": "Vodka",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 136,
          "menuId": "",
          "name": "Gin",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 137,
          "menuId": "",
          "name": "Rum",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 138,
          "menuId": "",
          "name": "Tequila",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 139,
          "menuId": "",
          "name": "Jack Daniels",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 140,
          "menuId": "",
          "name": "Johnny Walker",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 141,
          "menuId": "",
          "name": "Martini",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 142,
          "menuId": "",
          "name": "Southern Comfort",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 143,
          "menuId": "",
          "name": "Brandy",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 144,
          "menuId": "",
          "name": "Malibu",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 145,
          "menuId": "",
          "name": "Sambuca",
          "description": "",
          "price": 350,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 146,
          "menuId": "",
          "name": "Remy Martin Cognac",
          "description": "",
          "price": 375,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 147,
          "menuId": "",
          "name": "MehKong",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 148,
          "menuId": "",
          "name": "SangSom",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 149,
          "menuId": "",
          "name": "Baily's",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 150,
          "menuId": "",
          "name": "Tia Maria",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 151,
          "menuId": "",
          "name": "Grand Marnier",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 152,
          "menuId": "",
          "name": "Cointreau",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 153,
          "menuId": "",
          "name": "Kahlua",
          "description": "",
          "price": 320,
          "categories": [
            15
          ],
          "editCategories": [
            2,
            3
          ]
        },
        {
          "id": 154,
          "menuId": "",
          "name": "Coke",
          "description": "",
          "price": 85,
          "categories": [
            17
          ],
          "editCategories": []
        },
        {
          "id": 155,
          "menuId": "",
          "name": "Diet Coke",
          "description": "",
          "price": 85,
          "categories": [
            17
          ],
          "editCategories": []
        },
        {
          "id": 156,
          "menuId": "",
          "name": "7up",
          "description": "",
          "price": 85,
          "categories": [
            17
          ],
          "editCategories": []
        },
        {
          "id": 157,
          "menuId": "",
          "name": "Tango",
          "description": "",
          "price": 85,
          "categories": [
            17
          ],
          "editCategories": []
        },
        {
          "id": 158,
          "menuId": "",
          "name": "Small Still Water",
          "description": "",
          "price": 120,
          "categories": [
            17
          ],
          "editCategories": []
        },
        {
          "id": 159,
          "menuId": "",
          "name": "Large Still Water",
          "description": "",
          "price": 160,
          "categories": [
            17
          ],
          "editCategories": []
        },
        {
          "id": 160,
          "menuId": "",
          "name": "Small Sparkling Water",
          "description": "",
          "price": 120,
          "categories": [
            17
          ],
          "editCategories": []
        },
        {
          "id": 161,
          "menuId": "",
          "name": "Large Sparkling Water",
          "description": "",
          "price": 160,
          "categories": [
            17
          ],
          "editCategories": []
        }
      ],
      "categories": [
        {
          "id": 0,
          "name": "Starters"
        },
        {
          "id": 1,
          "name": "Soups"
        },
        {
          "id": 2,
          "name": "Salads"
        },
        {
          "id": 3,
          "name": "Curries"
        },
        {
          "id": 4,
          "name": "Chicken"
        },
        {
          "id": 5,
          "name": "Pork"
        },
        {
          "id": 6,
          "name": "Beef"
        },
        {
          "id": 7,
          "name": "Duck"
        },
        {
          "id": 8,
          "name": "Fish"
        },
        {
          "id": 9,
          "name": "Seafood"
        },
        {
          "id": 10,
          "name": "Prawns"
        },
        {
          "id": 11,
          "name": "Vegetarian"
        },
        {
          "id": 12,
          "name": "Rice"
        },
        {
          "id": 13,
          "name": "Noodles"
        },
        {
          "id": 14,
          "name": "Chef specials"
        },
        {
          "id": 15,
          "name": "Drinks"
        },
        {
          "id": 16,
          "name": "Desserts"
        },
        {
          "id": 17,
          "name": "Del Drinks"
        }
      ]
    });
  });

  app.use('/EPOSDataService/api/menuItems', menuItemsRouter);
};
