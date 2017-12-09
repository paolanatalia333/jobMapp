import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkiiDetailPage } from './workii-detail';

@NgModule({
  declarations: [
    WorkiiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkiiDetailPage),
  ],
})
export class WorkiiDetailPageModule {}
