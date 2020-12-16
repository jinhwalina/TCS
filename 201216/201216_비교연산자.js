

/* 비교 연산자 
1. 같음 : a == b (등호가 두 개 온다. 헷갈리지 않기)
2. 같지않음 : a != b

< 불린형 반환 > 
true가 반환되면 '긍정','참','사실'을 의미한다.
false가 반환되면 '부정','거짓','사실이 아님'을 의미한다.

alert( 2 > 1 );  // true
alert( 2 == 1 ); // false
alert( 2 != 1 ); // true

< 문자열 비교 >
자바스크립트는 '사전'순으로 문자열을 비교한다. (정확히는 사전순이 아니라 유니코드 순!!)

alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true

< 다른 형을 가진 값 간의 비교 >
비교하려는 값의 자료형이 다르면 자바스크립트는 이 값들을 '숫자형'으로 바꿔준다.

alert( '2' > 1 ); // true, 문자열 '2'가 숫자 2로 변환된 후 비교가 진행.
alert( '01' == 1 ); // true, 문자열 '01'이 숫자 1로 변환된 후 비교가 진행.

같이 일어나지 않을 법한 두 상황이 동시에 일어나는 경우! 
 * 동등 비교 (==)시 true를 반환함
 * 논리 평가 시 값 하나는 true, 다른 값 하나는 false를 반환함.

let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!

< 일치 연산자 > 
동등 연산자 == 은 0과 false를 구별하지 못한다.

alert( 0 == false ); // true

피연산자가 빈 문자열일때도 같은 문제가 발생한다.
alert( '' == false ); // true

이 문제를 해결하기 위해서는 === ( 일치 연산자 ) 를 사용해 형 변환 없이 값을 비교 할 수 있다.
일치연산자는 엄격한 동등 연산자이다. 자료형의 동등 여부까지 검사하기 때문에, 피연산자 a와b의 형이 다를 경우 
a===b는 false를 즉시 반환한다.

alert( 0 === false ); // false, 피연산자의 형이 다르기 때문.

< null이나 undefined와 비교하기 >
null이나 undefined를 다른 값과 비교할 땐 예상치 않은 일들이 발생한다. 
1. 일치 연산자 ===를 사용하여 null과 undefined를 비교
    > 두 값은 자료형이 다르기 때문에 일치 비교 시 거짓이 반환된다.
    > alert( null === undefined ); // false

2. 동등 연산자 ==를 사용하여 null과 undefined를 비교
    > 이 둘을 비교하면 특별한 규칙이 적용되어 true가 반환된다. 
    > alert( null == undefined ); // true

3. 산술 연산자나 기타 비교 연산자 < > <= >=를 사용하여 null과 undefined를 비교
    > null과 undefined는 숫자형으로 변환된다. null은 0, undefined는 NaN으로 변한다.


< null vs 0 >
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true
3번째 같은 경우 위 예시들과 비교하면 논리적으로 맞지 않는다. 
(1)에서 null > 0이 거짓을, (3)에서 null >= 0이 참을 반환하는 이유는 (기타 비교 연산자의 동작 원리에 따라) 
null이 숫자형으로 변환돼 0이 되기 때문

< 비교가 불가능한 undefined >
다른 값과 비교해서는 안된다. 어떠한 결과가 나오든 false 값을 반환한다. 

< 주의해야할 사항 >
***** 함정!
일치 연산자 ===를 제외한 비교 연산자의 피연산자에 undefined나 null이 오지 않도록 특별히 주의해야한다. 
undefined나 null이 될 가능성이 있는 변수가 >=, >, <, <=의 피연산자가 되지 않도록 주의해야한다. 

< 요약 > 
1. 비교 연산자는 불린값을 반환합니다.
2. 문자열은 문자 단위로 비교되는데, 이때 비교 기준은 '사전’순입니다.
3. 서로 다른 타입의 값을 비교할 땐 숫자형으로 형 변환이 이뤄지고 난 후 비교가 진행됩니다(일치 연산자는 제외).
4. null과 undefined는 동등 비교(==) 시 서로 같지만 다른 값과는 같지 않습니다.
5. null이나 undefined가 될 확률이 있는 변수가 > 또는 <의 피연산자로 올 때는 주의를 기울이시기 바랍니다. 
    null/undefined 여부를 확인하는 코드를 따로 추가하는 습관을 들이길 권유합니다.

*/


// 아래 표현식들의 결과를 예측해보세요.
5 > 4 // true
"apple" > "pineapple" // true
"2" > "12" // false             * true ( 따옴표 안에 있기때문에 문자열 비교. 사전 순서로 봐야한다 )
undefined == null // true     
undefined === null // false
null == "\n0\n" // true         * false ( null은 오직 undefined와 같다. )
null === +"\n0\n" // false