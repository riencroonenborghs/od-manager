import store from '@/store'
import gql from 'graphql-tag'

export class GraphQLService {
  query (query) {
    const client = store.state.odApolloClient
    return client.query({
      query: gql`${query}`,
      context: {
        headers: {
          Authorization: store.state.authService.token
        }
      },
      fetchPolicy: 'no-cache'
    })
  }

  mutate (mutation) {
    const client = store.state.odApolloClient
    return client.mutate({
      mutation: gql`${mutation}`,
      context: {
        headers: {
          Authorization: store.state.authService.token
        }
      },
      fetchPolicy: 'no-cache'
    })
  }
}
