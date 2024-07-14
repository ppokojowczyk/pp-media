const axios = require("axios");

export function dataSource(url) {

  const handleReject = (err) => Promise.reject(
    err.response.data.message !== undefined
      ? err.response.data.message
      : err
  );

  const handleResolve = (res) => Promise.resolve(res);

  const urlForId = (id) => url + "/" + encodeURIComponent(id);

  return {
    load: function () {
      return new Promise((resolve, reject) => {
        axios
          .get(url + '?' + new URLSearchParams(this._filters).toString())
          .then((res) => {
            resolve({
              data: res.data.data,
              totalCount: res.data.totalCount,
            });
          });
      });
    },
    byKey: (id) => axios.get(urlForId(id)),
    insert: (values) => axios
      .post(url, values)
      .then(handleResolve, handleReject),
    update: (id, values) => axios
      .put(urlForId(id), values)
      .then(handleResolve, handleReject),
    remove: (id) => axios
      .delete(urlForId(id))
      .then(handleResolve, handleReject),
  };
};
