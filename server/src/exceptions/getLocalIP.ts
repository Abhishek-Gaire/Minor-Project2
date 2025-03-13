import { networkInterfaces } from "os";

// Get local IP address
const getLocalIP = () => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    const net = nets[name];
    if (net) {
      for (const netInterface of net) {
        if (netInterface.family === "IPv4" && !netInterface.internal) {
          return netInterface.address;
        }
      }
    }
  }
  return "0.0.0.0";
};

export default getLocalIP;
