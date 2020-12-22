/* 'new' 연산자와 생성자 함수
객체 리터럴 {...} 을 사용하면 객체를 쉽게 만들 수 있다. 그런데 개발을 하다보면 유사한 객체를 여러개
만들어야 할 때가 생기곤한다. 복수의 사용자, 메뉴 내 다양한 아이템을 객체로 표현하려고 하는 경우가 그러하다.

"new" 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있다. 

< 생성자 함수 > 
생성자 함수와 일반 함수에 기술적인 차이는 없다. 다만 생성자 함수는 아래 두 관례를 따른다.
1. 함수 이름의 첫 글자는 대문자로 시작한다.
2. 반드시 "new" 연산자를 붙여 실행한다.

function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false

new User(...)를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작한다.
1. 빈 객체를 만들어 this에 할당한다.
2. 함수 본문을 실행한다. this에 새로운 프로퍼티를 추가해 this를 수정한다.
3. this를 반환한다.

new User(...)가 실행되면 무슨 일이 일어날까?
function User(name) {
  // this = {};  (빈 객체가 암시적으로 만들어짐)

  // 새로운 프로퍼티를 this에 추가함
  this.name = name;
  this.isAdmin = false;

  // return this;  (this가 암시적으로 반환됨)
}
let user = new User("Jack")는 아래 코드를 입력한 것과 동일하게 동작한다.
let user = {
  name: "Jack",
  isAdmin: false
};

new User("Jack")이외에도 new User("Ann"), new User("Alice")등을 이용하면 손쉽게 사용자 객체를 만들 수 있다.
객체 리터럴 문법으로 일일이 객체를 만드는 방법보다 훨씬 간단하고 읽기 쉽게 객체를 만들 수 있게 되었다. 

생성자의 의의는 바로 여기에 있다. 재사용할 수 있는 객체 생성 코드를 구현하는것이다. 

모든 함수는 생성자 함수가 될 수 있다는 점 ! 잊으면 안된다 !
new를 붙여 실행한다면 어떤 함수라도 위에 언급된 알고리즘이 실행된다. 
이름 "첫 글자가 대문자"인 함수는 new를 붙여 실행해야 한다는 점도 잊지 말아야한다.

***** new function() {...}
재사용 할 필요가 없는 복잡한 객체를 만들어야 한다고 해보자. 
많은 양의 코드가 필요할 것이다. 이럴 땐 아래와 같이 코드를 익명 생성자 함수로 감싸주는 방식을 사용 할 수 있다.
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // 사용자 객체를 만들기 위한 여러 코드.
  // 지역 변수, 복잡한 로직, 구문 등의
  // 다양한 코드가 여기에 들어갑니다.
};

위 생성자 함수는 익명 함수이기 때문에 어디에도 저장되지 않는다. 처음 만들 때부터 단 한 번만 호출 할 
목적으로 만들었기 때문에 재사용이 불가능하다. 이렇게 익명 생성자 함수를 이용하면 재사용은 막으면서 
코드를 캡슐화 할 수 있다.

< new.target과 생성자 함수 >
이 문법은 자주 쓰이지는 않는다!
new.target 프로퍼티를 사용하면 함수가 new와 함께 호출되었는지 아닌지를 알 수 있다. 
일반적인 방법으로 함수를 호출했다면 new.target은 undefined를 반환한다. 반면 new와 함께 호출한 경우엔
new.target은 함수 자체를 반환해준다.

function User() {
  alert(new.target);
}

// "new" 없이 호출함
User(); // undefined

//"new"를 붙여 호출함
new User(); // function User { ... }

함수 본문에서 new.target을 사용하면 해당 함수가 new와 함께 호출되었는지 아닌지를 확인할 수 있다.
이를 활용해 일반적인 방법으로 함수를 호출해도 new를 붙여 호출한 것과 같이 동작하도록 !
function User(name) {
  if (!new.target) { // new 없이 호출해도
    return new User(name); // new를 붙여줍니다.
  }

  this.name = name;
}

let john = User("John"); // 'new User'를 쓴 것처럼 바꿔줍니다.
alert(john.name); // John

라이브러리를 분석하다 보면 위와 같은 방식이 쓰인 걸 발견할 때가 있을것이다. 
이런 방식을 사용하면 new를 붙여 함수를 호출하든 아니든 코드가 동일하게 동작하기 때문에, 좀 더 유연하게 
코드를 작성할 수 있다. 

그런데 new를 생략하면 코드가 정확히 무슨 일을 하는지 알기 어렵다. new가 붙어있으면 새로운 객체를 
만든다는 걸 누구나 알 수 있는 반면에..! 이방법은 정말 필요한 경우에만 사용하기!

< 생성자와 return문 >
생성자 함수엔 보통 return문이 없다. 반환해야 할 것들은 모두 this에 저장되고, this는 자동으로 반환되기 때문에
반환문을 명시적으로 써 줄 필요가 없다.

그런데 만약 return문이 있다면 어떤 일이 벌어질까 ? 아래와 같은 간단한 규칙이 적용된다.
1. 객체를 return한다면 this대신 객체가 반환된다.
2. 원시형을 return한다면, return문이 무시된다. 

return 뒤에 객체가 오면 생성자 함수는 해당 객체를 반환해주고, 이 외의 경우는 this가 반환된다.
아래 예시에선 첫 번째 규칙이 적용돼, return은 this를 무시하고 객체를 반환한다.

function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- this가 아닌 새로운 객체를 반환함
}

alert( new BigUser().name );  // Godzilla

아무것도 return하지 않는 예시를 살펴보자. 원시형을 반환하는 경우와 마찬가지로 두 번째 규칙이 적용된다.
function SmallUser() {

  this.name = "John";

  return; // <-- this를 반환함
}

alert( new SmallUser().name );  // John
return문이 있는 생성자 함수는 거의 없다. 

< 괄호 생략하기 > 
인수가 없는 생성자 함수는 괄호를 생략해 호출할 수 있다.
let user = new User; // <-- 괄호가 없음
// 아래 코드는 위 코드와 똑같이 동작합니다.
let user = new User();
하지만 좋은 스타일은 아니기에 써주도록 하자..!

< 생성자 내 메서드 >
생성자 함수를 사용하면 매개변수를 이용해 객체 내부를 자유롭게 구성할 수 있다. 
엄청난 유연성이 확보된다. 지금까진 this에 프로퍼티를 더해주는 예시만 살펴봤지만, 더해주는것도 가능하다.

아래 예시에서 new User(name)는 프로퍼티 name과 메서드 sayHi를 가진 객체를 만들어준다.
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

let john = new User("John");

john.sayHi(); // My name is: John

//
john = {
   name: "John",
   sayHi: function() { ... }
}
//
class 문법을 사용하면 생성자 함수를 사용하는 것과 마찬가지로 복잡한 객체를 만들 수 있다. 
class에 대해선 추후 학습!!!

***** 요약
1. 생성자 함수 (짧게 줄여서 생성자)는 일반 함수이다. 다만, 일반 함수와 구분하기 위해 함수 이름 첫 글자를
대문자로 씁니다.
2. 생성자 함수는 반드시 new 연산자와 함께 호출해야한다. new 와 함께 호출하면 내부에서 this가 암시적으로 만들어지고,
마지막엔 this가 반환된다.
유사한 객체를 여러개 만들때 생성자 함수가 유용하다.

자바스크립트는 언어 차원에서 다양한 생성자 함수를 제공한다. 날짜를 나타내는 데 쓰이는 Date, 집합(set)을
나타내는 데 쓰이는 Set등의 내장 객체는 이런 생성자 함수를 이용해 만들 수 있다. 


*/
/* 함수 두 개로 동일한 객체 만들기
new A()==new B()가 성립 가능한 함수 A와 B를 만드는 게 가능할까요?
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true

가능하다! 
*/

/* 계산기 만들기
아래와 같은 세 개의 메서드를 가진 생성자 함수, Calculator를 만들어보세요.

read() – prompt 함수를 이용해 사용자로부터 값 두 개를 받고, 이를 객체 프로퍼티에 저장합니다.
sum() – 프로퍼티에 저장된 값 두 개를 더한 후 반환합니다.
mul() – 프로퍼티에 저장된 값 두 개를 곱한 후 반환합니다.

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

*/

function Calculator() {
    this.read = function() {
        this.a = +prompt('a는?');
        this.b = +prompt('b는?');
    };
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    };

}
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

/* 누산기 만들기
생성자 함수를 만들어보자.
Accumulator(startingValue)를 이용해 만드는 객체는 아래와 같은 요건을 충족해야 합니다.

프로퍼티 value에 현재 값(current value)을 저장합니다. 최초 호출 시엔 생성자 함수의 인수, startingValue에서 시작값(starting value)을 받아옵니다.
메서드 read()에선 prompt 함수를 사용해 사용자로부터 숫자를 받아오고, 받은 숫자를 value에 더해줍니다.
프로퍼티 value엔 startingValue와 사용자가 입력한 모든 값의 총합이 더해져 저장됩니다.

let accumulator = new Accumulator(1); // 최초값: 1

accumulator.read(); // 사용자가 입력한 값을 더해줌
accumulator.read(); // 사용자가 입력한 값을 더해줌

alert(accumulator.value); // 최초값과 사용자가 입력한 모든 값을 더해 출력함

*/
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function(){
        this.value += +prompt('더할 값을 입력해주세요!',0);
    };
}
let accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert(accumulator.value);
