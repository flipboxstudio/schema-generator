<template>
  <div id="app">
    <md-snackbar md-position="bottom center" ref="snackbar" md-duration="25000">
      <span v-text="message"/>
      <md-button class="md-accent" md-theme="default" @click="$refs.snackbar.close()">Got it</md-button>
    </md-snackbar>

    <md-toolbar>
      <h2 class="md-title" style="flex: 1">Schema Generator</h2>

      <a class="md-button md-icon-button" target="_blank" href="https://github.com/flipboxstudio/schema-generator">
        <md-icon>favorite</md-icon>
      </a>
    </md-toolbar>

    <md-layout md-gutter id="app-container">
      <md-layout md-flex="50">
        <div class="fluid">
          <md-card>
            <md-card-header>
              <div class="md-title">JSON</div>
              <div class="md-subhead">Put your JSON here</div>
            </md-card-header>

            <md-card-content>
              <codemirror v-model="json" :options="json_editor_options" class="fluid"/>

              <span class="help-block warn" v-if="error">Holly crap! You provide invalid JSON.</span>
              <span class="help-block success" v-else>Great! Your JSON is valid.</span>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-copy-button" :data-clipboard-text="json" @click="copyJSON">Copy JSON</md-button>
              <md-button class="md-raised md-primary" @click="generateSchema">Generate Schema</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </md-layout>

      <md-layout md-flex="50">
        <div class="fluid">
          <md-card>
            <md-card-header>
              <div class="md-title">Schema</div>
              <div class="md-subhead">Your schema will generated here</div>
            </md-card-header>

            <md-card-content>
              <codemirror v-model="schema" :options="scheme_editor_options" class="fluid" />

              <span class="help-block">Read more about JSON schema <a href="http://json-schema.org/">here</a>.</span>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised" @click="generateJSON">Generate JSON</md-button>
              <md-button class="md-raised md-primary md-copy-button" :data-clipboard-text="schema" @click="copySchema">Copy schema</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import jsf from 'json-schema-faker'
import jsonSchemaGenerator from 'json-schema-generator'

export default {
  name: 'app',

  data () {
    return {
      json_editor_options: {
        tabSize: 2,
        mode: 'application/json',
        lineNumbers: true,
        line: true,
        keyMap: 'sublime'
      },
      scheme_editor_options: {
        tabSize: 2,
        lineNumbers: true,
        mode: 'application/json',
        line: true,
        keyMap: 'sublime'
      },
      json: '',
      schema: '',
      message: ''
    }
  },

  computed: {
    error () {
      try {
        JSON.parse(this.json)

        return false
      } catch (e) {
        return true
      }
    }
  },

  created () {
    const json = [{
      address: {
        streetAddress: '21 2nd Street',
        city: 'New York'
      },
      phoneNumber: [
        {
          location: 'home',
          code: 44
        }
      ]
    }, {
      address: {
        streetAddress: '22 2nd Street',
        city: 'New York'
      },
      phoneNumber: [
        {
          location: 'office',
          code: 45
        }
      ]
    }]

    this.json = JSON.stringify(json, null, 2)
  },

  mounted () {
    this.generateSchema()

    /* eslint-disable no-new */
    new Clipboard('.md-copy-button')
  },

  methods: {
    generateSchema () {
      if (this.error) {
        return this.openSnackbar('Please fix your JSON first!')
      }

      this.schema = JSON.stringify(
        jsonSchemaGenerator(JSON.parse(this.json)),
        null,
        2
      )
    },

    generateJSON () {
      this.json = JSON.stringify(
        jsf(JSON.parse(this.schema)),
        null,
        2
      )
    },

    copySchema () {
      this.openSnackbar('Schema copied to clipboard.')
    },

    copyJSON () {
      this.openSnackbar('JSON copied to clipboard.')
    },

    openSnackbar (message) {
      this.message = message

      this.$refs.snackbar.open()
    }
  }
}
</script>

<style lang="scss">
@import '~vue-material/src/core/stylesheets/variables.scss';

html,
body {
  height: 100%;
}

body {
  display: flex;
}

#app {
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  transition: $swift-ease-out;

  #app-container {
    .padded {
      padding: 0 8px;
    }

    .help-block {
      font-style: italic;

      &.success {
        color: #4caf50;
      }
      &.warn {
        color: #ff5722;
      }
    }

    .fluid {
      width: 100%;
      height: 100%;

      .md-card {
        border: none;
        box-shadow: none;
      }
    }

    .CodeMirror {
      width: 100%;
      height: 482px;
    }
  }
}
</style>
