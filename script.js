const container = document.querySelector(".container");
const textBook = document.querySelector(".textBook");
const textParts = document.querySelector(".text-parts");
const textMainParts = document.querySelector(".text-main-parts");
const btnParts = document.querySelector(".btn-parts");
const textBookMain = document.querySelector(".textBook-menu");
const mainMenu = document.querySelector(".main-menu");
const footerMain = document.querySelector(".footer-main");
const ROOT_WORDS = document.getElementById('words');
const chapter = document.getElementById('chapter');
const pages = document.getElementById('pages');
const prevPage = document.querySelector(".prevPage");
const previousPage = document.querySelector(".previousPage");
const nxPage = document.querySelector(".nxPage");
const nextPage = document.querySelector(".nextPage");
const prevChapter = document.querySelector(".prevChapter");
const previousChapter = document.querySelector(".previousChapter");
const nxChapter = document.querySelector(".nxChapter");
const nextChapter = document.querySelector(".nextChapter");
const home = document.querySelector(".home");
const book = document.querySelector(".book");
const team = document.querySelector(".team");
let audioWord;
let audios = {};


if (localStorage.length == 0) {
  localStorage.setItem('pages', pages.value);
  localStorage.setItem('chapter', chapter.value);
}


function bgFullOpacity() {
  container.classList.add("active");
}


function bgZeroOpacity() {
  container.classList.remove("active");
}


home.addEventListener("click", () => {
  const wordsContainer = document.querySelector(".words-container");
  textMainParts.innerHTML = "Учим  АНГЛИЙСКИЙ  играючи :)";
  textMainParts.style.left = "-17%";
  textParts.style.display = "inline";
  btnParts.style.display = "flex";
  textBookMain.style.display = "none";
  mainMenu.style.display = "none";
  footerMain.style.display = "inline";
  wordsContainer.style.display = "none";
});


textBook.addEventListener("click", () => {
  textParts.style.display = "none";
  btnParts.style.display = "none";
  book.style.display = "none";
  textBookMain.style.display = "flex";
  mainMenu.style.display = "inline-flex";
  footerMain.style.display = "none";
  pageList.render();
});


book.addEventListener("click", () => {
  textParts.style.display = "none";
  btnParts.style.display = "none";
  book.style.display = "none";
  textBookMain.style.display = "flex";
  mainMenu.style.display = "inline-flex";
  footerMain.style.display = "none";
  pageList.render();
});


team.addEventListener("click", () => {
  const wordsContainer = document.querySelector(".words-container");
  textMainParts.innerHTML = "Учим  АНГЛИЙСКИЙ  играючи :)";
  textMainParts.style.left = "-17%";
  textBookMain.style.display = "none";
  footerMain.style.display = "inline";
  book.style.display = "inline";
  wordsContainer.style.display = "none";
  pageList.about();
});


class wordsList {


  render() {
    let htmlCatalog = '';
    let sortChapterPageData = [];

    pages.value = localStorage.getItem('pages');
    chapter.value = localStorage.getItem('chapter');

    data.forEach(({ _id, group, page, word, image, audio, audioMeaning, audioExample, textMeaning, textExample,
      transcription, __v, textExampleTranslate, textMeaningTranslate, wordTranslate }, index) => {
      if (chapter.value == group && pages.value == page) {
        sortChapterPageData.push(data[index]);
      }
    });


    sortChapterPageData.forEach(({ _id, group, page, word, image, audio, audioMeaning, audioExample, textMeaning, textExample,
      transcription, __v, textExampleTranslate, textMeaningTranslate, wordTranslate }, index) => {

      htmlCatalog += `
   <li class="words-element">
     <img class="words-element__img" src="${image}" /> 
     <span class="words-title">${word} - ${transcription} - ${wordTranslate}</span>
     <span  class="words-description">${textMeaning}</span>
     <span class="words-translate">${textMeaningTranslate}</span>
     <hr class="line">
     <span class="words-description">${textExample}</span>
     <span class="words-translate">${textExampleTranslate}</span>
     <img class="audio" src="img/audio.svg" /> 
   </li>
 `;
    });


    let html = `
   <ul class="words-container">
     ${htmlCatalog}
   </ul>
 `;


    ROOT_WORDS.innerHTML = html;


    const wordsElement = document.querySelectorAll(".words-element");

    for (let i = 0; i < wordsElement.length; i++) {
      if (+chapter.value == 0) {
        wordsElement[i].style.backgroundColor = '#57251E';
        textMainParts.innerHTML = "A1 Elementary";
        textMainParts.style.left = "-5%";
      }
      if (+chapter.value == 1) {
        wordsElement[i].style.backgroundColor = '#57541E';
        textMainParts.innerHTML = "A2 Pre-Intermediate";
        textMainParts.style.left = "-9%";
      }
      if (+chapter.value == 2) {
        wordsElement[i].style.backgroundColor = '#571E52';
        textMainParts.innerHTML = "B1 Intermediate";
        textMainParts.style.left = "-6%";
      }
      if (+chapter.value == 3) {
        wordsElement[i].style.backgroundColor = '#1E5757';
        textMainParts.innerHTML = "B2 Upper-Intermediate";
        textMainParts.style.left = "-10%";
      }
      if (+chapter.value == 4) {
        wordsElement[i].style.backgroundColor = '#07074B';
        textMainParts.innerHTML = "C1 Advanced";
        textMainParts.style.left = "-4%";
      }
      if (+chapter.value == 5) {
        wordsElement[i].style.backgroundColor = '#000';
        textMainParts.innerHTML = "C2 Proficiency";
        textMainParts.style.left = "-5%";
      }
      if (+chapter.value == 6) {
        wordsElement[i].style.backgroundColor = '#FF2400';
        textMainParts.innerHTML = "Трудные слова";
        textMainParts.style.left = "-5%";
      }
    }

    if (+chapter.value == 6) {
      textMainParts.innerHTML = "Трудные слова";
      textMainParts.style.left = "-5%";
      ROOT_WORDS.innerHTML = '<p class="text-parts words-container">Тут пока пусто... Но это не на долго)))</p>';
    }


    audioWord = document.querySelectorAll(".audio");

    for (let i = 0; i < audioWord.length; i++) {
      let aw = audioWord[i];
      aw.addEventListener("click", () => {
        let a = 0;
        let audio = new Audio();
        audios[0] = sortChapterPageData[i].audio;
        audios[1] = sortChapterPageData[i].audioMeaning;
        audios[2] = sortChapterPageData[i].audioExample;
        audio.src = audios[0];
        audio.autoplay = true;
        audio.onended = function () {
          a++;
          if (a > 2) return;
          audio.src = audios[a];
          audio.play();
        }
      });
    }
  }

  about() {
    let htmlCatalog = `
               <div class="team-page">
                  <div class="section-photo">
                        <img class="my-img" src="https://i.ibb.co/z2p7XvW/fly01m.jpg" alt="TAUKACHOU ALIAKSEI">
                     <h1 class="my-name">TAUKACHOU ALIAKSEI</h1>
                     <p class="descrip">В команде только один человек, который, в свободное от работы время, пытался всё разработать сам))</p>
                  </div>
               </div>
      `;

    let html = `
   <ul class="words-container">
     ${htmlCatalog}
   </ul>
 `;


    ROOT_WORDS.innerHTML = html;
  }

}


const pageList = new wordsList();

pages.onchange = () => {
  localStorage.setItem('pages', pages.value);
  pageList.render();
};

chapter.onchange = () => {
  localStorage.setItem('chapter', chapter.value);
  pageList.render();
};


prevPage.addEventListener("click", () => {
  if (+pages.value == 0) {
    return previousPage.classList.toggle('disabled');
  }
  if (+pages.value == 29) nextPage.classList.remove('disabled');
  pages.value = +pages.value - 1;
  localStorage.setItem('pages', pages.value);
  pageList.render();
});


nxPage.addEventListener("click", () => {
  if (+pages.value == 29) {
    return nextPage.classList.toggle('disabled');
  }
  if (+pages.value == 0) previousPage.classList.remove('disabled');
  pages.value = +pages.value + 1;
  localStorage.setItem('pages', pages.value);
  pageList.render();
});


prevChapter.addEventListener("click", () => {
  if (+chapter.value == 0) {
    return previousChapter.classList.toggle('disabled');
  }
  if (+chapter.value == 6) nextChapter.classList.remove('disabled');
  chapter.value = +chapter.value - 1;
  localStorage.setItem('chapter', chapter.value);
  pageList.render();
});


nxChapter.addEventListener("click", () => {
  if (+chapter.value == 6) {
    return nextChapter.classList.toggle('disabled');
  }
  if (+chapter.value == 0) previousChapter.classList.remove('disabled');
  chapter.value = +chapter.value + 1;
  localStorage.setItem('chapter', chapter.value);
  pageList.render();
});