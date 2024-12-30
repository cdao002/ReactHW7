export default class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.employeeAdd;
    const employee = {
      name: form.name.value,
      extension: form.extension.value,
      email: form.email.value,
      title: form.title.value
    };
    this.props.createEmployee(employee);
    form.name.value = '';
    form.extension.value = '';
    form.email.value = '';
    form.title.value = '';
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "employeeAdd",
      onSubmit: this.handleSubmit
    }, "Name: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name"
    }), /*#__PURE__*/React.createElement("br", null), "Extension: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "extension",
      maxLength: 4
    }), /*#__PURE__*/React.createElement("br", null), "Email: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "email"
    }), /*#__PURE__*/React.createElement("br", null), "Title: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", null, "Add"));
  }
}