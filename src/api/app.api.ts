class AppApi {
  async fetchAllData() {
    return await fetch(`https://5fc9346b2af77700165ae514.mockapi.io/simpsons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .catch(() => {
        return false;
      });
  }
}

export default new AppApi();
