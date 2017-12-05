<template>
  <div>
    <div class="popup-container" style="z-index: 2;" @click="$parent.closeTemplatePrevious()"></div>
    <div class="popup-flex-center" style="z-index: 2;" @click="$parent.closeTemplatePrevious()">
      <div class="popup-content" @click="$parent.noClose($event)">
        <div class="flex mt-3 mb-3 pb-3" style="border-bottom: 1px solid #d3d3d3;">
          <h5 class="mb-0">Previous deployed Version</h5>
          <div class="empty"></div>
          <div class="mr-3 pointer" @click="$parent.closeTemplatePrevious()">X</div>
        </div>
        <div class="pt-3 px-5">
          <table>
            <tbody>
              <tr>
                <th>Template 이름</th>
                <td>{{templateOrg.templateDetails[0].templateNm}}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{{category.firstCategoryId === 0 ? 'Analysis' : 'Operation'}} > {{category.categoryNmEn}}</td>
              </tr>
              <tr>
                <th>Permission</th>
                <td>{{templateOrg.authLevel}}</td>
              </tr>
              <tr>
                <th>Query</th>
                <td>
                  <pre class="normalPre">{{templateOrg.queryString}}</pre>
                </td>
              </tr>
              <tr>
                <th>Parameter</th>
                <td>{{templateOrg.templateParameterNameStr}}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>
                  <pre class="normalPre">{{templateOrg.templateDetails[0].templateContent}}</pre>
                </td>
              </tr>
              <tr>
                <th>Display</th>
                <td>{{templateOrg.displayYn === 'Y' ? 'Y' : 'N'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex mt-4 px-5">
          <div class="empty"></div>
          <div>
            <input type="button" class="button button-outline mb-2" value="close" @click="$parent.closeTemplatePrevious()">
          </div>
          <div class="empty"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    templateOrg: {
      type: Object
    },
    category: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

form {
  table {
    width: 100%;
    font-size: 1.4rem;
    border-collapse: collapse;
  }

  tr {
    width: 1%;
    white-space: nowrap;
  }

  th, td {
    font-weight: normal;
    border: 2px solid $color-secondary;
    @extend .pt-2;
    @extend .pb-2;
  }

  th {
    @extend .background;
    @extend .pl-4
  }
  td {
    width: 80%;
  }
}
</style>
