<template>
  <span>
    <input type="text" v-model="inputVal" />
    <input type="button" v-on:click="inputVal = ''"  title="clear" value="clear" />
  </span>
</template>

<script>
/**
 * (possible exports: NavigationFailureType, RouterLink, RouterView, START_LOCATION, createMemoryHistory, createRouter, createRouterMatcher, createWebHashHistory, createWebHistory, isNavigationFailure, matchedRouteKey, onBeforeRouteLeave, onBeforeRouteUpdate, parseQuery, routeLocationKey, routerKey, routerViewLocationKey, stringifyQuery, useLink, useRoute, useRouter, viewDepthKey)
 */


export default {
  name: "EmployeesListComponent",

data() {
    return {
        inputVal: '',
    };
},
  mounted() {
    const params = new URLSearchParams(location.search)
    this.inputVal = params.get("filter")
  },
    watch: {
    inputVal(val) {
      this.inputted = `Inputted: ${val}`;
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?filter=' + val;
      window.history.pushState({path:newurl},'',newurl);
    }
  }
};
</script>
