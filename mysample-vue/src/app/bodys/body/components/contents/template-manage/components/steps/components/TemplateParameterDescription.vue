<template>
  <span>
    <a class="pointer position-relative-z-index-1" v-popover:popOver>Parameter 확인</a>
    <popover name="popOver">
      <div class="text-left">
        <input class="mb-0" type="text" value="Parameter 확인" readonly="readonly" style="width: 100%;" title="Parameter 확인">
        <span @click="close()"><icon class="close-icon" name="close" scale="1"></icon></span>
        <div class="flex selectbox">
          <div class="left-panel">
            <ul class="p-1 mb-0">
              <li @mouseover="chDescription('database')">@database</li>
              <li @mouseover="chDescription('table')">@table</li>
              <li @mouseover="chDescription('column')">@column</li>
              <li @mouseover="chDescription('code')">@code</li>
              <li @mouseover="chDescription('gamecode')">@gamecode</li>
              <li @mouseover="chDescription('int')">@int</li>
              <li @mouseover="chDescription('string')">@string</li>
              <li @mouseover="chDescription('date')">@date</li>
              <li @mouseover="chDescription('start_int')">@start_int</li>
              <li @mouseover="chDescription('end_int')">@end_int</li>
              <li @mouseover="chDescription('start_date')">@start_date</li>
              <li @mouseover="chDescription('end_date')">@end_date</li>
              <li @mouseover="chDescription('start_time')">@start_time</li>
              <li @mouseover="chDescription('end_time')">@end_time</li>
              <li @mouseover="chDescription('yn')">@yn</li>
              <li @mouseover="chDescription('><')">@><</li>
              <li @mouseover="chDescription('usertype')">@usertype</li>
              <li @mouseover="chDescription('order')">@order</li>
              <li @mouseover="chDescription('country')">@country</li>
              <li @mouseover="chDescription('os')">@os</li>
              <li @mouseover="chDescription('login_type')">@login_type</li>
              <li @mouseover="chDescription('updated_table')">@updated_table</li>
              <li @mouseover="chDescription('custom')">@custom</li>
            </ul>
          </div>
          <div class="right-panel p-3">
            <div v-if="currentDescription === 'database'">
유저가 데이터베이스를 선택해야 할 경우 사용합니다.<br><br>
OAP에서 사용되는 대부분의 DB는 Game App ID가 기반이고, 동일 로그들은 동일한 테이블(View)명을 가지고 있습니다.<br><br>
다만, internal_line이라는 공통 DB도 존재하며, 해당 DB 내에는 별도의 공통 table이 존재하게 되니, 해당 Parameter 사용 시에는 internal_line을 포함시킬지 여부를 고려해야 합니다.
            </div>
            <div v-if="currentDescription === 'table'">
유저가 테이블을 선택해야 할 경우 사용합니다.<br><br>
유저에게 노출되는 테이블명은, Growthy Map에 등록되어 있는 메타 정보에서 불러오게 됩니다.
            </div>
            <div v-if="currentDescription === 'column'">
유저가 테이블 내의 특정 컬럼을 선택해야 할 경우 사용합니다.<br><br>
유저에게 노출되는 컬럼명은 Growthy Map에 등록되어 있는 메타 정보에서 불러오게 되며, 1개 컬럼 혹은 여러개의 컬럼을 선택하게 할 수 있습니다.
            </div>
            <div v-if="currentDescription === 'code'">
유저가 특정 테이블과 특정 컬럼 내에서 사용하는 코드를 선택해야 할 경우 사용합니다.<br><br>
유저에게 노출되는 코드명은 Growthy Map에 등록되어 있는 메타 정보에서 불러오게 되며, 1개 컬럼 혹은 여러개의 컬럼을 선택하게 할 수 있습니다.
            </div>
            <div v-if="currentDescription === 'gamecode'">
gamecode는 일반적으로 App ID를 의미합니다.<br><br>
Internal_line내의 member info 테이블 등 공통 테이블에서 특정 게임을 선택해야 할 때 사용합니다.
            </div>
            <div v-if="currentDescription === 'int'">
숫자 타입으로 데이터를 입력받아야 할 때 사용합니다.<br><br>
입력 가능한 숫자의 범위를 설정할 수 있습니다.
            </div>
            <div v-if="currentDescription === 'string'">
문자 형태로 데이터를 입력받아야 할 때 사용합니다.<br><br>
입력 가능한 문자의 byte수를 설정할 수 있으며, ','를 사용하여 복수 데이터를 입력받을 수 있습니다.
            </div>
            <div v-if="currentDescription === 'date'">
yyyyMMdd 형태의 특정 날짜값이 필요할 때 사용합니다.
            </div>
            <div v-if="currentDescription === 'start_int'">
범위 형태의 숫자값이 되어야 할 때 사용합니다.<br><br>
범위의 최소값을 의미하며, 최대값을 의미하는 @end_int와 함께 사용되어야 합니다.
            </div>
            <div v-if="currentDescription === 'end_int'">
범위 형태의 숫자값이 되어야 할 때 사용합니다.<br><br>
범위의 최대값을 의미하며, 최소값을 의미하는 @start_int와 함께 사용되어야 합니다.
            </div>
            <div v-if="currentDescription === 'start_date'">
기간 형태의 날짜값이 yyyyMMdd로 입력되어야 할 때 사용합니다.<br><br>
기간 시작을 의미하며, 기간 종료를 의미하는 @end_date와 함께 사용되어야 합니다.
            </div>
            <div v-if="currentDescription === 'end_date'">
기간 형태의 날짜값이 yyyyMMdd로 입력되어야 할 때 사용합니다.<br><br>
기간 종료를 의미하며, 기간 시작을 의미하는 @start_date와 함께 사용되어야 합니다.
            </div>
            <div v-if="currentDescription === 'start_time'">
기간 형태의 날짜값이 yyyyMMdd hh:mm:ss로 입력되어야 할 때 사용합니다.<br><br>
기간 시작을 의미하며, 기간 종료를 의미하는 @end_time과 함께 사용되어야 합니다.
            </div>
            <div v-if="currentDescription === 'end_time'">
기간 형태의 날짜값이 yyyyMMdd hh:mm:ss로 입력되어야 할 때 사용합니다.<br><br>
기간 종료를 의미하며, 기간 시작을 의미하는 @start_time과 함께 사용되어야 합니다.
            </div>
            <div v-if="currentDescription === 'yn'">
특정 값에 대한 같다(=) 혹은 같지 않다(<>)를 선택하게 할 때 사용합니다.
            </div>
            <div v-if="currentDescription === '><'">
특정 값에 대한 크고 작음 혹은 이상 이하를 선택하게 할 때 사용합니다.
            </div>
            <div v-if="currentDescription === 'usertype'">
NRU/CBU/STU/Leave User/Continuous User 등 Growthy에서 자주 사용하는 유저 타입 형태를 유저가 선택하게 할 때 사용합니다.<br><br>
Query문 작성 시에 해당 유저 타입을 정의하는 Query를 포함시켜 주셔야 합니다.
            </div>
            <div v-if="currentDescription === 'order'">
오름차순, 내림차순 등으로 결과 정렬 방식을 유저가 선택하게 할 때 사용합니다.
            </div>
            <div v-if="currentDescription === 'country'">
특정 국가의 정보만 선택하게 할 때 사용합니다.<br><br>
More Options로 숨겨, 유저가 선택적으로 사용하게 할 수도 있습니다.
            </div>
            <div v-if="currentDescription === 'os'">
특정 OS의 정보만 선택하게 할 때 사용합니다.<br><br>
More Options로 숨겨, 유저가 선택적으로 사용하게 할 수도 있습니다.
            </div>
            <div v-if="currentDescription === 'login_type'">
LINE / Guest 등 로그인 타입을 선택하게 할 때 사용합니다.<br><br>
Member Info 테이블 내에서만 사용 가능하며, More Options로 숨겨, 유저가 선택적으로 사용하게 할 수도 있습니다.
            </div>
            <div v-if="currentDescription === 'updated_table'">
유저가 특정 파일을 업로드하여, 생성한 temp table을 결합할 때 사용합니다.<br><br>
mid 리스트만 업로드 가능하며, 유저의 temp DB내에 이미 생성한 테이블을 재사용할 수도 있습니다.
            </div>
            <div v-if="currentDescription === 'custom'">
Parameter 리스트에서 정의되지 않은 Query 구문을 유저가 선택하게 할 때 사용합니다.
            </div>
          </div>
        </div>
      </div>
    </popover>
  </span>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/close'

export default {
  data () {
    return {
      currentDescription: 'database'
    }
  },
  methods: {
    chDescription (value) {
      this.currentDescription = value
    },
    close () {
      document.getElementById('templateStep2').click()
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.flex.selectbox {
  & .left-panel {
    & ul {
      list-style: none;
      width: 20rem;
      height: 30rem;
      overflow-x: hidden;
      overflow-y: scroll;
      & li {
        @extend .p-2;
        @extend .mb-0;
        @extend .pointer;
        &:hover {
          background-color: $border-color-primary;
        }
      }
    }
  }
  & .right-panel {
    width: 20rem;
    height: 30rem;
    overflow-x: hidden;
    overflow-y: scroll;
    // white-space: pre;
  }
}

div[data-popover="popOver"] {
  border: 1px solid $border-color-primary !important;
  width: auto !important;
  @extend .p-0;
}

div[data-popover="popOver"]:before {
  display: none;
}
</style>
