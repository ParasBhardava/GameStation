let audioturn = new Audio("MUSIC/PLAY.wav");
let gameover = new Audio("MUSIC/OVER.mp3");
let turn = "X";
let isgameover = false;

const changeturn = () => {
  return turn === "X" ? "0" : "X";
};

let count = 0;
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  let win = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  count++;
  if (count == 9) {
    isgameover = true;
    document.getElementsByClassName("info")[0].innerText = "DRAW";
  }
  win.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtexts[e[0]].innerText + " WON!!";
      document.getElementById("dis").style.pointerEvents = "none";
      gameover.play();
      let val = document.getElementsByClassName(
        `${boxtexts[e[0]].innerText}`
      )[0].innerText;
      val++;
      document.getElementsByClassName(
        `${boxtexts[e[0]].innerText}`
      )[0].innerText = " " + val + " ";
      document.querySelector(".info").style.color = "yellow";
      document.querySelector(".info").style.padding = "5px";
      document.querySelector(".info").style.borderRadius = "5%";
      isgameover = true;
      document.querySelector(".line").style.transform = `translate(${
        e[3] - 4.5
      }vw,${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "29vw";
    }
  });
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", (e) => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeturn();
      audioturn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn For " + turn;
      }
    }
  });
});
play.addEventListener("click", () => {
  let boxtextss = document.querySelectorAll(".boxtext");
  Array.from(boxtextss).forEach((element) => {
    element.innerText = "";
  });
  document.getElementById("dis").style.pointerEvents = "auto";
  turn = "X";
  isgameover = false;
  document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
  document.querySelector(".line").style.width = "0";
  count = 0;
});
reset.addEventListener("click", () => {
  let boxtextss = document.querySelectorAll(".boxtext");
  Array.from(boxtextss).forEach((element) => {
    element.innerText = "";
  });
  document.getElementById("dis").style.pointerEvents = "auto";
  turn = "X";
  isgameover = false;
  document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
  document.querySelector(".line").style.width = "0";
  document.getElementsByClassName("X")[0].innerText = "0";
  document.getElementsByClassName("0")[0].innerText = "0";
});
