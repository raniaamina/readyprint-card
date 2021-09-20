# Ayra cetak sertifikat vaksin

Reqs:
- node v12+  

How to start server:
- npm install
- npm start
- hit http://localhost:8000 OR change the port from index.js line 7

Notes:
- if working with 2 layout, and there is one client that only have vaksin 1 file, you have to upload the 'peta' file,
  you **CANNOT OMIT** one field, otherwise printed certificates not matching with the owner.
- uploaded files will be deleted soon after you click generate PDF button (after popup print is closed)
- So you want to save that result, eh ? just specify destination of printed PDF in print dialog.
- This app was tested in chromium
- you have to tick this setting, on print dialog
![gambar](https://user-images.githubusercontent.com/22854966/133950464-f032240f-c08e-4e95-b04e-e90f37423732.png)


Hacking layout:
- just edit the files in `views/` and `public/css/styles/` folder, hack that css :P
