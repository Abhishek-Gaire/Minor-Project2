import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
const corsConfig = cors(corsOptions);

export default corsConfig;
