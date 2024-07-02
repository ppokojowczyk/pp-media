const axios = require("axios");

export function dataSource({
  key,
  url,
}) {

  const handleReject = (err) => Promise.reject(
    err.response.data.message !== undefined
      ? err.response.data.message
      : err
  );

  const handleResolve = (res) => Promise.resolve(res);

  return {
    key,
    load: (loadOptions) => new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: loadOptions,
        })
        .then((res) => {
          resolve({
            data: res.data.data,
            totalCount: res.data.totalCount,
          });
        });
    }),
    byKey: (key) => axios.get(url + "/" + encodeURIComponent(key)),
    insert: (values) => axios
      .post(url, values)
      .then(handleResolve, handleReject),
    update: (key, values) => axios
      .put(url + "/" + encodeURIComponent(key), values)
      .then(handleResolve, handleReject),
    remove: (key) => axios
      .delete(url + "/" + encodeURIComponent(key))
      .then(handleResolve, handleReject),
  };
};
