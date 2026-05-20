package com.myprojects.ems.service.impl;

import com.myprojects.ems.dto.EmployeeDto;
import com.myprojects.ems.entity.Employee;
import com.myprojects.ems.exception.ResourceNotFoundException;
import com.myprojects.ems.mapper.EmployeeMapper;
import com.myprojects.ems.repository.EmployeeRepository;
import com.myprojects.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository empRepo;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = empRepo.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long empId) {
        Employee employee = empRepo.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exit with given ID : " + empId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = empRepo.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long empId, EmployeeDto updateEmployee) {
        Employee employee = empRepo.findById(empId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exit with given ID : " + empId)
        );

        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());

        Employee updatedEmployee = empRepo.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long empId) {
        Employee employee = empRepo.findById(empId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exit with given ID : " + empId)
        );
        empRepo.deleteById(empId);
    }
}
