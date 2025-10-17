import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'timelytics',
  location: 'us-east4'
};

export const addNewScheduleSlotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewScheduleSlot', inputVars);
}
addNewScheduleSlotRef.operationName = 'AddNewScheduleSlot';

export function addNewScheduleSlot(dcOrVars, vars) {
  return executeMutation(addNewScheduleSlotRef(dcOrVars, vars));
}

export const getCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourses');
}
getCoursesRef.operationName = 'GetCourses';

export function getCourses(dc) {
  return executeQuery(getCoursesRef(dc));
}

export const getFacultyByDepartmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFacultyByDepartment', inputVars);
}
getFacultyByDepartmentRef.operationName = 'GetFacultyByDepartment';

export function getFacultyByDepartment(dcOrVars, vars) {
  return executeQuery(getFacultyByDepartmentRef(dcOrVars, vars));
}

export const updateCourseDescriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCourseDescription', inputVars);
}
updateCourseDescriptionRef.operationName = 'UpdateCourseDescription';

export function updateCourseDescription(dcOrVars, vars) {
  return executeMutation(updateCourseDescriptionRef(dcOrVars, vars));
}

