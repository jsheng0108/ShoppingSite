const emailReg =
  /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;

export const personalProjectApi = {
  users: {
    "user1@gmail.com": {
      email: "user1@gmail.com",
      password: "user1",
      userType: "buyer",
    },
    "user2@gmail.com": {
      email: "user2@gmail.com",
      password: "user2",
      userType: "seller",
    },
  },
  signIn({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !this.users[email] || !emailReg.test(email)) {
          reject({
            message: "User is not existed !",
            status: false,
          });
        } else if (this.users[email].password !== password) {
          reject({ message: "Password is not correct !", status: false });
        } else {
          const userType = this.users[email].userType;
          resolve({
            json() {
              return Promise.resolve({
                message: "Login succeed",
                status: true,
                userType: userType,
              });
            },
          });
        }
      }, 1000);
    });
  },
  signUp({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !emailReg.test(email)) {
          reject({
            message: "Email is not valid !",
            status: false,
          });
        } else if (!password) {
          reject({
            message: "Password is not valid !",
            status: false,
          });
        } else if (this.users[email]) {
          reject({
            message: "User is existed !",
            status: false,
          });
        } else {
          this.users[email] = {
            email,
            password,
          };
          resolve({
            json() {
              return Promise.resolve({
                message: "Sign up succeed",
                status: true,
              });
            },
          });
        }
      }, 1000);
    });
  },
};
