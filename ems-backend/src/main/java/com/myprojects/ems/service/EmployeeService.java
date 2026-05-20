package com.myprojects.ems.service;

import com.myprojects.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long empId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long empId,EmployeeDto updateEmployee);

    void deleteEmployee(Long empId);


}
