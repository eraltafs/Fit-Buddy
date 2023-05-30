const getprofile = async () => {
  let res = await fetch(`https://server-fitbuddy.onrender.com/user/pro`, {
    headers: {
      authentication: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
export default getprofile