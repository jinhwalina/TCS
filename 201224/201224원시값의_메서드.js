/*
< 원시값의 메서드 >
자바스크립트는 원시값(문자열, 숫자 등)을 마치 객체처럼 다룰 수 있게 해준다.
원시값에도 객체에서처럼 메서드를 호출할 수 있다.

원시값과 객체는 이런 차이점이 존재한다.

원시값 : 
    - 원시형 값이다.
    - 원시형의 종류는 문자 (string), 숫자(number), bigint, 불린(boolean), 심볼(symbol), null, undefined형으로 
    총 일곱가지이다
객체 :
    - 프로퍼티에 다양한 종류의 값을 저장할 수 있다.
    - {name : "John", age : 30}와 같이 대괄호 {} 를 사용해 만들 수 있다. 자바스크립트에는 
    여러 종류의 객체가 있는데, 함수도 객체의 일종이다. 

객체의 장점중 하나는 함수를 프로퍼티로 저장할 수 있다는 것이다. 

let john = {
  name: "John",
  sayHi: function() {
    alert("친구야 반갑다!");
  }
};

john.sayHi(); // 친구야 반갑다!
객체 john을 만들고, 거기에 메서드 sayHi를 정의해보았다.
자바스크립트는 날짜, 오류, HTML요소 등을 다룰 수 있게 해주는 다양한 내장 객체를 제공한다.
이 객체들은 고유한 프로퍼티와 메서드를 가진다.
하지만 이런 기능을 사용하면 시스템 자원이 많이 소모된다는 단점이 있다.
객체는 원시값보다 "무겁고", 내부 구조를 유지하기 위해 추가 자원을 사용하기 때문이다.

< 원시값을 객체처럼 사용하기 >
자바스크립트의 모순적인 상황 해결은 어떻게 했을까 ?
1. 원시값은 원시값 그대로 남겨둬 단일 값 형태를 유지한다.
2. 문자열, 숫자, 불린, 심볼의 메서드와 프로퍼티에 접근할 수 있도록 언어 차원에서 허용한다.
3. 이를 가능하게 하기 위해, 원시값이 메서드나 프로퍼티에 접근하려 하면 추가 기능을 제공해주는 특수한 객체,
"원시 래퍼 객체"를 만들어 준다.

"래퍼 객체"는 원시 타입에 따라 종류가 다양하다. 각 래퍼 객체는 원시 자료형의 이름을 그대로 차용해,
string, Number, Boolean, Symbol라고 부른다. 래퍼 객체 마다 제공하는 메서드 역시 다르다.

인수로 받은 문자열의 모든 글자를 대문자로 바꿔주는 메서드 str.toUpperCase()를 예로 들어보자.
let str = "Hello";

alert( str.toUpperCase() ); // HELLO

1. 문자열 str은 원시값이므로 원시값의 프로퍼티에 접근하는 순간 특별한 객체가 만들어진다.
    이 객체는 문자열의 값을 알고 있고, toUpperCase()와 같은 유용한 메서드를 가지고 있다.
2. 메서드가 실행되고, 새로운 문자열이 반환된다. ( alert 창에 이 문자열이 출력된다 )
3. 특별한 객체는 파괴되고, 원시값 str만 남는다.

이런 내부 프로세스를 통해 원시값을 가볍게 유지하면서 메서드를 호출할 수 있는 것이다.

숫자형도 고유한 메서드를 지원한다.
메서드 toFixed(n)를 이용하면 원하는 자리에서 소수점 아래 숫자를 반올림할 수 있다.

let n = 1.23456;

alert( n.toFixed(2) ); // 1.23

***** String/Number/Boolean를 생성자로는 쓰지 말자!
Java등의 몇몇 언어에서는 new Number(1) 또는 new Boolean(false)와 같은 문법을 사용해 원하는 타입의 
"래퍼 객체" 를 직접 만들 수 있다.

alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
객체는 논리 평가 시 항상 참을 반환하기 때문에, 아래 예시에서 얼럿창은 무조건 열린다.

let zero = new Number(0);

if (zero) { // 변수 zero는 객체이므로, 조건문이 참이 됩니다.
  alert( "그런데 여러분은 zero가 참이라는 것에 동의하시나요!?!" );
}

그런데 , new를 붙이지 않고 String / Number / Boolean을 사용하는건 괜찮다. 
new 없이 사용하면 상식에 맞게 인수를 원하는 형의 원시값(문자열, 숫자, 불린값)으로 바꿔준다.

let num = Number("123"); // 문자열을 숫자로 바꿔줌

*/

/* 문자열에 프로퍼티를 추가 할 수 있을까 ?
아래 코드를 실행하면, 의도한 대로 문자열(str)에 프로퍼티(test)를 추가할 수 있을까요? 
만약 가능하다면 얼럿 창엔 무엇이 출력될까요?
*/

let str = "Hello";

str.test = 5; // *****

alert(str.test);

// 에러가 뜰것으로 예상!  

/* 
이 코드는 엄격 모드인지 아닌지에 따라 결과가 나뉜다.
1. undefined(비 엄격모드)
2. An error (엄격모드)

***** 로 표시된 줄에서 무슨 일이 생긴걸까 ?
1. str의 프로퍼티에 접근하려 하면 "래퍼 객체"가 만들어진다.
2. 엄격 모드에선 래퍼 객체를 수정하려 할 때 에러가 발생한다.
3. 비 엄격모드에선 에러가 발생하지 않는다.래퍼 객체에 프로퍼티 test가 추가된다.
    그런데 래퍼 객체는 바로 삭제되기 때문에 마지막 줄이 실행될 땐 프로퍼티 test를 찾을 수 없다.

    >>> 위 예시로 원시값과 객체는 다르다는 것을 알 수 있다! 
*/