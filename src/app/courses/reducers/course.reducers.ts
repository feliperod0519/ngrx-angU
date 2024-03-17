import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

// export interface CourseState{
//     //course: Course[] //not the most optimized version
//     entities: {[key:number]:Course}
//     ids: number[]  //some kind of natural order (see Course seqno.)
// }

//but there's a better way

export interface CourseState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded,(state,action)=>{
        //using the state object would be too cumbersome
        return adapter.addMany(action.courses,{...state,allCoursesLoaded:true}) //addAll(action.courses,state) //shallow copy of state
    }),
    on(CourseActions.courseUpdated,(state,action)=>adapter.updateOne(action.update,state))
)

export const {selectAll} = adapter.getSelectors()