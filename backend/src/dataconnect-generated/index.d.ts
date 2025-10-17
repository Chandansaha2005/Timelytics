import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewScheduleSlotData {
  scheduleSlot_insert: ScheduleSlot_Key;
}

export interface AddNewScheduleSlotVariables {
  courseId: UUIDString;
  dayOfWeek: string;
  endTime: TimestampString;
  startTime: TimestampString;
}

export interface Classroom_Key {
  id: UUIDString;
  __typename?: 'Classroom_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface Faculty_Key {
  id: UUIDString;
  __typename?: 'Faculty_Key';
}

export interface GetCoursesData {
  courses: ({
    id: UUIDString;
    courseCode: string;
    title: string;
    description?: string | null;
    creditHours: number;
  } & Course_Key)[];
}

export interface GetFacultyByDepartmentData {
  faculties: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    department?: string | null;
  } & Faculty_Key)[];
}

export interface GetFacultyByDepartmentVariables {
  department: string;
}

export interface ScheduleSlot_Key {
  id: UUIDString;
  __typename?: 'ScheduleSlot_Key';
}

export interface UpdateCourseDescriptionData {
  course_update?: Course_Key | null;
}

export interface UpdateCourseDescriptionVariables {
  id: UUIDString;
  description: string;
}

interface AddNewScheduleSlotRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewScheduleSlotVariables): MutationRef<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewScheduleSlotVariables): MutationRef<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;
  operationName: string;
}
export const addNewScheduleSlotRef: AddNewScheduleSlotRef;

export function addNewScheduleSlot(vars: AddNewScheduleSlotVariables): MutationPromise<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;
export function addNewScheduleSlot(dc: DataConnect, vars: AddNewScheduleSlotVariables): MutationPromise<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;

interface GetCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCoursesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCoursesData, undefined>;
  operationName: string;
}
export const getCoursesRef: GetCoursesRef;

export function getCourses(): QueryPromise<GetCoursesData, undefined>;
export function getCourses(dc: DataConnect): QueryPromise<GetCoursesData, undefined>;

interface GetFacultyByDepartmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFacultyByDepartmentVariables): QueryRef<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFacultyByDepartmentVariables): QueryRef<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;
  operationName: string;
}
export const getFacultyByDepartmentRef: GetFacultyByDepartmentRef;

export function getFacultyByDepartment(vars: GetFacultyByDepartmentVariables): QueryPromise<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;
export function getFacultyByDepartment(dc: DataConnect, vars: GetFacultyByDepartmentVariables): QueryPromise<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;

interface UpdateCourseDescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseDescriptionVariables): MutationRef<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCourseDescriptionVariables): MutationRef<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;
  operationName: string;
}
export const updateCourseDescriptionRef: UpdateCourseDescriptionRef;

export function updateCourseDescription(vars: UpdateCourseDescriptionVariables): MutationPromise<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;
export function updateCourseDescription(dc: DataConnect, vars: UpdateCourseDescriptionVariables): MutationPromise<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;

