import axios from "axios";

export const getUrfById = async (urf_id: number) => {
    const url = `/api/urfs/${urf_id}`;
  
    try {
      const response = await axios.get(url);
      return response.data.data; // Extract the 'data' part from the response
    } catch (error) {
      console.error(`Error fetching URF data for ID ${urf_id}:`, error);
      return null; // Return null if there's an error
    }
  };