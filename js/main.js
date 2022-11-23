// 0 = Normal   | 4 = ground | 8 =  steel | 12 = electric | 16 = dark
// 1 = Fighting | 5 = rock   | 9 =  fire  | 13 = psychic  | 17 = fairy
// 2 = Flying   | 6 = bug    | 10 = water | 14 = ice      | 
// 3 = Posion   | 7 = ghost  | 11 = grass | 15 = dragon   | 19 = shadow
const imageContainer = document.querySelector('img')
const pokeName = document.querySelector('#pokeName')
const pokeType = document.querySelector('#pokeType')
const button = document.querySelector('button')
const first = document.querySelector('#first')
const second = document.querySelector('#second')
const third = document.querySelector('#third')
let correctAnswer;
let answerArr;
button.addEventListener('click', getRandomPokemon)
// first.addEventListener('click', checkAnswer)
// second.addEventListener('click', checkAnswer)
// third.addEventListener('click', checkAnswer)

async function getRandomPokemon(){
  let randomIndex = Math.ceil(Math.random() * 151)
  let url = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`
  let res = await fetch(url)
  let data = await res.json()
  console.log(data)

  imageContainer.src = data['sprites']['front_default']
  pokeName.innerText = data['name']
  pokeType.innerText = (data['types'].length > 1) ? data['types']['0']['type']['name'] + ' / ' + data['types']['1']['type']['name'] : data['types']['0']['type']['name']

 
  let type = await getType(data)
  let answers = await createAnswers(type)
  answerArr = answers.slice()
  console.log(answerArr)
  console.log(correctAnswer)


  


  fetch("https://pokeapi.co/api/v2/type")
    .then(res => res.json())
    .then(data => {
      first.innerText = data['results'][answers[0]]['name']
      second.innerText = data['results'][answers[1]]['name']
      third.innerText = data['results'][answers[2]]['name']
    })
  

}
async function getType(pokemon){
  let res = await fetch(pokemon['types']['0']['type']['url'])
  let data = await res.json()
  console.log(data)
  
  const doubleDamage = await data['damage_relations']['double_damage_from']
  const rightAnswers = []
  Object.entries(doubleDamage).forEach(([key, value]) => rightAnswers.push(value['url'].split('/')[6]))
  
  return rightAnswers
}
async function createAnswers(rightAnswers){
  
  
  let answers = []
  let randNum = Math.floor(Math.random() * rightAnswers.length)
  correctAnswer = rightAnswers[randNum] // storing globally
  answers.push(rightAnswers[randNum])
  
  while (answers.length !== 3) {
    randNum = Math.floor(Math.random() * 18)
    if (!rightAnswers.includes(String(randNum))){
      answers.push(String(randNum))
    }
  }
  
  shuffleArr(answers)
  
  return answers
}
function shuffleArr(arr){
  let i = arr.length;
  while (--i > 0) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }
}
