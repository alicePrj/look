<template>
  <div class="mb-5">
    <h6 class="mb-0">선택 옵션 표시 이름*</h6>
    <p class="px-5 mb-4 p-description-color">※ Select Box에 실제로 표시될 이름을 결정합니다.</p>
    <div class="px-5">
      <table>
        <tbody>
          <tr>
            <th>Option 항목</th>
            <th>User Display EN* (50byte)</th>
            <th>User Display KR (50byte)</th>
            <th>User Display JP (50byte)</th>
          </tr>
          <tr v-if="paramaterType === 'yn'">
            <th class="title"><label class="normalLabel" for="equalEN">Y, N</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="equalEN" placeholder="All" maxlength="50" v-model="templateParameter.paramAttr['Y,N'].EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="equalKR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr['Y,N'].KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="equalJP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr['Y,N'].JP"></td>
          </tr>
          <tr v-if="paramaterType === 'yn'">
            <th class="title"><label class="normalLabel" for="notEqualEN">Y</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="notEqualEN" placeholder="Y" maxlength="50" v-model="templateParameter.paramAttr.Y.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="notEqualKR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.Y.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="notEqualJP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.Y.JP"></td>
          </tr>
          <tr v-if="paramaterType === 'yn'">
            <th class="title"><label class="normalLabel" for="notEqualEN">N</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="notEqualEN" placeholder="N" maxlength="50" v-model="templateParameter.paramAttr.N.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="notEqualKR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.N.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="notEqualJP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.N.JP"></td>
          </tr>
          <tr v-if="paramaterType === 'order'">
            <th class="title"><label class="normalLabel" for="ascEN">Asc</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="ascEN" placeholder="Asc" maxlength="50" v-model="templateParameter.paramAttr.Asc.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="ascKR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.Asc.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="ascJP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.Asc.JP"></td>
          </tr>
          <tr v-if="paramaterType === 'order'">
            <th class="title"><label class="normalLabel" for="descEN">Desc</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="descEN" placeholder="Desc" maxlength="50" v-model="templateParameter.paramAttr.Desc.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="descKR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.Desc.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="descJP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.Desc.JP"></td>
          </tr>
          <tr v-if="paramaterType === 'comment'">
            <th class="title"><label class="normalLabel" for="commentOffEN">주석 처리 Off</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="commentOffEN" placeholder="Use" maxlength="50" v-model="templateParameter.paramAttr.commentOff.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="commentOffKR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.commentOff.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="commentOffJP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.commentOff.JP"></td>
          </tr>
          <tr v-if="paramaterType === 'comment'">
            <th class="title"><label class="normalLabel" for="commentOnEN">주석 처리 On</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="commentOnEN" placeholder="Not Use" maxlength="50" v-model="templateParameter.paramAttr.commentOn.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="commentOnKR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.commentOn.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="commentOnJP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.commentOn.JP"></td>
          </tr>
          <tr v-if="paramaterType === 'optionComment'">
            <th class="title"><label class="normalLabel" for="optionCommentA_EN">Opt(A) 주석처리 Off</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="optionCommentA_EN" placeholder="Use" maxlength="50" v-model="templateParameter.paramAttr.optionCommentA.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="optionCommentA_KR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.optionCommentA.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="optionCommentA_JP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.optionCommentA.JP"></td>
          </tr>
          <tr v-if="paramaterType === 'optionComment'">
            <th class="title"><label class="normalLabel" for="optionCommentB_EN">Opt(B) 주석처리 Off</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="optionCommentB_EN" placeholder="Not Use" maxlength="50" v-model="templateParameter.paramAttr.optionCommentB.EN"></td>
            <td class="input_text"><input type="text" class="mb-0" title="optionCommentB_KR" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.optionCommentB.KR"></td>
            <td class="input_text"><input type="text" class="mb-0" title="optionCommentB_JP" placeholder="" maxlength="50" v-model="templateParameter.paramAttr.optionCommentB.JP"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramaterType: {
      type: String
    },
    templateParameter: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

table {
  width: 100%;
  font-size: 1.4rem;
  border-collapse: collapse;
  tr {
    width: 1%;
    white-space: nowrap;
    &:first-child th {
      background-color: #c3d69b;
    }
  }

  th, td {
    font-weight: normal;
    border: 2px solid $color-secondary;
    @extend .p-2;
    @extend .text-center;
  }

  th {
    @extend .background;
  }
}
</style>
