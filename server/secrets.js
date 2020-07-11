const secrets = {
  dbUri:
    "mongodb+srv://Nils:uGYEPEtbIU9TbbuP@cluster0-rggnq.mongodb.net/test?retryWrites=true&w=majority",
  user: "Nils",
  pswd: "uGYEPEtbIU9TbbuP",
};

export const getSecret = (key) => secrets[key];
