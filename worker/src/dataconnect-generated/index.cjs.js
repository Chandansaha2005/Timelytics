const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'timelytics',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewScheduleSlotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewScheduleSlot', inputVars);
}
addNewScheduleSlotRef.operationName = 'AddNewScheduleSlot';
exports.addNewScheduleSlotRef = addNewScheduleSlotRef;

exports.addNewScheduleSlot = function addNewScheduleSlot(dcOrVars, vars) {
  return executeMutation(addNewScheduleSlotRef(dcOrVars, vars));
};

const getCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourses');
}
getCoursesRef.operationName = 'GetCourses';
exports.getCoursesRef = getCoursesRef;

exports.getCourses = function getCourses(dc) {
  return executeQuery(getCoursesRef(dc));
};

const getFacultyByDepartmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFacultyByDepartment', inputVars);
}
getFacultyByDepartmentRef.operationName = 'GetFacultyByDepartment';
exports.getFacultyByDepartmentRef = getFacultyByDepartmentRef;

exports.getFacultyByDepartment = function getFacultyByDepartment(dcOrVars, vars) {
  return executeQuery(getFacultyByDepartmentRef(dcOrVars, vars));
};

const updateCourseDescriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCourseDescription', inputVars);
}
updateCourseDescriptionRef.operationName = 'UpdateCourseDescription';
exports.updateCourseDescriptionRef = updateCourseDescriptionRef;

exports.updateCourseDescription = function updateCourseDescription(dcOrVars, vars) {
  return executeMutation(updateCourseDescriptionRef(dcOrVars, vars));
};
