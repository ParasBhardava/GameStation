let pupil = document.getElementsByClassName("pupil");
console.log(pupil);
let pupilArr = Array.from(pupil);
let pupilstart = -65;
let pupilrange = 130;
let mouseXStart = 0;
let mouseXEnd = window.innerWidth;
let currentX = 0;
let fracX = 0;
let mouseYEnd = window.innerHeight;
let currentY = 0;
let fracY = 0;
let mouseXrange = mouseXEnd;
const mouseMove = (event) => {
  currentX = event.clientX - mouseXStart;
  fracX = currentX / mouseXrange;
  currentY = event.clientY;
  fracY = currentY / window.innerHeight;
  let pupilsXcur = pupilstart + fracX * pupilrange;
  let pupilsYcur = pupilstart + fracY * pupilrange;
  pupilArr.forEach((curPupil) => {
    curPupil.style.transform = `translate(${pupilsXcur}px,${pupilsYcur}px)`;
    let x = `${pupilsXcur}`;
    let y = `${pupilsYcur}`;
    if (x < 31 && x > -31 && y > -38.45 && y < 4.45) {
      curPupil.style.width = "55px";
      curPupil.style.height = "25px";
      curPupil.style.borderRadius = "0";
      document.getElementsByClassName("eyes")[0].style.background = "#fa305c";
    } else {
      curPupil.style.width = "50px";
      curPupil.style.height = "50px";
      curPupil.style.borderRadius = "50%";
      document.getElementsByClassName("eyes")[0].style.background = "#d5fa30";
    }
  });
};

const windowRes = (event) => {
  mouseXEnd = window.innerWidth;
  mouseYEnd = window.innerHeight;
  mouseXrange = mouseXEnd - mouseXStart;
};

window.addEventListener("mousemove", mouseMove);
window.addEventListener("resize", windowRes);
