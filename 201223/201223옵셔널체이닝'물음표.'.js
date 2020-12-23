/* 
옵셔널 체이닝 '?.' 
 > 최근에 추가된 문법이다. 구식 브라우저는 폴리필이 필요하다.

옵셔널 체이닝을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.

< 옵셔널 체이닝이 필요한 이유 >
옵셔널 체이닝은 왜 등장하게 됐을까?

사용자가 여러 명 있는데 긎중 몇 명은 주소 정보를 가지고 있지 않다고 가정해보자! 
이럴 때 user.address.street를 사용해 주소 정보에 접근하면 에러가 발생할 수 있다.

let user = {}; // 주소 정보가 없는 사용자

alert(user.address.street); // TypeError: Cannot read property 'street' of undefined

또 다른 사례는 브라우저에 동작하는 코드를 개발할 때 발생할 수 있는 문제로, 페이지에 존재하지 않는
요소에 접근해 요소의 정보를 가져오려 할 때 발생한다.

// querySelector(...) 호출 결과가 null인 경우 에러 발생
let html = document.querySelector('.my-element').innerHTML;
명세서에 ?.이 추가되기 전엔 이런 문제들을 해결하기 위해 && 연산자를 사용하곤 했다.
let user = {}; // 주소 정보가 없는 사용자

alert( user && user.address && user.address.street ); // undefined, 에러가 발생하지 않습니다.
중첩 객체의 특정 프로퍼티에 접근하기 위해 거쳐야 할 구성요소들을 AND로 연결해 실제 해당 객체나 
프로퍼티가 있는지 확인하는 방법을 사용했었다. 그런데 이렇게 AND를 연결해서 사용하면 코드가 아주 
길어진다는 단점이 있다!

< 옵셔널 체이닝의 등장 > 
?. 은 ?.'앞'의 평가 대상이 undefined나 null이면 평가를 멈추고, undefined를 반환한다. 

    * 설명이 장황해지지 않도록 지금부턴 평가 후 결과가 null이나 undefined가 아닌 경우엔 
    값이 '있다', '존재한다' 라고 표현할것이다

옵셔널 체이닝을 사용해 user.address.street에 안전하게 접근해보자.
let user = {}; // 주소 정보가 없는 사용자

alert( user?.address?.street ); // undefined, 에러가 발생하지 않습니다.
user?.address로 주소를 읽으면 아래와 같이 user객체가 존재하지 않더라도 에러가 발생하지 않는다.

let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
위 예시를 통해 ?.은 ?. '앞' 평가 대상에만 동작되고, 확장은 되지 않는다는 사실을 알 수 있다.

***** 옵셔널체이닝을 남용해선 안된다. 
?.는 존재하지 않아도 괜찮은 대상에만 사용해야 한다.
사용자 주소를 다루는 위 예시에서 논리상 user는 반드시 있어야 하는데 address는 필수값이 아니다.
그렇기 때문에 user.address?.street을 사용하는 것이 바람직하다.
실수로 인해 user에 값을 할당하지 않았다면 바로 알아낼 수 있도록 해야한다. 그렇지 않으면 에러를 
조기에 발견하지 못하고 디버깅이 어려워진다.

***** ?.앞의 변수는 꼭 선언되어 있어야 한다.
변수 user가 선언되어있지 않으면 user?.anything 평가시 에러가 발생한다.

// ReferenceError: user is not defined
user?.address;

< 단락 평가 > 
?. 는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. 
참고로 이런 평가 방법을 단락 평가라고 부른다.
그렇기 때문에 함수 호출을 비롯한 ?. 오른쪽에 있는 부가 동작은 ?.의 평가가 멈췄을 때 더는 일어나지 않는다.

let user = null;
let x = 0;

user?.sayHi(x++); // 아무 일도 일어나지 않습니다.

alert(x); // 0, x는 증가하지 않습니다.

?.()와 ?.[]
?.은 연산자가 아니다. ?.은 함수나 대괄호와 함께 동작하는 특별한 문법 구조체이다.
함수 관련 예시와 함께 존재 여부가 확실치 않은 함수를 호출할 때 ?.()를 어떻게 쓸 수 있을지 알아보자.

한 객체엔 메서드 admin이 있지만 다른 객체엔 없는 상황이다.
let user1 = {
  admin() {
    alert("관리자 계정입니다.");
  }
}

let user2 = {};

user1.admin?.(); // 관리자 계정입니다.
user2.admin?.();
두 상황 모두에서 user객체는 존재하기 때문에 admin프로퍼티는 .만 사용해 접근했다.
그리고 난 후 ?.()를 사용해 admin의 존재 여부를 확인했다. user1엔 admin이 정의되어 있기 때문에 
메서드가 제대로 호출되었다. 반면 user2엔 admin이 정의되어 있지 않았음에도 불구하고 메서드를 호출하면 
에러 없이 그냥 평가가 멈추는 것을 확인할 수 있다.
. 대신 대괄호 []를 사용해 객체 프로퍼티에 접근하는 경우엔 ?.[]를 사용할 수도 있다. 위 예시와 마찬가지로
?.[]를 사용하면 프로퍼티 존재 여부가 확실치 않은 경우에도 안전하게 프로퍼티를 읽을 수 있다. 

let user1 = {
  firstName: "Violet"
};

let user2 = null; // user2는 권한이 없는 사용자라고 가정해봅시다.

let key = "firstName";

alert( user1?.[key] ); // Violet
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined

?. 은 delete와 조합해 사용할 수도 있다. 
delete user?.name; // user가 존재하면 user.name을 삭제! 

***** ?.은 읽기나 삭제하기에는 사용가능하지만 쓰기에는 사용할 수 없다.
?.은 할당 연산자 왼쪽에서 사용할 수 없다.

// user가 존재할 경우 user.name에 값을 쓰려는 의도로 아래와 같이 코드를 작성해 보았습니다.
user?.name = "Violet"; // SyntaxError: Invalid left-hand side in assignment
// 에러가 발생하는 이유는 undefined = "Violet"이 되기 때문입니다.

***** 요약!
옵셔널 체이닝 문법 ?.은 세 가지 형태로 사용할 수 있다.
1. obj?.prop - obj가 존재하면 obj.prop을 반환하고, 그렇지 않으면 undefined를 반환한다.
2. obj?.[prop] - obj가 존재하면 obj[prop]을 반환하고, 그렇지 않으면 undefined를 반환한다.
3. obj?.method() - obj가 존재하면 obj.method()를 호출하고, 그렇지 않으면 undefined를 반환한다.

여러 예시를 통해 살펴보았듯이 옵셔널 체이닝 문법은 꽤 직관적이고 사용하기도 쉽다. ?. 왼쪽 평가 대상이 
null이나 undefined인지 확인하고 null이나 undefined가 아니라면 평가를 계속 진행한다.
?. 를 계속 연결해서 체인을 만들면 중첩 프로퍼티들에 안전하게 접근 가능하다. 
?. 은 ?. 왼쪽 평가 대상이 없어도 괜찮은 경우에만 선택적으로 사용해야 한다.

꼭! 있어야 하는 값인데 없는 경우에 ?.을 사용하면 프로그래밍 에러를 쉽게 찾을 수 없으므로 
이런 상황을 만들지 않도록 해야한다!

*/