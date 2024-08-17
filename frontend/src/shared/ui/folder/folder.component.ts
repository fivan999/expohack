import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [],
  template: `
  <div class = "folder">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V8C22 7.46957 21.7893 6.96086 21.4142 6.58579C21.0391 6.21071 20.5304 6 20 6H12.07C11.7406 5.9983 11.4167 5.91525 11.1271 5.75824C10.8375 5.60123 10.5912 5.37512 10.41 5.1L9.59 3.9C9.40882 3.62488 9.1625 3.39877 8.8729 3.24176C8.58331 3.08475 8.25941 3.0017 7.93 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V18C2 19.1 2.9 20 4 20Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 10H22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    <div class="column">
    <h4>{{title}}</h4>
    <p >{{description}} Прототипа</p>
  </div>
</div>

  `,
  styleUrl: './folder.component.less',
})
export class FolderComponent {
  @Input({
    required: true,
  }) title = "Заголовок";
  @Input({
    required: true,
  }) description = "Описание";
}
