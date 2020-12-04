import { GraphQLService } from '@/services/graphql_service'
import { Download } from '@/models/download'
import store from '@/store'

export class DownloadsService extends GraphQLService {
  all () {
    const query = 'query { downloads { id url status queuedAt startedAt finishedAt cancelledAt error user { email } } }'
    return new Promise((resolve, reject) => {
      this.query(query).then(
        (success) => {
          const downloads = success.data.downloads.map(
            (download) =>
              Object.assign(
                new Download(),
                download
              )
          )
          resolve(downloads)
        },
        (error) => {
          store.dispatch('errorMessage', error)
          reject(new Error(error))
        }
      )
    })
  }

  save (download) {
    const mutation = download.createMutation
    return new Promise((resolve, reject) => {
      this.mutate(mutation).then(
        (success) => {
          resolve(true)
        },
        (error) => {
          store.dispatch('errorMessage', error)
          reject(new Error(error))
        }
      )
    })
  }

  queue (download) {
    const mutation = download.queueMutation
    return new Promise((resolve, reject) => {
      this.mutate(mutation).then(
        (success) => {
          resolve(true)
        },
        (error) => {
          store.dispatch('errorMessage', error)
          reject(new Error(error))
        }
      )
    })
  }

  cancel (download) {
    const mutation = download.cancelMutation
    return new Promise((resolve, reject) => {
      this.mutate(mutation).then(
        (success) => {
          resolve(true)
        },
        (error) => {
          store.dispatch('errorMessage', error)
          reject(new Error(error))
        }
      )
    })
  }

  remove (download) {
    const mutation = download.removeMutation
    return new Promise((resolve, reject) => {
      this.mutate(mutation).then(
        (success) => {
          resolve(true)
        },
        (error) => {
          store.dispatch('errorMessage', error)
          reject(new Error(error))
        }
      )
    })
  }

  clear () {
    const mutation = 'mutation { clearDownloads }'
    return new Promise((resolve, reject) => {
      this.mutate(mutation).then(
        (success) => {
          resolve(true)
        },
        (error) => {
          store.dispatch('errorMessage', error)
          reject(new Error(error))
        }
      )
    })
  }
}
