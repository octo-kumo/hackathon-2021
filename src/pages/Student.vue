<template>
  <v-container>
    <v-row dense>
      <v-col :key="s._id" v-for="s in students" xs="6" sm="4" md="3">
        <v-card-text>
          <p class="text-h4 text--primary">
            {{ s.name }}
          </p>
          <p>{{ s.class }}</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Student',
  data: () => ({
    students: []
  }),
  components: {},
  mounted() {
    fetch("/api/student").then(res => res.json()).then(json => {
      this.students = json;
    });
  }
}
</script>