export async function fetchHeaderText() {
    try {
        const response = await fetch('https://adaptive.rocket-wp.com/wp-json/custom/v1/page-acf-data?slug=test');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch headerText from API route: ", error);
        return { error: 'Failed to fetch data'};
    }
}


export const AllData = async (slug) => {
  try {
    const response = await fetch(`https://adaptive.rocket-wp.com/wp-json/custom/v1/page-acf-data?slug=${slug}`);
    
    // Log the response status and headers
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Attempt to parse the response as JSON
    const result = await response.json();

    // Validate the structure of the result (example validation)
    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response structure');
    }

    return { data: result, error: null }; // Return data and null error
  } catch (error) {
    console.error('Error fetching content data:', error);
    return { data: null, error: error.message }; // Return null data and error message
  }
};

export const blog_faq_data = async(slug)=>{
  try {
    const response = await fetch(`https://adaptive.rocket-wp.com/wp-json/wp/v2/${slug}`);
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Attempt to parse the response as JSON
      const result = await response.json();
    
    return result;
  } catch (error) {
    console.error('Error fetching content data:', error);
    return null;
  }
  

}
  

export const FooterData = async()=>{
  try{
    const response = await fetch('https://adaptive.rocket-wp.com/wp-json/custom-api/v1/all-theme-options');
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Attempt to parse the response as JSON
    const result = await response.json();
    return result;
  }catch(error){
    console.error('Error fetching content data:', error);
    return null;
  }
}