<template>
  <div>
    <form novalidate>
      <flex-col>
        <div id="url">
          <md-field>
            <label>URL</label>
            <md-input v-model="url" type="url" :change="checkUrl()"></md-input>
            <md-icon md-src="/assets/images/youtube.svg" v-if="isYoutube" />
            <md-icon md-src="/assets/images/utorrent.svg" v-if="isTorrent" />
            <md-icon v-if="isLink">link</md-icon>
          </md-field>
        </div>

        <div id="settings">
          <div id="youtube-settings" v-if="showYoutube">
            <flex-row id="youtube-audio-settings">
              <div class="input-block">
                <md-checkbox v-model="audioOnly">
                  Audio Only
                </md-checkbox>
              </div>
              <div v-if="audioOnly" class="input-block">
                <md-field>
                  <label>Audio Formats</label>
                  <md-select v-model="audioFormat" @md-selected="audioFormatSelected()">
                    <md-option v-for="audioFormat in audioFormats" :key="audioFormat" :value="audioFormat">{{audioFormat}}</md-option>
                  </md-select>
                </md-field>
              </div>
            </flex-row>
            <flex-row id="youtube-subtitle-settings">
              <div class="input-block">
                <md-checkbox v-model="downloadSubs">
                  Download Subtitles
                </md-checkbox>
              </div>
              <div v-if="downloadSubs" class="input-block">
                <md-checkbox v-model="srtSubs">
                  Convert Subtitle to SRT format
                </md-checkbox>
              </div>
            </flex-row>
          </div>
          <div id="non-youtube-settings">
            <flex-row id="file-filters">
              <div class="input-block">
                <md-field>
                  <label>File Filter Presets</label>
                  <md-select v-model="fileFilterPreset" @md-selected="fileFilterPresetSelected()">
                    <md-option v-for="fileFilterPreset in fileFilterPresets" :key="fileFilterPreset.value" :value="fileFilterPreset.value">{{fileFilterPreset.label}}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="input-block">
                <md-field>
                  <label>File Filter</label>
                  <md-input v-model="fileFilter"></md-input>
                </md-field>
              </div>
            </flex-row>
            <flex-row id="http-auth">
              <div class="input-block">
                <md-field>
                  <label>HTTP Username</label>
                  <md-input v-model="httpUsername"></md-input>
                </md-field>
              </div>
              <div class="input-block">
                <md-field>
                  <label>HTTP Password</label>
                  <md-input v-model="httpPassword"></md-input>
                </md-field>
              </div>
            </flex-row>
          </div>
        </div>

        <flex-row id="buttons" align-h="end">
          <md-button to="/downloads">Cancel</md-button>
          <md-button class="md-primary" :disabled="disableSave" @click="save()">Save</md-button>
        </flex-row>
      </flex-col>
    </form>
  </div>
</template>

<script>
import { Download } from '@/models/download'

export default {
  name: 'AddNewDownload',
  data: () => ({
    url: '',
    fileFilter: null,
    fileFilterPresets: [
      { value: '*720*', label: '720' },
      { value: '*1080*', label: '1080' },
      { value: '*S01*', label: 'Season 1' },
      { value: '*S02*', label: 'Season 2' },
      { value: '*S03*', label: 'Season 3' },
      { value: '*S04*', label: 'Season 4' },
      { value: '*S05*', label: 'Season 5' },
      { value: '*S06*', label: 'Season 6' },
      { value: '*S07*', label: 'Season 7' },
      { value: '*S08*', label: 'Season 8' },
      { value: '*S09*', label: 'Season 9' },
      { value: '*S10*', label: 'Season 10' }
    ],
    httpUsername: null,
    httpPassword: null,
    fileFilterPreset: null,
    audioOnly: false,
    audioFormat: null,
    audioFormats: ['best', 'aac', 'flac', 'mp3', 'm4a', 'opus', 'vorbis', 'wav'],
    downloadSubs: false,
    srtSubs: false,
    showYoutube: false,
    disableSave: true,
    urlREgExp: new RegExp('http://|https://|ftp://|magnet:')
  }),
  methods: {
    checkUrl: function () {
      this.showYoutube = this.url.match(/youtu/) != null
      this.disableSave = this.url.match(this.urlREgExp) == null
    },
    fileFilterPresetSelected: function () {
      const found = this.fileFilterPresets.find((item) => {
        return item.value.localeCompare(this.fileFilterPreset) === 0
      })
      this.fileFilter = found.value
    },
    audioFormatSelected: function () {
      const found = this.audioFormats.find((item) => {
        return item.localeCompare(this.audioFormat) === 0
      })
      this.audioFormat = found
    },
    save: function () {
      const download = Object.assign(
        new Download(),
        {
          url: this.url,
          httpUsername: this.httpUsername,
          httpPassword: this.httpPassword,
          audioOnly: this.audioOnly,
          audioFormat: this.audioFormat,
          downloadSubs: this.downloadSubs,
          srtSubs: this.srtSubs,
          fileFilter: this.fileFilter
        }
      )
      this.$store.state.downloadsService.save(download).then(
        (data) => {
          this.$store.dispatch('successMessage', 'download added')
          this.$store.dispatch('loadDownloads')
          this.$router.push({ name: 'downloads' })
        }
      )
    }
  },
  computed: {
    isYoutube: function () {
      return this.url.match(/youtu/) != null
    },
    isTorrent: function () {
      return this.url.match(/^magnet/) != null
    },
    isLink: function () {
      return this.url !== '' && !this.isYoutube && !this.isTorrent
    }
  }
}
</script>

<style scoped lang="scss">
form { padding: 16px; }
.input-block {
  width: 300px;
  padding-right: 16px;
}
</style>
