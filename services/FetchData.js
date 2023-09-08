import axios, { AxiosError } from "axios";
class FetchData {
  BASE_URL = () => "/api/";
  instance = (token = null,contentType) => {
    return axios.create({
      baseURL: this.BASE_URL(),
      headers: {
        authorization: "Bearer " + token,
        Accept: "*/*",
        "Content-Type": contentType,
      },
    });
  };
  static async sendData(url, data, $token) {
    try {
      let $req = new FetchData().instance($token, "application/json");
      const response = await $req
        .post(url, JSON.stringify(data))
        .then((e) => {
          return e;
        })
        .catch((e) => {
          return e;
        });
      if (response instanceof AxiosError) {
        return response;
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  static async formData(url, data, $token) {
    try {
      let $req = new FetchData().instance($token);
      const response = await $req
        .post(url, data)
        .then((e) => {
          return e;
        })
        .catch((e) => {
          return e;
        });
      if (response instanceof AxiosError) {
        return response;
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  static async getData(url, $token = null) {
    try {
      let $req = new FetchData().instance($token,"application/json");
      const response = await $req
        .get(url)
        .then((e) => e)
        .catch((e) => e);
      if (response instanceof AxiosError) {
        return response.response.data;
      }
      return response.data;
    } catch (error) {}
  }
  static async deleteData(url, data, $token) {
    try {
      let $req = new FetchData().instance($token,"application/json");
      const response = await $req
        .delete(url, { data })
        .then((e) => e)
        .catch((e) => e);
      if (response instanceof AxiosError) {
        return response;
      }
      return response.data;
    } catch (error) {}
  }
  static async putData(url, data, $token) {
    try {
      let $req = new FetchData().instance($token, "application/json");
      const response = await $req
        .put(url, { data })
        .then((e) => e)
        .catch((e) => e);
      if (response instanceof AxiosError) {
        return response;
      }
      return response.data;
    } catch (error) {}
  }
}

export { FetchData };