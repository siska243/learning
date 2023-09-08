import { FetchData } from "../../services/FetchData";
import * as slug from "slug";

class RegisterController {
  static async adduser(data) {
    const date = new Date().getTime();
    data.slug = slug(`${data.firstName} ${date} ${data.lastName}`);
    const res = await FetchData.sendData("register", data);
    delete data.confirmPassword;
    return res;
  }
  static async roles(){
    const roles=await FetchData.getData('basic/roles')
    return roles
  }
  static async Login(data){
    const res=await FetchData.sendData('login',data)
    return res
  }
  activeUser() {}
  static async hashPassword(password) {
    try {
      const hash = await argon2.hash(password);
      console.log(hash)
      return hash
    } catch (err) {
      //...
    }
  }
}

export { RegisterController };
