import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkiiListPage } from './workii-list';

@NgModule({
  declarations: [
    WorkiiListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkiiListPage),
  ],
})
export class WorkiiListPageModule {}
