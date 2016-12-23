import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SearchResults{
    private resultsList = new Subject<any>();
    resultsList$ = this.resultsList.asObservable();
    
    setResultList(list:Array<any>){
        this.resultsList.next(list);
    }
}