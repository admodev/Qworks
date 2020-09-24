import faker from "faker";

const users = [];
const count = 200;

const images = {
  profile: {
    picture: require("../assets/icon.png"),
  },
};

let range = (n) => Array.from(Array(n).keys());

for (i in range(count)) {
  users.push({
    id: faker.random.uuid(),
    user: {
      photo: images.profile.picture,
      name: faker.name.firstName(),
    },
    profession: faker.name.jobTitle(),
  });
}

export default users;
