import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'apps/libs/entities/tables/place.entity';
import { Table } from 'apps/libs/entities/tables/table.entity';
import { Repository } from 'typeorm';
import { CreateTableDto } from 'apps/libs/dto/table/create-table.dto';
import { envs } from 'apps/libs/config';

const authUrl = envs.auth.backendUrl;

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    @InjectRepository(Table) private tableRepository: Repository<Table>,
  ) {}

  async run() {
    await this.seedPlacesAndTables();
  }

  private async seedUsers() {

const usersData = [
  {
      "id": "1",
      "name": "Jaime Aburto",
      "phone": "996875476",
      "userName": "m464",
      "password": "m1001",
      "email": "m1@m.cl",
      "role": "user"
  },
  {
      "id": "2",
      "name": "Graciela Hernández",
      "phone": "935897399",
      "userName": "m465",
      "password": "m1002",
      "email": "m2@m.cl",
      "role": "user"
  },
  {
      "id": "3",
      "name": "Fernanda Poblete",
      "phone": "990574792",
      "userName": "m466",
      "password": "m1003",
      "email": "m3@m.cl",
      "role": "user"
  },
  {
      "id": "4",
      "name": "Ignacio Gutierrez",
      "phone": "936267824",
      "userName": "m467",
      "password": "m1004",
      "email": "m4@m.cl",
      "role": "user"
  },
  {
      "id": "5",
      "name": "Paulina Hernández",
      "phone": "966029337",
      "userName": "m468",
      "password": "m1005",
      "email": "m5@m.cl",
      "role": "user"
  },
  {
      "id": "6",
      "name": "Iván Aburto",
      "phone": "999043627",
      "userName": "m469",
      "password": "m1006",
      "email": "m6@m.cl",
      "role": "user"
  },
  {
      "id": "7",
      "name": "Miriam Ortiz",
      "phone": "981472223",
      "userName": "m470",
      "password": "m1007",
      "email": "m7@m.cl",
      "role": "user"
  },
  {
      "id": "8",
      "name": "Alejandra Hernández",
      "phone": "938796986",
      "userName": "m471",
      "password": "m1008",
      "email": "m8@m.cl",
      "role": "user"
  },
  {
      "id": "9",
      "name": "Yesenia Gatica",
      "phone": "938906256",
      "userName": "m472",
      "password": "m1009",
      "email": "m9@m.cl",
      "role": "user"
  },
  {
      "id": "10",
      "name": "Yamilet Hernández",
      "phone": "932152558",
      "userName": "m473",
      "password": "m1010",
      "email": "m10@m.cl",
      "role": "user"
  },
  {
      "id": "11",
      "name": "Sofía Ojeda",
      "phone": "959668047",
      "userName": "m474",
      "password": "m1011",
      "email": "m11@m.cl",
      "role": "user"
  },
  {
      "id": "12",
      "name": "Paula Campos",
      "phone": "978212555",
      "userName": "m475",
      "password": "m1012",
      "email": "m12@m.cl",
      "role": "user"
  },
  {
      "id": "13",
      "name": "Maximiliano Rivera",
      "phone": "978212554",
      "userName": "m476",
      "password": "m1013",
      "email": "m13@m.cl",
      "role": "user"
  },
  {
      "id": "14",
      "name": "Marianela Robles",
      "phone": "-",
      "userName": "m477",
      "password": "m1014",
      "email": "m14@m.cl",
      "role": "user"
  },
  {
      "id": "15",
      "name": "Angela Mora",
      "phone": "978066838",
      "userName": "m478",
      "password": "m1015",
      "email": "m15@m.cl",
      "role": "user"
  },
  {
      "id": "16",
      "name": "Isabel Fuentes",
      "phone": "987551032",
      "userName": "m479",
      "password": "m1016",
      "email": "m16@m.cl",
      "role": "user"
  },
  {
      "id": "17",
      "name": "Leonel Yañez",
      "phone": "981471779",
      "userName": "m480",
      "password": "m1017",
      "email": "m17@m.cl",
      "role": "user"
  },
  {
      "id": "18",
      "name": "Francisca Hernández",
      "phone": "968002383",
      "userName": "m481",
      "password": "m1018",
      "email": "m18@m.cl",
      "role": "user"
  },
  {
      "id": "19",
      "name": "Pilar Garrido",
      "phone": "961268475",
      "userName": "m482",
      "password": "m1019",
      "email": "m19@m.cl",
      "role": "user"
  },
  {
      "id": "20",
      "name": "Susana Robles",
      "phone": "973318073",
      "userName": "m483",
      "password": "m1020",
      "email": "m20@m.cl",
      "role": "user"
  },
  {
      "id": "21",
      "name": "Fabiola Méndez",
      "phone": "-",
      "userName": "m484",
      "password": "m1021",
      "email": "m21@m.cl",
      "role": "user"
  },
  {
      "id": "22",
      "name": "Carolina Lara Ibarra",
      "phone": "-",
      "userName": "m485",
      "password": "m1022",
      "email": "m22@m.cl",
      "role": "user"
  },
  {
      "id": "23",
      "name": "Beatriz Moran",
      "phone": "-",
      "userName": "m486",
      "password": "m1023",
      "email": "m23@m.cl",
      "role": "user"
  },
  {
      "id": "24",
      "name": "José Belmar",
      "phone": "-",
      "userName": "m487",
      "password": "m1024",
      "email": "m24@m.cl",
      "role": "user"
  },
  {
      "id": "25",
      "name": "Walterio López",
      "phone": "-",
      "userName": "m488",
      "password": "m1025",
      "email": "m25@m.cl",
      "role": "user"
  },
  {
      "id": "26",
      "name": "Felipe Retamal",
      "phone": "-",
      "userName": "m489",
      "password": "m1026",
      "email": "m26@m.cl",
      "role": "user"
  },
  {
      "id": "27",
      "name": "Constanza Romero Muñoz",
      "phone": "933197508",
      "userName": "m490",
      "password": "m1027",
      "email": "m27@m.cl",
      "role": "user"
  },
  {
      "id": "28",
      "name": "Javiera Reyes",
      "phone": "979063534",
      "userName": "m491",
      "password": "m1028",
      "email": "m28@m.cl",
      "role": "user"
  },
  {
      "id": "29",
      "name": "Yilian Rebolledo",
      "phone": "933205774",
      "userName": "m492",
      "password": "m1029",
      "email": "m29@m.cl",
      "role": "user"
  },
  {
      "id": "30",
      "name": "Marcelo Morales",
      "phone": "994957467",
      "userName": "m493",
      "password": "m1030",
      "email": "m30@m.cl",
      "role": "user"
  },
  {
      "id": "31",
      "name": "Eugenio Torres",
      "phone": "981882395",
      "userName": "m494",
      "password": "m1031",
      "email": "m31@m.cl",
      "role": "user"
  },
  {
      "id": "32",
      "name": "Nicol Fuentealba",
      "phone": "949467936",
      "userName": "m495",
      "password": "m1032",
      "email": "m32@m.cl",
      "role": "user"
  },
  {
      "id": "33",
      "name": "Giovana Manríquez",
      "phone": "937399867",
      "userName": "m496",
      "password": "m1033",
      "email": "m33@m.cl",
      "role": "user"
  },
  {
      "id": "34",
      "name": "Fernando Herrera",
      "phone": "987139923",
      "userName": "m497",
      "password": "m1034",
      "email": "m34@m.cl",
      "role": "user"
  },
  {
      "id": "35",
      "name": "Tatiana Castillo",
      "phone": "997870048",
      "userName": "m498",
      "password": "m1035",
      "email": "m35@m.cl",
      "role": "user"
  },
  {
      "id": "36",
      "name": "Paula Jiménez",
      "phone": "961648685",
      "userName": "m499",
      "password": "m1036",
      "email": "m36@m.cl",
      "role": "user"
  },
  {
      "id": "37",
      "name": "Angélica Troncoso",
      "phone": "985158330",
      "userName": "m500",
      "password": "m1037",
      "email": "m37@m.cl",
      "role": "user"
  },
  {
      "id": "38",
      "name": "Francisco Henríquez",
      "phone": "964224974",
      "userName": "m501",
      "password": "m1038",
      "email": "m38@m.cl",
      "role": "user"
  },
  {
      "id": "39",
      "name": "Verónica Ortega",
      "phone": "998989422",
      "userName": "m502",
      "password": "m1039",
      "email": "m39@m.cl",
      "role": "user"
  },
  {
      "id": "40",
      "name": "Mario Tizando",
      "phone": "942173956",
      "userName": "m503",
      "password": "m1040",
      "email": "m40@m.cl",
      "role": "user"
  },
  {
      "id": "41",
      "name": "Camila Salinas",
      "phone": "942863772",
      "userName": "m504",
      "password": "m1041",
      "email": "m41@m.cl",
      "role": "user"
  },
  {
      "id": "42",
      "name": "Marcela Abornoz",
      "phone": "932153409",
      "userName": "m505",
      "password": "m1042",
      "email": "m42@m.cl",
      "role": "user"
  },
  {
      "id": "43",
      "name": "Katalina Maureira",
      "phone": "996712455",
      "userName": "m506",
      "password": "m1043",
      "email": "m43@m.cl",
      "role": "user"
  },
  {
      "id": "44",
      "name": "M. Paula Díaz",
      "phone": "955298706",
      "userName": "m507",
      "password": "m1044",
      "email": "m44@m.cl",
      "role": "user"
  },
  {
      "id": "45",
      "name": "Leonor Antilao",
      "phone": "956517945",
      "userName": "m508",
      "password": "m1045",
      "email": "m45@m.cl",
      "role": "user"
  },
  {
      "id": "46",
      "name": "Yenifer Yañez",
      "phone": "961618522",
      "userName": "m509",
      "password": "m1046",
      "email": "m46@m.cl",
      "role": "user"
  },
  {
      "id": "47",
      "name": "Angy",
      "phone": "945723185",
      "userName": "m510",
      "password": "m1047",
      "email": "m47@m.cl",
      "role": "user"
  },
  {
      "id": "48",
      "name": "María Sepúlveda",
      "phone": "973925318",
      "userName": "m511",
      "password": "m1048",
      "email": "m48@m.cl",
      "role": "user"
  },
  {
      "id": "49",
      "name": "Josafat Contreras",
      "phone": "957432623",
      "userName": "m512",
      "password": "m1049",
      "email": "m49@m.cl",
      "role": "user"
  },
  {
      "id": "50",
      "name": "Ana María Muñoz",
      "phone": "927759168",
      "userName": "m513",
      "password": "m1050",
      "email": "m50@m.cl",
      "role": "user"
  },
  {
      "id": "51",
      "name": "Diego Salazar",
      "phone": "935476163",
      "userName": "m514",
      "password": "m1051",
      "email": "m51@m.cl",
      "role": "user"
  },
  {
      "id": "52",
      "name": "Galo Valdez",
      "phone": "949525619",
      "userName": "m515",
      "password": "m1052",
      "email": "m52@m.cl",
      "role": "user"
  },
  {
      "id": "53",
      "name": "Yolanda López",
      "phone": "-",
      "userName": "m516",
      "password": "m1053",
      "email": "m53@m.cl",
      "role": "user"
  },
  {
      "id": "54",
      "name": "Paula del Pozo",
      "phone": "935057127",
      "userName": "m517",
      "password": "m1054",
      "email": "m54@m.cl",
      "role": "user"
  },
  {
      "id": "55",
      "name": "Deysi",
      "phone": "989114802",
      "userName": "m518",
      "password": "m1055",
      "email": "m55@m.cl",
      "role": "user"
  },
  {
      "id": "56",
      "name": "Iván Saldias",
      "phone": "966072774",
      "userName": "m519",
      "password": "m1056",
      "email": "m56@m.cl",
      "role": "user"
  },
  {
      "id": "57",
      "name": "Yasna Apablaza",
      "phone": "959758779",
      "userName": "m520",
      "password": "m1057",
      "email": "m57@m.cl",
      "role": "user"
  },
  {
      "id": "58",
      "name": "Lorena Bahamondes",
      "phone": "962044277",
      "userName": "m521",
      "password": "m1058",
      "email": "m58@m.cl",
      "role": "user"
  },
  {
      "id": "59",
      "name": "Donatila Durán",
      "phone": "977855013",
      "userName": "m522",
      "password": "m1059",
      "email": "m59@m.cl",
      "role": "user"
  },
  {
      "id": "60",
      "name": "Matías Guzmán",
      "phone": "974022391",
      "userName": "m523",
      "password": "m1060",
      "email": "m60@m.cl",
      "role": "user"
  },
  {
      "id": "61",
      "name": "Sandra Tejos",
      "phone": "972149292",
      "userName": "m524",
      "password": "m1061",
      "email": "m61@m.cl",
      "role": "user"
  },
  {
      "id": "62",
      "name": "Carolina Fuentes",
      "phone": "993528994",
      "userName": "m525",
      "password": "m1062",
      "email": "m62@m.cl",
      "role": "user"
  },
  {
      "id": "63",
      "name": "Carla Urrutia",
      "phone": "955284419",
      "userName": "m526",
      "password": "m1063",
      "email": "m63@m.cl",
      "role": "user"
  },
  {
      "id": "64",
      "name": "Isabel Castillo",
      "phone": "971805778",
      "userName": "m527",
      "password": "m1064",
      "email": "m64@m.cl",
      "role": "user"
  },
  {
      "id": "65",
      "name": "Paula Maria Canales",
      "phone": "987155925",
      "userName": "m528",
      "password": "m1065",
      "email": "m65@m.cl",
      "role": "user"
  },
  {
      "id": "66",
      "name": "Alejandro Ramos",
      "phone": "988837868",
      "userName": "m529",
      "password": "m1066",
      "email": "m66@m.cl",
      "role": "user"
  },
  {
      "id": "67",
      "name": "Carolyn",
      "phone": "940732220",
      "userName": "m530",
      "password": "m1067",
      "email": "m67@m.cl",
      "role": "user"
  },
  {
      "id": "68",
      "name": "Pamela Guzmán",
      "phone": "986242645",
      "userName": "m531",
      "password": "m1068",
      "email": "m68@m.cl",
      "role": "user"
  },
  {
      "id": "69",
      "name": "M. Teresa Carrillo",
      "phone": "933112935",
      "userName": "m532",
      "password": "m1069",
      "email": "m69@m.cl",
      "role": "user"
  },
  {
      "id": "70",
      "name": "Javiera Salgado",
      "phone": "972766545",
      "userName": "m533",
      "password": "m1070",
      "email": "m70@m.cl",
      "role": "user"
  },
  {
      "id": "71",
      "name": "Cristina",
      "phone": "951592989",
      "userName": "m534",
      "password": "m1071",
      "email": "m71@m.cl",
      "role": "user"
  },
  {
      "id": "72",
      "name": "Patricia Suazo",
      "phone": "936219577",
      "userName": "m535",
      "password": "m1072",
      "email": "m72@m.cl",
      "role": "user"
  },
  {
      "id": "73",
      "name": "Yohana",
      "phone": "972771615",
      "userName": "m536",
      "password": "m1073",
      "email": "m73@m.cl",
      "role": "user"
  },
  {
      "id": "74",
      "name": "María Jesús Ruiz",
      "phone": "998835586",
      "userName": "m537",
      "password": "m1074",
      "email": "m74@m.cl",
      "role": "user"
  },
  {
      "id": "75",
      "name": "María Belén Ruiz",
      "phone": "98533804",
      "userName": "m538",
      "password": "m1075",
      "email": "m75@m.cl",
      "role": "user"
  },
  {
      "id": "76",
      "name": "Armando Vásquez",
      "phone": "982446420",
      "userName": "m539",
      "password": "m1076",
      "email": "m76@m.cl",
      "role": "user"
  },
  {
      "id": "77",
      "name": "Victoria Lagos",
      "phone": "991621957",
      "userName": "m540",
      "password": "m1077",
      "email": "m77@m.cl",
      "role": "user"
  },
  {
      "id": "78",
      "name": "Ana María Hernández",
      "phone": "963348408",
      "userName": "m541",
      "password": "m1078",
      "email": "m78@m.cl",
      "role": "user"
  },
  {
      "id": "79",
      "name": "Nicol Orellana",
      "phone": "996327361",
      "userName": "m542",
      "password": "m1079",
      "email": "m79@m.cl",
      "role": "user"
  },
  {
      "id": "80",
      "name": "Yenifer Urrutia",
      "phone": "951630696",
      "userName": "m543",
      "password": "m1080",
      "email": "m80@m.cl",
      "role": "user"
  },
  {
      "id": "81",
      "name": "Licarayen Jimenez",
      "phone": "991991942",
      "userName": "m544",
      "password": "m1081",
      "email": "m81@m.cl",
      "role": "user"
  },
  {
      "id": "82",
      "name": "Bernardita Pérez",
      "phone": "964224440",
      "userName": "m545",
      "password": "m1082",
      "email": "m82@m.cl",
      "role": "user"
  },
  {
      "id": "83",
      "name": "Evelyn Quezada",
      "phone": "999757756",
      "userName": "m546",
      "password": "m1083",
      "email": "m83@m.cl",
      "role": "user"
  },
  {
      "id": "84",
      "name": "Irene Mena",
      "phone": "965373465",
      "userName": "m547",
      "password": "m1084",
      "email": "m84@m.cl",
      "role": "user"
  },
  {
      "id": "85",
      "name": "Jaquelin Gonzalez",
      "phone": "999162360",
      "userName": "m548",
      "password": "m1085",
      "email": "m85@m.cl",
      "role": "user"
  },
  {
      "id": "86",
      "name": "Javier Aburto",
      "phone": "954355935",
      "userName": "m549",
      "password": "m1086",
      "email": "m86@m.cl",
      "role": "user"
  },
  {
      "id": "87",
      "name": "Jorge Belmar",
      "phone": "975658124",
      "userName": "m550",
      "password": "m1087",
      "email": "m87@m.cl",
      "role": "user"
  },
  {
      "id": "88",
      "name": "M. Paz Valdez",
      "phone": "992246876",
      "userName": "m551",
      "password": "m1088",
      "email": "m88@m.cl",
      "role": "user"
  },
  {
      "id": "89",
      "name": "M. Eliana Valdez",
      "phone": "978821667",
      "userName": "m552",
      "password": "m1089",
      "email": "m89@m.cl",
      "role": "user"
  },
  {
      "id": "90",
      "name": "Mireya Ruiz",
      "phone": "993429220",
      "userName": "m553",
      "password": "m1090",
      "email": "m90@m.cl",
      "role": "user"
  },
  {
      "id": "91",
      "name": "Hernan Ortega",
      "phone": "984733595",
      "userName": "m554",
      "password": "m1091",
      "email": "m91@m.cl",
      "role": "user"
  },
  {
      "id": "92",
      "name": "Silvana Chandía",
      "phone": "990773422",
      "userName": "m555",
      "password": "m1092",
      "email": "m92@m.cl",
      "role": "user"
  },
  {
      "id": "93",
      "name": "Soledad Vilches",
      "phone": "981384193",
      "userName": "m556",
      "password": "m1093",
      "email": "m93@m.cl",
      "role": "user"
  },
  {
      "id": "94",
      "name": "Cecilia Fuentes",
      "phone": "996276687",
      "userName": "m557",
      "password": "m1094",
      "email": "m94@m.cl",
      "role": "user"
  },
  {
      "id": "95",
      "name": "Alejandra Letelier",
      "phone": "973966103",
      "userName": "m558",
      "password": "m1095",
      "email": "m95@m.cl",
      "role": "user"
  },
  {
      "id": "96",
      "name": "Karla Parada",
      "phone": "934104293",
      "userName": "m559",
      "password": "m1096",
      "email": "m96@m.cl",
      "role": "user"
  },
  {
      "id": "97",
      "name": "Marcia Vásquez",
      "phone": "940452703",
      "userName": "m560",
      "password": "m1097",
      "email": "m97@m.cl",
      "role": "user"
  },
  {
      "id": "98",
      "name": "Camila Rojo",
      "phone": "983324104",
      "userName": "m561",
      "password": "m1098",
      "email": "m98@m.cl",
      "role": "user"
  },
  {
      "id": "99",
      "name": "Jaquelin Toledo",
      "phone": "976072491",
      "userName": "m562",
      "password": "m1099",
      "email": "m99@m.cl",
      "role": "user"
  },
  {
      "id": "100",
      "name": "Iván Castillo",
      "phone": "999697067",
      "userName": "m563",
      "password": "m1100",
      "email": "m100@m.cl",
      "role": "user"
  },
  {
      "id": "101",
      "name": "Patricio Contreras",
      "phone": "988394230",
      "userName": "m564",
      "password": "m1101",
      "email": "m101@m.cl",
      "role": "user"
  },
  {
      "id": "102",
      "name": "Patricia Ruiz",
      "phone": "95293169",
      "userName": "m565",
      "password": "m1102",
      "email": "m102@m.cl",
      "role": "user"
  },
  {
      "id": "103",
      "name": "Verónica Maureira",
      "phone": "934100234",
      "userName": "m566",
      "password": "m1103",
      "email": "m103@m.cl",
      "role": "user"
  },
  {
      "id": "104",
      "name": "Mauricio Cid",
      "phone": "999720887",
      "userName": "m567",
      "password": "m1104",
      "email": "m104@m.cl",
      "role": "user"
  },
  {
      "id": "105",
      "name": "Oscar Muñoz Riffo",
      "phone": "",
      "userName": "oscar",
      "password": "m1105",
      "email": "m105@m.cl",
      "role": "general"
  },
  {
      "id": "106",
      "name": "Cristian Ruiz",
      "phone": "",
      "userName": "cristian",
      "password": "m1106",
      "email": "m106@m.cl",
      "role": "general"
  },
  {
      "id": "107",
      "name": "Francisco Luarte",
      "phone": "",
      "userName": "francisco",
      "password": "m1107",
      "email": "m107@m.cl",
      "role": "general"
  },
  {
      "id": "108",
      "name": "Pedro Ruiz",
      "phone": "",
      "userName": "pedro",
      "password": "m1108",
      "email": "m108@m.cl",
      "role": "general"
  },
  {
      "id": "109",
      "name": "Felipe Vásquez",
      "phone": "",
      "userName": "felipe",
      "password": "m1109",
      "email": "m109@m.cl",
      "role": "general"
  },
  {
      "id": "110",
      "name": "Valentina Faúndes",
      "phone": "",
      "userName": "valentina",
      "password": "m1110",
      "email": "m110@m.cl",
      "role": "general"
  },
  {
      "id": "111",
      "name": "Rodrigo Valdéz",
      "phone": "",
      "userName": "rodrigo",
      "password": "m1111",
      "email": "m111@m.cl",
      "role": "general"
  },
  {
      "id": "112",
      "name": "Jaime Salinas",
      "phone": "",
      "userName": "jaime",
      "password": "m1112",
      "email": "m112@m.cl",
      "role": "general"
  },
  {
      "id": "113",
      "name": "Cristian Sanchez",
      "phone": "",
      "userName": "sanchez",
      "password": "m1113",
      "email": "m113@m.cl",
      "role": "general"
  },
  {
      "id": "114",
      "name": "Tomás Muñoz",
      "phone": "",
      "userName": "tomas",
      "password": "m1114",
      "email": "m114@m.cl",
      "role": "general"
  },
  {
      "id": "115",
      "name": "Iván Damino",
      "phone": "",
      "userName": "ivan",
      "password": "m1115",
      "email": "m115@m.cl",
      "role": "general"
  },
  {
      "id": "116",
      "name": "Patricio Ojeda",
      "phone": "",
      "userName": "pato",
      "password": "m1116",
      "email": "m116@m.cl",
      "role": "admin"
  },
  {
      "id": "117",
      "name": "Paulina Orellana",
      "phone": "",
      "userName": "pay",
      "password": "m1117",
      "email": "m117@m.cl",
      "role": "admin"
  },
  {
      "id": "118",
      "name": "Felipe Chandía",
      "phone": "",
      "userName": "admin",
      "password": "admin",
      "email": "admin@m.cl",
      "role": "admin"
  }
]
  

    for (const user of usersData) {
      try {
        const response = await fetch(authUrl + '/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
  
        if (response.ok) {
          console.log(`User ${user.name} created successfully.`);
        } else {
          console.error(`Failed to create user ${user.name}:`, await response.text());
        }
      } catch (error) {
        console.error(`Error creating user ${user.name}:`, error);
      }
    }
  }

  private async seedPlacesAndTables() {

    await this.seedUsers();

    const placesData = [
      { name: 'Escuela Arrau Mendez', mesas: 10, userId: 105 },
      { name: 'Escuela José Matta', mesas: 10, userId: 106 },
      { name: 'Colegio Alberto Molina', mesas: 6, userId: 107 },
      { name: 'Colegio Pablo Neruda', mesas: 14, userId: 108 },
      { name: 'Colegio Providencia', mesas: 14, userId: 109 },
      { name: 'Escuela Luis Armando Gómez', mesas: 19, userId: 109 },
      { name: 'Escuela Nider Orrego', mesas: 8, userId: 110 },
      { name: 'Liceo Federico Heise', mesas: 12, userId: 111 },
      { name: 'Escuela El Libertador', mesas: 4,  userId: 112 },
      { name: 'Escuela Ignacio Urrutia', mesas: 4, userId: 113 },
      { name: 'Gimnasio Las Camelias', mesas: 3, userId: 114 },
    ];

    console.log('Seeding places and tables...');

    let mesaStart = 1;
    for (const placeData of placesData) {
      const existingPlace = await this.placeRepository.findOne({
        where: { name: placeData.name },
      });

      let place: Place;
      if (!existingPlace) {
        place = this.placeRepository.create({ name: placeData.name, userId: placeData.userId });
        place = await this.placeRepository.save(place);
      } else {
        place = existingPlace;
      }

      for (let i = 0; i < placeData.mesas; i++) {
        const tableNumber = mesaStart + i;

        const existingTable = await this.tableRepository.findOne({
          where: {
            number: tableNumber,
            place: { id: place.id }, // Modificado para usar la relación
          },
        });

        if (!existingTable) {
          const table = this.tableRepository.create({
            number: tableNumber,
            userId: tableNumber,
            ojeda: 0,
            castro: 0,
            abasolo: 0,
            blanks: 0,
            nulls: 0,
            place: { id: place.id }, // Establecer la relación con el lugar
          });

          await this.tableRepository.save(table);
        }
      }

      mesaStart += placeData.mesas;
    }
  }
}
