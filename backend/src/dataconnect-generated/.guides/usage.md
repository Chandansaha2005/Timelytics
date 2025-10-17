# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addNewScheduleSlot, getCourses, getFacultyByDepartment, updateCourseDescription } from '@dataconnect/generated';


// Operation AddNewScheduleSlot:  For variables, look at type AddNewScheduleSlotVars in ../index.d.ts
const { data } = await AddNewScheduleSlot(dataConnect, addNewScheduleSlotVars);

// Operation GetCourses: 
const { data } = await GetCourses(dataConnect);

// Operation GetFacultyByDepartment:  For variables, look at type GetFacultyByDepartmentVars in ../index.d.ts
const { data } = await GetFacultyByDepartment(dataConnect, getFacultyByDepartmentVars);

// Operation UpdateCourseDescription:  For variables, look at type UpdateCourseDescriptionVars in ../index.d.ts
const { data } = await UpdateCourseDescription(dataConnect, updateCourseDescriptionVars);


```