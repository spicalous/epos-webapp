module.exports = function(app) {
  var express = require('express');
  var menuItemsRouter = express.Router();
  var model = generateModel();

  function generateModel() {
    var result = [];
    result.push(create(1, '', 'SET MENU A (2pp)', '', 3800, [], []));
    result.push(create(2, '', 'SET MENU A+ (+1pp)', '', 1900, [], []));
    result.push(create(3, '', 'SET MENU B (4pp)', '', 8400, [], []));
    result.push(create(4, '', 'SET MENU B+ (+1pp)', '', 2100, [], []));
    result.push(create(5, '', 'LUNCH SET', '', 895, [], []));
    result.push(create(6, '', 'CRISPY SEAWEED', '', 250, [], []));
    result.push(create(7, '', 'PLUM SAUCE (50ml)', '', 50, [], []));
    result.push(create(8, '', 'PEANUT SAUCE (50ml)', '', 50, [], []));
    result.push(create(9, '', 'SWEET CHILLI (50ml)', '', 50, [], []));
    result.push(create(10, '', 'SWEET CHILLI (200ml)', '', 200, [], []));
    result.push(create(11, '', 'SOY SAUCE (50ml)', '', 50, [], []));
    result.push(create(12, '', 'SOY SAUCE (200ml)', '', 285, [], []));
    result.push(create(13, '', 'CHILLI OIL (50ml)', '', 75, [], []));
    result.push(create(14, '', 'CHILLI OIL (200ml)', '', 295, [], []));
    result.push(create(15, '', 'TAMARIND SAUCE', '', 150, [], []));
    result.push(create(16, '', 'Eda', 'Lightly salted green soybeans in pod', 295, [1], [1, 2, 3]));
    result.push(create(17, '', 'Spicy PC', 'Authentic Thai spicy prawn crackers, served with sweet chilli sauce', 250, [1], [1, 2, 3]));
    result.push(create(18, '1', 'Chicken Satay', 'Marinated chicken skewered on bamboo, served with peanut sauce', 575, [1], [1, 2, 3]));
    result.push(create(19, '2', 'Prawn Rolls', 'Deep fried prawns and minced chicken wrapped in a pancake, served with plum sauce', 595, [1], [1, 2, 3]));
    result.push(create(20, '3', 'Dim Sum', 'Steamed minced chicken and water chestnuts wrapped in won ton skin, served with sweet soy sauce and sprinkled with fried garlic', 525, [1], [1, 2, 3]));
    result.push(create(21, '4', 'Veg S/Rolls', 'Glass vermicelli, shredded cabbage and carrots rolled in rice paper and deep fried until crisp, served with sweet chilli sauce', 525, [1], [1, 2, 3]));
    result.push(create(22, '5', 'Fish Cakes', 'Fish made into cake with red curry paste, chopped lime leaves and green beans, served with a sweet chilli sauce', 525, [1], [1, 2, 3]));
    result.push(create(23, '6', 'Corn Cakes', 'Corn spiced with curry paste mixed with chopped lime leaves, served with a sweet chilli sauce', 525, [1], [1, 2, 3]));
    result.push(create(24, '7', 'Prawns Toast', 'Minced prawns mixed with garlic, pepper and coriander roots spread on bread triangles and deep fried, served with sweet chilli sauce', 575, [1], [1, 2, 3]));
    result.push(create(25, '8', 'Spare Ribs', 'Deep fried spare ribs marinated in our chefs special sauce', 525, [1], [1, 2, 3]));
    result.push(create(26, '9', 'Squid', 'Tender squid dipped in batter and fried, served with a sweet chilli sauce', 525, [1], [1, 2, 3]));
    result.push(create(27, '10', 'Chicken Wings', 'Boneless chicken wings stuffed with minced chicken and herb, served with chilli sauce', 525, [1], [1, 2, 3]));
    result.push(create(28, '11', 'Tofu', 'Deep fried beancurd, served with sweet chilli sauce', 495, [1], [1, 2, 3]));
    result.push(create(29, '12', 'Won Ton', 'Deep fried won ton filled with minced chicken, served with sweet chilli sauce', 525, [1], [1, 2, 3]));
    result.push(create(30, '14', 'Grilled Prawns', 'Grilled king prawns, served with Thai spicy sauce', 595, [1], [1, 2, 3]));
    result.push(create(31, '15', 'Veg Tempura', 'Deep fried mixed vegetables in batter, served with sweet chilli sauce', 495, [1], [1, 2, 3]));
    result.push(create(32, '15A', 'Prawn Tempura', 'Deep fried prawns dipped in breadcrumbs, served with sweet chilli sauce', 595, [1], [1, 2, 3]));
    result.push(create(33, '16', 'Veg Pancake', 'Deep fried Thai leek stuffing in pancakes served with a sweet soya sauce and sesame seeds', 495, [1], [1, 2, 3]));
    result.push(create(34, '17', 'Mix Starter (1pp)', 'A delicious platter of chicken satay, prawn rolls, spring rolls, fish cakes, prawn on toasts and crispy won tons', 725, [1], [1, 2, 3]));
    result.push(create(35, '17', 'Mix Starter (2pp)', 'A delicious platter of chicken satay, prawn rolls, spring rolls, fish cakes, prawn on toasts and crispy won tons', 1450, [1], [1, 2, 3]));
    result.push(create(36, '17+', 'Mix Starter (+1pp)', 'A delicious platter of chicken satay, prawn rolls, spring rolls, fish cakes, prawn on toasts and crispy won tons', 725, [1], [1, 2, 3]));
    result.push(create(37, '291', 'Pancake', '', 150, [1], [1, 2, 3]));
    result.push(create(38, '291', 'QUARTER Aromatic Duck', '', 1050, [1], [1, 2, 3]));
    result.push(create(39, '291', 'HALF Aromatic Duck', '', 1850, [1], [1, 2, 3]));
    result.push(create(40, '291', 'WHOLE Aromatic Duck', '', 3400, [1], [1, 2, 3]));
    result.push(create(41, '18', 'Tom Yum Prawns', 'Popular Thai classic spicy lemongrass soup with prawns, mushrooms, fresh chilli, tomatoes and lime juice', 595, [2], [1, 2, 3]));
    result.push(create(42, '18A', 'Tom Yum Chicken', 'Popular Thai classic spicy lemongrass soup with chicken, mushrooms, fresh chilli, tomatoes and lime juice', 595, [2], [1, 2, 3]));
    result.push(create(43, '19', 'Tom Kha Prawns', 'Prawns, mushrooms and tomatoes in coconut milk soup flavoured with lemongrass, lime leaves, galangal, chilli and lime juice', 595, [2], [1, 2, 3]));
    result.push(create(44, '19A', 'Tom Kha Chicken', 'Chicken, mushrooms and tomatoes in coconut milk soup flavoured with lemongrass, lime leaves, galangal, chilli and lime juice', 595, [2], [1, 2, 3]));
    result.push(create(45, '20', 'Seafood soup (2pp)', 'Spicy soup with mixed seafood, shallots, lemongrass, lime leaves, basil leaves and fresh chilli in traditional Thai pot', 1350, [2], [1, 2, 3]));
    result.push(create(46, '21', 'Tom Yum Mushroom', 'The classic spicy lemongrass soup with mushrooms, tomatoes, fresh chilli and lime juice', 525, [2], [1, 2, 3]));
    result.push(create(47, '22', 'Tom Kha Mushroom', 'Coconut soup with mushrooms and tomatoes spiced with galangal, lemongrass and lime leaves', 525, [2], [1, 2, 3]));
    result.push(create(48, '23', 'Beef Salad', 'Thinly sliced char-grilled beef served on top of a fresh salad with Thai herbs and a spicy dressing', 925, [3], [1, 2, 3]));
    result.push(create(49, '24', 'Noodle Salad', 'Clear glass vermicelli noodles with prawns, minced chicken, onion and coriander, served with a chilli and lemon dressing', 925, [3], [1, 2, 3]));
    result.push(create(50, '25', 'Tofu Salad', 'Delicious, vegan friendly and a healthy source of protein alternative to meat on a bed of fresh salad in a hot and spicy sauce, garnished with sesame seeds', 795, [3], [1, 2, 3]));
    result.push(create(51, '26', 'Prawn Salad', 'King prawns cooked with lemongrass, shallots and lime leaves, mixed with hot and sour dressing, served on a bed of salad', 950, [3], [1, 2, 3]));
    result.push(create(52, '27', 'Chicken Salad', 'The freshly minced chicken cooked with Thai herbs, ground rice, chilli powder, fish sauce and lime juice', 850, [3], [1, 2, 3]));
    result.push(create(53, '28', 'Seafood Salad', 'Mixed seafood with Thai style herbs and lemon dressing', 975, [3], [1, 2, 3]));
    result.push(create(54, '29', 'Som Tum Papaya Salad', 'Shredded papaya and carrots seasoned with ground peanuts, dry shrimp, lime juice, plum sugar, fish sauce and chilli', 795, [3], [1, 2, 3]));
    result.push(create(55, '29J', 'Som Tum JAY (vegetarian)', 'Shredded papaya and carrots seasoned with ground peanuts, lime juice, plum sugar and chilli', 795, [3], [1, 2, 3]));
    result.push(create(56, '290', 'Duck Salad', 'Shredded aromatic crispy duck with tomatoes, spring onions, cucumber, garlic, chilli and Hoi Sin dressing on a mixed salad', 975, [3], [1, 2, 3]));
    result.push(create(57, '30', 'TOFU Green Curry', 'A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots', 795, [4], [1, 2, 3]));
    result.push(create(58, '30', 'CHICKEN Green Curry', 'A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots', 850, [4], [1, 2, 3]));
    result.push(create(59, '30', 'PORK Green Curry', 'A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots', 850, [4], [1, 2, 3]));
    result.push(create(60, '30', 'BEEF Green Curry', 'A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots', 925, [4], [1, 2, 3]));
    result.push(create(61, '30', 'PRAWNS Green Curry', 'A traditional Thai green curry using fresh green chillies then cooked in coconut milk with aubergines, bell peppers, long beans, sweet basil leaves and bamboo shoots', 950, [4], [1, 2, 3]));
    result.push(create(62, '31', 'TOFU Red Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 795, [4], [1, 2, 3]));
    result.push(create(63, '31', 'CHICKEN Red Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 850, [4], [1, 2, 3]));
    result.push(create(64, '31', 'PORK Red Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 850, [4], [1, 2, 3]));
    result.push(create(65, '31', 'BEEF Red Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 925, [4], [1, 2, 3]));
    result.push(create(66, '31', 'PRAWNS Red Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 950, [4], [1, 2, 3]));
    result.push(create(67, '32', 'TOFU Panang Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 795, [4], [1, 2, 3]));
    result.push(create(68, '32', 'CHICKEN Panang Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 850, [4], [1, 2, 3]));
    result.push(create(69, '32', 'PORK Panang Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 850, [4], [1, 2, 3]));
    result.push(create(70, '32', 'BEEF Panang Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 925, [4], [1, 2, 3]));
    result.push(create(71, '32', 'PRAWNS Panang Curry', 'Red coconut curry with bell peppers, long beans, basil leaves, bamboo shoots, aubergines and chilli', 950, [4], [1, 2, 3]));
    result.push(create(72, '33', 'TOFU Jungle Curry', 'Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables', 795, [4], [1, 2, 3]));
    result.push(create(73, '33', 'CHICKEN Jungle Curry', 'Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables', 850, [4], [1, 2, 3]));
    result.push(create(74, '33', 'PORK Jungle Curry', 'Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables', 850, [4], [1, 2, 3]));
    result.push(create(75, '33', 'BEEF Jungle Curry', 'Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables', 925, [4], [1, 2, 3]));
    result.push(create(76, '33', 'PRAWNS Jungle Curry', 'Jungle curry is a clear but spicy red curry without coconut milk prepared with bamboo shoots, aubergine, basil leaves, long beans and mixed vegetables', 975, [4], [1, 2, 3]));
    result.push(create(77, '34', 'BEEF Massaman', 'A mild beef coconut curry with potatoes, red and green bell peppers, onions, carrots and peanuts', 975, [4], [1, 2, 3]));
    result.push(create(78, '34A', 'CHICKEN Massaman', 'A mild chicken coconut curry with potatoes, red and green bell peppers, onions, carrots and peanuts', 975, [4], [1, 2, 3]));
    result.push(create(79, '34TF', 'TOFU Massaman', 'A mild chicken coconut curry with potatoes, red and green bell peppers, onions, carrots and peanuts', 795, [4], [1, 2, 3]));
    result.push(create(80, '35', 'VEG Green Curry', 'Mixed fresh vegetables cooked in coconut milk with bamboo shoots, sweet basil leaves and green curry paste', 795, [4], [1, 2, 3]));
    result.push(create(81, '36', 'VEG Red Curry', 'Mixed fresh vegetables cooked in coconut milk with bamboo shoots, sweet basil leaves and red curry paste', 795, [4], [1, 2, 3]));
    result.push(create(82, '37', 'VEG Jungle Curry', 'Mixed vegetables in clear spicy red curry without coconut milk', 795, [4], [1, 2, 3]));
    result.push(create(83, '38', 'Chicken Cashew Nuts', 'Chicken with cashew nuts, bell peppers, onions, mushrooms, pineapple and spring onions', 850, [5], [1, 2, 3]));
    result.push(create(84, '39', 'Chicken Ginger', 'Chicken with shredded ginger, mushrooms, carrots, onions in yellow bean sauce', 850, [5], [1, 2, 3]));
    result.push(create(85, '40', 'Chicken Lemongrass', 'Stir fried chicken with lemongrass and chilli', 850, [5], [1, 2, 3]));
    result.push(create(86, '41', 'Chicken Gai Prik Gaeng', 'Chicken stir fried with curry paste and green beans then garnished with finely shredded lime leaves', 850, [5], [1, 2, 3]));
    result.push(create(87, '42', 'Chicken Sweet and Sour', 'Thai style sweet and sour chicken with tomatoes and pineapple', 850, [5], [1, 2, 3]));
    result.push(create(88, '43', 'Chicken Basil', 'Sliced chicken stir fried with basil leaves, onion and chillies', 850, [5], [1, 2, 3]));
    result.push(create(89, '44', 'Pork Garlic', 'Stir fried pork with garlic, pepper and coriander', 850, [6], [1, 2, 3]));
    result.push(create(90, '45', 'Pork Ginger', 'Sliced pork stir fried with fresh ginger, onion, mushroom and spring onion', 850, [6], [1, 2, 3]));
    result.push(create(91, '46', 'Pork Sweet and Sour', 'Thai style sweet and sour dish with pork', 850, [6], [1, 2, 3]));
    result.push(create(92, '47', 'Pork Basil', 'Wok fried pork with added Thai basil and fresh chilli', 850, [6], [1, 2, 3]));
    result.push(create(93, '48', 'Pork Mu Prik Gaeng', 'Green beans and red curry paste stir fried with pork', 850, [6], [1, 2, 3]));
    result.push(create(94, '49', 'Beef Basil', 'Stir fried beef with basil leaves, onions and fresh chillies', 925, [7], [1, 2, 3]));
    result.push(create(95, '50', 'Beef Oyster Sauce', 'Stir fried beef with oyster sauce, mushroom, peppers and spring onion', 925, [7], [1, 2, 3]));
    result.push(create(96, '51', 'Beef Ka Ta', 'Stir fried marinated beef with pineapple, mushroom in XO sauce served on a hot sizzling plate', 975, [7], [1, 2, 3]));
    result.push(create(97, '52', 'Duck Basil', 'Wok fried duck with added Thai basil and fresh chilli', 975, [8], [1, 2, 3]));
    result.push(create(98, '53', 'Duck Panang', 'Roast duck in rich red coconut curry and lime leaves', 995, [8, 4], [1, 2, 3]));
    result.push(create(99, '54', 'Duck Ka Ta', 'Roasted duck with pineapple, mushroom and peppers in XO sauce served on a hot sizzling plate', 995, [8], [1, 2, 3]));
    result.push(create(100, '55', 'Duck Lemongrass', 'Succulent slices of duck quickly wok fried with lemongrass and chilli', 975, [8], [1, 2, 3]));
    result.push(create(101, '56', 'COD Chu Chee', 'Deep fried topped with chu chee curry sauce, coconut milk and garnished with shredded lime leaves', 995, [9, 4], [1, 2, 3]));
    result.push(create(102, '56', 'TROUT Chu Chee', 'Deep fried topped with chu chee curry sauce, coconut milk and garnished with shredded lime leaves', 995, [9, 4], [1, 2, 3]));
    result.push(create(103, '57', 'COD Rad Prik', 'Deep fried and topped with chilli and garlic sauce', 995, [9], [1, 2, 3]));
    result.push(create(104, '57', 'TROUT Rad Prik', 'Deep fried and topped with chilli and garlic sauce', 995, [9], [1, 2, 3]));
    result.push(create(105, '58', 'COD Sweet and Sour', 'Deep fried and topped with vegetables in sweet and sour sauce', 995, [9], [1, 2, 3]));
    result.push(create(106, '58', 'TROUT Sweet and Sour', 'Deep fried and topped with vegetables in sweet and sour sauce', 995, [9], [1, 2, 3]));
    result.push(create(107, '59', 'Prawn Garlic', 'King prawns sauteed with garlic and Thai pepper sauce', 950, [10], [1, 2, 3]));
    result.push(create(108, '60', 'Prawn Basil', 'Stir fried king prawns with Thai basil and fresh chilli', 950, [10], [1, 2, 3]));
    result.push(create(109, '61', 'Goong Nam Prik Pao', 'Prawns sauteed with a roasted chilli sauce', 950, [10], [1, 2, 3]));
    result.push(create(110, '62', 'Prawn Chu Chee', 'Stir fried king prawn topped with chu chee curry sauce then garnished with shredded lime leaves', 950, [10, 4], [1, 2, 3]));
    result.push(create(111, '63', 'Squid Chilli', 'Tender squid stir fried with fresh chilli, garlic and onions', 950, [10], [1, 2, 3]));
    result.push(create(112, '64', 'Prawn Sweet and Sour', 'Thai style sweet and sour king prawns', 950, [10], [1, 2, 3]));
    result.push(create(113, '65', 'Prawn Ginger', 'King prawns stir fried with fresh ginger in yellow bean sauce', 950, [10], [1, 2, 3]));
    result.push(create(114, '66', 'Seafood Pad Talay', 'A medley of mixed seafood in spicy sauce with flavours of lemongrass, basil leaves and red pepper', 995, [10], [1, 2, 3]));
    result.push(create(115, '67', 'Tofu Ginger', 'Fried beancurd with shredded ginger, mushrooms and spring onions, seasoned with yellow bean sauce', 795, [11], [1, 2, 3]));
    result.push(create(116, '68', 'Tofu Basil', 'Fried beancurd with chilli, onions and fresh basil leaves', 795, [11], [1, 2, 3]));
    result.push(create(117, '69', 'Pak Ob', 'Steamed green vegetables topped with garlic and oyster sauce', 720, [11], [1, 2, 3]));
    result.push(create(118, '70', 'Pak Cashew Nut', 'Stir fried mixed vegetables with cashew nuts', 720, [11], [1, 2, 3]));
    result.push(create(119, '71', 'Hed Kee Mao Mushroom', 'Mushrooms, fried with fresh chilli, garlic, basil leaves in XO sauce', 720, [11], [1, 2, 3]));
    result.push(create(120, '72', 'Hed Red Wine', 'Mushrooms and French red wine cooked with sweet and sour sauce', 720, [11], [1, 2, 3]));
    result.push(create(121, '73', 'Pad Pak', 'Mixed vegetables with light soya sauce', 720, [11], [1, 2, 3]));
    result.push(create(122, '74', 'Morning Glory', 'Thai hawker stall favourite of stir fried morning glory with fresh chilli, garlic and oyster sauce', 750, [11], [1, 2, 3]));
    result.push(create(123, '75', 'Choi Sum', 'Stir fried choi sum cooked with fresh chilli, garlic and oyster sauce', 750, [11], [1, 2, 3]));
    result.push(create(124, '76', 'Pad Thai', 'Special Thai style noodles with chicken, prawns, beansprouts, spring onion and egg topped with ground peanuts', 895, [12], [1, 2, 3]));
    result.push(create(125, '76A', 'PRAWN Pad Thai', 'Special Thai style noodles with chicken, prawns, beansprouts, spring onion and egg topped with ground peanuts', 895, [12], [1, 2, 3]));
    result.push(create(126, '76B', 'CHICKEN Pad Thai', 'Special Thai style noodles with chicken, prawns, beansprouts, spring onion and egg topped with ground peanuts', 895, [12], [1, 2, 3]));
    result.push(create(127, '77', 'Singapore Noodles', 'Vermicelli noodles stir fried with curry powder, egg, baby prawns, beansprouts and spring onion', 895, [12], [1, 2, 3]));
    result.push(create(128, '77', 'CHICKEN Singapore Noodles', 'Vermicelli noodles stir fried with curry powder, egg, baby prawns, beansprouts and spring onion', 895, [12], [1, 2, 3]));
    result.push(create(129, '78', 'Pad Si Ew', 'Fried rice noodles with egg, vegetables and a choice of pork, chicken OR beef in a dark soya sauce', 895, [12], [1, 2, 3]));
    result.push(create(130, '78', 'CHICKEN Pad Si Ew', 'Fried rice noodles with egg, vegetables and a choice of pork, chicken OR beef in a dark soya sauce', 895, [12], [1, 2, 3]));
    result.push(create(131, '78', 'PORK Pad Si Ew', 'Fried rice noodles with egg, vegetables and a choice of pork, chicken OR beef in a dark soya sauce', 895, [12], [1, 2, 3]));
    result.push(create(132, '78', 'BEEF Pad Si Ew', 'Fried rice noodles with egg, vegetables and a choice of pork, chicken OR beef in a dark soya sauce', 895, [12], [1, 2, 3]));
    result.push(create(133, '79', 'Pad Kee Mao', 'Fried egg noodles with beef, green vegetables, fresh chilli, garlic and basil leaves', 895, [12], [1, 2, 3]));
    result.push(create(134, '80', 'Pad Thai Jay', 'Popular pad Thai noodles stir fried sweet radish, beansprouts, spring onions, egg and ground peanut', 795, [12, 11], [1, 2, 3]));
    result.push(create(135, '81', 'Guay Teaw Jay', 'Fried egg noodles with spring onions and beansprouts', 550, [12, 11], [1, 2, 3]));
    result.push(create(136, '82', 'Steamed Rice', '', 250, [13], [1, 2, 3]));
    result.push(create(137, '83', 'Egg Rice', '', 280, [13], [1, 2, 3]));
    result.push(create(138, '84', 'Coconut Rice', '', 280, [13], [1, 2, 3]));
    result.push(create(139, '85', 'Sticky Rice', '', 295, [13], [1, 2, 3]));
    result.push(create(140, '86', 'Special Fried Rice', 'Stir fried rice with prawns and chicken', 895, [13], [1, 2, 3]));
    result.push(create(141, '87', 'Prawn Fried Rice', 'Fried rice with prawns, pineapple and cashew nuts', 895, [13], [1, 2, 3]));
    result.push(create(142, '770', 'Singapore Fried Rice', 'Fried rice with curry powder, egg, baby prawns and spring onions', 895, [13], [1, 2, 3]));
    result.push(create(143, '770', 'CHICKEN Singapore Fried Rice', 'Fried rice with curry powder, egg, baby prawns and spring onions', 895, [13], [1, 2, 3]));
    result.push(create(144, '771', 'Tom Yum Fried Rice', 'The most talked about fried rice, now comes to our menu. Absolute blast of hot and sour flavours, prawns and chicken fried rice with aroma of Thai herbs', 895, [13], [1, 2, 3]));
    result.push(create(145, '772', 'Tom Yum Noodle Soup', 'Thin rice vermicelli noodles with chicken and prawns, tomatoes, mushrooms, fresh chilli and lemongrass in Thai famous hot and sour tom yum soup', 980, [12], [1, 2, 3]));
    result.push(create(146, '773', 'Tom Kha Noodle Soup', 'Thick egg noodles with chicken, galangal, lemongrass, fresh chilli, lime juice in a creamy coconut based Thai classic tom kha soup topped with sesame oil', 980, [12], [1, 2, 3]));
    result.push(create(147, '88', 'Duck Tamarind', 'Crispy fried roasted duck topped with tamarind sauce', 995, [14, 8], [1, 2, 3]));
    result.push(create(148, '89', 'Duck Red Curry', 'Roasted duck cooked in red curry, coconut milk, pineapple and tomato', 975, [14, 8, 4], [1, 2, 3]));
    result.push(create(149, '90', 'Duck Ginger', 'Stir fried duck with fresh ginger, mushroom, yellow bean sauce and spring onion', 975, [14, 8], [1, 2, 3]));
    result.push(create(150, '91', 'Steamed Seabass', 'Steamed whole seabass with ginger, spring onion and bean sauce', 1895, [14, 9], [1, 2, 3]));
    result.push(create(151, '92', 'Seabass Rad Prik', 'Deep fried whole seabass topped with chilli garlic sauce', 1895, [14, 9], [1, 2, 3]));
    result.push(create(152, '93', 'BATTERED Salmon Panang', 'Battered salmon fillet topped with panang curry sauce, lime leaves and basil', 1350, [14, 9, 4], [1, 2, 3]));
    result.push(create(153, '93A', 'STEAMED Salmon Panang', 'Steamed salmon fillet topped with panang curry sauce, lime leaves and basil', 1350, [14, 9, 4], [1, 2, 3]));
    result.push(create(154, '93A/T', ' STEAMED Salmon Tamarind', 'Steamed salmon fillet topped with tamarind sauce', 1350, [14, 9, 4], [1, 2, 3]));
    result.push(create(155, '94', 'Seabass Tamarind', 'Deep fried whole seabass topped with tamarind sauce', 1895, [14, 9], [1, 2, 3]));
    result.push(create(156, '', 'Ice cream (2 scoops)', '', 425, [15], [6]));
    result.push(create(157, '', 'After Dinner Mint', '', 495, [15], []));
    result.push(create(158, '', 'Belgian Chocolate Pudding', '', 495, [15], []));
    result.push(create(159, '', 'Bombed by Chocolate', '', 495, [15], []));
    result.push(create(160, '', 'Croquantin Coconut', '', 495, [15], []));
    result.push(create(161, '', 'Funky Pie', '', 495, [15], []));
    result.push(create(162, '', 'Kuaky (chocolate)', '', 425, [15], []));
    result.push(create(163, '', 'Punky (vanilla)', '', 425, [15], []));
    result.push(create(164, '', 'Thai Pandan Crepe', '', 495, [15], []));
    result.push(create(165, '', 'Vesuvius', '', 495, [15], []));
    result.push(create(166, '', 'Lychees in Syrup', '', 350, [15], []));
    result.push(create(167, '', 'Pineapple stuffed in Rambutan', '', 350, [15], []));
    result.push(create(168, '', 'Banana Fritter with ice cream', '', 495, [15], [6]));
    result.push(create(169, '', 'Banana Split', '', 495, [15], []));
    result.push(create(170, '', 'Tap water', '', 0, [16], [4, 5]));
    result.push(create(171, '', 'Coke', '', 225, [16], [4, 5]));
    result.push(create(172, '', 'Large Coke', '', 415, [16], [4, 5]));
    result.push(create(173, '', 'Diet Coke', '', 225, [16], [4, 5]));
    result.push(create(174, '', 'Large Diet Coke', '', 415, [16], [4, 5]));
    result.push(create(175, '', '7up', '', 225, [16], [4, 5]));
    result.push(create(176, '', 'Large 7up', '', 415, [16], [4, 5]));
    result.push(create(177, '', 'Tango', '', 225, [16], [4, 5]));
    result.push(create(178, '', 'Large Tango', '', 415, [16], [4, 5]));
    result.push(create(179, '', 'Soda water', '', 225, [16], [4, 5]));
    result.push(create(180, '', 'Tonic water', '', 225, [16], [4, 5]));
    result.push(create(181, '', 'Apple Juice', '', 250, [16], [4, 5]));
    result.push(create(182, '', 'Orange Juice', '', 250, [16], [4, 5]));
    result.push(create(183, '', 'Pineapple Juice', '', 250, [16], [4, 5]));
    result.push(create(184, '', 'Coconut Juice', '', 275, [16], [4, 5]));
    result.push(create(185, '', 'Small Still Water', '', 275, [16], [4, 5]));
    result.push(create(186, '', 'Large Still Water', '', 350, [16], [4, 5]));
    result.push(create(187, '', 'Small Sparkling Water', '', 275, [16], [4, 5]));
    result.push(create(188, '', 'Large Sparkling Water', '', 350, [16], [4, 5]));
    result.push(create(189, '', 'Fruit Punch', '', 495, [16], [4, 5]));
    result.push(create(190, '', 'Ampawa', '', 495, [16], [4, 5]));
    result.push(create(191, '', 'V.Mojito Apple', '', 495, [16], [4, 5]));
    result.push(create(192, '', 'V.Mojito 7up', '', 495, [16], [4, 5]));
    result.push(create(193, '', 'Strawberry Basil', '', 495, [16], [4, 5]));
    result.push(create(194, '', 'Cream Soda', '', 275, [16], [4, 5]));
    result.push(create(195, '', 'Thai Iced Tea', '', 275, [16], [4, 5]));
    result.push(create(196, '', 'Lemon Iced Tea', '', 275, [16], [4, 5]));
    result.push(create(197, '', 'Jasmine Tea', '', 195, [16], [4, 5]));
    result.push(create(198, '', 'Green Tea', '', 195, [16], [4, 5]));
    result.push(create(199, '', 'Peppermint Tea', '', 195, [16], [4, 5]));
    result.push(create(200, '', 'Chamomile Tea', '', 195, [16], [4, 5]));
    result.push(create(201, '', 'English Tea', '', 225, [16], [4, 5]));
    result.push(create(202, '', 'Coffee', '', 225, [16], [4, 5]));
    result.push(create(203, '', 'Espresso', '', 240, [16], [4, 5]));
    result.push(create(204, '', 'Cappuccino', '', 295, [16], [4, 5]));
    result.push(create(205, '', 'Latte', '', 295, [16], [4, 5]));
    result.push(create(206, '', 'Irish Coffee', '', 550, [16], [4, 5]));
    result.push(create(207, '', 'Liquor Coffee', '', 550, [16], [4, 5]));
    result.push(create(208, '', 'Valentines Raspberry cocktail', '', 695, [17], [4, 5]));
    result.push(create(209, '', 'Singha', '', 375, [17], [4, 5]));
    result.push(create(210, '', 'Chang', '', 375, [17], [4, 5]));
    result.push(create(211, '', 'Corkage Charge', '', 700, [17], [4, 5]));
    result.push(create(212, '', 'House White Glass', '', 475, [17], [4, 5]));
    result.push(create(213, '', 'House White Bottle', '', 1750, [17], [4, 5]));
    result.push(create(214, '', 'Thai White Glass', '', 525, [17], [4, 5]));
    result.push(create(215, '', 'Thai White Bottle', '', 1850, [17], [4, 5]));
    result.push(create(216, '', 'House Red Glass', '', 475, [17], [4, 5]));
    result.push(create(217, '', 'House Red Bottle', '', 1750, [17], [4, 5]));
    result.push(create(218, '', 'Thai Red Glass', '', 525, [17], [4, 5]));
    result.push(create(219, '', 'Thai Red Bottle', '', 1850, [17], [4, 5]));
    result.push(create(220, '', 'Thai Rose Glass', '', 525, [17], [4, 5]));
    result.push(create(221, '', 'Thai Rose Bottle', '', 1850, [17], [4, 5]));
    result.push(create(222, '', 'Prosecco small', '', 550, [17], [4, 5]));
    result.push(create(223, '', 'Prosecco large', '', 1950, [17], [4, 5]));
    result.push(create(224, '', 'Semillon Chardonnay', '', 1950, [17], [4, 5]));
    result.push(create(225, '', 'Pinot Grigio', '', 1950, [17], [4, 5]));
    result.push(create(226, '', 'Sauvignon Blanc', '', 1950, [17], [4, 5]));
    result.push(create(227, '', 'Chablis', '', 2595, [17], [4, 5]));
    result.push(create(228, '', 'Merlot', '', 1950, [17], [4, 5]));
    result.push(create(229, '', 'Pinot Noir', '', 1995, [17], [4, 5]));
    result.push(create(230, '', 'Chianti', '', 1995, [17], [4, 5]));
    result.push(create(231, '', 'Crozes-Hermitage', '', 2250, [17], [4, 5]));
    result.push(create(232, '', 'Pinot Grigio Blush', '', 1950, [17], [4, 5]));
    result.push(create(233, '', 'Moet', '', 5495, [17], [4, 5]));
    result.push(create(234, '', 'Comte De Robart', '', 3495, [17], [4, 5]));
    result.push(create(235, '', 'Mai Tai', '', 695, [17], [4, 5]));
    result.push(create(236, '', 'Talay Thai', '', 695, [17], [4, 5]));
    result.push(create(237, '', 'Tom Yum Cocktail', '', 695, [17], [4, 5]));
    result.push(create(238, '', 'Bikini Martini', '', 695, [17], [4, 5]));
    result.push(create(239, '', 'Citta Amaretto', '', 695, [17], [4, 5]));
    result.push(create(240, '', 'Caipirinha', '', 695, [17], [4, 5]));
    result.push(create(241, '', 'Riviera Promise', '', 695, [17], [4, 5]));
    result.push(create(242, '', 'Mojito', '', 695, [17], [4, 5]));
    result.push(create(243, '', 'Blue Lagoon', '', 595, [17], [4, 5]));
    result.push(create(244, '', 'Sake/cold', '', 495, [17], [4, 5]));
    result.push(create(245, '', 'Sake/hot', '', 495, [17], [4, 5]));
    result.push(create(246, '', 'Bells Whisky', '', 350, [17], [4, 5]));
    result.push(create(247, '', 'Jameson Whisky', '', 350, [17], [4, 5]));
    result.push(create(248, '', 'Vodka', '', 350, [17], [4, 5]));
    result.push(create(249, '', 'Gin', '', 350, [17], [4, 5]));
    result.push(create(250, '', 'Rum', '', 350, [17], [4, 5]));
    result.push(create(251, '', 'Tequila', '', 350, [17], [4, 5]));
    result.push(create(252, '', 'Jack Daniels', '', 375, [17], [4, 5]));
    result.push(create(253, '', 'Johnny Walker', '', 375, [17], [4, 5]));
    result.push(create(254, '', 'Martini', '', 375, [17], [4, 5]));
    result.push(create(255, '', 'Southern Comfort', '', 375, [17], [4, 5]));
    result.push(create(256, '', 'Brandy', '', 375, [17], [4, 5]));
    result.push(create(257, '', 'Malibu', '', 375, [17], [4, 5]));
    result.push(create(258, '', 'Sambuca', '', 375, [17], [4, 5]));
    result.push(create(259, '', 'Remy Martin Cognac', '', 395, [17], [4, 5]));
    result.push(create(260, '', 'MehKong', '', 375, [17], [4, 5]));
    result.push(create(261, '', 'SangSom', '', 375, [17], [4, 5]));
    result.push(create(262, '', 'Baily\'s', '', 350, [17], [4, 5]));
    result.push(create(263, '', 'Tia Maria', '', 350, [17], [4, 5]));
    result.push(create(264, '', 'Grand Marnier', '', 350, [17], [4, 5]));
    result.push(create(265, '', 'Cointreau', '', 350, [17], [4, 5]));
    result.push(create(266, '', 'Kahlua', '', 350, [17], [4, 5]));
    result.push(create(267, '', 'Misc 0.05', '', 5, [18], []));
    result.push(create(268, '', 'Misc 0.10', '', 10, [18], []));
    result.push(create(269, '', 'Misc 0.20', '', 20, [18], []));
    result.push(create(270, '', 'Misc 0.50', '', 50, [18], []));
    result.push(create(271, '', 'Misc 1.00', '', 100, [18], []));
    result.push(create(272, '', 'DELIVERY CHARGE', '', 300, [18], []));
    result.push(create(273, '', 'SPICY PC', '', 250, [18], []));
    result.push(create(274, '', 'CRISPY SEAWEED', '', 250, [18], []));
    result.push(create(275, '', 'PLUM SAUCE (50ml)', '', 50, [18], []));
    result.push(create(276, '', 'PEANUT SAUCE (50ml)', '', 50, [18], []));
    result.push(create(277, '', 'SWEET CHILLI (50ml)', '', 50, [18], []));
    result.push(create(278, '', 'SWEET CHILLI (200ml)', '', 200, [18], []));
    result.push(create(279, '', 'SOY SAUCE (50ml)', '', 50, [18], []));
    result.push(create(280, '', 'SOY SAUCE (200ml)', '', 285, [18], []));
    result.push(create(281, '', 'CHILLI OIL (50ml)', '', 75, [18], []));
    result.push(create(282, '', 'CHILLI OIL (200ml)', '', 295, [18], []));
    result.push(create(283, '', 'COKE', '', 90, [18], []));
    result.push(create(284, '', 'DIET COKE', '', 90, [18], []));
    result.push(create(285, '', '7UP', '', 90, [18], []));
    result.push(create(286, '', 'TANGO', '', 90, [18], []));
    result.push(create(287, '', 'COCONUT JUICE', '', 175, [18], []));
    result.push(create(288, '', 'LEMON ICE TEA', '', 175, [18], []));
    result.push(create(289, '', 'THAI ICE TEA', '', 175, [18], []));
    result.push(create(290, '', 'SMALL STILL', '', 120, [18], []));
    result.push(create(291, '', 'LARGE STILL', '', 190, [18], []));
    result.push(create(292, '', 'SMALL SPARKLING', '', 120, [18], []));
    result.push(create(293, '', 'LARGE SPARKLING', '', 190, [18], []));
    result.push(create(294, '', 'SINGHA', '', 220, [18], []));
    result.push(create(295, '', 'CHANG', '', 220, [18], []));
    result.push(create(296, '', 'HOUSE WHITE', '', 1095, [18], []));
    result.push(create(297, '', 'THAI WHITE', '', 1195, [18], []));
    result.push(create(298, '', 'HOUSE RED', '', 1095, [18], []));
    result.push(create(299, '', 'THAI RED', '', 1195, [18], []));
    result.push(create(300, '', 'CHIANTI', '', 1395, [18], []));
    result.push(create(301, '', 'THAI ROSE', '', 1195, [18], []));
    result.push(create(302, '', 'PINOT GRIGIO BLUSH', '', 1295, [18], []));
    result.push(create(303, '', 'SMALL PROSECCO (20CL)', '', 480, [18], []));
    result.push(create(304, '', 'LARGE PROSECCO (75CL)', '', 1295, [18], []));
    result.push(create(305, '', 'MATCHA GREEN TEA ICE CREAM (500ml)', '', 450, [18], []));
    result.push(create(306, '', 'COCONUT PINACOLADA ICE CREAM (80g)', '', 350, [18], []));
    result.push(create(307, '', 'MINT CHOC CHIP ICE CREAM (80g)', '', 350, [18], []));
    return result;
  }

  function create(id, menuId, name, desc, price, categories, editCategories) {
    return {
      "id": id,
      "menuId": menuId,
      "name": name,
      "description": desc,
      "price": price,
      "categories": categories,
      "editCategories": editCategories
    }
  }

  menuItemsRouter.get('/', function(req, res) {
    res.send({
      "menu-item": model
    });
  });

  menuItemsRouter.get('/:id', function(req, res) {
    var id = req.params.id - 1;

    res.send({
      "menu-item": model[id]
    });
  });

  app.use('/EPOSDataService/api/menuItems', menuItemsRouter);
};
