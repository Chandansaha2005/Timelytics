# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCourses*](#getcourses)
  - [*GetFacultyByDepartment*](#getfacultybydepartment)
- [**Mutations**](#mutations)
  - [*AddNewScheduleSlot*](#addnewscheduleslot)
  - [*UpdateCourseDescription*](#updatecoursedescription)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCourses
You can execute the `GetCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourses(): QueryPromise<GetCoursesData, undefined>;

interface GetCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCoursesData, undefined>;
}
export const getCoursesRef: GetCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourses(dc: DataConnect): QueryPromise<GetCoursesData, undefined>;

interface GetCoursesRef {
  ...
  (dc: DataConnect): QueryRef<GetCoursesData, undefined>;
}
export const getCoursesRef: GetCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCoursesRef:
```typescript
const name = getCoursesRef.operationName;
console.log(name);
```

### Variables
The `GetCourses` query has no variables.
### Return Type
Recall that executing the `GetCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCoursesData {
  courses: ({
    id: UUIDString;
    courseCode: string;
    title: string;
    description?: string | null;
    creditHours: number;
  } & Course_Key)[];
}
```
### Using `GetCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourses } from '@dataconnect/generated';


// Call the `getCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourses(dataConnect);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCourses().then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCoursesRef } from '@dataconnect/generated';


// Call the `getCoursesRef()` function to get a reference to the query.
const ref = getCoursesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCoursesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetFacultyByDepartment
You can execute the `GetFacultyByDepartment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFacultyByDepartment(vars: GetFacultyByDepartmentVariables): QueryPromise<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;

interface GetFacultyByDepartmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFacultyByDepartmentVariables): QueryRef<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;
}
export const getFacultyByDepartmentRef: GetFacultyByDepartmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFacultyByDepartment(dc: DataConnect, vars: GetFacultyByDepartmentVariables): QueryPromise<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;

interface GetFacultyByDepartmentRef {
  ...
  (dc: DataConnect, vars: GetFacultyByDepartmentVariables): QueryRef<GetFacultyByDepartmentData, GetFacultyByDepartmentVariables>;
}
export const getFacultyByDepartmentRef: GetFacultyByDepartmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFacultyByDepartmentRef:
```typescript
const name = getFacultyByDepartmentRef.operationName;
console.log(name);
```

### Variables
The `GetFacultyByDepartment` query requires an argument of type `GetFacultyByDepartmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFacultyByDepartmentVariables {
  department: string;
}
```
### Return Type
Recall that executing the `GetFacultyByDepartment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFacultyByDepartmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFacultyByDepartmentData {
  faculties: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    department?: string | null;
  } & Faculty_Key)[];
}
```
### Using `GetFacultyByDepartment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFacultyByDepartment, GetFacultyByDepartmentVariables } from '@dataconnect/generated';

// The `GetFacultyByDepartment` query requires an argument of type `GetFacultyByDepartmentVariables`:
const getFacultyByDepartmentVars: GetFacultyByDepartmentVariables = {
  department: ..., 
};

// Call the `getFacultyByDepartment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFacultyByDepartment(getFacultyByDepartmentVars);
// Variables can be defined inline as well.
const { data } = await getFacultyByDepartment({ department: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFacultyByDepartment(dataConnect, getFacultyByDepartmentVars);

console.log(data.faculties);

// Or, you can use the `Promise` API.
getFacultyByDepartment(getFacultyByDepartmentVars).then((response) => {
  const data = response.data;
  console.log(data.faculties);
});
```

### Using `GetFacultyByDepartment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFacultyByDepartmentRef, GetFacultyByDepartmentVariables } from '@dataconnect/generated';

// The `GetFacultyByDepartment` query requires an argument of type `GetFacultyByDepartmentVariables`:
const getFacultyByDepartmentVars: GetFacultyByDepartmentVariables = {
  department: ..., 
};

// Call the `getFacultyByDepartmentRef()` function to get a reference to the query.
const ref = getFacultyByDepartmentRef(getFacultyByDepartmentVars);
// Variables can be defined inline as well.
const ref = getFacultyByDepartmentRef({ department: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFacultyByDepartmentRef(dataConnect, getFacultyByDepartmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.faculties);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.faculties);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewScheduleSlot
You can execute the `AddNewScheduleSlot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewScheduleSlot(vars: AddNewScheduleSlotVariables): MutationPromise<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;

interface AddNewScheduleSlotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewScheduleSlotVariables): MutationRef<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;
}
export const addNewScheduleSlotRef: AddNewScheduleSlotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewScheduleSlot(dc: DataConnect, vars: AddNewScheduleSlotVariables): MutationPromise<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;

interface AddNewScheduleSlotRef {
  ...
  (dc: DataConnect, vars: AddNewScheduleSlotVariables): MutationRef<AddNewScheduleSlotData, AddNewScheduleSlotVariables>;
}
export const addNewScheduleSlotRef: AddNewScheduleSlotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewScheduleSlotRef:
```typescript
const name = addNewScheduleSlotRef.operationName;
console.log(name);
```

### Variables
The `AddNewScheduleSlot` mutation requires an argument of type `AddNewScheduleSlotVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewScheduleSlotVariables {
  courseId: UUIDString;
  dayOfWeek: string;
  endTime: TimestampString;
  startTime: TimestampString;
}
```
### Return Type
Recall that executing the `AddNewScheduleSlot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewScheduleSlotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewScheduleSlotData {
  scheduleSlot_insert: ScheduleSlot_Key;
}
```
### Using `AddNewScheduleSlot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewScheduleSlot, AddNewScheduleSlotVariables } from '@dataconnect/generated';

// The `AddNewScheduleSlot` mutation requires an argument of type `AddNewScheduleSlotVariables`:
const addNewScheduleSlotVars: AddNewScheduleSlotVariables = {
  courseId: ..., 
  dayOfWeek: ..., 
  endTime: ..., 
  startTime: ..., 
};

// Call the `addNewScheduleSlot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewScheduleSlot(addNewScheduleSlotVars);
// Variables can be defined inline as well.
const { data } = await addNewScheduleSlot({ courseId: ..., dayOfWeek: ..., endTime: ..., startTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewScheduleSlot(dataConnect, addNewScheduleSlotVars);

console.log(data.scheduleSlot_insert);

// Or, you can use the `Promise` API.
addNewScheduleSlot(addNewScheduleSlotVars).then((response) => {
  const data = response.data;
  console.log(data.scheduleSlot_insert);
});
```

### Using `AddNewScheduleSlot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewScheduleSlotRef, AddNewScheduleSlotVariables } from '@dataconnect/generated';

// The `AddNewScheduleSlot` mutation requires an argument of type `AddNewScheduleSlotVariables`:
const addNewScheduleSlotVars: AddNewScheduleSlotVariables = {
  courseId: ..., 
  dayOfWeek: ..., 
  endTime: ..., 
  startTime: ..., 
};

// Call the `addNewScheduleSlotRef()` function to get a reference to the mutation.
const ref = addNewScheduleSlotRef(addNewScheduleSlotVars);
// Variables can be defined inline as well.
const ref = addNewScheduleSlotRef({ courseId: ..., dayOfWeek: ..., endTime: ..., startTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewScheduleSlotRef(dataConnect, addNewScheduleSlotVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.scheduleSlot_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.scheduleSlot_insert);
});
```

## UpdateCourseDescription
You can execute the `UpdateCourseDescription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCourseDescription(vars: UpdateCourseDescriptionVariables): MutationPromise<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;

interface UpdateCourseDescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseDescriptionVariables): MutationRef<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;
}
export const updateCourseDescriptionRef: UpdateCourseDescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCourseDescription(dc: DataConnect, vars: UpdateCourseDescriptionVariables): MutationPromise<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;

interface UpdateCourseDescriptionRef {
  ...
  (dc: DataConnect, vars: UpdateCourseDescriptionVariables): MutationRef<UpdateCourseDescriptionData, UpdateCourseDescriptionVariables>;
}
export const updateCourseDescriptionRef: UpdateCourseDescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCourseDescriptionRef:
```typescript
const name = updateCourseDescriptionRef.operationName;
console.log(name);
```

### Variables
The `UpdateCourseDescription` mutation requires an argument of type `UpdateCourseDescriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCourseDescriptionVariables {
  id: UUIDString;
  description: string;
}
```
### Return Type
Recall that executing the `UpdateCourseDescription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCourseDescriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCourseDescriptionData {
  course_update?: Course_Key | null;
}
```
### Using `UpdateCourseDescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCourseDescription, UpdateCourseDescriptionVariables } from '@dataconnect/generated';

// The `UpdateCourseDescription` mutation requires an argument of type `UpdateCourseDescriptionVariables`:
const updateCourseDescriptionVars: UpdateCourseDescriptionVariables = {
  id: ..., 
  description: ..., 
};

// Call the `updateCourseDescription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCourseDescription(updateCourseDescriptionVars);
// Variables can be defined inline as well.
const { data } = await updateCourseDescription({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCourseDescription(dataConnect, updateCourseDescriptionVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
updateCourseDescription(updateCourseDescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `UpdateCourseDescription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCourseDescriptionRef, UpdateCourseDescriptionVariables } from '@dataconnect/generated';

// The `UpdateCourseDescription` mutation requires an argument of type `UpdateCourseDescriptionVariables`:
const updateCourseDescriptionVars: UpdateCourseDescriptionVariables = {
  id: ..., 
  description: ..., 
};

// Call the `updateCourseDescriptionRef()` function to get a reference to the mutation.
const ref = updateCourseDescriptionRef(updateCourseDescriptionVars);
// Variables can be defined inline as well.
const ref = updateCourseDescriptionRef({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCourseDescriptionRef(dataConnect, updateCourseDescriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

