<template>
  <div>
    <div class="popup-container" style="z-index: 2;" @click="$parent.closeTemplatePreview()"></div>
    <div class="popup-flex-center" style="z-index: 2;" @click="$parent.closeTemplatePreview()">
      <div class="popup-content" @click="$parent.noClose($event)">
        <div class="flex mt-3 mb-3 pb-3" style="border-bottom: 1px solid #d3d3d3;">
          <h5 class="mb-0">Preview</h5>
          <div class="empty"></div>
          <div class="mr-3 pointer" @click="$parent.closeTemplatePreview()">X</div>
        </div>
        <div ref="tabs" class="pt-3 tab clearfix">
          <router-link v-bind:to="{ name: 'template-step5', params: {lang: 'EN'} }" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact>EN</router-link>
          <router-link v-bind:to="{ name: 'template-step5', params: {lang: 'KR'} }" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact>KR</router-link>
          <router-link v-bind:to="{ name: 'template-step5', params: {lang: 'JP'} }" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact>JP</router-link>
        </div>
        <div class="border-color text-left p-4">
          <div>
            <h5 class="mt-3 p-description-color">Target MID</h5>
            <p class="px-4">선택된 날짜 이후 로그인 하지 않은 사용자 MID 찾기 ☆</p>
            <pre class="px-4 p-description-color normalPre">LINE LAN 배너 이벤트, 포인트 지급, 이벤트 참여 유저 확인을 위한 유저 ID를 추출할 수 있습니다.
  Ex) 2017년 8월 5일 이후 휴면 유저를 대상으로 LAN 배너 이벤트를 시행하려고 할 때</pre>
            <div class="flex mt-3 px-4">
              <div class="empty"></div>
              <div>
                <input type="button" class="button button-outline mb-2" value="View Sample">
              </div>
            </div>
          </div>
        </div>
        <div class="background text-left mt-1 py-4 px-5">
          <p class="p-description-color">
            <icon class="exclamation-icon" name="exclamation-circle" scale="1"></icon>
            Probe를 시작하기 위한 기본 조건을 선택해 주세요.
          </p>
          <table>
            <tbody>
              <tr>
                <th class="title">
                  <div class="flex">
                    <div>
                      서비스
                      <icon class="question-icon" name="question-circle-o" scale="1"></icon>
                    </div>
                    <div class="empty"></div>
                  </div>
                </th>
                <td class="input_text">
                  <select class="mb-0" title="서비스">
                    <option>LINE Pokopoko</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th class="title">
                  <div class="flex">
                    <div>
                      마지막 로그인 날짜
                    </div>
                    <div class="empty"></div>
                  </div>
                </th>
                <td class="input_text"><input type="text" class="mb-0" title="마지막 로그인 날짜" placeholder="" value="2017-08-05"></td>
              </tr>
              <tr>
                <th class="title">
                  <div class="flex">
                    <div>
                      추출 기준
                      <icon class="question-icon" name="question-circle-o" scale="1"></icon>
                    </div>
                    <div class="empty"></div>
                  </div>
                </th>
                <td class="input_text">
                  <select class="mb-0" title="추출 기준">
                    <option>최근 로그인 순으로</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="hr">
          <table>
            <tbody>
              <tr>
                <th class="title">
                  <div class="flex">
                    <div>
                      국가 선택
                    </div>
                    <div class="empty"></div>
                  </div>
                </th>
                <td class="input_text">
                  <select class="mb-0" title="국가 선택">
                    <option>All</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th class="title">
                  <div class="flex">
                    <div>
                      OS 선택
                    </div>
                    <div class="empty"></div>
                  </div>
                </th>
                <td class="input_text">
                  <select class="mb-0" title="OS 선택">
                    <option>All</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="hr">
          <div>
            <div class="position-relative-z-index-1 pl-5">
              <icon class="minus-circle" name="minus-circle" scale="1"></icon>
              Hide Options
            </div>
          </div>
          <div class="flex">
            <div class="empty"></div>
            <div>
              <input type="button" class="button button-red mb-2" value="Query Check">
            </div>
          </div>
        </div>
        <div class="flex mt-4 px-5">
          <div class="empty"></div>
          <div>
            <input type="button" class="button button-outline mb-2" value="close" @click="$parent.closeTemplatePreview()">
          </div>
          <div class="empty"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/question-circle-o'
import 'vue-awesome/icons/minus-circle'

export default {
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

form {
  table {
    width: 100%;
    font-size: 1.4rem;
    padding-right: 20rem;
  }

  tr {
    width: 1%;
    white-space: nowrap;
  }

  th, td {
    font-weight: normal;
    border-bottom-width: 0;
    @extend .pt-2;
    @extend .pb-2;
    & > div {
      & > div {
        position: relative;
        & .question-icon {
          position: absolute;
          top: 2px;
          right: -2.2rem;
        }
      }
    }
    & input {
      background-color: $color-initial;
    }
    & select {
      background-color: $color-initial;
    }
  }

  th {
    width: 13rem;
  }
}

.hr {
  border-top: 1px solid $border-color-primary;
}

.minus-circle {
  position: absolute;
  top: 4px;
  left: 0;
}
</style>
