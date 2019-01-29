const isValidElement = element => element.name && element.value;

const formToJSON = elements =>
  [].reduce.call(
    elements,
    (data, element) => {
      data[element.name] = element.value;
      return data;
    },
    {}
  );

export default formToJSON;
