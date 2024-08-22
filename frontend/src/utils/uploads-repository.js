import { getApiUrl } from './api';

const axios = require('axios');

export function uploadRepository() {

  const handleReject = (err) => Promise.reject(
    err.response.data.message !== undefined
      ? err.response.data.message
      : err
  );

  const handleResolve = (res) => Promise.resolve(res);

  return {
    upload: (mediaType, mediaId, files, remove = []) => {
      const body = new FormData();
      let index = 1;

      if (!files.length && !remove.length) {
        return Promise.resolve();
      }

      if (files.length) {
        for (const file of files) {
          if (file?.file !== undefined) {
            body.append(`image-${index}`, file.file, file.file.name);
            index++;
          }
        }
      }

      if (remove.length) {
        body.append('remove', remove);
      }

      return fetch(getApiUrl(`/upload/${mediaType}/${mediaId}`), {
        method: 'POST',
        body,
      });
      // return axios
      //   .get(url + '?' + new URLSearchParams(this._filters).toString())
      //   .then((res) => {
      //     resolve({
      //       data: res.data.data,
      //       totalCount: res.data.totalCount,
      //     });
      //   });
    },
    // delete: (id) => axios
    //   .delete(urlForId(id))
    //   .then(handleResolve, handleReject),
  };
};
