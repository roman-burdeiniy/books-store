/**
 * Created by roman_b on 3/21/2017.
 */

function InvalidPathError(requestedURL, redirectURL)
{
    this.message = "Invalid request URL " + requestedURL;
    this.redirectURL = redirectURL;
}
InvalidPathError.prototype = Object.create(Error.prototype);
InvalidPathError.prototype.name = 'InvalidPathError';

export default InvalidPathError;