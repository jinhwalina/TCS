/*
< 함수 > 

함수는 프로그램을 구성하는 주요 '구성요소'이다. 함수를 이용하면 중복 없이 유사한 동작을 하는
코드를 여러 번 호출할 수 있다. 

이전에 alert,prompt 등 내장함수들을 사용해보았는데 함수는 만들어서 사용할 수 있다!

< 함수 선언 >
함수 선언 방식을 이용하면 함수를 만들 수 있다. 

function showMessage() {
  alert( '안녕하세요!' );
}

function 키워드, 함수 이름, 괄호로 둘러싼 매개변수를 차례로 써주면 함수를 선언 할 수 있다. 
위 함수에는 매개변수가 없느넫, 만약 매개변수가 여러 개 있다면 각 매개변수를 콤마로 구분한다. 
이어서 함수를 구성하는 코드의 모임인 ' 함수 본문 ' 을 중괄호로 감싸 붙여준다. 

function name(parameters) {
  ...함수 본문...
}

새롭게 정의한 함수는 함수 이름 옆에 괄호를 붙여 호출할 수 잇다. showMessage()처럼! 
function showMessage() {
  alert( '안녕하세요!' );
}

showMessage();
showMessage();
이렇게 호출 된 함수는 본문이 실행된다. 위 예시에서는 함수를 두 번 호출했다. > 창이 두번 뜸!

함수의 주요 용도 중 하나는 중복 코드 피하기이다. 

< 지역 변수 > 
함수 내에서 선언한 변수인 지역 변수는 함수 안에서만 접근 가능하다.

function showMessage() {
  let message = "안녕하세요!"; // 지역 변수

  alert( message );
}

showMessage(); // 안녕하세요! 

alert( message ); // ReferenceError: message is not defined (message는 함수 내 지역 변수이기 때문에 에러가 발생합니다.)

< 외부 변수 >
함수 내부에서 함수 외부의 변수인 외부 변수에 접근할 수 있다.
let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  alert(message);
}
showMessage(); // Hello, John


함수에선 외부 변수에 접근하는 것뿐만 아니라 수정도 가능하다.
let userName = 'John';
function showMessage() {
  userName = "Bob"; // (1) 외부 변수를 수정함

  let message = 'Hello, ' + userName;
  alert(message);
}

alert( userName ); // 함수 호출 전이므로 John 이 출력됨
showMessage();
alert( userName ); // 함수에 의해 Bob 으로 값이 바뀜

단, 외부 변수는 지역 변수가 없는 경우에만 사용 가능하다.
let userName = 'John';
function showMessage() {
  let userName = "Bob"; // 같은 이름을 가진 지역 변수를 선언합니다.

  let message = 'Hello, ' + userName; // Bob
  alert(message);
}

// 함수는 내부 변수인 userName만 사용합니다,
showMessage();
alert( userName ); // 함수는 외부 변수에 접근하지 않습니다. 따라서 값이 변경되지 않고, John이 출력됩니다.

**** 전역변수
위 예시의 userName 처럼, 함수 외부에 선언된 변수는 전역 변수라고 부른다. 
전역 변수는 같은 이름을 가진 지역 변수에 의해 가려지지만 않는다면 모든 함수에서 접근할 수 있다.
변수는 연관되는 함수 내에 선언하고, 전역 변수는 되도록 사용하지 않는 것이 좋다. 

< 매개변수 > 
매개변수를 이용하면 임의의 데이터를 함수 안에 전달할 수 있다. 매개변수는 인수라고 불리기도 한다. 
function showMessage(from, text) { // 인수: from, text
  alert(from + ': ' + text);
}

showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)

< 기본값 >
매개변수에 값을 전달하지 않으면 그 값은 undefined가 된다. 
예시를 통해 알아보자! 
위에서 정의한 함수 showMessage(from, text)는 매개변수가 2개지만, 아래처럼 인수를 하나만 넣어서 호출이 가능하다.
 showMessage("Ann");
이렇게 작성해도 에러가 발생하지 않는다. 두 번째 매개변수에 값을 전달하지 않았기 때문에 text엔  undefined가 할당될 뿐이다. 
따라서 에러없이 "Ann : undefined" 가 출력된다. 
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
text가 값을 전달받지 못해도 undefined대신 기본값 "no text given"이 할당
위 예시에서는 문자열 "no text given"을 기본값으로 설정. 하지만 아래처럼 복잡한 표현식도 기본값으로 설정할 수 있다.

function showMessage(from, text = anotherFunction()) {
  // anotherFunction()은 text값이 없을 때만 호출됨
  // anotherFunction()의 반환 값이 text의 값이 됨
}

***** 자바스크립트에선 함수를 호출할 때마다 매개변수 기본값을 평가한다. 물론 해당하는 매개변수가 없을 때만 기본값을 평가. 
위 예시에선 매개변수 text에 값이 없는 경우 showMessage()를 호출할 때마다 anotherFunction() 이 호출된다.

< 매개변수 기본값을 설정할 수 있는 또 다른 방법 >
가끔은 함수 선언부에서 매개변수 기본값을 설정하는 것 대신 함수가 실행되는 도중에 기본값을 설정하는 게 논리에 맞는 경우가 생기기도 한다.
이런 경우엔 일단 매개변수를 undefined와 비교해서 함수 호출 시 매개변수가 생략되었는지를 확인한다.
function showMessage(text) {
  if (text === undefined) {
    text = '빈 문자열';
  }

  alert(text);
}

showMessage(); // 빈 문자열
이렇게 if문을 쓰는 것 대신 논리 연산자 ||를 사용할 수도 있다. 
// 매개변수가 생략되었거나 빈 문자열("")이 넘어오면 변수에 '빈 문자열'이 할당.
function showMessage(text) {
  text = text || '빈 문자열';
  ...

< 반환 값 > 
함수를 호출했을 때 함수를 호출한 그곳에 특정 값을 반환하게 할 수 있다. 이때 이 특정 값을 반환 값이라고 부른다. 
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
지시자 return은 함수 내 어디서든 사용가능하다. 실행 흐름이 지시자 return을 만나면 함수 실행은 즉시 중단되고
함수를 호출한 곳에 값을 반환한다. 

아래처럼 함수 하나에 여러개의 return문이 올 수도 있다.

function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm('보호자의 동의를 받으셨나요?');
  }
}

let age = prompt('나이를 알려주세요', 18);

if ( checkAge(age) ) {
  alert( '접속 허용' );
} else {
  alert( '접속 차단' );
}

아래와 같이 지시자 return만 명시하는 것도 가능하다. 이런경우는 함수가 즉시 종료된다. 
function showMovie(age) {
  if ( !checkAge(age) ) {
    return;
  }

  alert( "영화 상영" ); // (*)
  // ...
}
위 예시에서, checkAge(age)가 false를 반환하면, (*)로 표시한 줄은 실행이 안 되기 때문에 함수 showMovie는 얼럿 창을 보여주지 않는다
***** return문이 없거나 return 지시자만 있는 함수는 undefined를 반환
function doNothing() { }

alert( doNothing() === undefined ); // true
return문이 없는 함수도 무언가를 반환한다.

return 지시자만 있는 경우도 undefined를 반환한다.
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true

***** return과 값 사이에 절대 줄을 삽입하면 안된다! 
반환하려는 값이 긴 표현식인 경우, 아래와 같이 지시자 return과 반환하려는 값 사이에 새 줄을 넣어 코드를 작성하고 싶을 수도..있다
return
 (some + long + expression + or + whatever * f(a) + f(b))
 자바스크립트는 return문 끝에 세미콜론을 자동으로 넣기 때문에, 이렇게 return문을 작성하면 안된다.
위 코드는 아래 코드처럼 동작한다. 
return;
 (some + long + expression + or + whatever * f(a) + f(b))
 따라서 반환하고자 했던 표현식을 반환하지 못하고 아무것도 반환하지 않는 것처럼 되어버린다. 
 표현식을 여러 줄에 걸쳐 작성하고 싶다면, 표현식이 return 지시자가 있는 줄에서 시작하도록 작성해야 한다. 
 또는 아래처럼 여는 괄호를 return지시자와 같은 줄에 써줘도 된다 .
 return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )

< 함수 이름 짓기 >
함수는 어떤 동작을 수행하기 위한 코드를 모아놓은 것. 함수 이름은 가능한 한 간결하고 명확해야한다. 
"show"로 시작하는 함수는 대개 무언가를 보여주는 함수

"get…" – 값을 반환함
"calc…" – 무언가를 계산함
"create…" – 무언가를 생성함
"check…" – 무언가를 확인하고 불린값을 반환함
이런식으로 접두어를 사용할 수도 있다.

showMessage(..)     // 메시지를 보여줌
getAge(..)          // 나이를 나타내는 값을 얻고 그 값을 반환함
calcSum(..)         // 합계를 계산하고 그 결과를 반환함
createForm(..)      // form을 생성하고 만들어진 form을 반환함
checkPermission(..) // 승인 여부를 확인하고 true나 false를 반환함

< 함수 == 주석 > 
함수는 간결하고 한가지 기능만 수핼할 수 있게 만들어야 한다. 
함수를 간결하게 만들면 테스트와 디버깅이 쉬워진다. 그리고 함수 그 자체로 주석의 역할까지 한다. 


*/

/* else는 정말 필요한가? 
아래 함수는 매개변수 age가 18보다 큰 경우 true를 반환합니다.
그 이외의 경우는 컨펌 대화상자를 통해 사용자에게 질문한 후, 해당 결과를 반환합니다.
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    // ...
    return confirm('보호자의 동의를 받으셨나요?');
  }
}
위 코드에서 else문을 삭제해도 기존 코드와 동일하게 작동할까 ?
동일하게 동작한다고 생각!
*/

/*
 '?'나 '||'를 사용하여 함수 다시 작성하기
 function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('보호자의 동의를 받으셨나요?');
  }
}
if문을 사용하지 않고 동일한 동작을 하는 함수를 한 줄에 작성해보세요.
아래 조건을 충족하는 해답 2개를 작성해야 합니다.

물음표 연산자 ?를 사용하여 본문을 작성
OR 연산자 ||를 사용하여 본문을 작성
*/
function checkAge(age){
    return (age > 18) ? true : confirm("보호자의 동의를 받으셨나요?")
}
function checkAge(age) {
    return (age > 18) || confirm('보호자의 동의를 받으셨나요?');
}

/* min(a, b) 함수 만들기
a와 b 중 작은 값을 반환해주는 함수, min(a,b)을 만들어보세요.
만든 함수는 아래와 같이 동작해야 합니다.

min(2, 5) == 2
min(3, -1) == -1
min(1, 1) == 1

*/
function min(a,b){
    return ( a < b ) ? a : b;
}

/* pow(x,n) 함수 만들기 
x의 n제곱을 반환해주는 함수, pow(x,n)를 만들어보세요. x의 n 제곱은 x를 n번 곱해서 만들 수 있습니다.
pow(3, 2) = 3 * 3 = 9
pow(3, 3) = 3 * 3 * 3 = 27
pow(1, 100) = 1 * 1 * ...* 1 = 1
프롬프트 대화상자를 띄워 사용자로부터 x와 n을 입력받고 pow(x,n)의 반환 값을 보여주는 코드를 작성해 보세요.
*/

function pow(x,n){
  let result = x;

  for (let i = 1; i<n; i++){
      result *= x;
  }
  return result;
}

let x = prompt("x값을 입력해주세요");
let n = prompt("n값을 입력해주세요");
