# 도움말

## build 방법
-- window : cmd -> local repo 경로로 이동 'gulp'  치면 gulp default task 실행 됨.
_-- 이후 dist폴더로 복사되는 dev task 추가로 생성할 예정_


### 개발환경
1. nodeJS
2. Gulp
3. node-sass
4. css3,html5.
5. mobile first
6. Data는 test 용으로 json array 형태의 text 파일 또는 js 파일을 임시로 사용 함. (DB 없음)
7. ie8 대응을 위한 pollyfill
    - respond.js
    - nwmatcher.js
    - selectivizr.js
    - html5shiv.js
8. Cross Browsing (기본 PC용 브라우저,Oracle VM virtualBox , Genymotion 사용)
    1. pc
        - MSIE 8.0 , MSIE 9.0 , MSIE10.0 , MSIE 11.0 , Microsoft_edge(spartan)
        - Firefox  -- last 2 versions
        - Chrome  -- last 2 versions
        - Safari -- last 2 versions
        - Opera -- last 2 versions
    2. mobile
        - Android  > 0
        - iOS > 0
        - FirefoxAndroid > 0


### 작업 예정
1. scaffolding 기술 예정.
2. 스프라이트 테스트 예정~
3. html 인클루드 템플릿 테스트 예정~
4. handlebar 처리~~
5. 이후  task runner를 gulp에서 webpack으로 변경할 예정~~
6. 'look' repo 전용 wiki 에 gulp가이드 만들고 사전준비 내용과 Task 상세내용 설명할 예정.



### **셋팅 제약 사항!**
- 대규모 개발 시스템의 markup(전용) 환경만을 위한 gulp를 셋팅할 예정.
- 일단 브라우저 싱크로.. 테스트 하고... 이후 ftp 정보를 받아 브라우저 싱크 테스크의 pipe 연결하는걸로!
- pc 크로스 브라우징을 위한 폴리필 추가! (최소 ie8 표준모드)
- PC와 모바일 (반응형) 배경 이미지 동시 생성을 위한 spritesmith 준비. <-- handlebar 활용 하여 ie 분기할것!
- js는 json array 또는 html include test 용도 정도로 간단하게 사용. js 하나만을 공용으로 사용할 예정으로 js concat 불필요. <-- 이후에 ui component 추가 작업이 필요할 경우 module 로 분리할 것임.
- 최종 dist(빌드시) postcss에서 url rebase 처리하여 상대경로 처리해줄것. (절대 경로로 되돌리는것도 유연하게 boolean 처리!)
- 플랫폼이 아니기에~ grid나 mixin 라이브러리 는 불필요 할듯~
