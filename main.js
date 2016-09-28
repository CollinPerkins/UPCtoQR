// Webpack
var qrcode = require('qr-encode');
var qr;
var lot;
var expDate;
var sku;

$(document).ready(function() {
  var qrObject;
  $('#upcScan').change(function() {
    // Input Value of the scanned GS128 Code
    var upc = ($('#upcScan').val());

    if(upc !== ""){
      // Splits the GS128 string at the * place.
      qr = {
        sku: upc,
        lot: "0",
        qty: 0,
        expDate: "1900-01-01"
      };
    }
    console.log(qr);
  });

  $("#generateQrcode").click(function(){
    // var qrCanvas = $("#qr").qrcode({width: 200,height: 200,text: JSON.stringify(GS128Object)});
    sku = qr.sku;
    lot = qr.lot;
    expDate = qr.expDate;

    qr = JSON.stringify(qr);
    // qrcode Value
    var qrBarCode = qrcode(qr, {
      type:  10
    });
    var qrcodeImage = new Image();
    qrcodeImage.src = qrBarCode;

    // console.log(qrcodeValue);

    $('#qr').find('img').replaceWith(qrcodeImage);
    //qrContainer.appendChild(qrCanvas);
    //var qrCanvas = $("#qrImage").qrcode({ width: 200,height: 200,text: JSON.stringify(GS128Object)});
    //qrContainer.appendChild(qrCanvas);
    var w = window.open();



    w.document.write(`
      <html>
      <head>
        <style>
          @page { size: auto;  margin: 6mm 0 0 4mm; }
          *, .max {
            max-width: 100px;
          }

          #sku, #lot, #expDate {
            position: absolute;
            font-size: 12px;
          }

          #sku {
            left: 120px;
            top: 40px;
          }

          #lot {
            left: 120px;
            top: 80px;
          }

          #expDate {
            left: 200px;
            top: 80px;
          }

        </style>
      </head>
      <body>
        <div>
          <div class="max">
            ${$('#qr').html()}
          </div>
          <div id="sku">
            Sku
            <br>
            ${sku}
          </div>
          <div id="lot">
            Lot number
            <br>
            ${lot}
          </div>
          <div id="expDate">
            Expiration Date
            <br>
            ${expDate}
          </div>
        </div>
      </body></html>`);
    w.print();
    w.close();
  });
  // $('.printButton').click(function() {
  //    $('#GS128').focus();
  //  });

});
