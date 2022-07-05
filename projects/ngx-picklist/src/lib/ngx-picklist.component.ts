import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'ngx-picklist',
  templateUrl: './ngx-picklist.component.html',
  styleUrls: ['./ngx-picklist.component.scss']
})
export class NgxPicklistComponent implements OnInit {
  selectedItemsSource: any[] = [];
  selectedItemsTarget: any[] = [];

  readonly SOURCE_LIST = -1;
  readonly TARGET_LIST = 1;

  @Input() source!: any[];
  @Input() target!: any[];

  @Input() sourceHeaderTemplate!: TemplateRef<any>;
  @Input() targetHeaderTemplate!: TemplateRef<any>;
  @Input() itemTemplate!: TemplateRef<any>;

  @Input() showControls: boolean = true;
  @Input() showResetControl: boolean = false;

  @Input() styleClass!: string;

  @Input() disabled: boolean = false;
  @Input() dragdropDisabled: boolean = false;

  @Input() trackBy: any = (index: number, item: any) => item;

  @Output() movedToTarget: EventEmitter<any> = new EventEmitter();
  @Output() movedAllToTarget: EventEmitter<any> = new EventEmitter();

  @Output() movedToSource: EventEmitter<any> = new EventEmitter();
  @Output() movedAllToSource: EventEmitter<any> = new EventEmitter();

  @Output() targetReordered: EventEmitter<any> = new EventEmitter();
  @Output() sourceReordered: EventEmitter<any> = new EventEmitter();

  @Output() targetSelected: EventEmitter<any> = new EventEmitter();
  @Output() sourceSelected: EventEmitter<any> = new EventEmitter();

  @Output() reset: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  // Controls

  moveToTarget() {
    if (this.selectedItemsSource && this.selectedItemsSource.length) {
      for (let i = 0; i < this.selectedItemsSource.length; i++) {
        let selectedItem = this.selectedItemsSource[i];
        if (this.findIndexInList(selectedItem, this.target) == -1) {
          this.target.push(this.source.splice(this.findIndexInList(selectedItem, this.source), 1)[0]);
        }
      }

      this.movedToTarget.emit({
        items: this.selectedItemsSource
      });

      this.selectedItemsSource = [];
    }
  }

  moveAllToTarget() {
    if (this.source) {
      let movedItems = [];

      for (let i = 0; i < this.source.length; i++) {
        let removedItem = this.source.splice(i, 1)[0];
        this.target.push(removedItem);
        movedItems.push(removedItem);
        i--;
      }

      this.movedAllToTarget.emit({
        items: movedItems
      });

      this.selectedItemsSource = [];
    }
  }

  moveToSource() {
    if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
      for (let i = 0; i < this.selectedItemsTarget.length; i++) {
        let selectedItem = this.selectedItemsTarget[i];
        if (this.findIndexInList(selectedItem, this.source) == -1) {
          this.source.push(this.target.splice(this.findIndexInList(selectedItem, this.target), 1)[0]);

        }
      }

      this.movedToSource.emit({
        items: this.selectedItemsTarget
      });

      this.selectedItemsTarget = [];
    }
  }

  moveAllToSource() {
    if (this.target) {
      let movedItems = [];

      for (let i = 0; i < this.target.length; i++) {
        let removedItem = this.target.splice(i, 1)[0];
        this.source.push(removedItem);
        movedItems.push(removedItem);
        i--;
      }

      this.movedAllToSource.emit({
        items: movedItems
      });

      this.selectedItemsTarget = [];
    }
  }

  resetItems() {
    this.reset.emit();
  }

  // Events

  onItemClick(event: any, item: any, selectedItems: any[], callback: EventEmitter<any>) {
    if (this.disabled) {
      return;
    }

    let index = this.findIndexInSelection(item, selectedItems);
    let selected = (index != -1);

    let metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);

    if (selected && metaKey) {
      selectedItems.splice(index, 1);
    } else {
      if (!metaKey) {
        selectedItems.length = 0;
      }
      selectedItems.push(item);
    }

    callback.emit({originalEvent: event, items: selectedItems});
  }

  onItemKeydown(event: KeyboardEvent, item: any, selectedItems: any[], callback: EventEmitter<any>) {
    let listItem = <any>event.currentTarget;

    switch (event.which) {
      //down
      case 40:
        var nextItem = listItem.nextElementSibling;
        if (nextItem) {
          nextItem.focus();
        }

        event.preventDefault();
        break;

      //up
      case 38:
        var prevItem = listItem.previousElementSibling;
        if (prevItem) {
          prevItem.focus();
        }

        event.preventDefault();
        break;

      //enter
      case 13:
        this.onItemClick(event, item, selectedItems, callback);
        event.preventDefault();
        break;
    }
  }

  onSourceItemDblClick() {
    if (this.disabled) {
      return;
    }

    this.moveToTarget();
  }

  onTargetItemDblClick() {
    if (this.disabled) {
      return;
    }

    this.moveToSource();
  }

  // Drag n Drop

  onDrop(event: CdkDragDrop<string[]>, listType: number) {
    const isTransfer = event.previousContainer !== event.container;

    if (listType === this.SOURCE_LIST) {
      if (isTransfer) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        let selectedItemIndex = this.findIndexInList(event.item.data, this.selectedItemsTarget);

        if (selectedItemIndex != -1) {
          this.selectedItemsTarget.splice(selectedItemIndex, 1);
        }

        this.movedToSource.emit({items: [event.item.data]});
      } else {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.sourceReordered.emit({items: [event.item.data]});
      }
    } else {
      if (isTransfer) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

        let selectedItemIndex = this.findIndexInList(event.item.data, this.selectedItemsSource);

        if (selectedItemIndex != -1) {
          this.selectedItemsSource.splice(selectedItemIndex, 1);
        }


        this.movedToTarget.emit({items: [event.item.data]});
      } else {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.targetReordered.emit({items: [event.item.data]});
      }
    }
  }

  // Validations

  sourceMoveDisabled(): any {
    if (this.disabled || !this.selectedItemsSource.length) {
      return true;
    }
  }

  moveToTargetDisabled() {
    return this.disabled || this.isEmpty(this.selectedItemsSource);
  }

  moveAllToTargetDisabled() {
    return this.disabled || this.isEmpty(this.source);
  }

  moveToSourceDisabled() {
    return this.disabled || this.isEmpty(this.selectedItemsTarget);
  }

  moveAllToSourceDisabled() {
    return this.disabled || this.isEmpty(this.target);
  }

  resetDisabled() {
    return this.disabled;
  }

  // Utils

  isSelected(item: any, selectedItems: any[]) {
    return this.findIndexInSelection(item, selectedItems) != -1;
  }

  findIndexInSelection(item: any, selectedItems: any[]): number {
    return this.findIndexInList(item, selectedItems);
  }

  findIndexInList(item: any, list: any): number {
    let index: number = -1;

    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == item) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  isEmpty(value: any) {
    return (
      value === null || value === undefined || value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
    );
  }

}
