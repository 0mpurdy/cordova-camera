import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public log: string = "";
  public photo: Photo = new Photo();

  constructor(
    private camera: Camera,
    private androidPermissions: AndroidPermissions) {}

  public async takePhoto(): Promise<void> {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.log += `${new Date().toISOString()} Attempt taking picture<br/>`;

    this.photo.exists = false;

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_MEDIA_LOCATION).then(
      result => {
        this.log += `Media location permission: ${result.hasPermission}<br/>`;
      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_MEDIA_LOCATION)
        this.log += `Requested media location permission: ${err}<br/>`;
      }
    );

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.log += `${new Date().toISOString()} Image data ${imageData}<br/>`;
      this.photo.exists = true;
      this.photo.sourceUrl = imageData;
    }, (err) => {
      this.log += `${new Date().toISOString()} Image error ${err}<br/>`;
    });

    var logArray = this.log.split("<br/>");
    this.log = logArray
      .slice(Math.max(logArray.length - 4, 0))
      .join("<br/>");
  }
}

export class Photo {
  public exists: boolean = false;
  public sourceUrl: string = "";
}
