import { useEffect, useState } from 'react';

const API_URL = 'https://swapi.co/api';

const validResources = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

// const [data, loading] = useSwapi(resource, { id, page, search });

function useSwapi(resource, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    id = null,
    page = 1,
    search = null,
  } = options;

  useEffect(() => {
    async function loadData(resource, id, page, search) {
      setLoading(true);

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

      setData(data);
      setLoading(false);
    }

    loadData(resource, id, page, search);
  }, [resource, id, page, search]);

  if (!validResources.includes(resource)) {
    throw new Error(`Invalid resource provided: ${resource}`)
  }

  return { data, loading };
}

export default useSwapi;
