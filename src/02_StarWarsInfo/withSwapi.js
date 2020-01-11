import React from 'react';

const API_URL = 'https://swapi.co/api';

const validResources = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

function withSwapi(WrappedComponent, resource) {
  if (!validResources.includes(resource)) {
    throw new Error(`Invalid resource provided: ${resource}`)
  }

  class WithSwapi extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        loading: true,
      };
    }

    async loadData(id, page, search) {
      this.setState({ loading: true });

      let url;
      if (id) {
        url = `${API_URL}/${resource}/${id}/`;
      } else {
        const urlParams = new URLSearchParams();
        if (page) {
          urlParams.append('page', page);
        }

        if (search) {
          urlParams.append('search', search);
        }

        url = `${API_URL}/${resource}/?${urlParams}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      this.setState({ data, loading: false });
    }

    async componentDidMount() {
      const {
        id = null,
        page = 1,
        search = null,
      } = this.props;

      return this.loadData(id, page, search);
    }

    async componentDidUpdate(prevProps) {
      const {
        id = prevProps.id,
        page = prevProps.page,
        search = prevProps.search
      } = this.props;

      if (id !== prevProps.id || page !== prevProps.page || search !== prevProps.search) {
        return this.loadData(id, page, search);
      }
    }

    render() {
      const { data, loading } = this.state;
      return <WrappedComponent data={data} loading={loading} {...this.props} />
    }
  };

  const { displayName, name } = WrappedComponent;
  WithSwapi.displayName = `WithSwapi(${displayName || name || 'Component'})`;

  return WithSwapi;
}

export default withSwapi;
