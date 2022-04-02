<template>
  <span>
    <input type="text" v-model="inputVal" />
    <input type="button" v-on:click="inputVal = ''"  title="clear" value="clear" />
  </span>
</template>

<script>

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
      if (history.pushState) {
        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?filter=' + val;
        window.history.pushState({path:newurl},'',newurl);
      }
    }
  }
};
</script>
