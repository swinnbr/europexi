// Draft XI World Cup v4.0  fresh JSX with 20-team table, expanded variety, no repeats, and no generic players
// Draft XI: World Cup v2.0  integrated CodePen JSX
// Includes expanded teams, contextual alternate positions, fair spinner, reroll, locked players, smarter greying, live simulation, and Play Again.
function setMobileViewportHeight() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`);
}

setMobileViewportHeight();
if (typeof window !== "undefined") {
  window.removeEventListener("resize", setMobileViewportHeight);
  window.addEventListener("resize", setMobileViewportHeight);
}
const { useMemo, useState, useRef, useEffect } = React;

const FORMATIONS = {
  "4-3-3": [
  { id: "gk", label: "GK", x: 50, y: 86, mobileX: 50, mobileY: 90 },
  { id: "rb", label: "RB", x: 78, y: 68, mobileX: 84, mobileY: 74 },
  { id: "cb1", label: "CB", x: 60, y: 70, mobileX: 62, mobileY: 77 },
  { id: "cb2", label: "CB", x: 40, y: 70, mobileX: 38, mobileY: 77 },
  { id: "lb", label: "LB", x: 22, y: 68, mobileX: 16, mobileY: 74 },
  { id: "cm1", label: "CM", x: 35, y: 48, mobileX: 30, mobileY: 50 },
  { id: "cm2", label: "CM", x: 50, y: 53, mobileX: 50, mobileY: 58 },
  { id: "cm3", label: "CM", x: 65, y: 48, mobileX: 70, mobileY: 50 },
  { id: "rw", label: "RW", x: 76, y: 24, mobileX: 82, mobileY: 24 },
  { id: "st", label: "ST", x: 50, y: 18, mobileX: 50, mobileY: 15 },
  { id: "lw", label: "LW", x: 24, y: 24, mobileX: 18, mobileY: 24 }],


  "4-4-2": [
  { id: "gk", label: "GK", x: 50, y: 86, mobileX: 50, mobileY: 90 },
  { id: "rb", label: "RB", x: 78, y: 68, mobileX: 84, mobileY: 74 },
  { id: "cb1", label: "CB", x: 60, y: 70, mobileX: 62, mobileY: 77 },
  { id: "cb2", label: "CB", x: 40, y: 70, mobileX: 38, mobileY: 77 },
  { id: "lb", label: "LB", x: 22, y: 68, mobileX: 16, mobileY: 74 },
  { id: "rm", label: "RM", x: 76, y: 47, mobileX: 82, mobileY: 49 },
  { id: "cm1", label: "CM", x: 58, y: 50, mobileX: 61, mobileY: 54 },
  { id: "cm2", label: "CM", x: 42, y: 50, mobileX: 39, mobileY: 54 },
  { id: "lm", label: "LM", x: 24, y: 47, mobileX: 18, mobileY: 49 },
  { id: "st1", label: "ST", x: 42, y: 20, mobileX: 38, mobileY: 18 },
  { id: "st2", label: "ST", x: 58, y: 20, mobileX: 62, mobileY: 18 }],


  "3-4-3": [
  { id: "gk", label: "GK", x: 50, y: 86, mobileX: 50, mobileY: 90 },
  { id: "cb1", label: "CB", x: 65, y: 70, mobileX: 70, mobileY: 77 },
  { id: "cb2", label: "CB", x: 50, y: 73, mobileX: 50, mobileY: 80 },
  { id: "cb3", label: "CB", x: 35, y: 70, mobileX: 30, mobileY: 77 },
  { id: "rm", label: "RM", x: 78, y: 49, mobileX: 84, mobileY: 54 },
  { id: "cm1", label: "CM", x: 58, y: 51, mobileX: 61, mobileY: 57 },
  { id: "cm2", label: "CM", x: 42, y: 51, mobileX: 39, mobileY: 57 },
  { id: "lm", label: "LM", x: 22, y: 49, mobileX: 16, mobileY: 54 },
  { id: "rw", label: "RW", x: 74, y: 23, mobileX: 82, mobileY: 24 },
  { id: "st", label: "ST", x: 50, y: 18, mobileX: 50, mobileY: 15 },
  { id: "lw", label: "LW", x: 26, y: 23, mobileX: 18, mobileY: 24 }],


  "4-2-3-1": [
  { id: "gk", label: "GK", x: 50, y: 86, mobileX: 50, mobileY: 90 },
  { id: "rb", label: "RB", x: 78, y: 68, mobileX: 84, mobileY: 74 },
  { id: "cb1", label: "CB", x: 60, y: 70, mobileX: 62, mobileY: 77 },
  { id: "cb2", label: "CB", x: 40, y: 70, mobileX: 38, mobileY: 77 },
  { id: "lb", label: "LB", x: 22, y: 68, mobileX: 16, mobileY: 74 },
  { id: "cdm1", label: "CDM", x: 42, y: 53, mobileX: 37, mobileY: 60 },
  { id: "cdm2", label: "CDM", x: 58, y: 53, mobileX: 63, mobileY: 60 },
  { id: "rw", label: "RW", x: 74, y: 35, mobileX: 82, mobileY: 39 },
  { id: "cam", label: "CAM", x: 50, y: 34, mobileX: 50, mobileY: 36 },
  { id: "lw", label: "LW", x: 26, y: 35, mobileX: 18, mobileY: 39 },
  { id: "st", label: "ST", x: 50, y: 17, mobileX: 50, mobileY: 15 }],


  "3-5-2": [
  { id: "gk", label: "GK", x: 50, y: 86, mobileX: 50, mobileY: 90 },
  { id: "cb1", label: "CB", x: 65, y: 70, mobileX: 70, mobileY: 77 },
  { id: "cb2", label: "CB", x: 50, y: 73, mobileX: 50, mobileY: 80 },
  { id: "cb3", label: "CB", x: 35, y: 70, mobileX: 30, mobileY: 77 },
  { id: "rm", label: "RM", x: 78, y: 49, mobileX: 84, mobileY: 53 },
  { id: "cm1", label: "CM", x: 61, y: 50, mobileX: 67, mobileY: 54 },
  { id: "cm2", label: "CM", x: 50, y: 55, mobileX: 50, mobileY: 60 },
  { id: "cm3", label: "CM", x: 39, y: 50, mobileX: 33, mobileY: 54 },
  { id: "lm", label: "LM", x: 22, y: 49, mobileX: 16, mobileY: 53 },
  { id: "st1", label: "ST", x: 42, y: 20, mobileX: 38, mobileY: 18 },
  { id: "st2", label: "ST", x: 58, y: 20, mobileX: 62, mobileY: 18 }],


  "4-1-2-1-2": [
  { id: "gk", label: "GK", x: 50, y: 86, mobileX: 50, mobileY: 90 },
  { id: "rb", label: "RB", x: 78, y: 68, mobileX: 84, mobileY: 74 },
  { id: "cb1", label: "CB", x: 60, y: 70, mobileX: 62, mobileY: 77 },
  { id: "cb2", label: "CB", x: 40, y: 70, mobileX: 38, mobileY: 77 },
  { id: "lb", label: "LB", x: 22, y: 68, mobileX: 16, mobileY: 74 },
  { id: "cdm", label: "CDM", x: 50, y: 56, mobileX: 50, mobileY: 62 },
  { id: "cm1", label: "CM", x: 36, y: 46, mobileX: 34, mobileY: 50 },
  { id: "cm2", label: "CM", x: 64, y: 46, mobileX: 66, mobileY: 50 },
  { id: "cam", label: "CAM", x: 50, y: 34, mobileX: 50, mobileY: 36 },
  { id: "st1", label: "ST", x: 42, y: 18, mobileX: 38, mobileY: 17 },
  { id: "st2", label: "ST", x: 58, y: 18, mobileX: 62, mobileY: 17 }] };


const DEFAULT_FORMATION_NAME = "4-3-3";

const COMPATIBLE = {
  GK: ["GK"],
  RB: ["RB", "CB", "LB"],
  CB: ["CB", "RB", "LB", "CDM"],
  LB: ["LB", "CB", "RB"],
  CDM: ["CDM", "CM", "CB"],
  CM: ["CM", "CDM", "CAM"],
  CAM: ["CAM", "CM", "ST", "LW", "RW"],
  LM: ["LM", "LW", "CM"],
  RM: ["RM", "RW", "CM"],
  LW: ["LW", "LM", "RW", "CAM", "ST"],
  RW: ["RW", "RM", "LW", "CAM", "ST"],
  ST: ["ST", "CAM", "LW", "RW"] };

function isNoPenaltyMidfieldSwap(playerPosition, slotPosition) {
  return playerPosition === "CDM" && slotPosition === "CM" ||
  playerPosition === "CM" && slotPosition === "CDM";
}


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






const EXTRA_TOP5_CLUBS = [
{
  id: "roma0001_extra",
  name: "Roma",
  league: "Serie A",
  season: "2000-01",
  color: "#8E1F2F",
  rating: 86,
  players: [
  ["Francesco Totti", "CAM", 91], ["Gabriel Batistuta", "ST", 89], ["Cafu", "RB", 88],
  ["Walter Samuel", "CB", 87], ["Emerson", "CDM", 86], ["Vincenzo Montella", "ST", 86],
  ["Damiano Tommasi", "CM", 84], ["Aldair", "CB", 84], ["Vincent Candela", "LB", 84],
  ["Hidetoshi Nakata", "CAM", 83], ["Francesco Antonioli", "GK", 82]] },


{
  id: "lazio1718_extra",
  name: "Lazio",
  league: "Serie A",
  season: "2017-18",
  color: "#87D8F7",
  rating: 84,
  players: [
  ["Ciro Immobile", "ST", 88], ["Luis Alberto", "CAM", 86], ["Sergej Milinkovic-Savic", "CM", 87],
  ["Lucas Leiva", "CDM", 84], ["Stefan de Vrij", "CB", 85], ["Thomas Strakosha", "GK", 82],
  ["Senad Lulic", "LM", 82], ["Adam Marusic", "RM", 81], ["Felipe Anderson", "RW", 84],
  ["Bastos Quissanga", "CB", 80], ["Jordan Lukaku", "LB", 79]] },


{
  id: "fiorentina9899_extra",
  name: "Fiorentina",
  league: "Serie A",
  season: "1998-99",
  color: "#5B2C83",
  rating: 84,
  players: [
  ["Gabriel Batistuta", "ST", 91], ["Rui Costa", "CAM", 89], ["Francesco Toldo", "GK", 87],
  ["Moreno Torricelli", "RB", 82], ["Jorg Heinrich", "LB", 82], ["Luis Oliveira", "ST", 82],
  ["Angelo Di Livio", "RM", 83], ["Stefan Schwarz", "CDM", 82], ["Aldo Firicano", "CB", 80],
  ["Emiliano Bigica", "CM", 79], ["Heinrich", "CB", 79]] },


{
  id: "marseille9293_extra",
  name: "Marseille",
  league: "Ligue 1",
  season: "1992-93",
  color: "#00A3E0",
  rating: 87,
  players: [
  ["Fabien Barthez", "GK", 87], ["Marcel Desailly", "CB", 89], ["Didier Deschamps", "CDM", 88],
  ["Alen Boksic", "ST", 87], ["Rudi Voller", "ST", 86], ["Abedi Pele", "CAM", 89],
  ["Basile Boli", "CB", 86], ["Eric Di Meco", "LB", 84], ["Jocelyn Angloma", "RB", 84],
  ["Franck Sauzee", "CM", 85], ["Jean-Philippe Durand", "CM", 81]] },


{
  id: "nice2223_extra",
  name: "Nice",
  league: "Ligue 1",
  season: "2022-23",
  color: "#D71920",
  rating: 80,
  players: [
  ["Kasper Schmeichel", "GK", 81], ["Jean-Clair Todibo", "CB", 84], ["Dante", "CB", 82],
  ["Melvin Bard", "LB", 79], ["Jordan Lotomba", "RB", 78], ["Khephren Thuram", "CM", 83],
  ["Aaron Ramsey", "CM", 80], ["Sofiane Diop", "CAM", 80], ["Nicolas Pepe", "RW", 81],
  ["Gaetan Laborde", "ST", 81], ["Terem Moffi", "ST", 82]] },


{
  id: "montpellier1112_extra",
  name: "Montpellier",
  league: "Ligue 1",
  season: "2011-12",
  color: "#F58220",
  rating: 81,
  players: [
  ["Olivier Giroud", "ST", 85], ["Younes Belhanda", "CAM", 84], ["Mapou Yanga-Mbiwa", "CB", 83],
  ["Remy Cabella", "CAM", 81], ["Henri Bedimo", "LB", 81], ["Vitorino Hilton", "CB", 80],
  ["Jamel Saihi", "CDM", 79], ["Marco Estrada", "CM", 79], ["Souleymane Camara", "RW", 79],
  ["John Utaka", "LW", 80], ["Geoffrey Jourdren", "GK", 78]] },


{
  id: "wolfsburg0809_extra",
  name: "Wolfsburg",
  league: "Bundesliga",
  season: "2008-09",
  color: "#65B32E",
  rating: 84,
  players: [
  ["Edin Dzeko", "ST", 88], ["Grafite", "ST", 87], ["Zvjezdan Misimovic", "CAM", 86],
  ["Josue", "CDM", 82], ["Christian Gentner", "CM", 81], ["Makoto Hasebe", "CM", 80],
  ["Marcel Schafer", "LB", 81], ["Andrea Barzagli", "CB", 83], ["Ricardo Costa", "CB", 81],
  ["Sascha Riether", "RB", 80], ["Diego Benaglio", "GK", 83]] },


{
  id: "stuttgart0607_extra",
  name: "Stuttgart",
  league: "Bundesliga",
  season: "2006-07",
  color: "#E32219",
  rating: 82,
  players: [
  ["Mario Gomez", "ST", 86], ["Cacau", "ST", 82], ["Thomas Hitzlsperger", "CM", 83],
  ["Sami Khedira", "CDM", 82], ["Pavel Pardo", "CDM", 81], ["Roberto Hilbert", "RM", 80],
  ["Ludovic Magnin", "LB", 79], ["Fernando Meira", "CB", 83], ["Serdar Tasci", "CB", 81],
  ["Andreas Hinkel", "RB", 80], ["Timo Hildebrand", "GK", 84]] },


{
  id: "schalke1011_extra",
  name: "Schalke",
  league: "Bundesliga",
  season: "2010-11",
  color: "#004B9B",
  rating: 82,
  players: [
  ["Manuel Neuer", "GK", 89], ["Raul Gonzalez", "ST", 86], ["Klaas-Jan Huntelaar", "ST", 84],
  ["Jefferson Farfan", "RW", 84], ["Benedikt Howedes", "CB", 83], ["Joel Matip", "CB", 82],
  ["Atsuto Uchida", "RB", 80], ["Christian Fuchs", "LB", 80], ["Peer Kluge", "CM", 78],
  ["Ivan Rakitic", "CM", 83], ["Julian Draxler", "LW", 79]] },


{
  id: "betis2122_extra",
  name: "Real Betis",
  league: "La Liga",
  season: "2021-22",
  color: "#00954C",
  rating: 82,
  players: [
  ["Nabil Fekir", "CAM", 86], ["Sergio Canales", "CM", 84], ["William Carvalho", "CDM", 82],
  ["Borja Iglesias", "ST", 82], ["Juanmi", "LW", 82], ["Joaquin", "RW", 81],
  ["Alex Moreno", "LB", 81], ["Hector Bellerin", "RB", 80], ["Marc Bartra", "CB", 81],
  ["German Pezzella", "CB", 81], ["Claudio Bravo", "GK", 80]] },


{
  id: "athletic1112_extra",
  name: "Athletic Club",
  league: "La Liga",
  season: "2011-12",
  color: "#EE2523",
  rating: 82,
  players: [
  ["Fernando Llorente", "ST", 86], ["Iker Muniain", "LW", 84], ["Javi Martinez", "CDM", 85],
  ["Ander Herrera", "CM", 83], ["Markel Susaeta", "RW", 82], ["Oscar de Marcos", "RM", 81],
  ["Andoni Iraola", "RB", 83], ["Mikel San Jose", "CB", 81], ["Fernando Amorebieta", "CB", 81],
  ["Jon Aurtenetxe", "LB", 78], ["Gorka Iraizoz", "GK", 80]] },


{
  id: "depor9900_extra",
  name: "Deportivo La Coruna",
  league: "La Liga",
  season: "1999-00",
  color: "#005BBB",
  rating: 84,
  players: [
  ["Roy Makaay", "ST", 86], ["Djalminha", "CAM", 87], ["Mauro Silva", "CDM", 86],
  ["Fran Gonzalez", "LW", 84], ["Donato", "CB", 83], ["Naybet", "CB", 83],
  ["Manuel Pablo", "RB", 82], ["Joan Capdevila", "LB", 82], ["Victor Sanchez", "RW", 82],
  ["Flavio Conceicao", "CM", 83], ["Jacques Songo'o", "GK", 82]] },


{
  id: "everton0405_extra",
  name: "Everton",
  league: "Premier League",
  season: "2004-05",
  color: "#003399",
  rating: 80,
  players: [
  ["Tim Cahill", "CAM", 83], ["Mikel Arteta", "CM", 84], ["Thomas Gravesen", "CM", 82],
  ["Duncan Ferguson", "ST", 80], ["Leon Osman", "RM", 79], ["Kevin Kilbane", "LM", 78],
  ["Tony Hibbert", "RB", 78], ["David Weir", "CB", 80], ["Joseph Yobo", "CB", 81],
  ["Alessandro Pistone", "LB", 77], ["Nigel Martyn", "GK", 82]] },


{
  id: "westham1516_extra",
  name: "West Ham",
  league: "Premier League",
  season: "2015-16",
  color: "#7A263A",
  rating: 80,
  players: [
  ["Dimitri Payet", "CAM", 86], ["Manuel Lanzini", "CAM", 82], ["Mark Noble", "CM", 81],
  ["Cheikhou Kouyate", "CDM", 81], ["Michail Antonio", "RW", 81], ["Diafra Sakho", "ST", 79],
  ["Aaron Cresswell", "LB", 81], ["Winston Reid", "CB", 80], ["James Collins", "CB", 79],
  ["Carl Jenkinson", "RB", 78], ["Adrian San Miguel", "GK", 80]] },


{
  id: "leeds0001_extra",
  name: "Leeds United",
  league: "Premier League",
  season: "2000-01",
  color: "#FFCD00",
  rating: 83,
  players: [
  ["Rio Ferdinand", "CB", 87], ["Harry Kewell", "LW", 86], ["Mark Viduka", "ST", 85],
  ["Alan Smith", "ST", 82], ["Lee Bowyer", "CM", 83], ["Olivier Dacourt", "CDM", 82],
  ["Ian Harte", "LB", 82], ["Jonathan Woodgate", "CB", 84], ["Gary Kelly", "RB", 80],
  ["Nigel Martyn", "GK", 84], ["Eirik Bakke", "CM", 79]] },


{
  id: "parma9899_extra",
  name: "Parma",
  league: "Serie A",
  season: "1998-99",
  color: "#FFDD00",
  rating: 86,
  players: [
  ["Gianluigi Buffon", "GK", 90], ["Lilian Thuram", "CB", 90], ["Fabio Cannavaro", "CB", 89],
  ["Juan Sebastian Veron", "CM", 89], ["Hernan Crespo", "ST", 89], ["Enrico Chiesa", "ST", 86],
  ["Dino Baggio", "CDM", 84], ["Diego Fuser", "RM", 83], ["Alain Boghossian", "CM", 82],
  ["Antonio Benarrivo", "LB", 83], ["Paolo Vanoli", "LB", 81]] },


{
  id: "bremen0304_extra",
  name: "Werder Bremen",
  league: "Bundesliga",
  season: "2003-04",
  color: "#1D9053",
  rating: 83,
  players: [
  ["Ailton", "ST", 86], ["Johan Micoud", "CAM", 86], ["Miroslav Klose", "ST", 85],
  ["Torsten Frings", "CM", 84], ["Frank Baumann", "CDM", 82], ["Tim Borowski", "CM", 81],
  ["Valerien Ismael", "CB", 83], ["Mladen Krstajic", "CB", 82], ["Paul Stalteri", "RB", 80],
  ["Christian Schulz", "LB", 79], ["Andreas Reinke", "GK", 80]] },


{
  id: "mallorca9899_extra",
  name: "Mallorca",
  league: "La Liga",
  season: "1998-99",
  color: "#E20613",
  rating: 80,
  players: [
  ["Samuel Eto'o", "ST", 84], ["Dani Guiza", "ST", 82], ["Juan Carlos Valeron", "CAM", 83],
  ["Ariel Ibagaza", "CAM", 82], ["Lauren", "RB", 81], ["Miguel Angel Nadal", "CB", 82],
  ["Marcelino Elena", "CB", 80], ["Jovan Stankovic", "LW", 79], ["Vicente Engonga", "CDM", 80],
  ["Miquel Soler", "LB", 78], ["Carlos Roa", "GK", 81]] },


{
  id: "toulouse2223_extra",
  name: "Toulouse",
  league: "Ligue 1",
  season: "2022-23",
  color: "#6F2DA8",
  rating: 78,
  players: [
  ["Thijs Dallinga", "ST", 80], ["Branco van den Boomen", "CM", 80], ["Zakaria Aboukhlal", "RW", 79],
  ["Rafael Ratao", "LW", 78], ["Stijn Spierings", "CDM", 79], ["Fars Chaibi", "CAM", 79],
  ["Mikkel Desler", "RB", 77], ["Rasmus Nicolaisen", "CB", 78], ["Anthony Rouault", "CB", 78],
  ["Issiaga Sylla", "LB", 77], ["Maxime Dupe", "GK", 78]] },


{
  id: "mainz2223_extra",
  name: "Mainz",
  league: "Bundesliga",
  season: "2022-23",
  color: "#C3141E",
  rating: 79,
  players: [
  ["Robin Zentner", "GK", 79], ["Silvan Widmer", "RB", 79], ["Stefan Bell", "CB", 79],
  ["Alexander Hack", "CB", 78], ["Aaron Martin", "LB", 79], ["Anton Stach", "CM", 81],
  ["Leandro Barreiro", "CM", 79], ["Dominik Kohr", "CDM", 79], ["Jae-sung Lee", "CAM", 80],
  ["Karim Onisiwo", "ST", 80], ["Jonathan Burkardt", "ST", 79]] }];




const EXPANDED_DRAFT_CLUBS = [
{
  id: "tot1819_expanded",
  name: "Tottenham",
  league: "Premier League",
  season: "2018-19",
  color: "#132257",
  rating: 86,
  players: [
  ["Harry Kane", "ST", 91], ["Son Heung-min", "LW", 89], ["Christian Eriksen", "CAM", 88],
  ["Hugo Lloris", "GK", 86], ["Jan Vertonghen", "CB", 86], ["Toby Alderweireld", "CB", 86],
  ["Dele Alli", "CAM", 85], ["Mousa Dembele", "CM", 85], ["Kieran Trippier", "RB", 84],
  ["Danny Rose", "LB", 83], ["Eric Dier", "CDM", 82], ["Lucas Moura", "RW", 82],
  ["Moussa Sissoko", "CM", 81], ["Erik Lamela", "RW", 81], ["Davinson Sanchez", "CB", 81]] },


{
  id: "newcastle2223_expanded",
  name: "Newcastle United",
  league: "Premier League",
  season: "2022-23",
  color: "#241F20",
  rating: 82,
  players: [
  ["Bruno Guimaraes", "CM", 86], ["Kieran Trippier", "RB", 85], ["Alexander Isak", "ST", 84],
  ["Nick Pope", "GK", 84], ["Sven Botman", "CB", 83], ["Joelinton", "CM", 83],
  ["Miguel Almiron", "RW", 82], ["Callum Wilson", "ST", 82], ["Fabian Schar", "CB", 82],
  ["Dan Burn", "LB", 80], ["Joe Willock", "CM", 80], ["Allan Saint-Maximin", "LW", 81],
  ["Sean Longstaff", "CM", 78], ["Jacob Murphy", "RM", 78], ["Anthony Gordon", "LW", 78]] },


{
  id: "astonvilla2324_expanded",
  name: "Aston Villa",
  league: "Premier League",
  season: "2023-24",
  color: "#670E36",
  rating: 83,
  players: [
  ["Ollie Watkins", "ST", 86], ["Emiliano Martinez", "GK", 86], ["Douglas Luiz", "CM", 85],
  ["John McGinn", "CM", 84], ["Moussa Diaby", "RW", 84], ["Leon Bailey", "RW", 83],
  ["Pau Torres", "CB", 83], ["Ezri Konsa", "CB", 82], ["Lucas Digne", "LB", 82],
  ["Matty Cash", "RB", 81], ["Youri Tielemans", "CM", 81], ["Jacob Ramsey", "CM", 80],
  ["Boubacar Kamara", "CDM", 82], ["Nicolo Zaniolo", "LW", 80], ["Diego Carlos", "CB", 81]] },


{
  id: "porto1011_expanded",
  name: "Porto",
  league: "Primeira Liga",
  season: "2010-11",
  color: "#0057B8",
  rating: 87,
  players: [
  ["Radamel Falcao", "ST", 90], ["Hulk", "RW", 88], ["Joao Moutinho", "CM", 86],
  ["Fernando", "CDM", 85], ["James Rodriguez", "LW", 85], ["Nicolas Otamendi", "CB", 84],
  ["Rolando", "CB", 83], ["Helton", "GK", 83], ["Alvaro Pereira", "LB", 83],
  ["Fredy Guarin", "CM", 84], ["Silvestre Varela", "RW", 82], ["Cristian Rodriguez", "LW", 82],
  ["Maicon", "CB", 81], ["Cristian Sapunaru", "RB", 80], ["Ruben Micael", "CM", 80]] },


{
  id: "benfica1314_expanded",
  name: "Benfica",
  league: "Primeira Liga",
  season: "2013-14",
  color: "#E83030",
  rating: 85,
  players: [
  ["Jan Oblak", "GK", 87], ["Nicolas Gaitan", "LW", 86], ["Enzo Perez", "CM", 86],
  ["Lima", "ST", 84], ["Ezequiel Garay", "CB", 85], ["Nemanja Matic", "CDM", 87],
  ["Rodrigo Moreno", "ST", 83], ["Eduardo Salvio", "RW", 83], ["Maxi Pereira", "RB", 83],
  ["Luisao", "CB", 83], ["Andre Gomes", "CM", 82], ["Ruben Amorim", "CM", 80],
  ["Lazar Markovic", "RW", 82], ["Miralem Sulejmani", "LW", 80], ["Silvio", "LB", 79]] },


{
  id: "sporting2021_expanded",
  name: "Sporting CP",
  league: "Primeira Liga",
  season: "2020-21",
  color: "#008057",
  rating: 82,
  players: [
  ["Pedro Goncalves", "CAM", 85], ["Joao Palhinha", "CDM", 84], ["Nuno Mendes", "LB", 83],
  ["Sebastian Coates", "CB", 83], ["Pedro Porro", "RB", 82], ["Antonio Adan", "GK", 81],
  ["Matheus Nunes", "CM", 82], ["Goncalo Inacio", "CB", 81], ["Nuno Santos", "LW", 80],
  ["Paulinho", "ST", 80], ["Daniel Braganca", "CM", 79], ["Tiago Tomas", "ST", 78],
  ["Zouhair Feddal", "CB", 79], ["Jovane Cabral", "LW", 79], ["Ricardo Esgaio", "RM", 78]] },


{
  id: "ajax1819_expanded",
  name: "Ajax",
  league: "Eredivisie",
  season: "2018-19",
  color: "#D2122E",
  rating: 88,
  players: [
  ["Frenkie de Jong", "CM", 90], ["Matthijs de Ligt", "CB", 90], ["Hakim Ziyech", "RW", 88],
  ["Dusan Tadic", "LW", 88], ["Donny van de Beek", "CAM", 86], ["Andre Onana", "GK", 85],
  ["Daley Blind", "CB", 85], ["Nicolas Tagliafico", "LB", 84], ["David Neres", "RW", 84],
  ["Noussair Mazraoui", "RB", 82], ["Lasse Schone", "CDM", 82], ["Kaspar Dolberg", "ST", 81],
  ["Klaas-Jan Huntelaar", "ST", 80], ["Joel Veltman", "CB", 80], ["Carel Eiting", "CM", 77]] },


{
  id: "psv1718_expanded",
  name: "PSV",
  league: "Eredivisie",
  season: "2017-18",
  color: "#E60012",
  rating: 81,
  players: [
  ["Hirving Lozano", "LW", 84], ["Luuk de Jong", "ST", 83], ["Marco van Ginkel", "CM", 82],
  ["Steven Bergwijn", "RW", 82], ["Jeroen Zoet", "GK", 81], ["Arias", "RB", 81],
  ["Daniel Schwaab", "CB", 79], ["Nick Viergever", "CB", 79], ["Jorrit Hendrix", "CDM", 80],
  ["Gastn Pereiro", "CAM", 81], ["Davy Propper", "CM", 81], ["Angelino", "LB", 80],
  ["Pablo Rosario", "CDM", 78], ["Donyell Malen", "ST", 79], ["Mauro Junior", "LW", 77]] },


{
  id: "galatasaray9900_expanded",
  name: "Galatasaray",
  league: "Super Lig",
  season: "1999-00",
  color: "#A32638",
  rating: 85,
  players: [
  ["Gheorghe Hagi", "CAM", 90], ["Claudio Taffarel", "GK", 86], ["Hakan Sukur", "ST", 86],
  ["Gheorghe Popescu", "CB", 86], ["Emre Belozoglu", "CM", 84], ["Okan Buruk", "RM", 83],
  ["Hasan Sas", "LW", 83], ["Bulent Korkmaz", "CB", 84], ["Umit Davala", "RB", 82],
  ["Suat Kaya", "CDM", 82], ["Arif Erdem", "ST", 81], ["Hakan Unsal", "LB", 82],
  ["Capone", "CB", 80], ["Marcio Mixirica", "ST", 78], ["Ergun Penbe", "LB", 80]] },


{
  id: "fenerbahce0708_expanded",
  name: "Fenerbahce",
  league: "Super Lig",
  season: "2007-08",
  color: "#003B7A",
  rating: 82,
  players: [
  ["Roberto Carlos", "LB", 87], ["Alex de Souza", "CAM", 88], ["Volkan Demirel", "GK", 82],
  ["Mateja Kezman", "ST", 82], ["Deivid", "RW", 82], ["Stephen Appiah", "CM", 83],
  ["Mehmet Aurelio", "CDM", 82], ["Gokhan Gonul", "RB", 82], ["Diego Lugano", "CB", 83],
  ["Edu Dracena", "CB", 82], ["Colin Kazim-Richards", "RW", 79], ["Semih Senturk", "ST", 80],
  ["Ugur Boral", "LM", 79], ["Selcuk Sahin", "CDM", 78], ["Maldonado", "CDM", 77]] },


{
  id: "zenit0708_expanded",
  name: "Zenit",
  league: "Russian Premier League",
  season: "2007-08",
  color: "#009FE3",
  rating: 84,
  players: [
  ["Andrey Arshavin", "CAM", 88], ["Anatoliy Tymoshchuk", "CDM", 86], ["Pavel Pogrebnyak", "ST", 84],
  ["Vyacheslav Malafeev", "GK", 83], ["Aleksandr Anyukov", "RB", 83], ["Martin Skrtel", "CB", 83],
  ["Nicolas Lombaerts", "CB", 82], ["Kim Dong-jin", "LB", 80], ["Konstantin Zyryanov", "CM", 84],
  ["Igor Denisov", "CM", 82], ["Viktor Fayzulin", "RM", 80], ["Alejandro Dominguez", "RW", 82],
  ["Fatih Tekke", "ST", 81], ["Roman Shirokov", "CB", 80], ["Radek Sirl", "LM", 79]] },


{
  id: "shakhtar0809_expanded",
  name: "Shakhtar Donetsk",
  league: "Ukrainian Premier League",
  season: "2008-09",
  color: "#F36C21",
  rating: 84,
  players: [
  ["Darijo Srna", "RB", 87], ["Fernandinho", "CM", 86], ["Willian", "LW", 85],
  ["Luiz Adriano", "ST", 83], ["Jadson", "CAM", 84], ["Dmytro Chygrynskiy", "CB", 83],
  ["Razvan Rat", "LB", 82], ["Andriy Pyatov", "GK", 82], ["Tomas Hubschman", "CDM", 82],
  ["Ilsinho", "RW", 82], ["Mariusz Lewandowski", "CDM", 81], ["Olexandr Kucher", "CB", 80],
  ["Brandao", "ST", 80], ["Douglas Costa", "RW", 79], ["Henrikh Mkhitaryan", "CAM", 79]] },


{
  id: "rangers0708_expanded",
  name: "Rangers",
  league: "Scottish Premiership",
  season: "2007-08",
  color: "#0033A0",
  rating: 81,
  players: [
  ["Allan McGregor", "GK", 82], ["Carlos Cuellar", "CB", 84], ["David Weir", "CB", 82],
  ["Sasa Papac", "LB", 80], ["Alan Hutton", "RB", 82], ["Barry Ferguson", "CM", 84],
  ["Brahim Hemdani", "CDM", 80], ["Steven Davis", "CM", 82], ["DaMarcus Beasley", "LW", 80],
  ["Nacho Novo", "RW", 79], ["Jean-Claude Darcheville", "ST", 80], ["Kris Boyd", "ST", 81],
  ["Kevin Thomson", "CM", 79], ["Lee McCulloch", "LM", 78], ["Kenny Miller", "ST", 79]] },


{
  id: "celtic2223_expanded",
  name: "Celtic",
  league: "Scottish Premiership",
  season: "2022-23",
  color: "#018749",
  rating: 80,
  players: [
  ["Kyogo Furuhashi", "ST", 83], ["Jota", "LW", 82], ["Callum McGregor", "CM", 82],
  ["Reo Hatate", "CM", 81], ["Cameron Carter-Vickers", "CB", 81], ["Joe Hart", "GK", 80],
  ["Alistair Johnston", "RB", 80], ["Greg Taylor", "LB", 80], ["Daizen Maeda", "LW", 80],
  ["Liel Abada", "RW", 79], ["Matt O'Riley", "CM", 80], ["Aaron Mooy", "CDM", 79],
  ["Carl Starfelt", "CB", 79], ["Sead Haksabanovic", "CAM", 78], ["Oh Hyeon-gyu", "ST", 77]] },


{
  id: "leverkusen0102_expanded",
  name: "Bayer Leverkusen",
  league: "Bundesliga",
  season: "2001-02",
  color: "#E32221",
  rating: 88,
  players: [
  ["Michael Ballack", "CM", 91], ["Lucio", "CB", 89], ["Bernd Schneider", "RM", 86],
  ["Ze Roberto", "LM", 86], ["Dimitar Berbatov", "ST", 86], ["Hans-Jorg Butt", "GK", 84],
  ["Yildiray Basturk", "CAM", 85], ["Carsten Ramelow", "CDM", 84], ["Diego Placente", "LB", 82],
  ["Jens Nowotny", "CB", 84], ["Oliver Neuville", "ST", 83], ["Thomas Brdaric", "ST", 80],
  ["Zoltan Sebescen", "RB", 79], ["Boris Zivkovic", "CB", 80], ["Marko Babic", "LM", 78]] },


{
  id: "real_sociedad0203_expanded",
  name: "Real Sociedad",
  league: "La Liga",
  season: "2002-03",
  color: "#0067B1",
  rating: 84,
  players: [
  ["Xabi Alonso", "CM", 88], ["Nihat Kahveci", "ST", 86], ["Darko Kovacevic", "ST", 85],
  ["Sander Westerveld", "GK", 82], ["Valery Karpin", "RM", 84], ["Javier de Pedro", "LM", 83],
  ["Aitor Lopez Rekarte", "RB", 81], ["Agustin Aranzabal", "LB", 81], ["Igor Jauregi", "CB", 80],
  ["Bjorn Tore Kvarme", "CB", 80], ["Mikel Aranburu", "CM", 82], ["Gabi Schurrer", "CB", 79],
  ["Tayfun Korkut", "CM", 79], ["Igor Gabilondo", "LW", 78], ["Oscar De Paula", "ST", 78]] },


{
  id: "celta0203_expanded",
  name: "Celta Vigo",
  league: "La Liga",
  season: "2002-03",
  color: "#87CEEB",
  rating: 82,
  players: [
  ["Alexander Mostovoi", "CAM", 87], ["Valeri Karpin", "RM", 84], ["Claude Makelele", "CDM", 86],
  ["Edu", "ST", 83], ["Gustavo Lopez", "LW", 82], ["Pablo Cavallero", "GK", 81],
  ["Juanfran", "LB", 81], ["Sergio Fernandez", "CB", 80], ["Fernando Caceres", "CB", 80],
  ["Michel Salgado", "RB", 83], ["Jesuli", "RW", 79], ["Vagner", "CM", 79],
  ["Jose Ignacio", "CM", 78], ["Catanha", "ST", 80], ["Berizzo", "CB", 80]] },


{
  id: "sampdoria9091_expanded",
  name: "Sampdoria",
  league: "Serie A",
  season: "1990-91",
  color: "#1B75BB",
  rating: 86,
  players: [
  ["Roberto Mancini", "ST", 89], ["Gianluca Vialli", "ST", 89], ["Pietro Vierchowod", "CB", 87],
  ["Attilio Lombardo", "RM", 85], ["Toninho Cerezo", "CM", 85], ["Gianluca Pagliuca", "GK", 85],
  ["Amedeo Carboni", "LB", 83], ["Moreno Mannini", "RB", 83], ["Luca Pellegrini", "CB", 82],
  ["Giuseppe Dossena", "CM", 82], ["Srecko Katanec", "CDM", 82], ["Ivano Bonetti", "CM", 80],
  ["Marco Lanna", "LB", 80], ["Victor Munoz", "CM", 80], ["Fausto Pari", "CDM", 80]] },


{
  id: "torino9293_expanded",
  name: "Torino",
  league: "Serie A",
  season: "1992-93",
  color: "#7C1C2B",
  rating: 82,
  players: [
  ["Enzo Scifo", "CAM", 86], ["Rafael Martin Vazquez", "CM", 84], ["Gianluigi Lentini", "LW", 86],
  ["Roberto Mussi", "RB", 82], ["Luca Fusi", "CDM", 82], ["Andrea Silenzi", "ST", 81],
  ["Enrico Annoni", "CB", 81], ["Pasquale Bruno", "CB", 80], ["Angelo Gregucci", "CB", 80],
  ["Raffaele Sergio", "LB", 79], ["Luca Marchegiani", "GK", 84], ["Walter Casagrande", "ST", 80],
  ["Carlos Aguilera", "RW", 80], ["Benedetti", "CM", 78], ["Poggi", "ST", 78]] },


{
  id: "bordeaux0809_expanded",
  name: "Bordeaux",
  league: "Ligue 1",
  season: "2008-09",
  color: "#001B50",
  rating: 83,
  players: [
  ["Yoann Gourcuff", "CAM", 87], ["Marouane Chamakh", "ST", 84], ["Alou Diarra", "CDM", 84],
  ["Wendel", "LM", 83], ["Fernando Menegazzo", "CM", 82], ["Souleymane Diawara", "CB", 82],
  ["Marc Planus", "CB", 81], ["Ulrich Rame", "GK", 81], ["Matthieu Chalme", "RB", 80],
  ["Benoit Tremoulinas", "LB", 80], ["Fernando Cavenaghi", "ST", 82], ["David Bellion", "RW", 79],
  ["Jaroslav Plasil", "CM", 81], ["Jussie", "CAM", 80], ["Henrique", "CB", 79]] },


{
  id: "saintetienne1314_expanded",
  name: "Saint-Etienne",
  league: "Ligue 1",
  season: "2013-14",
  color: "#00843D",
  rating: 80,
  players: [
  ["Pierre-Emerick Aubameyang", "ST", 85], ["Stephane Ruffier", "GK", 83], ["Kurt Zouma", "CB", 82],
  ["Loic Perrin", "CB", 82], ["Romain Hamouma", "RW", 81], ["Max Gradel", "LW", 81],
  ["Josuha Guilavogui", "CDM", 81], ["Fabien Lemoine", "CM", 80], ["Franck Tabanou", "LM", 80],
  ["Brandao", "ST", 79], ["Renaud Cohade", "CM", 79], ["Francois Clerc", "RB", 79],
  ["Faouzi Ghoulam", "LB", 80], ["Jeremy Clement", "CDM", 78], ["Yohan Mollo", "LW", 78]] },


{
  id: "hamburg8384_expanded",
  name: "Hamburg",
  league: "Bundesliga",
  season: "1982-83",
  color: "#003F7D",
  rating: 87,
  players: [
  ["Felix Magath", "CAM", 88], ["Horst Hrubesch", "ST", 87], ["Manfred Kaltz", "RB", 87],
  ["Uli Stein", "GK", 85], ["Ditmar Jakobs", "CB", 84], ["Holger Hieronymus", "CB", 83],
  ["Wolfgang Rolff", "CM", 83], ["Bernd Wehmeyer", "LB", 82], ["Jimmy Hartwig", "CDM", 82],
  ["Lars Bastrup", "LW", 81], ["Thomas von Heesen", "CM", 82], ["Jrgen Milewski", "RW", 80],
  ["Michael Schrder", "CB", 79], ["Wolfram Wuttke", "CAM", 80], ["Gerard Plessers", "LB", 79]] },


{
  id: "monchengladbach1516_expanded",
  name: "Monchengladbach",
  league: "Bundesliga",
  season: "2015-16",
  color: "#000000",
  rating: 82,
  players: [
  ["Granit Xhaka", "CDM", 85], ["Thorgan Hazard", "LW", 83], ["Raffael", "ST", 83],
  ["Lars Stindl", "CAM", 82], ["Yann Sommer", "GK", 84], ["Oscar Wendt", "LB", 80],
  ["Tony Jantschke", "RB", 80], ["Andreas Christensen", "CB", 82], ["Martin Stranzl", "CB", 81],
  ["Mahmoud Dahoud", "CM", 82], ["Ibrahima Traore", "RW", 80], ["Patrick Herrmann", "RM", 80],
  ["Christoph Kramer", "CM", 82], ["Josip Drmic", "ST", 79], ["Andre Hahn", "RW", 79]] },


{
  id: "hoffenheim1819_expanded",
  name: "Hoffenheim",
  league: "Bundesliga",
  season: "2018-19",
  color: "#005CA9",
  rating: 81,
  players: [
  ["Andrej Kramaric", "ST", 85], ["Kerem Demirbay", "CM", 83], ["Nico Schulz", "LB", 82],
  ["Joelinton", "ST", 81], ["Florian Grillitsch", "CDM", 82], ["Kevin Vogt", "CB", 81],
  ["Oliver Baumann", "GK", 82], ["Pavel Kaderabek", "RB", 81], ["Benjamin Hubner", "CB", 80],
  ["Nadiem Amiri", "CAM", 81], ["Leonardo Bittencourt", "LM", 80], ["Ishak Belfodil", "ST", 80],
  ["Dennis Geiger", "CM", 79], ["Reiss Nelson", "RW", 79], ["Ermin Bicakcic", "CB", 79]] },


{
  id: "palermo0506_expanded",
  name: "Palermo",
  league: "Serie A",
  season: "2005-06",
  color: "#F2A7C8",
  rating: 81,
  players: [
  ["Andrea Barzagli", "CB", 84], ["Fabio Grosso", "LB", 84], ["Simone Barone", "CM", 82],
  ["Eugenio Corini", "CM", 83], ["Amauri", "ST", 83], ["David Di Michele", "ST", 82],
  ["Cristian Zaccardo", "RB", 82], ["Mariano Gonzalez", "RW", 80], ["Franco Brienza", "CAM", 80],
  ["Aimo Diana", "RM", 80], ["Giuseppe Biava", "CB", 80], ["Federico Agliardi", "GK", 78],
  ["Mark Bresciano", "LM", 81], ["Paul Codrea", "CDM", 78], ["Mattia Cassani", "RB", 78]] }];







const BALANCED_100_EXTRA_CLUBS = [
{
  id: "tot1617_balanced",
  name: "Tottenham",
  league: "Premier League",
  season: "2016-17",
  color: "#132257",
  rating: 86,
  players: [
  ["Harry Kane", "ST", 90], ["Dele Alli", "CAM", 86], ["Christian Eriksen", "CM", 88],
  ["Heung-min Son", "LW", 86], ["Mousa Dembele", "CM", 85], ["Victor Wanyama", "CDM", 83],
  ["Kyle Walker", "RB", 85], ["Toby Alderweireld", "CB", 87], ["Jan Vertonghen", "CB", 86],
  ["Danny Rose", "LB", 84], ["Hugo Lloris", "GK", 88]] },


{
  id: "blackburn9495_balanced",
  name: "Blackburn Rovers",
  league: "Premier League",
  season: "1994-95",
  color: "#0057B8",
  rating: 84,
  players: [
  ["Alan Shearer", "ST", 91], ["Chris Sutton", "ST", 86], ["Tim Sherwood", "CM", 83],
  ["Stuart Ripley", "RM", 81], ["Jason Wilcox", "LM", 81], ["Robbie Slater", "CM", 80],
  ["Graeme Le Saux", "LB", 84], ["Colin Hendry", "CB", 85], ["Henning Berg", "CB", 83],
  ["Jeff Kenna", "RB", 80], ["Tim Flowers", "GK", 84]] },


{
  id: "chel1617_balanced",
  name: "Chelsea",
  league: "Premier League",
  season: "2016-17",
  color: "#034694",
  rating: 89,
  players: [
  ["Eden Hazard", "LW", 91], ["Diego Costa", "ST", 89], ["Pedro", "RW", 84],
  ["Cesc Fabregas", "CM", 86], ["N'Golo Kante", "CDM", 90], ["Nemanja Matic", "CDM", 85],
  ["Marcos Alonso", "LM", 84], ["Cesar Azpilicueta", "CB", 87], ["David Luiz", "CB", 85],
  ["Victor Moses", "RM", 82], ["Thibaut Courtois", "GK", 88]] },


{
  id: "manutd9899_balanced",
  name: "Manchester United",
  league: "Premier League",
  season: "1998-99",
  color: "#DA291C",
  rating: 91,
  players: [
  ["Peter Schmeichel", "GK", 91], ["Gary Neville", "RB", 85], ["Jaap Stam", "CB", 91],
  ["Ronny Johnsen", "CB", 84], ["Denis Irwin", "LB", 86], ["David Beckham", "RM", 90],
  ["Roy Keane", "CM", 91], ["Paul Scholes", "CM", 88], ["Ryan Giggs", "LM", 89],
  ["Dwight Yorke", "ST", 88], ["Andy Cole", "ST", 87]] },


{
  id: "ars1516_balanced",
  name: "Arsenal",
  league: "Premier League",
  season: "2015-16",
  color: "#EF0107",
  rating: 85,
  players: [
  ["Petr Cech", "GK", 86], ["Hector Bellerin", "RB", 82], ["Laurent Koscielny", "CB", 86],
  ["Per Mertesacker", "CB", 82], ["Nacho Monreal", "LB", 83], ["Francis Coquelin", "CDM", 81],
  ["Santi Cazorla", "CM", 86], ["Mesut Ozil", "CAM", 90], ["Alexis Sanchez", "LW", 89],
  ["Theo Walcott", "RW", 82], ["Olivier Giroud", "ST", 84]] },


{
  id: "liverpool0809_balanced",
  name: "Liverpool",
  league: "Premier League",
  season: "2008-09",
  color: "#C8102E",
  rating: 88,
  players: [
  ["Pepe Reina", "GK", 86], ["Alvaro Arbeloa", "RB", 82], ["Jamie Carragher", "CB", 86],
  ["Martin Skrtel", "CB", 83], ["Fabio Aurelio", "LB", 82], ["Javier Mascherano", "CDM", 88],
  ["Xabi Alonso", "CM", 90], ["Steven Gerrard", "CAM", 92], ["Dirk Kuyt", "RW", 84],
  ["Albert Riera", "LW", 81], ["Fernando Torres", "ST", 91]] },



{
  id: "bar0809_balanced",
  name: "Barcelona",
  league: "La Liga",
  season: "2008-09",
  color: "#A50044",
  rating: 93,
  players: [
  ["Victor Valdes", "GK", 87], ["Dani Alves", "RB", 91], ["Carles Puyol", "CB", 90],
  ["Gerard Pique", "CB", 88], ["Eric Abidal", "LB", 86], ["Sergio Busquets", "CDM", 88],
  ["Xavi", "CM", 94], ["Andres Iniesta", "CM", 93], ["Lionel Messi", "RW", 96],
  ["Samuel Eto'o", "ST", 92], ["Thierry Henry", "LW", 91]] },


{
  id: "rm1112_balanced",
  name: "Real Madrid",
  league: "La Liga",
  season: "2011-12",
  color: "#FEBE10",
  rating: 92,
  players: [
  ["Iker Casillas", "GK", 91], ["Sergio Ramos", "CB", 91], ["Pepe", "CB", 88],
  ["Marcelo", "LB", 89], ["Alvaro Arbeloa", "RB", 82], ["Xabi Alonso", "CDM", 90],
  ["Mesut Ozil", "CAM", 90], ["Angel Di Maria", "RW", 89], ["Cristiano Ronaldo", "LW", 96],
  ["Karim Benzema", "ST", 89], ["Gonzalo Higuain", "ST", 88]] },


{
  id: "atm1516_balanced",
  name: "Atletico Madrid",
  league: "La Liga",
  season: "2015-16",
  color: "#CB3524",
  rating: 88,
  players: [
  ["Jan Oblak", "GK", 89], ["Juanfran", "RB", 85], ["Diego Godin", "CB", 90],
  ["Jose Gimenez", "CB", 85], ["Filipe Luis", "LB", 86], ["Gabi", "CDM", 86],
  ["Koke", "CM", 88], ["Saul Niguez", "CM", 85], ["Yannick Carrasco", "LW", 84],
  ["Antoine Griezmann", "ST", 91], ["Fernando Torres", "ST", 82]] },


{
  id: "sev0607_balanced",
  name: "Sevilla",
  league: "La Liga",
  season: "2006-07",
  color: "#D71920",
  rating: 85,
  players: [
  ["Andres Palop", "GK", 84], ["Dani Alves", "RB", 89], ["Javi Navarro", "CB", 84],
  ["Julien Escude", "CB", 83], ["David Castedo", "LB", 80], ["Christian Poulsen", "CDM", 83],
  ["Renato", "CM", 83], ["Jesus Navas", "RW", 85], ["Adriano", "LW", 83],
  ["Frederic Kanoute", "ST", 87], ["Luis Fabiano", "ST", 86]] },


{
  id: "val9900_balanced",
  name: "Valencia",
  league: "La Liga",
  season: "1999-00",
  color: "#F18F01",
  rating: 86,
  players: [
  ["Santiago Canizares", "GK", 88], ["Jocelyn Angloma", "RB", 83], ["Mauricio Pellegrino", "CB", 84],
  ["Miroslav Djukic", "CB", 84], ["Amedeo Carboni", "LB", 84], ["David Albelda", "CDM", 85],
  ["Gaizka Mendieta", "CM", 90], ["Kily Gonzalez", "LW", 86], ["Pablo Aimar", "CAM", 88],
  ["Claudio Lopez", "ST", 87], ["John Carew", "ST", 83]] },


{
  id: "osasuna0506_balanced",
  name: "Osasuna",
  league: "La Liga",
  season: "2005-06",
  color: "#C8102E",
  rating: 79,
  players: [
  ["Ricardo Lopez", "GK", 80], ["Cesar Cruchaga", "CB", 80], ["Josetxo", "CB", 78],
  ["Enrique Corrales", "LB", 78], ["Javier Flano", "RB", 77], ["Patxi Punal", "CDM", 80],
  ["Raul Garcia", "CM", 82], ["Ludovic Delporte", "LM", 79], ["Valdo", "RM", 78],
  ["Savo Milosevic", "ST", 81], ["Pierre Webo", "ST", 79]] },


{
  id: "espanyol0607_balanced",
  name: "Espanyol",
  league: "La Liga",
  season: "2006-07",
  color: "#0070B8",
  rating: 80,
  players: [
  ["Carlos Kameni", "GK", 82], ["Pablo Zabaleta", "RB", 82], ["Daniel Jarque", "CB", 82],
  ["Albert Riera", "LM", 81], ["David Garcia", "LB", 78], ["Moises Hurtado", "CDM", 78],
  ["Ivan de la Pena", "CM", 83], ["Luis Garcia", "CAM", 82], ["Rufete", "RM", 80],
  ["Raul Tamudo", "ST", 84], ["Walter Pandiani", "ST", 80]] },



{
  id: "bay1213_balanced",
  name: "Bayern Munich",
  league: "Bundesliga",
  season: "2012-13",
  color: "#DC052D",
  rating: 93,
  players: [
  ["Manuel Neuer", "GK", 91], ["Philipp Lahm", "RB", 91], ["Jerome Boateng", "CB", 87],
  ["Dante", "CB", 86], ["David Alaba", "LB", 88], ["Bastian Schweinsteiger", "CM", 91],
  ["Javi Martinez", "CDM", 88], ["Thomas Muller", "CAM", 89], ["Arjen Robben", "RW", 90],
  ["Franck Ribery", "LW", 92], ["Mario Mandzukic", "ST", 88]] },


{
  id: "bvb1011_balanced",
  name: "Borussia Dortmund",
  league: "Bundesliga",
  season: "2010-11",
  color: "#FDE100",
  rating: 86,
  players: [
  ["Roman Weidenfeller", "GK", 84], ["Lukasz Piszczek", "RB", 84], ["Mats Hummels", "CB", 88],
  ["Neven Subotic", "CB", 85], ["Marcel Schmelzer", "LB", 82], ["Sven Bender", "CDM", 84],
  ["Nuri Sahin", "CM", 87], ["Mario Gotze", "CAM", 86], ["Jakub Blaszczykowski", "RW", 84],
  ["Kevin Grosskreutz", "LW", 81], ["Lucas Barrios", "ST", 85]] },


{
  id: "kaiserslautern9798_balanced",
  name: "Kaiserslautern",
  league: "Bundesliga",
  season: "1997-98",
  color: "#D5001C",
  rating: 82,
  players: [
  ["Andreas Reinke", "GK", 81], ["Michael Schjonberg", "CB", 82], ["Harry Koch", "CB", 81],
  ["Martin Wagner", "LB", 80], ["Marco Reich", "RM", 79], ["Ciriaco Sforza", "CM", 86],
  ["Andreas Buck", "CM", 80], ["Olaf Marschall", "ST", 85], ["Ratinho", "CAM", 80],
  ["Pavel Kuka", "ST", 82], ["Michael Ballack", "CM", 81]] },


{
  id: "frankfurt1819_balanced",
  name: "Eintracht Frankfurt",
  league: "Bundesliga",
  season: "2018-19",
  color: "#E1000F",
  rating: 83,
  players: [
  ["Kevin Trapp", "GK", 83], ["Danny da Costa", "RM", 81], ["Martin Hinteregger", "CB", 82],
  ["Makoto Hasebe", "CB", 82], ["Filip Kostic", "LM", 85], ["Sebastian Rode", "CM", 81],
  ["Gelson Fernandes", "CDM", 79], ["Mijat Gacinovic", "CAM", 80], ["Ante Rebic", "LW", 84],
  ["Luka Jovic", "ST", 86], ["Sebastien Haller", "ST", 85]] },


{
  id: "hertha1819_balanced",
  name: "Hertha Berlin",
  league: "Bundesliga",
  season: "2018-19",
  color: "#004D9E",
  rating: 78,
  players: [
  ["Rune Jarstein", "GK", 80], ["Valentino Lazaro", "RM", 81], ["Niklas Stark", "CB", 81],
  ["Karim Rekik", "CB", 79], ["Marvin Plattenhardt", "LB", 80], ["Marko Grujic", "CM", 80],
  ["Arne Maier", "CM", 78], ["Ondrej Duda", "CAM", 81], ["Salomon Kalou", "LW", 80],
  ["Javairo Dilrosun", "RW", 78], ["Vedad Ibisevic", "ST", 81]] },



{
  id: "inter9798_balanced",
  name: "Inter Milan",
  league: "Serie A",
  season: "1997-98",
  color: "#010E80",
  rating: 89,
  players: [
  ["Gianluca Pagliuca", "GK", 88], ["Javier Zanetti", "RB", 89], ["Giuseppe Bergomi", "CB", 87],
  ["Taribo West", "CB", 83], ["Francesco Moriero", "RM", 84], ["Diego Simeone", "CM", 87],
  ["Aron Winter", "CM", 84], ["Youri Djorkaeff", "CAM", 88], ["Alvaro Recoba", "LW", 84],
  ["Ivan Zamorano", "ST", 86], ["Ronaldo Nazario", "ST", 96]] },


{
  id: "juv9596_balanced",
  name: "Juventus",
  league: "Serie A",
  season: "1995-96",
  color: "#111111",
  rating: 91,
  players: [
  ["Angelo Peruzzi", "GK", 89], ["Ciro Ferrara", "CB", 89], ["Pietro Vierchowod", "CB", 86],
  ["Gianluca Pessotto", "LB", 84], ["Antonio Conte", "CM", 86], ["Didier Deschamps", "CDM", 88],
  ["Paulo Sousa", "CM", 87], ["Fabrizio Ravanelli", "ST", 88], ["Gianluca Vialli", "ST", 90],
  ["Alessandro Del Piero", "LW", 91], ["Michele Padovano", "ST", 83]] },


{
  id: "roma1617_balanced",
  name: "Roma",
  league: "Serie A",
  season: "2016-17",
  color: "#8E1F2F",
  rating: 86,
  players: [
  ["Wojciech Szczesny", "GK", 84], ["Antonio Rudiger", "CB", 84], ["Federico Fazio", "CB", 83],
  ["Kostas Manolas", "CB", 86], ["Emerson Palmieri", "LB", 82], ["Daniele De Rossi", "CDM", 86],
  ["Kevin Strootman", "CM", 85], ["Radja Nainggolan", "CAM", 88], ["Mohamed Salah", "RW", 87],
  ["Stephan El Shaarawy", "LW", 82], ["Edin Dzeko", "ST", 88]] },


{
  id: "udinese1011_balanced",
  name: "Udinese",
  league: "Serie A",
  season: "2010-11",
  color: "#111111",
  rating: 83,
  players: [
  ["Samir Handanovic", "GK", 86], ["Medhi Benatia", "CB", 84], ["Cristian Zapata", "CB", 82],
  ["Mauricio Isla", "RM", 82], ["Kwadwo Asamoah", "CM", 83], ["Gokhan Inler", "CM", 84],
  ["Pablo Armero", "LM", 82], ["Alexis Sanchez", "RW", 88], ["Antonio Di Natale", "ST", 90],
  ["German Denis", "ST", 80], ["Giampiero Pinzi", "CM", 80]] },


{
  id: "cagliari1819_balanced",
  name: "Cagliari",
  league: "Serie A",
  season: "2018-19",
  color: "#A10E2F",
  rating: 78,
  players: [
  ["Alessio Cragno", "GK", 81], ["Darijo Srna", "RB", 80], ["Fabio Pisacane", "CB", 78],
  ["Luca Ceppitelli", "CB", 79], ["Charalampos Lykogiannis", "LB", 77], ["Luca Cigarini", "CDM", 80],
  ["Nicolo Barella", "CM", 84], ["Artur Ionita", "CM", 78], ["Joao Pedro", "CAM", 82],
  ["Leonardo Pavoletti", "ST", 81], ["Diego Farias", "LW", 78]] },



{
  id: "psg1920_balanced",
  name: "Paris Saint-Germain",
  league: "Ligue 1",
  season: "2019-20",
  color: "#004170",
  rating: 91,
  players: [
  ["Keylor Navas", "GK", 88], ["Thomas Meunier", "RB", 83], ["Marquinhos", "CB", 89],
  ["Thiago Silva", "CB", 88], ["Juan Bernat", "LB", 84], ["Idrissa Gueye", "CDM", 84],
  ["Marco Verratti", "CM", 88], ["Angel Di Maria", "RW", 88], ["Neymar", "LW", 94],
  ["Kylian Mbappe", "ST", 94], ["Mauro Icardi", "ST", 86]] },


{
  id: "mon0304_balanced",
  name: "Monaco",
  league: "Ligue 1",
  season: "2003-04",
  color: "#E51B23",
  rating: 86,
  players: [
  ["Flavio Roma", "GK", 83], ["Patrice Evra", "LB", 85], ["Sebastien Squillaci", "CB", 84],
  ["Gael Givet", "CB", 82], ["Hugo Ibarra", "RB", 82], ["Lucas Bernardi", "CDM", 83],
  ["Ludovic Giuly", "RW", 88], ["Jerome Rothen", "LM", 86], ["Dado Prso", "ST", 85],
  ["Fernando Morientes", "ST", 88], ["Emmanuel Adebayor", "ST", 80]] },


{
  id: "lyon0708_balanced",
  name: "Lyon",
  league: "Ligue 1",
  season: "2007-08",
  color: "#0055A4",
  rating: 88,
  players: [
  ["Hugo Lloris", "GK", 86], ["Anthony Reveillere", "RB", 83], ["Cris", "CB", 86],
  ["Sebastien Squillaci", "CB", 84], ["Fabio Grosso", "LB", 84], ["Jeremy Toulalan", "CDM", 86],
  ["Kim Kallstrom", "CM", 84], ["Juninho Pernambucano", "CAM", 90], ["Sidney Govou", "RW", 84],
  ["Hatem Ben Arfa", "LW", 84], ["Karim Benzema", "ST", 90]] },


{
  id: "lille1011_balanced",
  name: "Lille",
  league: "Ligue 1",
  season: "2010-11",
  color: "#E01E13",
  rating: 84,
  players: [
  ["Mickael Landreau", "GK", 82], ["Mathieu Debuchy", "RB", 83], ["Adil Rami", "CB", 84],
  ["Aurelien Chedjou", "CB", 82], ["Franck Beria", "LB", 80], ["Rio Mavuba", "CDM", 83],
  ["Yohan Cabaye", "CM", 85], ["Florent Balmont", "CM", 82], ["Gervinho", "RW", 85],
  ["Eden Hazard", "LW", 88], ["Moussa Sow", "ST", 85]] },


{
  id: "nantes9495_balanced",
  name: "Nantes",
  league: "Ligue 1",
  season: "1994-95",
  color: "#FFDD00",
  rating: 84,
  players: [
  ["Dominique Casagrande", "GK", 81], ["Christian Karembeu", "CM", 86], ["Marcel Desailly", "CB", 88],
  ["Nicolas Oudec", "ST", 84], ["Japhet N'Doram", "CAM", 86], ["Claude Makelele", "CDM", 84],
  ["Reynald Pedros", "LW", 84], ["Patrice Loko", "ST", 85], ["Jean-Michel Ferri", "CM", 82],
  ["Serge Le Dizet", "RB", 80], ["Bruno Carotti", "LB", 79]] },


{
  id: "auxerre9596_balanced",
  name: "Auxerre",
  league: "Ligue 1",
  season: "1995-96",
  color: "#0050A4",
  rating: 83,
  players: [
  ["Lionel Charbonnier", "GK", 81], ["Laurent Blanc", "CB", 88], ["Frank Verlaat", "CB", 82],
  ["Taribo West", "LB", 82], ["Sabri Lamouchi", "CM", 84], ["Corentin Martins", "CAM", 84],
  ["Lilian Laslandes", "ST", 83], ["Bernard Diomede", "LW", 82], ["Moussa Saib", "CDM", 83],
  ["Philippe Violeau", "CM", 80], ["Stephane Mah", "RB", 79]] },


{
  id: "guingamp1819_balanced",
  name: "Guingamp",
  league: "Ligue 1",
  season: "2018-19",
  color: "#E30613",
  rating: 76,
  players: [
  ["Karl-Johan Johnsson", "GK", 78], ["Felix Eboa Eboa", "CB", 77], ["Christophe Kerbrat", "CB", 76],
  ["Pedro Rebocho", "LB", 78], ["Jordan Ikoko", "RB", 76], ["Etienne Didot", "CM", 77],
  ["Lebogang Phiri", "CDM", 76], ["Marcus Thuram", "LW", 81], ["Nolan Roux", "ST", 77],
  ["Nicolas Benezet", "RW", 78], ["Yeni Ngbakoto", "CAM", 77]] },


{
  id: "strasbourg1819_balanced",
  name: "Strasbourg",
  league: "Ligue 1",
  season: "2018-19",
  color: "#009FE3",
  rating: 78,
  players: [
  ["Matz Sels", "GK", 80], ["Kenny Lala", "RB", 82], ["Pablo Martinez", "CB", 78],
  ["Lamine Kone", "CB", 79], ["Lionel Carole", "LB", 77], ["Jonas Martin", "CM", 80],
  ["Ibrahima Sissoko", "CDM", 78], ["Adrien Thomasson", "CAM", 79], ["Dimitri Lienard", "LM", 79],
  ["Nuno Da Costa", "ST", 78], ["Ludovic Ajorque", "ST", 79]] }];




const BALANCED_BIG_FIVE_LEAGUES = ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"];



// ─── DATABASE QUALITY PATCH v5.0 ─────────────────────────────────────────────
// Goals: stronger club variety, fewer repeated players, better historic appeal,
// less filler, and cleaner rating balance without touching gameplay logic.

const DATABASE_PATCH_CLUBS = [
{
  id: "blackburn9495_patch",
  name: "Blackburn Rovers",
  league: "Premier League",
  season: "1994-95",
  color: "#0057B8",
  rating: 84,
  players: [
  ["Alan Shearer", "ST", 91], ["Chris Sutton", "ST", 86], ["Tim Sherwood", "CM", 84],
  ["Graeme Le Saux", "LB", 84], ["Colin Hendry", "CB", 84], ["Tim Flowers", "GK", 83],
  ["Stuart Ripley", "RW", 82], ["Jason Wilcox", "LW", 82], ["Henning Berg", "RB", 82],
  ["David Batty", "CDM", 82], ["Mike Newell", "ST", 80], ["Ian Pearce", "CB", 79]] },


{
  id: "newcastle9596_patch",
  name: "Newcastle United",
  league: "Premier League",
  season: "1995-96",
  color: "#241F20",
  rating: 85,
  players: [
  ["Les Ferdinand", "ST", 88], ["David Ginola", "LW", 87], ["Peter Beardsley", "CAM", 86],
  ["Faustino Asprilla", "ST", 85], ["Rob Lee", "CM", 84], ["Darren Peacock", "CB", 82],
  ["Philippe Albert", "CB", 82], ["Warren Barton", "RB", 81], ["John Beresford", "LB", 80],
  ["Pavel Srnicek", "GK", 80], ["Keith Gillespie", "RW", 80], ["Steve Watson", "CM", 79]] },


{
  id: "depor0304_patch",
  name: "Deportivo La Coruna",
  league: "La Liga",
  season: "2003-04",
  color: "#005BBB",
  rating: 85,
  players: [
  ["Walter Pandiani", "ST", 84], ["Juan Carlos Valeron", "CAM", 88], ["Albert Luque", "LW", 85],
  ["Sergio Gonzalez", "CM", 84], ["Mauro Silva", "CDM", 86], ["Fran Gonzalez", "LW", 84],
  ["Manuel Pablo", "RB", 83], ["Joan Capdevila", "LB", 83], ["Jorge Andrade", "CB", 84],
  ["Cesar Martin", "CB", 81], ["Jose Molina", "GK", 82], ["Victor Sanchez", "RW", 82]] },


{
  id: "villarreal0506_patch",
  name: "Villarreal",
  league: "La Liga",
  season: "2005-06",
  color: "#FFE667",
  rating: 85,
  players: [
  ["Juan Roman Riquelme", "CAM", 91], ["Diego Forlan", "ST", 88], ["Marcos Senna", "CDM", 87],
  ["Juan Pablo Sorin", "LB", 85], ["Santi Cazorla", "LW", 82], ["Jose Mari", "ST", 81],
  ["Juan Manuel Pena", "CB", 82], ["Gonzalo Rodriguez", "CB", 83], ["Javi Venta", "RB", 81],
  ["Mariano Barbosa", "GK", 80], ["Josico", "CM", 80], ["Roger Garcia", "CM", 80]] },


{
  id: "kaiserslautern9798_patch",
  name: "Kaiserslautern",
  league: "Bundesliga",
  season: "1997-98",
  color: "#E30613",
  rating: 82,
  players: [
  ["Olaf Marschall", "ST", 86], ["Ciriaco Sforza", "CM", 85], ["Andreas Brehme", "LB", 85],
  ["Michael Ballack", "CM", 82], ["Martin Wagner", "LW", 81], ["Harry Koch", "CB", 81],
  ["Miroslav Kadlec", "CB", 82], ["Ratinho", "RB", 80], ["Pavel Kuka", "ST", 80],
  ["Andreas Reinke", "GK", 81], ["Marco Reich", "RW", 79], ["Thomas Riedl", "CDM", 79]] },


{
  id: "bordeaux0809_patch",
  name: "Bordeaux",
  league: "Ligue 1",
  season: "2008-09",
  color: "#001B50",
  rating: 83,
  players: [
  ["Yoann Gourcuff", "CAM", 87], ["Marouane Chamakh", "ST", 84], ["Alou Diarra", "CDM", 84],
  ["Wendel", "LW", 83], ["Fernando Menegazzo", "CM", 82], ["Jaroslav Plasil", "CM", 82],
  ["Mathieu Chalme", "RB", 80], ["Marc Planus", "CB", 81], ["Souleymane Diawara", "CB", 82],
  ["Benoit Tremoulinas", "LB", 81], ["Ulrich Rame", "GK", 80], ["Fernando Cavenaghi", "ST", 81]] },


{
  id: "sampdoria9091_patch",
  name: "Sampdoria",
  league: "Serie A",
  season: "1990-91",
  color: "#1E5AA8",
  rating: 86,
  players: [
  ["Gianluca Vialli", "ST", 91], ["Roberto Mancini", "CAM", 90], ["Attilio Lombardo", "RW", 84],
  ["Toninho Cerezo", "CM", 85], ["Giuseppe Dossena", "CM", 83], ["Moreno Mannini", "RB", 83],
  ["Luca Pellegrini", "CB", 84], ["Pietro Vierchowod", "CB", 87], ["Giovanni Invernizzi", "CDM", 81],
  ["Gianluca Pagliuca", "GK", 86], ["Marco Lanna", "LB", 82], ["Ivano Bonetti", "CM", 80]] },


{
  id: "psg1920_patch",
  name: "Paris Saint-Germain",
  league: "Ligue 1",
  season: "2019-20",
  color: "#004170",
  rating: 91,
  players: [
  ["Neymar", "LW", 94], ["Kylian Mbappe", "ST", 93], ["Mauro Icardi", "ST", 86],
  ["Marco Verratti", "CM", 89], ["Idrissa Gueye", "CDM", 85], ["Leandro Paredes", "CM", 84],
  ["Presnel Kimpembe", "CB", 85], ["Marquinhos", "CB", 89], ["Juan Bernat", "LB", 84],
  ["Thomas Meunier", "RB", 83], ["Sergio Rico", "GK", 81], ["Pablo Sarabia", "RW", 83]] },


{
  id: "galacticos0102_patch",
  name: "Real Madrid",
  league: "La Liga",
  season: "2001-02",
  color: "#FEBE10",
  rating: 93,
  jackpot: true,
  players: [
  ["Zinedine Zidane", "CAM", 96], ["Raul", "ST", 92], ["Luis Figo", "RW", 94],
  ["Fernando Hierro", "CB", 89], ["Roberto Carlos", "LB", 93], ["Iker Casillas", "GK", 88],
  ["Fernando Morientes", "ST", 87], ["Claude Makelele", "CDM", 90], ["Michel Salgado", "RB", 86],
  ["Ivan Helguera", "CB", 86], ["Santiago Solari", "LW", 84], ["Guti", "CM", 84]] },


{
  id: "bayern1213_jackpot_patch",
  name: "Bayern Munich",
  league: "Bundesliga",
  season: "2012-13",
  color: "#DC052D",
  rating: 93,
  jackpot: true,
  players: [
  ["Franck Ribery", "LW", 92], ["Mario Mandzukic", "ST", 88], ["Bastian Schweinsteiger", "CM", 91],
  ["Javi Martinez", "CDM", 89], ["Philipp Lahm", "RB", 92], ["Dante", "CB", 88],
  ["Holger Badstuber", "CB", 84], ["Toni Kroos", "CM", 88], ["Thomas Muller", "CAM", 89],
  ["Manuel Neuer", "GK", 91], ["David Alaba", "LB", 88], ["Claudio Pizarro", "ST", 83]] },


{
  id: "manutd9899_jackpot_patch",
  name: "Manchester United",
  league: "Premier League",
  season: "1998-99",
  color: "#DA291C",
  rating: 92,
  jackpot: true,
  players: [
  ["Dwight Yorke", "ST", 89], ["Andy Cole", "ST", 88], ["David Beckham", "RM", 92],
  ["Roy Keane", "CM", 92], ["Ryan Giggs", "LM", 90], ["Jaap Stam", "CB", 91],
  ["Peter Schmeichel", "GK", 91], ["Gary Neville", "RB", 86], ["Denis Irwin", "LB", 87],
  ["Ronny Johnsen", "CB", 84], ["Nicky Butt", "CDM", 84], ["Ole Gunnar Solskjaer", "ST", 85]] },


{
  id: "chelsea1617_patch",
  name: "Chelsea",
  league: "Premier League",
  season: "2016-17",
  color: "#034694",
  rating: 90,
  players: [
  ["Eden Hazard", "LW", 92], ["Diego Costa", "ST", 89], ["N'Golo Kante", "CDM", 91],
  ["Cesc Fabregas", "CM", 86], ["Cesar Azpilicueta", "CB", 87], ["Gary Cahill", "CB", 85],
  ["David Luiz", "CB", 85], ["Victor Moses", "RM", 82], ["Marcos Alonso", "LM", 84],
  ["Thibaut Courtois", "GK", 88], ["Pedro", "RW", 84], ["Nemanja Matic", "CDM", 86]] }];




const DATABASE_REMOVE_CLUB_IDS = new Set([
"toulouse2223_extra",
"mainz2223_extra",
"nice2223_extra",
"rennes2022_small",
"sassuolo2021_small",
"union2223_small",
"brentford2223_small",
"bar0809_balanced",
"rm1112_balanced",
"psg1920_balanced",
"bay1213_balanced",
"manutd9899_balanced",
"sampdoria9091_expanded"]);


const DATABASE_RATING_OVERRIDES = {
  lyon0506: 86,
  mon1617: 86,
  leicester1516_jackpot: 84,
  atm1314: 89,
  porto1011_expanded: 88,
  val0304: 89,
  milan8889_jackpot: 95 };


const DATABASE_KEEP_PLAYER_AT = {
  "Cristiano Ronaldo": "mun0708",
  "Karim Benzema": "rm1617",
  "Wesley Sneijder": "inter0910",
  "Angel Di Maria": "psg1516",
  "David Silva": "mci1112_balanced",
  "Arjen Robben": "bayern1213_jackpot_patch",
  "Carlos Tevez": "mun0708",
  "Patrice Evra": "mun0708",
  "Kylian Mbappe": "psg1920_patch",
  "Joao Moutinho": "porto1011_expanded",
  "Manuel Neuer": "bayern1213_jackpot_patch",
  "N'Golo Kante": "chelsea1617_patch",
  "Roberto Carlos": "galacticos0102_patch",
  "Zinedine Zidane": "galacticos0102_patch",
  "Luis Figo": "galacticos0102_patch",
  "Ronaldo Nazario": "inter9798_balanced",
  "Eden Hazard": "chelsea1617_patch",
  "David Beckham": "manutd9899_jackpot_patch",
  "Peter Schmeichel": "manutd9899_jackpot_patch",
  "Gianluca Vialli": "sampdoria9091_patch",
  "Roberto Mancini": "sampdoria9091_patch" };


const DATABASE_CLUB_PRIORITY = {
  galacticos0102_patch: 1000,
  bar1011: 990,
  bayern1213_jackpot_patch: 980,
  manutd9899_jackpot_patch: 970,
  milan8889_jackpot: 960,
  ajax9495_jackpot: 950,
  mun0708: 940,
  rm1617: 930,
  inter0910: 925,
  chelsea1617_patch: 920,
  ars0304: 915,
  liv1920: 910,
  psg1920_patch: 905,
  porto1011_expanded: 900,
  sampdoria9091_patch: 890,
  villarreal0506_patch: 880,
  depor0304_patch: 870,
  blackburn9495_patch: 860,
  newcastle9596_patch: 850,
  kaiserslautern9798_patch: 840,
  bordeaux0809_patch: 830 };


function normalizeDatabasePlayerName(name) {
  return String(name || "").
  normalize("NFD").
  replace(/[\u0300-\u036f]/g, "").
  replace(/[’']/g, "").
  replace(/\s+/g, " ").
  trim().
  toLowerCase();
}

function clubDatabasePriority(club) {
  return DATABASE_CLUB_PRIORITY[club.id] || (club.jackpot ? 700 : 100) + (club.rating || 0);
}

function buildQualityClubPool(rawClubs) {
  const cleaned = rawClubs.
  filter(club => club && !DATABASE_REMOVE_CLUB_IDS.has(club.id)).
  map(club => ({
    ...club,
    rating: DATABASE_RATING_OVERRIDES[club.id] || club.rating,
    players: Array.isArray(club.players) ? club.players.slice(0, 15) : [] })).

  filter(club => club.players.length >= 11);

  const ordered = cleaned.slice().sort((a, b) => clubDatabasePriority(b) - clubDatabasePriority(a));
  const usedPlayers = new Set();
  const deduped = [];

  ordered.forEach(club => {
    const keptPlayers = [];

    club.players.forEach(player => {
      const [name] = player;
      const forcedClubId = DATABASE_KEEP_PLAYER_AT[name];
      if (forcedClubId && forcedClubId !== club.id) return;

      const key = normalizeDatabasePlayerName(name);
      if (!key || usedPlayers.has(key)) return;

      usedPlayers.add(key);
      keptPlayers.push(player);
    });

    if (keptPlayers.length >= 11) {
      deduped.push({ ...club, players: keptPlayers.slice(0, 15) });
    }
  });

  return deduped.sort((a, b) => {
    const leagueCompare = String(a.league).localeCompare(String(b.league));
    if (leagueCompare) return leagueCompare;
    return String(a.name).localeCompare(String(b.name));
  });
}

const STANDARD_CLUB_POOL = buildQualityClubPool([...CLUBS, ...JACKPOT_CLUBS, ...SMALLER_CLUBS, ...EXTRA_TOP5_CLUBS, ...EXPANDED_DRAFT_CLUBS, ...BALANCED_100_EXTRA_CLUBS, ...DATABASE_PATCH_CLUBS]);

const ERA_BALANCE_META_BY_ID = {
  psg1516: { season: "All-Era Spotlight", rating: 93 },
  newcastle2223_expanded: { season: "All-Era Spotlight", rating: 88 },
  astonvilla2324_expanded: { season: "All-Era Spotlight", rating: 87 },
  everton0405_extra: { season: "All-Era Spotlight", rating: 86 },
  westham1516_extra: { season: "All-Era Spotlight", rating: 86 },
  leeds0001_extra: { season: "All-Era Spotlight", rating: 86 },
  benfica1314_expanded: { season: "All-Era Spotlight", rating: 89 },
  sporting2021_expanded: { season: "All-Era Spotlight", rating: 89 },
  ajax1819_expanded: { season: "All-Era Spotlight", rating: 92 },
  psv1718_expanded: { season: "All-Era Spotlight", rating: 89 },
  galatasaray9900_expanded: { season: "All-Era Spotlight", rating: 87 },
  fenerbahce0708_expanded: { season: "All-Era Spotlight", rating: 87 },
  celtic2223_expanded: { season: "All-Era Spotlight", rating: 86 },
  rangers0708_expanded: { season: "All-Era Spotlight", rating: 86 } };


STANDARD_CLUB_POOL.forEach(club => {
  const meta = ERA_BALANCE_META_BY_ID[club.id];
  if (!meta) return;
  club.season = meta.season;
  club.rating = meta.rating;
});
const ALL_CLUBS = STANDARD_CLUB_POOL;
const WORLD_CUP_CLUBS = [
{ id: "wc2026_mex", name: "Mexico", league: "Group A", season: "World Cup 2026", color: "#0f7f56", rating: 86, worldCup: true, players: [["Guillermo Ochoa", "GK", 82], ["Jorge Sanchez", "RB", 80], ["Cesar Montes", "CB", 82], ["Johan Vasquez", "CB", 82], ["Jesus Gallardo", "LB", 80], ["Edson Alvarez", "CDM", 86], ["Luis Chavez", "CM", 82], ["Orbelin Pineda", "CAM", 81], ["Hirving Lozano", "RW", 84], ["Alexis Vega", "LW", 81], ["Santiago Gimenez", "ST", 84], ["Raul Jimenez", "ST", 82], ["Uriel Antuna", "RW", 79], ["Erick Sanchez", "CM", 80], ["Luis Malagon", "GK", 79]] },
{ id: "wc2026_rsa", name: "South Africa", league: "Group A", season: "World Cup 2026", color: "#0f7f56", rating: 78, worldCup: true, players: [["Ronwen Williams", "GK", 81], ["Khuliso Mudau", "RB", 78], ["Mothobi Mvala", "CB", 77], ["Siyanda Xulu", "CB", 76], ["Aubrey Modiba", "LB", 77], ["Teboho Mokoena", "CM", 82], ["Sphephelo Sithole", "CDM", 76], ["Themba Zwane", "CAM", 80], ["Percy Tau", "RW", 81], ["Lyle Foster", "ST", 80], ["Evidence Makgopa", "ST", 77], ["Thapelo Morena", "RM", 76], ["Mihlali Mayambela", "LW", 76], ["Grant Kekana", "CB", 76], ["Nkosinathi Sibisi", "CB", 75]] },
{ id: "wc2026_kor", name: "South Korea", league: "Group A", season: "World Cup 2026", color: "#0f7f56", rating: 85, worldCup: true, players: [["Kim Seung-gyu", "GK", 80], ["Kim Moon-hwan", "RB", 78], ["Kim Min-jae", "CB", 89], ["Kim Young-gwon", "CB", 80], ["Lee Ki-je", "LB", 77], ["Hwang In-beom", "CM", 82], ["Park Yong-woo", "CDM", 78], ["Lee Kang-in", "CAM", 85], ["Son Heung-min", "LW", 89], ["Hwang Hee-chan", "RW", 84], ["Cho Gue-sung", "ST", 80], ["Oh Hyeon-gyu", "ST", 78], ["Jeong Woo-yeong", "CAM", 78], ["Seol Young-woo", "RB", 78], ["Hong Hyun-seok", "CM", 78]] },
{ id: "wc2026_cze", name: "Czechia", league: "Group A", season: "World Cup 2026", color: "#0f7f56", rating: 83, worldCup: true, players: [["Jindrich Stanek", "GK", 79], ["Vladimir Coufal", "RB", 81], ["Tomas Holes", "CB", 80], ["David Zima", "CB", 78], ["David Jurasek", "LB", 79], ["Tomas Soucek", "CDM", 84], ["Antonin Barak", "CM", 81], ["Alex Kral", "CM", 79], ["Vaclav Cerny", "RW", 80], ["Adam Hlozek", "LW", 81], ["Patrik Schick", "ST", 86], ["Jan Kuchta", "ST", 79], ["Lukas Provod", "LM", 79], ["Ladislav Krejci", "CB", 81], ["Matej Kovar", "GK", 78]] },
{ id: "wc2026_can", name: "Canada", league: "Group B", season: "World Cup 2026", color: "#2374ab", rating: 84, worldCup: true, players: [["Milan Borjan", "GK", 78], ["Alistair Johnston", "RB", 80], ["Moise Bombito", "CB", 78], ["Kamal Miller", "CB", 78], ["Alphonso Davies", "LB", 88], ["Stephen Eustaquio", "CM", 82], ["Ismael Kone", "CM", 80], ["Jonathan Osorio", "CAM", 78], ["Tajon Buchanan", "RW", 82], ["Jonathan David", "ST", 86], ["Cyle Larin", "ST", 81], ["Jacob Shaffelburg", "LW", 78], ["Liam Millar", "LW", 78], ["Richie Laryea", "RB", 78], ["Maxime Crepeau", "GK", 78]] },
{ id: "wc2026_bih", name: "Bosnia and Herzegovina", league: "Group B", season: "World Cup 2026", color: "#2374ab", rating: 81, worldCup: true, players: [["Ibrahim Sehic", "GK", 78], ["Amar Dedic", "RB", 81], ["Anel Ahmedhodzic", "CB", 82], ["Dennis Hadzikadunic", "CB", 78], ["Sead Kolasinac", "LB", 81], ["Rade Krunic", "CM", 81], ["Benjamin Tahirovic", "CDM", 78], ["Miralem Pjanic", "CM", 82], ["Haris Hajradinovic", "CAM", 78], ["Edin Dzeko", "ST", 84], ["Ermedin Demirovic", "ST", 83], ["Said Hamulic", "ST", 76], ["Amir Hadziahmetovic", "CDM", 79], ["Smail Prevljak", "ST", 76], ["Nikola Vasilj", "GK", 76]] },
{ id: "wc2026_qat", name: "Qatar", league: "Group B", season: "World Cup 2026", color: "#2374ab", rating: 78, worldCup: true, players: [["Meshaal Barsham", "GK", 78], ["Pedro Miguel", "RB", 77], ["Boualem Khoukhi", "CB", 78], ["Tarek Salman", "CB", 76], ["Abdelkarim Hassan", "LB", 78], ["Karim Boudiaf", "CDM", 77], ["Assim Madibo", "CM", 76], ["Akram Afif", "LW", 83], ["Hassan Al-Haydos", "RW", 78], ["Almoez Ali", "ST", 80], ["Mohammed Muntari", "ST", 76], ["Homam Ahmed", "LB", 76], ["Ismail Mohamad", "RM", 76], ["Bassam Al-Rawi", "CB", 77], ["Yusuf Abdurisag", "LW", 75]] },
{ id: "wc2026_sui", name: "Switzerland", league: "Group B", season: "World Cup 2026", color: "#2374ab", rating: 86, worldCup: true, players: [["Yann Sommer", "GK", 86], ["Silvan Widmer", "RB", 80], ["Manuel Akanji", "CB", 86], ["Nico Elvedi", "CB", 82], ["Ricardo Rodriguez", "LB", 80], ["Granit Xhaka", "CDM", 88], ["Remo Freuler", "CM", 82], ["Denis Zakaria", "CM", 82], ["Xherdan Shaqiri", "RW", 82], ["Ruben Vargas", "LW", 81], ["Breel Embolo", "ST", 82], ["Zeki Amdouni", "ST", 80], ["Noah Okafor", "LW", 81], ["Fabian Schar", "CB", 82], ["Gregor Kobel", "GK", 87]] },
{ id: "wc2026_bra", name: "Brazil", league: "Group C", season: "World Cup 2026", color: "#9b2226", rating: 91, worldCup: true, players: [["Alisson", "GK", 90], ["Danilo", "RB", 83], ["Marquinhos", "CB", 88], ["Gabriel Magalhaes", "CB", 86], ["Renan Lodi", "LB", 82], ["Casemiro", "CDM", 86], ["Bruno Guimaraes", "CM", 86], ["Lucas Paqueta", "CAM", 85], ["Vinicius Junior", "LW", 92], ["Rodrygo", "RW", 88], ["Endrick", "ST", 84], ["Richarlison", "ST", 83], ["Raphinha", "RW", 85], ["Eder Militao", "CB", 86], ["Ederson", "GK", 89]] },
{ id: "wc2026_mar", name: "Morocco", league: "Group C", season: "World Cup 2026", color: "#9b2226", rating: 86, worldCup: true, players: [["Yassine Bounou", "GK", 86], ["Achraf Hakimi", "RB", 88], ["Nayef Aguerd", "CB", 82], ["Romain Saiss", "CB", 80], ["Noussair Mazraoui", "LB", 84], ["Sofyan Amrabat", "CDM", 82], ["Azzedine Ounahi", "CM", 82], ["Hakim Ziyech", "RW", 84], ["Brahim Diaz", "CAM", 85], ["Sofiane Boufal", "LW", 81], ["Youssef En-Nesyri", "ST", 82], ["Amine Adli", "LW", 81], ["Amir Richardson", "CM", 78], ["Chadi Riad", "CB", 78], ["Munir Mohamedi", "GK", 77]] },
{ id: "wc2026_hti", name: "Haiti", league: "Group C", season: "World Cup 2026", color: "#9b2226", rating: 75, worldCup: true, players: [["Johny Placide", "GK", 75], ["Carlens Arcus", "RB", 76], ["Ricardo Ade", "CB", 75], ["Mechack Jerome", "CB", 73], ["Alex Christian", "LB", 74], ["Bryan Alceus", "CDM", 74], ["Danley Jean Jacques", "CM", 76], ["Derrick Etienne", "LW", 76], ["Fafa Picault", "RW", 77], ["Duckens Nazon", "ST", 78], ["Frantzdy Pierrot", "ST", 77], ["Carnejy Antoine", "ST", 74], ["Leverton Pierre", "CM", 73], ["Steeven Saba", "CAM", 74], ["Garissone Innocent", "GK", 73]] },
{ id: "wc2026_sco", name: "Scotland", league: "Group C", season: "World Cup 2026", color: "#9b2226", rating: 84, worldCup: true, players: [["Angus Gunn", "GK", 80], ["Aaron Hickey", "RB", 81], ["Scott McKenna", "CB", 79], ["Kieran Tierney", "CB", 84], ["Andrew Robertson", "LB", 87], ["Scott McTominay", "CM", 84], ["Billy Gilmour", "CM", 81], ["John McGinn", "CAM", 84], ["Ryan Christie", "RW", 80], ["Ryan Fraser", "LW", 78], ["Che Adams", "ST", 80], ["Lyndon Dykes", "ST", 78], ["Lewis Ferguson", "CM", 82], ["Jack Hendry", "CB", 78], ["Craig Gordon", "GK", 78]] },
{ id: "wc2026_usa", name: "United States", league: "Group D", season: "World Cup 2026", color: "#ee9b00", rating: 86, worldCup: true, players: [["Matt Turner", "GK", 81], ["Sergino Dest", "RB", 82], ["Chris Richards", "CB", 80], ["Tim Ream", "CB", 80], ["Antonee Robinson", "LB", 84], ["Tyler Adams", "CDM", 83], ["Weston McKennie", "CM", 84], ["Yunus Musah", "CM", 81], ["Christian Pulisic", "LW", 86], ["Tim Weah", "RW", 81], ["Folarin Balogun", "ST", 83], ["Gio Reyna", "CAM", 82], ["Ricardo Pepi", "ST", 80], ["Malik Tillman", "CAM", 80], ["Cameron Carter-Vickers", "CB", 79]] },
{ id: "wc2026_par", name: "Paraguay", league: "Group D", season: "World Cup 2026", color: "#ee9b00", rating: 80, worldCup: true, players: [["Gatito Fernandez", "GK", 78], ["Alberto Espinola", "RB", 76], ["Gustavo Gomez", "CB", 83], ["Junior Alonso", "CB", 80], ["Matias Espinoza", "LB", 76], ["Richard Sanchez", "CM", 79], ["Mathias Villasanti", "CDM", 80], ["Miguel Almiron", "CAM", 82], ["Ramon Sosa", "LW", 80], ["Julio Enciso", "RW", 82], ["Antonio Sanabria", "ST", 80], ["Adam Bareiro", "ST", 78], ["Diego Gomez", "CM", 78], ["Omar Alderete", "CB", 79], ["Carlos Coronel", "GK", 77]] },
{ id: "wc2026_aus", name: "Australia", league: "Group D", season: "World Cup 2026", color: "#ee9b00", rating: 81, worldCup: true, players: [["Mathew Ryan", "GK", 80], ["Nathaniel Atkinson", "RB", 77], ["Harry Souttar", "CB", 80], ["Kye Rowles", "CB", 78], ["Aziz Behich", "LB", 77], ["Jackson Irvine", "CM", 80], ["Keanu Baccus", "CDM", 77], ["Ajdin Hrustic", "CAM", 79], ["Mathew Leckie", "RW", 78], ["Martin Boyle", "LW", 78], ["Mitchell Duke", "ST", 78], ["Riley McGree", "CM", 79], ["Craig Goodwin", "LW", 78], ["Cameron Burgess", "CB", 78], ["Joe Gauci", "GK", 76]] },
{ id: "wc2026_tur", name: "Turkey", league: "Group D", season: "World Cup 2026", color: "#ee9b00", rating: 85, worldCup: true, players: [["Ugurcan Cakir", "GK", 81], ["Zeki Celik", "RB", 80], ["Merih Demiral", "CB", 82], ["Caglar Soyuncu", "CB", 81], ["Ferdi Kadioglu", "LB", 84], ["Hakan Calhanoglu", "CDM", 88], ["Orkun Kokcu", "CM", 83], ["Arda Guler", "CAM", 85], ["Cengiz Under", "RW", 81], ["Kerem Akturkoglu", "LW", 82], ["Enes Unal", "ST", 80], ["Baris Alper Yilmaz", "ST", 80], ["Yusuf Yazici", "CAM", 80], ["Ismail Yuksek", "CDM", 80], ["Altay Bayindir", "GK", 78]] },
{ id: "wc2026_ger", name: "Germany", league: "Group E", season: "World Cup 2026", color: "#005f73", rating: 90, worldCup: true, players: [["Manuel Neuer", "GK", 88], ["Joshua Kimmich", "RB", 88], ["Antonio Rudiger", "CB", 87], ["Jonathan Tah", "CB", 85], ["David Raum", "LB", 82], ["Toni Kroos", "CM", 89], ["Ilkay Gundogan", "CM", 86], ["Jamal Musiala", "CAM", 89], ["Leroy Sane", "RW", 86], ["Florian Wirtz", "LW", 89], ["Kai Havertz", "ST", 84], ["Niclas Fullkrug", "ST", 82], ["Serge Gnabry", "RW", 84], ["Leon Goretzka", "CM", 84], ["Marc-Andre ter Stegen", "GK", 88]] },
{ id: "wc2026_cuw", name: "Curacao", league: "Group E", season: "World Cup 2026", color: "#005f73", rating: 74, worldCup: true, players: [["Eloy Room", "GK", 76], ["Jurien Gaari", "RB", 74], ["Roshon van Eijma", "CB", 73], ["Cuco Martina", "CB", 75], ["Sherel Floranus", "LB", 75], ["Leandro Bacuna", "CM", 76], ["Juninho Bacuna", "CM", 76], ["Vurnon Anita", "CDM", 75], ["Brandley Kuwas", "RW", 76], ["Gervane Kastaneer", "LW", 74], ["Rangelo Janga", "ST", 75], ["Kenji Gorre", "LW", 74], ["Jeremy Antonisse", "RW", 73], ["Jafar Arias", "ST", 73], ["Tyrese Noslin", "ST", 77]] },
{ id: "wc2026_civ", name: "Ivory Coast", league: "Group E", season: "World Cup 2026", color: "#005f73", rating: 84, worldCup: true, players: [["Yahia Fofana", "GK", 79], ["Serge Aurier", "RB", 80], ["Odilon Kossounou", "CB", 82], ["Evan Ndicka", "CB", 82], ["Ghislain Konan", "LB", 78], ["Ibrahim Sangare", "CDM", 82], ["Franck Kessie", "CM", 84], ["Seko Fofana", "CM", 83], ["Simon Adingra", "LW", 82], ["Nicolas Pepe", "RW", 81], ["Sebastien Haller", "ST", 82], ["Oumar Diakite", "ST", 78], ["Wilfried Zaha", "LW", 81], ["Wilfried Singo", "CB", 80], ["Jean Michael Seri", "CM", 79]] },
{ id: "wc2026_ecu", name: "Ecuador", league: "Group E", season: "World Cup 2026", color: "#005f73", rating: 84, worldCup: true, players: [["Alexander Dominguez", "GK", 78], ["Angelo Preciado", "RB", 80], ["Piero Hincapie", "CB", 84], ["Willian Pacho", "CB", 83], ["Pervis Estupinan", "LB", 84], ["Moises Caicedo", "CDM", 86], ["Alan Franco", "CM", 78], ["Kendry Paez", "CAM", 80], ["Gonzalo Plata", "RW", 80], ["Jeremy Sarmiento", "LW", 79], ["Enner Valencia", "ST", 81], ["Kevin Rodriguez", "ST", 77], ["Carlos Gruezo", "CDM", 78], ["Felix Torres", "CB", 80], ["Hernan Galindez", "GK", 77]] },
{ id: "wc2026_ned", name: "Netherlands", league: "Group F", season: "World Cup 2026", color: "#6a4c93", rating: 89, worldCup: true, players: [["Bart Verbruggen", "GK", 82], ["Denzel Dumfries", "RB", 84], ["Virgil van Dijk", "CB", 89], ["Matthijs de Ligt", "CB", 86], ["Nathan Ake", "LB", 84], ["Frenkie de Jong", "CM", 88], ["Tijjani Reijnders", "CM", 83], ["Xavi Simons", "CAM", 84], ["Cody Gakpo", "LW", 84], ["Donyell Malen", "RW", 82], ["Memphis Depay", "ST", 83], ["Wout Weghorst", "ST", 79], ["Jeremie Frimpong", "RB", 84], ["Jurrien Timber", "CB", 83], ["Justin Bijlow", "GK", 80]] },
{ id: "wc2026_jpn", name: "Japan", league: "Group F", season: "World Cup 2026", color: "#6a4c93", rating: 85, worldCup: true, players: [["Zion Suzuki", "GK", 78], ["Hiroki Ito", "LB", 82], ["Ko Itakura", "CB", 82], ["Takehiro Tomiyasu", "CB", 84], ["Yukinari Sugawara", "RB", 81], ["Wataru Endo", "CDM", 83], ["Ao Tanaka", "CM", 79], ["Daichi Kamada", "CAM", 82], ["Kaoru Mitoma", "LW", 85], ["Takefusa Kubo", "RW", 85], ["Ayase Ueda", "ST", 80], ["Takumi Minamino", "CAM", 81], ["Ritsu Doan", "RW", 81], ["Daizen Maeda", "LW", 79], ["Shuichi Gonda", "GK", 77]] },
{ id: "wc2026_swe", name: "Sweden", league: "Group F", season: "World Cup 2026", color: "#6a4c93", rating: 84, worldCup: true, players: [["Robin Olsen", "GK", 79], ["Emil Krafth", "RB", 77], ["Victor Lindelof", "CB", 81], ["Isak Hien", "CB", 80], ["Ludwig Augustinsson", "LB", 78], ["Kristoffer Olsson", "CM", 78], ["Albin Ekdal", "CDM", 78], ["Emil Forsberg", "CAM", 82], ["Dejan Kulusevski", "RW", 86], ["Anthony Elanga", "LW", 81], ["Alexander Isak", "ST", 86], ["Viktor Gyokeres", "ST", 86], ["Mattias Svanberg", "CM", 80], ["Jens Cajuste", "CDM", 79], ["Ken Sema", "LM", 79]] },
{ id: "wc2026_tun", name: "Tunisia", league: "Group F", season: "World Cup 2026", color: "#6a4c93", rating: 78, worldCup: true, players: [["Aymen Dahmen", "GK", 77], ["Mohamed Drager", "RB", 76], ["Montassar Talbi", "CB", 78], ["Yassine Meriah", "CB", 77], ["Ali Abdi", "LB", 77], ["Ellyes Skhiri", "CDM", 81], ["Aissa Laidouni", "CM", 78], ["Hannibal Mejbri", "CAM", 78], ["Anis Ben Slimane", "LW", 77], ["Wahbi Khazri", "ST", 80], ["Youssef Msakni", "LW", 79], ["Seifeddine Jaziri", "ST", 76], ["Naim Sliti", "RW", 77], ["Ferjani Sassi", "CM", 77], ["Bechir Ben Said", "GK", 75]] },
{ id: "wc2026_bel", name: "Belgium", league: "Group G", season: "World Cup 2026", color: "#2a9d8f", rating: 88, worldCup: true, players: [["Thibaut Courtois", "GK", 90], ["Timothy Castagne", "RB", 80], ["Wout Faes", "CB", 80], ["Jan Vertonghen", "CB", 80], ["Arthur Theate", "LB", 81], ["Amadou Onana", "CDM", 83], ["Kevin De Bruyne", "CM", 91], ["Youri Tielemans", "CM", 82], ["Jeremy Doku", "LW", 84], ["Leandro Trossard", "RW", 84], ["Romelu Lukaku", "ST", 85], ["Lois Openda", "ST", 84], ["Charles De Ketelaere", "CAM", 81], ["Koen Casteels", "GK", 84], ["Aster Vranckx", "CM", 79]] },
{ id: "wc2026_egy", name: "Egypt", league: "Group G", season: "World Cup 2026", color: "#2a9d8f", rating: 83, worldCup: true, players: [["Mohamed El Shenawy", "GK", 79], ["Omar Kamal", "RB", 77], ["Ahmed Hegazi", "CB", 80], ["Mohamed Abdelmonem", "CB", 80], ["Ahmed Fatouh", "LB", 78], ["Mohamed Elneny", "CDM", 79], ["Hamdi Fathi", "CM", 78], ["Trezeguet", "LW", 80], ["Mohamed Salah", "RW", 90], ["Omar Marmoush", "ST", 84], ["Mostafa Mohamed", "ST", 81], ["Zizo", "CAM", 79], ["Emam Ashour", "CM", 78], ["Mahmoud Hamada", "CDM", 76], ["Mohamed Awad", "GK", 76]] },
{ id: "wc2026_iri", name: "Iran", league: "Group G", season: "World Cup 2026", color: "#2a9d8f", rating: 80, worldCup: true, players: [["Alireza Beiranvand", "GK", 79], ["Sadegh Moharrami", "RB", 77], ["Hossein Kanaani", "CB", 77], ["Shoja Khalilzadeh", "CB", 76], ["Milad Mohammadi", "LB", 77], ["Saeid Ezatolahi", "CDM", 78], ["Saman Ghoddos", "CM", 78], ["Ali Gholizadeh", "RW", 78], ["Mehdi Taremi", "ST", 84], ["Sardar Azmoun", "ST", 82], ["Alireza Jahanbakhsh", "RW", 79], ["Mehdi Ghayedi", "LW", 77], ["Ehsan Hajsafi", "CM", 77], ["Majid Hosseini", "CB", 78], ["Payam Niazmand", "GK", 76]] },
{ id: "wc2026_nzl", name: "New Zealand", league: "Group G", season: "World Cup 2026", color: "#2a9d8f", rating: 75, worldCup: true, players: [["Max Crocombe", "GK", 75], ["Tim Payne", "RB", 74], ["Tommy Smith", "CB", 75], ["Nando Pijnaker", "CB", 74], ["Liberato Cacace", "LB", 78], ["Joe Bell", "CM", 76], ["Marko Stamenic", "CDM", 78], ["Matthew Garbett", "CAM", 75], ["Sarpreet Singh", "RW", 77], ["Ben Waine", "ST", 74], ["Chris Wood", "ST", 80], ["Elijah Just", "LW", 74], ["Alex Greive", "ST", 73], ["Bill Tuiloma", "CB", 75], ["Michael Boxall", "CB", 74]] },
{ id: "wc2026_esp", name: "Spain", league: "Group H", season: "World Cup 2026", color: "#bc6c25", rating: 90, worldCup: true, players: [["Unai Simon", "GK", 85], ["Dani Carvajal", "RB", 85], ["Robin Le Normand", "CB", 84], ["Aymeric Laporte", "CB", 85], ["Alejandro Balde", "LB", 82], ["Rodri", "CDM", 92], ["Pedri", "CM", 87], ["Gavi", "CM", 86], ["Nico Williams", "LW", 84], ["Lamine Yamal", "RW", 86], ["Alvaro Morata", "ST", 83], ["Dani Olmo", "CAM", 84], ["Mikel Oyarzabal", "LW", 83], ["Mikel Merino", "CM", 84], ["David Raya", "GK", 84]] },
{ id: "wc2026_cpv", name: "Cape Verde", league: "Group H", season: "World Cup 2026", color: "#bc6c25", rating: 76, worldCup: true, players: [["Vozinha", "GK", 76], ["Steven Moreira", "RB", 76], ["Logan Costa", "CB", 79], ["Roberto Lopes", "CB", 75], ["Dylan Tavares", "LB", 75], ["Patrick Andrade", "CM", 75], ["Jamiro Monteiro", "CAM", 77], ["Kenny Rocha Santos", "CM", 75], ["Garry Rodrigues", "LW", 77], ["Ryan Mendes", "RW", 77], ["Djaniny", "ST", 76], ["Bebe", "ST", 76], ["Jovane Cabral", "LW", 77], ["Kevin Pina", "CDM", 75], ["Diney", "CB", 74]] },
{ id: "wc2026_ksa", name: "Saudi Arabia", league: "Group H", season: "World Cup 2026", color: "#bc6c25", rating: 78, worldCup: true, players: [["Mohammed Al-Owais", "GK", 78], ["Saud Abdulhamid", "RB", 80], ["Ali Al-Bulaihi", "CB", 78], ["Hassan Tambakti", "CB", 78], ["Yasir Al-Shahrani", "LB", 77], ["Mohamed Kanno", "CM", 78], ["Abdulellah Al-Malki", "CDM", 76], ["Salem Al-Dawsari", "LW", 81], ["Sami Al-Najei", "CAM", 77], ["Firas Al-Buraikan", "ST", 78], ["Saleh Al-Shehri", "ST", 77], ["Abdulrahman Ghareeb", "LW", 77], ["Hattan Bahebri", "RW", 76], ["Nasser Al-Dawsari", "CM", 76], ["Nawaf Al-Aqidi", "GK", 76]] },
{ id: "wc2026_uru", name: "Uruguay", league: "Group H", season: "World Cup 2026", color: "#bc6c25", rating: 88, worldCup: true, players: [["Sergio Rochet", "GK", 80], ["Nahitan Nandez", "RB", 81], ["Ronald Araujo", "CB", 88], ["Jose Maria Gimenez", "CB", 84], ["Matias Vina", "LB", 80], ["Manuel Ugarte", "CDM", 84], ["Federico Valverde", "CM", 90], ["Rodrigo Bentancur", "CM", 85], ["Darwin Nunez", "ST", 86], ["Facundo Pellistri", "RW", 80], ["Luis Suarez", "ST", 82], ["Nicolas De La Cruz", "CAM", 82], ["Giorgian De Arrascaeta", "CAM", 82], ["Maxi Araujo", "LW", 80], ["Guillermo Varela", "RB", 78]] },
{ id: "wc2026_fra", name: "France", league: "Group I", season: "World Cup 2026", color: "#4361ee", rating: 92, worldCup: true, players: [["Mike Maignan", "GK", 88], ["Jules Kounde", "RB", 85], ["William Saliba", "CB", 88], ["Ibrahima Konate", "CB", 85], ["Theo Hernandez", "LB", 87], ["Aurelien Tchouameni", "CDM", 86], ["Eduardo Camavinga", "CM", 86], ["Antoine Griezmann", "CAM", 88], ["Kylian Mbappe", "LW", 94], ["Ousmane Dembele", "RW", 86], ["Olivier Giroud", "ST", 82], ["Marcus Thuram", "ST", 84], ["Kingsley Coman", "RW", 85], ["Adrien Rabiot", "CM", 84], ["Dayot Upamecano", "CB", 84]] },
{ id: "wc2026_sen", name: "Senegal", league: "Group I", season: "World Cup 2026", color: "#4361ee", rating: 85, worldCup: true, players: [["Edouard Mendy", "GK", 84], ["Youssouf Sabaly", "RB", 80], ["Kalidou Koulibaly", "CB", 86], ["Abdou Diallo", "CB", 80], ["Ismail Jakobs", "LB", 79], ["Idrissa Gueye", "CDM", 81], ["Pape Matar Sarr", "CM", 82], ["Pape Gueye", "CM", 78], ["Ismaila Sarr", "RW", 81], ["Sadio Mane", "LW", 86], ["Nicolas Jackson", "ST", 82], ["Boulaye Dia", "ST", 81], ["Iliman Ndiaye", "CAM", 80], ["Habib Diallo", "ST", 80], ["Mory Diaw", "GK", 78]] },
{ id: "wc2026_irq", name: "Iraq", league: "Group I", season: "World Cup 2026", color: "#4361ee", rating: 76, worldCup: true, players: [["Jalal Hassan", "GK", 76], ["Hussein Ali", "RB", 75], ["Saad Natiq", "CB", 75], ["Rebin Sulaka", "CB", 75], ["Ali Adnan", "LB", 77], ["Amjad Attwan", "CDM", 75], ["Osama Rashid", "CM", 76], ["Ibrahim Bayesh", "RW", 76], ["Zidane Iqbal", "CM", 78], ["Aymen Hussein", "ST", 78], ["Mohannad Ali", "ST", 76], ["Ali Jasim", "LW", 77], ["Bashar Resan", "CAM", 76], ["Mohanad Jeahze", "LB", 76], ["Fahad Talib", "GK", 74]] },
{ id: "wc2026_nor", name: "Norway", league: "Group I", season: "World Cup 2026", color: "#4361ee", rating: 87, worldCup: true, players: [["Orjan Nyland", "GK", 79], ["Julian Ryerson", "RB", 82], ["Kristoffer Ajer", "CB", 80], ["Leo Ostigard", "CB", 79], ["Fredrik Bjorkan", "LB", 78], ["Sander Berge", "CDM", 82], ["Martin Odegaard", "CM", 89], ["Morten Thorsby", "CM", 78], ["Antonio Nusa", "LW", 80], ["Oscar Bobb", "RW", 80], ["Erling Haaland", "ST", 94], ["Alexander Sorloth", "ST", 84], ["Jorgen Strand Larsen", "ST", 81], ["Patrick Berg", "CDM", 78], ["Egil Selvik", "GK", 75]] },
{ id: "wc2026_arg", name: "Argentina", league: "Group J", season: "World Cup 2026", color: "#7b2cbf", rating: 91, worldCup: true, players: [["Emiliano Martinez", "GK", 88], ["Nahuel Molina", "RB", 83], ["Cristian Romero", "CB", 86], ["Lisandro Martinez", "CB", 84], ["Nicolas Tagliafico", "LB", 82], ["Enzo Fernandez", "CM", 86], ["Rodrigo De Paul", "CM", 84], ["Alexis Mac Allister", "CM", 86], ["Lionel Messi", "RW", 91], ["Angel Di Maria", "RW", 84], ["Lautaro Martinez", "ST", 88], ["Julian Alvarez", "ST", 85], ["Paulo Dybala", "CAM", 84], ["Nicolas Gonzalez", "LW", 82], ["Leandro Paredes", "CDM", 81]] },
{ id: "wc2026_dza", name: "Algeria", league: "Group J", season: "World Cup 2026", color: "#7b2cbf", rating: 82, worldCup: true, players: [["Anthony Mandrea", "GK", 77], ["Youcef Atal", "RB", 79], ["Ramy Bensebaini", "CB", 82], ["Aissa Mandi", "CB", 79], ["Rayan Ait-Nouri", "LB", 82], ["Ismael Bennacer", "CM", 84], ["Nabil Bentaleb", "CDM", 80], ["Houssem Aouar", "CM", 81], ["Riyad Mahrez", "RW", 85], ["Said Benrahma", "LW", 81], ["Islam Slimani", "ST", 79], ["Amine Gouiri", "ST", 82], ["Adam Ounas", "RW", 78], ["Mohamed Amoura", "ST", 80], ["Sofiane Feghouli", "CAM", 78]] },
{ id: "wc2026_aut", name: "Austria", league: "Group J", season: "World Cup 2026", color: "#7b2cbf", rating: 84, worldCup: true, players: [["Heinz Lindner", "GK", 78], ["Stefan Posch", "RB", 80], ["Kevin Danso", "CB", 83], ["David Alaba", "CB", 85], ["Phillipp Mwene", "LB", 78], ["Konrad Laimer", "CDM", 84], ["Marcel Sabitzer", "CM", 84], ["Xaver Schlager", "CM", 82], ["Christoph Baumgartner", "CAM", 82], ["Michael Gregoritsch", "ST", 81], ["Marko Arnautovic", "ST", 81], ["Patrick Wimmer", "RW", 80], ["Nicolas Seiwald", "CDM", 80], ["Gernot Trauner", "CB", 80], ["Alexander Schlager", "GK", 78]] },
{ id: "wc2026_jor", name: "Jordan", league: "Group J", season: "World Cup 2026", color: "#7b2cbf", rating: 74, worldCup: true, players: [["Yazeed Abulaila", "GK", 75], ["Ehsan Haddad", "RB", 74], ["Yazan Al-Arab", "CB", 75], ["Abdallah Nasib", "CB", 74], ["Salem Al-Ajalin", "LB", 73], ["Nizar Al-Rashdan", "CDM", 75], ["Noor Al-Rawabdeh", "CM", 74], ["Musa Al-Taamari", "RW", 79], ["Mahmoud Al-Mardi", "LW", 75], ["Ali Olwan", "ST", 76], ["Yazan Al-Naimat", "ST", 78], ["Ibrahim Sadeh", "CM", 73], ["Feras Shelbaieh", "RB", 73], ["Mohammad Abu Zrayq", "LW", 74], ["Anas Bani Yaseen", "CB", 73]] },
{ id: "wc2026_por", name: "Portugal", league: "Group K", season: "World Cup 2026", color: "#3a5a40", rating: 91, worldCup: true, players: [["Diogo Costa", "GK", 86], ["Joao Cancelo", "RB", 86], ["Ruben Dias", "CB", 89], ["Pepe", "CB", 83], ["Nuno Mendes", "LB", 85], ["Joao Palhinha", "CDM", 85], ["Bruno Fernandes", "CAM", 89], ["Bernardo Silva", "CM", 88], ["Rafael Leao", "LW", 86], ["Cristiano Ronaldo", "ST", 86], ["Goncalo Ramos", "ST", 83], ["Diogo Jota", "RW", 85], ["Joao Felix", "CAM", 84], ["Vitinha", "CM", 86], ["Antonio Silva", "CB", 82]] },
{ id: "wc2026_cod", name: "DR Congo", league: "Group K", season: "World Cup 2026", color: "#3a5a40", rating: 79, worldCup: true, players: [["Lionel Mpasi", "GK", 77], ["Gedeon Kalulu", "RB", 77], ["Chancel Mbemba", "CB", 82], ["Dylan Batubinsika", "CB", 78], ["Arthur Masuaku", "LB", 79], ["Samuel Moutoussamy", "CM", 78], ["Edo Kayembe", "CDM", 77], ["Gael Kakuta", "CAM", 79], ["Yoane Wissa", "LW", 82], ["Cedric Bakambu", "ST", 80], ["Silas", "RW", 80], ["Meschack Elia", "RW", 78], ["Theo Bongonda", "LW", 79], ["Simon Banza", "ST", 80], ["Dimitry Bertaud", "GK", 75]] },
{ id: "wc2026_uzb", name: "Uzbekistan", league: "Group K", season: "World Cup 2026", color: "#3a5a40", rating: 76, worldCup: true, players: [["Utkir Yusupov", "GK", 75], ["Farrukh Sayfiev", "LB", 74], ["Rustamjon Ashurmatov", "CB", 75], ["Abdukodir Khusanov", "CB", 79], ["Khojiakbar Alijonov", "RB", 74], ["Otabek Shukurov", "CDM", 76], ["Odiljon Hamrobekov", "CM", 75], ["Jaloliddin Masharipov", "LW", 78], ["Eldor Shomurodov", "ST", 79], ["Igor Sergeev", "ST", 76], ["Abbosbek Fayzullaev", "CAM", 79], ["Azizbek Turgunboev", "RW", 75], ["Diyor Kholmatov", "CM", 74], ["Husniddin Aliqulov", "CB", 74], ["Botirali Ergashev", "GK", 73]] },
{ id: "wc2026_col", name: "Colombia", league: "Group K", season: "World Cup 2026", color: "#3a5a40", rating: 86, worldCup: true, players: [["Camilo Vargas", "GK", 80], ["Daniel Munoz", "RB", 82], ["Davinson Sanchez", "CB", 82], ["Jhon Lucumi", "CB", 81], ["Johan Mojica", "LB", 78], ["Jefferson Lerma", "CDM", 81], ["Richard Rios", "CM", 80], ["James Rodriguez", "CAM", 84], ["Luis Diaz", "LW", 87], ["Jhon Arias", "RW", 82], ["Rafael Borre", "ST", 80], ["Jhon Duran", "ST", 82], ["Yaser Asprilla", "CAM", 80], ["Wilmar Barrios", "CDM", 80], ["David Ospina", "GK", 78]] },
{ id: "wc2026_eng", name: "England", league: "Group L", season: "World Cup 2026", color: "#6c757d", rating: 91, worldCup: true, players: [["Jordan Pickford", "GK", 84], ["Kyle Walker", "RB", 85], ["John Stones", "CB", 86], ["Marc Guehi", "CB", 82], ["Luke Shaw", "LB", 82], ["Declan Rice", "CDM", 87], ["Jude Bellingham", "CAM", 91], ["Phil Foden", "CM", 89], ["Bukayo Saka", "RW", 88], ["Harry Kane", "ST", 90], ["Marcus Rashford", "LW", 84], ["Cole Palmer", "CAM", 86], ["Trent Alexander-Arnold", "RB", 86], ["Jack Grealish", "LW", 84], ["Kobbie Mainoo", "CM", 80]] },
{ id: "wc2026_cro", name: "Croatia", league: "Group L", season: "World Cup 2026", color: "#6c757d", rating: 86, worldCup: true, players: [["Dominik Livakovic", "GK", 82], ["Josip Juranovic", "RB", 80], ["Josko Gvardiol", "CB", 87], ["Marin Pongracic", "CB", 80], ["Borna Sosa", "LB", 79], ["Marcelo Brozovic", "CDM", 84], ["Luka Modric", "CM", 87], ["Mateo Kovacic", "CM", 85], ["Mario Pasalic", "CAM", 80], ["Ivan Perisic", "LW", 82], ["Andrej Kramaric", "ST", 82], ["Ante Budimir", "ST", 80], ["Lovro Majer", "CAM", 80], ["Nikola Vlasic", "CAM", 79], ["Martin Erlic", "CB", 78]] },
{ id: "wc2026_gha", name: "Ghana", league: "Group L", season: "World Cup 2026", color: "#6c757d", rating: 82, worldCup: true, players: [["Lawrence Ati-Zigi", "GK", 77], ["Alidu Seidu", "RB", 78], ["Mohammed Salisu", "CB", 81], ["Alexander Djiku", "CB", 80], ["Gideon Mensah", "LB", 77], ["Thomas Partey", "CDM", 84], ["Mohammed Kudus", "CAM", 86], ["Salis Abdul Samed", "CM", 78], ["Ernest Nuamah", "RW", 80], ["Jordan Ayew", "LW", 80], ["Inaki Williams", "ST", 82], ["Antoine Semenyo", "ST", 80], ["Kamaldeen Sulemana", "LW", 79], ["Daniel Amartey", "CB", 78], ["Andre Ayew", "CAM", 78]] },
{ id: "wc2026_pan", name: "Panama", league: "Group L", season: "World Cup 2026", color: "#6c757d", rating: 76, worldCup: true, players: [["Orlando Mosquera", "GK", 75], ["Michael Murillo", "RB", 78], ["Andres Andrade", "CB", 76], ["Fidel Escobar", "CB", 76], ["Eric Davis", "LB", 76], ["Anibal Godoy", "CDM", 76], ["Adalberto Carrasquilla", "CM", 80], ["Edgar Barcenas", "RW", 77], ["Jose Luis Rodriguez", "LW", 76], ["Cecilio Waterman", "ST", 76], ["Ismael Diaz", "ST", 78], ["Yoel Barcenas", "LW", 76], ["Christian Martinez", "CM", 74], ["Jose Cordoba", "CB", 77], ["Luis Mejia", "GK", 74]] }];

const WORLD_CUP_GROUPS = ["Group A", "Group B", "Group C", "Group D", "Group E", "Group F", "Group G", "Group H", "Group I", "Group J", "Group K", "Group L"];

const WORLD_CUP_TOP_NATION_BOOST = new Set([
"Argentina", "Brazil", "France", "England", "Portugal", "Spain",
"Germany", "Netherlands", "Belgium", "Uruguay", "Croatia", "Italy"]);


function getWorldCupBoostedClubs() {
  // Same spinner logic, slightly better World Cup pool.
  // Top nations get one extra entry, making them a little more likely without dominating the mode.
  const boosted = [];
  WORLD_CUP_CLUBS.forEach(club => {
    boosted.push(club);
    if (WORLD_CUP_TOP_NATION_BOOST.has(club.name)) boosted.push(club);
  });
  return boosted;
}

const TOP_FIVE_LEAGUES = BALANCED_BIG_FIVE_LEAGUES;

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
    if (tier === "underdog") weight = 3;
    if (tier === "strong") weight = 4;
    if (tier === "elite") weight = 5;
    if (tier === "legendary") weight = 4;
    if (tier === "jackpot") weight = 3;

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
["Manchester City", 91], ["Real Madrid", 91], ["Bayern Munich", 90], ["Liverpool", 89],
["Barcelona", 89], ["Arsenal", 88], ["Inter Milan", 88], ["PSG", 88],
["Manchester United", 87], ["Chelsea", 86], ["Atletico Madrid", 86], ["AC Milan", 86],
["Napoli", 86], ["Borussia Dortmund", 85], ["Bayer Leverkusen", 85], ["Juventus", 85],
["Tottenham", 84], ["RB Leipzig", 84], ["Newcastle", 83], ["Aston Villa", 83],
["Roma", 82], ["Monaco", 82], ["Marseille", 82], ["Lyon", 81]];


const CLUB_NAME_SUFFIXES = [
...ALL_CLUBS.map(club => club.name),
"Roma", "Lazio", "Fiorentina", "Marseille", "Nice", "Wolfsburg",
"Stuttgart", "Schalke", "Betis", "Athletic", "Everton", "Leeds",
"Parma", "Bremen", "Mallorca", "Toulouse", "Porto", "Benfica", "Sporting CP", "Ajax", "PSV", "Galatasaray", "Fenerbahce", "Zenit", "Shakhtar Donetsk", "Rangers", "Celtic", "Sampdoria", "Torino", "Bordeaux", "Saint-Etienne", "Hamburg", "Monchengladbach", "Hoffenheim", "Palermo"].
sort((a, b) => b.length - a.length);

function cleanPlayerName(name) {
  let cleaned = String(name || "").trim();

  cleaned = cleaned.
  replace(/\s+[\-]\s+.+$/, "").
  replace(/\s*\|\s*.+$/, "").
  replace(/\s*\([^)]*\)\s*$/, "").
  trim();

  for (const clubName of CLUB_NAME_SUFFIXES) {
    const suffix = ` ${clubName}`;
    if (cleaned.toLowerCase().endsWith(suffix.toLowerCase())) {
      cleaned = cleaned.slice(0, -suffix.length).trim();
      break;
    }
  }

  return cleaned;
}

function getRatingClass(rating) {
  if (rating >= 90) return "rating-red";
  if (rating >= 80) return "rating-yellow";
  if (rating >= 70) return "rating-green";
  return "rating-blue";
}

function getPitchDisplayName(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";

  const suffixes = new Set(["jr", "jr.", "sr", "sr.", "ii", "iii", "iv"]);
  while (parts.length > 1 && suffixes.has(parts[parts.length - 1].toLowerCase())) {
    parts.pop();
  }

  const lowerParts = parts.map(part => part.toLowerCase().replace(/[^a-z-]/g, ""));
  const compoundPrefixes = new Set([
  "mac", "mc", "de", "del", "de la", "van", "van de", "van der", "von", "da", "di", "dos", "du", "le", "la"]);

  if (parts.length >= 3) {
    const threeWordPrefix = lowerParts.slice(-3, -1).join(" ");
    if (compoundPrefixes.has(threeWordPrefix)) return parts.slice(-3).join(" ");
  }

  if (parts.length >= 2 && compoundPrefixes.has(lowerParts[lowerParts.length - 2])) {
    return parts.slice(-2).join(" ");
  }

  return parts[parts.length - 1];
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
    "Luiz Araujo": ["RW", "LW"],
    "Harry Kane": ["ST", "CAM"],
    "Son Heung-min": ["LW", "ST", "RW"],
    "Christian Eriksen": ["CAM", "CM", "RW"],
    "Bruno Guimaraes": ["CM", "CDM"],
    "John McGinn": ["CM", "RM"],
    "Moussa Diaby": ["RW", "LW"],
    "Leon Bailey": ["RW", "LW"],
    "Hulk": ["RW", "ST"],
    "James Rodriguez": ["LW", "CAM", "RW"],
    "Nicolas Gaitan": ["LW", "CAM", "RW"],
    "Enzo Perez": ["CM", "CDM"],
    "Nemanja Matic": ["CDM", "CM"],
    "Pedro Goncalves": ["CAM", "RW", "ST"],
    "Nuno Mendes": ["LB", "LM"],
    "Frenkie de Jong": ["CM", "CDM"],
    "Hakim Ziyech": ["RW", "CAM"],
    "Dusan Tadic": ["LW", "CAM", "ST"],
    "Donny van de Beek": ["CAM", "CM"],
    "Daley Blind": ["CB", "LB", "CDM"],
    "Hirving Lozano": ["LW", "RW"],
    "Steven Bergwijn": ["RW", "LW"],
    "Gheorghe Hagi": ["CAM", "RW"],
    "Alex de Souza": ["CAM", "CM"],
    "Roberto Carlos": ["LB", "LM"],
    "Andrey Arshavin": ["CAM", "LW", "ST"],
    "Fernandinho": ["CM", "CDM"],
    "Willian": ["LW", "RW", "CAM"],
    "Darijo Srna": ["RB", "RM"],
    "Henrikh Mkhitaryan": ["CAM", "RW", "LW"],
    "Michael Ballack": ["CM", "CAM", "CDM"],
    "Ze Roberto": ["LM", "CM", "LB"],
    "Dimitar Berbatov": ["ST", "CAM"],
    "Xabi Alonso": ["CM", "CDM"],
    "Nihat Kahveci": ["ST", "RW"],
    "Alexander Mostovoi": ["CAM", "CM"],
    "Roberto Mancini": ["ST", "CAM"],
    "Attilio Lombardo": ["RM", "RW"],
    "Yoann Gourcuff": ["CAM", "CM"],
    "Pierre-Emerick Aubameyang": ["ST", "LW", "RW"],
    "Granit Xhaka": ["CDM", "CM"],
    "Thorgan Hazard": ["LW", "CAM", "RW"],
    "Lars Stindl": ["CAM", "ST", "CM"],
    "Andrej Kramaric": ["ST", "CAM"],
    "Fabio Grosso": ["LB", "LM"],
    "Mark Bresciano": ["LM", "CM", "CAM"] };



  return playerPositions[name] || [mainPosition];
}


const SQUAD_DEPTH_BY_NAME = {
  "Manchester City": [
  ["Oleksandr Zinchenko", "LB", 83], ["Fernandinho", "CDM", 87], ["David Silva", "CAM", 90],
  ["Leroy Sane", "LW", 86], ["Raheem Sterling", "RW", 88], ["Julian Alvarez", "ST", 84], ["Manuel Akanji", "CB", 84]],
  "Manchester United": [
  ["Gary Neville", "RB", 86], ["Denis Irwin", "LB", 87], ["Roy Keane", "CDM", 90],
  ["David Beckham", "RM", 90], ["Juan Mata", "CAM", 85], ["Park Ji-sung", "LW", 84], ["Antonio Valencia", "RW", 84]],
  "Chelsea": [
  ["Branislav Ivanovic", "RB", 86], ["Marcos Alonso", "LB", 84], ["Michael Essien", "CDM", 89],
  ["Cesc Fabregas", "CM", 88], ["Eden Hazard", "LW", 92], ["Willian", "RW", 86], ["Oscar", "CAM", 84]],
  "Arsenal": [
  ["Bacary Sagna", "RB", 84], ["Nacho Monreal", "LB", 83], ["Emmanuel Petit", "CDM", 87],
  ["Cesc Fabregas", "CM", 90], ["Mesut Ozil", "CAM", 89], ["Alexis Sanchez", "LW", 90], ["Theo Walcott", "RW", 84]],
  "Liverpool": [
  ["Steve Finnan", "RB", 83], ["John Arne Riise", "LB", 84], ["Javier Mascherano", "CDM", 88],
  ["Xabi Alonso", "CM", 89], ["Steven Gerrard", "CAM", 91], ["Luis Diaz", "LW", 86], ["Dirk Kuyt", "RW", 84]],
  "Barcelona": [
  ["Jordi Alba", "LB", 88], ["Sergi Roberto", "RB", 82], ["Yaya Toure", "CDM", 88],
  ["Cesc Fabregas", "CM", 88], ["Rivaldo", "CAM", 92], ["Neymar", "LW", 93], ["Alexis Sanchez", "RW", 86]],
  "Real Madrid": [
  ["Alvaro Arbeloa", "RB", 82], ["Roberto Carlos", "LB", 92], ["Claude Makelele", "CDM", 90],
  ["Guti", "CM", 86], ["Mesut Ozil", "CAM", 89], ["Vinicius Junior", "LW", 90], ["Rodrygo", "RW", 87]],
  "Atletico Madrid": [
  ["Kieran Trippier", "RB", 84], ["Lucas Hernandez", "LB", 84], ["Rodri", "CDM", 88],
  ["Saul Niguez", "CM", 85], ["Antoine Griezmann", "CAM", 90], ["Yannick Carrasco", "LW", 85], ["Angel Correa", "RW", 84]],
  "Valencia": [
  ["Miguel", "RB", 84], ["Jordi Alba", "LB", 84], ["Gaizka Mendieta", "CM", 89],
  ["David Silva", "CAM", 88], ["Pablo Hernandez", "RW", 83], ["Juan Mata", "LW", 86]],
  "Sevilla": [
  ["Dani Alves", "RB", 90], ["Adriano", "LB", 83], ["Ivan Rakitic", "CM", 87],
  ["Pablo Sarabia", "CAM", 84], ["Diego Capel", "LW", 82], ["Frederic Kanoute", "ST", 86]],
  "Bayern Munich": [
  ["Philipp Lahm", "RB", 91], ["Bixente Lizarazu", "LB", 88], ["Javi Martinez", "CDM", 86],
  ["Bastian Schweinsteiger", "CM", 90], ["Jamal Musiala", "CAM", 88], ["Franck Ribery", "LW", 91], ["Arjen Robben", "RW", 92]],
  "Borussia Dortmund": [
  ["Achraf Hakimi", "RB", 86], ["Raphael Guerreiro", "LB", 84], ["Sebastian Kehl", "CDM", 83],
  ["Shinji Kagawa", "CAM", 86], ["Jadon Sancho", "RW", 88], ["Christian Pulisic", "LW", 84]],
  "Bayer Leverkusen": [
  ["Carvajal", "RB", 84], ["Wendell", "LB", 82], ["Michael Ballack", "CM", 90],
  ["Hakan Calhanoglu", "CAM", 85], ["Leon Bailey", "LW", 84], ["Moussa Diaby", "RW", 86]],
  "RB Leipzig": [
  ["Benjamin Henrichs", "RB", 81], ["Marcel Halstenberg", "LB", 82], ["Tyler Adams", "CDM", 81],
  ["Naby Keita", "CM", 86], ["Emil Forsberg", "CAM", 84], ["Yussuf Poulsen", "RW", 82]],
  "Inter Milan": [
  ["Maicon", "RB", 89], ["Giacinto Facchetti", "LB", 91], ["Cristian Chivu", "LB", 84],
  ["Nicolo Barella", "CM", 88], ["Luis Figo", "RW", 88], ["Ivan Perisic", "LW", 86], ["Hakan Calhanoglu", "CAM", 86]],
  "AC Milan": [
  ["Mauro Tassotti", "RB", 86], ["Theo Hernandez", "LB", 88], ["Frank Rijkaard", "CDM", 91],
  ["Demetrio Albertini", "CM", 88], ["Dejan Savicevic", "CAM", 90], ["Roberto Donadoni", "RW", 88]],
  "Napoli": [
  ["Christian Maggio", "RB", 83], ["Faouzi Ghoulam", "LB", 84], ["Jorginho", "CDM", 86],
  ["Marek Hamsik", "CM", 89], ["Dries Mertens", "CAM", 88], ["Lorenzo Insigne", "LW", 87], ["Jose Callejon", "RW", 84]],
  "Paris Saint-Germain": [
  ["Achraf Hakimi", "RB", 87], ["Nuno Mendes", "LB", 85], ["Claude Makelele", "CDM", 88],
  ["Vitinha", "CM", 85], ["Neymar", "CAM", 92], ["Kylian Mbappe", "LW", 94], ["Ousmane Dembele", "RW", 86]],
  "Monaco": [
  ["Djibril Sidibe", "RB", 83], ["Layvin Kurzawa", "LB", 83], ["Aurelien Tchouameni", "CDM", 86],
  ["Youri Tielemans", "CM", 84], ["James Rodriguez", "CAM", 89], ["Thomas Lemar", "LW", 86]],
  "Lyon": [
  ["Anthony Reveillere", "RB", 83], ["Ferland Mendy", "LB", 84], ["Jeremy Toulalan", "CDM", 84],
  ["Miralem Pjanic", "CM", 86], ["Nabil Fekir", "CAM", 87], ["Memphis Depay", "LW", 86]],
  "Lille": [
  ["Mathieu Debuchy", "RB", 83], ["Lucas Digne", "LB", 82], ["Rio Mavuba", "CDM", 83],
  ["Yohan Cabaye", "CM", 85], ["Eden Hazard", "LW", 89], ["Gervinho", "RW", 84]],
  "Ajax": [
  ["Noussair Mazraoui", "RB", 84], ["Nicolas Tagliafico", "LB", 84], ["Frenkie de Jong", "CM", 88],
  ["Hakim Ziyech", "CAM", 88], ["Dusan Tadic", "LW", 87], ["Antony", "RW", 84]],
  "Porto": [
  ["Danilo", "RB", 84], ["Alex Telles", "LB", 85], ["Ruben Neves", "CDM", 84],
  ["Joao Moutinho", "CM", 86], ["Luis Diaz", "LW", 86], ["Hulk", "RW", 88]],
  "Benfica": [
  ["Nelson Semedo", "RB", 83], ["Alex Grimaldo", "LB", 84], ["Nemanja Matic", "CDM", 86],
  ["Enzo Fernandez", "CM", 86], ["Pablo Aimar", "CAM", 88], ["Angel Di Maria", "RW", 88]],
  "Sporting CP": [
  ["Pedro Porro", "RB", 84], ["Nuno Mendes", "LB", 84], ["William Carvalho", "CDM", 84],
  ["Bruno Fernandes", "CAM", 90], ["Nani", "LW", 86], ["Pedro Goncalves", "RW", 85]],
  "Tottenham": [
  ["Kyle Walker", "RB", 86], ["Danny Rose", "LB", 84], ["Mousa Dembele", "CM", 87],
  ["Christian Eriksen", "CAM", 89], ["Gareth Bale", "RW", 90], ["Dejan Kulusevski", "RW", 84]],
  "Newcastle United": [
  ["Kieran Trippier", "RB", 84], ["Dan Burn", "LB", 81], ["Bruno Guimaraes", "CM", 87],
  ["Joe Willock", "CM", 82], ["Miguel Almiron", "RW", 82], ["Allan Saint-Maximin", "LW", 84]],
  "Aston Villa": [
  ["Matty Cash", "RB", 82], ["Lucas Digne", "LB", 82], ["Douglas Luiz", "CDM", 85],
  ["Youri Tielemans", "CM", 83], ["Philippe Coutinho", "CAM", 84], ["Leon Bailey", "RW", 83]],
  "Roma": [
  ["Cafu", "RB", 89], ["John Arne Riise", "LB", 83], ["Daniele De Rossi", "CDM", 89],
  ["Radja Nainggolan", "CM", 87], ["Francesco Totti", "CAM", 94], ["Mohamed Salah", "RW", 88]],
  "Lazio": [
  ["Massimo Oddo", "RB", 84], ["Senad Lulic", "LB", 82], ["Lucas Leiva", "CDM", 84],
  ["Sergej Milinkovic-Savic", "CM", 88], ["Luis Alberto", "CAM", 86], ["Felipe Anderson", "RW", 84]],
  "Fiorentina": [
  ["Lorenzo De Silvestri", "RB", 81], ["Manuel Pasqual", "LB", 83], ["Borja Valero", "CM", 85],
  ["Rui Costa", "CAM", 90], ["Federico Chiesa", "RW", 86], ["Stevan Jovetic", "LW", 85]],
  "Marseille": [
  ["Cesar Azpilicueta", "RB", 83], ["Taye Taiwo", "LB", 84], ["Didier Deschamps", "CDM", 87],
  ["Samir Nasri", "CAM", 86], ["Dimitri Payet", "LW", 86], ["Florian Thauvin", "RW", 84]],
  "Nice": [
  ["Youcef Atal", "RB", 82], ["Melvin Bard", "LB", 80], ["Jean Michael Seri", "CM", 84],
  ["Hatem Ben Arfa", "CAM", 86], ["Allan Saint-Maximin", "LW", 84], ["Jeremie Boga", "RW", 82]],
  "Wolfsburg": [
  ["Christian Trasch", "RB", 81], ["Marcel Schafer", "LB", 82], ["Josuha Guilavogui", "CDM", 82],
  ["Kevin De Bruyne", "CAM", 90], ["Ivan Perisic", "LW", 85], ["Vieirinha", "RW", 82]],
  "Schalke": [
  ["Rafinha", "RB", 83], ["Sead Kolasinac", "LB", 82], ["Leon Goretzka", "CM", 85],
  ["Julian Draxler", "CAM", 86], ["Jefferson Farfan", "RW", 84], ["Leroy Sane", "LW", 85]],
  "Real Betis": [
  ["Emerson Royal", "RB", 81], ["Alex Moreno", "LB", 82], ["Guido Rodriguez", "CDM", 84],
  ["Sergio Canales", "CAM", 86], ["Joaquin", "RW", 85], ["Juanmi", "LW", 82]],
  "Athletic Club": [
  ["Andoni Iraola", "RB", 84], ["Mikel Balenziaga", "LB", 81], ["Ander Herrera", "CM", 84],
  ["Iker Muniain", "CAM", 85], ["Nico Williams", "RW", 84], ["Markel Susaeta", "RW", 82]],
  "Everton": [
  ["Seamus Coleman", "RB", 84], ["Leighton Baines", "LB", 86], ["Idrissa Gueye", "CDM", 84],
  ["Mikel Arteta", "CM", 86], ["Tim Cahill", "CAM", 85], ["Steven Pienaar", "LW", 82]],
  "West Ham": [
  ["Pablo Zabaleta", "RB", 81], ["Aaron Cresswell", "LB", 82], ["Declan Rice", "CDM", 86],
  ["Dimitri Payet", "CAM", 88], ["Jarrod Bowen", "RW", 84], ["Said Benrahma", "LW", 82]],
  "Leeds United": [
  ["Luke Ayling", "RB", 80], ["Ian Harte", "LB", 83], ["Kalvin Phillips", "CDM", 84],
  ["Harry Kewell", "LW", 86], ["Raphinha", "RW", 85], ["Pablo Hernandez", "CAM", 83]],
  "Werder Bremen": [
  ["Clemens Fritz", "RB", 82], ["Ludovic Magnin", "LB", 80], ["Torsten Frings", "CDM", 86],
  ["Mesut Ozil", "CAM", 87], ["Diego", "CAM", 88], ["Marko Marin", "LW", 83]],
  "Celtic": [
  ["Josip Juranovic", "RB", 81], ["Kieran Tierney", "LB", 84], ["Scott Brown", "CDM", 83],
  ["Callum McGregor", "CM", 83], ["Shunsuke Nakamura", "CAM", 86], ["Jota", "LW", 82]],
  "Rangers": [
  ["James Tavernier", "RB", 82], ["Borna Barisic", "LB", 81], ["Barry Ferguson", "CM", 84],
  ["Brian Laudrup", "LW", 88], ["Ryan Kent", "LW", 81], ["Nacho Novo", "RW", 80]] };



Object.assign(SQUAD_DEPTH_BY_NAME, {
  "Leicester City": [["Ricardo Pereira", "RB", 84], ["Ben Chilwell", "LB", 83], ["Wilfred Ndidi", "CDM", 85], ["James Maddison", "CAM", 85], ["Marc Albrighton", "RW", 80]],
  "Brighton": [["Joel Veltman", "RB", 80], ["Marc Cucurella", "LB", 82], ["Billy Gilmour", "CM", 79], ["Adam Lallana", "CAM", 81], ["Solly March", "RW", 81]],
  "Brentford": [["Mads Roerslev", "RB", 78], ["Sergio Reguilon", "LB", 80], ["Vitaly Janelt", "CDM", 79], ["Josh Dasilva", "CAM", 78], ["Kevin Schade", "LW", 79]],
  "Real Sociedad": [["Alvaro Odriozola", "RB", 81], ["Aihen Munoz", "LB", 79], ["Martin Zubimendi", "CDM", 85], ["David Silva", "CAM", 86], ["Takefusa Kubo", "RW", 84]],
  "Villarreal": [["Mario Gaspar", "RB", 82], ["Alberto Moreno", "LB", 80], ["Etienne Capoue", "CDM", 82], ["Santi Cazorla", "CAM", 87], ["Yeremy Pino", "RW", 82]],
  "Atalanta": [["Hans Hateboer", "RB", 81], ["Robin Gosens", "LB", 84], ["Marten de Roon", "CDM", 82], ["Teun Koopmeiners", "CM", 84], ["Josip Ilicic", "CAM", 86]],
  "Lens": [["Jonathan Clauss", "RB", 83], ["Deiver Machado", "LB", 79], ["Seko Fofana", "CM", 85], ["Cheick Doucoure", "CDM", 82], ["Florian Sotoca", "RW", 80]],
  "Rennes": [["Hamari Traore", "RB", 81], ["Adrien Truffert", "LB", 80], ["Eduardo Camavinga", "CM", 84], ["Benjamin Bourigeaud", "CAM", 83], ["Jeremy Doku", "RW", 82]],
  "PSV": [["Denzel Dumfries", "RB", 84], ["Angelino", "LB", 82], ["Jerdy Schouten", "CDM", 82], ["Ibrahim Afellay", "CAM", 85], ["Cody Gakpo", "LW", 85]],
  "Galatasaray": [["Emmanuel Eboue", "RB", 82], ["Hakan Balta", "LB", 80], ["Felipe Melo", "CDM", 84], ["Wesley Sneijder", "CAM", 88], ["Arda Turan", "LW", 86]],
  "Fenerbahce": [["Gokhan Gonul", "RB", 82], ["Caner Erkin", "LB", 81], ["Mehmet Topal", "CDM", 82], ["Alex de Souza", "CAM", 89], ["Dirk Kuyt", "RW", 83]],
  "Zenit": [["Anyukov", "RB", 81], ["Domenico Criscito", "LB", 82], ["Igor Denisov", "CDM", 82], ["Danny", "CAM", 85], ["Hulk", "RW", 88]],
  "Shakhtar Donetsk": [["Dodo", "RB", 81], ["Viktor Kornienko", "LB", 77], ["Anatoliy Tymoshchuk", "CDM", 85], ["Marlos", "RW", 84], ["Taison", "LW", 84]],
  "Celtic": [["Josip Juranovic", "RB", 81], ["Kieran Tierney", "LB", 84], ["Scott Brown", "CDM", 83], ["Callum McGregor", "CM", 83], ["Shunsuke Nakamura", "CAM", 86]],
  "Rangers": [["James Tavernier", "RB", 82], ["Borna Barisic", "LB", 81], ["Barry Ferguson", "CM", 84], ["Brian Laudrup", "LW", 88], ["Ryan Kent", "LW", 81]] });


const ERA_SPOTLIGHT_PLAYERS_BY_ID = {
  juv1415: [
  ["Andrea Barzagli", "CB", 86], ["Kwadwo Asamoah", "LM", 82], ["Martin Caceres", "RB", 81],
  ["Simone Pepe", "RW", 79], ["Romulo", "RM", 78], ["Sebastian Giovinco", "CAM", 80]],
  juv9596_balanced: [
  ["Zinedine Zidane", "CAM", 90], ["Didier Deschamps", "CDM", 87], ["Gianluca Vialli", "ST", 89],
  ["Fabrizio Ravanelli", "ST", 87], ["Angelo Di Livio", "RM", 84], ["Antonio Conte", "CM", 84]],
  psg1516: [
  ["Lionel Messi", "RW", 94], ["Neymar", "LW", 92], ["Kylian Mbappe", "ST", 94],
  ["Achraf Hakimi", "RB", 87], ["Gianluigi Donnarumma", "GK", 89], ["Nuno Mendes", "LB", 85]],
  newcastle2223_expanded: [
  ["Alan Shearer", "ST", 92], ["David Ginola", "LW", 89], ["Peter Beardsley", "CAM", 88],
  ["Les Ferdinand", "ST", 87], ["Laurent Robert", "LW", 84], ["Gary Speed", "CM", 84]],
  astonvilla2324_expanded: [
  ["Jack Grealish", "LW", 87], ["Dwight Yorke", "ST", 88], ["Paul McGrath", "CB", 89],
  ["Gareth Barry", "CDM", 85], ["Ashley Young", "RW", 84], ["James Milner", "CM", 84]],
  everton0405_extra: [
  ["Wayne Rooney", "ST", 89], ["Romelu Lukaku", "ST", 87], ["Leighton Baines", "LB", 86],
  ["James Rodriguez", "CAM", 86], ["Andrei Kanchelskis", "RW", 85], ["Richarlison", "LW", 84]],
  westham1516_extra: [
  ["Declan Rice", "CDM", 87], ["Paolo Di Canio", "CAM", 88], ["Carlos Tevez", "ST", 88],
  ["Joe Cole", "CAM", 86], ["Jarrod Bowen", "RW", 84], ["Julian Dicks", "LB", 83]],
  leeds0001_extra: [
  ["Raphinha", "RW", 86], ["Gary Speed", "CM", 85], ["Lucas Radebe", "CB", 86],
  ["Tony Yeboah", "ST", 86], ["James Milner", "CM", 84], ["David Batty", "CDM", 84]],
  benfica1314_expanded: [
  ["Eusebio", "ST", 95], ["Rui Costa", "CAM", 91], ["Angel Di Maria", "RW", 89],
  ["Joao Felix", "CAM", 86], ["Enzo Fernandez", "CM", 86], ["Joao Cancelo", "RB", 86]],
  sporting2021_expanded: [
  ["Cristiano Ronaldo", "RW", 92], ["Luis Figo", "RW", 91], ["Bruno Fernandes", "CAM", 90],
  ["Nani", "LW", 86], ["Joao Moutinho", "CM", 85], ["Rui Patricio", "GK", 85]],
  ajax1819_expanded: [
  ["Johan Cruyff", "CAM", 96], ["Marco van Basten", "ST", 94], ["Dennis Bergkamp", "CAM", 92],
  ["Wesley Sneijder", "CAM", 90], ["Clarence Seedorf", "CM", 90], ["Edwin van der Sar", "GK", 90]],
  psv1718_expanded: [
  ["Ronaldo", "ST", 94], ["Romario", "ST", 92], ["Ruud Gullit", "CAM", 92],
  ["Arjen Robben", "RW", 90], ["Ruud van Nistelrooy", "ST", 90], ["Mark van Bommel", "CDM", 86]],
  galatasaray9900_expanded: [
  ["Gheorghe Hagi", "CAM", 91], ["Didier Drogba", "ST", 88], ["Wesley Sneijder", "CAM", 88],
  ["Mauro Icardi", "ST", 86], ["Franck Ribery", "LW", 86], ["Felipe Melo", "CDM", 84]],
  fenerbahce0708_expanded: [
  ["Roberto Carlos", "LB", 88], ["Alex de Souza", "CAM", 90], ["Mesut Ozil", "CAM", 87],
  ["Robin van Persie", "ST", 88], ["Nani", "LW", 85], ["Dirk Kuyt", "RW", 84]],
  celtic2223_expanded: [
  ["Henrik Larsson", "ST", 91], ["Kenny Dalglish", "ST", 92], ["Jimmy Johnstone", "RW", 90],
  ["Shunsuke Nakamura", "CAM", 86], ["Kieran Tierney", "LB", 84], ["Virgil van Dijk", "CB", 86]],
  rangers0708_expanded: [
  ["Paul Gascoigne", "CAM", 90], ["Brian Laudrup", "LW", 89], ["Ally McCoist", "ST", 88],
  ["Giovanni van Bronckhorst", "LB", 86], ["Barry Ferguson", "CM", 85], ["Jorg Albertz", "CM", 84]] };


function getEraSpotlightPlayers(club) {
  return ERA_SPOTLIGHT_PLAYERS_BY_ID[club.id] || [];
}

function getSupplementalPlayers(club) {
  return SQUAD_DEPTH_BY_NAME[club.name] || [];
}

function ensureSquadCoverage(club) {
  const seen = new Set();
  return [...club.players, ...getSupplementalPlayers(club), ...getEraSpotlightPlayers(club)].filter(player => {
    const key = String(player[0] || "").toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function makePlayers(club) {
  return ensureSquadCoverage(club).
  map((p, index) => {
    const name = cleanPlayerName(p[0]);

    return {
      id: `${club.id}_${index}`,
      name,
      rawName: p[0],
      position: p[1],
      positions: getAltPositions(name, p[1]),
      rating: p[2],
      clubId: club.id,
      club: club.name,
      season: club.season,
      league: club.league,
      color: club.color };

  }).
  sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch (error) {
    return fallback;
  }
}

function saveStoredJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be blocked. Ignore safely.
  }
}


const PLAYER_COLLECTION_KEY = "draftXIPlayerCollectionV1";

function getPlayerCollectionId(player) {
  return `${player.clubId || player.club || player.nation || "unknown"}_${player.name}_${player.position}`.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

function getAllCollectiblePlayers(clubPool) {
  const seen = new Set();
  return (clubPool || []).flatMap(club => makePlayers(club)).filter(player => {
    const id = getPlayerCollectionId(player);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  }).sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
}

function getCollectionStats(collectionIds, allPlayers) {
  const validIds = new Set((allPlayers || []).map(getPlayerCollectionId));
  const uniqueIds = Array.from(new Set(collectionIds || [])).filter(id => validIds.has(id));
  const total = Math.max(1, validIds.size);
  return {
    found: uniqueIds.length,
    total: validIds.size,
    percent: Math.min(100, Math.round(uniqueIds.length / total * 100)) };

}

function getClubCollectionStats(collectionIds, clubPool = ALL_CLUBS, leagueList = TOP_FIVE_LEAGUES, restLabel = "Rest of Europe") {
  const validClubIds = new Set(clubPool.map(club => club.id));
  const uniqueIds = Array.from(new Set(collectionIds || [])).filter(id => validClubIds.has(id));
  const clubs = uniqueIds.
  map(id => clubPool.find(club => club.id === id)).
  filter(Boolean);

  const byLeague = [
  ...leagueList.map(league => ({
    league,
    count: clubs.filter(club => club.league === league).length })),
  {
    league: restLabel,
    count: clubs.filter(club => !leagueList.includes(club.league)).length }];


  const total = Math.min(uniqueIds.length, clubPool.length);
  const percent = Math.min(100, Math.round(total / Math.max(clubPool.length, 1) * 100));

  return {
    total,
    percent,
    byLeague,
    recent: clubs.slice(-8).reverse(),
    totalClubs: clubPool.length };

}


const CLUB_COLLECTION_STYLES = {
  card: {
    display: "grid",
    gap: "12px",
    padding: "14px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035))",
    boxShadow: "0 14px 30px rgba(0,0,0,0.18)" },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap" },

  title: {
    display: "flex",
    flexDirection: "column",
    gap: "2px" },

  eyebrow: {
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    opacity: 0.7 },

  count: {
    fontSize: "1rem",
    fontWeight: 800 },

  percent: {
    minWidth: "58px",
    textAlign: "center",
    padding: "7px 10px",
    borderRadius: "999px",
    background: "rgba(105, 211, 111, 0.14)",
    border: "1px solid rgba(105, 211, 111, 0.28)",
    color: "#78e27e",
    fontWeight: 900 },

  bar: {
    height: "9px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.09)" },

  fill: percent => ({
    height: "100%",
    width: `${Math.max(0, Math.min(100, percent))}%`,
    borderRadius: "999px",
    background: "linear-gradient(90deg, #35c765, #9af06f)",
    transition: "width 0.35s ease" }),

  leagueGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
    gap: "8px" },

  leaguePill: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    padding: "9px 10px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.16)",
    border: "1px solid rgba(255,255,255,0.07)",
    fontSize: "0.86rem" },

  leagueCount: {
    fontWeight: 900,
    color: "#ffffff" },

  note: {
    opacity: 0.72,
    lineHeight: 1.35 } };



function getLeagueIcon(league) {
  const icons = {
    "Premier League": "PL",
    "La Liga": "LL",
    Bundesliga: "BL",
    "Serie A": "SA",
    "Ligue 1": "L1",
    "Rest of Europe": "EU" };


  return icons[league] || "EU";
}

function renderClubCollectionCard(collectionStats, options = {}) {
  const { showNoRepeat = false, usedClubIds = [] } = options;
  const totalClubs = collectionStats.totalClubs || ALL_CLUBS.length;
  const discoveredText = `${collectionStats.total} / ${totalClubs} nations discovered`;

  return /*#__PURE__*/React.createElement(
  "section",
  { className: "collection-panel club-collection-card", style: CLUB_COLLECTION_STYLES.card }, /*#__PURE__*/
  React.createElement("div", { style: CLUB_COLLECTION_STYLES.header }, /*#__PURE__*/
  React.createElement("div", { style: CLUB_COLLECTION_STYLES.title }, /*#__PURE__*/
  React.createElement("span", { style: CLUB_COLLECTION_STYLES.eyebrow }, "Nation Collection"), /*#__PURE__*/
  React.createElement("strong", { style: CLUB_COLLECTION_STYLES.count }, discoveredText)), /*#__PURE__*/
  React.createElement("span", { style: CLUB_COLLECTION_STYLES.percent }, collectionStats.percent, "%")), /*#__PURE__*/

  React.createElement("div", { className: "collection-bar", style: CLUB_COLLECTION_STYLES.bar }, /*#__PURE__*/
  React.createElement("div", {
    className: "collection-fill",
    style: CLUB_COLLECTION_STYLES.fill(collectionStats.percent) })),
  /*#__PURE__*/

  React.createElement("div", { className: "league-collection-mini", style: CLUB_COLLECTION_STYLES.leagueGrid },
  collectionStats.byLeague.map(item => /*#__PURE__*/React.createElement(
  "span",
  { key: item.league, style: CLUB_COLLECTION_STYLES.leaguePill }, /*#__PURE__*/
  React.createElement("span", null, getLeagueIcon(item.league), " ", item.league), /*#__PURE__*/
  React.createElement("strong", { style: CLUB_COLLECTION_STYLES.leagueCount }, item.count)))),


  showNoRepeat && usedClubIds.length > 0 && /*#__PURE__*/React.createElement(
  "small",
  { style: CLUB_COLLECTION_STYLES.note },
  "No-repeat active: ", usedClubIds.length, " drafted club", usedClubIds.length === 1 ? "" : "s", " locked out this run."));


}

function buildSchedule() {
  const home = shuffleArray(OPPONENTS);
  const away = shuffleArray(OPPONENTS);
  return home.concat(away).slice(0, 38);
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

  if (positions.includes("LM") || positions.includes("RM")) {
    base.midfield += rating * 0.2;
    base.chance += rating * 0.12;
    base.control += rating * 0.12;
    base.defense += rating * 0.08;
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
    ["CDM", "CM", "CAM", "LM", "RM"].includes(p.slotLabel)),

    defense: avg((p) =>
    ["RB", "CB", "LB", "CDM"].includes(p.slotLabel)),

    control: avg((p) =>
    ["CDM", "CM", "CAM", "LM", "RM"].includes(p.slotLabel)),

    chance: avg((p) =>
    ["CAM", "LM", "RM", "LW", "RW", "ST"].includes(p.slotLabel)),

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
    mids: stats.filter(p => ["CM", "CDM", "CAM", "LM", "RM"].includes(p.position)),
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

      if (ga === 0 && ["GK", "RB", "CB", "LB", "CDM", "LM", "RM"].includes(player.position)) {
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


function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function seededRandom(seed) {
  const x = Math.sin(seed * 999.91) * 10000;
  return x - Math.floor(x);
}

function simulateOpponentSeason(teamName, rating, week, index, seasonSeed = 1) {
  let wins = 0;
  let draws = 0;
  let losses = 0;

  // Calibrated AI title-race model.
  // Elite AI teams can still win 90+ points, but the table no longer buries
  // a solid 86-88 user XI into mid-table every time.
  const clubPersonality = (seededRandom(seasonSeed + index * 47 + 11) - 0.5) * 0.08;
  const seasonForm = (seededRandom(seasonSeed + index * 131 + 29) - 0.5) * 0.09;
  const titleRaceBoost =
  rating >= 90 ? 0.026 + seededRandom(seasonSeed + index * 211 + 7) * 0.032 :
  rating >= 88 ? 0.01 + seededRandom(seasonSeed + index * 211 + 7) * 0.018 :
  0;

  for (let match = 1; match <= week; match++) {
    const formWave = Math.sin((match + index * 2.7 + seasonSeed % 17) / 5) * 0.035;
    const gameNoise = (seededRandom(seasonSeed + index * 73 + match * 19) - 0.5) * 0.13;

    let winChance =
    0.392 +
    (rating - 82) * 0.022 +
    clubPersonality +
    seasonForm +
    titleRaceBoost +
    formWave +
    gameNoise;

    let drawChance =
    0.23 -
    (rating - 82) * 0.006 +
    (seededRandom(seasonSeed + index * 31 + match * 7) - 0.5) * 0.045;

    winChance = clampNumber(winChance, 0.18, rating >= 90 ? 0.76 : rating >= 88 ? 0.71 : 0.65);
    drawChance = clampNumber(drawChance, 0.08, 0.28);

    const roll = seededRandom(seasonSeed + index * 997 + match * 101 + Math.round(rating * 13));

    if (roll < winChance) wins += 1;else
    if (roll < winChance + drawChance) draws += 1;else
    losses += 1;
  }

  return {
    team: teamName,
    played: week,
    wins,
    draws,
    losses,
    points: wins * 3 + draws };

}

function buildLiveLeagueTable(matches, yourTeamName = "Draft XI", seasonSeed = 1) {
  const week = Math.min(38, Math.max(matches.length, 1));
  const yourWins = matches.filter(m => m.result === "W").length;
  const yourDraws = matches.filter(m => m.result === "D").length;
  const yourLosses = matches.filter(m => m.result === "L").length;
  const yourPts = yourWins * 3 + yourDraws;

  const rows = OPPONENTS.slice(0, 19).map(([name, rating], index) =>
  simulateOpponentSeason(name, rating, week, index, seasonSeed));


  rows.push({
    team: yourTeamName,
    played: week,
    wins: yourWins,
    draws: yourDraws,
    losses: yourLosses,
    points: yourPts,
    user: true });


  return rows.
  sort(
  (a, b) =>
  b.points - a.points ||
  b.wins - a.wins ||
  a.losses - b.losses ||
  seededRandom(seasonSeed + a.team.length * 17) - seededRandom(seasonSeed + b.team.length * 17) ||
  a.team.localeCompare(b.team)).

  map((row, index) => ({ ...row, position: index + 1 }));
}

function calculateSeasonAwards(summary, playerStats) {
  if (!playerStats.length) return [];

  const topScorer = [...playerStats].sort((a, b) => b.goals - a.goals || b.averageRating - a.averageRating)[0];
  const topAssister = [...playerStats].sort((a, b) => b.assists - a.assists || b.averageRating - a.averageRating)[0];
  const mvp = [...playerStats].sort((a, b) => b.averageRating - a.averageRating || b.goals - a.goals)[0];
  const goldenGlove = [...playerStats].
  filter(p => p.position === "GK").
  sort((a, b) => b.cleanSheets - a.cleanSheets || b.averageRating - a.averageRating)[0];
  const awards = summary.tournamentMode ? [
  { icon: "🏆", title: "Golden Ball", value: `${mvp.name} - ${mvp.averageRating} AVG` },
  { icon: "👟", title: "Golden Boot", value: `${topScorer.name} - ${topScorer.goals} goals` },
  { icon: "🎯", title: "Playmaker Award", value: `${topAssister.name} - ${topAssister.assists} assists` }] :
  [
  { icon: "Award", title: "Player of the Season", value: `${mvp.name} - ${mvp.averageRating} AVG` },
  { icon: "Award", title: "Golden Boot", value: `${topScorer.name} - ${topScorer.goals} goals` },
  { icon: "Award", title: "Assist King", value: `${topAssister.name} - ${topAssister.assists} assists` }];


  if (goldenGlove) {
    awards.push({ icon: summary.tournamentMode ? "🧤" : "Award", title: "Golden Glove", value: `${goldenGlove.name} - ${goldenGlove.cleanSheets} clean sheets` });
  }


  if (summary.tournamentMode && summary.wonWorldCup) {
    awards.unshift({ icon: "🌍", title: "World Cup Winners", value: "Lifted the trophy" });
  } else if (summary.wins === 38) {
    awards.unshift({ icon: "Award", title: "Perfect Season", value: "38 wins from 38 matches" });
  }

  return awards;
}

function makeHistoryEntry(summary, playerStats, formationName, teamRating) {
  const topScorer = [...playerStats].sort((a, b) => b.goals - a.goals)[0];
  const mvp = [...playerStats].sort((a, b) => b.averageRating - a.averageRating)[0];

  return {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    date: new Date().toLocaleDateString(),
    formation: formationName,
    teamRating,
    record: `${summary.wins}-${summary.draws}-${summary.losses}`,
    points: summary.points,
    badge: summary.badge,
    topScorer: topScorer ? `${topScorer.name} (${topScorer.goals})` : "None",
    mvp: mvp ? `${mvp.name} (${mvp.averageRating})` : "None" };

}



function getProjectedLevel(teamRating) {
  if (teamRating >= 94) return "Superteam";
  if (teamRating >= 92) return "38-0 Threat";
  if (teamRating >= 90) return "Title Contender";
  if (teamRating >= 87) return "Top Four Quality";
  if (teamRating >= 84) return "Competitive XI";
  return "Work in Progress";
}

function makeShareCardText(results, playerSeasonStats, formationName, teamRating) {var _results$table$find;
  if (!results) return "";
  const topScorer = [...playerSeasonStats].sort((a, b) => b.goals - a.goals || b.averageRating - a.averageRating)[0];
  const mvp = [...playerSeasonStats].sort((a, b) => b.averageRating - a.averageRating || b.goals - a.goals)[0];
  const tablePosition = Array.isArray(results.table) ? (_results$table$find = results.table.find(row => row.user)) === null || _results$table$find === void 0 ? void 0 : _results$table$find.position : null;
  const positionText = tablePosition ? `League Finish: ${tablePosition}${tablePosition === 1 ? "st" : tablePosition === 2 ? "nd" : tablePosition === 3 ? "rd" : "th"}` : "League Finish: --";

  return [
  "Draft XI",
  "",
  `Formation: ${formationName}`,
  `XI Rating: ${teamRating || "--"}`,
  `Record: ${results.wins}-${results.draws}-${results.losses}`,
  `Points: ${results.points}`,
  `Goals: ${results.gf}-${results.ga}`,
  positionText,
  `Top Scorer: ${topScorer ? `${topScorer.name} (${topScorer.goals})` : "None"}`,
  `MVP: ${mvp ? `${mvp.name} (${mvp.averageRating} AVG)` : "None"}`,
  results.badge,
  "",
  "Can you beat my XI?",
  "Play at https://draftxi.xyz"].
  join("\n");
}



// v5 Simulation Rework  xG first, result second.
// Goals now create the result instead of W/D/L being decided before scorelines.
function getFormationModifier(formationName) {
  const modifiers = {
    "4-3-3": { attack: 1.08, defense: 0.96, midfield: 1.03, control: 1.02, chance: 1.08 },
    "4-4-2": { attack: 1.01, defense: 1.04, midfield: 1.00, control: 0.98, chance: 1.00 },
    "3-4-3": { attack: 1.12, defense: 0.9, midfield: 1.02, control: 1.00, chance: 1.1 },
    "4-2-3-1": { attack: 1.05, defense: 1.06, midfield: 1.05, control: 1.07, chance: 1.05 },
    "3-5-2": { attack: 1.03, defense: 0.96, midfield: 1.1, control: 1.12, chance: 1.02 },
    "4-1-2-1-2": { attack: 1.04, defense: 1.04, midfield: 1.08, control: 1.08, chance: 1.03 } };


  return modifiers[formationName] || { attack: 1, defense: 1, midfield: 1, control: 1, chance: 1 };
}

function applyFormationModifier(profile, formationName) {
  const mod = getFormationModifier(formationName);

  return {
    ...profile,
    attack: profile.attack * mod.attack,
    defense: profile.defense * mod.defense,
    midfield: profile.midfield * mod.midfield,
    control: profile.control * mod.control,
    chance: profile.chance * mod.chance };

}

const OPPONENT_TACTICS = {
  "Manchester City": { style: "possession press", attack: 3, midfield: 5, defense: 2, control: 5, chance: 4, keeping: 1, tempo: 0.98, risk: 1.02, lowBlock: 0, setPiece: 0 },
  "Real Madrid": { style: "elite transitions", attack: 5, midfield: 3, defense: 1, control: 2, chance: 4, keeping: 1, tempo: 1.04, risk: 1.05, lowBlock: 0, setPiece: 1 },
  "Bayern Munich": { style: "high tempo press", attack: 5, midfield: 3, defense: 1, control: 2, chance: 4, keeping: 1, tempo: 1.08, risk: 1.06, lowBlock: 0, setPiece: 0 },
  Liverpool: { style: "gegenpress", attack: 4, midfield: 2, defense: 2, control: 1, chance: 4, keeping: 1, tempo: 1.1, risk: 1.05, lowBlock: 0, setPiece: 1 },
  Barcelona: { style: "tiki-taka", attack: 3, midfield: 5, defense: 1, control: 5, chance: 3, keeping: 0, tempo: 0.96, risk: 1.01, lowBlock: 0, setPiece: 0 },
  Arsenal: { style: "positional attack", attack: 3, midfield: 4, defense: 2, control: 4, chance: 3, keeping: 1, tempo: 1.0, risk: 1.02, lowBlock: 0, setPiece: 0 },
  "Inter Milan": { style: "structured counter", attack: 2, midfield: 2, defense: 5, control: 1, chance: 2, keeping: 3, tempo: 0.94, risk: 0.96, lowBlock: 2, setPiece: 2 },
  PSG: { style: "star forwards", attack: 5, midfield: 2, defense: 0, control: 1, chance: 4, keeping: 1, tempo: 1.04, risk: 1.08, lowBlock: 0, setPiece: 0 },
  "Manchester United": { style: "direct attack", attack: 3, midfield: 1, defense: 1, control: 0, chance: 3, keeping: 2, tempo: 1.05, risk: 1.05, lowBlock: 0, setPiece: 1 },
  Chelsea: { style: "compact power", attack: 1, midfield: 2, defense: 4, control: 1, chance: 1, keeping: 3, tempo: 0.95, risk: 0.97, lowBlock: 2, setPiece: 2 },
  "Atletico Madrid": { style: "low block", attack: 1, midfield: 1, defense: 5, control: 0, chance: 1, keeping: 3, tempo: 0.9, risk: 0.92, lowBlock: 4, setPiece: 3 },
  "AC Milan": { style: "balanced elite", attack: 2, midfield: 3, defense: 3, control: 2, chance: 2, keeping: 2, tempo: 0.98, risk: 0.99, lowBlock: 1, setPiece: 1 },
  Napoli: { style: "fluid front three", attack: 4, midfield: 3, defense: 1, control: 2, chance: 4, keeping: 1, tempo: 1.06, risk: 1.04, lowBlock: 0, setPiece: 0 },
  "Borussia Dortmund": { style: "vertical press", attack: 4, midfield: 2, defense: 0, control: 1, chance: 3, keeping: 0, tempo: 1.1, risk: 1.08, lowBlock: 0, setPiece: 0 },
  "Bayer Leverkusen": { style: "control and wingbacks", attack: 3, midfield: 4, defense: 2, control: 4, chance: 3, keeping: 1, tempo: 1.02, risk: 1.02, lowBlock: 0, setPiece: 1 },
  Juventus: { style: "defensive control", attack: 1, midfield: 2, defense: 5, control: 2, chance: 1, keeping: 3, tempo: 0.92, risk: 0.94, lowBlock: 3, setPiece: 2 },
  Tottenham: { style: "transition attack", attack: 3, midfield: 1, defense: 1, control: 0, chance: 3, keeping: 1, tempo: 1.06, risk: 1.04, lowBlock: 0, setPiece: 1 },
  "RB Leipzig": { style: "press and transition", attack: 3, midfield: 2, defense: 1, control: 1, chance: 3, keeping: 0, tempo: 1.09, risk: 1.05, lowBlock: 0, setPiece: 0 },
  Newcastle: { style: "physical transition", attack: 2, midfield: 2, defense: 3, control: 1, chance: 2, keeping: 2, tempo: 1.02, risk: 1.0, lowBlock: 1, setPiece: 3 },
  "Aston Villa": { style: "high line transition", attack: 3, midfield: 2, defense: 1, control: 1, chance: 3, keeping: 1, tempo: 1.04, risk: 1.05, lowBlock: 0, setPiece: 1 },
  Roma: { style: "compact counter", attack: 2, midfield: 1, defense: 3, control: 0, chance: 2, keeping: 1, tempo: 0.95, risk: 0.98, lowBlock: 2, setPiece: 2 },
  Monaco: { style: "fast attack", attack: 4, midfield: 1, defense: 0, control: 0, chance: 3, keeping: 0, tempo: 1.08, risk: 1.07, lowBlock: 0, setPiece: 0 },
  Marseille: { style: "aggressive press", attack: 2, midfield: 2, defense: 1, control: 1, chance: 2, keeping: 1, tempo: 1.04, risk: 1.03, lowBlock: 0, setPiece: 1 },
  Lyon: { style: "technical midfield", attack: 2, midfield: 4, defense: 1, control: 3, chance: 2, keeping: 1, tempo: 0.99, risk: 1.0, lowBlock: 0, setPiece: 1 } };


function makeOpponentProfile(opponentName, opponentRating) {
  const tactic = OPPONENT_TACTICS[opponentName] || {
    style: "balanced",
    attack: 1,
    midfield: 1,
    defense: 1,
    control: 1,
    chance: 1,
    keeping: 1,
    tempo: 1,
    risk: 1,
    lowBlock: 0,
    setPiece: 0 };


  const variance = () => Math.floor(Math.random() * 3) - 1;

  return {
    style: tactic.style,
    attack: opponentRating + tactic.attack + variance(),
    midfield: opponentRating + tactic.midfield + variance(),
    defense: opponentRating + tactic.defense + variance(),
    control: opponentRating + tactic.control + variance(),
    chance: opponentRating + tactic.chance + variance(),
    keeping: opponentRating + tactic.keeping + variance(),
    tempo: tactic.tempo,
    risk: tactic.risk,
    lowBlock: tactic.lowBlock,
    setPiece: tactic.setPiece };

}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getExpectedGoals(attackingProfile, defendingProfile, attackingRating, defendingRating) {
  const attackEdge = attackingProfile.attack - defendingProfile.defense;
  const midfieldEdge = attackingProfile.midfield - defendingProfile.midfield;
  const chanceEdge = attackingProfile.chance - defendingProfile.keeping;
  const controlEdge = attackingProfile.control - defendingProfile.control;
  const ratingEdge = attackingRating - defendingRating;

  // Fairer xG curve for the 100-club database.
  // The average draft is usually 85-89, so the engine should not require
  // a 92+ superteam just to have a strong season.
  const baseXg =
  1.38 +
  ratingEdge * 0.05 +
  attackEdge * 0.024 +
  midfieldEdge * 0.016 +
  chanceEdge * 0.02 +
  controlEdge * 0.01 +
  (attackingProfile.balanceBonus || 0) * 0.04 +
  (attackingProfile.setPiece || 0) * 0.022;

  const tempo = attackingProfile.tempo || 1;
  const risk = attackingProfile.risk || 1;
  const lowBlockDrag = (defendingProfile.lowBlock || 0) * 0.045;
  const rawXg = baseXg * tempo * risk - lowBlockDrag;

  return clamp(rawXg, 0.32, 4.45);
}

function rollGoalsFromXg(xg) {
  // Poisson-style goal generator. This keeps 0-0, 1-0, 2-1, and 4-2 type results natural.
  const limit = Math.exp(-xg);
  let goals = 0;
  let product = 1;

  do {
    goals += 1;
    product *= Math.random();
  } while (product > limit && goals < 8);

  return Math.max(0, goals - 1);
}

function rollGoalsFromWeightedXg(xg, attackRating = 85, defenseRating = 85) {
  // xG should drive the score, but finishing/keeping still matter.
  // Small triangular noise keeps football variance without making xG feel pointless.
  const finishingEdge = attackRating - defenseRating;
  const finishingBonus = clamp(finishingEdge * 0.015, -0.28, 0.32);
  const smallVariance = (Math.random() + Math.random() - 1) * 0.28;
  const adjustedXg = clamp(xg + finishingBonus + smallVariance, 0.12, 5.25);

  let goals = rollGoalsFromXg(adjustedXg);

  // A team creating strong chances should rarely blank completely.
  if (goals === 0 && adjustedXg >= 2.2 && Math.random() < 0.72) goals = 1;
  if (goals === 0 && adjustedXg >= 1.7 && Math.random() < 0.48) goals = 1;

  return goals;
}

function applyXgResultWeight(us, them, userXg, opponentXg, fullRating, opponentRating) {
  // Final fairness layer: xG is not everything, but a big xG edge should strongly
  // influence W/D/L. This prevents the game from repeatedly showing unfair losses
  // where Draft XI dominates chances but drops points every time.
  const xgEdge = userXg - opponentXg;
  const ratingEdge = fullRating - opponentRating;

  if (xgEdge > 0.25) {
    const ratingHelp = clamp(ratingEdge * 0.015, -0.08, 0.12);

    if (us < them) {
      const saveLossChance =
      xgEdge >= 2.0 ? 0.96 :
      xgEdge >= 1.5 ? 0.9 :
      xgEdge >= 1.0 ? 0.76 :
      xgEdge >= 0.65 ? 0.58 :
      0.36;

      if (Math.random() < saveLossChance + ratingHelp) {
        us = them;

        const turnIntoWinChance =
        xgEdge >= 2.0 ? 0.58 :
        xgEdge >= 1.5 ? 0.42 :
        xgEdge >= 1.0 ? 0.26 :
        0.12;

        if (Math.random() < turnIntoWinChance + ratingHelp) us += 1;
      }
    }

    if (us === them) {
      const winFromDrawChance =
      xgEdge >= 2.0 ? 0.68 :
      xgEdge >= 1.5 ? 0.52 :
      xgEdge >= 1.0 ? 0.36 :
      xgEdge >= 0.65 ? 0.22 :
      0.1;

      if (Math.random() < winFromDrawChance + ratingHelp) us += 1;
    }
  }

  // Opponents still get upsets, but only when the xG gap is small enough to feel believable.
  if (opponentXg - userXg >= 1.4 && them <= us && Math.random() < 0.34) {
    them = us + 1;
  }

  return { us, them };
}

function getWeightedScorer(players, preferredRoles) {
  const preferred = players.filter(player => preferredRoles.includes(player.slotLabel || player.position));
  const source = preferred.length ? preferred : players;
  const total = source.reduce((sum, player) => {var _player$finalRating3;
    const rating = (_player$finalRating3 = player.finalRating) !== null && _player$finalRating3 !== void 0 ? _player$finalRating3 : player.rating;
    const role = player.slotLabel || player.position;
    const roleBoost = ["ST", "LW", "RW"].includes(role) ? 1.35 : ["CAM", "LM", "RM"].includes(role) ? 1.15 : 1;
    return sum + Math.max(1, rating - 62) * roleBoost;
  }, 0);

  let roll = Math.random() * total;

  for (const player of source) {var _player$finalRating4;
    const rating = (_player$finalRating4 = player.finalRating) !== null && _player$finalRating4 !== void 0 ? _player$finalRating4 : player.rating;
    const role = player.slotLabel || player.position;
    const roleBoost = ["ST", "LW", "RW"].includes(role) ? 1.35 : ["CAM", "LM", "RM"].includes(role) ? 1.15 : 1;
    roll -= Math.max(1, rating - 62) * roleBoost;
    if (roll <= 0) return player;
  }

  return source[source.length - 1];
}


function getWeightedTeamScorer(teamName, xg) {
  const normalize = value => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const allTeams = [...WORLD_CUP_CLUBS, ...ALL_CLUBS];
  const team = allTeams.find(club => normalize(club.name) === normalize(teamName));

  if (!team || !Array.isArray(team.players) || team.players.length === 0) {
    const role = getOpponentScorerRole(xg);
    return {
      team: teamName,
      name: `${teamName} ${role}`,
      position: role.split(" ").map(word => word[0]).join("") };

  }

  const players = team.players.map((player, index) => ({
    id: `${team.id || team.name}_${index}_${player[0]}`,
    name: player[0],
    position: player[1],
    rating: player[2],
    finalRating: player[2] }));


  const scorer = getWeightedScorer(players, ["ST", "LW", "RW", "CAM", "LM", "RM", "CM"]);
  return {
    team: teamName,
    name: scorer.name,
    position: scorer.position };

}

function getOpponentScorerRole(xg) {
  const attackingRoles = ["Striker", "Left Winger", "Right Winger", "Attacking Midfielder", "Central Midfielder"];
  const defensiveRoles = ["Centre Back", "Defensive Midfielder"];

  if (Math.random() < Math.min(0.16, 0.05 + xg * 0.025)) {
    return defensiveRoles[Math.floor(Math.random() * defensiveRoles.length)];
  }

  return attackingRoles[Math.floor(Math.random() * attackingRoles.length)];
}

function getGoalMinute() {
  // Slightly favors middle/late goals without making injury-time goals too common.
  const roll = Math.random();
  if (roll < 0.18) return Math.floor(Math.random() * 20) + 3;
  if (roll < 0.72) return Math.floor(Math.random() * 45) + 21;
  return Math.floor(Math.random() * 24) + 66;
}


function App() {var _results$table, _selectedMatch$scorer, _selectedMatch$oppone, _selectedMatch$allSco;
  const savedProgress = getStoredJson("draftXIProgressV4", null) || {};
  const savedFormationName = FORMATIONS[savedProgress.selectedFormationName] ? savedProgress.selectedFormationName : DEFAULT_FORMATION_NAME;
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedFormationName, setSelectedFormationName] = useState(savedFormationName);
  const [currentClub, setCurrentClub] = useState(savedProgress.currentClub || null);
  const [draft, setDraft] = useState(savedProgress.draft || {});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [pickedNames, setPickedNames] = useState(savedProgress.pickedNames || []);
  const [spinning, setSpinning] = useState(false);
  const [spinWinner, setSpinWinner] = useState(null);
  const [spinReel, setSpinReel] = useState([]);
  const [spinOffset, setSpinOffset] = useState(0);
  const [spinTargetIndex, setSpinTargetIndex] = useState(-1);
  const [spinReady, setSpinReady] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const spinFinishedRef = useRef(false);
  const spinFallbackRef = useRef(null);
  const [lastClubId, setLastClubId] = useState(savedProgress.lastClubId || null);
  const [recentClubIds, setRecentClubIds] = useState(savedProgress.recentClubIds || []);
  const [usedClubIds, setUsedClubIds] = useState(savedProgress.usedClubIds || []);
  const [simulating, setSimulating] = useState(false);
  const [liveMatch, setLiveMatch] = useState(null);
  const [liveSeason, setLiveSeason] = useState(null);
  const [simProgress, setSimProgress] = useState(0);
  const [lastPlacedSlot, setLastPlacedSlot] = useState(null);
  const [results, setResults] = useState(savedProgress.results || null);
  const [rerollsLeft, setRerollsLeft] = useState(Number.isFinite(savedProgress.rerollsLeft) ? savedProgress.rerollsLeft : 1);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [soundMuted, setSoundMuted] = useState(false);
  const [rewards, setRewards] = useState(savedProgress.rewards || []);
  const [playerSeasonStats, setPlayerSeasonStats] = useState(savedProgress.playerSeasonStats || []);
  const [seasonAwards, setSeasonAwards] = useState(savedProgress.seasonAwards || []);
  const [liveLeagueTable, setLiveLeagueTable] = useState(savedProgress.liveLeagueTable || []);
  const [transferMode, setTransferMode] = useState(false);
  const [transferUsed, setTransferUsed] = useState(!!savedProgress.transferUsed);
  const [bench, setBench] = useState(savedProgress.bench || []);
  const [substituteMode, setSubstituteMode] = useState(false);
  const [substituteUsed, setSubstituteUsed] = useState(!!savedProgress.substituteUsed);
  const [selectedBenchId, setSelectedBenchId] = useState(null);
  const [draftHistory, setDraftHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("draftXIHistory") || "[]");
    } catch (error) {
      return [];
    }
  });
  const [movingSlotId, setMovingSlotId] = useState(null);
  const [clubCollection, setClubCollection] = useState(() => savedProgress.clubCollection || getStoredJson("draftXIClubCollection", []));
  const [playerCollection, setPlayerCollection] = useState(() => getStoredJson(PLAYER_COLLECTION_KEY, []));
  const [showPlayerCollection, setShowPlayerCollection] = useState(false);
  const [isMobileFormation, setIsMobileFormation] = useState(() => window.innerWidth <= 768);
  const [showTutorial, setShowTutorial] = useState(() => !getStoredJson("draftXITutorialSeen", false));
  const [saveNotice, setSaveNotice] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [formationNotice, setFormationNotice] = useState(null);
  const [gameMode, setGameMode] = useState(savedProgress.gameMode || "europe");
  const activeClubs = gameMode === "worldcup" ? getWorldCupBoostedClubs() : ALL_CLUBS;
  const activeLeagues = gameMode === "worldcup" ? WORLD_CUP_GROUPS : TOP_FIVE_LEAGUES;
  const activeRestLabel = gameMode === "worldcup" ? "Other Groups" : "Rest of Europe";
  const allCollectiblePlayers = useMemo(() => getAllCollectiblePlayers([...ALL_CLUBS, ...WORLD_CUP_CLUBS]), []);
  const playerCollectionStats = useMemo(() => getCollectionStats(playerCollection, allCollectiblePlayers), [playerCollection, allCollectiblePlayers]);
  const discoveredPlayerIds = useMemo(() => new Set(playerCollection || []), [playerCollection]);
  const modeTitle = gameMode === "worldcup" ? "World Cup Draft" : "Draft XI";
  const modeSubtitle = "Build the greatest football squad ever assembled.";

  function closeTutorial() {
    setShowTutorial(false);
    saveStoredJson("draftXITutorialSeen", true);
  }

  useEffect(() => {
    function handleFormationResize() {
      setIsMobileFormation(window.innerWidth <= 768);
    }

    handleFormationResize();
    window.addEventListener("resize", handleFormationResize);
    return () => window.removeEventListener("resize", handleFormationResize);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    const progress = {
      gameStarted,
      gameMode,
      selectedFormationName,
      currentClub,
      draft,
      pickedNames,
      lastClubId,
      recentClubIds,
      usedClubIds,
      results,
      rerollsLeft,
      rewards,
      seasonAwards,
      liveLeagueTable,
      playerSeasonStats,
      transferUsed,
      bench,
      substituteUsed,
      clubCollection };

    saveStoredJson("draftXIProgressV4", progress);
  }, [gameStarted, gameMode, selectedFormationName, currentClub, draft, pickedNames, lastClubId, recentClubIds, usedClubIds, results, rerollsLeft, rewards, seasonAwards, liveLeagueTable, playerSeasonStats, transferUsed, bench, substituteUsed, clubCollection]);

  useEffect(() => {
    if (!saveNotice) return;
    const timeout = window.setTimeout(() => setSaveNotice(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [saveNotice]);

  useEffect(() => {
    saveStoredJson(PLAYER_COLLECTION_KEY, playerCollection);
  }, [playerCollection]);

  function addPlayerToCollection(player) {
    if (!player) return;
    const id = getPlayerCollectionId(player);
    setPlayerCollection(prev => {
      if ((prev || []).includes(id)) return prev;
      return [...(prev || []), id];
    });
  }


  const controlsRef = useRef(null);
  const spinnerRef = useRef(null);
  const spinnerWindowRef = useRef(null);
  const clubPanelRef = useRef(null);
  const pitchRef = useRef(null);
  const simulationRef = useRef(null);
  const simulationRecordRef = useRef(null);
  const resultsRef = useRef(null);

  function scrollToSection(ref, block = "center") {
    window.requestAnimationFrame(() => {var _ref$current;
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollIntoView({
        behavior: "smooth",
        block });

    });
  }

  const FORMATION = FORMATIONS[selectedFormationName] || FORMATIONS[DEFAULT_FORMATION_NAME];
  const draftedPlayers = Object.values(draft);
  const BENCH_LIMIT = 3;
  const benchDraftActive = !results && draftedPlayers.length >= 11 && bench.length < BENCH_LIMIT;
  const fullSquadReady = draftedPlayers.length >= 11 && bench.length >= BENCH_LIMIT;
  const selectedBenchPlayer = bench.find(player => player.benchId === selectedBenchId) || null;
  const collectionStats = useMemo(() => getClubCollectionStats(clubCollection, activeClubs, activeLeagues, activeRestLabel), [clubCollection, gameMode]);

  useEffect(() => {
    if (!spinning || !spinReel.length || spinTargetIndex < 0) return;

    setSpinReady(false);

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        const spinnerWindow = spinnerWindowRef.current;
        if (!spinnerWindow) return;

        const targetCard = spinnerWindow.querySelector(`[data-spin-index="${spinTargetIndex}"]`);
        if (!targetCard) return;

        const windowWidth = spinnerWindow.clientWidth || spinnerWindow.getBoundingClientRect().width || 320;
        const cardWidth = targetCard.offsetWidth || targetCard.getBoundingClientRect().width || 160;
        const winnerCenter = targetCard.offsetLeft + cardWidth / 2;
        const nextOffset = Math.max(0, winnerCenter - windowWidth / 2);

        setSpinOffset(nextOffset);
        setSpinKey(prev => prev + 1);
        setSpinReady(true);
      });

      spinnerWindowRef.current && (spinnerWindowRef.current.dataset.secondFrame = String(secondFrame));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      const secondFrame = Number(spinnerWindowRef.current && spinnerWindowRef.current.dataset.secondFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [spinning, spinReel, spinTargetIndex]);

  useEffect(() => {
    if (!spinning || !spinReady || !spinWinner) return;

    if (spinFallbackRef.current) {
      window.clearTimeout(spinFallbackRef.current);
    }

    spinFallbackRef.current = window.setTimeout(() => {
      finishSpin(spinWinner);
    }, 2900);

    return () => {
      if (spinFallbackRef.current) {
        window.clearTimeout(spinFallbackRef.current);
        spinFallbackRef.current = null;
      }
    };
  }, [spinning, spinReady, spinWinner, spinKey]);

  const teamRating = useMemo(() => {
    if (!draftedPlayers.length) return 0;
    return Math.round(
    draftedPlayers.reduce((sum, player) => sum + player.finalRating, 0) / draftedPlayers.length);

  }, [draft]);

  const availablePlayers = currentClub ? makePlayers(currentClub) : [];


  function selectGameMode(mode) {
    if (mode === gameMode) return;
    setGameMode(mode);
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
    setUsedClubIds([]);
    setResults(null);
    setRerollsLeft(1);
    setSelectedMatch(null);
    setRewards([]);
    setSeasonAwards([]);
    setLiveLeagueTable([]);
    setPlayerSeasonStats([]);
    setTransferMode(false);
    setTransferUsed(false);
    setBench([]);
    setSubstituteMode(false);
    setSubstituteUsed(false);
    setSelectedBenchId(null);
    setMovingSlotId(null);
    setFormationNotice(null);
    setClubCollection([]);
  }

  function getSlotLabelForFormation(formationName, slotId) {var _slots$find;
    const slots = FORMATIONS[formationName] || FORMATIONS[DEFAULT_FORMATION_NAME];
    return ((_slots$find = slots.find(slot => slot.id === slotId)) === null || _slots$find === void 0 ? void 0 : _slots$find.label) || slotId;
  }

  function getPenaltyForFormation(player, formationName, slotId) {
    const slotPosition = getSlotLabelForFormation(formationName, slotId);
    const listedPositions = player.positions || [player.position];

    if (player.position === slotPosition) return 0;
    if (listedPositions.includes(slotPosition)) return 0;
    if (listedPositions.some(position => isNoPenaltyMidfieldSwap(position, slotPosition))) return 0;
    if (canPlaySlot(player, slotPosition)) return 2;

    return 5;
  }

  function autoFitDraftToFormation(players, formationName) {
    const slots = FORMATIONS[formationName] || FORMATIONS[DEFAULT_FORMATION_NAME];
    const nextDraft = {};
    const remainingPlayers = [...players];

    function bestPlayerForSlot(slot) {
      let bestIndex = -1;
      let bestScore = -Infinity;

      remainingPlayers.forEach((player, index) => {
        const possiblePositions = player.positions || [player.position];
        const exact = possiblePositions.includes(slot.label) || player.position === slot.label;
        const noPenaltyMidfieldFit = possiblePositions.some(position => isNoPenaltyMidfieldSwap(position, slot.label));
        const compatible = canPlaySlot(player, slot.label);
        const penalty = exact || noPenaltyMidfieldFit ? 0 : compatible ? 2 : 5;
        const score = player.rating * 10 - penalty * 25 + (exact || noPenaltyMidfieldFit ? 80 : compatible ? 25 : 0);

        if (score > bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      });

      if (bestIndex < 0) return null;
      const player = remainingPlayers.splice(bestIndex, 1)[0];
      const penalty = getPenaltyForFormation(player, formationName, slot.id);

      return {
        ...player,
        slotId: slot.id,
        slotLabel: slot.label,
        penalty,
        finalRating: Math.max(60, player.rating - penalty) };
    }

    const prioritySlots = [...slots].sort((a, b) => {
      const order = { GK: 0, ST: 1, CB: 2, RB: 3, LB: 3, CDM: 4, CM: 5, CAM: 6, LW: 7, RW: 7, LM: 8, RM: 8 };
      return (order[a.label] || 99) - (order[b.label] || 99);
    });

    prioritySlots.forEach(slot => {
      if (!remainingPlayers.length) return;
      const player = bestPlayerForSlot(slot);
      if (player) nextDraft[slot.id] = player;
    });

    return nextDraft;
  }

  function changeFormation(name) {
    if (name === selectedFormationName) return;
    if (spinning || simulating || results) return;

    const currentPlayers = Object.values(draft);
    const nextDraft = autoFitDraftToFormation(currentPlayers, name);
    const outOfPositionCount = Object.values(nextDraft).filter(player => (player.penalty || 0) > 0).length;

    setSelectedFormationName(name);
    setDraft(nextDraft);
    setSelectedPlayer(null);
    setMovingSlotId(null);
    setLastPlacedSlot(null);
    setResults(null);
    setRewards([]);
    setSeasonAwards([]);
    setLiveLeagueTable([]);
    setPlayerSeasonStats([]);
    setSelectedMatch(null);
    setFormationNotice(currentPlayers.length ? {
      name,
      count: currentPlayers.length,
      outOfPositionCount } :
    null);

    setTimeout(() => scrollToSection(pitchRef, "center"), 100);
  }

  function getSlotLabel(slotId) {var _FORMATION$find;
    return ((_FORMATION$find = FORMATION.find(slot => slot.id === slotId)) === null || _FORMATION$find === void 0 ? void 0 : _FORMATION$find.label) || slotId;
  }

  function canPlaySlot(player, slotLabel) {
    const possiblePositions = player.positions || [player.position];

    return possiblePositions.some(
    position => {var _COMPATIBLE$slotLabel;return position === slotLabel || ((_COMPATIBLE$slotLabel = COMPATIBLE[slotLabel]) === null || _COMPATIBLE$slotLabel === void 0 ? void 0 : _COMPATIBLE$slotLabel.includes(position));});

  }

  function getPenalty(player, slotId) {
    const slotPosition = getSlotLabel(slotId);
    const listedPositions = player.positions || [player.position];

    if (player.position === slotPosition) return 0;
    if (listedPositions.includes(slotPosition)) return 0;
    if (listedPositions.some(position => isNoPenaltyMidfieldSwap(position, slotPosition))) return 0;
    if (canPlaySlot(player, slotPosition)) return 2;

    return 5;
  }

  function getPlayableSlotsForPlayer(player) {
    return FORMATION.filter(slot => canPlaySlot(player, slot.label));
  }

  function getEligibleSlotOptions(player) {
    const labels = [];

    FORMATION.forEach(slot => {
      if (canPlaySlot(player, slot.label) && !labels.includes(slot.label)) {
        labels.push(slot.label);
      }
    });

    return labels;
  }

  function isPlayerPositionUnavailable(player) {
    const playableSlots = getPlayableSlotsForPlayer(player);

    if (playableSlots.length === 0) return false;

    // Only grey out a player when every real position they can play is already full.
    // Example: a real ST-only player greys out when ST is full, but Messi can remain selectable
    // if CAM is open because CAM is one of his contextual positions.
    return playableSlots.every(slot => draft[slot.id]);
  }

  function clubHasPlayablePick(club) {
    if (!club) return false;

    if (draftedPlayers.length >= 11 && bench.length < BENCH_LIMIT) {
      return makePlayers(club).some(player => !pickedNames.includes(player.name));
    }

    const emptySlotsForClub = FORMATION.filter(slot => !draft[slot.id]);
    if (!emptySlotsForClub.length) return false;

    return makePlayers(club).some((player) =>
    !pickedNames.includes(player.name) &&
    emptySlotsForClub.some(slot => canPlaySlot(player, slot.label)));

  }

  function buildSpin(winner) {
    const reel = [];

    // Build a long shuffled reel so the spin looks random.
    for (let i = 0; i < 6; i++) {
      reel.push(...shuffleArray(activeClubs));
    }

    // Put the winner near the end, not always as the final visible card.
    const winnerIndex = reel.length - 4;
    reel[winnerIndex] = winner;

    // The real offset is measured after the reel renders.
    // This avoids mobile/CodePen iframe bugs where window.innerWidth is not
    // the same as the spinner window width.
    spinFinishedRef.current = false;
    if (spinFallbackRef.current) {
      window.clearTimeout(spinFallbackRef.current);
      spinFallbackRef.current = null;
    }
    setSpinReady(false);
    setSpinWinner(winner);
    setSpinReel(reel);
    setSpinTargetIndex(winnerIndex);
    setSpinOffset(0);
  }

  function pickClub(excludeCurrentId = null) {
    const draftedLeagueCounts = draftedPlayers.reduce((counts, player) => {
      counts[player.league] = (counts[player.league] || 0) + 1;
      return counts;
    }, {});

    const remainingPicks = benchDraftActive ? Math.max(0, BENCH_LIMIT - bench.length) : Math.max(0, 11 - draftedPlayers.length);
    const missingTopFiveLeagues = activeLeagues.filter(
    league => !draftedLeagueCounts[league]);


    let available = activeClubs.filter(
    (club) =>
    club.id !== excludeCurrentId &&
    !usedClubIds.includes(club.id) &&
    clubHasPlayablePick(club));


    // League representation rule: by the end of the XI, force any missing Top 5 league.
    // Earlier in the draft, gently prefer missing leagues so runs feel more varied.
    if (missingTopFiveLeagues.length && available.length) {
      const forceMissingLeague = remainingPicks <= missingTopFiveLeagues.length;
      const preferMissingLeague = draftedPlayers.length < activeLeagues.length;
      const missingLeaguePool = available.filter((club) =>
      missingTopFiveLeagues.includes(club.league));


      if (missingLeaguePool.length && (forceMissingLeague || preferMissingLeague || Math.random() < 0.6)) {
        available = missingLeaguePool;
      }
    }

    // If the run-wide no-repeat rule gets exhausted, relax only the drafted-club lockout.
    if (available.length === 0) {
      available = activeClubs.filter(club => club.id !== excludeCurrentId && clubHasPlayablePick(club));
    }

    if (available.length === 0) {
      available = activeClubs.filter(club => club.id !== excludeCurrentId);
    }

    // Keep the tier weighting, but apply it after no-repeat and league balancing.
    const weighted = [];
    available.forEach(club => {
      const tier = getClubTier(club);
      let weight = 1;
      if (tier === "underdog") weight = 3;
      if (tier === "strong") weight = 4;
      if (tier === "elite") weight = 5;
      if (tier === "legendary") weight = 4;
      if (tier === "jackpot") weight = 3;

      for (let i = 0; i < weight; i++) weighted.push(club);
    });

    return weighted[Math.floor(Math.random() * weighted.length)] || available[0];
  }

  function finishSpin(winner) {
    if (!winner || spinFinishedRef.current) return;
    spinFinishedRef.current = true;
    if (spinFallbackRef.current) {
      window.clearTimeout(spinFallbackRef.current);
      spinFallbackRef.current = null;
    }

    setCurrentClub(winner);
    setLastClubId(winner.id);
    setRecentClubIds(prev => [...prev, winner.id].slice(-4));
    setClubCollection(prev => {
      const next = Array.from(new Set([...prev, winner.id]));
      saveStoredJson("draftXIClubCollection", next);
      return next;
    });
    setSpinning(false);
    setSpinReady(false);

    setTimeout(() => scrollToSection(clubPanelRef, "start"), 120);
  }

  function spinClub() {
    if (fullSquadReady || spinning || currentClub || substituteMode) return;

    const winner = pickClub();

    setCurrentClub(null);
    setSelectedPlayer(null);
    setResults(null);
    setSelectedMatch(null);
    buildSpin(winner);
    playSound("spin", soundMuted);
    setSpinning(true);

    setTimeout(() => scrollToSection(spinnerRef, "center"), 60);
  }

  function rerollClub() {
    if (!currentClub || rerollsLeft <= 0 || spinning || fullSquadReady || substituteMode) return;

    const winner = pickClub(currentClub.id);

    setRerollsLeft(prev => Math.max(0, prev - 1));
    playSound("reroll", soundMuted);
    setCurrentClub(null);
    setSelectedPlayer(null);
    setResults(null);
    setSelectedMatch(null);
    buildSpin(winner);
    setSpinning(true);

    setTimeout(() => scrollToSection(spinnerRef, "center"), 60);
  }

  function rescueSpinClub() {
    if (!currentClub || spinning || fullSquadReady || clubHasPlayablePick(currentClub) || substituteMode) return;

    const winner = pickClub(currentClub.id);
    if (!winner) return;

    playSound("reroll", soundMuted);
    setCurrentClub(null);
    setSelectedPlayer(null);
    setResults(null);
    setSelectedMatch(null);
    buildSpin(winner);
    setSpinning(true);

    setTimeout(() => scrollToSection(spinnerRef, "center"), 60);
  }

  function selectPlayer(player) {
    if (pickedNames.includes(player.name)) return;

    if (benchDraftActive) {
      addBenchPlayer(player);
      return;
    }

    playSound("select", soundMuted);
    setSelectedPlayer(player);
    setTimeout(() => scrollToSection(pitchRef, "center"), 90);
  }

  function addBenchPlayer(player) {
    if (!benchDraftActive || pickedNames.includes(player.name) || bench.length >= BENCH_LIMIT) return;

    const benchPlayer = {
      ...player,
      benchId: `${player.id}_bench_${Date.now()}_${bench.length}`,
      finalRating: player.rating,
      penalty: 0,
      slotId: null,
      slotLabel: "BENCH" };

    playSound("place", soundMuted);
    addPlayerToCollection(benchPlayer);
    setBench(prev => [...prev, benchPlayer].slice(0, BENCH_LIMIT));
    setPickedNames(prev => [...prev, player.name]);
    if (player.clubId) {
      setUsedClubIds(prev => Array.from(new Set([...prev, player.clubId])));
    }
    setSelectedPlayer(null);
    setCurrentClub(null);
    setSpinWinner(null);
    setResults(null);
    setTimeout(() => scrollToSection(controlsRef, "start"), 120);
  }

  function placePlayer(slotId) {
    if (!selectedPlayer || draft[slotId]) return;
    if (pickedNames.includes(selectedPlayer.name)) return;

    const slotLabel = getSlotLabel(slotId);
    if (!canPlaySlot(selectedPlayer, slotLabel)) return;

    const penalty = getPenalty(selectedPlayer, slotId);
    const placedPlayer = {
      ...selectedPlayer,
      slotId,
      slotLabel: getSlotLabel(slotId),
      penalty,
      finalRating: Math.max(60, selectedPlayer.rating - penalty) };


    playSound("place", soundMuted);
    addPlayerToCollection(placedPlayer);
    setDraft(prev => ({ ...prev, [slotId]: placedPlayer }));
    setPickedNames(prev => [...prev, selectedPlayer.name]);
    if (selectedPlayer.clubId) {
      setUsedClubIds(prev => Array.from(new Set([...prev, selectedPlayer.clubId])));
    }
    setSelectedPlayer(null);
    setCurrentClub(null);
    setSpinWinner(null);
    setLastPlacedSlot(slotId);
    setResults(null);

    setTimeout(() => scrollToSection(controlsRef, "start"), 140);
    setTimeout(() => setLastPlacedSlot(null), 700);
  }

  function movePlayerToSlot(targetSlotId) {
    if (!movingSlotId) return;
    if (draft[targetSlotId]) return;

    const player = draft[movingSlotId];
    if (!player) return;

    const targetPosition = getSlotLabel(targetSlotId);

    // Players can only move into realistic positions for the selected formation.
    if (!canPlaySlot(player, targetPosition)) return;

    const penalty = getPenalty(player, targetSlotId);
    const movedPlayer = {
      ...player,
      slotId: targetSlotId,
      slotLabel: targetPosition,
      penalty,
      finalRating: Math.max(60, player.rating - penalty) };


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

    setTimeout(() => scrollToSection(pitchRef, "center"), 100);
    setTimeout(() => setLastPlacedSlot(null), 700);
  }

  function swapPlayersWithSlot(targetSlotId) {
    if (!movingSlotId || movingSlotId === targetSlotId) return;

    const movingPlayer = draft[movingSlotId];
    const targetPlayer = draft[targetSlotId];
    if (!movingPlayer || !targetPlayer) return;

    const sourcePosition = getSlotLabel(movingSlotId);
    const targetPosition = getSlotLabel(targetSlotId);

    if (!canPlaySlot(movingPlayer, targetPosition)) return;
    if (!canPlaySlot(targetPlayer, sourcePosition)) return;

    const movingPenalty = getPenalty(movingPlayer, targetSlotId);
    const targetPenalty = getPenalty(targetPlayer, movingSlotId);

    const movedPlayer = {
      ...movingPlayer,
      slotId: targetSlotId,
      slotLabel: targetPosition,
      penalty: movingPenalty,
      finalRating: Math.max(60, movingPlayer.rating - movingPenalty) };

    const swappedPlayer = {
      ...targetPlayer,
      slotId: movingSlotId,
      slotLabel: sourcePosition,
      penalty: targetPenalty,
      finalRating: Math.max(60, targetPlayer.rating - targetPenalty) };

    setDraft(prev => ({
      ...prev,
      [movingSlotId]: swappedPlayer,
      [targetSlotId]: movedPlayer }));

    playSound("move", soundMuted);
    setMovingSlotId(null);
    setLastPlacedSlot(targetSlotId);
    setResults(null);

    setTimeout(() => scrollToSection(pitchRef, "center"), 100);
    setTimeout(() => setLastPlacedSlot(null), 700);
  }


  function makeSubstitution(slotId) {
    if (!substituteMode || substituteUsed || !selectedBenchPlayer || results || simulating) return;

    const starter = draft[slotId];
    if (!starter) return;

    const slotLabel = getSlotLabel(slotId);
    if (!canPlaySlot(selectedBenchPlayer, slotLabel)) return;

    const penalty = getPenalty(selectedBenchPlayer, slotId);
    const incoming = {
      ...selectedBenchPlayer,
      slotId,
      slotLabel,
      penalty,
      finalRating: Math.max(60, selectedBenchPlayer.rating - penalty) };

    const outgoing = {
      ...starter,
      benchId: `${starter.id || starter.name}_bench_return_${Date.now()}`,
      slotId: null,
      slotLabel: "BENCH",
      penalty: 0,
      finalRating: starter.rating || starter.finalRating };

    setDraft(prev => ({ ...prev, [slotId]: incoming }));
    setBench(prev => prev.map(player => player.benchId === selectedBenchPlayer.benchId ? outgoing : player));
    setSubstituteUsed(true);
    setSubstituteMode(false);
    setSelectedBenchId(null);
    setMovingSlotId(null);
    setSelectedPlayer(null);
    setResults(null);
    playSound("move", soundMuted);
    setTimeout(() => scrollToSection(pitchRef, "center"), 100);
  }

  function calculateRewards(summary) {var _summary$table$find;
    const earned = [];
    const finishPosition = summary.finishPosition || (
    Array.isArray(summary.table) ? (_summary$table$find = summary.table.find(row => row.user)) === null || _summary$table$find === void 0 ? void 0 : _summary$table$find.position : null) ||
    20;
    const wonLeague = summary.wonLeague || finishPosition === 1;

    if (summary.tournamentMode) {
      if (summary.wonWorldCup) {
        earned.push("World Champion");
      } else if (summary.eliminatedStage === "World Cup Final") {
        earned.push("World Cup Runner-Up");
      } else if (summary.eliminatedStage === "Semi Final") {
        earned.push("Semi-Finalist");
      } else if (summary.eliminatedStage === "Quarter Final") {
        earned.push("Quarter-Finalist");
      } else if (summary.qualifiedFromGroup) {
        earned.push("Knockout Qualifier");
      } else {
        earned.push("Group Stage Fighter");
      }

      if (summary.losses === 0) {
        earned.push("Unbeaten Tournament");
      }

      if (summary.gf - summary.ga >= 10) {
        earned.push("Goal Machine");
      }
    } else {
      if (wonLeague) {
        earned.push("League Champions");
      } else if (finishPosition <= 4) {
        earned.push("UCL Qualified");
      } else if (finishPosition <= 7) {
        earned.push("European Qualification");
      }

      if (summary.points >= 100) {
        earned.push("Centurions Badge");
      }

      if (summary.losses === 0) {
        earned.push("Invincibles Shield");
      }

      if (summary.wins >= 35) {
        earned.push("Dominant Dynasty");
      }

      if (summary.wins === 38) {
        earned.push("Perfect 38-0 GOAT Card");
      }

      if (summary.gf - summary.ga >= 80) {
        earned.push("Goal Machine");
      }
    }

    if (earned.length === 0) {
      earned.push("Draft Token");
    }

    return earned;
  }


  function returnToStartScreen() {
    setGameStarted(false);
    setSelectedMatch(null);
    setSimulating(false);
    setLiveMatch(null);
    setLiveSeason(null);
    setSimProgress(0);
    setSpinning(false);
    setSpinReady(false);
    if (spinFallbackRef.current) {
      window.clearTimeout(spinFallbackRef.current);
      spinFallbackRef.current = null;
    }
  }


  function resetGame() {
    try {localStorage.removeItem("draftXIProgressV1");localStorage.removeItem("draftXIProgressV2");localStorage.removeItem("draftXIProgressV3");localStorage.removeItem("draftXIProgressV4");} catch {}
    setSaveNotice(false);
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
    setUsedClubIds([]);
    setSimulating(false);
    setLiveMatch(null);
    setLiveSeason(null);
    setSimProgress(0);
    setLastPlacedSlot(null);
    setResults(null);
    setRerollsLeft(1);
    setSelectedMatch(null);
    setRewards([]);
    setSeasonAwards([]);
    setLiveLeagueTable([]);
    setPlayerSeasonStats([]);
    setTransferMode(false);
    setTransferUsed(false);
    setBench([]);
    setSubstituteMode(false);
    setSubstituteUsed(false);
    setSelectedBenchId(null);
    setMovingSlotId(null);
  }


  function removePlayerForTransfer(slotId) {
    if (!transferMode || transferUsed || simulating || results) return;

    const player = draft[slotId];
    if (!player) return;

    setDraft(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });

    setPickedNames(prev => prev.filter(name => name !== player.name));
    if (player.clubId) {
      setUsedClubIds(prev => {
        const stillDraftedFromClub = Object.entries(draft).some(([draftSlotId, draftedPlayer]) =>
        draftSlotId !== slotId && draftedPlayer.clubId === player.clubId);

        return stillDraftedFromClub ? prev : prev.filter(clubId => clubId !== player.clubId);
      });
    }
    setSelectedPlayer(null);
    setMovingSlotId(null);
    setTransferMode(false);
    setTransferUsed(true);
    setCurrentClub(null);
    setSpinWinner(null);
    setResults(null);
    playSound("reroll", soundMuted);
    setTimeout(() => scrollToSection(pitchRef, "center"), 80);
  }

  function copyLatestResult() {var _navigator$clipboard;
    if (!results) return;
    const text = makeShareCardText(results, playerSeasonStats, selectedFormationName, teamRating);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1600);
    (_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 ? void 0 : _navigator$clipboard.writeText(text);
  }

  async function shareDraftXI() {var _navigator$clipboard2;
    const shareUrl = "https://draftxi.xyz";
    const shareTitle = "Draft XI";
    const shareText = results ? makeShareCardText(results, playerSeasonStats, selectedFormationName, teamRating) : "Play Draft XI and build the ultimate football draft team.";

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl });
      } else {
        await ((_navigator$clipboard2 = navigator.clipboard) === null || _navigator$clipboard2 === void 0 ? void 0 : _navigator$clipboard2.writeText(`${shareTitle} - ${shareUrl}`));
        setShareCopied(true);
        window.setTimeout(() => setShareCopied(false), 1600);
      }
    } catch (error) {
      // Share was cancelled or blocked. No need to interrupt gameplay.
    }
  }


  function simulateWorldCupTournament() {
    if (!fullSquadReady || simulating) return;

    playSound("season", soundMuted);
    setSimulating(true);
    setResults(null);
    setTimeout(() => scrollToSection(simulationRecordRef, "center"), 120);
    setLiveSeason({
      week: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      gf: 0,
      ga: 0,
      latest: "World Cup campaign starting...",
      recent: [] });

    setSimProgress(0);
    setLiveLeagueTable([]);

    const fullRating =
    draftedPlayers.reduce((sum, player) => sum + player.finalRating, 0) / draftedPlayers.length;

    const rawTeamProfile = calculateTeamProfile(draftedPlayers);
    const teamProfile = applyFormationModifier(rawTeamProfile, selectedFormationName);

    const shuffledNations = [...WORLD_CUP_CLUBS].sort(() => Math.random() - 0.5);
    const lowerSeeds = shuffledNations.filter(team => team.rating <= Math.max(82, fullRating - 6));
    const midSeeds = shuffledNations.filter(team => team.rating > Math.max(80, fullRating - 8) && team.rating < Math.min(90, fullRating + 2));
    const highSeeds = shuffledNations.filter(team => team.rating >= Math.max(84, fullRating - 2));

    const takeNation = (pool, fallbackIndex) => {
      const fallback = shuffledNations[fallbackIndex % shuffledNations.length];
      const choice = pool.find(team => !usedOpponentIds.has(team.id)) || fallback;
      usedOpponentIds.add(choice.id);
      return choice;
    };

    const usedOpponentIds = new Set();
    const groupOpponents = [
    takeNation(lowerSeeds, 0),
    takeNation(midSeeds, 6),
    takeNation(highSeeds, 12)];

    const knockoutRounds = [
    // Difficulty now ramps up instead of throwing elite teams at you immediately.
    { stage: "Round of 32", pool: midSeeds },
    { stage: "Round of 16", pool: midSeeds.length >= 3 ? midSeeds : highSeeds },
    { stage: "Quarter Final", pool: highSeeds },
    { stage: "Semi Final", pool: highSeeds },
    { stage: "World Cup Final", pool: highSeeds }];

    let wins = 0,draws = 0,losses = 0,gf = 0,ga = 0,groupPoints = 0;
    const matches = [];

    const playTournamentMatch = (opponent, stage, knockout = false) => {
      const opponentName = opponent.name;
      const opponentRating = opponent.rating + Math.floor(Math.random() * 5) - 2;
      const opponentProfile = makeOpponentProfile(opponentName, opponentRating);

      const userXg = getExpectedGoals(teamProfile, opponentProfile, fullRating, opponentRating);
      const opponentXg = getExpectedGoals(opponentProfile, teamProfile, opponentRating, fullRating);

      const tournamentBonus =
      fullRating >= 93 ? 1.18 :
      fullRating >= 91 ? 1.02 :
      fullRating >= 89 ? 0.86 :
      fullRating >= 87 ? 0.68 :
      fullRating >= 85 ? 0.5 :
      0.3;

      // World Cup mode should feel tense, but not unfair. Strong drafted XIs get a
      // small knockout composure boost so one unlucky roll does not end every run.
      const stageClutchBonus = knockout ?
      stage === "Round of 32" ? 0.3 :
      stage === "Round of 16" ? 0.24 :
      stage === "Quarter Final" ? 0.18 :
      stage === "Semi Final" ? 0.12 :
      stage === "World Cup Final" ? 0.08 :
      0 :
      0;
      const eliteClutchBonus = knockout ?
      fullRating >= 92 ? 0.28 :
      fullRating >= 90 ? 0.22 :
      fullRating >= 88 ? 0.16 :
      fullRating >= 86 ? 0.1 :
      0.04 :
      0;

      const pressureTax = knockout ? 0 : 0;
      const adjustedUserXg = Math.max(0.3, userXg + tournamentBonus + stageClutchBonus + eliteClutchBonus - pressureTax);
      const adjustedOpponentXg = Math.max(0.2, opponentXg * (fullRating >= 90 ? 0.76 : fullRating >= 87 ? 0.84 : 0.94));

      let us = rollGoalsFromWeightedXg(adjustedUserXg, fullRating, opponentRating);
      let them = rollGoalsFromWeightedXg(adjustedOpponentXg, opponentRating, fullRating);

      if (!knockout && us < them && adjustedUserXg > adjustedOpponentXg + 0.5 && Math.random() < 0.5) {
        us = them;
      }

      if (knockout && us < them && adjustedUserXg > adjustedOpponentXg + 0.35 && Math.random() < 0.68) {
        // Extra-time rescue: if your XI clearly created more, give it a fair chance
        // to force penalties instead of being instantly eliminated.
        us = them;
      }

      if (knockout && us < them && fullRating >= opponentRating + 3 && Math.random() < 0.35) {
        us = them;
      }

      us = clamp(us, 0, fullRating >= 93 ? 6 : 5);
      them = clamp(them, 0, opponentRating >= 88 ? 4 : 3);

      let result;
      let decidedByPens = false;
      let penaltyWinner = null;
      let penaltyScore = null;

      if (us > them) {
        result = "W";
      } else if (us < them) {
        result = "L";
      } else if (knockout) {
        decidedByPens = true;
        const penaltyChance = clamp(
        0.56 + (fullRating - opponentRating) * 0.045 + (adjustedUserXg - adjustedOpponentXg) * 0.1,
        0.38,
        fullRating >= 90 ? 0.86 : 0.8);
        const wonPens = Math.random() < penaltyChance;
        const winningPens = 4 + Math.floor(Math.random() * 3);
        const losingPens = Math.max(1, winningPens - (1 + Math.floor(Math.random() * 2)));
        result = wonPens ? "W" : "L";
        penaltyWinner = wonPens ? "Draft XI" : opponentName;
        penaltyScore = wonPens ? `${winningPens}-${losingPens}` : `${losingPens}-${winningPens}`;
      } else {
        result = "D";
      }

      if (result === "W") wins++;else
      if (result === "D") draws++;else
      losses++;

      if (!knockout) {
        groupPoints += result === "W" ? 3 : result === "D" ? 1 : 0;
      }

      gf += us;
      ga += them;

      const scorers = [];
      for (let goal = 0; goal < us; goal++) {
        const scorer = getWeightedScorer(draftedPlayers, ["ST", "LW", "RW", "CAM", "LM", "RM", "CM"]);
        scorers.push({
          team: "Draft XI",
          name: scorer.name,
          position: scorer.slotLabel || scorer.position,
          minute: getGoalMinute() });
      }

      const opponentScorers = [];
      for (let goal = 0; goal < them; goal++) {
        const scorer = getWeightedTeamScorer(opponentName, adjustedOpponentXg);
        opponentScorers.push({
          team: opponentName,
          name: scorer.name,
          position: scorer.position,
          minute: getGoalMinute() });
      }

      scorers.sort((a, b) => a.minute - b.minute);
      opponentScorers.sort((a, b) => a.minute - b.minute);

      return {
        week: matches.length + 1,
        stage,
        opponent: opponentName,
        result,
        score: `${us}-${them}`,
        xg: `${adjustedUserXg.toFixed(1)}-${adjustedOpponentXg.toFixed(1)}`,
        decidedByPens,
        penaltyWinner,
        penaltyScore,
        scorers,
        opponentScorers,
        allScorers: [...scorers, ...opponentScorers].sort((a, b) => a.minute - b.minute) };
    };

    groupOpponents.forEach((opponent, index) => {
      matches.push(playTournamentMatch(opponent, `Group Match ${index + 1}`, false));
    });

    const groupGoalDifference = gf - ga;
    const qualifiedFromGroup =
    groupPoints >= 5 ||
    groupPoints === 4 && groupGoalDifference >= 0 && Math.random() < 0.78 ||
    groupPoints === 3 && groupGoalDifference >= 2 && Math.random() < 0.36;

    let eliminatedStage = qualifiedFromGroup ? null : "Group Stage";
    let wonWorldCup = false;

    if (qualifiedFromGroup) {
      for (const round of knockoutRounds) {
        const opponent = takeNation(round.pool, matches.length * 4 + 3);
        const match = playTournamentMatch(opponent, round.stage, true);
        matches.push(match);

        if (match.result === "L") {
          eliminatedStage = round.stage;
          break;
        }

        if (round.stage === "World Cup Final") {
          wonWorldCup = true;
        }
      }
    }

    const totalMatches = matches.length;
    const matchRevealDelay = gameMode === "worldcup" ? 1350 : 650;
    const finishDelay = gameMode === "worldcup" ? 850 : 450;

    matches.forEach((match, index) => {
      setTimeout(() => {
        const gamesSoFar = matches.slice(0, index + 1);
        const liveWins = gamesSoFar.filter(m => m.result === "W").length;
        const liveDraws = gamesSoFar.filter(m => m.result === "D").length;
        const liveLosses = gamesSoFar.filter(m => m.result === "L").length;
        const livePoints = gamesSoFar.filter(m => m.stage && m.stage.startsWith("Group")).reduce((sum, m) => sum + (m.result === "W" ? 3 : m.result === "D" ? 1 : 0), 0);
        const liveGf = gamesSoFar.reduce((sum, m) => sum + Number(m.score.split("-")[0]), 0);
        const liveGa = gamesSoFar.reduce((sum, m) => sum + Number(m.score.split("-")[1]), 0);
        const penaltyText = match.decidedByPens ? ` · ${match.penaltyWinner} win ${match.penaltyScore} on pens` : "";
        const stageMoment =
        match.stage.startsWith("Group") ?
        `Group Stage Match ${index + 1}/3` :
        match.stage === "World Cup Final" ?
        "🏆 World Cup Final" :
        `Knockout Drama · ${match.stage}`;
        const resultWord = match.result === "W" ? "WIN" : match.result === "D" ? "DRAW" : "DEFEAT";
        const impactLine = `${stageMoment}: ${resultWord} ${match.score} vs ${match.opponent}${penaltyText} · xG ${match.xg}`;

        setLiveSeason({
          week: index + 1,
          wins: liveWins,
          draws: liveDraws,
          losses: liveLosses,
          points: livePoints,
          gf: liveGf,
          ga: liveGa,
          latest: impactLine,
          recent: gamesSoFar.slice(-5) });

        setSimProgress(Math.round((index + 1) / totalMatches * 100));
      }, (index + 1) * matchRevealDelay);
    });

    setTimeout(() => {
      const badge = wonWorldCup ? "World Cup Champions" :
      eliminatedStage === "World Cup Final" ? "World Cup Finalists" :
      eliminatedStage === "Semi Final" ? "World Cup Semi Finalists" :
      eliminatedStage === "Quarter Final" ? "World Cup Quarter Finalists" :
      eliminatedStage === "Round of 16" ? "Round of 16 Exit" :
      eliminatedStage === "Round of 32" ? "Round of 32 Exit" :
      "Group Stage Exit";

      const summary = {
        wins,
        draws,
        losses,
        points: groupPoints,
        gf,
        ga,
        badge,
        tournamentMode: true,
        qualifiedFromGroup,
        eliminatedStage,
        wonWorldCup,
        matches,
        table: [] };

      const finalPlayerStats = createPlayerSeasonStats(draftedPlayers, matches);
      const finalAwards = calculateSeasonAwards(summary, finalPlayerStats);
      const historyEntry = makeHistoryEntry(summary, finalPlayerStats, selectedFormationName, teamRating);

      setResults(summary);
      setRewards(calculateRewards(summary));
      setPlayerSeasonStats(finalPlayerStats);
      setSeasonAwards(finalAwards);
      setLiveLeagueTable([]);
      setDraftHistory(prev => {
        const next = [historyEntry, ...prev].slice(0, 8);
        try {
          localStorage.setItem("draftXIHistory", JSON.stringify(next));
        } catch {}
        return next;
      });
      setSimulating(false);
      setLiveMatch(null);
      setSimProgress(100);
      setTimeout(() => scrollToSection(resultsRef, "start"), 80);
    }, totalMatches * matchRevealDelay + finishDelay);
  }

  function simulateSeason() {
    // Route World Cup mode into tournament format instead of the 38-game European league.
    if (gameMode === "worldcup") {
      simulateWorldCupTournament();
      return;
    }

    // Allow simulation to start even if a stale saved result exists.
    // This fixes cases where localStorage restores "Season Complete" and the sim button appears dead.
    if (!fullSquadReady || simulating) return;

    playSound("season", soundMuted);
    setSimulating(true);
    setResults(null);
    setTimeout(() => scrollToSection(simulationRecordRef, "center"), 120);
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
    const aiSeasonSeed = Math.floor(Math.random() * 1000000000);
    setLiveLeagueTable(buildLiveLeagueTable([], "Draft XI", aiSeasonSeed));

    const fullRating =
    draftedPlayers.reduce((sum, player) => sum + player.finalRating, 0) / draftedPlayers.length;

    const rawTeamProfile = calculateTeamProfile(draftedPlayers);
    const teamProfile = applyFormationModifier(rawTeamProfile, selectedFormationName);

    let wins = 0,draws = 0,losses = 0,gf = 0,ga = 0;
    const matches = [];
    const schedule = buildSchedule();

    for (let week = 1; week <= 38; week++) {
      const opponent = schedule[week - 1];
      const opponentName = opponent[0];
      const opponentRating = opponent[1] + Math.floor(Math.random() * 5) - 2;
      const opponentProfile = makeOpponentProfile(opponentName, opponentRating);

      const userXg = getExpectedGoals(teamProfile, opponentProfile, fullRating, opponentRating);
      const opponentXg = getExpectedGoals(opponentProfile, teamProfile, opponentRating, fullRating);

      // Calibrated for arcade-draft fun.
      // A normal good draft should feel powerful; only messy/low-rated XIs should struggle.
      const draftDifficultyBonus =
      fullRating >= 94 ? 1.82 :
      fullRating >= 93 ? 1.70 :
      fullRating >= 92 ? 1.56 :
      fullRating >= 91 ? 1.44 :
      fullRating >= 90 ? 1.32 :
      fullRating >= 89 ? 1.16 :
      fullRating >= 88 ? 1.00 :
      fullRating >= 87 ? 0.90 :
      fullRating >= 86 ? 0.80 :
      fullRating >= 85 ? 0.68 :
      fullRating >= 84 ? 0.54 :
      0.32;

      const opponentXgMultiplier =
      fullRating >= 94 ? 0.54 :
      fullRating >= 93 ? 0.57 :
      fullRating >= 92 ? 0.6 :
      fullRating >= 91 ? 0.63 :
      fullRating >= 90 ? 0.66 :
      fullRating >= 89 ? 0.7 :
      fullRating >= 88 ? 0.75 :
      fullRating >= 87 ? 0.78 :
      fullRating >= 86 ? 0.82 :
      fullRating >= 85 ? 0.86 :
      0.92;

      const draftAgencyBonus =
      fullRating >= 92 ? 0.2 :
      fullRating >= 90 ? 0.16 :
      fullRating >= 87 ? 0.12 :
      fullRating >= 85 ? 0.14 :
      0.08;

      const adjustedUserXg = (userXg + draftDifficultyBonus + draftAgencyBonus) * 1.005;
      const adjustedOpponentXg = opponentXg * opponentXgMultiplier * 0.985;

      let us = rollGoalsFromWeightedXg(adjustedUserXg, fullRating, opponentRating);
      let them = rollGoalsFromWeightedXg(adjustedOpponentXg, opponentRating, fullRating);

      // Arcade composure: strong XIs are allowed to feel clutch in close games.
      if (us + 1 === them && fullRating >= 85 && adjustedUserXg >= adjustedOpponentXg - 0.2) {
        const drawSaveChance =
        fullRating >= 91 ? 0.36 :
        fullRating >= 89 ? 0.31 :
        fullRating >= 87 ? 0.27 :
        0.23;
        const earlySeasonDrawDampener = week <= 5 ? 0.62 : 1;

        if (Math.random() < drawSaveChance * earlySeasonDrawDampener) us += 1;
      }

      if (us === them && fullRating >= 88 && adjustedUserXg >= adjustedOpponentXg + 0.35) {
        const winnerChance = fullRating >= 91 ? 0.20 : fullRating >= 90 ? 0.17 : 0.14;
        if (Math.random() < winnerChance) us += 1;
      }

      // xG frustration guard: losing while clearly winning xG should be an occasional
      // gut punch, not the main way a strong draft drops points.
      if (us < them && adjustedUserXg > adjustedOpponentXg) {
        const xgEdge = adjustedUserXg - adjustedOpponentXg;
        const unfairLossSaveChance =
        xgEdge >= 1.1 ? 0.88 :
        xgEdge >= 0.75 ? 0.76 :
        xgEdge >= 0.45 ? 0.58 :
        0.34;
        const earlySeasonLossSaveDampener = week <= 5 ? 0.72 : 1;

        if (Math.random() < unfairLossSaveChance * earlySeasonLossSaveDampener) {
          us = them;

          if (fullRating >= 88 && xgEdge >= 0.8) {
            const turnDrawToWinChance = fullRating >= 91 ? 0.18 : fullRating >= 89 ? 0.13 : 0.10;
            if (Math.random() < turnDrawToWinChance) us += 1;
          }
        }
      }

      const xgWeightedScore = applyXgResultWeight(
      us,
      them,
      adjustedUserXg,
      adjustedOpponentXg,
      fullRating,
      opponentRating);

      us = xgWeightedScore.us;
      them = xgWeightedScore.them;

      // 38-0 rarity check:
      // Elite teams still dominate, but a few controlled wins can become draws.
      // This makes perfect seasons rarer without making the game feel unfair.
      if (us > them && fullRating >= 88) {
        const narrowLead = us - them === 1;
        const opponentIsStrong = opponentRating >= 86;
        const lateEqualizerChance =
        fullRating >= 94 ? 0.018 :
        fullRating >= 92 ? 0.026 :
        fullRating >= 90 ? 0.034 :
        0.042;

        if ((narrowLead || opponentIsStrong) && Math.random() < lateEqualizerChance) {
          them = us;
        }
      }

      // Perfect-season assist: 90+ squads should be capable of 38-0.
      // This does not force wins, but it heavily rewards clear xG control from elite drafts.
      if (fullRating >= 90 && us <= them) {
        const xgEdge = adjustedUserXg - adjustedOpponentXg;
        const eliteRatingBoost = clamp((fullRating - 90) * 0.055, 0, 0.22);
        const xgControlBoost = clamp(xgEdge * 0.13, -0.06, 0.28);
        const opponentPenalty = clamp((opponentRating - 86) * 0.025, 0, 0.12);

        if (us < them) {
          const rescueLossChance = clamp(0.56 + eliteRatingBoost + xgControlBoost - opponentPenalty, 0.36, 0.82);
          if (Math.random() < rescueLossChance) {
            us = them;
          }
        }

        if (us === them) {
          const convertDrawChance = clamp(0.27 + eliteRatingBoost + xgControlBoost - opponentPenalty, 0.14, 0.58);
          if (Math.random() < convertDrawChance) {
            us += 1;
          }
        }
      }

      // Superteam finishing floor: if an elite team creates 2.0+ xG, blanking should be rare.
      if (fullRating >= 90 && us === 0 && adjustedUserXg >= 2.0 && Math.random() < 0.78) {
        us = 1;
      }

      // Avoid too many absurd 7-5 arcade scores while still allowing occasional blowouts.
      us = clamp(us, 0, fullRating >= 94 ? 7 : 6);
      them = clamp(them, 0, opponentRating >= 88 ? 5 : 4);

      let result;
      if (us > them) {
        result = "W";
        wins++;
      } else if (us === them) {
        result = "D";
        draws++;
      } else {
        result = "L";
        losses++;
      }

      gf += us;
      ga += them;

      const scorers = [];
      for (let goal = 0; goal < us; goal++) {
        const scorer = getWeightedScorer(draftedPlayers, ["ST", "LW", "RW", "CAM", "LM", "RM", "CM"]);
        scorers.push({
          team: "Draft XI",
          name: scorer.name,
          position: scorer.slotLabel || scorer.position,
          minute: getGoalMinute() });
      }

      const opponentScorers = [];
      for (let goal = 0; goal < them; goal++) {
        const scorer = getWeightedTeamScorer(opponentName, opponentXg);
        opponentScorers.push({
          team: opponentName,
          name: scorer.name,
          position: scorer.position,
          minute: getGoalMinute() });
      }

      scorers.sort((a, b) => a.minute - b.minute);
      opponentScorers.sort((a, b) => a.minute - b.minute);

      const match = {
        week,
        opponent: opponentName,
        result,
        score: `${us}-${them}`,
        xg: `${adjustedUserXg.toFixed(1)}-${adjustedOpponentXg.toFixed(1)}`,
        scorers,
        opponentScorers,
        allScorers: [...scorers, ...opponentScorers].sort((a, b) => a.minute - b.minute) };

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

        setLiveLeagueTable(buildLiveLeagueTable(gamesSoFar, "Draft XI", aiSeasonSeed));

        setLiveSeason({
          week,
          wins: liveWins,
          draws: liveDraws,
          losses: liveLosses,
          points: livePoints,
          gf: liveGf,
          ga: liveGa,
          latest: `GW ${week}: ${match.score} vs ${match.opponent} - xG ${match.xg}`,
          recent: gamesSoFar.slice(-5) });

        setSimProgress(Math.round(week / 38 * 100));
      }, week * 250);
    }

    const points = wins * 3 + draws;

    setTimeout(() => {
      const finalTable = buildLiveLeagueTable(matches, "Draft XI", aiSeasonSeed);
      const userTableRow = finalTable.find(row => row.user);
      const finishPosition = (userTableRow === null || userTableRow === void 0 ? void 0 : userTableRow.position) || 20;
      const wonLeague = finishPosition === 1;

      let finalBadge = "Mid Table";
      if (wins === 38 && wonLeague) finalBadge = "38-0 GOAT";else
      if (losses === 0 && wonLeague) finalBadge = "Invincibles Champions";else
      if (points >= 100 && wonLeague) finalBadge = "Centurions Champions";else
      if (wonLeague) finalBadge = "League Champions";else
      if (finishPosition <= 4) finalBadge = "UCL Qualified";else
      if (finishPosition <= 7) finalBadge = "European Race";else
      if (finishPosition <= 12) finalBadge = "Mid Table";else
      finalBadge = "Rebuild Needed";

      const summary = {
        wins,
        draws,
        losses,
        points,
        gf,
        ga,
        badge: finalBadge,
        finishPosition,
        wonLeague,
        matches,
        table: finalTable };

      const finalPlayerStats = createPlayerSeasonStats(draftedPlayers, matches);
      const finalAwards = calculateSeasonAwards(summary, finalPlayerStats);
      const historyEntry = makeHistoryEntry(summary, finalPlayerStats, selectedFormationName, teamRating);

      setResults(summary);
      setRewards(calculateRewards(summary));
      setPlayerSeasonStats(finalPlayerStats);
      setSeasonAwards(finalAwards);
      setLiveLeagueTable(summary.table);
      setDraftHistory(prev => {
        const next = [historyEntry, ...prev].slice(0, 8);
        try {
          localStorage.setItem("draftXIHistory", JSON.stringify(next));
        } catch {
          // localStorage may be blocked. Ignore safely.
        }
        return next;
      });
      setSimulating(false);
      setLiveMatch(null);
      setSimProgress(100);
      setTimeout(() => scrollToSection(resultsRef, "start"), 80);
    }, 9800);
  }

  if (showPlayerCollection) {
    return /*#__PURE__*/(
      React.createElement("section", { className: "collection-screen player-collection-screen" }, /*#__PURE__*/
      React.createElement("div", { className: "player-collection-shell" }, /*#__PURE__*/
      React.createElement("button", {
        className: "mode-pill-button collection-back-mode-button collection-back-detailed",
        type: "button",
        onClick: () => setShowPlayerCollection(false),
        "aria-label": "Back to Draft XI menu",
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "min(380px, 100%)",
          minHeight: "64px",
          margin: "0 auto 18px",
          padding: "0 26px",
          border: "1px solid rgba(141, 255, 179, 0.45)",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #86f7a8, #22c55e)",
          color: "#06180d",
          boxShadow: "0 14px 30px rgba(57, 255, 136, 0.18), inset 0 -3px 0 rgba(0, 0, 0, 0.12)",
          fontSize: "16px",
          fontWeight: 1000,
          lineHeight: 1,
          appearance: "none",
          WebkitAppearance: "none" } },

      /*#__PURE__*/React.createElement("span", {
        className: "collection-back-icon",
        "aria-hidden": "true",
        style: {
          width: "32px",
          height: "32px",
          minWidth: "32px",
          display: "inline-grid",
          placeItems: "center",
          borderRadius: "999px",
          background: "rgba(6, 24, 13, 0.12)",
          lineHeight: 1 } },

      "⚽"), /*#__PURE__*/React.createElement("span", {
        className: "collection-back-text",
        style: { whiteSpace: "nowrap", lineHeight: 1 } },
      "Back to Draft XI"), /*#__PURE__*/React.createElement("span", {
        className: "collection-back-arrow",
        "aria-hidden": "true",
        style: {
          width: "32px",
          height: "32px",
          minWidth: "32px",
          display: "inline-grid",
          placeItems: "center",
          borderRadius: "999px",
          background: "rgba(6, 24, 13, 0.12)",
          fontWeight: 1000,
          lineHeight: 1 } },

      "↩")), /*#__PURE__*/
      React.createElement("div", { className: "player-collection-hero" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("p", { className: "eyebrow" }, "Permanent Progress"), /*#__PURE__*/
      React.createElement("h1", null, "Player Collection"), /*#__PURE__*/
      React.createElement("p", null, "Every drafted starter and bench player is saved here.")), /*#__PURE__*/
      React.createElement("div", { className: "collection-stat-card" }, /*#__PURE__*/
      React.createElement("strong", null, playerCollectionStats.found), /*#__PURE__*/
      React.createElement("span", null, "/", playerCollectionStats.total), /*#__PURE__*/
      React.createElement("small", null, "Players Found"))), /*#__PURE__*/
      React.createElement("div", { className: "collection-bar player-collection-bar" }, /*#__PURE__*/
      React.createElement("div", { className: "collection-fill", style: { width: `${playerCollectionStats.percent}%` } })), /*#__PURE__*/
      React.createElement("p", { className: "collection-percent-label" }, playerCollectionStats.percent, "% complete"), /*#__PURE__*/
      React.createElement("div", { className: "player-collection-grid" },
      allCollectiblePlayers.map(player => {
        const id = getPlayerCollectionId(player);
        const unlocked = discoveredPlayerIds.has(id);
        return /*#__PURE__*/React.createElement("div", { key: id, className: `player-collection-card ${unlocked ? "unlocked" : "locked"}` }, /*#__PURE__*/
        React.createElement("span", { className: "collection-card-club" }, unlocked ? player.club : "???"), /*#__PURE__*/
        React.createElement("strong", { title: unlocked ? player.name : "Locked Player" }, unlocked ? getPitchDisplayName(player.name) : "Locked"), /*#__PURE__*/
        React.createElement("small", { className: unlocked ? getRatingClass(player.rating) : "" }, unlocked ? player.rating : "?"), /*#__PURE__*/
        React.createElement("em", null, unlocked ? player.position : "Draft to unlock"));
      })))));
  }

  if (!gameStarted) {
    return /*#__PURE__*/(
      React.createElement("section", { className: "start-screen" }, /*#__PURE__*/
      React.createElement("div", { className: "start-card" }, /*#__PURE__*/
      React.createElement("div", { className: "start-logo" }, "XI"), /*#__PURE__*/
      React.createElement("h1", null, modeTitle), /*#__PURE__*/
      React.createElement("p", { className: "start-subtitle" }, "Choose your draft mode."), /*#__PURE__*/
      React.createElement("div", { className: "mode-pill-stack", style: { display: "flex", flexDirection: "column", gap: "42px", width: "min(340px, 92vw)", margin: "30px auto 8px" } }, /*#__PURE__*/
      React.createElement("button", {
        className: "mode-pill-button",
        type: "button",
        style: {
          width: "100%",
          minHeight: "56px",
          border: "0",
          borderRadius: "999px",
          background: "#86f7a8",
          color: "#06180d",
          fontSize: "16px",
          fontWeight: 900,
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "18px" },

        onClick: () => {
          selectGameMode("europe");
          playSound("start", soundMuted);
          setGameStarted(true);
        } }, "Start Europe Mode"), /*#__PURE__*/
      React.createElement("button", {
        className: "mode-pill-button",
        type: "button",
        style: {
          width: "100%",
          minHeight: "56px",
          border: "0",
          borderRadius: "999px",
          background: "#86f7a8",
          color: "#06180d",
          fontSize: "16px",
          fontWeight: 900,
          textAlign: "center",
          cursor: "pointer" },

        onClick: () => {
          selectGameMode("worldcup");
          playSound("start", soundMuted);
          setGameStarted(true);
        } }, "Start World Cup Mode"), /*#__PURE__*/
      React.createElement("button", {
        className: "mode-pill-button",
        type: "button",
        style: {
          width: "100%",
          minHeight: "56px",
          border: "0",
          borderRadius: "999px",
          background: "#86f7a8",
          color: "#06180d",
          fontSize: "16px",
          fontWeight: 900,
          textAlign: "center",
          cursor: "pointer" },
        onClick: () => setShowPlayerCollection(true) }, "Player Collection ", playerCollectionStats.found, "/", playerCollectionStats.total)))));






  }

  const emptySlots = FORMATION.filter(slot => !draft[slot.id]);
  const nextNeededSlot = emptySlots[0];
  const selectedOpenSlots = selectedPlayer ? FORMATION.filter(slot => !draft[slot.id] && canPlaySlot(selectedPlayer, slot.label)) : [];
  const currentClubHasPlayablePick = currentClub ? clubHasPlayablePick(currentClub) : true;
  const bestSelectedSlot = selectedPlayer ?
  selectedOpenSlots.find(slot => {
    const positions = selectedPlayer.positions || [selectedPlayer.position];
    return positions.includes(slot.label) || selectedPlayer.position === slot.label;
  }) || selectedOpenSlots[0] :
  null;

  const guideStep = substituteMode ? "sub" : selectedPlayer ? "place" : currentClub ? "select" : benchDraftActive ? "bench" : fullSquadReady ? "simulate" : "spin";
  const guideTitle = guideStep === "spin" ? gameMode === "worldcup" ? "Spin your next nation" : "Spin your next club" :
  guideStep === "select" ? `Choose one player from ${currentClub.name}` :
  guideStep === "place" ? `Place ${selectedPlayer.name}` :
  guideStep === "bench" ? `Draft your bench (${bench.length}/${BENCH_LIMIT})` :
  guideStep === "sub" ? "Choose a starter to replace" :
  results ? gameMode === "worldcup" ? "Tournament complete" : "Season complete" : "Your squad is ready";
  const guideText = guideStep === "spin" ? `Your XI is ${draftedPlayers.length}/11 complete. Use ${gameMode === "worldcup" ? "Spin Nation" : "Spin Club"} to continue.` :
  guideStep === "select" ? currentClubHasPlayablePick ? "Pick the player who best fits your empty positions." : `No player from this ${gameMode === "worldcup" ? "nation" : "club"} fits your open slots. Take a free rescue spin.` :
  guideStep === "place" ? bestSelectedSlot ? `Tap the glowing ${bestSelectedSlot.label} slot. Best fit is highlighted brighter.` : "No open natural role. Choose another player or use Transfer Lifeline." :
  guideStep === "bench" ? `Your starting XI is complete. Spin ${BENCH_LIMIT - bench.length} more ${BENCH_LIMIT - bench.length === 1 ? "bench player" : "bench players"}.` :
  guideStep === "sub" ? selectedBenchPlayer ? `Tap an eligible starter to swap with ${selectedBenchPlayer.name}.` : "Pick one bench player, then tap an eligible starter on the pitch." :
  results ? "Review your results, awards, table, and share card." :
  gameMode === "worldcup" ? "Hit Simulate Tournament and chase the World Cup." : "Hit Simulate Season and chase 38-0.";
  const nextNeededText = nextNeededSlot ? `Next needed: ${nextNeededSlot.label}` : benchDraftActive ? `Bench needed: ${BENCH_LIMIT - bench.length}` : "Squad complete";
  const shareCardText = results ? makeShareCardText(results, playerSeasonStats, selectedFormationName, teamRating) : "";

  return /*#__PURE__*/(
    React.createElement("main", { className: "app" },
    saveNotice && /*#__PURE__*/React.createElement("div", { className: "save-toast" }, "Saved draft restored"),
    showTutorial && /*#__PURE__*/React.createElement("div", { className: "tutorial-overlay", role: "dialog", "aria-modal": "true" }, /*#__PURE__*/
    React.createElement("div", { className: "tutorial-card" }, /*#__PURE__*/
    React.createElement("button", { className: "tutorial-close", type: "button", onClick: closeTutorial, "aria-label": "Close tutorial" }, "x"), /*#__PURE__*/
    React.createElement("span", { className: "tutorial-kicker" }, "First Time Guide"), /*#__PURE__*/
    React.createElement("h2", null, "Build your XI in 4 steps"), /*#__PURE__*/
    React.createElement("div", { className: "tutorial-steps" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "1. Spin"), /*#__PURE__*/React.createElement("p", null, "Land on a European club.")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "2. Pick"), /*#__PURE__*/React.createElement("p", null, "Choose one player from that squad.")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "3. Place"), /*#__PURE__*/React.createElement("p", null, "Tap a glowing slot on the pitch.")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "4. Sim"), /*#__PURE__*/React.createElement("p", null, "Complete 11 players and chase 38-0."))), /*#__PURE__*/
    React.createElement("button", { className: "tutorial-start", type: "button", onClick: closeTutorial }, "Got it"))), /*#__PURE__*/
    React.createElement("section", { className: "hero" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("p", { className: "eyebrow" }, gameMode === "worldcup" ? "World Cup Draft" : "Europe Draft"), /*#__PURE__*/
    React.createElement("h1", null, modeTitle), /*#__PURE__*/
    React.createElement("p", null, gameMode === "worldcup" ? "Spin a World Cup nation, select any player, place them in your XI, then simulate a full World Cup run." : "Spin a European club, select any player, place them in your XI, then simulate a 38-game season."))), /*#__PURE__*/

    React.createElement("section", { className: `next-move-card step-${guideStep}` }, /*#__PURE__*/
    React.createElement("div", { className: "next-move-top" }, /*#__PURE__*/
    React.createElement("span", null, "NEXT MOVE"), /*#__PURE__*/
    React.createElement("strong", null, draftedPlayers.length, "/11", bench.length > 0 ? ` + ${bench.length}/${BENCH_LIMIT} bench` : "")), /*#__PURE__*/
    React.createElement("h2", null, guideTitle), /*#__PURE__*/
    React.createElement("p", null, guideText), /*#__PURE__*/
    React.createElement("div", { className: "squad-progress" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("span", { style: { width: `${Math.round(draftedPlayers.length / 11 * 100)}%` } }))), /*#__PURE__*/
    React.createElement("small", null, nextNeededText)), /*#__PURE__*/

    React.createElement("section", { className: "draft-steps", "aria-label": "Draft progress" }, /*#__PURE__*/
    React.createElement("span", { className: guideStep === "spin" ? "active" : draftedPlayers.length > 0 || currentClub || selectedPlayer ? "done" : "" }, "Spin"), /*#__PURE__*/
    React.createElement("span", { className: guideStep === "select" ? "active" : selectedPlayer || draftedPlayers.length > 0 ? "done" : "" }, "Select"), /*#__PURE__*/
    React.createElement("span", { className: guideStep === "place" ? "active" : draftedPlayers.length > 0 ? "done" : "" }, "Place"), /*#__PURE__*/
    React.createElement("span", { className: guideStep === "bench" ? "active" : bench.length >= BENCH_LIMIT ? "done" : "" }, "Bench"), /*#__PURE__*/
    React.createElement("span", { className: guideStep === "simulate" ? "active" : results ? "done" : "" }, "Sim")), /*#__PURE__*/



    React.createElement("section", { className: "controls sticky-draft-controls", ref: controlsRef }, /*#__PURE__*/
    currentClub && !currentClubHasPlayablePick && !spinning && !fullSquadReady && /*#__PURE__*/React.createElement("button", { className: "rescue-spin", onClick: rescueSpinClub }, "Rescue Spin"), /*#__PURE__*/

    React.createElement("button", { className: "ghost", onClick: resetGame }, "Reset"), /*#__PURE__*/
    React.createElement("button", { className: "ghost change-mode-button", type: "button", onClick: returnToStartScreen, disabled: spinning || simulating }, "Change Mode"), /*#__PURE__*/
    React.createElement("button", { className: "share-draft-button", type: "button", onClick: shareDraftXI }, shareCopied ? "Link Copied!" : "Share Draft XI"), /*#__PURE__*/
    React.createElement("button", { className: "ghost", type: "button", onClick: () => setShowPlayerCollection(true) }, "Collection ", playerCollectionStats.found, "/", playerCollectionStats.total), /*#__PURE__*/
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
      disabled: spinning || simulating || !!results },

    name))),



    draftedPlayers.length > 0 && !results && /*#__PURE__*/
    React.createElement("small", null, "Changing formation will auto-fit your current XI. Tap players to fix any bad fits."),
    results && /*#__PURE__*/
    React.createElement("small", null, "Start a new draft to change formation after simulation.")),



    formationNotice && !results && draftedPlayers.length > 0 && /*#__PURE__*/
    React.createElement("section", { className: `formation-notice ${formationNotice.outOfPositionCount ? "has-warnings" : ""}` }, /*#__PURE__*/
    React.createElement("strong", null, "Formation changed to ", formationNotice.name), /*#__PURE__*/
    React.createElement("span", null, formationNotice.outOfPositionCount ? `${formationNotice.outOfPositionCount} player${formationNotice.outOfPositionCount === 1 ? "" : "s"} need${formationNotice.outOfPositionCount === 1 ? "s" : ""} a better position. Tap cards on the pitch to swap them.` : "Your XI was auto-fitted cleanly.")),



    spinning && spinWinner && /*#__PURE__*/
    React.createElement("section", { className: "spinner-card auto-focus-section", ref: spinnerRef }, /*#__PURE__*/
    React.createElement("div", { className: "spinner-window", ref: spinnerWindowRef }, /*#__PURE__*/
    React.createElement("div", { className: "spinner-pointer" }, "\u25BC"), /*#__PURE__*/
    React.createElement("div", { key: spinKey, className: `reel-spinner ${spinReady ? "spin-active" : "spin-measuring"}`, style: { "--spinOffset": `-${spinOffset}px` }, onAnimationEnd: event => {
        if (event.target !== event.currentTarget) return;
        if (event.animationName !== "dynamicReelSpin") return;
        finishSpin(spinWinner);
      } },
    spinReel.map((club, index) => /*#__PURE__*/
    React.createElement("div", {
      key: `${club.id}_${index}`,
      "data-spin-index": index,
      className: `reel-team ${index === spinTargetIndex ? "winner-team" : ""} ${club.jackpot ? "jackpot-team" : ""}`,
      style: { "--teamColor": club.color } }, /*#__PURE__*/

    React.createElement("span", null, club.name), /*#__PURE__*/
    React.createElement("small", null, club.jackpot ? `JACKPOT - ${club.season}` : club.season))))), /*#__PURE__*/




    React.createElement("p", null, gameMode === "worldcup" ? "Spinning nation..." : "Spinning club..."), /*#__PURE__*/
    React.createElement("small", { className: "scroll-hint" }, "Landing team appears here \u2193")),



    simulating && liveSeason && /*#__PURE__*/
    React.createElement("section", { className: "season-sim auto-focus-section", ref: simulationRef }, /*#__PURE__*/
    React.createElement("div", { className: "season-sim-top" }, /*#__PURE__*/
    React.createElement("span", null, "Simulating Season"), /*#__PURE__*/
    React.createElement("strong", null, gameMode === "worldcup" ? `Match ${liveSeason.week}/8` : `GW ${liveSeason.week}/38`)), /*#__PURE__*/


    React.createElement("div", { className: "season-record-card", ref: simulationRecordRef }, /*#__PURE__*/
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
    simProgress, "% complete \xB7 Goals ", liveSeason.gf, "-", liveSeason.ga),


    liveLeagueTable.length > 0 && /*#__PURE__*/
    React.createElement("div", { className: "live-table-card" }, /*#__PURE__*/
    React.createElement("h3", null, "Live League Table"), /*#__PURE__*/
    React.createElement("div", { className: "mini-table" }, /*#__PURE__*/
    React.createElement("div", { className: "mini-table-row head" }, /*#__PURE__*/
    React.createElement("span", null, "#"), /*#__PURE__*/React.createElement("span", null, "Club"), /*#__PURE__*/React.createElement("span", null, "P"), /*#__PURE__*/React.createElement("span", null, "Pts")),

    liveLeagueTable.slice(0, 20).map((row) => /*#__PURE__*/
    React.createElement("div", { key: row.team, className: `mini-table-row ${row.user ? "you" : ""}` }, /*#__PURE__*/
    React.createElement("span", null, row.position), /*#__PURE__*/
    React.createElement("strong", null, row.team), /*#__PURE__*/
    React.createElement("span", null, row.played), /*#__PURE__*/
    React.createElement("b", null, row.points)))))),








    selectedPlayer && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner" }, "Selected: ", /*#__PURE__*/
    React.createElement("strong", null, selectedPlayer.name), " \u2014 use the position buttons on their card."),



    movingSlotId && draft[movingSlotId] && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner" }, "Moving: ", /*#__PURE__*/
    React.createElement("strong", null, draft[movingSlotId].name), " - click an eligible empty slot or occupied player to swap."),



    transferMode && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner transfer-banner" }, "Transfer Lifeline active \u2014 click one drafted player on the pitch to remove them, then spin for a replacement."),


    benchDraftActive && !currentClub && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner bench-banner" }, "Starting XI complete \u2014 spin for ", BENCH_LIMIT - bench.length, " more bench ", BENCH_LIMIT - bench.length === 1 ? "player" : "players", "."),


    substituteMode && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner substitute-banner" }, selectedBenchPlayer ? ["Substitute active \u2014 tap an eligible starter to replace with ", /*#__PURE__*/React.createElement("strong", { key: "name" }, selectedBenchPlayer.name), "."] : "Substitute active \u2014 choose one bench player below, then tap an eligible starter."),


    currentClub && !currentClubHasPlayablePick && /*#__PURE__*/
    React.createElement("section", { className: "selected-banner rescue-banner" }, gameMode === "worldcup" ? "No eligible player fits the remaining slots. Use Rescue Spin for a free replacement nation." : "No eligible player fits the remaining slots. Use Rescue Spin for a free replacement club."),


    currentClub && /*#__PURE__*/
    React.createElement("section", { className: "club-panel auto-focus-section", ref: clubPanelRef, style: { "--club": currentClub.color } }, /*#__PURE__*/
    React.createElement("div", { className: "club-header" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, currentClub.name), /*#__PURE__*/
    React.createElement("p", null, currentClub.jackpot ? "JACKPOT - " : "", currentClub.season, " \xB7 ", currentClub.league)), /*#__PURE__*/

    React.createElement("strong", null, currentClub.rating)), /*#__PURE__*/

    React.createElement("div", { className: "mobile-flow-hint" }, "Pick a player, then tap their position button."), /*#__PURE__*/
    React.createElement("div", { className: "player-grid" },
    availablePlayers.map(player => {
      const unavailable = pickedNames.includes(player.name) || !benchDraftActive && isPlayerPositionUnavailable(player);
      const isSelected = (selectedPlayer === null || selectedPlayer === void 0 ? void 0 : selectedPlayer.id) === player.id;

      return /*#__PURE__*/(
        React.createElement("div", {
          key: player.id,
          role: "button",
          tabIndex: unavailable ? -1 : 0,
          "aria-disabled": unavailable,
          className: `player-card ${benchDraftActive ? "bench-pick-card" : ""} ${isSelected ? "selected" : ""} ${!benchDraftActive && isPlayerPositionUnavailable(player) ? "position-filled" : ""}`,
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

        benchDraftActive && /*#__PURE__*/React.createElement("span", { className: "bench-pick-pill" }, "Bench Pick"),

        isSelected && !benchDraftActive && /*#__PURE__*/
        React.createElement("div", { className: "inline-position-buttons" },
        getEligibleSlotOptions(player).map(pos => {
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




        !benchDraftActive && isPlayerPositionUnavailable(player) && /*#__PURE__*/React.createElement("em", { className: "taken-position" }, "No open role"))));



    }))), /*#__PURE__*/




    React.createElement("section", { className: "pitch-wrap auto-focus-section", ref: pitchRef }, /*#__PURE__*/
    React.createElement("div", { className: "pitch-toolbar pitch-toolbar-clean" }, /*#__PURE__*/
    React.createElement("div", { className: "pitch-title-block" }, /*#__PURE__*/
    React.createElement("span", { className: "pitch-formation-pill" }, selectedFormationName), /*#__PURE__*/
    React.createElement("h2", null, "Your XI")), /*#__PURE__*/
    React.createElement("div", { className: "record-card pitch-record-card" }, /*#__PURE__*/
    React.createElement("span", null, "XI Rating"), /*#__PURE__*/
    React.createElement("strong", null, teamRating || "--"), /*#__PURE__*/
    React.createElement("small", null, draftedPlayers.length, "/11 players"), /*#__PURE__*/
    React.createElement("small", null, "Rerolls: ", rerollsLeft),
    draftedPlayers.length > 0 && /*#__PURE__*/React.createElement("small", { className: "projected-level" }, getProjectedLevel(teamRating)),
    draftedPlayers.length > 0 && /*#__PURE__*/
    React.createElement("div", { className: "profile-mini" }, /*#__PURE__*/
    React.createElement("span", null, "ATK ", calculateTeamProfile(draftedPlayers).attack), /*#__PURE__*/
    React.createElement("span", null, "MID ", calculateTeamProfile(draftedPlayers).midfield), /*#__PURE__*/
    React.createElement("span", null, "DEF ", calculateTeamProfile(draftedPlayers).defense)))), /*#__PURE__*/
    React.createElement("div", {
      className: "formation-sticky-lifelines",
      style: {
        position: "sticky",
        top: "10px",
        zIndex: 80,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
        margin: "12px auto 18px",
        padding: "10px",
        width: "fit-content",
        maxWidth: "100%",
        borderRadius: "999px",
        background: "rgba(3, 20, 9, 0.84)",
        border: "1px solid rgba(141, 255, 179, 0.22)",
        boxShadow: "0 14px 32px rgba(0, 0, 0, 0.24)",
        backdropFilter: "blur(10px)" } },
    /*#__PURE__*/
    React.createElement("button", {
      className: (guideStep === "spin" || guideStep === "bench") && !spinning ? "guide-pulse sticky-spin-button" : "sticky-spin-button",
      onClick: spinClub,
      disabled: spinning || !!currentClub || fullSquadReady || substituteMode,
      style: {
        border: "0",
        borderRadius: "999px",
        padding: "10px 18px",
        background: "linear-gradient(135deg, var(--green, #8dffb3), #22c55e)",
        color: "var(--green-dark, #06210f)",
        fontWeight: 900,
        boxShadow: "0 10px 22px rgba(57,255,136,0.2)" } },

    spinning ? "Spinning..." : currentClub ? "Pick Player" : benchDraftActive ? `Spin Bench (${BENCH_LIMIT - bench.length})` : gameMode === "worldcup" ? "Spin Nation" : "Spin Club"), /*#__PURE__*/

    React.createElement("button", {
      className: "reroll",
      onClick: rerollClub,
      disabled: !currentClub || rerollsLeft <= 0 || spinning || fullSquadReady || substituteMode,
      style: {
        border: "0",
        borderRadius: "999px",
        padding: "10px 16px",
        background: rerollsLeft > 0 ? "var(--yellow, #ffe08a)" : "rgba(255,255,255,0.14)",
        color: rerollsLeft > 0 ? "#201600" : "rgba(255,255,255,0.65)",
        fontWeight: 900,
        boxShadow: "0 10px 22px rgba(0,0,0,0.18)" } },

    rerollsLeft > 0 ? `Reroll (${rerollsLeft})` : "No Rerolls"), /*#__PURE__*/

    React.createElement("button", {
      className: "transfer-lifeline",
      onClick: () => setTransferMode(prev => !prev),
      disabled: draftedPlayers.length < 6 || transferUsed || spinning || simulating || !!results || benchDraftActive || substituteMode,
      style: {
        border: "0",
        borderRadius: "999px",
        padding: "10px 16px",
        background: transferMode ? "var(--yellow, #ffe08a)" : "linear-gradient(135deg, var(--green, #8dffb3), #22c55e)",
        color: transferMode ? "#201600" : "var(--green-dark, #06210f)",
        fontWeight: 900,
        boxShadow: "0 10px 22px rgba(57,255,136,0.18)" } },

    transferUsed ? "Transfer Used" : transferMode ? "Cancel Transfer" : "Transfer Lifeline"), /*#__PURE__*/

    React.createElement("button", {
      className: "substitute-lifeline",
      onClick: () => {
        setSubstituteMode(prev => !prev);
        setTransferMode(false);
        setSelectedPlayer(null);
        setMovingSlotId(null);
        setSelectedBenchId(null);
      },
      disabled: !fullSquadReady || substituteUsed || spinning || simulating || !!results,
      style: {
        border: "0",
        borderRadius: "999px",
        padding: "10px 16px",
        background: substituteMode ? "var(--yellow, #ffe08a)" : "linear-gradient(135deg, var(--green, #8dffb3), #22c55e)",
        color: substituteMode ? "#201600" : "var(--green-dark, #06210f)",
        fontWeight: 900,
        boxShadow: "0 10px 22px rgba(57,255,136,0.18)" } },

    substituteUsed ? "Sub Used" : substituteMode ? "Cancel Sub" : "Substitute Lifeline"), /*#__PURE__*/

    React.createElement("button", {
      className: "sticky-sim-button",
      onClick: () => gameMode === "worldcup" ? simulateWorldCupTournament() : simulateSeason(),
      disabled: !fullSquadReady || simulating || !!results,
      style: {
        border: "0",
        borderRadius: "999px",
        padding: "10px 16px",
        background: "linear-gradient(135deg, var(--green, #8dffb3), #22c55e)",
        color: "var(--green-dark, #06210f)",
        fontWeight: 900,
        boxShadow: "0 10px 22px rgba(57,255,136,0.18)" } },

    gameMode === "worldcup" ? "Sim Tournament" : "Sim Season")), /*#__PURE__*/
    React.createElement("div", { className: "pitch" },
    FORMATION.map(slot => {var _slot$mobileX, _slot$mobileY;
      const player = draft[slot.id];
      const slotPlayable = selectedPlayer && !player && canPlaySlot(selectedPlayer, slot.label);
      const slotBest = slotPlayable && bestSelectedSlot && bestSelectedSlot.id === slot.id;
      const slotInvalid = selectedPlayer && !player && !slotPlayable;
      const movingPlayer = movingSlotId ? draft[movingSlotId] : null;
      const moveTarget = movingPlayer && !player && canPlaySlot(movingPlayer, slot.label);
      const moveBlocked = movingPlayer && !player && !moveTarget;
      const moveSource = movingSlotId === slot.id;
      const swapTarget = movingPlayer && player && !moveSource && canPlaySlot(movingPlayer, slot.label) && canPlaySlot(player, getSlotLabel(movingSlotId));
      const swapBlocked = movingPlayer && player && !moveSource && !swapTarget;
      const subTarget = substituteMode && selectedBenchPlayer && player && canPlaySlot(selectedBenchPlayer, slot.label);
      const subBlocked = substituteMode && selectedBenchPlayer && player && !subTarget;
      return /*#__PURE__*/(
        React.createElement("div", {
          key: slot.id,
          role: "button",
          tabIndex: 0,
          className: `slot ${(selectedPlayer || movingSlotId) && !player ? "can-place" : ""} ${slotPlayable ? "valid-slot" : ""} ${slotBest ? "best-slot" : ""} ${slotInvalid ? "invalid-slot" : ""} ${moveTarget ? "move-target" : ""} ${moveBlocked ? "move-blocked" : ""} ${moveSource ? "moving-source" : ""} ${swapTarget ? "swap-target" : ""} ${swapBlocked ? "swap-blocked" : ""} ${transferMode && player ? "transfer-remove" : ""} ${subTarget ? "sub-target" : ""} ${subBlocked ? "sub-blocked" : ""} ${lastPlacedSlot === slot.id ? "placed" : ""}`,
          style: { left: `${isMobileFormation ? (_slot$mobileX = slot.mobileX) !== null && _slot$mobileX !== void 0 ? _slot$mobileX : slot.x : slot.x}%`, top: `${isMobileFormation ? (_slot$mobileY = slot.mobileY) !== null && _slot$mobileY !== void 0 ? _slot$mobileY : slot.y : slot.y}%` },
          onClick: () => {
            if (substituteMode && player && subTarget) makeSubstitution(slot.id);else
            if (substituteMode) return;else
            if (transferMode && player) removePlayerForTransfer(slot.id);else
            if (movingSlotId && player && movingSlotId === slot.id) setMovingSlotId(null);else
            if (movingSlotId && player && swapTarget) swapPlayersWithSlot(slot.id);else
            if (movingSlotId && player && swapBlocked) return;else
            if (movingSlotId && !player && moveTarget) movePlayerToSlot(slot.id);else
            if (player && !results && !simulating) {
              setSelectedPlayer(null);
              setMovingSlotId(slot.id);
            } else if (!player) placePlayer(slot.id);
          },
          onKeyDown: e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (substituteMode && player && subTarget) makeSubstitution(slot.id);else
              if (substituteMode) return;else
              if (transferMode && player) removePlayerForTransfer(slot.id);else
              if (movingSlotId && player && movingSlotId === slot.id) setMovingSlotId(null);else
              if (movingSlotId && player && swapTarget) swapPlayersWithSlot(slot.id);else
              if (movingSlotId && player && swapBlocked) return;else
              if (movingSlotId && !player && moveTarget) movePlayerToSlot(slot.id);else
              if (player && !results && !simulating) {
                setSelectedPlayer(null);
                setMovingSlotId(slot.id);
              } else if (!player) placePlayer(slot.id);
            }
          } }, /*#__PURE__*/

        React.createElement("span", null, slot.label),
        player ? /*#__PURE__*/
        React.createElement(React.Fragment, null, /*#__PURE__*/
        React.createElement("strong", { title: player.name }, getPitchDisplayName(player.name)), /*#__PURE__*/
        React.createElement("small", { className: getRatingClass(player.finalRating) }, player.finalRating),
        player.penalty > 0 && /*#__PURE__*/React.createElement("small", { className: "penalty-badge" }, "-", player.penalty, " OOP"), /*#__PURE__*/
        React.createElement("em", null, moveSource ? "Tap again to cancel" : movingSlotId ? swapTarget ? "Swap Here" : "Not Eligible" : player.positions.join("/"))) : /*#__PURE__*/



        React.createElement("em", null, movingSlotId ? moveTarget ? "Move Here" : "Not Eligible" : slotBest ? "Best Fit" : slotPlayable ? "Place Here" : selectedPlayer ? "Not Fit" : "Empty")));



    }))),


    (bench.length > 0 || benchDraftActive || fullSquadReady) && /*#__PURE__*/
    React.createElement("section", {
      className: "bench-panel bench-slot-panel",
      style: {
        width: "100%",
        margin: "22px 0",
        padding: "22px",
        borderRadius: 30,
        background: "rgba(255, 255, 255, 0.075)",
        border: "1px solid rgba(141, 255, 179, 0.24)",
        boxShadow: "0 22px 70px rgba(0, 0, 0, 0.28)" } },
    /*#__PURE__*/
    React.createElement("div", { className: "bench-panel-header", style: { marginBottom: 16 } }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", { style: { margin: "0 0 6px", color: "#f5fff8", fontSize: 24, fontWeight: 1000 } }, "Bench"), /*#__PURE__*/
    React.createElement("p", { style: { margin: 0, color: "#ccefd7", fontSize: 14, fontWeight: 800 } }, bench.length, "/", BENCH_LIMIT, " players", benchDraftActive ? " - keep spinning to fill it." : fullSquadReady ? " - ready for one substitution." : ""))), /*#__PURE__*/
    React.createElement("div", {
      className: "bench-grid bench-slot-grid",
      style: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 16 } },


    bench.length ? bench.map(player => {
      const activeBench = selectedBenchId === player.benchId;
      return /*#__PURE__*/React.createElement("button", {
        key: player.benchId || player.id || player.name,
        type: "button",
        className: `bench-card bench-slot-card ${activeBench ? "selected" : ""}`,
        disabled: !substituteMode || substituteUsed || !!results || simulating,
        onClick: () => setSelectedBenchId(activeBench ? null : player.benchId),
        style: {
          appearance: "none",
          WebkitAppearance: "none",
          position: "relative",
          width: 118,
          height: 128,
          minWidth: 118,
          minHeight: 128,
          maxWidth: 118,
          margin: 0,
          padding: "12px 9px 10px",
          borderRadius: 20,
          border: activeBench ? "3px solid #8dffb3" : "3px solid rgba(21, 142, 66, 0.95)",
          background: "rgba(3, 20, 9, 0.96)",
          color: "#f5fff8",
          display: "grid",
          gridTemplateRows: "17px 18px 45px 15px",
          placeItems: "center",
          alignContent: "center",
          justifyContent: "center",
          gap: 1,
          textAlign: "center",
          overflow: "hidden",
          boxShadow: activeBench ? "0 0 0 4px rgba(141,255,179,.18), 0 0 24px rgba(141,255,179,.32), 0 12px 26px rgba(0,0,0,.28)" : "inset 0 0 0 1px rgba(141,255,179,.08), 0 10px 24px rgba(0,0,0,.24)",
          fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          lineHeight: 1,
          whiteSpace: "normal",
          opacity: 1,
          filter: "none",
          cursor: substituteMode && !substituteUsed && !results && !simulating ? "pointer" : "default" } },

      /*#__PURE__*/
      React.createElement("span", { style: { display: "block", width: "100%", color: "#f5fff8", fontSize: 13, fontWeight: 1000, lineHeight: 1, letterSpacing: ".02em", textTransform: "uppercase", textAlign: "center" } }, player.position), /*#__PURE__*/
      React.createElement("strong", { title: player.name, style: { display: "block", width: 92, maxWidth: 92, color: "#f5fff8", fontSize: 12, fontWeight: 900, lineHeight: 1.05, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" } }, getPitchDisplayName(player.name)), /*#__PURE__*/
      React.createElement("small", { className: getRatingClass(player.finalRating || player.rating), style: { display: "inline-grid", placeItems: "center", width: 43, height: 43, minWidth: 43, minHeight: 43, margin: "1px 0", padding: 0, borderRadius: 999, background: "#f1c40f", color: "#14200b", fontSize: 17, fontWeight: 1000, lineHeight: 1, textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,.22)" } }, player.finalRating || player.rating), /*#__PURE__*/
      React.createElement("em", { style: { display: "block", width: "100%", color: "#9feeb8", fontSize: 12, fontStyle: "italic", fontWeight: 800, lineHeight: 1, textAlign: "center", opacity: .95, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, substituteMode ? activeBench ? "Selected" : "Tap to Sub" : player.positions ? player.positions.join("/") : player.position));
    }) : /*#__PURE__*/React.createElement("div", { className: "bench-empty" }, "Bench opens after the starting XI is complete."))),



    results && /*#__PURE__*/
    React.createElement("section", { className: "results auto-focus-section", ref: resultsRef }, /*#__PURE__*/
    React.createElement("h2", null, results.badge), /*#__PURE__*/
    React.createElement("div", { className: "result-stats" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.wins), /*#__PURE__*/React.createElement("span", null, "Wins")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.draws), /*#__PURE__*/React.createElement("span", null, "Draws")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.losses), /*#__PURE__*/React.createElement("span", null, "Losses")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.points), /*#__PURE__*/React.createElement("span", null, results.tournamentMode ? "Group Pts" : "Points")), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, results.gf, "-", results.ga), /*#__PURE__*/React.createElement("span", null, "Goals"))), /*#__PURE__*/


    React.createElement("div", { className: "results-actions" }, /*#__PURE__*/
    React.createElement("button", { type: "button", onClick: copyLatestResult }, shareCopied ? "Copied!" : "Copy Share Card"), /*#__PURE__*/
    React.createElement("button", { className: "share-draft-button", type: "button", onClick: shareDraftXI }, "Share Draft XI")),


    ((_results$table = results.table) === null || _results$table === void 0 ? void 0 : _results$table.length) > 0 && /*#__PURE__*/
    React.createElement("div", { className: "final-table-panel" }, /*#__PURE__*/
    React.createElement("h3", null, results.tournamentMode ? "Tournament Path" : "Final League Table"), /*#__PURE__*/
    React.createElement("div", { className: "mini-table" }, /*#__PURE__*/
    React.createElement("div", { className: "mini-table-row head" }, /*#__PURE__*/
    React.createElement("span", null, "#"), /*#__PURE__*/React.createElement("span", null, "Club"), /*#__PURE__*/React.createElement("span", null, "W-D-L"), /*#__PURE__*/React.createElement("span", null, "Pts")),

    results.table.map((row) => /*#__PURE__*/
    React.createElement("div", { key: row.team, className: `mini-table-row ${row.user ? "you" : ""}` }, /*#__PURE__*/
    React.createElement("span", null, row.position), /*#__PURE__*/
    React.createElement("strong", null, row.team), /*#__PURE__*/
    React.createElement("span", null, row.wins, "-", row.draws, "-", row.losses), /*#__PURE__*/
    React.createElement("b", null, row.points))))),






    seasonAwards.length > 0 && /*#__PURE__*/
    React.createElement("div", { className: "awards-panel" }, /*#__PURE__*/
    React.createElement("h3", null, gameMode === "worldcup" ? "Tournament Rewards" : "Season Awards"), /*#__PURE__*/
    React.createElement("div", { className: "awards-grid" },
    seasonAwards.map((award) => /*#__PURE__*/
    React.createElement("div", { key: award.title, className: "award-card" }, /*#__PURE__*/
    React.createElement("span", null, award.icon), /*#__PURE__*/
    React.createElement("strong", null, award.title), /*#__PURE__*/
    React.createElement("small", null, award.value))))), /*#__PURE__*/





    React.createElement("div", { className: "match-list" },
    results.matches.map((match) => /*#__PURE__*/
    React.createElement("div", {
      key: match.week,
      className: `match ${match.result}`,
      style: { animationDelay: `${match.week * 0.035}s` },
      onClick: () => setSelectedMatch(match) }, /*#__PURE__*/

    React.createElement("span", null, results.tournamentMode ? match.stage || `Match ${match.week}` : `GW ${match.week}`), /*#__PURE__*/
    React.createElement("strong", null, match.result), /*#__PURE__*/
    React.createElement("p", null, match.score, match.decidedByPens ? ` (${match.penaltyScore} pens)` : "", " vs ", match.opponent)))),




    selectedMatch && /*#__PURE__*/
    React.createElement("div", { className: "match-detail-overlay", onClick: () => setSelectedMatch(null) }, /*#__PURE__*/
    React.createElement("div", { className: "match-detail-card", onClick: e => e.stopPropagation() }, /*#__PURE__*/
    React.createElement("button", { className: "match-detail-close", onClick: () => setSelectedMatch(null) }, "\xD7"), /*#__PURE__*/



    React.createElement("h3", null, selectedMatch.stage || `GW ${selectedMatch.week}`, " vs ", selectedMatch.opponent), /*#__PURE__*/
    React.createElement("strong", { className: `match-detail-score ${selectedMatch.result}` },
    selectedMatch.result, " \xB7 ", selectedMatch.score, selectedMatch.decidedByPens ? ` (${selectedMatch.penaltyScore} pens)` : ""), /*#__PURE__*/
    selectedMatch.decidedByPens && /*#__PURE__*/React.createElement("small", { className: "xg-pill penalty-pill" }, "Penalties: ", selectedMatch.penaltyWinner, " won ", selectedMatch.penaltyScore), /*#__PURE__*/
    selectedMatch.xg && /*#__PURE__*/React.createElement("small", { className: "xg-pill" }, "xG ", selectedMatch.xg), /*#__PURE__*/


    React.createElement("div", { className: "scorer-breakdown" }, /*#__PURE__*/
    React.createElement("div", { className: "scorer-team-block" }, /*#__PURE__*/
    React.createElement("h4", null, "Your Goals"), /*#__PURE__*/
    React.createElement("div", { className: "scorer-list" },
    ((_selectedMatch$scorer = selectedMatch.scorers) === null || _selectedMatch$scorer === void 0 ? void 0 : _selectedMatch$scorer.length) > 0 ?
    selectedMatch.scorers.map((scorer, index) => /*#__PURE__*/
    React.createElement("div", { key: `our_${scorer.name}_${index}`, className: "scorer-row our-goal" }, /*#__PURE__*/
    React.createElement("span", null, "Goal ", scorer.minute, "'"), /*#__PURE__*/
    React.createElement("strong", null, scorer.name), /*#__PURE__*/
    React.createElement("em", null, scorer.position))) : /*#__PURE__*/



    React.createElement("p", null, "No Draft XI goals."))), /*#__PURE__*/




    React.createElement("div", { className: "scorer-team-block" }, /*#__PURE__*/
    React.createElement("h4", null, selectedMatch.opponent, " Goals"), /*#__PURE__*/
    React.createElement("div", { className: "scorer-list" },
    ((_selectedMatch$oppone = selectedMatch.opponentScorers) === null || _selectedMatch$oppone === void 0 ? void 0 : _selectedMatch$oppone.length) > 0 ?
    selectedMatch.opponentScorers.map((scorer, index) => /*#__PURE__*/
    React.createElement("div", { key: `opp_${scorer.name}_${index}`, className: "scorer-row opponent-goal" }, /*#__PURE__*/
    React.createElement("span", null, "Goal ", scorer.minute, "'"), /*#__PURE__*/
    React.createElement("strong", null, scorer.name), /*#__PURE__*/
    React.createElement("em", null, scorer.position))) : /*#__PURE__*/



    React.createElement("p", null, "No opponent goals."))),




    ((_selectedMatch$allSco = selectedMatch.allScorers) === null || _selectedMatch$allSco === void 0 ? void 0 : _selectedMatch$allSco.length) > 0 && /*#__PURE__*/
    React.createElement("div", { className: "scorer-team-block full-width" }, /*#__PURE__*/
    React.createElement("h4", null, "Goal Timeline"), /*#__PURE__*/
    React.createElement("div", { className: "scorer-list" },
    selectedMatch.allScorers.map((scorer, index) => /*#__PURE__*/
    React.createElement("div", { key: `timeline_${scorer.name}_${index}`, className: "scorer-row timeline-goal" }, /*#__PURE__*/
    React.createElement("span", null, "Goal ", scorer.minute, "'"), /*#__PURE__*/
    React.createElement("strong", null, scorer.name), /*#__PURE__*/
    React.createElement("em", null, scorer.team)))))))),










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
    reward)))),






    draftHistory.length > 0 && /*#__PURE__*/
    React.createElement("div", { className: "history-panel" }, /*#__PURE__*/
    React.createElement("h3", null, "Draft History / Trophy Cabinet"), /*#__PURE__*/
    React.createElement("div", { className: "history-list" },
    draftHistory.slice(0, 5).map((run) => /*#__PURE__*/
    React.createElement("div", { key: run.id, className: "history-card" }, /*#__PURE__*/
    React.createElement("strong", null, run.badge), /*#__PURE__*/
    React.createElement("span", null, run.record, " \xB7 ", run.points, " pts \xB7 ", run.formation), /*#__PURE__*/
    React.createElement("small", null, "MVP: ", run.mvp), /*#__PURE__*/
    React.createElement("small", null, "Top Scorer: ", run.topScorer))))), /*#__PURE__*/






    React.createElement("button", { className: "play-again", onClick: resetGame }, "Play Again"))));




}

const rootElement = document.getElementById("root");

if (rootElement && typeof ReactDOM !== "undefined") {
  const app = React.createElement(App, null);

  if (ReactDOM.createRoot) {
    ReactDOM.createRoot(rootElement).render(app);
  } else if (ReactDOM.render) {
    ReactDOM.render(app, rootElement);
  }
}