(function () {
    let search = location.search.substring(1);
    let queryParams = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    let heightOffset = 75;

    let urlParts = decodeURIComponent(queryParams.angularPlaygroundUrl).split('?scenario=');
    let originUrl = urlParts[0];
    let scenario = urlParts[1].substring(0, urlParts[1].lastIndexOf('/'));
    let desc = urlParts[1].substring(urlParts[1].lastIndexOf('/') + 1);
    let url = originUrl + '?scenario=' + encodeURIComponent(scenario) + '/' + encodeURIComponent(desc) + '&embed=1';

    let content = document.getElementById('content');
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.setAttribute('class', 'embed__content');
    content.appendChild(iframe);

    if (queryParams.viewInPlayground === '' || queryParams.viewInPlayground === 'true') {
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('title', 'Opens in a new window');
        a.setAttribute('target', '_blank');
        a.innerHTML = 'View in Playground'
        content.appendChild(a);
    } else {
        heightOffset = heightOffset - 30;
    }

    if (queryParams.width !== '') {
        content.style.width = queryParams.width + 'px';
    }

    if (queryParams.removeSpacingBottom === 'true') {
        content.style.marginBottom = 0;
    } else {
        heightOffset = heightOffset + 30;
    }

    function receiveMessage(event) {

        // For Chrome, the origin property is in the event.originalEvent object.
        let origin = event.origin || event.originalEvent.origin;

        if (origin + '/' !== originUrl)
            return;

        console.log(event.data)
        iframe.height = event.data.height + 5;
        AP.resize(event.data.width + 10, event.data.height + heightOffset);
    }
    window.addEventListener('message', receiveMessage, false);
}())
