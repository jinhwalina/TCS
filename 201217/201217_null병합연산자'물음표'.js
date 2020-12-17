/* null 병합 연산자 '??' 
최근에 추가된 문법. 구식 브라우저에는 폴리필이 필요하다.

null 병합연산자 ?? 를 사용하면 짧은 문법으로 여러 피연산자 중 그 값이 '확정되어 있는' 변수를 찾을 수 있다. 

a ?? b의 평가 결과는 다음과 같다. 
a가 null도 아니고 undefined도 아니면 a
그 외의 경우는 b

null 병합 연산자 ?? 없이 x = a ?? b와 동일한 동작을 하는 코드는 

x = (a !== null && a !== undefined) ? a : b;

또 다른 예시
firstName, lastName, nickName 이란 변수에 사용자 이름이나 별명을 저장하는데, 
사용자가 아무런 정보도 입력하지 않는 케이스도 허용한다면..

화면엔 세 변수 중, 값이 정해진 변수의 값을 출력하는데, 세 변수 모두 값이 정해지지 않았다면 "Anonymous"가 출력되도록

이럴 때 null 병합 연산자 ??를 사용하면 값이 정해진 변수를 간편하게 찾아낼 수 있다.

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// null이나 undefined가 아닌 첫 번째 피연산자
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder

< '??'와 '||'의 차이 >
null 병합 연산자는 OR연산자 ||와 상당히 유사해보인다. 
실제로 위 예시에서 ??를 ||로 바꿔도 그 결과는 동일하다. 
두 연산자 사이에는 중요한 차이점이 있다! 

||는 첫 번째 truthy 값을 반환. 
??는 첫 번째 정의된(defined) 값을 반환. ( 미리 정의해둔 값 )

null과 undefined, 숫자 0을 구분 지어 다뤄야 할 때 이 차이점은 매우 중요한 역할을 한다. 
height = height ?? 100;

height에 값이 저장되지 않았다면 height엔 100이 할당된다. 
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0

이런 특징 때문에 높이처럼 0이 할당될 수 있는 변ㅅ를 사용해 기능을 개발할 땐 ||보다 ??가 적합하다.

< 연산자 우선순위 > 
??의 연산자 우선순위는 5로 꽤 낮다.
따라서 ?? 는 = 와 ? 보다는 먼저, 대부분의 연산자보다는 나중에 평가된다.
그렇기 때문에 복잡한 표현식 안에서 ?? 를 사용해 값을 하나 선택할 땐 괄호를 추가해주는 게 좋다.

let height = null;
let width = null;

// 괄호를 추가!
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000

그렇지 않으면 *가 ??보다 우선순위가 높기 때문에 *가 먼저 실행된다. 

> 원치 않는 결과는 이렇게 나온다.
let area = height ?? (100 * width) ?? 50;

***** 안정성 관련 이슈 떄문에 ??는 &&나 ||와 함께 사용하지 못한다. 
아래 예시를 실행하면 문법 에러가 발생한다.
let x = 1 && 2 ?? 3; // SyntaxError: Unexpected token '??'
사용하고자 할 땐 꼭! 괄호를 써줘야한다. 
*/