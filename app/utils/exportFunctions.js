/**
 * Created by mukul.gupta1 on 5/10/2017.
 */
import {saveSvgAsPng} from 'save-svg-as-png';
import {saveAs} from 'save-as'
var jsonexport = require('jsonexport');

export function saveImage(svgElement,imageFileName){
  console.log("Function saveImage called from LineChart:");
  console.log("svgElement:",svgElement);
  console.log("imageFilename:",imageFileName);
  saveSvgAsPng(svgElement, imageFileName);
}

export function saveDataAsCSV(jsonData,csvFileName){
  console.log("Function saveDataAsCSV called from LineChart:");
  jsonexport(jsonData,function(err, csv){
    if(err)
      return console.log(err);
    let blob = new Blob([csv], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, csvFileName)
  })
}

