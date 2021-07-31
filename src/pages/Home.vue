<template>
  <v-container>
    <h1>Workspace</h1>
    <hr class="mb-3">
    <v-row dense>
      <v-col :key="m._id" v-for="m in modules" xs="6" sm="4" md="3">
        <Module :module="m" :students="students"></Module>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Module from './Module.vue';

export default {
  name: 'Home',
  data: () => ({
    modules: [],
    students: []
  }),
  components: {
    Module
  },
  mounted() {
    fetch("/api/modules").then(res => res.json()).then(json => {
      this.modules = json;
    });
    fetch("/api/student").then(res => res.json()).then(json => {
      this.students = json;
    });
  }
}
</script>