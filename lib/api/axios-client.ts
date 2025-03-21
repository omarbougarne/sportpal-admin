import axios from "axios"

// Create an axios instance with default config
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include auth token if available
axiosClient.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors here
    console.error("API Error:", error)
    return Promise.reject(error)
  }
)

export default axiosClient