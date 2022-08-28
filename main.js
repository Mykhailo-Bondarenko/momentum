import musicPlaylist from './module/musicPlaylist.js';
import words from './module/words.js';
import randomValue from './module/randomValue.js';
import nameTitleSettings from './module/nameTitleSettings.js';
import morningImages from './module/morningImages.js';
import afternoonImages from './module/afternoonImages.js';
import eveningImages from './module/eveningImages.js';
import nightImages from './module/nightImages.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const body = document.querySelector('body');
const previousBg = document.querySelector('.slide-prev');
const nextBg = document.querySelector('.slide-next');
const city = document.querySelector('.city');
const translateLabel = document.querySelector('.translate__label');
const translateInput = document.querySelector('.translate__input');
const checkWord = document.querySelector('#check');
const showAnswer = document.querySelector('.answer');
const nextWord = document.querySelector('#next');
const titlesSettings = document.querySelectorAll('.title');
const english = document.querySelector('#english');
const russian = document.querySelector('#russian');
const language = document.querySelectorAll('.language');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const audio = new Audio();
const list = document.querySelector('.play-list');
const settingsImage = document.querySelector('.settings__image');
const settings = document.querySelector('.settings');

let numBg = morningImages.findIndex(value => value === body.style.backgroundImage
  .slice(5).replace(/[")]/g, ''));
let isPlayMusic = false;
let defaultLanguage = localStorage.getItem('language') || 'en';
let timeOfDay;
let playSongNum = 0;

if (defaultLanguage === 'ru') {
  timeOfDay = findTimeOfDay().slice(7);
}
if (defaultLanguage === 'en') {
  timeOfDay = findTimeOfDay().slice(5);
}

language.forEach(() => {
  if (defaultLanguage === 'en') {
    language[0].classList.add('language-active');
  } else {
    language[1].classList.add('language-active');
  }
});

english.addEventListener('click', () => {
  if (!english.classList.contains('language-active')) {
    english.classList.add('language-active');
  }
  russian.classList.remove('language-active');
  defaultLanguage = 'en';
  localStorage.setItem('language', defaultLanguage);
  if (defaultLanguage === 'en') {
    userName.placeholder = 'Enter your name';
    city.placeholder = 'Enter city';
    translateInput.placeholder = 'Enter word';
    checkWord.innerHTML = 'Check';
    nextWord.innerHTML = 'Next';
    english.innerHTML = 'English';
    russian.innerText = 'Russian';
    for (let i = 0; i < titlesSettings.length; i++) {
      if (i === 5) continue;
      titlesSettings[i].innerHTML = nameTitleSettings[i].en;
    }
  }
  getWeather();
});

russian.addEventListener('click', () => {
  if (!russian.classList.contains('language-active')) {
    russian.classList.add('language-active');
  }
  english.classList.remove('language-active');
  defaultLanguage = 'ru';
  localStorage.setItem('language', defaultLanguage);
  if (defaultLanguage === 'ru') {
    userName.placeholder = 'Введите ваше имя';
    city.placeholder = 'Введите город';
    translateInput.placeholder = 'Введите слово';
    checkWord.innerHTML = 'Проверить';
    nextWord.innerHTML = 'Следующий';
    english.innerHTML = 'Английский';
    russian.innerText = 'Русский';
    for (let i = 0; i < titlesSettings.length; i++) {
      if (i === 5) continue;
      titlesSettings[i].innerHTML = nameTitleSettings[i].ru;
    }
  }
  getWeather();
});

if (defaultLanguage === 'en') {
  city.value = localStorage.getItem('weather') || 'Kyiv';
  userName.placeholder = 'Enter your name';
  city.placeholder = 'Enter city';
  translateInput.placeholder = 'Enter word';
  checkWord.innerHTML = 'Check';
  nextWord.innerHTML = 'Next';
  english.innerHTML = 'English';
  russian.innerText = 'Russian';
}

if (defaultLanguage === 'ru') {
  city.value = localStorage.getItem('weatherRu') || 'Киев';
  for (let i = 0; i < titlesSettings.length; i++) {
    if (i === 5) continue;
    titlesSettings[i].innerHTML = nameTitleSettings[i].ru;
  }
  userName.placeholder = 'Введите ваше имя';
  city.placeholder = 'Введите город';
  translateInput.placeholder = 'Введите слово';
  checkWord.innerHTML = 'Проверить';
  nextWord.innerHTML = 'Следующий';
  english.innerHTML = 'Английский';
  russian.innerText = 'Русский';
}

function showTime() {
  const now = new Date();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  showDate();
  showGreeting();

  return time.innerHTML = `${hours}:${minutes}:${seconds}`;
}

setInterval(showTime, 1000);
showTime();

function showDate() {
  const now = new Date();

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsRu = ['Январь', 'Февраль', 'Иарт', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const dayFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday",];
  const dayFullRu = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг",
    "Пятница", "Суббота"];

  const day = now.getDate();
  let month = months[now.getMonth()];
  let dayOfWeek = dayFull[now.getDay()];
  if (defaultLanguage === 'ru') {
    month = monthsRu[now.getMonth()];
    dayOfWeek = dayFullRu[now.getDay()];
  }
  return date.innerHTML = `${dayOfWeek}, ${month} ${day}`;
}

function showGreeting() {
  return greeting.innerHTML = findTimeOfDay();
}

function findTimeOfDay() {
  let timeOfDay = ['Good morning', 'Good afternoon',
    'Good evening', 'Good night'];
  const timeOfDayRu = ['Доброе утро', 'Добрый день',
    'Добрый вечер', 'Доброй ночи'];

  if (defaultLanguage === 'ru') {
    timeOfDay = timeOfDayRu;
  }
  if (defaultLanguage === 'en') {
    timeOfDay = timeOfDay;
  }
  let time = new Date().getHours();
  if (time >= 0 && time < 6) {
    return timeOfDay[3];
  } else if (time >= 6 && time < 12) {
    return timeOfDay[0];
  } else if (time >= 12 && time < 18) {
    return timeOfDay[1];
  } else {
    return timeOfDay[2];
  }
}

userName.addEventListener('blur', () => localStorage
  .setItem('name', userName.value));
userName.value = localStorage.getItem('name');

function changeBg() {
  if (timeOfDay === 'morning' || timeOfDay === 'утро') {
    body.style.backgroundImage = `url(${morningImages[randomValue(0, 19)]})`;
  } else if (timeOfDay === 'afternoon' || timeOfDay === 'день') {
    body.style.backgroundImage = `url(${afternoonImages[randomValue(0, 19)]})`;
  } else if (timeOfDay === 'evening' || timeOfDay === 'вечер') {
    body.style.backgroundImage = `url(${eveningImages[randomValue(0, 19)]})`;
  } else if (timeOfDay === 'night' || timeOfDay === 'ночи') {
    body.style.backgroundImage = `url(${nightImages[randomValue(0, 19)]})`;
  }
}

changeBg();

previousBg.addEventListener('click', () => {
  if (numBg === 0) {
    numBg = 20;
  }
  if (timeOfDay === 'morning' || timeOfDay === 'утро') {
    body.style.backgroundImage = `url(${morningImages[--numBg]})`;
  } else if (timeOfDay === 'afternoon' || timeOfDay === 'день') {
    body.style.backgroundImage = `url(${afternoonImages[--numBg]})`;
  } else if (timeOfDay === 'evening' || timeOfDay === 'вечер') {
    body.style.backgroundImage = `url(${eveningImages[--numBg]})`;
  } else if (timeOfDay === 'night' || timeOfDay === 'ночи') {
    body.style.backgroundImage = `url(${nightImages[--numBg]})`;
  }
});

nextBg.addEventListener('click', () => {
  if (numBg === 19) {
    numBg = -1;
  }
  if (timeOfDay === 'morning' || timeOfDay === 'утро') {
    body.style.backgroundImage = `url(${morningImages[++numBg]})`;
  } else if (timeOfDay === 'afternoon' || timeOfDay === 'день') {
    body.style.backgroundImage = `url(${afternoonImages[++numBg]})`;
  } else if (timeOfDay === 'evening' || timeOfDay === 'вечер') {
    body.style.backgroundImage = `url(${eveningImages[++numBg]})`;
  } else if (timeOfDay === 'night' || timeOfDay === 'ночи') {
    body.style.backgroundImage = `url(${nightImages[++numBg]})`;
  }
});

city.addEventListener('change', () => {
  localStorage.setItem('weather', city.value);
  if (defaultLanguage === 'en') {
    localStorage.setItem('weather', city.value);
  }
  if (defaultLanguage === 'ru') {
    localStorage.setItem('weatherRu', city.value);
  }

  getWeather();
});

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${defaultLanguage}&appid=e1c45e072474a2cff5ef79392430c9e3&units=metric`;
  const resolve = await fetch(url);
  const data = await resolve.json();

  weatherError.innerHTML = '';
  if (city.value === '' || resolve.status === 404) {
    if (defaultLanguage === 'en') {
      weatherError.innerHTML = 'Please enter correct city';
    }
    if (defaultLanguage === 'ru') {
      weatherError.innerHTML = 'Введите корректный город';
    }
  }

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if (defaultLanguage === 'en') {
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }
  if (defaultLanguage === 'ru') {
    wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
  }
}

getWeather();

async function getQuote() {
  const url = './json/quotes.json';
  const resolve = await fetch(url);
  const data = await resolve.json();
  const randomNum = randomValue(0, 101);
  quote.textContent = data.quotes[randomNum].quote;
  author.textContent = data.quotes[randomNum].author;
}

changeQuote.addEventListener('click', getQuote);
getQuote();

function changePlay() {
  play.classList.toggle('pause');
  if (play.classList.contains('pause')) {
    isPlayMusic = false;
  }
  playAudio();
}

play.addEventListener('click', changePlay);

function playAudio() {
  audio.src = musicPlaylist[playSongNum].src;
  audio.currentTime = 0;
  if (isPlayMusic) {
    audio.pause();
  }
  if (!isPlayMusic) {
    audio.play();
    isPlayMusic = true;
  }
  songs.forEach(value => value.style.color = '#fff');
  songs[playSongNum].style.color = '#c5b358';
}

playPrev.addEventListener('click', () => {
  play.classList.add('pause');
  if (playSongNum === 0) {
    playSongNum = 12;
  }
  playSongNum--;
  audio.src = musicPlaylist[playSongNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlayMusic = true;
  songs.forEach(value => value.style.color = '#fff');
  songs[playSongNum].style.color = '#c5b358';
})

playNext.addEventListener('click', function () {
  play.classList.add('pause');
  if (playSongNum === 11) {
    playSongNum = -1;
  }
  playSongNum++;
  audio.src = musicPlaylist[playSongNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlayMusic = true;
  songs.forEach(value => value.style.color = '#fff');
  songs[playSongNum].style.color = '#c5b358';
});


function createList() {
  for (let i = 0; i < musicPlaylist.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.innerHTML = musicPlaylist[i].title;
    list.append(li);
  }
}
createList();

const songs = document.querySelectorAll('li');
songs.forEach(value => value.addEventListener('click', function () {
  let index = musicPlaylist.findIndex(value => value.title === this.innerText);
  playSongNum = index;
  audio.src = musicPlaylist[index].src;
  audio.currentTime = 0;
  audio.play();
  play.classList.add('pause');
  isPlayMusic = true;
  songs.forEach(value => value.style.color = '#fff');
  this.style.color = '#c5b358';
}));

audio.addEventListener('ended', function () {
  audio.src = musicPlaylist[++playSongNum].src;
  audio.currentTime = 0;
  audio.play();
  songs.forEach(value => value.style.color = '#fff');
  songs[playSongNum].style.color = '#c5b358';
});

settingsImage.addEventListener('click', () => {
  settings.classList.toggle('settings-active');
  settingsImage.classList.toggle('settings__image-active');
});

const on = document.querySelectorAll('.on');
on.forEach(value => value.addEventListener('click', function () {
  this.classList.toggle('on-active');
}));

const player = document.querySelector('.player');
const music = document.querySelector('#music');
music.addEventListener('click', () => {
  player.classList.toggle('hidden');
});

const timeAndDate = document.querySelector('#time');
timeAndDate.addEventListener('click', () => {
  time.classList.toggle('hidden');
  date.classList.toggle('hidden');
  greeting.classList.toggle('hidden');
  userName.classList.toggle('hidden');
})

const weather = document.querySelector('#weather');
const weatherBody = document.querySelector('.weather');
weather.addEventListener('click', () => {
  weatherBody.classList.toggle('hidden');
});

const quotes = document.querySelector('#quotes');
const quoteBody = document.querySelector('#quote');
quotes.addEventListener('click', () => {
  quoteBody.classList.toggle('hidden');
  changeQuote.classList.toggle('hidden');
});

const translate = document.querySelector('#translate');
const translateBody = document.querySelector('.translate');
translate.addEventListener('click', () => {
  translateBody.classList.toggle('hidden');
});

nextWord.addEventListener('click', () => {
  translateInput.value = '';
  let random = randomValue(0, 5000);
  translateLabel.innerHTML = words[random][0];
  checkWord.addEventListener('click', () => {
    showAnswer.innerHTML = words[random][1];
  });
  showAnswer.innerHTML = '';
});