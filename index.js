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
const singupBtn = document.querySelector("button");
const resultId = false;
const resultPw = false;
const resultPwc = false;
const resultName = false;
const resultEmail = false;

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
    resultId = true;
  } else {
    inputId.classList.remove("input__idCheck");
    inputId.classList.add("input__idValue__check");
    document.querySelector(".input__idValue__check").value =
      "영어와 숫자만 가능합니다. 5자이상 적어주세요:)";
    validIcon[0].lastElementChild.classList.remove("fa-check");
    document.querySelector(".input__idValue__check").onclick = function () {
      document.querySelector(".input__id").value = "";
      inputId.classList.remove("input__idValue__check");
      resultId = false;
    };
  }
}

// [유효성 검증 함수]: password check
function handlePasswordCheck() {
  if (strongPassword(inputPw.value)) {
    inputPw.classList.remove("input__pwValue__check");
    inputPw.classList.add("input__pwCheck");
    validIcon[1].lastElementChild.classList.add("fa-check");
    validIcon[1].style.color = "green";
    resultPw = true;
  } else {
    inputPw.type = "text";
    inputPw.classList.remove("input__pwCheck");
    inputPw.classList.add("input__pwValue__check");
    document.querySelector(".input__pwValue__check").value =
      "영어와 숫자, 특수문자를 8자 이상 입력해주세요 :)";
    validIcon[1].lastElementChild.classList.remove("fa-check");
    document.querySelector(".input__pwValue__check").onclick = function () {
      inputPw.type = "password";
      document.querySelector(".input__pw").value = "";
      inputPw.classList.remove("input__pwValue__check");
      resultPw = false;
    };
  }
}

// [유효성 검증 함수]: password confirm
function handlePasswordConfirm() {
  if (inputPw.value === inputPwc.value) {
    inputPwc.classList.remove("input__pwcValue__check");
    inputPwc.classList.add("input__pwcCheck");
    validIcon[2].lastElementChild.classList.add("fa-check");
    validIcon[2].style.color = "green";
    resultPwc = true;
  } else {
    inputPwc.type = "text";
    inputPwc.classList.remove("input__pwcCheck");
    inputPwc.classList.add("input__pwcValue__check");
    document.querySelector(".input__pwcValue__check").value =
      "password가 일치하지 않습니다 :(";
    validIcon[2].lastElementChild.classList.remove("fa-check");
    document.querySelector(".input__pwcValue__check").onclick = function () {
      inputPwc.type = "password";
      document.querySelector(".input__pwc").value = ""; //동적으로 만든 클래스를 삭제했지만 들어오는 상태..모든 태그 동일
      inputPwc.classList.remove("input__pwcValue__check");
      resultPwc = false;
    };
  }
}

// [유효성 검증 함수]: name null check
function handleNameCheck() {
  if (moreThanLength(inputName.value, 5)) {
    inputName.classList.add("input__nameCheck");
    validIcon[3].lastElementChild.classList.add("fa-check");
    validIcon[3].style.color = "green";
    resultName = true;
  } else {
    //아이디는 5글자 이상 가능합니다.
    inputName.classList.remove("input__nameCheck");
    inputName.classList.add("input__nameValue__check");
    document.querySelector(".input__nameValue__check").value =
      "아이디는 5글자 이상 가능합니다. :)";
    document.querySelector(".input__nameValue__check").onclick = function () {
      document.querySelector(".input__name").value = "";
      inputName.classList.remove("input__nameValue__check");
      resultName = false;
    };
  }
}

// [유효성 검증 함수]: email check
function handleEmailCheck() {
  if (validateEmail(inputEmail.value)) {
    inputEmail.classList.add("input__emailCheck");
    validIcon[4].lastElementChild.classList.add("fa-check");
    validIcon[4].style.color = "green";
    resultEmail = true;
  } else {
    inputEmail.classList.remove("input__emailCheck");
    inputEmail.classList.add("input__emailValue__check");
    document.querySelector(".input__emailValue__check").value =
      "이메일을 정확히 적어주세요 :)";
    document.querySelector(".input__emailValue__check").onclick = function () {
      document.querySelector(".input__email").value = "";
      inputEmail.classList.remove("input__emailValue__check");
      resultEmail = false;
    };
  }
}

//[유효성 검증 함수]: sign up check(전체 확인 후 결과를 체크)
function handleSignUpCheck() {
  if (resultId && resultPw && resultPwc && resultName && resultEmail) {
    alert("회원가입이 완료되었습니다! 반가워요:)");
  } else {
    alert("회원가입 실패! 다시 한번 입력한 값을 확인해보세요 :(");
  }
}

inputId.onchange = handleIdCheck;
inputPw.onchange = handlePasswordCheck;
inputPwc.onchange = handlePasswordConfirm;
inputName.onchange = handleNameCheck;
inputEmail.onchange = handleEmailCheck;
singupBtn.onclick = handleSignUpCheck;
