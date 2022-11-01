import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-free-spaces-count',
  templateUrl: './free-spaces-count.component.html',
  styleUrls: ['./free-spaces-count.component.scss']
})
export class FreeSpacesCountComponent {
  @Input() freeSpaces: number;
  @Input() totalSpaces: number;
}
