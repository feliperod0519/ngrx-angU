import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selector";

@Injectable()
export class CoursesResolver implements Resolve<any>{

    loading: boolean = false

    constructor(private store: Store<AppState>){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
        return this.store.pipe(
            select(areCoursesLoaded),
            tap((areCoursesLoaded:boolean)=>{
                if (!this.loading && !areCoursesLoaded){
                    this.loading = true
                    this.store.dispatch(loadAllCourses())
                }
            }),
            filter(areCoursesLoaded => areCoursesLoaded),
            first(),
            finalize(()=>this.loading = false)
        );
    }
}