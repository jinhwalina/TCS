/*
< switch문 >

복수의 if조건문은 switch문으로 바꿀 수 있다.
switch문을 사용한 비교법은 특정 변수를 다양한 상황에서 비교할 수 있게 해준다. 코드 자체가 비교 상황을 잘 설명한다.

문법
switch문은 하나 이상의 case문으로 구성된다. 대개 default문도 있지만, 이는 필수가 아니다. 

switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}

case문 안에 break문이 없으면 조건에 부합하는지 여부를 따지지 않고 이어지는 case문을 실행한다. 
break문이 없는 경우 어떤일이 생길까 ?

let a = 2 + 2;

switch (a) {
  case 3:
    alert( '비교하려는 값보다 작습니다.' );
  case 4:
    alert( '비교하려는 값과 일치합니다.' );
  case 5:
    alert( '비교하려는 값보다 큽니다.' );
  default:
    alert( "어떤 값인지 파악이 되지 않습니다." );
}
조건에 맞는 실행문 이후의 case들이 다 출력된다 

< 여러 개의 case 문 묶기 >
코드가 같은 case문은 한데 묶을 수 있다. 
case3과 case5에서 실행하려는 코드가 같은 경우에 대한 예시를 보자. 

let a = 3;

switch (a) {
  case 4:
    alert('계산이 맞습니다!');
    break;

  case 3: // (*) 두 case문을 묶음
  case 5:
    alert('계산이 틀립니다!');
    alert("수학 수업을 다시 들어보는걸 권유 드립니다.");
    break;

  default:
    alert('계산 결과가 이상하네요.');
}

이 경우 case3과 case5는 동일한 메세지를 보여준다. 
switch/case문에서 break문이 없는 경우엔 조건에 상관없이 다음 case문이 실행되는 부작용이 발생한다. 
위 예시에서 case 3이 참인 경우엔 (*)로 표시한 줄 아래의 코드가 실행되는데, 
그 아래 줄엔 case 5가 있고 break문도 없기 때문에 12번째 줄의 break문을 만날 때까지 코드는 계속 실행된다.

< 자료형의 중요성 > 
switch문은 일치 비교로 조건을 확인한다. 비교하려는 값과 case문의 값의 형과 같이 같아야 해당 case문이 실행된다. 
let arg = prompt("값을 입력해주세요.");
switch (arg) {
  case '0':
  case '1':
    alert( '0이나 1을 입력하셨습니다.' );
    break;

  case '2':
    alert( '2를 입력하셨습니다.' );
    break;

  case 3: 써있는 자료형이 다르기 때문에 alert창의 문구를 띄우지 않는다. 
    alert( '이 코드는 절대 실행되지 않습니다!' );
    break;
  default:
    alert( '알 수 없는 값을 입력하셨습니다.' );
}

*/
// if 문으로 변환하기 !!
switch (browser) {
    case 'Edge':
      alert( "Edge를 사용하고 계시네요!" );
      break;
  
    case 'Chrome':
    case 'Firefox':
    case 'Safari':
    case 'Opera':
      alert( '저희 서비스가 지원하는 브라우저를 사용하고 계시네요.' );
      break;
  
    default:
      alert( '현재 페이지가 괜찮아 보이길 바랍니다!' );
}       


if (browser == 'Edge'){
    alert("Edge를 사용하고 계시네요!");
} else if (browser == 'Chrome' || browser == 'Firefox' || browser == 'Safari' || browser == 'Opera') {
    alert("저희 서비스가 지원하는 브라우저를 사용하고 계시네요 !");
} else {
    alert("현재 페이지가 괜찮아 보이길 바랍니다 !")
}

/* 아래 if문을 switch 문으로 변환하기 */
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}


let a = +prompt('a?', '');
switch(a){
    case 0 : alert(0);  
        break;
    case 1 : alert(1);
        break;
    case 2 : 
    case 3 :
        alert('2,3');
    break;
}

