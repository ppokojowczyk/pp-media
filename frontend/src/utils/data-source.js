import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
const axios = require("axios");

export function dataSource(opts) {
  function handleReject(err) {
    if (err.response.data.message !== undefined) {
      return Promise.reject(err.response.data.message);
    } else {
      return Promise.reject(err);
    }
  }

  function handleResolve(res) {
    return Promise.resolve(res);
  }

  let ds = new DataSource(
    new CustomStore({
      key: opts.key,
      load: function (loadOptions) {
        return new Promise((resolve, reject) => {
          axios
            .get(opts.url, {
              params: loadOptions,
            })
            .then((res) => {
              resolve({ data: res.data.data, totalCount: res.data.totalCount });
            });
        });
      },
      byKey: function (key) {
        return axios.get(opts.url + "/" + encodeURIComponent(key));
      },
      insert: function (values) {
        return axios.post(opts.url, values).then(handleResolve, handleReject);
      },
      update: function (key, values) {
        return axios
          .put(opts.url + "/" + encodeURIComponent(key), values)
          .then(handleResolve, handleReject);
      },
      remove: function (key) {
        return axios
          .delete(opts.url + "/" + encodeURIComponent(key))
          .then(handleResolve, handleReject);
      },
    })
  );

  return ds;
}
