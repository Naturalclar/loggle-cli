import readline from "node:readline";

export async function promptAuth(): Promise<{
  email: string;
  password: string;
}> {
  // prompt user for email in cli
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const email: string = await new Promise((resolve) => {
    rl.question("Please enter your email: ", (email) => {
      resolve(email);
    });
  });

  const password: string = await new Promise((resolve) => {
    rl.question("Please enter your password: ", (password) => {
      resolve(password);
    });
  });

  rl.close();

  return {
    email,
    password,
  };
}
