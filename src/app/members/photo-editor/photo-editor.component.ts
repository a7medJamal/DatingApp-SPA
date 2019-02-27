import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() photos: Photo[];
uploader: FileUploader;
hasBaseDropZoneOver = false;
baseUrl = environment.apiUrl;
currentMain: Photo;

  constructor(private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader () {
   this.uploader = new FileUploader({
    //  url: 'test',
     url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
     authToken: 'Bearer ' + localStorage.getItem('token'),
     isHTML5: true,
     allowedFileType: ['image'],
     removeAfterUpload: true,
     autoUpload: false,
    maxFileSize: 10 * 1024 * 1024
    });

 this.uploader.onSuccessItem = (item, Response, status, headers) => {
   if (Response) {
    const res: Photo = JSON.parse(Response);
    const photo = {
      id: res.id,
      url: res.url,
      dateAdded: res.dateAdded,
      description: res.description,
      isMain: res.isMain
    };
    this.photos.push(photo);
    }
  };
 }

 setMainPhoto(photo: Photo) {
  this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
  this.currentMain = _.findWhere(this.photos, {isMain: true});
  this.currentMain.isMain = true;
  photo.isMain = true;
  }, error => {
  this.alertify.error(error);
  });
 }
}
