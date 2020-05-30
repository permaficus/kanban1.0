<template>
<div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
            HACKTIV8 - KANBAN
            </a>

      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
              <div class="buttons">
                <button class="button is-small is-primary has-background-grey-dark"
                @click="isComponentModalActive = true">
                NEW TASK
                </button>
                <button class="button is-small is-primary has-background-danger"
                @click.prevent="doLogout">
                LOGOUT
                </button>
              </div>
              
          </div>
        </div>
      </div>
    </nav>
    <b-modal :active.sync="isComponentModalActive" has-modal-card  :can-cancel="true">
        <NC @refresh-data="doRefresh"></NC>
    </b-modal>
</div>
</template>

<script>

import NC from './newCard'

export default {
  
  components: { NC },
  data () {
    return {
      isComponentModalActive: false,
    }
  },

  methods: {
    doLogout() {
      localStorage.clear();
      this.$emit('log-in', false)
      this.$router.go()
    },

    doRefresh() {
      this.$emit('refresh-data')
    }
  }
}
</script>