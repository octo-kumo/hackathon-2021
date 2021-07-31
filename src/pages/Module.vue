<template>
  <v-card
      class="mx-auto"
      max-width="344"
      :loading="loading"
      outlined
  >
    <v-card-subtitle class="text-overline pb-0">
      {{ module.code }}
    </v-card-subtitle>
    <v-card-title class="text-h5 pt-1">
      {{ module.title }}
    </v-card-title>
    <v-card-subtitle>{{ module.teacher }}</v-card-subtitle>
    <v-card-text v-if="!editing">
      {{ module.description }}
    </v-card-text>
    <v-textarea
        auto-grow
        class="mx-4"
        v-if="editing"
        v-model="description"
    ></v-textarea>
    <v-card-text class="py-1">
      <v-chip :color="module.MC>3?'cyan':''" :text-color="module.MC>3?'white':''" small>
        MC {{ module.MC }}
      </v-chip>
    </v-card-text>
    <v-chip-group class="py-0 px-4">
      <v-chip :key="uid" label v-for="uid in (editing?new_students:module.enrolledStudents)" small
              :close="editing"
              @click:close="new_students.splice(new_students.findIndex(e=>e._id===uid),1)">
        <a :href="editing?'#':`/users/${uid}`">
          {{ students.find(u => u._id === uid) ? students.find(u => u._id === uid).name : uid }}
        </a>
      </v-chip>
    </v-chip-group>
    <v-text-field label="UID" v-if="editing" v-model="user" class="mx-4"></v-text-field>
    <v-btn v-if="editing" @click="add" small class="mx-4">Enroll</v-btn>
    <v-card-actions>
      <v-btn
          text
          @click="editing ? edit() : editing = true"
      >
        Edit
      </v-btn>
      <v-btn
          text
          v-if="editing"
          @click="editing = false"
      >
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'module',
  data: () => ({
    user: '',
    loading: false,
    editing: false,
    description: '',
    new_students: [],
  }),
  props: ['module', 'students'],
  methods: {
    edit() {
      this.loading = true;
      fetch('/api/modules/' + this.module._id, {
        method: 'PUT', body: JSON.stringify({
          description: this.description,
          enrolledStudents: this.new_students
        })
      }).then(res => {
        this.loading = false;
        if (res.ok) {
          this.module.description = this.description;
          this.module.enrolledStudents = [...this.new_students];
          this.editing = false;
        } else alert("Failed");
      });
    },
    add() {
      this.new_students.push(this.user);
      this.user = '';
    }
  },
  watch: {
    editing() {
      if (this.editing) {
        this.description = this.module.description;
        this.new_students = [...this.module.enrolledStudents];
      }
    }
  }
}
</script>
<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
