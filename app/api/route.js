/* import NextCors from "nextjs-cors";

export async function GET(req, res) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  let url = "https://bard.google.com";

  await NextCors(req, res, {
    // Options
    methods: "GET",
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    headers: {
      cookie: this.cookie,
    },
  });

  fetch(url)
  // Rest of the API logic
  res.json({ message: "Hello NextJs Cors!" });
}
 */