export class Formats{
    printDiv(divID: any) {
        var vendor = navigator.vendor.toLowerCase();
        var isGoogleChrome = vendor.indexOf('google') > -1;

        let printcontent = `
        <style>
        .pageToPrint{
            text-align:center;
            display:flex;
            justify-content:center;
        }
        .aaaa{
            border:2px solid black;
            color:red;
        }
        </style>
        <div class="pageToPrint">
            <div>
            <div class="text-center mt-4 header-details">
                <h3><b>TUNNEX LAB</b></h3>
                <p>41, Davies Street, Ajelogo Bus Stop, Alapere, Ketu, Lagos State</p>
                <p>+2348104403054</p>
                <p>sales@tunnexlab.com.ng</p>
            </div>
            ${document.getElementById(divID).innerHTML}
            </div>
        </div>
        `;
        const win = window.open('');
        win.document.write(printcontent);

        if (isGoogleChrome) {
        //1s timeout added to enable logo loaded before printing on Google Chrome
        setTimeout(function() {
            win.document.close();

            win.focus();
            win.print();
            win.close();
        }, 1000);
        } else {
        win.focus();
        win.print();
        win.close();
        }

        return true;
        }
}
