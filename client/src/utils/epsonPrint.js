export const printImagesWithCuts = (imageUrls) => {
  return new Promise((resolve, reject) => {
    const printerIp = process.env.REACT_APP_PRINTER_IP;
    if (!window.epson) return reject("Epson SDK not loaded");

    const device = new window.epson.ePOSDevice();

    device.connect(
      printerIp,
      process.env.REACT_APP_PRINTER_PORT,
      (connectResult) => {
        if (connectResult !== "OK") {
          return reject(`Connection failed: ${connectResult}`);
        }

        device.createDevice(
          "local_printer",
          device.DEVICE_TYPE_PRINTER,
          { crypto: false, buffer: true },
          (printer, errorCode) => {
            if (!printer) {
              return reject(`CreateDevice error: ${errorCode}`);
            }

            printer.timeout = 60000;

            imageUrls.forEach((url) => {
              printer.addImage(
                url,
                0,
                0,
                576, // (adjust to your printer)
                384, // 3:2 ratio (adjust as needed)
                printer.COLOR_1,
                printer.MODE_MONO,
                printer.HALFTONE_DITHER,
                printer.PARAM_DEFAULT
              );
              printer.addFeedLine(2); // optional spacing
              printer.addCut(printer.CUT_FEED); // cut after each image
            });

            printer.send(() => {
              resolve("Images printed successfully");
            });
          }
        );
      }
    );
  });
};
