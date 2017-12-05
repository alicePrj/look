<template>
  <div>
    <h2>Admin</h2>
    <router-link to="/template-manage" activeClass="selected">Template Manage</router-link>
    <router-link to="/category-manage" activeClass="selected">Category Manage</router-link>
    <hr class="hr">
    <router-link to="/user" activeClass="selected" exact>User Manager</router-link>
    <router-link to="/role" activeClass="selected" exact>Role Manager</router-link>
    <hr class="hr">
    <router-link to="/query" activeClass="selected">Query History</router-link>
    <router-link to="/wizard" activeClass="selected" exact>Wizard History</router-link>
    <router-link to="/temp" activeClass="selected">Temp Tables</router-link>
    <hr class="hr">
    <router-link to="/job" activeClass="selected">Job History</router-link>
    <router-link to="/monitoring" activeClass="selected">Monitoring</router-link>
  </div>
</template>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";

  h2 {
    text-align: left;
    margin-bottom: 1.0rem;
  }

  a {
    text-align: left;
    display: block;
    margin-bottom: 0;
    padding-left: 1.5rem;
    padding-top: .5rem;
    padding-bottom: .7rem;
  }

  a:hover {
    background: #f8f7f7;
    border-radius: .4rem;
  }

  .selected {
    font-weight: 900;
    border-left: 4px solid;
  }
  
  .hr {
    margin: 1.0rem 0;
  }
</style>
