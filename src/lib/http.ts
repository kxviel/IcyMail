import ky from "ky";

const baseUrl = "https://abcd";

const http = ky.create({
  baseUrl,
});

export default http;
