# ngx-picklist
* See [Demo](https://gmerabishvili.github.io/ngx-picklist/) or try in [Stackblitz](https://stackblitz.com/edit/ngx-picklist)

Table of contents
=================

* [Features](#features)
* [Getting started](#getting-started)
* [Usage](#usage-sample)
* [API](#api)

## Features
- [x] Control buttons to reorder items.
- [x] Drag and Drop.
- [x] Customizable API.
- [x] Custom 'item', 'sourceHeader' and 'targetHeader' templates.
- [x] Multiple selection.
- [x] Keyboard navigation.
- [x] Accessibility.

## Getting started
ngx-picklist is used to reorder items between different lists. Items can be reordered using control buttons and drag and drop.  
ngx-picklist uses @angular/cdk's DragDropModule: ```npm i @angular/cdk```

### Step 1: Install `ngx-picklist`:

#### NPM
```shell
npm i ngx-picklist
```
### Step 2: Import the NgxPicklistModule:
```js
import {NgxPicklistModule} from '@gmerabishvili/ngx-picklist';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxPicklistModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
### Usage sample

```html
  <ngx-picklist
  [source]="sourceBooks"
  [target]="targetBooks"
  [itemTemplate]="itemTemplate"
  [sourceHeaderTemplate]="sourceHeaderTemplate"
  [targetHeaderTemplate]="targetHeaderTemplate"
  (movedToTarget)="onMoveToTarget($event)"
  (movedToSource)="onMoveToSource($event)">

  <ng-template #sourceHeaderTemplate>
    <h3 class="title">Available</h3>
  </ng-template>

  <ng-template #targetHeaderTemplate>
    <h3 class="title">Selected</h3>
  </ng-template>

  <ng-template #itemTemplate let-item>
    <div class="item">
      <div class="image-container">
        <img src="assets/images/{{item.image}}" [alt]="item.name" class="image"/>
      </div>
      <div class="item-detail">
        <h4>{{item.name}}</h4>
        <span class="text">{{item.category}}</span>
      </div>
      <div class="item-description">
        <h5>${{item.price}}</h5>
        <span class="text">{{item.description}}</span>
      </div>
    </div>
  </ng-template>

</ngx-picklist>

```
```javascript

class TestComponent {
  sourceBooks: any[] = [
    {
      id: 1,
      name: "Design Patterns",
      description: "Book Description",
      image: "design-patterns.jpg",
      category: "Programming",
      price: 99
    },
    {
      id: 2,
      name: "Eloquent Javascript",
      description: "Book Description",
      image: "eloquent-javascript.jpg",
      category: "Programming",
      price: 150
    },
    {
      id: 3,
      name: "Javascript Ninja",
      description: "Book Description",
      image: "javascript-ninja.jpg",
      category: "Programming",
      price: 250
    }
    ];

  targetBooks: any[] = []
  
  
  onMoveToTarget(event: any) {
    // console.log(event);
  }

  onMoveToSource(event: any) {
    // console.log(event);
  }
}
```

## API
### Inputs
| Input  | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [source] | `Array<any>`  | `[]` | yes | An array of objects for the source list. |
| [target] | `Array<any>`  | `[]` | yes | An array of objects for the target list. |
| showControls | `boolean` | `true` | no | Whether to show control buttons. |
| showResetControl | `boolean` | `false` | no | Whether to show reset control button. It is hidden by default. |
| styleClass  | `string` | `-` | no |  Style class of the component.  |
| disabled | `boolean` | `false` | no | When present, it specifies that the component should be disabled. |
| dragdropDisabled | `boolean` | `false` | no | When present, it specifies that the Drag and Drop should be disabled. |
| trackBy | `(index: number, item: any) => item` | `Function` | no | Function to optimize the DOM operations by delegating to ngForTrackBy, default algorithm checks for object identity. |
| sourceHeaderTemplate | `TemplateRef<any>` | `null` | no | Custom header template of source list. |
| targetHeaderTemplate | `TemplateRef<any>` | `null` | no | Custom header template of target list. |
| itemTemplate | `TemplateRef<any>` | `null` | yes | Custom item template. Parameters: $implicit: Data of the item; index: Index of the item |

### Outputs
| Output  | Description |
| ------------- | ------------- |
| (movedToTarget) | Event is emitted when items are moved from source to target. |
| (movedAllToTarget) | Event is emitted when all items are moved from source to target. |
| (movedToSource) | Event is emitted when items are moved from target to source. |
| (movedAllToSource) | Event is emitted when all items are moved from target to source. |
| (targetReordered)  | Event is emitted when items are reordered within target list. |
| (sourceReordered)  | Event is emitted when items are reordered within source list. |
| (targetSelected)  |  Event is emitted when items are selected within target list. |
| (sourceSelected)  |  Event is emitted when items are selected within target list. |
| (reset)  |  Event is emitted when reset control button is present and clicked. |

## Support ngx-picklist!
If you do love ngx-picklist I would appreciate a donation :)

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://paypal.me/gmerabishvili?locale.x=en_US)


### Author
* [Giorgi Merabishvili](https://www.linkedin.com/in/giorgi-merabishvili-3719a2121/)


## License

MIT

