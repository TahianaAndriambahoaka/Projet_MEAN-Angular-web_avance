import { SafePipe } from '../safe.pipe';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  isHovering: boolean | undefined;
  pdpURL : any;
  pdp!: File;

  constructor(private safe: SafePipe) {}

  ngOnInit(): void {
    this.pdpURL = 'https://firebasestorage.googleapis.com/v0/b/m1p10mean-tahiana-tsantaniaina.appspot.com/o/pdp%2FT0266FRGM-U2Q173U05-g863c2a865d7-512.png?alt=media&token=85d91b21-3a25-438a-99f5-d9495bac4ba3';

    var pdpTemp = null;
    var pdpURLTemp = null;
    $("#imageUpload").change(function(){
      var uploader: any = this;
      if ( uploader!.files && uploader!.files[0] ){
        $('#profileImage').attr('src',
        window.URL.createObjectURL(uploader.files[0]) );
      }
    });
  }

  toggleHover(event: boolean) {
      this.isHovering = event;
  }

  onDrop(fileDropped: FileList) {
    this.pdp = fileDropped.item(0)!;
    this.pdpURL = this.safe.transform(window.URL.createObjectURL(this.pdp));
  }

  changePDP() {
    document.getElementById("imageUpload")!.click();
  }

  coco() {}

}
