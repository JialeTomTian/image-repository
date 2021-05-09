import axios from "axios";

export const uploadPicture = async (obj, accessToken) => {
  try {
    let result = axios.post('/api/private/uploadResult', obj, {
      headers:{
        'Authorization' : `Bearer ${accessToken}`
      }
    })
    return result;
  } catch {
    return null;
  }
}

export const getPicture = ()=>{
  try{
    return axios.get('/api/public/getPictures').then((response)=>{
      return response;
    })
  } catch {
    return null;
  }
}

export const searchPicture = async (obj, accessToken)=>{
  try{
    console.log("got here");
    let result = await axios.post('/api/private/searchPictures', obj, {
      headers:{
        'Authorization' : `Bearer ${accessToken}`
      } }
    )
    return result;
  } catch {
    return null;
  }
} 

