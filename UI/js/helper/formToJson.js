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

const checkForm = (
  form // Submit button clicked
) => {
  //
  // check form input values
  //

  form.myButton.disabled = true;
  form.myButton.value = "Please wait...";
  return true;
};

function resetForm(form) {
  // Reset button clicked
  form.myButton.disabled = false;
  form.myButton.value = "Submit";
}
