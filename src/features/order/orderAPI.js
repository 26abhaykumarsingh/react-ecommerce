// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO : on server it will only return relevant info of user (not password)
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO : on server it will only return relevant info of user (not password)
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/orders?" + queryString
      );
      const data = await response.json();

      if (!response.ok) {
        // Handle server error
        throw new Error(`Server error: ${response.statusText}`);
      }

      const totalOrders = await response.headers.get("X-Total-Count");
      resolve({ data: { orders: data, totalOrders: +totalOrders } });
    } catch (error) {
      console.error("Error fetching orders:", error);
      reject(error);
    }
  });
}
