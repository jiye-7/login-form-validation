/*
* ID
    1. ID는 영어와 숫자만 입력가능하다.
    2. 5자이상 입력

* Password
    1. 8자이상 입력
    2. 문자, 특수문자, 영문자 1개이상 조합

* Password Confirm
    1. 비밀번호 확인은 비밀번호와 일치하는 체크

* Name
    1. 공백, 값이 있는지 없는지만 체크

* Email
    1. 아이디 뒤에 @가 와야된다.
    2. 주소 뒤에 .이 있어야 된다.

* Sign Up 버튼을 눌렀을 때 
    - elart으로 모든 validation이 통과했을 때, '회원가입을 축하합니다.'의 축하문구를 출력
    - 유효성 검사시 한 값이라도 false가 나올 경우, '다시 입력하세요'
*/

const inputId = document.querySelector(".input__id");
const inputPw = document.querySelector(".input__pw");
const inputPwc = document.querySelector(".input__pwc");
const inputName = document.querySelector(".input__name");
const inputEmail = document.querySelector(".input__email");
const validIcon = document.querySelectorAll(".valid--icon");

// [유효성 검증 함수]: n개의 글자 이상
function moreThanLength(str, n) {
  return str.length >= n;
}

// [유효성 검증 함수]: 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}

// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
}

// [유효성 검증 함수]: email check
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// [유효성 검증 함수]: id check
function handleIdCheck() {
  let idLenCheck = moreThanLength(inputId.value, 5);
  let idNumAndEngCheck = onlyNumberAndEnglish(inputId.value);

  if (idLenCheck && idNumAndEngCheck) {
    inputId.classList.remove("input__idValue__check");
    inputId.classList.add("input__idCheck");
    validIcon[0].lastElementChild.classList.add("fa-check");
    validIcon[0].style.color = "green";
  } else {
    inputId.classList.add("input__idValue__check");
    document.querySelector(".input__idValue__check").value =
      "영어와 숫자만 가능합니다. 5자이상 적어주세요:)";
    validIcon[0].lastElementChild.classList.remove("fa-check");
    document.querySelector(".input__idValue__check").onclick = function () {
      document.querySelector(".input__idValue__check").value = "";
      inputId.classList.remove("input__idValue__check");
    };
  }
}

// [유효성 검증 함수]: password check
function handlePasswordCheck() {
  if (strongPassword(inputPw.value)) {
    inputPw.classList.add("input__pwCheck");
    validIcon[1].lastElementChild.classList.add("fa-check");
    validIcon[1].style.color = "green";
  } else {
    inputPw.classList.add("input__pwValue__check");
    console.log(document.querySelector(".input__pwValue__check").value);
    document.querySelector(".input__pwValue__check").value =
      "영어와 숫자만 가능합니다. 8자이상 적어주세요:)";
    validIcon[1].lastElementChild.classList.remove("fa-check");
    document.querySelector(".input__pwValue__check").onclick = function () {
      document.querySelector(".input__pwValue__check").value = "";
      inputPw.classList.remove("input__pwValue__check");
    };
  }
}

inputId.onchange = handleIdCheck;
inputPw.onchange = handlePasswordCheck;
