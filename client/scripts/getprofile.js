const getprofile = async () => {
  let res = await fetch(`https://server-fitbuddy.onrender.com/user/pro`, {
    headers: {
      authentication: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  
  return await res.json();
};

const getAllData = async (yyyy,mm,dd) => {
  let res = await fetch(`https://server-fitbuddy.onrender.com/user/getall?date=${yyyy}-${mm}-${dd}`, {
    headers: {
      authentication: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  
  return await res.json();
};


export {getprofile,getAllData}