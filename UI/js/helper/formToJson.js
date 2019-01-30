const toJSONString = formhtml => {
  const obj = {};
  const elements = formhtml.querySelectorAll("input, select, textarea");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const { name, value } = element;
    if (name) {
      obj[name] = value.trim();
    }
  }

  return JSON.stringify(obj);
};


