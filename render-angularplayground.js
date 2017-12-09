(function () {
    let search = location.search.substring(1);
    let queryParams = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    let heightOffset = 3;
    let urlParts = decodeURIComponent(queryParams.angularPlaygroundUrl).split('?scenario=');
    let originUrl = urlParts[0];
    let scenario = urlParts[1].substring(0, urlParts[1].lastIndexOf('/'));
    let desc = urlParts[1].substring(urlParts[1].lastIndexOf('/') + 1);
    let url = originUrl + '?scenario=' + encodeURIComponent(scenario) + '/' + encodeURIComponent(desc);

    let body = document.getElementById('body');
    let content = document.getElementById('content');
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', url + '&embed=1');
    iframe.setAttribute('class', 'embed__content');
    iframe.setAttribute('height', 0);
    content.appendChild(iframe);

    if (queryParams.viewInPlayground === '' || queryParams.viewInPlayground === 'true') {
        let linkContainer = document.createElement('div');
        content.appendChild(linkContainer);
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('title', 'Opens in a new window');
        a.setAttribute('target', '_blank');
        a.innerHTML = 'View in Playground'
        linkContainer.appendChild(a);
        heightOffset = heightOffset + 40;
    }

    if (queryParams.width !== '') {
        iframe.width = queryParams.width;
        iframe.setAttribute('scroll', 'no');
    } else {
        iframe.width = '100%';
    }

    if (queryParams.removeSpacingBottom !== 'true') {
        heightOffset = heightOffset + 17;
    }

    function receiveMessage(event) {

        // For Chrome, the origin property is in the event.originalEvent object.
        let origin = event.origin || event.originalEvent.origin;
    
        if (origin + '/' !== originUrl || !event.data.height || !event.data.width)
            return;

        iframe.height = event.data.height;
        AP.resize('100%', event.data.height + heightOffset);
        body.classList.add('content__loaded');
    }
    window.addEventListener('message', receiveMessage, false);
}());
