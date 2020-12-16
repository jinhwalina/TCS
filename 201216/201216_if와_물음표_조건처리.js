/*
    if 와 '?'를 사용한 조건 처리

    조건에 따라 다른 행동을 취해야 할 때가 있다.

< if문 > 
if(...)문은 괄호 안에 들어가는 조건을 평가하는데, 그 결과가 true이면 코드블록이 실행된다. 

*/

let year = prompt('ECMAScript-2015 명세는 몇 년도에 출판되었을까요?', '');
if (year == 2015) alert( '정답입니다!' );

if (year == 2015) {
    alert( "정답입니다!" );
    alert( "아주 똑똑하시네요!" );
  } // 이렇게 조건이 복수로 들어가게 된다면 중괄호로 코드 블록을 감싸야 한다. ( 다만 코드의 가독성을 위해 한줄이어도 중괄호를 사용하자! )

/* 
< 불린형으로의 변환 > 

if(...) 문은 괄호 안의 표현식을 평가하고 그 결과를 불린값으로 변환한다. 
숫자 0, 빈 문자열"", null, undefined, NaN은 불린형으로 변환 시 모두 false가 된다.
  > falsy(거짓 같은) 값이라고 부른다.
이 외의 값은 불린형으로 변환시 true가 되므로 
  > truthy(참 같은) 값이라고 부른다.

    let cond = (year == 2015); // 동등 비교를 통해 true/false 여부를 결정

    if (cond) {
    ...
    } 이런식으로도 표현이 가능하다. 

< 'else'절 >

if 문엔 else절을 붙일 수 있다. else 뒤에 이어지는 코드 블록은 조건이 거짓일 때 실행된다. 
let year = prompt('ECMAScript-2015 명세는 몇 년도에 출판되었을까요?', '');

if (year == 2015) {
  alert( '정답입니다!' );
} else {
  alert( '오답입니다!' ); // 2015 이외의 값을 입력한 경우
}

< 'else if'로 복수 조건 처리하기 > 
유사하지만 약간씩 차이가 있는 조건 여러 개를 처리해야 할 때 사용.

let year = prompt('ECMAScript-2015 명세는 몇 년도에 출판되었을까요?', '');

if (year < 2015) {
  alert( '숫자를 좀 더 올려보세요.' );
} else if (year > 2015) {
  alert( '숫자를 좀 더 내려보세요.' );
} else {
  alert( '정답입니다!' );
}

< 조건부 연산자 '?' > 
조건에 따라 다른 값을 변수에 할당해줘야 할 때가 있다.

let accessAllowed;
let age = prompt('나이를 입력해 주세요.', '');

if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}

alert(accessAllowed);

이럴 경우 코드가 길어질 수 있기 때문에, 
조건부 연산자를 사용하면 짧고 간결하게 변형할 수 있다!
let result = condition ? value1 : value2;

< 다중 '?' >
let age = prompt('나이를 입력해주세요.', 18);

let message = (age < 3) ? '아기야 안녕?' :
  (age < 18) ? '안녕!' :
  (age < 100) ? '환영합니다!' :
  '나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!';

alert( message );

< 부적절한 사용 > 
let company = prompt('자바스크립트는 어떤 회사가 만들었을까요?', '');

(company == 'Netscape') ?
   alert('정답입니다!') : alert('오답입니다!');

위의 경우보다,

let company = prompt('자바스크립트는 어떤 회사가 만들었을까요?', '');

if (company == 'Netscape') {
  alert('정답입니다!');
} else {
  alert('오답입니다!');
}

이 경우 더 가독성이 뛰어나다. if문을 사용할 경우와 물음표를 사용하는 경우를 나눠서 잘 생각해보자! 


*/

/* 아래 코드에서 alert은 실행 될까요? */

if ("0") {
    alert( 'Hello' );
  } // 문자열이 들어간 값이기때문에 실행될것으로 예상했습니다. 

/* if..else 구조를 이용해 "자바스크립트의 ‘공식’ 이름은 무엇일까요?"라는 질문을 하는 코드를 작성해 보세요.

사용자가 'ECMAScript’를 입력했다면 ‘정답입니다!’, 
아니라면 '모르셨나요? 정답은 ECMAScript입니다!'라는 메시지를 보여주세요 */

let name = prompt('자바스크립트의 공식 이름은 무엇일까요 ?');
if(name == 'ECMAScript') {
    alert('정답입니다!');
} else {
    alert('모르셨나요? 정답은 ECMAScript 입니다!');
}

/* if..else와 프롬프트 대화상자를 사용해 사용자로부터 숫자 하나를 입력받고,
 아래 조건에 따라 그 결과를 alert 창에 출력해 보세요.

1. 입력받은 숫자가 0보다 큰 경우 1을 출력
2. 입력받은 숫자가 0보다 작은 경우 -1을 출력
3. 입력받은 숫자가 0인 경우 0을 출력 */

let insertNum = prompt('숫자를 입력해주세요 :)');
if(insertNum > 0){
    alert('1');
} else if (insertNum < 0) {
    alert('-1');
} else if (insertNum == 0) {
    alert('0');
}

/* 해답은 이렇게 나와있다!
let value = prompt('숫자를 입력하세요.', 0);

if (value > 0) {
  alert( 1 );
} else if (value < 0) {
  alert( -1 );
} else {
  alert( 0 );
}
*/

/* 조건부 연산자 '?'를 이용해 if문이 사용된 아래 코드를 변형해보세요. 동작 결과는 동일해야 합니다.

let result;

if (a + b < 4) {
  result = '미만';
} else {
  result = '이상';
}

*/
let result;
result = (a + b < 4) ? '미만' : '이상';

/* 조건부 연산자 '?'를 사용해 if..else문이 사용된 아래 코드를 변형해보세요. 동작 결과는 동일해야 합니다.
가독성을 위해 표현식을 여러 줄로 분할해 작성해 보시길 바랍니다.

let message;

if (login == '직원') {
  message = '안녕하세요.';
} else if (login == '임원') {
  message = '환영합니다.';
} else if (login == '') {
  message = '로그인이 필요합니다.';
} else {
  message = '';
}

 */

let message = (login == '직원') ? '안녕하세요.' :
(login == '임원') ? '환영합니다.' : 
(login == '') ? '로그인이 필요합니다.':
'' ; 