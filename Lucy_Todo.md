# 도움말

 scss autoprefixer function~ 재미남~
 https://github.com/sass-projects/autoprefixer/blob/master/tests/specs/_autoprefixer.scss

### 16일 에러 메시지 나오게 설정할것!!!!! notice 랑 plumber!!!!!!!!   ---- 완료!
### 17일 gulpfile 초기 var config 에 proferties 정리할 것. autoprefixer 준비!


하아.... 18일이나 딴짓하고 ;;; 진척이 없음;;
spritesmith 준비할것

jekll 블로그 정리 할것!! 왜 진행이 전혀 아니되는것인가?!!!!!
게을러터져가지고!!!!!!!!!!!!!!!!! 하라고 햏래해해해해해해해햏!!!!! 그만놀아!!!!!

_http://sass-lang.com/guide  --- 중간에 operators에 보면 셀렉터에 article[role="main"]  <--- 요런식으로 되어있는거 참고 할 수 있을것임._
기본적으로 css와 셀렉터 참조하는 방식이 같음.



_/// 해석하다가 말음..._


Sass maps은 최고입니다. 그들은 이전에는 불가능했던 많은 것을, 잘, 가능하게하고 있습니다. 예를 들어, 동적 변수를 정의하는 현명한 방법이 있습니다. 또한 프레임 워크 및 그리드 시스템의 복잡한 구성으로 최적의 컨테이너입니다.

다행히도, Sass는 지도를 조작하기위한 여러 가지 기능을 제공합니다.
하지만 Sass 작업을 계속하는 경우 내장 API로 커버되지 않는 최악의 경우가 발생할 수 있습니다.


아마 일부지도에 중첩되어있는 키를 얻는 방법이 필요할까요?
이 키를 업데이트하려면 어떻게해야합니까?
또는 jQuery에서 $ .extend 같은 중첩 된 맵을 확장하고 있습니까?
우리가 오늘 검사 기능으로 쉽게 해결할 수 몇 가지 문제가 여기 저기 있습니다.



있는 맵에 속하는 키에 액세스 할 필요가있는 경우 다른 맵 (또는 여러 맵)에 중첩되어 버리면 다른 map-get에 의존 할 수 없습니다. 적어도 그것은 현재는 없습니다.


_////// 공부하다가;;; 귀차니즘;; 캬캬_

map deep getter

map-deep-get

https://www.sitepoint.com/extra-map-functions-sass/

getter




_//// gulp 참조_
gulp.src(files) 메소드 줄은 gulp 객체의 src() 에 파일이나 파일의 경로를 배열 데이터 형식(배열 또는 string)으로 작성하도록 합니다.

js/**/*.js 로 되어 있는데, 이렇게 와일드카드 형태로 표현해줄 수도 있습니다.**
이렇게 표현할 경우, Gulp 는 js/ 폴더와 내부폴더의 .js 파일들을 모두 찾아서 파일을 가져오게 됩니다.




gulp-notify    
: commad line 에만 에러 메시지가 출력 되는점을 보완하기 위해 추가된 플러그인.
: 에러 메세지를 간결하게 하거나 추가 정보를 출력해 줄수도 있고, 기본으로 출력되는 command line외에 OS에서 제공되는 별도의 알림영역에 메세지를 띄울수 있습니다.
: notify 단독 사용시 error 발생 후 해당 task가 중단됩니다.\
: 에러 발생 후 task 중단 없이 지속적으로 사용하기 위해서는 gulp-plumber 플러그인과 함꼐 사용해야 합니다
