/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2025 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var MergeXHRSettings = require('./MergeXHRSettings');

/**
 * Creates a new XMLHttpRequest (xhr) object based on the given File and XHRSettings
 * and starts the download of it. It uses the Files own XHRSettings and merges them
 * with the global XHRSettings object to set the xhr values before download.
 *
 * @function Phaser.Loader.XHRLoader
 * @since 3.0.0
 *
 * @param {Phaser.Loader.File} file - The File to download.
 * @param {Phaser.Types.Loader.XHRSettingsObject} globalXHRSettings - The global XHRSettings object.
 *
 * @return {XMLHttpRequest} The XHR object, or a FakeXHR Object in the base of base64 data.
 */
var XHRLoader = function (file, globalXHRSettings)
{
    var config = MergeXHRSettings(globalXHRSettings, file.xhrSettings);

    if (file.base64)
    {
        var base64Data = file.url.split(';base64,').pop() || file.url.split(',').pop();

        var fakeXHR;

        if (file.xhrSettings.responseType === 'arraybuffer')
        {
            fakeXHR = {
                response: Uint8Array.from(atob(base64Data), function (c)
                {
                    return c.charCodeAt(0);
                }).buffer
            };
        }
        else
        {
            fakeXHR = {
                responseText: atob(base64Data)
            };
        }

        file.onBase64Load(fakeXHR);

        return;
    }

    var xhr = new XMLHttpRequest();

    xhr.open('GET', file.src, config.async, config.user, config.password);

    xhr.responseType = file.xhrSettings.responseType;
    xhr.timeout = config.timeout;

    if (config.headers)
    {
        for (var key in config.headers)
        {
            xhr.setRequestHeader(key, config.headers[key]);
        }
    }

    if (config.header && config.headerValue)
    {
        xhr.setRequestHeader(config.header, config.headerValue);
    }

    if (config.requestedWith)
    {
        xhr.setRequestHeader('X-Requested-With', config.requestedWith);
    }

    if (config.overrideMimeType)
    {
        xhr.overrideMimeType(config.overrideMimeType);
    }

    if (config.withCredentials)
    {
        xhr.withCredentials = true;
    }

    // After a successful request, the xhr.response property will contain the requested data as a DOMString, ArrayBuffer, Blob, or Document (depending on what was set for responseType.)

    xhr.onload = file.onLoad.bind(file, xhr);
    xhr.onerror = file.onError.bind(file, xhr);
    xhr.onprogress = file.onProgress.bind(file);
    xhr.ontimeout = file.onError.bind(file, xhr);

    //  This is the only standard method, the ones above are browser additions (maybe not universal?)
    // xhr.onreadystatechange

    xhr.send();

    return xhr;
};

module.exports = XHRLoader;
