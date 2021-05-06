import axios from "axios";

export let uploadPicture = (obj) => {
  try {
    axios.post('/api/private/uploadResult', obj).then((response)=>{
      console.log(response);
    })
  } catch {
    return null;
  }
}


