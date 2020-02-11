const employeeCardFactory = (employee) => {
    return `
    <article class="employee">
        <header class="employee__name">
            <h1>${employee.fname} ${employee.lname}</h1>
        </header>
        <section class="employee__department">
            Works in the ${employee.department.name}
        </section>
        <section class="employee__computer">
            Currently using ${employee.computer.name}, a ${employee.computer.year} ${employee.computer.system} 
        </section>
    </article>
    `
} 

const api = {
    baseUrl: 'http://localhost:8088',
    getEmployees () {
        const expand = '_expand=department&_expand=computer'
        return fetch(`${this.baseUrl}/employees?${expand}`)
            .then(response => response.json());
    }
}

const renderer = {
    employees (employees) {
        console.log(employees)
        const employeesContainer = document.querySelector("#employee__container");
        employeesContainer.innerHTML = "<h1>Employees<h1>"
        employees.forEach(employee => {
            let employeeHtml = employeeCardFactory(employee);
            employeesContainer.innerHTML += employeeHtml;
        })
    }
}

api.getEmployees()
    .then(renderer.employees)