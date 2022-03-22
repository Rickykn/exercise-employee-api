const express = require("express");
const { nanoid } = require("nanoid");
const app = express();
app.use(express.json());

const PORT = 2000;

const employees = [
  {
    id: 1,
    full_name: "seto",
    occupation: "Software Engineer",
    gender: "male",
  },
  {
    id: 2,
    full_name: "bill",
    occupation: "FrontEnd Developer",
    gender: "male",
  },
];

app.get("/employees", (req, res) => {
  res.status(200).json({
    message: "fetch success",
    result: employees,
  });
});

app.get("/employees/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;

  const findEmployee = employees.find((val) => {
    return val.id == employeeId;
  });

  if (!findEmployee) {
    res.status(404).json({
      message: "employee not found",
    });
    return;
  }

  res.status(200).json({
    message: "fetch success",
    result: findEmployee,
  });
});

app.post("/employees", (req, res) => {
  const data = {
    ...req.body,
    id: nanoid(),
  };
  if (!data.full_name || !data.occupation || !data.gender) {
    res.status(400).json({
      message: "employee data is Required",
    });
    return;
  }
  employees.push(data);
  res.status(201).json({
    message: "added employees",
    result: data,
  });
});

app.delete("/employees/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;

  const findIdx = employees.findIndex((val) => {
    return val.id == employeeId;
  });

  if (findIdx == -1) {
    res.status(404).json({
      message: "employee not found",
    });
    return;
  }

  employees.splice(findIdx, 1);

  res.status(200).json({
    message: "employee deleted",
  });
});

app.patch("/employees/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;

  const findIdx = employees.findIndex((val) => {
    return val.id == employeeId;
  });

  if (findIdx == -1) {
    res.status(404).json({
      message: "employee not found",
    });
    return;
  }

  employees[findIdx] = {
    ...employees[findIdx],
    ...req.body,
  };

  res.status(202).json({
    message: "Update data success",
    result: employees[findIdx],
  });
});

app.listen(PORT, () => {
  console.log("server running in port", PORT);
});
