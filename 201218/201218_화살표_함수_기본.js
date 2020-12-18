/*
< 화살표 함수 기본 > 
함수 표현식보다 단순하고 간결한 문법으로 함수를 만들 수 있는 방법. 
> 화살표 함수 이용하기!

let func = (arg1, arg2, ...argN) => expression
이렇게 코드를 작성하면 인자 arg1..argN를 받는 함수 func이 만들어진다. 함수 func는 화살표 => 우츨의 표현식을 평가하고 결과를 반환한다.
아래 함수의 축약 버전이다. 
let func = function(arg1, arg2, ...argN) {
  return expression;
};
구체적인 예시는 이러하다.

let sum = (a, b) => a + b;

위 화살표 함수는 아래 함수의 축약 버전입니다.

let sum = function(a, b) {
  return a + b;
};

alert( sum(1, 2) ); // 3

보는 것처럼 (a,b) => a + b 는 인수 a와b를 받는 함수이다. (a,b) => a + b는 실행되는 순간 표현식 a + b를 평가하고 
그 결과를 반환한다. 

인수가 하나밖에 없다면 인수를 감싸는 괄호를 생략할 수 있다. 괄호를 생략하면 코드 길이를 더 줄일 수 있다. 
let double = n => n * 2;
// let double = function(n) { return n * 2 }과 거의 동일합니다.

alert( double(3) ); // 6

인수가 하나도 없을 땐 괄호를 비워놓으면 된다. 다만, 이 때 괄호는 생략할 수 없다. 
let sayHi = () => alert("안녕하세요!");

sayHi();

화살표 함수는 함수 표현식과 같은 방법으로 사용할 수 있다. 
let age = prompt("나이를 알려주세요.", 18);

let welcome = (age < 18) ?
  () => alert('안녕') :
  () => alert("안녕하세요!");

welcome();
화살표 함수를 처음 접하면 가독성이 떨어진다. 익숙지 않기 때문! 

< 본문이 여러 줄인 화살표 함수 >
평가해야 할 표현식이나 구문이 여러 개인 함수가 있을 수도 있다. 이 경우에도 화살표 함수 문법을 사용해 함수를 만들 수 있다.
다만 이때는 중괄호 안에 평가해야 할 코드를 넣어주어야 한다. 
그리고 return 지시자를 사용해 명시적으로 결과값을 반환해 주어야 한다. 

let sum = (a, b) => {  // 중괄호는 본문 여러 줄로 구성되어 있음을 알려줍니다.
  let result = a + b;
  return result; // 중괄호를 사용했다면, return 지시자로 결괏값을 반환해주어야 합니다.
};

alert( sum(1, 2) ); // 3

*/

/* 화살표 함수로 변경하기 */
function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
  }
  
  ask(
    "동의하십니까?",
    function() { alert("동의하셨습니다."); },
    function() { alert("취소 버튼을 누르셨습니다."); }
  );
  
  function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
  }
  
  ask(
    "동의하십니까?",
    () => alert("동의하셨습니다."); ,
    () => alert("취소 버튼을 누르셨습니다."); 
  );
