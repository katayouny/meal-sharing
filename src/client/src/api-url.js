//an environment variable
const api_host="http://localhost:5000"; 

function api_url(route){
    return api_host+route;
}

export default api_url;
