import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public log: string = "";

  constructor(private camera: Camera) {}

  public async takePhoto(): Promise<void> {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.log += `${new Date().toISOString()} Attempt taking picture<br/>`;

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.log += `${new Date().toISOString()} Image data ${imageData}<br/>`;
    }, (err) => {
      this.log += `${new Date().toISOString()} Image error ${err}<br/>`;
    });

    var logArray = this.log.split("<br/>");
    this.log = logArray
      .slice(Math.max(logArray.length - 4, 0))
      .join("<br/>");
  }

}
