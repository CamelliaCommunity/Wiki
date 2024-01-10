// listen to changes in the page
// if #preview-pane is found, add the custom css file to the iframe

const sync = () => {
    var iframe = document.getElementById('preview-pane');

    if (!iframe) return;

    const customSrcDoc = `
        <!DOCTYPE html>
        <html>
            <head>
                <base target="_blank"/>
                <link rel="stylesheet" href="style/decap-preview.css">
            </head>
            <body>
                <div></div>
            </body>
        </html>
    `;

    if (iframe.srcdoc === customSrcDoc) return; 
    iframe.srcdoc = customSrcDoc;

    console.log('mixed in!');
};

new MutationObserver(sync).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});
