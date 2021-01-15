import axios from "axios";

const getAge = () =>
{
  return axios.get("http://localhost:3001/api/test/age");
}
const setAge = (data) =>
{
  return axios.post("http://localhost:3001/api/test/age", data);
}
const testApi = { getAge, setAge };
export default testApi;