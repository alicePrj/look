<template>
  <div class="border-color text-left p-4">
    <h3 class="font-weight-bold">Category Intro</h3>
    <ol>
      <li>
        Category 생성: 상위로 생성될 1depth Category 옆의 Add 버튼을 클릭합니다.
        <ul class="ml-2">
          <li>Analysis: 분석을 위한 Template을 모은 Category입니다. 일부 카테고리를 제외하고 LINE 내부와 외부 유저들이 공통적으로 사용하는 것을 전제로 합니다.</li>
          <li>Operation: 운영을 위한 Template을 모은 Category입니다. LINE 내부 유저들의 운영 편의를 위한 Template으로 LINE 내부 유저를 대상으로 합니다.</li>
        </ul>
      </li>
      <li>Category 수정/삭제: 좌측 메뉴에서 수정 혹은 삭제를 원하는 2 depth Category를 선택 후, 수정 또는 삭제 Action을 진행합니다.</li>
      <li>Category 이동/순서 변경: Category를 선택 후 Drag & Drop을 통해 다른 1depth Category로 이동하거나, 동일 Category 내에서 순서를 변경할 수 있습니다.</li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

h3:before {
  content: "• ";
}

ol {
  counter-reset: list;
  & > li {
    list-style: none;
    text-indent: -2rem;
    padding-left: 2rem;
  }
  & > li:before {
    content: counter(list) ") ";
    counter-increment: list;
  }
}

ul {
  & > li {
    list-style: none;
    text-indent: -2rem;
    padding-left: 2rem;
  }
  & > li:before {
    content: "- ";
  }
}
</style>
