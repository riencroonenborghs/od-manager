export class Download {
  get id () { return this._id }
  set id (id) { this._id = id }

  get jobId () { return this._jobId }
  set jobId (jobId) { this._jobId = jobId }

  get user () { return this._user }
  set user (user) { this._user = user }

  get url () { return this._url }
  set url (url) { this._url = url }

  get createdAt () { return this._createdAt }
  set createdAt (createdAt) { this._createdAt = this._parseDate(createdAt) }

  get updatedAt () { return this._updatedAt }
  set updatedAt (updatedAt) { this._updatedAt = this._parseDate(updatedAt) }

  get queuedAt () { return this._queuedAt }
  set queuedAt (queuedAt) { this._queuedAt = this._parseDate(queuedAt) }

  get startedAt () { return this._startedAt }
  set startedAt (startedAt) { this._startedAt = this._parseDate(startedAt) }

  get finishedAt () { return this._finishedAt }
  set finishedAt (finishedAt) { this._finishedAt = this._parseDate(finishedAt) }

  get cancelledAt () { return this._cancelledAt }
  set cancelledAt (cancelledAt) { this._cancelledAt = this._parseDate(cancelledAt) }

  get error () { return this._error }
  set error (error) { this._error = error }

  get httpUsername () { return this._httpUsername }
  set httpUsername (httpUsername) { this._httpUsername = httpUsername }

  get httpPassword () { return this._httpPassword }
  set httpPassword (httpPassword) { this._httpPassword = httpPassword }

  get audioOnly () { return this._audioOnly }
  set audioOnly (audioOnly) { this._audioOnly = audioOnly }

  get audioFormat () { return this._audioFormat }
  set audioFormat (audioFormat) { this._audioFormat = audioFormat }

  get downloadSubs () { return this._downloadSubs }
  set downloadSubs (downloadSubs) { this._downloadSubs = downloadSubs }

  get srtSubs () { return this._srtSubs }
  set srtSubs (srtSubs) { this._srtSubs = srtSubs }

  get fileFilter () { return this._fileFilter }
  set fileFilter (fileFilter) { this._fileFilter = fileFilter }

  get status () { return this._status }
  set status (status) { this._status = status }

  get weight () { return this._weight }
  set weight (weight) { this._weight = weight }

  _parseDate (str) {
    if (str == null) return null
    return new Date(str)
  }

  postProcess () {
    if (this._url.match(/released\.tv/) !== null) {
      this._httpUsername = 'released'
      this._httpPassword = 'released'
    }
  }

  get queueMutation () {
    return `mutation { queueDownload ( id: ${this.id} ) }`
  }

  get cancelMutation () {
    return `mutation { cancelDownload ( id: ${this.id} ) }`
  }

  get removeMutation () {
    return `mutation { removeDownload ( id: ${this.id} ) }`
  }

  get createMutation () {
    const fields = [`url: "${this.url}"`]
    if (this.httpUsername) fields.push(`httpUsername: "${this.httpUsername}"`)
    if (this.httpPassword) fields.push(`httpPassword: "${this.httpPassword}"`)
    if (this.fileFilter) fields.push(`fileFilter: "${this.fileFilter}"`)
    if (this.audioOnly) fields.push(`audioOnly: ${this.audioOnly}`)
    if (this.audioFormat) fields.push(`audioFormat: "${this.audioFormat}"`)
    if (this.downloadSubs) fields.push(`downloadSubs: ${this.downloadSubs}`)
    if (this.srtSubs) fields.push(`srtSubs: ${this.srtSubs}`)
    return `mutation { createDownload ( ${fields.join(', ')} ) { id } }`
  }
}
