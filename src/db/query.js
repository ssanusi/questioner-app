import pool from "./connection";

const text = "INSERT INTO meetups(location,images,topic,happeningOn,tags) VALUES($1,$2,$3,$4,$5)";
const values = [
  "ilupeju Lagos",
  ["http://localhost.com", "http://localhost.com"],
  "introduction to Database",
  "2019-01-22T18:25:44.913Z",
  ["programming", "web", "front-end"]
];

pool
  .query(text, values)
  .then(res => console.log(res))
  .catch(e => console.error(e));
