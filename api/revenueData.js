import client from '../utils/client';

const endpoint = client.databaseURL;

const getAllRevenue = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleRevenue = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const postRevenue = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const patchRevenue = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteRevenue = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getRevenueDetails = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const dataArr = Object.values(data);
        const totalRevenue = dataArr.map((item) => Number(item.total)).reduce((a, b) => a + b, 0);
        const totalTips = dataArr.map((item) => Number(item.tip)).reduce((a, b) => a + b, 0);
        const combinedRevenue = totalRevenue + totalTips;
        const revObj = {
          combinedRevenue,
          totalRevenue: totalRevenue.toString(),
          totalTips: totalTips.toString(),
          walkInOrders: dataArr.filter((item) => item.orderType === 'In Person').length,
          callInOrders: dataArr.filter((item) => item.orderType === 'Phone').length,
          cashOrders: dataArr.filter((item) => item.paymentType === 'Cash').length,
          checkOrders: dataArr.filter((item) => item.paymentType === 'Check').length,
          creditOrders: dataArr.filter((item) => item.paymentType === 'Credit').length,
          debitOrders: dataArr.filter((item) => item.paymentType === 'Debit').length,
          mobileOrders: dataArr.filter((item) => item.paymentType === 'Mobile').length
        };
        resolve(revObj);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getAllRevenue, getSingleRevenue, patchRevenue, postRevenue, deleteRevenue, getRevenueDetails
};
