import Axios from "axios";

export default function Data() {
  Axios.get("http://localhost:5000/disaster/isactive")
    .then((res) => {
      return res.data;
    })
    .catch((res) => {
      return "Error Retrieving Data";
    });
}
