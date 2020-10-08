import bcrypt from "bcryptjs";

const users = [
  {
    name: "Adiat Hasan",
    email: "adiathasan.me@gmail.com",
    password: bcrypt.hashSync("Ar271997", 10),
    isAdmin: true,
  },
  {
    name: "Reshma Akhter",
    email: "reshma@gmail.com",
    password: bcrypt.hashSync("Ar271997", 10),
  },
  {
    name: "Zarin Anjum",
    email: "zarin@gmail.com",
    password: bcrypt.hashSync("Ar271997", 10),
  },
];

export default users;
