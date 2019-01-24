const checkAdminRoute = path => {
  const match = path.slice(8, 13);
  if (match === "admin") {
    return true;
  }
  return false;
};

export default checkAdminRoute;
