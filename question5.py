def max_salary_empolyee(empolyees):
    max = 0
    ans = {}
    for emp in empolyees:
        if emp['salary'] > max:
            max = emp['salary']
            ans = emp
    return ans


empolyees = [
    {"name": "max", "salary" : 5000, "designation" : "developer"},
    {"name": "emma", "salary" : 8000, "designation" : "HR"},
    {"name": "kelly", "salary" : 3000, "designation" : "tester"}
    ]

output = max_salary_empolyee(empolyees)
print(output)