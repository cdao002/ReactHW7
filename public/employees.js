// import { response } from "express"
import EmployeeAdd from "./EmployeeAdd.js";
class EmployeeFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the employee filter.");
  }
}
function EmployeeTable(props) {
  const EmployeeRows = props.employees.map(employee => /*#__PURE__*/React.createElement(EmployeeRow, {
    key: employee._id,
    employee: employee,
    deleteEmployee: props.deleteEmployee
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Extension"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Date Hired"), /*#__PURE__*/React.createElement("th", null, "Currently Employed?"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, EmployeeRows));
}
function EmployeeRow(props) {
  function onDeleteClick() {
    props.deleteEmployee(props.employee._id);
  }
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.employee.name), /*#__PURE__*/React.createElement("td", null, props.employee.extension), /*#__PURE__*/React.createElement("td", null, props.employee.email), /*#__PURE__*/React.createElement("td", null, props.employee.title), /*#__PURE__*/React.createElement("td", null, props.employee.dateHired.toDateString()), /*#__PURE__*/React.createElement("td", null, props.employee.currentlyEmployed ? 'Yes' : 'No'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    onClick: onDeleteClick
  }, "DELETE")));
}
class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    fetch('/api/employees').then(response => response.json()).then(data => {
      console.log('Total count of employees:', data.count);
      data.employees.forEach(employee => {
        employee.dateHired = new Date(employee.dateHired);
      });
      this.setState({
        employees: data.employees
      });
    }).catch(err => {
      console.log(err);
    });
  }
  createEmployee(employee) {
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    }).then(response => response.json()).then(newEmployee => {
      newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired);
      const newEmployees = this.state.employees.concat(newEmployee.employee);
      this.setState({
        employees: newEmployees
      });
      console.log('Total count of employees: ', newEmployees.length);
    }).catch(err => {
      console.log(err);
    });
  }
  deleteEmployee(id) {
    fetch(`/api/employees/${id}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) {
        console.log('Failed to delete employee.');
      } else {
        this.loadData();
      }
    });
  }
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Employee Management Application"), /*#__PURE__*/React.createElement(EmployeeFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees,
      deleteEmployee: this.deleteEmployee
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeAdd, {
      createEmployee: this.createEmployee
    }));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(EmployeeList, null), document.getElementById('content'));