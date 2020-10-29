export const fetchData = async (content) => {
  try {
    const endpoint = `http://json.ffwagency.md/${content}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
