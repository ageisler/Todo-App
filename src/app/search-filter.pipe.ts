import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list
      ? list.filter(
        (item) => (item.description.search(new RegExp(filterText, 'i')) > -1) || (item.dueDate.search(new RegExp(filterText, 'i')) > -1) || (item.category.search(new RegExp(filterText, 'i')) > -1)
      )
      : [];
  }

}
