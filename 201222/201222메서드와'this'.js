/* 
메서드와 'this'
객체는 사용자(user), 주문(order) 등과 같이 실제 존재하는 개체(entity)를 표현하고자 할 때 생성된다.

let user = {
  name: "John",
  age: 30
};
사용자는 현실에서 장바구니에서 물건 선택하기, 로그인하기, 로그아웃하기 등의 행동을한다. 
이와 마찬가지로 사용자를 나타내는 객체 user도 특정한 행동을 할 수 있다.
자바스크립트에선 객체의 프로퍼티에 함수를 할당해 객체에게 행동할 수 있는 능력을 부여해준다. 

< 메서드 만들기 > 
객체 user에게 인사할 수 있는 능력을 부여해보자.

let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!

함수 표현식으로 함수를 만들고, 객체 프로퍼티 user.sayHi에 함수를 할당해 주었다. 
이제 객체에 할당된 함수를 호출하면 user가 인사를 해준다.
이렇게 객체 프로퍼티에 할다된 함수를 메서드 라고 부른다.
위 예시에선 user에 할당된 sayHi가 메서드다.
메서드는 아래와 같이 이미 정의된 함수를 이용해서 만들 수도 있다.

let user = {
  // ...
};

// 함수 선언
function sayHi() {
  alert("안녕하세요!");
};

// 선언된 함수를 메서드로 등록
user.sayHi = sayHi;

user.sayHi(); // 안녕하세요!

***** 객체 지향 프로그래밍
객체를 사용하여 개체를 표현하는 방식을 객체지향프로그래밍이라 부른다.

< 메서드 단축 구문 > 
객체 리터럴 안에 메서드를 선언할 때 사용할 수 있는 단축 문법.

// 아래 두 객체는 동일하게 동작합니다.

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 단축 구문을 사용하니 더 깔끔해 보이네요.
user = {
  sayHi() { // "sayHi: function()"과 동일합니다.
    alert("Hello");
  }
};
위처럼 function을 생략해도 메서드를 정의할 수 있다. 
일반적인 방법과 단축 구문을 사용한 방법이 완전히 동일하진 않다. 객체 상속과 관련된 미묘한 차이가 
존재하는데 지금으로선 이 차이가 중요하진 않다..!! 

메서드와 'this'
메서드는 객체에 저장된 정보에 접근할 수 있어야 제 역할이 가능하다. 모든 메서드가 그런 건 아니지만, 
대부분의 메서드가 객체 프로퍼티의 값을 활용한다.
user.sayHi()의 내부 코드에서 객체 user에 저장된 이름(name)을 이용해 인사말을 만드는 경우가 이런 경우다.
* 메서드 내부에서 this 키워드를 사용하면 객체에 접근할 수 있다. 
이때 '점 앞'의 this는 객체를 나타낸다. 정확히는 메서드를 호출할 때 사용된 객체를 나타낸다.

let user = {
  name: "John",
  age: 30,

  sayHi() {
    // 'this'는 '현재 객체'를 나타냅니다.
    alert(this.name);
  }

};

user.sayHi(); // John

user.sayHi()가 실행되는 동안에 this는 user를 나타낸다.
this를 사용하지 않고 외부 변수를 참조해 객체에 접근하는 것도 가능하다.
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // 'this' 대신 'user'를 이용함
  }

};
이렇게 외부 변수를 사용해 객체를 참조하면 예상치 못한 에러가 발생할 수 있다.
user를 복사해 다른 변수에 할당(admin = user)는 전혀 다른 값으로 덮어썼다고 가정해보자. 
sayHi()는 원치 않는 값(null)을 참조할 것이다.

let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // Error: Cannot read property 'name' of null
  }

};


let admin = user;
user = null; // user를 null로 덮어씁니다.

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
alert 함수가 user.name 대신 this.name을 인수로 받았다면 에러가 발생하지 않았을 것이다.

< 자유로운 "this" >
자바스크립트의 this는 다른 프로그래밍 언어의 this와 동작 방식이 다르다.
자바스크립트에선 모든 함수에 this를 사용할 수 있다.
function sayHi() {
  alert( this.name );
} 이렇게 작성해도 문법 에러가 발생하지 않는다.
this 값은 런타임에 결정된다. 컨텍스트에 따라 달라진다. 
동일한 함수라도 다른 객체에서 호출했다면 'this'가 참조하는 값이 달라진다. 

let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)
규칙은 간단하다. obj.f()를 호출했다면 this는 f를 호출하는 동안의 obj이다. 위 예시에선
obj가 user나 admin을 참조한다.

***** 객체 없이 호출하기 : this == undefined
객체가 없어도 함수를 호출할 수 있다.
function sayHi() {
  alert(this);
}

sayHi(); // undefined
위와 같은 코드를 엄격모드에서 실행하면, this엔 undefined가 할당된다. 
this.name으로 name에 접근하려고하면 에러가 발생한다.
그런데 엄격모드가 아닐때는 this가 전역 객체를 참조한다. 
브라우저 환경에선 window라는 전역 객체를 참조한다. 이런 동작 차이는 "use strict" 가 도입된 배경이기도하다.
전역 객체는 전역 객체에서 자세히 다룰 예정이다.

***** 자유로운 this가 만드는 결과
다른 언어를 사용하다 자바스크립트를 사용하는 개발자들은 this를 혼동하기 쉽다. this는 항상 메서드가 
정의된 객체를 참조할 것이라고 착각한다. 이런 개념을 'bound this'라고 한다. 

자바스크립트에서 this는 런타임에 결정된다. 메서드가 어디서 정의되었는지에 상관없이 this는 '점 앞의' 객체가
무언인가에 따라 '자유롭게' 결정된다.

이렇게 this가 런타임에 결정되면 좋은 점도 있고 나쁜 점도 있다. 함수 (메서드)를 하나만 만들어 여러 객체에서
재사용할 수 있다는 것은 장점이지만, 이런 유연함이 실수로 이어질 수 있다는 것이 단점.

< 'this' 가 없는 화살표 함수 > 
화살표 함수는 일반 함수와는 달리 '고유한' this를 가지지 않는다. 화살표 함수에서 this를 참조하면, 
화살표 함수가 아닌 '평범한' 외부 함수에서 this값을 가져온다.
아래 예시에서 함수 arrow()의 this는 외부 함수 user.sayHi()의 this 가 된다.

let user = {
  firstName: "보라",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // 보라

***** 요약
1. 객체 프로퍼티에 저장된 함수를 '메서드'라고 부른다.
2. object.doSomething()은 객체를 '행동'할 수 있게 해준다.
3. 메서드는 this로 객체를 참조한다.

this 값은 런타임에 결정된다.
1. 함수를 선언할 때 this를 사용할 수 있다. 다만, 함수가 호출되기 전까진 this엔 값이 할당되지 않는다.
2. 함수를 복사해 객체 간 전달할 수 있다.
3. 함수를 객체 프로퍼티에 저장해 object.method()같이 '메서드'형태로 호출하면 this는 object를 참조한다.

화살표 함수는 자신만의 this를 가지지 않는다는 점에서 독특하다. 화살표 함수 안에서 this를 사용하면,
외부에서 this 값을 가져온다. 
*/

/* 객체 리터럴에서 'this' 사용하기
함수 makeUser는 객체를 반환합니다.
이 객체의 ref에 접근하면 어떤 결과가 발생하고, 그 이유는 뭘까요?

*/
function makeUser() {
    return {
      name: "John",
      ref: this
    };
  };
  
  let user = makeUser();
  
  alert( user.ref.name ); // 결과가 어떻게 될까요?
  
  // John을 출력할것으로 예상했다.
      // 에러가 발생!!!!!!!!!!!!!!
  function makeUser() {
    return {
      name: "John",
      ref: this
    };
  };
  
  let user = makeUser();
  
  alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
  /* 
  에러가 발생하는 이유 : this 값을 설정할 땐 객체 정의가 사용되지 않기 때문이다. 
  this 값은 호출 시점에 결정된다.
  위 코드에서 makeUser()내 this는 undefined가 된다. 메서드로써 호출된 게 아니라 
  함수로써 호출되었기 때문이다. 
  this 값은 전체함수가 된다. 코드 블록과 객체 리터럴은 여기에 영향을 주지 않는다.
  따라서 ref:this는 함수의 현재 this값을 가져온다.
  this의 값이 undefined가 되게 함수를 다시 작성하면 이렇다.
  */ 
 function makeUser(){
    return this; // 이번엔 객체 리터럴을 사용하지 않았습니다.
  }
  
  alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
  /* 보시다시피 alert(makeUser().name)와 위쪽에서 살펴본 alert(user.ref.name)의 결과가 같은 것을 확인 할 수 있다.
  에러가 발생하지 않게 하려면 코드를 다음처럼 수정해야한다.  */

  function makeUser() {
    return {
      name: "John",
      ref() {
        return this;
      }
    };
  };
  
  let user = makeUser();
  
  alert( user.ref().name ); // John
  // 이렇게하면 user.ref()가 메서드가 되고 this는 . 앞의 객체가 되기 때문에 에러가 발생하지 않는다.

  /* 계산기 만들기
  calculator라는 객체를 만들고 새 메서드를 구현해보자.
  1. read()에선 프롬프트 창을 띄우고 더할 값 두 개를 입력받습니다. 입력받은 값은 객체의 프로퍼티에 저장합니다.
  2. sum()은 저장된 두 값의 합을 반환합니다.
  3. mul()은 저장된 두 값의 곱을 반환합니다.
    let calculator = {
    // ... 여기에 답안 작성 ...
    };

    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );
    
  */ 
    // 처음 작성한 코드 
     let a,b;
     let calculator = {
        sum() {
            return (a+b); 
        },
        mul() {
            return (a*b);
        }
    };

    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );

    // 해답
    let calculator = {
        sum() {
            return this.a + this.b;
        },
        mul() {
            return this.a * this.b;
        },
        read() {
            this.a = +prompt('첫 번째 값 : ', 0);
            this.b = +prompt('두 번째 값 : ', 0);
        }
    };

    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );

    /* 체이닝
    < 메서드 체이닝 > 
    메서드가 객체를 반호나하게 되면 메서드의 반환 값인 객체를 통해 또 다른 함수를 호출 할 수 있다. 
    이러한 프로그래밍 패턴을 메서드 체이닝이라 부른다.

    메서드 체이닝은 객체에 값을 선언하고 호출하는 부분에서 이루어진다. 

    자기 자신을 반환하면서 다른 함수를 지속적으로 호출하는 릴레이 방식의 프로그래밍 패턴이 
    메서드 체이닝이다. 

    올라가기(up)와 내려가기(down) 메서드를 제공하는 객체 ladder가 있습니다.
    let ladder = {
        step: 0,
        up() {
            this.step++;
        },
        down() {
            this.step--;
        },
        showStep: function() { // 사다리에서 몇 번째 단에 올라와 있는지 보여줌
            alert( this.step );
        }
    };
    메서드를 연이어 호출하고자 한다면 아래와 같이 코드를 작성할 수 있다. 
    ladder.up();
    ladder.up();
    ladder.down();
    ladder.showStep(); // 1

    up, down, showStep을 수정해 아래처럼 메서드 호출 체이닝이 가능하도록 해봅시다.
    ladder.up().up().down().showStep(); // 1
    참고로 이런 방식은 자바스크립트 라이브러리에서 널리 사용된다! 

     > 각 메서드 마지막 부분에 return this; 를 써주면 된다.
    */

