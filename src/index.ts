import e from "express";

const app = e();

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : "3000";

app.listen(PORT, () => {
  console.log(`the server is running on port: ${PORT}`);
});
