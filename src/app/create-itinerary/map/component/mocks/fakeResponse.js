let fakeResponse = [
  {"routes":[{"weight_name":"routability","legs":[{"annotation":{"distance":[11.1,6.4,7.3,8.1,4.8,11.6,3.3,10.6,10.4,6.7,9.5,0.9,3.4,30.3,8.9,26.3,18.1,76.9,7.1,24.2,19,44.7,65.1,2.5,45,36.4,22.9,47.1,21.8,46.4,23.3,15.2,16.6,55.8,17.6,16.6,15.9,29.7,41.8,17.6,83.4,95.9,19,10.6,4,23.4,17.6,119.3,12.9,12.6,34.4],"duration":[7.835,4.536,5.146,5.733,3.408,8.153,2.328,7.485,7.328,4.695,6.674,0.606,2.428,21.305,6.283,18.521,12.739,54.172,4.988,17.043,13.373,31.449,45.814,1.793,31.701,25.615,16.132,33.187,15.361,32.664,16.418,10.734,11.707,39.291,12.424,11.701,11.187,20.9,29.411,12.421,58.714,67.564,13.35,7.46,2.816,16.456,12.367,83.996,9.053,8.883,24.223]},"summary":"Carrera de San Jerónimo, Paseo del Prado","steps":[],"distance":1320.989,"duration":936.274,"weight":936.274},{"annotation":{"distance":[34.4,12.6,12.9,119.3,17.6,23.4,4,10.6,19,95.9,83.4,17.6,41.8,29.7,15.9,16.6,17.6,55.8,16.6,15.2,23.3,46.4,21.8,47.1,22.9,36.4,45,2.5,65.1,44.7,19,24.2,7.1,53.3],"duration":[24.223,8.883,9.053,83.996,12.367,16.456,2.816,7.46,13.35,67.564,58.714,12.421,29.411,20.9,11.187,11.701,12.424,39.291,11.707,10.734,16.418,32.664,15.361,33.187,16.132,25.615,31.701,1.793,45.814,31.449,13.373,17.043,4.988,37.526]},"summary":"Paseo del Prado, Carrera de San Jerónimo","steps":[],"distance":1119.485,"duration":793.37,"weight":793.37},{"annotation":{"distance":[23.6,18.1,26.3,8.9,30.3,4.9,31.5,17.3,14,52.3,33.1,65.4,11.6,2.6,28.3,12.7,4.8,4.2,3,9.4,10.2,37.6,34.1,1.9,5.6,36.4,12.9,5.4,21.7,38.4,95.7,8.8,9.9,51.8,6.7,7.9,20.9],"duration":[16.647,12.739,18.521,6.283,21.305,3.471,22.207,12.195,9.873,36.811,23.333,46.069,8.137,1.805,19.933,8.921,3.379,2.992,2.093,6.601,7.212,26.445,24.043,1.365,3.969,25.66,9.071,3.796,15.251,27.069,67.429,6.185,7.005,36.479,4.706,5.55,14.711]},"summary":"Calle de Carretas, Calle del Conde de Romanones","steps":[],"distance":808.408,"duration":578.301,"weight":578.301},{"annotation":{"distance":[20.9,7.9,6.7,51.8,9.9,8.8,95.7,38.4,21.7,5.4,12.9,36.4,5.6,1.9,34.1,37.6,10.2,9.4,3,4.2,4.8,12.7,28.3,2.6,11.6,65.4,33.1,52.3,14,17.3,31.5,4.9,3.4,0.9,9.5,6.7,10.4,10.6,3.3,11.6,4.8,16.4,103.3,20.3,25.8,42.5,7.8,10,16,35.3,15.3,4.9,96.1,7.4,12.7,3.8,6.4,11.9,13.5,6.3,11.5,15.6,3.9,117.6,18.4,65.6,20.8,6.9,6.5,41,43,13.3,14.9,46.7,20.4,14.9,6.4,30.6,10.6,62.8,9.8,4.8,37.2,12.1,27.6,40.4,8.3,15.5,17.7,29.4,37.9,30.8,13.3,1.3,16,67.8,49.7,11.3,16.8,11.6,9.7,14.8,7.3,24.3,32.4,11.1,103,75.1,9.5,76.8,6,7.4],"duration":[14.711,5.55,4.706,36.479,7.005,6.185,67.429,27.069,15.251,3.796,9.071,25.66,3.969,1.365,24.043,26.445,7.212,6.601,2.093,2.992,3.379,8.921,19.933,1.805,8.137,46.069,23.333,36.811,9.873,12.195,22.207,3.471,2.428,0.606,6.674,4.695,7.328,7.485,2.328,8.153,3.408,11.53,72.716,14.303,18.168,29.918,5.519,7.057,11.27,24.882,10.744,3.444,67.675,5.228,8.914,2.697,4.512,8.415,9.496,4.466,8.103,10.951,2.715,82.784,12.965,46.223,14.615,4.893,4.551,28.85,30.301,9.356,10.477,32.919,14.376,10.467,4.49,21.538,7.492,44.2,6.866,3.394,26.21,8.488,19.407,28.483,5.875,10.901,12.456,20.689,26.721,21.687,9.382,0.942,11.24,47.747,35.005,7.945,11.846,8.197,6.845,10.41,5.171,17.096,22.845,7.813,72.543,52.913,6.72,54.059,4.247,5.191]},"summary":"Calle de Carretas, Calle de Fuencarral","steps":[],"distance":2624.151,"duration":1869.993,"weight":1869.993}],"geometry":{"coordinates":[[-3.70352,40.417088],[-3.703389,40.417095],[-3.703314,40.417091],[-3.703228,40.417088],[-3.703134,40.417072],[-3.703079,40.417061],[-3.702951,40.417023],[-3.702915,40.417011],[-3.702812,40.416958],[-3.702719,40.416897],[-3.702674,40.416847],[-3.702656,40.416763],[-3.702653,40.416756],[-3.702647,40.416725],[-3.70229,40.416729],[-3.702184,40.416725],[-3.701875,40.416714],[-3.701662,40.416702],[-3.700758,40.416634],[-3.700676,40.416626],[-3.700392,40.416603],[-3.700168,40.416588],[-3.699641,40.416588],[-3.698874,40.416565],[-3.698844,40.416565],[-3.698341,40.416435],[-3.697939,40.416321],[-3.697686,40.416248],[-3.697161,40.416111],[-3.696919,40.416042],[-3.696406,40.415897],[-3.696147,40.415829],[-3.696023,40.41573],[-3.695838,40.41568],[-3.695215,40.415516],[-3.69502,40.415462],[-3.694857,40.415379],[-3.69471,40.415291],[-3.694412,40.41515],[-3.694305,40.414783],[-3.694249,40.414631],[-3.693934,40.413921],[-3.693603,40.413097],[-3.693543,40.412933],[-3.693508,40.412842],[-3.693495,40.412807],[-3.69342,40.412605],[-3.693352,40.412457],[-3.693021,40.411415],[-3.693172,40.411427],[-3.69332,40.411438],[-3.693317,40.411129],[-3.69332,40.411438],[-3.693172,40.411427],[-3.693021,40.411415],[-3.693352,40.412457],[-3.69342,40.412605],[-3.693495,40.412807],[-3.693508,40.412842],[-3.693543,40.412933],[-3.693603,40.413097],[-3.693934,40.413921],[-3.694249,40.414631],[-3.694305,40.414783],[-3.694412,40.41515],[-3.69471,40.415291],[-3.694857,40.415379],[-3.69502,40.415462],[-3.695215,40.415516],[-3.695838,40.41568],[-3.696023,40.41573],[-3.696147,40.415829],[-3.696406,40.415897],[-3.696919,40.416042],[-3.697161,40.416111],[-3.697686,40.416248],[-3.697939,40.416321],[-3.698341,40.416435],[-3.698844,40.416565],[-3.698874,40.416565],[-3.699641,40.416588],[-3.700168,40.416588],[-3.700392,40.416603],[-3.700676,40.416626],[-3.700758,40.416634],[-3.701384,40.416679],[-3.701662,40.416702],[-3.701875,40.416714],[-3.702184,40.416725],[-3.70229,40.416729],[-3.702647,40.416725],[-3.702704,40.416729],[-3.703076,40.416737],[-3.70328,40.416729],[-3.703275,40.416603],[-3.703251,40.416134],[-3.703242,40.415836],[-3.703222,40.415249],[-3.703239,40.415146],[-3.703242,40.415123],[-3.703316,40.414875],[-3.703351,40.414764],[-3.703363,40.414722],[-3.703364,40.414684],[-3.703366,40.414658],[-3.703357,40.414574],[-3.703368,40.414482],[-3.703568,40.414181],[-3.703933,40.41431],[-3.703944,40.414295],[-3.703992,40.414261],[-3.704361,40.414093],[-3.704494,40.414036],[-3.70455,40.414013],[-3.70462,40.413826],[-3.704746,40.413494],[-3.705052,40.412666],[-3.705103,40.412598],[-3.705179,40.412529],[-3.705368,40.412086],[-3.705391,40.412029],[-3.705479,40.412006],[-3.705709,40.411938],[-3.705479,40.412006],[-3.705391,40.412029],[-3.705368,40.412086],[-3.705179,40.412529],[-3.705103,40.412598],[-3.705052,40.412666],[-3.704746,40.413494],[-3.70462,40.413826],[-3.70455,40.414013],[-3.704494,40.414036],[-3.704361,40.414093],[-3.703992,40.414261],[-3.703944,40.414295],[-3.703933,40.41431],[-3.703568,40.414181],[-3.703368,40.414482],[-3.703357,40.414574],[-3.703366,40.414658],[-3.703364,40.414684],[-3.703363,40.414722],[-3.703351,40.414764],[-3.703316,40.414875],[-3.703242,40.415123],[-3.703239,40.415146],[-3.703222,40.415249],[-3.703242,40.415836],[-3.703251,40.416134],[-3.703275,40.416603],[-3.70328,40.416729],[-3.703076,40.416737],[-3.702704,40.416729],[-3.702647,40.416725],[-3.702653,40.416756],[-3.702656,40.416763],[-3.702674,40.416847],[-3.702719,40.416897],[-3.702812,40.416958],[-3.702915,40.417011],[-3.702951,40.417023],[-3.703079,40.417061],[-3.703134,40.417072],[-3.703064,40.41721],[-3.70259,40.418064],[-3.702497,40.418232],[-3.702379,40.418446],[-3.702182,40.418797],[-3.702146,40.418861],[-3.702247,40.418907],[-3.70241,40.41898],[-3.702767,40.419144],[-3.702929,40.419205],[-3.702981,40.419224],[-3.702431,40.419979],[-3.702344,40.419971],[-3.702195,40.419964],[-3.702193,40.419998],[-3.702184,40.420055],[-3.70217,40.420162],[-3.702012,40.420155],[-3.701937,40.420162],[-3.701803,40.420151],[-3.701623,40.42012],[-3.701618,40.420155],[-3.701216,40.421165],[-3.701163,40.421326],[-3.700957,40.421894],[-3.700911,40.422077],[-3.700893,40.422138],[-3.700881,40.422195],[-3.700796,40.422558],[-3.700715,40.422939],[-3.700693,40.423058],[-3.700686,40.423191],[-3.700665,40.423611],[-3.700651,40.423794],[-3.70065,40.423927],[-3.700654,40.423985],[-3.700662,40.424259],[-3.700671,40.424355],[-3.700748,40.424915],[-3.70078,40.424999],[-3.700794,40.425041],[-3.700902,40.425365],[-3.700945,40.425468],[-3.701041,40.425705],[-3.701182,40.426052],[-3.701207,40.426125],[-3.701258,40.426258],[-3.701317,40.426411],[-3.701421,40.426662],[-3.701559,40.426987],[-3.70167,40.42725],[-3.701716,40.427364],[-3.701721,40.427376],[-3.701776,40.427513],[-3.70202,40.428093],[-3.702173,40.428524],[-3.702219,40.428619],[-3.702163,40.428764],[-3.702069,40.428841],[-3.701987,40.428902],[-3.701851,40.428986],[-3.701818,40.429047],[-3.701655,40.429226],[-3.701401,40.429443],[-3.701495,40.429512],[-3.701755,40.430416],[-3.701941,40.431076],[-3.701963,40.43116],[-3.702148,40.431835],[-3.702159,40.431889],[-3.702177,40.431953]],"type":"LineString"},"distance":5873.033,"duration":4177.938,"weight":4177.938}],"waypoints":[{"distance":11.071,"name":"","location":[-3.70352,40.417088]},{"distance":12.125,"name":"Calle del Cenicero","location":[-3.693317,40.411129]},{"distance":5.123,"name":"Carrera de San Jerónimo","location":[-3.701384,40.416679]},{"distance":5.445,"name":"Calle del Duque de Alba","location":[-3.705708,40.411938]},{"distance":5.955,"name":"Calle del Cardenal Cisneros","location":[-3.702177,40.431953]}],"code":"Ok","uuid":"wWy8KP8VfEkAG4EjOVFZpyzpCDgXi7F5KgwVR8fixCF16uxtgJef5w=="}
];

module.exports.fakeResponse = fakeResponse;
