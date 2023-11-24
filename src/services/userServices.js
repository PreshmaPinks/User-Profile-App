export const getUser = (totalResults) => {
  const url = `https://randomuser.me/api?results=${totalResults}`;
  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })

    .catch((error) => {
      return Promise.reject(
        `Uh oh! There was a problem fetching the data: ${error}`
      );
    });
};
