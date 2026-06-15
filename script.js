// Draft XI Europe v3.0 — normalized team stats + formations hotfix
// Draft XI: Europe v2.0 — integrated CodePen JSX
// Includes expanded teams, contextual alternate positions, fair spinner, reroll, locked players, smarter greying, live simulation, and Play Again.
function setMobileViewportHeight() {
  document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`);

}

setMobileViewportHeight();
window.addEventListener("resize", setMobileViewportHeight);
const { useMemo, useState } = React;

const FORMATIONS = {
  "4-3-3": [
  { id: "GK", label: "GK", x: 50, y: 91 },
  { id: "RB", label: "RB", x: 80, y: 76 },
  { id: "RCB", label: "CB", x: 60, y: 76 },
  { id: "LCB", label: "CB", x: 40, y: 76 },
  { id: "LB", label: "LB", x: 20, y: 76 },
  { id: "CDM", label: "CDM", x: 50, y: 58 },
  { id: "RCM", label: "CM", x: 64, y: 45 },
  { id: "LCM", label: "CM", x: 36, y: 45 },
  { id: "RW", label: "RW", x: 78, y: 25 },
  { id: "ST", label: "ST", x: 50, y: 18 },
  { id: "LW", label: "LW", x: 22, y: 25 }],


  "4-2-3-1": [
  { id: "GK", label: "GK", x: 50, y: 91 },
  { id: "RB", label: "RB", x: 80, y: 76 },
  { id: "RCB", label: "CB", x: 60, y: 76 },
  { id: "LCB", label: "CB", x: 40, y: 76 },
  { id: "LB", label: "LB", x: 20, y: 76 },
  { id: "RDM", label: "CDM", x: 58, y: 58 },
  { id: "LDM", label: "CDM", x: 42, y: 58 },
  { id: "CAM", label: "CAM", x: 50, y: 40 },
  { id: "RW", label: "RW", x: 76, y: 29 },
  { id: "ST", label: "ST", x: 50, y: 17 },
  { id: "LW", label: "LW", x: 24, y: 29 }],


  "4-4-2": [
  { id: "GK", label: "GK", x: 50, y: 91 },
  { id: "RB", label: "RB", x: 80, y: 76 },
  { id: "RCB", label: "CB", x: 60, y: 76 },
  { id: "LCB", label: "CB", x: 40, y: 76 },
  { id: "LB", label: "LB", x: 20, y: 76 },
  { id: "RM", label: "RW", x: 78, y: 52 },
  { id: "RCM", label: "CM", x: 58, y: 52 },
  { id: "LCM", label: "CM", x: 42, y: 52 },
  { id: "LM", label: "LW", x: 22, y: 52 },
  { id: "RST", label: "ST", x: 58, y: 22 },
  { id: "LST", label: "ST", x: 42, y: 22 }],


  "3-4-3": [
  { id: "GK", label: "GK", x: 50, y: 91 },
  { id: "RCB", label: "CB", x: 66, y: 76 },
  { id: "CB", label: "CB", x: 50, y: 76 },
  { id: "LCB", label: "CB", x: 34, y: 76 },
  { id: "RM", label: "RW", x: 80, y: 55 },
  { id: "RCM", label: "CM", x: 58, y: 55 },
  { id: "LCM", label: "CM", x: 42, y: 55 },
  { id: "LM", label: "LW", x: 20, y: 55 },
  { id: "RW", label: "RW", x: 76, y: 25 },
  { id: "ST", label: "ST", x: 50, y: 17 },
  { id: "LW", label: "LW", x: 24, y: 25 }],


  "4-1-2-1-2": [
  { id: "GK", label: "GK", x: 50, y: 91 },
  { id: "RB", label: "RB", x: 80, y: 76 },
  { id: "RCB", label: "CB", x: 60, y: 76 },
  { id: "LCB", label: "CB", x: 40, y: 76 },
  { id: "LB", label: "LB", x: 20, y: 76 },
  { id: "CDM", label: "CDM", x: 50, y: 60 },
  { id: "RCM", label: "CM", x: 62, y: 45 },
  { id: "LCM", label: "CM", x: 38, y: 45 },
  { id: "CAM", label: "CAM", x: 50, y: 31 },
  { id: "RST", label: "ST", x: 58, y: 17 },
  { id: "LST", label: "ST", x: 42, y: 17 }],


  "5-2-3": [
  { id: "GK", label: "GK", x: 50, y: 91 },
  { id: "RWB", label: "RB", x: 84, y: 69 },
  { id: "RCB", label: "CB", x: 64, y: 76 },
  { id: "CB", label: "CB", x: 50, y: 76 },
  { id: "LCB", label: "CB", x: 36, y: 76 },
  { id: "LWB", label: "LB", x: 16, y: 69 },
  { id: "RCM", label: "CM", x: 58, y: 50 },
  { id: "LCM", label: "CM", x: 42, y: 50 },
  { id: "RW", label: "RW", x: 76, y: 25 },
  { id: "ST", label: "ST", x: 50, y: 17 },
  { id: "LW", label: "LW", x: 24, y: 25 }] };



const DEFAULT_FORMATION_NAME = "4-3-3";

const COMPATIBLE = {
  GK: ["GK"],
  RB: ["RB", "LB", "CB", "CDM"],
  CB: ["CB", "RB", "LB", "CDM"],
  LB: ["LB", "RB", "CB", "CDM"],
  CDM: ["CDM", "CM", "CB"],
  CM: ["CM", "CDM", "CAM"],
  CAM: ["CAM", "CM", "RW", "LW", "ST"],
  RW: ["RW", "LW", "CAM", "ST"],
  LW: ["LW", "RW", "CAM", "ST"],
  ST: ["ST", "RW", "LW", "CAM"] };


const CLUBS = [
{
  id: "mci2223",
  name: "Manchester City",
  league: "Premier League",
  season: "2022-23",
  color: "#6CABDD",
  rating: 92,
  players: [
  ["Erling Haaland", "ST", 94], ["Kevin De Bruyne", "CM", 93], ["Rodri", "CDM", 91],
  ["Ruben Dias", "CB", 90], ["Bernardo Silva", "CAM", 90], ["Ederson", "GK", 89],
  ["Phil Foden", "LW", 88], ["Ilkay Gundogan", "CM", 88], ["Joao Cancelo", "LB", 88],
  ["Kyle Walker", "RB", 87], ["John Stones", "CB", 87], ["Jack Grealish", "LW", 86],
  ["Riyad Mahrez", "RW", 86], ["Nathan Ake", "CB", 84], ["Kalvin Phillips", "CDM", 82]] },


{
  id: "mun0708",
  name: "Manchester United",
  league: "Premier League",
  season: "2007-08",
  color: "#DA291C",
  rating: 92,
  players: [
  ["Cristiano Ronaldo", "RW", 95], ["Wayne Rooney", "ST", 91], ["Rio Ferdinand", "CB", 91],
  ["Nemanja Vidic", "CB", 90], ["Paul Scholes", "CM", 89], ["Carlos Tevez", "ST", 88],
  ["Edwin van der Sar", "GK", 88], ["Michael Carrick", "CDM", 87], ["Patrice Evra", "LB", 87],
  ["Owen Hargreaves", "CDM", 86], ["Ryan Giggs", "LW", 86], ["Nani", "LW", 84],
  ["Wes Brown", "RB", 83], ["Anderson", "CM", 82], ["Darren Fletcher", "CM", 81]] },


{
  id: "che0405",
  name: "Chelsea",
  league: "Premier League",
  season: "2004-05",
  color: "#034694",
  rating: 91,
  players: [
  ["Frank Lampard", "CM", 92], ["John Terry", "CB", 91], ["Petr Cech", "GK", 91],
  ["Didier Drogba", "ST", 89], ["Claude Makelele", "CDM", 89], ["Arjen Robben", "LW", 88],
  ["Ricardo Carvalho", "CB", 88], ["William Gallas", "LB", 87], ["Joe Cole", "CAM", 86],
  ["Damien Duff", "LW", 86], ["Eidur Gudjohnsen", "ST", 85], ["Paulo Ferreira", "RB", 84],
  ["Tiago", "CM", 84], ["Geremi", "CM", 82], ["Glen Johnson", "RB", 80]] },


{
  id: "ars0304",
  name: "Arsenal",
  league: "Premier League",
  season: "2003-04",
  color: "#EF0107",
  rating: 91,
  players: [
  ["Thierry Henry", "ST", 94], ["Patrick Vieira", "CM", 91], ["Dennis Bergkamp", "CAM", 90],
  ["Robert Pires", "LW", 90], ["Sol Campbell", "CB", 89], ["Ashley Cole", "LB", 89],
  ["Kolo Toure", "CB", 87], ["Gilberto Silva", "CDM", 86], ["Freddie Ljungberg", "RW", 86],
  ["Jens Lehmann", "GK", 86], ["Edu", "CM", 84], ["Lauren", "RB", 84],
  ["Jose Antonio Reyes", "LW", 83], ["Gael Clichy", "LB", 82], ["Ray Parlour", "CAM", 81]] },


{
  id: "liv1920",
  name: "Liverpool",
  league: "Premier League",
  season: "2019-20",
  color: "#C8102E",
  rating: 91,
  players: [
  ["Virgil van Dijk", "CB", 93], ["Mohamed Salah", "RW", 91], ["Sadio Mane", "LW", 91],
  ["Alisson", "GK", 91], ["Trent Alexander-Arnold", "RB", 90], ["Andrew Robertson", "LB", 89],
  ["Roberto Firmino", "ST", 88], ["Fabinho", "CDM", 88], ["Jordan Henderson", "CM", 86],
  ["Georginio Wijnaldum", "CM", 85], ["Joel Matip", "CB", 84], ["Naby Keita", "CM", 83],
  ["James Milner", "LB", 82], ["Adam Lallana", "CAM", 81], ["Alex Oxlade-Chamberlain", "CAM", 81]] },



{
  id: "bar1011",
  name: "Barcelona",
  league: "La Liga",
  season: "2010-11",
  color: "#A50044",
  rating: 94,
  players: [
  ["Lionel Messi", "RW", 96], ["Xavi", "CM", 94], ["Andres Iniesta", "CM", 94],
  ["Dani Alves", "RB", 91], ["Sergio Busquets", "CDM", 91], ["Carles Puyol", "CB", 90],
  ["David Villa", "LW", 90], ["Gerard Pique", "CB", 89], ["Victor Valdes", "GK", 88],
  ["Javier Mascherano", "CDM", 87], ["Eric Abidal", "LB", 86], ["Pedro", "LW", 86],
  ["Seydou Keita", "CM", 84], ["Adriano", "LB", 82], ["Bojan", "ST", 80]] },


{
  id: "rm1617",
  name: "Real Madrid",
  league: "La Liga",
  season: "2016-17",
  color: "#FEBE10",
  rating: 93,
  players: [
  ["Cristiano Ronaldo", "LW", 95], ["Luka Modric", "CM", 92], ["Sergio Ramos", "CB", 91],
  ["Toni Kroos", "CM", 91], ["Casemiro", "CDM", 90], ["Karim Benzema", "ST", 90],
  ["Marcelo", "LB", 90], ["Gareth Bale", "RW", 89], ["Isco", "CAM", 88],
  ["Keylor Navas", "GK", 88], ["Dani Carvajal", "RB", 87], ["Raphael Varane", "CB", 87],
  ["Pepe", "CB", 87], ["Marco Asensio", "RW", 84], ["Mateo Kovacic", "CM", 84]] },


{
  id: "atm1314",
  name: "Atletico Madrid",
  league: "La Liga",
  season: "2013-14",
  color: "#CB3524",
  rating: 88,
  players: [
  ["Thibaut Courtois", "GK", 90], ["Diego Costa", "ST", 89], ["Diego Godin", "CB", 89],
  ["Koke", "CM", 87], ["Gabi", "CDM", 87], ["Filipe Luis", "LB", 87],
  ["Juanfran", "RB", 86], ["Arda Turan", "LW", 86], ["Miranda", "CB", 86],
  ["David Villa", "ST", 85], ["Tiago", "CM", 84], ["Raul Garcia", "CAM", 83],
  ["Mario Suarez", "CDM", 82], ["Adrian Lopez", "RW", 80], ["Jose Sosa", "CAM", 80]] },


{
  id: "val0304",
  name: "Valencia",
  league: "La Liga",
  season: "2003-04",
  color: "#F18F01",
  rating: 88,
  players: [
  ["Pablo Aimar", "CAM", 90], ["David Albelda", "CDM", 88], ["Ruben Baraja", "CM", 88],
  ["Santiago Canizares", "GK", 88], ["Roberto Ayala", "CB", 88], ["Vicente", "LW", 87],
  ["Miguel Angel Angulo", "RW", 85], ["Mista", "ST", 85], ["Curro Torres", "RB", 84],
  ["Amedeo Carboni", "LB", 84], ["Carlos Marchena", "CB", 84], ["Fabio Aurelio", "LB", 83],
  ["Jorge Lopez", "CM", 82], ["Francisco Rufete", "RW", 82], ["Xisco", "ST", 78]] },


{
  id: "sev1920",
  name: "Sevilla",
  league: "La Liga",
  season: "2019-20",
  color: "#D71920",
  rating: 84,
  players: [
  ["Jesus Navas", "RB", 86], ["Lucas Ocampos", "RW", 85], ["Ever Banega", "CM", 85],
  ["Diego Carlos", "CB", 84], ["Jules Kounde", "CB", 84], ["Fernando", "CDM", 84],
  ["Yassine Bounou", "GK", 83], ["Sergio Reguilon", "LB", 83], ["Joan Jordan", "CM", 82],
  ["Suso", "RW", 82], ["Franco Vazquez", "CAM", 81], ["Luuk de Jong", "ST", 81],
  ["Nemanja Gudelj", "CDM", 80], ["Oliver Torres", "CAM", 80], ["Munir", "LW", 79]] },



{
  id: "bay1920",
  name: "Bayern Munich",
  league: "Bundesliga",
  season: "2019-20",
  color: "#DC052D",
  rating: 93,
  players: [
  ["Robert Lewandowski", "ST", 94], ["Manuel Neuer", "GK", 91], ["Joshua Kimmich", "CDM", 91],
  ["Thomas Muller", "CAM", 90], ["Thiago Alcantara", "CM", 89], ["David Alaba", "CB", 89],
  ["Serge Gnabry", "RW", 88], ["Alphonso Davies", "LB", 88], ["Leon Goretzka", "CM", 88],
  ["Kingsley Coman", "LW", 86], ["Jerome Boateng", "CB", 86], ["Niklas Sule", "CB", 86],
  ["Benjamin Pavard", "RB", 85], ["Lucas Hernandez", "LB", 84], ["Corentin Tolisso", "CM", 83]] },


{
  id: "bvb1213",
  name: "Borussia Dortmund",
  league: "Bundesliga",
  season: "2012-13",
  color: "#FDE100",
  rating: 89,
  players: [
  ["Robert Lewandowski", "ST", 91], ["Marco Reus", "LW", 89], ["Mats Hummels", "CB", 89],
  ["Mario Gotze", "CAM", 88], ["Ilkay Gundogan", "CM", 88], ["Jakub Blaszczykowski", "RW", 86],
  ["Lukasz Piszczek", "RB", 86], ["Roman Weidenfeller", "GK", 85], ["Sven Bender", "CDM", 85],
  ["Neven Subotic", "CB", 85], ["Marcel Schmelzer", "LB", 84], ["Sebastian Kehl", "CDM", 82],
  ["Nuri Sahin", "CM", 82], ["Kevin Grosskreutz", "LB", 81], ["Julian Schieber", "ST", 78]] },


{
  id: "lev2324",
  name: "Bayer Leverkusen",
  league: "Bundesliga",
  season: "2023-24",
  color: "#E32221",
  rating: 90,
  players: [
  ["Florian Wirtz", "CAM", 91], ["Granit Xhaka", "CDM", 88], ["Jeremie Frimpong", "RB", 88],
  ["Alex Grimaldo", "LB", 88], ["Victor Boniface", "ST", 87], ["Jonathan Tah", "CB", 86],
  ["Edmond Tapsoba", "CB", 85], ["Exequiel Palacios", "CM", 85], ["Lukas Hradecky", "GK", 84],
  ["Patrik Schick", "ST", 84], ["Jonas Hofmann", "RW", 84], ["Robert Andrich", "CDM", 83],
  ["Piero Hincapie", "CB", 83], ["Amine Adli", "LW", 82], ["Nathan Tella", "RW", 80]] },


{
  id: "rbl2223",
  name: "RB Leipzig",
  league: "Bundesliga",
  season: "2022-23",
  color: "#DD013F",
  rating: 85,
  players: [
  ["Christopher Nkunku", "CAM", 89], ["Dani Olmo", "CAM", 86], ["Dominik Szoboszlai", "RW", 86],
  ["Josko Gvardiol", "CB", 86], ["Willi Orban", "CB", 84], ["Konrad Laimer", "CDM", 84],
  ["Timo Werner", "ST", 84], ["Andre Silva", "ST", 83], ["David Raum", "LB", 83],
  ["Mohamed Simakan", "RB", 82], ["Xaver Schlager", "CM", 82], ["Emil Forsberg", "LW", 82],
  ["Kevin Kampl", "CM", 81], ["Janis Blaswich", "GK", 80], ["Amadou Haidara", "CDM", 80]] },



{
  id: "inter0910",
  name: "Inter Milan",
  league: "Serie A",
  season: "2009-10",
  color: "#010E80",
  rating: 90,
  players: [
  ["Wesley Sneijder", "CAM", 91], ["Diego Milito", "ST", 90], ["Javier Zanetti", "RB", 90],
  ["Samuel Eto'o", "RW", 89], ["Lucio", "CB", 89], ["Julio Cesar", "GK", 89],
  ["Maicon", "RB", 89], ["Esteban Cambiasso", "CDM", 88], ["Walter Samuel", "CB", 87],
  ["Dejan Stankovic", "CM", 86], ["Thiago Motta", "CM", 85], ["Cristian Chivu", "LB", 84],
  ["Goran Pandev", "CAM", 84], ["Sulley Muntari", "CDM", 81], ["Mario Balotelli", "ST", 81]] },


{
  id: "juv1415",
  name: "Juventus",
  league: "Serie A",
  season: "2014-15",
  color: "#111111",
  rating: 90,
  players: [
  ["Gianluigi Buffon", "GK", 91], ["Andrea Pirlo", "CDM", 90], ["Paul Pogba", "CM", 90],
  ["Carlos Tevez", "ST", 89], ["Giorgio Chiellini", "CB", 89], ["Leonardo Bonucci", "CB", 88],
  ["Arturo Vidal", "CM", 88], ["Claudio Marchisio", "CM", 87], ["Patrice Evra", "LB", 85],
  ["Stephan Lichtsteiner", "RB", 85], ["Alvaro Morata", "ST", 84], ["Roberto Pereyra", "CAM", 82],
  ["Fernando Llorente", "ST", 82], ["Simone Padoin", "CDM", 78], ["Kingsley Coman", "LW", 78]] },


{
  id: "milan0304",
  name: "AC Milan",
  league: "Serie A",
  season: "2003-04",
  color: "#FB090B",
  rating: 92,
  players: [
  ["Paolo Maldini", "CB", 94], ["Andriy Shevchenko", "ST", 93], ["Kaka", "CAM", 92],
  ["Andrea Pirlo", "CDM", 91], ["Alessandro Nesta", "CB", 91], ["Clarence Seedorf", "CM", 90],
  ["Gennaro Gattuso", "CDM", 89], ["Cafu", "RB", 89], ["Dida", "GK", 88],
  ["Filippo Inzaghi", "ST", 87], ["Rui Costa", "CAM", 87], ["Serginho", "LB", 85],
  ["Kakha Kaladze", "LB", 84], ["Massimo Ambrosini", "CM", 84], ["Jon Dahl Tomasson", "ST", 82]] },


{
  id: "nap2223",
  name: "Napoli",
  league: "Serie A",
  season: "2022-23",
  color: "#12A0D7",
  rating: 89,
  players: [
  ["Victor Osimhen", "ST", 90], ["Khvicha Kvaratskhelia", "LW", 89], ["Kim Min-jae", "CB", 88],
  ["Stanislav Lobotka", "CDM", 87], ["Piotr Zielinski", "CM", 86], ["Giovanni Di Lorenzo", "RB", 86],
  ["Andre-Frank Zambo Anguissa", "CM", 86], ["Alex Meret", "GK", 85], ["Mario Rui", "LB", 83],
  ["Giacomo Raspadori", "CAM", 83], ["Hirving Lozano", "RW", 82], ["Mathias Olivera", "LB", 82],
  ["Eljif Elmas", "CAM", 81], ["Tanguy Ndombele", "CDM", 80], ["Juan Jesus", "CB", 79]] },



{
  id: "psg1516",
  name: "Paris Saint-Germain",
  league: "Ligue 1",
  season: "2015-16",
  color: "#004170",
  rating: 89,
  players: [
  ["Zlatan Ibrahimovic", "ST", 92], ["Thiago Silva", "CB", 90], ["Angel Di Maria", "RW", 88],
  ["Marco Verratti", "CM", 88], ["Edinson Cavani", "LW", 87], ["Marquinhos", "CB", 87],
  ["Thiago Motta", "CDM", 86], ["Blaise Matuidi", "CDM", 86], ["David Luiz", "CB", 85],
  ["Maxwell", "LB", 84], ["Kevin Trapp", "GK", 84], ["Javier Pastore", "CAM", 84],
  ["Serge Aurier", "RB", 83], ["Adrien Rabiot", "CM", 82], ["Lucas Moura", "RW", 82]] },


{
  id: "mon1617",
  name: "Monaco",
  league: "Ligue 1",
  season: "2016-17",
  color: "#E51B23",
  rating: 87,
  players: [
  ["Kylian Mbappe", "ST", 90], ["Radamel Falcao", "ST", 88], ["Bernardo Silva", "CAM", 88],
  ["Fabinho", "CDM", 87], ["Thomas Lemar", "LW", 86], ["Joao Moutinho", "CM", 85],
  ["Benjamin Mendy", "LB", 84], ["Djibril Sidibe", "RB", 83], ["Kamil Glik", "CB", 83],
  ["Tiemoue Bakayoko", "CDM", 83], ["Danijel Subasic", "GK", 83], ["Jemerson", "CB", 82],
  ["Valere Germain", "ST", 81], ["Andrea Raggi", "CB", 79], ["Nabil Dirar", "RW", 79]] },


{
  id: "lyon0506",
  name: "Lyon",
  league: "Ligue 1",
  season: "2005-06",
  color: "#0055A4",
  rating: 88,
  players: [
  ["Juninho Pernambucano", "CAM", 91], ["Michael Essien", "CM", 90], ["Florent Malouda", "LW", 87],
  ["Cris", "CB", 87], ["Gregory Coupet", "GK", 87], ["Mahamadou Diarra", "CDM", 87],
  ["Eric Abidal", "LB", 86], ["Sylvain Wiltord", "RW", 85], ["Fred", "ST", 84],
  ["Tiago", "CM", 84], ["Anthony Reveillere", "RB", 83], ["Claudio Cacapa", "CB", 83],
  ["Sidney Govou", "RW", 82], ["Jeremy Toulalan", "CDM", 82], ["Karim Benzema", "ST", 80]] },


{
  id: "lille2021",
  name: "Lille",
  league: "Ligue 1",
  season: "2020-21",
  color: "#E01E13",
  rating: 84,
  players: [
  ["Mike Maignan", "GK", 86], ["Jose Fonte", "CB", 85], ["Renato Sanches", "CM", 84],
  ["Jonathan David", "ST", 84], ["Burak Yilmaz", "ST", 84], ["Jonathan Ikone", "CAM", 83],
  ["Boubakary Soumare", "CDM", 83], ["Benjamin Andre", "CDM", 83], ["Zeki Celik", "RB", 82],
  ["Reinildo", "LB", 82], ["Sven Botman", "CB", 82], ["Jonathan Bamba", "LW", 82],
  ["Yusuf Yazici", "CAM", 81], ["Luiz Araujo", "RW", 80], ["Xeka", "CM", 80]] }];





const JACKPOT_CLUBS = [
{
  id: "ajax9495_jackpot",
  name: "Ajax",
  league: "Eredivisie",
  season: "1994-95",
  color: "#D2122E",
  rating: 91,
  jackpot: true,
  players: [
  ["Edwin van der Sar", "GK", 90], ["Michael Reiziger", "RB", 86],
  ["Frank Rijkaard", "CDM", 91], ["Frank de Boer", "CB", 89],
  ["Danny Blind", "CB", 88], ["Edgar Davids", "CM", 88],
  ["Clarence Seedorf", "CM", 88], ["Jari Litmanen", "CAM", 91],
  ["Marc Overmars", "LW", 89], ["Finidi George", "RW", 86],
  ["Patrick Kluivert", "ST", 88], ["Nwankwo Kanu", "ST", 84],
  ["Ronald de Boer", "CAM", 86], ["Winston Bogarde", "LB", 84],
  ["Sonny Silooy", "RB", 82]] },


{
  id: "porto0304_jackpot",
  name: "Porto",
  league: "Primeira Liga",
  season: "2003-04",
  color: "#0057B8",
  rating: 88,
  jackpot: true,
  players: [
  ["Vitor Baia", "GK", 86], ["Paulo Ferreira", "RB", 86],
  ["Ricardo Carvalho", "CB", 90], ["Jorge Costa", "CB", 86],
  ["Nuno Valente", "LB", 84], ["Costinha", "CDM", 86],
  ["Maniche", "CM", 88], ["Deco", "CAM", 91],
  ["Pedro Mendes", "CM", 84], ["Dmitri Alenichev", "CAM", 83],
  ["Benni McCarthy", "ST", 86], ["Derlei", "ST", 85],
  ["Carlos Alberto", "RW", 82], ["Bosingwa", "RB", 80],
  ["Ricardo Costa", "CB", 80]] },


{
  id: "leicester1516_jackpot",
  name: "Leicester City",
  league: "Premier League",
  season: "2015-16",
  color: "#003090",
  rating: 86,
  jackpot: true,
  players: [
  ["Kasper Schmeichel", "GK", 84], ["Danny Simpson", "RB", 80],
  ["Wes Morgan", "CB", 84], ["Robert Huth", "CB", 83],
  ["Christian Fuchs", "LB", 82], ["N'Golo Kante", "CDM", 90],
  ["Danny Drinkwater", "CM", 83], ["Riyad Mahrez", "RW", 88],
  ["Marc Albrighton", "LW", 82], ["Shinji Okazaki", "CAM", 80],
  ["Jamie Vardy", "ST", 88], ["Leonardo Ulloa", "ST", 78],
  ["Jeffrey Schlupp", "LB", 78], ["Andy King", "CM", 78],
  ["Demarai Gray", "LW", 76]] },


{
  id: "celtic6667_jackpot",
  name: "Celtic",
  league: "Scottish Premiership",
  season: "1966-67",
  color: "#018749",
  rating: 88,
  jackpot: true,
  players: [
  ["Ronnie Simpson", "GK", 85], ["Jim Craig", "RB", 84],
  ["Tommy Gemmell", "LB", 88], ["Billy McNeill", "CB", 90],
  ["John Clark", "CB", 84], ["Bobby Murdoch", "CM", 89],
  ["Bertie Auld", "CM", 86], ["Jimmy Johnstone", "RW", 90],
  ["Willie Wallace", "ST", 86], ["Stevie Chalmers", "ST", 87],
  ["Bobby Lennox", "LW", 88], ["John Hughes", "LW", 84],
  ["Joe McBride", "ST", 83], ["Charlie Gallagher", "CM", 81],
  ["John Fallon", "GK", 78]] },


{
  id: "lazio9900_jackpot",
  name: "Lazio",
  league: "Serie A",
  season: "1999-00",
  color: "#87D8F7",
  rating: 90,
  jackpot: true,
  players: [
  ["Luca Marchegiani", "GK", 86], ["Alessandro Nesta", "CB", 92],
  ["Sinisa Mihajlovic", "CB", 88], ["Giuseppe Pancaro", "LB", 84],
  ["Paolo Negro", "RB", 83], ["Diego Simeone", "CDM", 88],
  ["Juan Sebastian Veron", "CM", 91], ["Pavel Nedved", "LW", 90],
  ["Dejan Stankovic", "CAM", 87], ["Roberto Mancini", "CAM", 86],
  ["Marcelo Salas", "ST", 88], ["Simone Inzaghi", "ST", 84],
  ["Sergio Conceicao", "RW", 85], ["Matias Almeyda", "CDM", 85],
  ["Attilio Lombardo", "RW", 82]] },


{
  id: "milan8889_jackpot",
  name: "AC Milan",
  league: "Serie A",
  season: "1988-89",
  color: "#FB090B",
  rating: 94,
  jackpot: true,
  players: [
  ["Giovanni Galli", "GK", 87], ["Mauro Tassotti", "RB", 88],
  ["Franco Baresi", "CB", 95], ["Paolo Maldini", "LB", 92],
  ["Alessandro Costacurta", "CB", 89], ["Frank Rijkaard", "CDM", 92],
  ["Carlo Ancelotti", "CM", 88], ["Roberto Donadoni", "RW", 89],
  ["Ruud Gullit", "CAM", 94], ["Marco van Basten", "ST", 95],
  ["Pietro Paolo Virdis", "ST", 86], ["Angelo Colombo", "CM", 84],
  ["Alberigo Evani", "LW", 84], ["Daniele Massaro", "ST", 83],
  ["Filippo Galli", "CB", 82]] }];








const SMALLER_CLUBS = [
{
  id: "brighton2223_small",
  name: "Brighton",
  league: "Premier League",
  season: "2022-23",
  color: "#0057B8",
  rating: 82,
  players: [
  ["Robert Sanchez", "GK", 80], ["Joel Veltman", "RB", 80], ["Lewis Dunk", "CB", 83],
  ["Levi Colwill", "CB", 80], ["Pervis Estupinan", "LB", 82], ["Moises Caicedo", "CDM", 84],
  ["Alexis Mac Allister", "CM", 85], ["Pascal Gross", "CM", 82], ["Solly March", "RW", 81],
  ["Kaoru Mitoma", "LW", 84], ["Evan Ferguson", "ST", 80], ["Adam Webster", "CB", 80],
  ["Billy Gilmour", "CM", 78], ["Julio Enciso", "CAM", 79], ["Danny Welbeck", "ST", 78]] },


{
  id: "brentford2223_small",
  name: "Brentford",
  league: "Premier League",
  season: "2022-23",
  color: "#E30613",
  rating: 80,
  players: [
  ["David Raya", "GK", 82], ["Aaron Hickey", "RB", 78], ["Ethan Pinnock", "CB", 80],
  ["Ben Mee", "CB", 80], ["Rico Henry", "LB", 80], ["Christian Norgaard", "CDM", 80],
  ["Mathias Jensen", "CM", 81], ["Vitaly Janelt", "CM", 79], ["Bryan Mbeumo", "RW", 82],
  ["Yoane Wissa", "LW", 80], ["Ivan Toney", "ST", 84], ["Pontus Jansson", "CB", 78],
  ["Mikkel Damsgaard", "CAM", 79], ["Sergi Canos", "RW", 77], ["Kevin Schade", "LW", 78]] },


{
  id: "sociedad2223_small",
  name: "Real Sociedad",
  league: "La Liga",
  season: "2022-23",
  color: "#0067B1",
  rating: 84,
  players: [
  ["Alex Remiro", "GK", 82], ["Andoni Gorosabel", "RB", 79], ["Robin Le Normand", "CB", 84],
  ["Igor Zubeldia", "CB", 82], ["Aihen Munoz", "LB", 78], ["Martin Zubimendi", "CDM", 85],
  ["Mikel Merino", "CM", 86], ["Brais Mendez", "CAM", 83], ["Takefusa Kubo", "RW", 84],
  ["Mikel Oyarzabal", "LW", 85], ["Alexander Sorloth", "ST", 82], ["David Silva", "CAM", 85],
  ["Ander Barrenetxea", "LW", 80], ["Carlos Fernandez", "ST", 78], ["Asier Illarramendi", "CDM", 78]] },


{
  id: "villarreal2021_small",
  name: "Villarreal",
  league: "La Liga",
  season: "2020-21",
  color: "#FFE667",
  rating: 83,
  players: [
  ["Geronimo Rulli", "GK", 80], ["Mario Gaspar", "RB", 80], ["Pau Torres", "CB", 84],
  ["Raul Albiol", "CB", 82], ["Alfonso Pedraza", "LB", 80], ["Etienne Capoue", "CDM", 81],
  ["Dani Parejo", "CM", 86], ["Manu Trigueros", "CM", 82], ["Samuel Chukwueze", "RW", 82],
  ["Moi Gomez", "LW", 80], ["Gerard Moreno", "ST", 86], ["Francis Coquelin", "CDM", 80],
  ["Yeremy Pino", "RW", 80], ["Carlos Bacca", "ST", 79], ["Juan Foyth", "RB", 80]] },


{
  id: "freiburg2223_small",
  name: "Freiburg",
  league: "Bundesliga",
  season: "2022-23",
  color: "#D50032",
  rating: 80,
  players: [
  ["Mark Flekken", "GK", 81], ["Kiliann Sildillia", "RB", 78], ["Matthias Ginter", "CB", 82],
  ["Philipp Lienhart", "CB", 81], ["Christian Gunter", "LB", 82], ["Nicolas Hofler", "CDM", 80],
  ["Maximilian Eggestein", "CM", 80], ["Vincenzo Grifo", "LW", 84], ["Ritsu Doan", "RW", 80],
  ["Lucas Holer", "CAM", 79], ["Michael Gregoritsch", "ST", 81], ["Daniel-Kofi Kyereh", "CAM", 78],
  ["Yannik Keitel", "CDM", 76], ["Nils Petersen", "ST", 77], ["Manuel Gulde", "CB", 77]] },


{
  id: "union2223_small",
  name: "Union Berlin",
  league: "Bundesliga",
  season: "2022-23",
  color: "#E30613",
  rating: 80,
  players: [
  ["Frederik Ronnow", "GK", 80], ["Christopher Trimmel", "RB", 80], ["Robin Knoche", "CB", 81],
  ["Diogo Leite", "CB", 79], ["Niko Giesselmann", "LB", 78], ["Rani Khedira", "CDM", 80],
  ["Janik Haberer", "CM", 79], ["Andras Schafer", "CM", 78], ["Sheraldo Becker", "RW", 81],
  ["Kevin Behrens", "ST", 79], ["Jordan Siebatcheu", "ST", 79], ["Morten Thorsby", "CM", 78],
  ["Jamie Leweling", "LW", 77], ["Paul Seguin", "CDM", 77], ["Timo Baumgartl", "CB", 77]] },


{
  id: "atalanta1920_small",
  name: "Atalanta",
  league: "Serie A",
  season: "2019-20",
  color: "#1E71B8",
  rating: 85,
  players: [
  ["Pierluigi Gollini", "GK", 81], ["Hans Hateboer", "RB", 82], ["Rafael Toloi", "CB", 82],
  ["Jose Luis Palomino", "CB", 81], ["Robin Gosens", "LB", 84], ["Marten de Roon", "CDM", 83],
  ["Remo Freuler", "CM", 83], ["Papu Gomez", "CAM", 88], ["Josip Ilicic", "RW", 86],
  ["Duvan Zapata", "ST", 86], ["Luis Muriel", "ST", 84], ["Mario Pasalic", "CM", 81],
  ["Ruslan Malinovskyi", "CAM", 82], ["Berat Djimsiti", "CB", 80], ["Timothy Castagne", "LB", 80]] },


{
  id: "sassuolo2021_small",
  name: "Sassuolo",
  league: "Serie A",
  season: "2020-21",
  color: "#00A651",
  rating: 81,
  players: [
  ["Andrea Consigli", "GK", 81], ["Mert Muldur", "RB", 78], ["Gian Marco Ferrari", "CB", 80],
  ["Marlon", "CB", 78], ["Rogerio", "LB", 78], ["Manuel Locatelli", "CDM", 84],
  ["Maxime Lopez", "CM", 80], ["Filip Djuricic", "CAM", 81], ["Domenico Berardi", "RW", 85],
  ["Jeremie Boga", "LW", 82], ["Francesco Caputo", "ST", 82], ["Hamed Traore", "CAM", 80],
  ["Pedro Obiang", "CDM", 78], ["Giacomo Raspadori", "ST", 79], ["Jeremy Toljan", "RB", 77]] },


{
  id: "lens2223_small",
  name: "Lens",
  league: "Ligue 1",
  season: "2022-23",
  color: "#D71920",
  rating: 81,
  players: [
  ["Brice Samba", "GK", 83], ["Przemyslaw Frankowski", "RB", 80], ["Kevin Danso", "CB", 83],
  ["Facundo Medina", "CB", 82], ["Deiver Machado", "LB", 79], ["Salis Abdul Samed", "CDM", 80],
  ["Seko Fofana", "CM", 85], ["Adrien Thomasson", "CAM", 79], ["Florian Sotoca", "RW", 80],
  ["Lois Openda", "ST", 84], ["David Costa", "CAM", 78], ["Angelo Fulgini", "CAM", 79],
  ["Massadio Haidara", "LB", 77], ["Jonathan Gradit", "CB", 79], ["Wesley Said", "LW", 78]] },


{
  id: "rennes2022_small",
  name: "Rennes",
  league: "Ligue 1",
  season: "2021-22",
  color: "#E1332D",
  rating: 81,
  players: [
  ["Alfred Gomis", "GK", 78], ["Hamari Traore", "RB", 81], ["Warmed Omari", "CB", 78],
  ["Nayef Aguerd", "CB", 82], ["Adrien Truffert", "LB", 79], ["Baptiste Santamaria", "CDM", 80],
  ["Benjamin Bourigeaud", "CM", 83], ["Lovro Majer", "CAM", 82], ["Jeremy Doku", "RW", 80],
  ["Martin Terrier", "LW", 84], ["Gaetan Laborde", "ST", 82], ["Jonas Martin", "CM", 78],
  ["Flavien Tait", "CAM", 79], ["Serhou Guirassy", "ST", 79], ["Birger Meling", "LB", 78]] }];




const STANDARD_CLUB_POOL = [...CLUBS, ...SMALLER_CLUBS];
const ALL_CLUBS = [...STANDARD_CLUB_POOL, ...JACKPOT_CLUBS];

function getClubTier(club) {
  if (club.jackpot) return "jackpot";
  if (club.rating >= 92) return "legendary";
  if (club.rating >= 89) return "elite";
  if (club.rating >= 85) return "strong";
  return "underdog";
}

function getWeightedClubPool() {
  const pool = [];

  ALL_CLUBS.forEach(club => {
    const tier = getClubTier(club);

    let weight = 1;
    if (tier === "underdog") weight = 7;
    if (tier === "strong") weight = 5;
    if (tier === "elite") weight = 3;
    if (tier === "legendary") weight = 1;
    if (tier === "jackpot") weight = 1;

    for (let i = 0; i < weight; i++) {
      pool.push(club);
    }
  });

  return pool;
}

function getRandomClub() {
  const weightedPool = getWeightedClubPool();
  return weightedPool[Math.floor(Math.random() * weightedPool.length)];
}


const OPPONENTS = [
["Manchester United", 86], ["Chelsea", 85], ["Arsenal", 86], ["Tottenham", 82],
["Newcastle", 81], ["Aston Villa", 80], ["Barcelona", 90], ["Real Madrid", 91],
["Atletico Madrid", 85], ["Sevilla", 79], ["Valencia", 80], ["Bayern Munich", 90],
["Borussia Dortmund", 84], ["RB Leipzig", 82], ["Bayer Leverkusen", 84],
["Inter Milan", 88], ["AC Milan", 85], ["Juventus", 84], ["Napoli", 85],
["Roma", 81], ["PSG", 88], ["Monaco", 81], ["Lyon", 79], ["Marseille", 80]];


function getRatingClass(rating) {
  if (rating >= 90) return "rating-red";
  if (rating >= 80) return "rating-yellow";
  if (rating >= 70) return "rating-green";
  return "rating-blue";
}

function getAltPositions(name, mainPosition) {
  const playerPositions = {
    "Lionel Messi": ["RW", "CAM", "ST"],
    "Cristiano Ronaldo": ["LW", "ST"],
    "Kylian Mbappe": ["ST", "LW"],
    "Neymar": ["LW", "CAM"],
    "Mohamed Salah": ["RW", "ST"],
    "Sadio Mane": ["LW", "RW", "ST"],
    "Phil Foden": ["LW", "CAM", "RW"],
    "Bernardo Silva": ["CAM", "CM", "RW"],
    "Kevin De Bruyne": ["CM", "CAM"],
    "Luka Modric": ["CM", "CAM"],
    "Toni Kroos": ["CM", "CDM"],
    "Joshua Kimmich": ["CDM", "RB", "CM"],
    "David Alaba": ["CB", "LB", "CDM"],
    "Joao Cancelo": ["LB", "RB"],
    "Kyle Walker": ["RB", "CB"],
    "John Stones": ["CB", "CDM"],
    "Sergio Ramos": ["CB", "RB"],
    "Javier Zanetti": ["RB", "LB", "CM"],
    "Dani Alves": ["RB", "RW"],
    "Trent Alexander-Arnold": ["RB", "CM"],
    "Fabinho": ["CDM", "CB"],
    "Javier Mascherano": ["CDM", "CB"],
    "Thiago Motta": ["CDM", "CM"],
    "Thomas Muller": ["CAM", "ST", "RW"],
    "Wesley Sneijder": ["CAM", "CM"],
    "Isco": ["CAM", "CM", "LW"],
    "Kaka": ["CAM", "CM"],
    "Wayne Rooney": ["ST", "CAM"],
    "Carlos Tevez": ["ST", "CAM"],
    "Roberto Firmino": ["ST", "CAM"],
    "Giacomo Raspadori": ["CAM", "ST"],
    "Florian Wirtz": ["CAM", "LW"],
    "Christopher Nkunku": ["CAM", "ST"],
    "Dani Olmo": ["CAM", "LW", "RW"],
    "Thierry Henry": ["ST", "LW"],
    "Angel Di Maria": ["RW", "LW", "CAM"],
    "Serge Gnabry": ["RW", "LW"],
    "Gareth Bale": ["RW", "LW"],
    "Marco Reus": ["LW", "CAM"],
    "Mario Gotze": ["CAM", "CM"],
    "Raul Garcia": ["CAM", "ST"],
    "Pablo Aimar": ["CAM", "CM"],
    "Ever Banega": ["CM", "CDM"],
    "Lucas Ocampos": ["RW", "LW"],
    "Kingsley Coman": ["LW", "RW"],
    "Alphonso Davies": ["LB", "LW"],
    "Jeremie Frimpong": ["RB", "RW"],
    "Alex Grimaldo": ["LB", "LW"],
    "Dominik Szoboszlai": ["RW", "CAM", "CM"],
    "David Raum": ["LB", "LW"],
    "Paul Pogba": ["CM", "CAM"],
    "Andrea Pirlo": ["CDM", "CM"],
    "Arturo Vidal": ["CM", "CDM"],
    "Paolo Maldini": ["CB", "LB"],
    "Cafu": ["RB", "RW"],
    "Serginho": ["LB", "LW"],
    "Marco Verratti": ["CM", "CDM"],
    "Marquinhos": ["CB", "CDM"],
    "Lucas Moura": ["RW", "LW"],
    "Bernardo Silva": ["CAM", "CM", "RW"],
    "Fabinho": ["CDM", "CB"],
    "Thomas Lemar": ["LW", "CAM"],
    "Benjamin Mendy": ["LB", "LW"],
    "Juninho Pernambucano": ["CAM", "CM"],
    "Michael Essien": ["CM", "CDM", "RB"],
    "Eric Abidal": ["LB", "CB"],
    "Renato Sanches": ["CM", "CDM"],
    "Jonathan Ikone": ["CAM", "RW"],
    "Yusuf Yazici": ["CAM", "CM"],
    "Luiz Araujo": ["RW", "LW"] };


  return playerPositions[name] || [mainPosition];
}


const POSITION_POOL = {
  GK: [
  ["Squad Goalkeeper", "GK", 76]],

  RB: [
  ["Squad Right Back", "RB", 76]],

  CB: [
  ["Squad Centre Back", "CB", 76],
  ["Reserve Centre Back", "CB", 75]],

  LB: [
  ["Squad Left Back", "LB", 76]],

  CDM: [
  ["Squad Holding Midfielder", "CDM", 77]],

  CM: [
  ["Squad Central Midfielder", "CM", 77]],

  CAM: [
  ["Squad Attacking Midfielder", "CAM", 77]],

  RW: [
  ["Squad Right Winger", "RW", 77]],

  ST: [
  ["Squad Striker", "ST", 77]],

  LW: [
  ["Squad Left Winger", "LW", 77]] };



function ensureSquadCoverage(club) {
  const squad = [...club.players];

  const hasPosition = (position) =>
  squad.some(player => {
    const natural = player[1];
    const positions = getAltPositions(player[0], natural);
    return positions.includes(position);
  });

  const requiredPositions = ["GK", "RB", "CB", "CB", "LB", "CDM", "CM", "CAM", "RW", "ST", "LW"];

  requiredPositions.forEach((position, index) => {
    const matchingCount = squad.filter(player => {
      const natural = player[1];
      const positions = getAltPositions(player[0], natural);
      return positions.includes(position);
    }).length;

    const needed = position === "CB" ? 2 : 1;

    if (matchingCount < needed) {var _POSITION_POOL$positi;
      const fallback = (_POSITION_POOL$positi = POSITION_POOL[position]) === null || _POSITION_POOL$positi === void 0 ? void 0 : _POSITION_POOL$positi[index % POSITION_POOL[position].length];

      if (fallback) {
        squad.push([
        `${club.name} ${fallback[0]}`,
        fallback[1],
        fallback[2]]);

      }
    }
  });

  return squad;
}

function makePlayers(club) {
  return ensureSquadCoverage(club).
  map((p, index) => ({
    id: `${club.id}_${index}`,
    name: p[0],
    position: p[1],
    positions: getAltPositions(p[0], p[1]),
    rating: p[2],
    club: club.name,
    season: club.season,
    league: club.league,
    color: club.color })).

  sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function buildSchedule() {
  const home = shuffleArray(OPPONENTS);
  const away = shuffleArray(OPPONENTS);
  return [...home, ...away].slice(0, 38);
}


function createTone(frequency, duration = 0.12, type = "sine", volume = 0.08) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(volume, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + duration);
  } catch (error) {
    // Sound is optional. Ignore browser/audio permission errors.
  }
}

function playSound(name, muted) {
  if (muted) return;

  if (name === "start") {
    createTone(440, 0.08, "triangle", 0.06);
    setTimeout(() => createTone(660, 0.1, "triangle", 0.06), 90);
  }

  if (name === "spin") {
    createTone(220, 0.06, "sawtooth", 0.035);
    setTimeout(() => createTone(300, 0.06, "sawtooth", 0.035), 80);
    setTimeout(() => createTone(380, 0.07, "sawtooth", 0.035), 160);
  }

  if (name === "jackpot") {
    createTone(523, 0.12, "triangle", 0.08);
    setTimeout(() => createTone(659, 0.12, "triangle", 0.08), 120);
    setTimeout(() => createTone(784, 0.18, "triangle", 0.08), 250);
  }

  if (name === "select") {
    createTone(520, 0.06, "square", 0.035);
  }

  if (name === "place") {
    createTone(620, 0.08, "triangle", 0.055);
    setTimeout(() => createTone(840, 0.08, "triangle", 0.045), 80);
  }

  if (name === "move") {
    createTone(420, 0.06, "sine", 0.045);
    setTimeout(() => createTone(560, 0.06, "sine", 0.045), 70);
  }

  if (name === "reroll") {
    createTone(300, 0.08, "sawtooth", 0.045);
    setTimeout(() => createTone(240, 0.08, "sawtooth", 0.04), 80);
  }

  if (name === "win") {
    createTone(660, 0.07, "triangle", 0.04);
  }

  if (name === "draw") {
    createTone(420, 0.07, "sine", 0.03);
  }

  if (name === "loss") {
    createTone(180, 0.1, "sine", 0.035);
  }

  if (name === "season") {
    createTone(392, 0.08, "triangle", 0.055);
    setTimeout(() => createTone(523, 0.09, "triangle", 0.055), 100);
    setTimeout(() => createTone(659, 0.14, "triangle", 0.055), 210);
  }
}


function getPlayerStats(player) {var _player$finalRating;
  const rating = (_player$finalRating = player.finalRating) !== null && _player$finalRating !== void 0 ? _player$finalRating : player.rating;
  const pos = player.slotLabel || player.position;
  const positions = player.positions || [pos];

  const base = {
    attack: rating * 0.7,
    midfield: rating * 0.7,
    defense: rating * 0.7,
    control: rating * 0.7,
    chance: rating * 0.7,
    keeping: rating * 0.25 };


  if (positions.includes("GK")) {
    base.keeping = rating;
    base.defense += rating * 0.2;
    base.control += rating * 0.1;
  }

  if (positions.includes("CB")) {
    base.defense += rating * 0.45;
    base.control += rating * 0.1;
  }

  if (positions.includes("RB") || positions.includes("LB")) {
    base.defense += rating * 0.28;
    base.midfield += rating * 0.16;
    base.control += rating * 0.1;
  }

  if (positions.includes("CDM")) {
    base.defense += rating * 0.28;
    base.midfield += rating * 0.25;
    base.control += rating * 0.18;
  }

  if (positions.includes("CM")) {
    base.midfield += rating * 0.34;
    base.control += rating * 0.28;
    base.defense += rating * 0.08;
  }

  if (positions.includes("CAM")) {
    base.attack += rating * 0.22;
    base.chance += rating * 0.32;
    base.control += rating * 0.18;
  }

  if (positions.includes("RW") || positions.includes("LW")) {
    base.attack += rating * 0.32;
    base.chance += rating * 0.2;
    base.control += rating * 0.08;
  }

  if (positions.includes("ST")) {
    base.attack += rating * 0.42;
    base.chance += rating * 0.28;
  }

  return base;
}

function calculateTeamProfile(players) {
  const count = Math.max(players.length, 1);

  const fallbackAverage = Math.round(
  players.reduce((sum, p) => {var _p$finalRating;return sum + ((_p$finalRating = p.finalRating) !== null && _p$finalRating !== void 0 ? _p$finalRating : p.rating);}, 0) / count);


  const avg = filterFn => {
    const group = players.filter(filterFn);

    if (!group.length) return fallbackAverage;

    return Math.round(
    group.reduce((sum, p) => {var _p$finalRating2;return sum + ((_p$finalRating2 = p.finalRating) !== null && _p$finalRating2 !== void 0 ? _p$finalRating2 : p.rating);}, 0) / group.length);

  };

  const profile = {
    attack: avg((p) =>
    ["ST", "LW", "RW", "CAM"].includes(p.slotLabel)),

    midfield: avg((p) =>
    ["CDM", "CM", "CAM"].includes(p.slotLabel)),

    defense: avg((p) =>
    ["RB", "CB", "LB", "CDM"].includes(p.slotLabel)),

    control: avg((p) =>
    ["CDM", "CM", "CAM"].includes(p.slotLabel)),

    chance: avg((p) =>
    ["CAM", "LW", "RW", "ST"].includes(p.slotLabel)),

    keeping: avg(p => p.slotLabel === "GK") };


  const spread =
  Math.max(profile.attack, profile.midfield, profile.defense) -
  Math.min(profile.attack, profile.midfield, profile.defense);

  profile.balanceBonus = Math.max(0, 8 - spread * 0.35);

  profile.power =
  profile.attack * 0.3 +
  profile.midfield * 0.24 +
  profile.defense * 0.22 +
  profile.control * 0.1 +
  profile.chance * 0.1 +
  profile.keeping * 0.04 +
  profile.balanceBonus;

  return profile;
}


function createPlayerSeasonStats(players, matches) {
  const stats = players.map(player => {var _player$finalRating2;return {
      id: player.id,
      name: player.name,
      position: player.slotLabel || player.position,
      club: player.club,
      rating: (_player$finalRating2 = player.finalRating) !== null && _player$finalRating2 !== void 0 ? _player$finalRating2 : player.rating,
      appearances: 38,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      yellowCards: 0,
      redCards: 0,
      matchRatings: [] };});


  const byRole = {
    attackers: stats.filter(p => ["ST", "LW", "RW", "CAM"].includes(p.position)),
    mids: stats.filter(p => ["CM", "CDM", "CAM"].includes(p.position)),
    defenders: stats.filter(p => ["RB", "CB", "LB", "CDM"].includes(p.position)),
    keepers: stats.filter(p => p.position === "GK") };


  const weightedPick = (pool, fallback = stats) => {
    const source = pool.length ? pool : fallback;
    const total = source.reduce((sum, p) => sum + Math.max(1, p.rating - 60), 0);
    let roll = Math.random() * total;

    for (const player of source) {
      roll -= Math.max(1, player.rating - 60);
      if (roll <= 0) return player;
    }

    return source[source.length - 1];
  };

  matches.forEach(match => {
    const [gf, ga] = match.score.split("-").map(Number);

    stats.forEach(player => {
      let base = 6.4 + (player.rating - 80) * 0.035;

      if (match.result === "W") base += 0.45;
      if (match.result === "D") base += 0.1;
      if (match.result === "L") base -= 0.35;

      if (ga === 0 && ["GK", "RB", "CB", "LB", "CDM"].includes(player.position)) {
        base += 0.35;
      }

      base += (Math.random() - 0.5) * 0.8;
      player.matchRatings.push(Math.max(5.2, Math.min(9.8, base)));
    });

    for (let i = 0; i < gf; i++) {
      const scorerPool =
      Math.random() < 0.72 ?
      byRole.attackers :
      Math.random() < 0.88 ?
      byRole.mids :
      byRole.defenders;

      const scorer = weightedPick(scorerPool);
      scorer.goals += 1;
      scorer.matchRatings[scorer.matchRatings.length - 1] += 0.55;

      if (Math.random() < 0.78) {
        const assistPool =
        scorer.position === "ST" ?
        [...byRole.mids, ...byRole.attackers] :
        [...byRole.mids, ...byRole.defenders, ...byRole.attackers];

        const assisterOptions = assistPool.filter(p => p.id !== scorer.id);
        const assister = weightedPick(assisterOptions);
        assister.assists += 1;
        assister.matchRatings[assister.matchRatings.length - 1] += 0.3;
      }
    }

    if (ga === 0) {
      [...byRole.keepers, ...byRole.defenders].forEach(player => {
        player.cleanSheets += 1;
      });
    }

    stats.forEach(player => {
      const cardChance = ["CB", "CDM", "RB", "LB"].includes(player.position) ? 0.09 : 0.045;
      if (Math.random() < cardChance) player.yellowCards += 1;
      if (Math.random() < 0.006) player.redCards += 1;
    });
  });

  return stats.
  map(player => ({
    ...player,
    averageRating: Number(
    (
    player.matchRatings.reduce((sum, rating) => sum + rating, 0) /
    Math.max(player.matchRatings.length, 1)).
    toFixed(2)) })).


  sort((a, b) => b.averageRating - a.averageRating || b.goals - a.goals);
}

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedFormationName, setSelectedFormationName] = useState(DEFAULT_FORMATION_NAME);
  const [currentClub, setCurrentClub] = useState(null);
  const [draft, setDraft] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [pickedNames, setPickedNames] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [spinWinner, setSpinWinner] = useState(null);
  const [spinReel, setSpinReel] = useState([]);
  const [spinOffset, setSpinOffset] = useState(0);
  const [spinTargetIndex, setSpinTargetIndex] = useState(-1);
  const [lastClubId, setLastClubId] = useState(null);
  const [recentClubIds, setRecentClubIds] = useState([]);
  const [simulating, setSimulating] = useState(false);
  const [liveMatch, setLiveMatch] = useState(null);
  const [liveSeason, setLiveSeason] = useState(null);
  const [simProgress, setSimProgress] = useState(0);
  const [lastPlacedSlot, setLastPlacedSlot] = useState(null);
  const [results, setResults] = useState(null);
  const [rerollUsed, setRerollUsed] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [playerSeasonStats, setPlayerSeasonStats] = useState([]);
  const [movingSlotId, setMovingSlotId] = useState(null);

  const FORMATION = FORMATIONS[selectedFormationName] || FORMATIONS[DEFAULT_FORMATION_NAME];
  const draftedPlayers = Object.values(draft);

  const teamRating = useMemo(() => {
    if (!draftedPlayers.length) return 0;
    return Math.round(
    draftedPlayers.reduce((sum, player) => sum + player.finalRating, 0) / draftedPlayers.length);

  }, [draft]);

  const availablePlayers = currentClub ? makePlayers(currentClub) : [];


  function changeFormation(name) {
    if (name === selectedFormationName) return;

    setSelectedFormationName(name);
    setDraft({});
    setPickedNames([]);
    setSelectedPlayer(null);
    setCurrentClub(null);
    setSpinWinner(null);
    setSpinReel([]);
    setSpinOffset(0);
    setMovingSlotId(null);
    setLastPlacedSlot(null);
    setResults(null);
    setRewards([]);
    setPlayerSeasonStats([]);
  }

  function getSlotLabel(slotId) {var _FORMATION$find;
    return ((_FORMATION$find = FORMATION.find(slot => slot.id === slotId)) === null || _FORMATION$find === void 0 ? void 0 : _FORMATION$find.label) || slotId;
  }

  function getPenalty(player, slotId) {var _player$positions;
    const slotPosition = getSlotLabel(slotId);

    if ((_player$positions = player.positions) !== null && _player$positions !== void 0 && _player$positions.includes(slotPosition)) return 0;

    return 6;
  }

  function getPlayableSlotsForPlayer(player) {
    const possiblePositions = player.positions || [player.position];

    return FORMATION.filter(slot => possiblePositions.includes(slot.label));
  }

  function isPlayerPositionUnavailable(player) {
    const playableSlots = getPlayableSlotsForPlayer(player);

    if (playableSlots.length === 0) return false;

    // Only grey out a player when every real position they can play is already full.
    // Example: a real ST-only player greys out when ST is full, but Messi can remain selectable
    // if CAM is open because CAM is one of his contextual positions.
    return playableSlots.every(slot => draft[slot.id]);
  }

  function buildSpin(winner) {
    const reel = [];

    // Build a long shuffled reel so the spin looks random.
    for (let i = 0; i < 6; i++) {
      reel.push(...shuffleArray(ALL_CLUBS));
    }

    // Put the winner near the end, not always as the final visible card.
    const winnerIndex = reel.length - 4;
    reel[winnerIndex] = winner;

    const cardFullWidth = 202;
    const windowWidth = Math.min(window.innerWidth - 56, 680);
    const windowCenter = windowWidth / 2;
    const winnerCenter = winnerIndex * cardFullWidth + cardFullWidth / 2;
    const finalOffset = winnerCenter - windowCenter;

    setSpinWinner(winner);
    setSpinReel(reel);
    setSpinTargetIndex(winnerIndex);
    setSpinOffset(finalOffset);
  }

  function pickClub(excludeCurrentId = null) {
    let available = ALL_CLUBS.filter(
    (club) =>
    club.id !== excludeCurrentId &&
    club.id !== lastClubId &&
    !recentClubIds.includes(club.id));


    // If the recent-history filter gets too strict, only avoid the exact previous/current club.
    if (available.length < 5) {
      available = ALL_CLUBS.filter(
      club => club.id !== excludeCurrentId && club.id !== lastClubId);

    }

    // Final safety fallback.
    if (available.length === 0) {
      available = ALL_CLUBS.filter(club => club.id !== excludeCurrentId);
    }

    return available[Math.floor(Math.random() * available.length)];
  }

  function finishSpin(winner) {
    setCurrentClub(winner);
    setLastClubId(winner.id);
    setRecentClubIds(prev => [...prev, winner.id].slice(-4));
    setSpinning(false);
  }

  function spinClub() {
    if (draftedPlayers.length >= 11 || spinning || currentClub) return;

    const winner = pickClub();

    setCurrentClub(null);
    setSelectedPlayer(null);
    setResults(null);
    buildSpin(winner);
    playSound("spin", soundMuted);
    setSpinning(true);

    setTimeout(() => finishSpin(winner), 2100);
  }

  function rerollClub() {
    if (!currentClub || rerollUsed || spinning || draftedPlayers.length >= 11) return;

    const winner = pickClub(currentClub.id);

    setRerollUsed(true);
    playSound("reroll", soundMuted);
    setCurrentClub(null);
    setSelectedPlayer(null);
    setResults(null);
    buildSpin(winner);
    setSpinning(true);

    setTimeout(() => finishSpin(winner), 2100);
  }

  function selectPlayer(player) {
    if (pickedNames.includes(player.name)) return;
    playSound("select", soundMuted);
    setSelectedPlayer(player);
  }

  function placePlayer(slotId) {
    if (!selectedPlayer || draft[slotId]) return;
    if (pickedNames.includes(selectedPlayer.name)) return;

    const penalty = getPenalty(selectedPlayer, slotId);
    const placedPlayer = {
      ...selectedPlayer,
      slotId,
      slotLabel: getSlotLabel(slotId),
      penalty,
      finalRating: Math.max(60, selectedPlayer.rating - penalty) };


    playSound("place", soundMuted);
    setDraft(prev => ({ ...prev, [slotId]: placedPlayer }));
    setPickedNames(prev => [...prev, selectedPlayer.name]);
    setSelectedPlayer(null);
    setCurrentClub(null);
    setSpinWinner(null);
    setLastPlacedSlot(slotId);
    setResults(null);

    setTimeout(() => setLastPlacedSlot(null), 700);
  }

  function movePlayerToSlot(targetSlotId) {var _player$positions2;
    if (!movingSlotId) return;
    if (draft[targetSlotId]) return;

    const player = draft[movingSlotId];
    if (!player) return;

    const targetPosition = getSlotLabel(targetSlotId);

    // Players can only move into their real contextual positions.
    if (!((_player$positions2 = player.positions) !== null && _player$positions2 !== void 0 && _player$positions2.includes(targetPosition))) return;

    const movedPlayer = {
      ...player,
      slotId: targetSlotId,
      slotLabel: targetPosition,
      penalty: 0,
      finalRating: player.rating };


    setDraft(prev => {
      const next = { ...prev };
      delete next[movingSlotId];
      next[targetSlotId] = movedPlayer;
      return next;
    });

    playSound("move", soundMuted);
    setMovingSlotId(null);
    setLastPlacedSlot(targetSlotId);
    setResults(null);

    setTimeout(() => setLastPlacedSlot(null), 700);
  }


  function calculateRewards(summary) {
    const earned = [];

    if (summary.points >= 75) {
      earned.push("⭐ European Qualification");
    }

    if (summary.points >= 88) {
      earned.push("👑 League Champions");
    }

    if (summary.points >= 100) {
      earned.push("💯 Centurions Badge");
    }

    if (summary.losses === 0) {
      earned.push("🛡️ Invincibles Shield");
    }

    if (summary.wins >= 35) {
      earned.push("🔥 Dominant Dynasty");
    }

    if (summary.wins === 38) {
      earned.push("🐐 Perfect 38-0 GOAT Card");
    }

    if (summary.gf - summary.ga >= 80) {
      earned.push("⚽ Goal Machine");
    }

    if (earned.length === 0) {
      earned.push("🎟️ Draft Token");
    }

    return earned;
  }

  function resetGame() {
    setCurrentClub(null);
    setDraft({});
    setSelectedPlayer(null);
    setPickedNames([]);
    setSpinning(false);
    setSpinWinner(null);
    setSpinReel([]);
    setSpinOffset(0);
    setSpinTargetIndex(-1);
    setLastClubId(null);
    setRecentClubIds([]);
    setSimulating(false);
    setLiveMatch(null);
    setLiveSeason(null);
    setSimProgress(0);
    setLastPlacedSlot(null);
    setResults(null);
    setRerollUsed(false);
    setRewards([]);
    setMovingSlotId(null);
  }

  function simulateSeason() {
    if (draftedPlayers.length < 11 || simulating) return;

    playSound("season", soundMuted);
    setSimulating(true);
    setResults(null);
    setLiveSeason({
      week: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      gf: 0,
      ga: 0,
      latest: "Season starting...",
      recent: [] });

    setSimProgress(0);

    const fullRating =
    draftedPlayers.reduce((sum, player) => sum + player.finalRating, 0) / draftedPlayers.length;

    const teamProfile = calculateTeamProfile(draftedPlayers);

    let wins = 0,draws = 0,losses = 0,gf = 0,ga = 0;
    const matches = [];
    const schedule = buildSchedule();

    for (let week = 1; week <= 38; week++) {
      const opponent = schedule[week - 1];
      const opponentName = opponent[0];
      const opponentRating = opponent[1] + Math.floor(Math.random() * 5) - 2;

      const opponentProfile = {
        attack: opponentRating + Math.floor(Math.random() * 5) - 2,
        midfield: opponentRating + Math.floor(Math.random() * 5) - 2,
        defense: opponentRating + Math.floor(Math.random() * 5) - 2,
        control: opponentRating + Math.floor(Math.random() * 5) - 2,
        chance: opponentRating + Math.floor(Math.random() * 5) - 2,
        keeping: opponentRating + Math.floor(Math.random() * 5) - 2 };


      const attackEdge = teamProfile.attack - opponentProfile.defense;
      const midfieldEdge = teamProfile.midfield - opponentProfile.midfield;
      const defenseEdge = teamProfile.defense - opponentProfile.attack;
      const chanceEdge = teamProfile.chance - opponentProfile.keeping;
      const controlEdge = teamProfile.control - opponentProfile.control;

      const advantage =
      fullRating - opponentRating +
      attackEdge * 0.012 +
      midfieldEdge * 0.014 +
      defenseEdge * 0.011 +
      chanceEdge * 0.01 +
      controlEdge * 0.008 +
      teamProfile.balanceBonus * 0.18;

      let winChance = 0.68 + advantage * 0.052;
      let drawChance = 0.13 - advantage * 0.013;

      if (fullRating >= 88) {
        winChance += 0.025;
      }

      if (fullRating >= 90) {
        winChance += 0.045;
        drawChance -= 0.015;
      }

      if (fullRating >= 93) {
        winChance += 0.05;
        drawChance -= 0.02;
      }

      if (fullRating >= 95) {
        winChance += 0.04;
        drawChance -= 0.02;
      }

      if (teamProfile.balanceBonus >= 5) {
        winChance += 0.015;
      }

      winChance = Math.min(0.998, Math.max(0.44, winChance));
      drawChance = Math.min(0.13, Math.max(0.006, drawChance));
      const roll = Math.random();

      let result, us, them;

      if (roll < winChance) {
        result = "W";
        wins++;
        us = Math.max(1, Math.floor(Math.random() * 4)) + Math.floor(Math.max(0, advantage) / 8);
        them = Math.floor(Math.random() * Math.min(3, us));
      } else if (roll < winChance + drawChance) {
        result = "D";
        draws++;
        us = Math.floor(Math.random() * 3);
        them = us;
      } else {
        result = "L";
        losses++;
        them = Math.max(1, Math.floor(Math.random() * 3));
        us = Math.floor(Math.random() * them);
      }

      gf += us;
      ga += them;

      const match = { week, opponent: opponentName, result, score: `${us}-${them}` };
      matches.push(match);

      setTimeout(() => {
        const gamesSoFar = matches.slice(0, week);

        const liveWins = gamesSoFar.filter(m => m.result === "W").length;
        const liveDraws = gamesSoFar.filter(m => m.result === "D").length;
        const liveLosses = gamesSoFar.filter(m => m.result === "L").length;
        const livePoints = liveWins * 3 + liveDraws;

        const liveGf = gamesSoFar.reduce(
        (sum, m) => sum + Number(m.score.split("-")[0]),
        0);


        const liveGa = gamesSoFar.reduce(
        (sum, m) => sum + Number(m.score.split("-")[1]),
        0);


        setLiveSeason({
          week,
          wins: liveWins,
          draws: liveDraws,
          losses: liveLosses,
          points: livePoints,
          gf: liveGf,
          ga: liveGa,
          latest: `GW ${week}: ${match.score} vs ${match.opponent}`,
          recent: gamesSoFar.slice(-5) });

        setSimProgress(Math.round(week / 38 * 100));
      }, week * 250);
    }

    const points = wins * 3 + draws;
    let badge = "Mid Table";
    if (wins === 38) badge = "🐐 38-0 GOAT";else
    if (losses === 0) badge = "🛡️ Invincibles";else
    if (points >= 100) badge = "💯 Centurions";else
    if (points >= 88) badge = "👑 Champions";else
    if (points >= 75) badge = "⭐ UCL Qualified";

    setTimeout(() => {
      const summary = { wins, draws, losses, points, gf, ga, badge, matches };
      setResults(summary);
      setRewards(calculateRewards(summary));
      setPlayerSeasonStats(createPlayerSeasonStats(draftedPlayers, matches));
      setSimulating(false);
      setLiveMatch(null);
      setSimProgress(100);
    }, 9800);
  }

  if (!gameStarted) {
    return /*#__PURE__*/(
      React.createElement("section", { className: "start-screen" }, /*#__PURE__*/
      React.createElement("div", { className: "start-card" }, /*#__PURE__*/
      React.createElement("div", { className: "start-logo" }, "\u26BD"), /*#__PURE__*/
      React.createElement("h1", null, "Draft XI: Europe"), /*#__PURE__*/
      React.createElement("p", { className: "start-subtitle" }, "Build the greatest squad in European football history."), /*#__PURE__*/
      React.createElement("div", { className: "start-description" }, /*#__PURE__*/
      React.createElement("p", null, "\u2022 Spin clubs from Europe's Top 5 leagues."), /*#__PURE__*/
      React.createElement("p", null, "\u2022 Select any player from the club you land on."), /*#__PURE__*/
      React.createElement("p", null, "\u2022 Place them into the correct position on the pitch."), /*#__PURE__*/
      React.createElement("p", null, "\u2022 Use your one-time reroll wisely."), /*#__PURE__*/
      React.createElement("p", null, "\u2022 Complete your XI and simulate a 38-match season."), /*#__PURE__*/
      React.createElement("p", null, "\u2022 Can you go ", /*#__PURE__*/React.createElement("strong", null, "38-0"), "?")), /*#__PURE__*/

      React.createElement("button", {
        className: "start-button",
        onClick: () => {
          playSound("start", soundMuted);
          setGameStarted(true);
        } }, "Start Game"))));






  }

  return /*#__PURE__*/(
    React.createElement("main", { className: "app" }, /*#__PURE__*/
    React.createElement("section", { className: "hero" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("p", { className: "eyebrow" }, "Top 5 Leagues Draft"), /*#__PURE__*/
    React.createElement("h1", null, "Draft XI: Europe"), /*#__PURE__*/
    React.createElement("p", null, "Spin a European club, select any player, place them in your XI, then simulate a 38-game season.")), /*#__PURE__*/

    React.createElement("div", { className: "record-card" }, /*#__PURE__*/
    React.createElement("span", null, "XI Rating"), /*#__PURE__*/
    React.createElement("strong", null, teamRating || "--"), /*#__PURE__*/
    React.createElement("small", null, draftedPlayers.length, "/11 players"),
    draftedPlayers.length > 0 && /*#__PURE__*/
    React.createElement("div", { className: "profile-mini" }, /*#__PURE__*/
    React.createElement("span", null, "ATK ", calculateTeamProfile(draftedPlayers).attack), /*#__PURE__*/
    React.createElement("span", null, "MID ", calculateTeamProfile(draftedPlayers).midfield), /*#__PURE__*/
    React.createElement("span", null, "DEF ", calculateTeamProfile(draftedPlayers).defense)))), /*#__PURE__*/





    React.createElement("section", { className: "controls" }, /*#__PURE__*/
    React.createElement("button", { onClick: spinClub, disabled: spinning || !!currentClub || draftedPlayers.length >= 11 },
    spinning ? "Spinning..." : currentClub ? "Pick or Reroll" : "Spin Club"), /*#__PURE__*/

    React.createElement("button", { className: "reroll", onClick: rerollClub, disabled: !currentClub || rerollUsed || spinning || draftedPlayers.length >= 11 },
    rerollUsed ? "Reroll Used" : "Reroll"), /*#__PURE__*/

    React.createElement("button", { onClick: simulateSeason, disabled: draftedPlayers.length < 11 || simulating },
    simulating ? "Simulating..." : "Simulate Season"), /*#__PURE__*/

    React.createElement("button", { className: "ghost", onClick: resetGame }, "Reset"), /*#__PURE__*/
    React.createElement("button", {
      className: "sound-toggle",
      onClick: () => setSoundMuted(prev => !prev) },

    soundMuted ? "Sound Off" : "Sound On")), /*#__PURE__*/



    React.createElement("section", { className: "formation-picker" }, /*#__PURE__*/
    React.createElement("span", null, "Formation"), /*#__PURE__*/
    React.createElement("div", null,
    Object.keys(FORMATIONS).map((name) => /*#__PURE__*/
    React.createElement("button", {
      key: name,
      className: selectedFormationName === name ? "active" : "",
      onClick: () => changeFormation(name),
      disabled: spinning || simulating },

    name))),



    draftedPlayers.length > 0 && /*#__PURE__*/
    React.createElement("small", null, "Reset your XI to change formation.")),



    spinning && spinWinner && /*#__PURE__*/
    React.createElement("section", { className: "spinner-card" }, /*#__PURE__*/
    React.createElement("div", { className: "spinner-window" }, /*#__PURE__*/
    React.createElement("div", { className: "spinner-pointer" }, "\u25BC"), /*#__PURE__*/
    React.createElement("div", { className: "reel-spinner", style: { "--spinOffset": `-${spinOffset}px` } },
    spinReel.map((club, index) => /*#__PURE__*/
    React.createElement("div", {
      key: `${club.id}_${index}`,
      className: `reel-team ${index === spinTargetIndex ? "winner-team" : ""} ${club.jackpot ? "jackpot-team" : ""}`,
      style: { "--teamColor": club.color } }, /*#__PURE__*/

    React.createElement("span", null, club.name), /*#__PURE__*/
    React.createElement("small", null, club.jackpot ? `JACKPOT · ${club.season}` : club.season))))), /*#__PURE__*/




    React.createElement("p", null, "Spinning club...")),



    simulating && liveSeason && /*#__PURE__*/
    React.createElement("section", { className: "simulation-loader season-sim" }, /*#__PURE__*/
    React.createElement("div", { className: "season-sim-top" }, /*#__PURE__*/
    React.createElement("span", null, "Simulating Season"), /*#__PURE__*/
    React.createElement("strong", null, "GW ", liveSeason.week, "/38")), /*#__PURE__*/


    React.createElement("div", { className: "season-record-card" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, liveSeason.wins), /*#__PURE__*/React.createElement("span", null, "W")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, liveSeason.draws), /*#__PURE__*/React.createElement("span", null, "D")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, liveSeason.losses), /*#__PURE__*/React.createElement("span", null, "L")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, liveSeason.points), /*#__PURE__*/React.createElement("span", null, "PTS"))), /*#__PURE__*/


    React.createElement("div", { className: "season-latest" }, /*#__PURE__*/
    React.createElement("small", null, "Latest Result"), /*#__PURE__*/
    React.createElement("p", null, liveSeason.latest)), /*#__PURE__*/


    React.createElement("div", { className: "season-form" },
    liveSeason.recent.map((match) => /*#__PURE__*/
    React.createElement("span", { key: match.week, className: `form-dot ${match.result}` },
    match.result))), /*#__PURE__*/




    React.createElement("div", { className: "sim-progress" }, /*#__PURE__*/
    React.createElement("div", { style: { width: `${simProgress}%` } })), /*#__PURE__*/


    React.createElement("small", { className: "sim-percent" },
    simProgress, "% complete \xB7 Goals ", liveSeason.gf, "-", liveSeason.ga)),




    selectedPlayer && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner" }, "Selected: ", /*#__PURE__*/
    React.createElement("strong", null, selectedPlayer.name), " \u2014 use the position buttons on their card."),



    movingSlotId && draft[movingSlotId] && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner" }, "Moving: ", /*#__PURE__*/
    React.createElement("strong", null, draft[movingSlotId].name), " \u2014 click an open alternate position."),



    currentClub && /*#__PURE__*/
    React.createElement("section", { className: "club-panel", style: { "--club": currentClub.color } }, /*#__PURE__*/
    React.createElement("div", { className: "club-header" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, currentClub.name), /*#__PURE__*/
    React.createElement("p", null, currentClub.jackpot ? "🏆 JACKPOT · " : "", currentClub.season, " \xB7 ", currentClub.league)), /*#__PURE__*/

    React.createElement("strong", null, currentClub.rating)), /*#__PURE__*/

    React.createElement("div", { className: "player-grid" },
    availablePlayers.map(player => {
      const unavailable = pickedNames.includes(player.name) || isPlayerPositionUnavailable(player);
      const isSelected = (selectedPlayer === null || selectedPlayer === void 0 ? void 0 : selectedPlayer.id) === player.id;

      return /*#__PURE__*/(
        React.createElement("div", {
          key: player.id,
          role: "button",
          tabIndex: unavailable ? -1 : 0,
          "aria-disabled": unavailable,
          className: `player-card ${isSelected ? "selected" : ""} ${isPlayerPositionUnavailable(player) ? "position-filled" : ""}`,
          onClick: () => {
            if (!unavailable) selectPlayer(player);
          },
          onKeyDown: e => {
            if (!unavailable && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              selectPlayer(player);
            }
          } }, /*#__PURE__*/

        React.createElement("span", { className: "player-pos" }, player.positions.join("/")), /*#__PURE__*/

        React.createElement("div", { className: "player-info" }, /*#__PURE__*/
        React.createElement("strong", { className: "player-name" }, player.name), /*#__PURE__*/

        React.createElement("div", { className: "player-bottom-row" }, /*#__PURE__*/
        React.createElement("b", { className: `player-rating ${getRatingClass(player.rating)}` }, player.rating),

        isSelected && /*#__PURE__*/
        React.createElement("div", { className: "inline-position-buttons" },
        player.positions.map(pos => {
          const openSlot = FORMATION.find(
          slot => slot.label === pos && !draft[slot.id]);


          return /*#__PURE__*/(
            React.createElement("button", {
              key: pos,
              type: "button",
              className: `mini-pos-btn ${getRatingClass(player.rating)}`,
              disabled: !openSlot,
              onClick: e => {
                e.stopPropagation();
                if (openSlot) placePlayer(openSlot.id);
              } },

            openSlot ? pos : `${pos} Full`));


        }))),




        isPlayerPositionUnavailable(player) && /*#__PURE__*/React.createElement("em", { className: "taken-position" }, "No open role"))));



    }))), /*#__PURE__*/




    React.createElement("section", { className: "pitch-wrap" }, /*#__PURE__*/
    React.createElement("h2", null, "Your XI"), /*#__PURE__*/
    React.createElement("div", { className: "pitch" },
    FORMATION.map(slot => {
      const player = draft[slot.id];
      return /*#__PURE__*/(
        React.createElement("div", {
          key: slot.id,
          role: "button",
          tabIndex: 0,
          className: `slot ${(selectedPlayer || movingSlotId) && !player ? "can-place" : ""} ${lastPlacedSlot === slot.id ? "placed" : ""}`,
          style: { left: `${slot.x}%`, top: `${slot.y}%` },
          onClick: () => {
            if (movingSlotId && !player) movePlayerToSlot(slot.id);else
            if (!player) placePlayer(slot.id);
          },
          onKeyDown: e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (movingSlotId && !player) movePlayerToSlot(slot.id);else
              if (!player) placePlayer(slot.id);
            }
          } }, /*#__PURE__*/

        React.createElement("span", null, slot.label),
        player ? /*#__PURE__*/
        React.createElement(React.Fragment, null, /*#__PURE__*/
        React.createElement("strong", null, player.name), /*#__PURE__*/
        React.createElement("small", { className: getRatingClass(player.finalRating) }, player.finalRating), /*#__PURE__*/
        React.createElement("em", null, player.positions.join("/")), /*#__PURE__*/

        React.createElement("div", {
          className: `move-overlay ${movingSlotId === slot.id ? "active" : ""}`,
          onClick: e => {
            e.stopPropagation();
            setMovingSlotId(movingSlotId === slot.id ? null : slot.id);
          } },

        movingSlotId === slot.id ? "Cancel ↺" : "Move ↔")) : /*#__PURE__*/



        React.createElement("em", null, movingSlotId ? "Move Here" : selectedPlayer ? "Place" : "Empty")));



    }))),



    results && /*#__PURE__*/
    React.createElement("section", { className: "results" }, /*#__PURE__*/
    React.createElement("h2", null, results.badge), /*#__PURE__*/
    React.createElement("div", { className: "result-stats" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.wins), /*#__PURE__*/React.createElement("span", null, "Wins")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.draws), /*#__PURE__*/React.createElement("span", null, "Draws")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.losses), /*#__PURE__*/React.createElement("span", null, "Losses")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.points), /*#__PURE__*/React.createElement("span", null, "Points")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.gf, "-", results.ga), /*#__PURE__*/React.createElement("span", null, "Goals"))), /*#__PURE__*/

    React.createElement("div", { className: "match-list" },
    results.matches.map((match) => /*#__PURE__*/
    React.createElement("div", { key: match.week, className: `match ${match.result}`, style: { animationDelay: `${match.week * 0.035}s` } }, /*#__PURE__*/
    React.createElement("span", null, "GW ", match.week), /*#__PURE__*/
    React.createElement("strong", null, match.result), /*#__PURE__*/
    React.createElement("p", null, match.score, " vs ", match.opponent)))),






    playerSeasonStats.length > 0 && /*#__PURE__*/
    React.createElement("div", { className: "player-stats-panel" }, /*#__PURE__*/
    React.createElement("h3", null, "Player Season Stats"), /*#__PURE__*/

    React.createElement("div", { className: "player-stats-table" }, /*#__PURE__*/
    React.createElement("div", { className: "player-stats-row head" }, /*#__PURE__*/
    React.createElement("span", null, "Player"), /*#__PURE__*/
    React.createElement("span", null, "POS"), /*#__PURE__*/
    React.createElement("span", null, "G"), /*#__PURE__*/
    React.createElement("span", null, "A"), /*#__PURE__*/
    React.createElement("span", null, "CS"), /*#__PURE__*/
    React.createElement("span", null, "AVG")),


    playerSeasonStats.map((player) => /*#__PURE__*/
    React.createElement("div", { className: "player-stats-row", key: player.id }, /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/
    React.createElement("strong", null, player.name), /*#__PURE__*/
    React.createElement("small", null, player.club)), /*#__PURE__*/

    React.createElement("span", null, player.position), /*#__PURE__*/
    React.createElement("span", null, player.goals), /*#__PURE__*/
    React.createElement("span", null, player.assists), /*#__PURE__*/
    React.createElement("span", null, player.cleanSheets), /*#__PURE__*/
    React.createElement("span", null, player.averageRating))))),






    rewards.length > 0 && /*#__PURE__*/
    React.createElement("div", { className: "rewards-panel" }, /*#__PURE__*/
    React.createElement("h3", null, "Rewards Earned"), /*#__PURE__*/
    React.createElement("div", { className: "reward-list" },
    rewards.map((reward) => /*#__PURE__*/
    React.createElement("span", { key: reward, className: "reward-badge" },
    reward)))), /*#__PURE__*/






    React.createElement("button", { className: "play-again", onClick: resetGame }, "Play Again"))));




}

ReactDOM.createRoot(document.getElementById("root")).render( /*#__PURE__*/React.createElement(App, null));